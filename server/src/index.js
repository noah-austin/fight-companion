import express from "express";
import cors from "cors";
import { q, tx, applySchema } from "./db.js";
import { signup, login, sign, requireUser, requireAdmin, httpErr } from "./auth.js";
import { price, grade, METHODS } from "./pricing.js";
import { startPoller, syncOnce, settleFinished, lastRaw } from "./settle.js";

const app = express();
app.use(express.json({ limit: "64kb" }));
app.use(cors({ origin: (process.env.CORS_ORIGINS || "https://noah-austin.github.io").split(",").map((s) => s.trim()) }));

const STARTING_BANKROLL = Number(process.env.STARTING_BANKROLL || 1000);
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

app.get("/health", (_req, res) => res.json({ ok: true }));

// ---- auth ---------------------------------------------------------------------------
app.post("/auth/signup", wrap(async (req, res) => { const u = await signup(req.body || {}); res.json({ token: sign(u), user: u }); }));
app.post("/auth/login",  wrap(async (req, res) => { const u = await login(req.body || {});  res.json({ token: sign(u), user: u }); }));
app.get("/me", requireUser, (req, res) => res.json({ user: req.user }));

// ---- events & fights ----------------------------------------------------------------
// Upcoming and recent cards, with fights, lines, and (if signed in) the caller's bankroll.
app.get("/events", wrap(async (req, res) => {
  const { rows: events } = await q(
    `SELECT * FROM events WHERE date > now() - interval '10 days' ORDER BY date ASC`
  );
  const ids = events.map((e) => e.id);
  const { rows: fights } = ids.length
    ? await q(`SELECT * FROM fights WHERE event_id = ANY($1) ORDER BY event_id, order_idx`, [ids])
    : { rows: [] };
  const byEvent = Object.fromEntries(events.map((e) => [e.id, []]));
  for (const f of fights) byEvent[f.event_id].push(publicFight(f));
  res.json({ events: events.map((e) => ({ ...e, fights: byEvent[e.id] })) });
}));

app.get("/events/:id", wrap(async (req, res) => {
  const { rows: [event] } = await q(`SELECT * FROM events WHERE id=$1`, [req.params.id]);
  if (!event) throw httpErr(404, "no such event");
  const { rows: fights } = await q(`SELECT * FROM fights WHERE event_id=$1 ORDER BY order_idx`, [event.id]);
  const { rows: bets } = await q(
    `SELECT b.*, u.username FROM bets b JOIN users u ON u.id=b.user_id WHERE b.event_id=$1 ORDER BY b.placed_at DESC`, [event.id]
  );
  const { rows: bankrolls } = await q(
    `SELECT u.username, br.starting,
            COALESCE(SUM(CASE WHEN b.status='open' OR b.status='needs_manual' THEN b.stake ELSE 0 END),0)::int AS at_risk,
            COALESCE(SUM(CASE WHEN b.status IN ('won','lost','void') THEN b.payout - b.stake ELSE 0 END),0)::numeric AS settled_pl
       FROM bankrolls br JOIN users u ON u.id=br.user_id
       LEFT JOIN bets b ON b.user_id=br.user_id AND b.event_id=br.event_id
      WHERE br.event_id=$1 GROUP BY u.username, br.starting ORDER BY settled_pl DESC`, [event.id]
  );
  res.json({ event, fights: fights.map(publicFight), bets: bets.map(publicBet), bankrolls });
}));

// ---- bets ---------------------------------------------------------------------------
// Quote without placing: same math the server uses, so the UI can show a live payout.
app.post("/quote", wrap(async (req, res) => {
  const { fight_id, pick_id, method = null, round = null, stake } = req.body || {};
  const f = await fightForBet(fight_id, pick_id);
  const ml = f.f1_id === pick_id ? f.f1_ml : f.f2_ml;
  res.json(price({ ml, method, round, rounds: f.rounds, stake: Number(stake) || 100 }));
}));

