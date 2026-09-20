// Sync ESPN into the DB and settle bets. Runs on an interval: every minute while a card
// is live or within an hour of starting, otherwise every 15 minutes.

import { q, tx } from "./db.js";
import { fetchScoreboard, normalizeEvent } from "./espn.js";
import { grade } from "./pricing.js";

export const lastRaw = new Map();   // fight id -> raw ESPN competition, for /admin/debug

// Log what ESPN actually sends so the odds/result parsers can be verified from Railway
// logs alone (this sandbox can't reach the API). Raw samples are dumped once per process.
let dumpedOdds = false, dumpedFinal = false;
const clip = (o, n = 1800) => { const t = JSON.stringify(o); return t.length > n ? t.slice(0, n) + "…" : t; };
function logShape(ev) {
  const withLines = ev.fights.filter((f) => f.f1_ml != null && f.f2_ml != null).length;
  const sources = [...new Set(ev.fights.map((f) => f.odds_source).filter(Boolean))];
  console.log(`[sync] ${ev.name} (${ev.status}): ${ev.fights.length} fights, ${withLines} with lines [${sources.join(",") || "none"}]`);
  for (const f of ev.fights) {
    if (f.status === "final" || f.status === "cancelled")
      console.log(`[sync]   ${f.status.toUpperCase()} ${f.f1_name} vs ${f.f2_name} -> kind=${f.result_kind} winner=${f.winner_id} method=${f.method} round=${f.round} detail="${f.raw_detail}"`);
    if (!dumpedOdds && Array.isArray(f.raw?.odds) && f.raw.odds.length) { dumpedOdds = true; console.log(`[shape] odds sample (${f.f1_name} vs ${f.f2_name}): ${clip(f.raw.odds)}`); }
    if (!dumpedFinal && f.status === "final") { dumpedFinal = true; console.log(`[shape] final status sample: ${clip({ status: f.raw?.status, competitors: (f.raw?.competitors || []).map((c) => ({ id: c.id, winner: c.winner, homeAway: c.homeAway, name: c.athlete?.displayName })) })}`); }
  }
  if (!dumpedOdds && ev.fights.length) console.log(`[shape] no odds array on any fight of ${ev.name}; first fight keys: ${Object.keys(ev.fights[0].raw || {}).join(",")}`);
}

export async function syncOnce() {
  const events = await fetchScoreboard();
  let settled = 0;
  for (const raw of events) {
    const ev = normalizeEvent(raw);
    logShape(ev);
    await q(
      `INSERT INTO events (id, name, date, venue, status, updated_at) VALUES ($1,$2,$3,$4,$5,now())
       ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, date=EXCLUDED.date, venue=EXCLUDED.venue, status=EXCLUDED.status, updated_at=now()`,
      [ev.id, ev.name, ev.date, ev.venue, ev.status]
    );
    for (const f of ev.fights) {
      lastRaw.set(f.id, f.raw);
      // Never overwrite a manual settlement, and keep the last non-null line if ESPN drops it on fight night.
      await q(
        `INSERT INTO fights (id, event_id, order_idx, weight, rounds, f1_id, f1_name, f2_id, f2_name, f1_ml, f2_ml,
                             start_at, status, winner_id, result_kind, method, round, end_time, raw_detail, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,now())
         ON CONFLICT (id) DO UPDATE SET
           order_idx=EXCLUDED.order_idx, weight=EXCLUDED.weight, rounds=EXCLUDED.rounds,
           f1_id=EXCLUDED.f1_id, f1_name=EXCLUDED.f1_name, f2_id=EXCLUDED.f2_id, f2_name=EXCLUDED.f2_name,
           f1_ml=COALESCE(EXCLUDED.f1_ml, fights.f1_ml), f2_ml=COALESCE(EXCLUDED.f2_ml, fights.f2_ml),
           start_at=EXCLUDED.start_at,
           status=CASE WHEN fights.status='final' AND fights.raw_detail='MANUAL' THEN fights.status ELSE EXCLUDED.status END,
           winner_id=CASE WHEN fights.raw_detail='MANUAL' THEN fights.winner_id ELSE EXCLUDED.winner_id END,
           result_kind=CASE WHEN fights.raw_detail='MANUAL' THEN fights.result_kind ELSE EXCLUDED.result_kind END,
           method=CASE WHEN fights.raw_detail='MANUAL' THEN fights.method ELSE COALESCE(EXCLUDED.method, fights.method) END,
           round=CASE WHEN fights.raw_detail='MANUAL' THEN fights.round ELSE COALESCE(EXCLUDED.round, fights.round) END,
           end_time=EXCLUDED.end_time,
           raw_detail=CASE WHEN fights.raw_detail='MANUAL' THEN 'MANUAL' ELSE EXCLUDED.raw_detail END,
           updated_at=now()`,
        [f.id, ev.id, f.order_idx, f.weight, f.rounds, f.f1_id, f.f1_name, f.f2_id, f.f2_name, f.f1_ml, f.f2_ml,
         f.start_at, f.status, f.winner_id, f.result_kind, f.method, f.round, f.end_time, f.raw_detail]
      );
    }
  }
  settled += await settleFinished();
  return { events: events.length, settled };
}

// Grade every open bet whose fight is final or cancelled. Idempotent.
export async function settleFinished() {
  const { rows } = await q(
    `SELECT b.*, f.result_kind, f.winner_id, f.method AS f_method, f.round AS f_round
       FROM bets b JOIN fights f ON f.id = b.fight_id
      WHERE b.status IN ('open','needs_manual') AND f.status IN ('final','cancelled')`
  );
  let n = 0;
  for (const b of rows) {
    const outcome = grade(b, { result_kind: b.result_kind, winner_id: b.winner_id, method: b.f_method, round: b.f_round });
    if (outcome === "needs_manual") {
      if (b.status !== "needs_manual") await q(`UPDATE bets SET status='needs_manual' WHERE id=$1`, [b.id]);
      continue;
    }
    const payout = outcome === "won" ? b.potential : outcome === "void" ? b.stake : 0;
    await q(`UPDATE bets SET status=$2, payout=$3, settled_at=now() WHERE id=$1`, [b.id, outcome, payout]);
    n++;
  }
  return n;
}

// Poll cadence: fast when something is live or about to be.
export function startPoller() {
  let timer = null;
  const tick = async () => {
    let delay = 15 * 60e3;
    try {
      const r = await syncOnce();
      const { rows } = await q(
        `SELECT 1 FROM events WHERE status='live' OR (date BETWEEN now() - interval '8 hours' AND now() + interval '1 hour') LIMIT 1`
      );
      if (rows.length) delay = 60e3;
      if (r.settled) console.log(`[settle] settled ${r.settled} bet(s)`);
    } catch (e) {
      console.error("[sync] failed:", e.message);
      delay = 2 * 60e3;
    }
    timer = setTimeout(tick, delay);
  };
  tick();
  return () => clearTimeout(timer);
}
