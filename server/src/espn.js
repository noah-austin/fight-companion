// ESPN public MMA feed: the same scoreboard the app polls, plus defensive extraction of
// odds and results. Every parser here tolerates missing fields; the raw competition is
// kept so /admin/debug can show exactly what ESPN sent when something doesn't parse.

const SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard";
const SPINOFF_RX = /contender series|dana white|ultimate fighter|road to ufc|tuf\b/i;

const ymd = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");

export async function fetchScoreboard({ daysBack = 2, daysAhead = 75 } = {}) {
  const start = new Date(Date.now() - daysBack * 864e5);
  const end = new Date(Date.now() + daysAhead * 864e5);
  const url = `${SCOREBOARD}?dates=${ymd(start)}-${ymd(end)}`;
  const res = await fetch(url, { headers: { "user-agent": "fight-companion/0.1" } });
  if (!res.ok) throw new Error(`ESPN ${res.status}`);
  const data = await res.json();
  return (data.events || []).filter((ev) => !SPINOFF_RX.test(ev.name || ""));
}

// --- odds ---------------------------------------------------------------------------
// ESPN attaches sportsbook lines under competition.odds[]. Shapes vary by sport and over
// time, so try the structured fields first and fall back to parsing the details string.
export function extractMoneylines(comp, f1Id, f2Id) {
  const o = Array.isArray(comp.odds) ? comp.odds[0] : null;
  if (!o) return { f1_ml: null, f2_ml: null, source: null };

  const pick = (side) => {
    const v = side && (side.moneyLine ?? side.moneyline ?? side.current?.moneyLine?.american ?? side.odds);
    const n = typeof v === "string" ? parseInt(v.replace(/[^-+\d]/g, ""), 10) : Number(v);
    return Number.isFinite(n) && n !== 0 ? n : null;
  };

  // Structured: homeTeamOdds / awayTeamOdds keyed to competitors by homeAway.
  const home = comp.competitors?.find((c) => c.homeAway === "home");
  const away = comp.competitors?.find((c) => c.homeAway === "away");
  let f1 = null, f2 = null;
  if (home && away) {
    const homeMl = pick(o.homeTeamOdds), awayMl = pick(o.awayTeamOdds);
    if (String(home.id) === String(f1Id)) { f1 = homeMl; f2 = awayMl; } else { f1 = awayMl; f2 = homeMl; }
  }
  if (f1 != null && f2 != null) return { f1_ml: f1, f2_ml: f2, source: o.provider?.name || "espn" };

  // Fallback: details like "PANTOJA -113" names the favorite; give the other side a
  // symmetric line so both fighters are bettable. Marked so we can see it in debug.
  const m = /([A-Z][A-Z' .-]+?)\s*([-+]\d{3,4})/.exec(o.details || "");
  if (m) {
    const fav = parseInt(m[2], 10);
    const favIsF1 = comp.competitors?.[0]?.athlete?.displayName?.toUpperCase().includes(m[1].trim().split(" ").pop());
    const dog = fav < 0 ? Math.abs(fav) : -fav;
    return favIsF1 ? { f1_ml: fav, f2_ml: dog, source: "espn-details" } : { f1_ml: dog, f2_ml: fav, source: "espn-details" };
  }
  return { f1_ml: null, f2_ml: null, source: null };
}

// --- results -------------------------------------------------------------------------
const FINAL = new Set(["STATUS_FINAL", "STATUS_FULL_TIME"]);
const LIVE = new Set(["STATUS_IN_PROGRESS", "STATUS_HALFTIME", "STATUS_END_PERIOD"]);

function methodFrom(text) {
  const t = (text || "").toUpperCase();
  if (/NO CONTEST|\bNC\b/.test(t)) return { kind: "nc" };
  if (/\bDRAW\b/.test(t)) return { kind: "draw" };
  if (/DISQUALIF|\bDQ\b/.test(t)) return { kind: "win", method: "DQ" };
  if (/SUBMISSION|\bSUB\b|CHOKE|ARMBAR|TRIANGLE|KIMURA|GUILLOTINE|LOCK|TAP/.test(t)) return { kind: "win", method: "SUB" };
  if (/\bKO\b|TKO|KNOCKOUT|STOPPAGE|PUNCHES|STRIKES|KICK|KNEE|ELBOW|DOCTOR|RETIRE|CORNER/.test(t)) return { kind: "win", method: "KO" };
  if (/DECISION|\bDEC\b|UNANIMOUS|SPLIT|MAJORITY/.test(t)) return { kind: "win", method: "DEC" };
  return { kind: "win", method: null };
}

function roundFrom(text, status) {
  const p = status?.period;
  if (Number.isFinite(p) && p > 0) return p;
  const m = /\bR(?:OUND)?\s*(\d)\b/i.exec(text || "");
  return m ? parseInt(m[1], 10) : null;
}

export function normalizeEvent(ev) {
  const comps = ev.competitions || [];
  const venue = comps[0]?.venue?.fullName || null;
  const fights = comps.map((c, i) => {
    const cs = c.competitors || [];
    const a = cs[0] || {}, b = cs[1] || {};
    const f1_id = a.athlete?.id != null ? String(a.athlete.id) : null;
    const f2_id = b.athlete?.id != null ? String(b.athlete.id) : null;
    const st = c.status?.type || {};
    const detail = [st.detail, st.shortDetail, st.description, c.status?.displayClock].filter(Boolean).join(" | ");
    const { f1_ml, f2_ml, source } = extractMoneylines(c, f1_id, f2_id);

    let status = "scheduled", result_kind = null, winner_id = null, method = null, round = null;
    if (LIVE.has(st.name)) status = "live";
    if (FINAL.has(st.name)) {
      status = "final";
      const winner = a.winner === true ? a : b.winner === true ? b : null;
      const parsed = methodFrom(detail);
      if (!winner) result_kind = parsed.kind === "win" ? null : parsed.kind;   // no winner flag: draw/NC or unknown
      else { result_kind = "win"; winner_id = String(winner.athlete?.id); method = parsed.method; }
      round = method === "DEC" ? null : roundFrom(detail, c.status);
    }
    if (st.name === "STATUS_CANCELED" || st.name === "STATUS_POSTPONED") { status = "cancelled"; result_kind = "cancelled"; }

    const fmt = c.format?.regulation?.periods;
    return {
      id: String(c.id), order_idx: i,
      weight: c.type?.text || c.type?.abbreviation || null,
      rounds: fmt === 5 ? 5 : 3,
      f1_id, f1_name: a.athlete?.displayName || a.athlete?.fullName || "TBA",
      f2_id, f2_name: b.athlete?.displayName || b.athlete?.fullName || "TBA",
      f1_ml, f2_ml, odds_source: source,
      start_at: c.date || ev.date,
      status, result_kind, winner_id, method, round,
      end_time: c.status?.displayClock || null,
      raw_detail: detail || null,
      raw: c,
    };
  });
  const anyLive = fights.some((f) => f.status === "live");
  const allDone = fights.length > 0 && fights.every((f) => f.status === "final" || f.status === "cancelled");
  return {
    id: String(ev.id), name: ev.name, date: ev.date, venue,
    status: anyLive ? "live" : allDone ? "final" : "scheduled",
    fights,
  };
}