app.post("/bets", requireUser, wrap(async (req, res) => {
  const { fight_id, pick_id, method = null, round = null } = req.body || {};
  const stake = Math.floor(Number(req.body?.stake));
  if (!Number.isFinite(stake) || stake < 1) throw httpErr(400, "stake must be at least $1");
  if (method != null && !METHODS.includes(method)) throw httpErr(400, "method must be KO, SUB or DEC");

  const bet = await tx(async (c) => {
    const { rows: [f] } = await c.query(`SELECT * FROM fights WHERE id=$1 FOR UPDATE`, [fight_id]);
    if (!f) throw httpErr(404, "no such fight");
    if (f.status !== "scheduled") throw httpErr(409, "that fight has already started");
    if (f.start_at && new Date(f.start_at) <= new Date()) throw httpErr(409, "that fight has already started");
    if (pick_id !== f.f1_id && pick_id !== f.f2_id) throw httpErr(400, "pick one of the two fighters");
    const ml = pick_id === f.f1_id ? f.f1_ml : f.f2_ml;
    if (ml == null) throw httpErr(409, "no line published for this fight yet");

    await c.query(`INSERT INTO bankrolls (user_id, event_id, starting) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
      [req.user.id, f.event_id, STARTING_BANKROLL]);
    const { rows: [{ available }] } = await c.query(
      `SELECT br.starting - COALESCE(SUM(b.stake),0)::int AS available
         FROM bankrolls br LEFT JOIN bets b ON b.user_id=br.user_id AND b.event_id=br.event_id AND b.status <> 'void'
        WHERE br.user_id=$1 AND br.event_id=$2 GROUP BY br.starting`, [req.user.id, f.event_id]);
    if (stake > available) throw httpErr(409, `only $${available} left this card`);

    const { decimal_total, potential } = price({ ml, method, round, rounds: f.rounds, stake });
    const pick_name = pick_id === f.f1_id ? f.f1_name : f.f2_name;
    const { rows: [b] } = await c.query(
      `INSERT INTO bets (user_id, event_id, fight_id, stake, pick_id, pick_name, method, round, odds_ml, decimal_total, potential)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [req.user.id, f.event_id, f.id, stake, pick_id, pick_name, method, round, ml, decimal_total, potential]);
    return { ...b, username: req.user.username };
  });
  res.status(201).json({ bet: publicBet(bet) });
}));

app.delete("/bets/:id", requireUser, wrap(async (req, res) => {
  const { rows: [b] } = await q(`SELECT b.*, f.status AS fstatus, f.start_at FROM bets b JOIN fights f ON f.id=b.fight_id WHERE b.id=$1`, [req.params.id]);
  if (!b) throw httpErr(404, "no such bet");
  if (b.user_id !== req.user.id) throw httpErr(403, "not your bet");
  if (b.status !== "open" || b.fstatus !== "scheduled" || (b.start_at && new Date(b.start_at) <= new Date())) throw httpErr(409, "too late, that fight started");
  await q(`DELETE FROM bets WHERE id=$1`, [b.id]);
  res.json({ ok: true });
}));

app.post("/bets/:id/react", requireUser, wrap(async (req, res) => {
  const emoji = String(req.body?.emoji || "").slice(0, 8);
  if (!emoji) throw httpErr(400, "emoji required");
  const { rowCount } = await q(`DELETE FROM reactions WHERE bet_id=$1 AND user_id=$2 AND emoji=$3`, [req.params.id, req.user.id, emoji]);
  if (!rowCount) await q(`INSERT INTO reactions (bet_id, user_id, emoji) VALUES ($1,$2,$3)`, [req.params.id, req.user.id, emoji]);
  res.json({ reacted: !rowCount });
}));

// ---- feed & leaderboard ---------------------------------------------------------------
app.get("/feed", wrap(async (req, res) => {
  const { rows } = await q(
    `SELECT b.*, u.username, f.f1_name, f.f2_name, f.weight, e.name AS event_name,
            COALESCE(json_agg(json_build_object('emoji', r.emoji, 'username', ru.username)) FILTER (WHERE r.id IS NOT NULL), '[]') AS reactions
       FROM bets b JOIN users u ON u.id=b.user_id JOIN fights f ON f.id=b.fight_id JOIN events e ON e.id=b.event_id
       LEFT JOIN reactions r ON r.bet_id=b.id LEFT JOIN users ru ON ru.id=r.user_id
      GROUP BY b.id, u.username, f.f1_name, f.f2_name, f.weight, e.name
      ORDER BY b.placed_at DESC LIMIT 100`);
  res.json({ feed: rows.map(publicBet) });
}));

app.get("/leaderboard", wrap(async (_req, res) => {
  const { rows: alltime } = await q(
    `SELECT u.username,
            COALESCE(SUM(CASE WHEN b.status IN ('won','lost','void') THEN b.payout - b.stake END),0)::numeric AS pl,
            COUNT(b.id) FILTER (WHERE b.status='won')::int AS wins,
            COUNT(b.id) FILTER (WHERE b.status='lost')::int AS losses,
            COUNT(DISTINCT b.event_id)::int AS cards
       FROM users u LEFT JOIN bets b ON b.user_id=u.id GROUP BY u.username ORDER BY pl DESC`);
  const { rows: perEvent } = await q(
    `SELECT e.id AS event_id, e.name, e.date, u.username,
            COALESCE(SUM(CASE WHEN b.status IN ('won','lost','void') THEN b.payout - b.stake END),0)::numeric AS pl
       FROM bets b JOIN users u ON u.id=b.user_id JOIN events e ON e.id=b.event_id
      GROUP BY e.id, e.name, e.date, u.username ORDER BY e.date DESC, pl DESC`);
  res.json({ alltime, perEvent });
}));

// ---- admin ------------------------------------------------------------------------------
app.post("/admin/sync", requireAdmin, wrap(async (_req, res) => res.json(await syncOnce())));

// Grant or revoke admin. The first signup is admin automatically; this lets the league
// owner hand it to someone else (or strip it from a test account).
app.post("/admin/promote", requireAdmin, wrap(async (req, res) => {
  const username = String(req.body?.username || "").toLowerCase();
  const is_admin = req.body?.is_admin !== false;
  const { rowCount } = await q(`UPDATE users SET is_admin=$2 WHERE username=$1`, [username, is_admin]);
  if (!rowCount) throw httpErr(404, "no such user");
  res.json({ username, is_admin });
}));

app.get("/admin/users", requireAdmin, wrap(async (_req, res) => {
  const { rows } = await q(`SELECT id, username, is_admin, created_at FROM users ORDER BY id`);
  res.json({ users: rows });
}));

// Settle a fight by hand when ESPN is wrong or missing method/round. Marks it MANUAL so the
// poller never overwrites it.
app.post("/admin/settle", requireAdmin, wrap(async (req, res) => {
  const { fight_id, result_kind, winner_id = null, method = null, round = null } = req.body || {};
  if (!["win", "draw", "nc", "cancelled"].includes(result_kind)) throw httpErr(400, "result_kind: win | draw | nc | cancelled");
  await q(`UPDATE fights SET status=$2, result_kind=$3, winner_id=$4, method=$5, round=$6, raw_detail='MANUAL', updated_at=now() WHERE id=$1`,
    [fight_id, result_kind === "cancelled" ? "cancelled" : "final", result_kind, winner_id, method, round]);
  // Re-grade anything already settled on this fight, then settle the rest.
  await q(`UPDATE bets SET status='open', payout=NULL, settled_at=NULL WHERE fight_id=$1`, [fight_id]);
  const settled = await settleFinished();
  res.json({ settled });
}));

// Raw ESPN competition, so we can see the real odds / result shape from production.
app.get("/admin/debug/:fightId", requireAdmin, (req, res) => {
  const raw = lastRaw.get(req.params.fightId);
  res.json(raw ? { raw } : { error: "not in memory; run /admin/sync first" });
});

// ---- helpers & boot -----------------------------------------------------------------
async function fightForBet(fight_id, pick_id) {
  const { rows: [f] } = await q(`SELECT * FROM fights WHERE id=$1`, [fight_id]);
  if (!f) throw httpErr(404, "no such fight");
  if (pick_id !== f.f1_id && pick_id !== f.f2_id) throw httpErr(400, "pick one of the two fighters");
  if ((pick_id === f.f1_id ? f.f1_ml : f.f2_ml) == null) throw httpErr(409, "no line published for this fight yet");
  return f;
}
const publicFight = (f) => { const { raw_detail, ...rest } = f; return rest; };
const publicBet = (b) => ({ ...b, stake: Number(b.stake), potential: Number(b.potential), payout: b.payout == null ? null : Number(b.payout) });

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ error: status === 500 ? "something broke" : err.message });
});

const port = Number(process.env.PORT || 3000);
await applySchema();
app.listen(port, () => console.log(`fight-companion server on :${port}`));
startPoller();
