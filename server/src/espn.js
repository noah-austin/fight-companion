// ESPN public MMA feed: the same scoreboard the app polls, plus defensive extraction of
// odds and results. Every parser here tolerates missing fields; the raw competition is
// kept so /admin/debug and the sync logs show exactly what ESPN sent.
//
// Verified from production (Sep 20 2026):
//  - the scoreboard carries NO odds; lines live on the core per-competition odds resource
//  - a finished fight's status says only "Final", but status.period + displayClock are set,
//    so a decision is inferred from "5:00 in the last round" and the finish round otherwise
//  - fighter ids are on the competitor object, not always on competitor.athlete

const SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard";
const CORE = "https://sports.core.api.espn.com/v2/sports/mma/leagues/ufc";
const SPINOFF_RX = /contender series|dana white|ultimate fighter|road to ufc|tuf\b/i;
const UA = { "user-agent": "fight-companion/0.1" };

const ymd = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");

export async function fetchScoreboard({ daysBack = 2, daysAhead = 75 } = {}) {
  const start = new Date(Date.now() - daysBack * 864e5);
  const end = new Date(Date.now() + daysAhead * 864e5);
  const res = await fetch(`${SCOREBOARD}?dates=${ymd(start)}-${ymd(end)}`, { headers: UA });
  if (!res.ok) throw new Error(`ESPN ${res.status}`);
  const data = await res.json();
  return (data.events || []).filter((ev) => !SPINOFF_RX.test(ev.name || ""));
}

// Core odds resource for one fight. Returns the items array (possibly empty); never throws.
let oddsErrLogged = false;
export async function fetchOdds(eventId, compId) {
  try {
    const res = await fetch(`${CORE}/events/${eventId}/competitions/${compId}/odds`, { headers: UA });
    if (!res.ok) { if (!oddsErrLogged) { oddsErrLogged = true; console.log(`[odds] core odds ${res.status} for ${eventId}/${compId}`); } return []; }
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch (e) {
    if (!oddsErrLogged) { oddsErrLogged = true; console.log(`[odds] core odds fetch failed: ${e.message}`); }
    return [];
  }
}

// Core competition resource: the only place ESPN says which segment a fight is on.
// Returns the raw JSON or null; never throws.
let compErrLogged = false;
export async function fetchCompetition(eventId, compId) {
  try {
    const res = await fetch(`${CORE}/events/${eventId}/competitions/${compId}`, { headers: UA });
    if (!res.ok) { if (!compErrLogged) { compErrLogged = true; console.log(`[card] core competition ${res.status} for ${eventId}/${compId}`); } return null; }
    return await res.json();
  } catch (e) {
    if (!compErrLogged) { compErrLogged = true; console.log(`[card] core competition fetch failed: ${e.message}`); }
    return null;
  }
}
// Verified Sep 20: cardSegment = {id, name: "main"|"prelims1"|"prelims2", description: "Main Card"|"Prelims"|"Early Prelims"}.
// Returns the readable description, else the slug, else null.
export function cardSegmentOf(comp) {
  const seg = comp?.cardSegment;
  const name = seg?.description || seg?.name || seg?.text || (typeof seg === "string" ? seg : null);
  return name ? String(name).trim() : null;
}

const idOf = (c) => (c?.id != null ? String(c.id) : c?.athlete?.id != null ? String(c.athlete.id) : null);

// --- odds ---------------------------------------------------------------------------
// Given an odds items array (scoreboard or core), find both moneylines. Structured
// home/away fields first, then the "PANTOJA -113" details string as a fallback.
export function extractMoneylines(comp, f1Id, f2Id, items = comp.odds) {
  const o = Array.isArray(items) ? items[0] : null;
  if (!o) return { f1_ml: null, f2_ml: null, source: null };

  const pick = (side) => {
    if (!side) return null;
    const v = side.moneyLine ?? side.moneyline ?? side.current?.moneyLine?.american ?? side.odds;
    const n = typeof v === "string" ? parseInt(v.replace(/[^-+\d]/g, ""), 10) : Number(v);
    return Number.isFinite(n) && n !== 0 ? n : null;
  };
  const provider = o.provider?.name || "espn";

  // MMA uses homeAthleteOdds/awayAthleteOdds (team-sport feeds use *TeamOdds); each side
  // names its athlete via a $ref URL, which is the exact mapping — no home/away guessing.
  const sideId = (side) => { const m = /athletes\/(\d+)/.exec(side?.athlete?.$ref || ""); return m ? m[1] : side?.athlete?.id != null ? String(side.athlete.id) : null; };
  const homeS = o.homeAthleteOdds || o.homeTeamOdds, awayS = o.awayAthleteOdds || o.awayTeamOdds;
  const homeMl = pick(homeS), awayMl = pick(awayS);
  if (homeMl != null && awayMl != null) {
    const hId = sideId(homeS), aId = sideId(awayS);
    if (hId === String(f1Id) || aId === String(f2Id)) return { f1_ml: homeMl, f2_ml: awayMl, source: provider };
    if (aId === String(f1Id) || hId === String(f2Id)) return { f1_ml: awayMl, f2_ml: homeMl, source: provider };
    const comps = comp.competitors || [];
    const home = comps.find((c) => c.homeAway === "home") || comps[0];
    if (home) return idOf(home) === String(f1Id)
      ? { f1_ml: homeMl, f2_ml: awayMl, source: provider + "-homeaway" }
      : { f1_ml: awayMl, f2_ml: homeMl, source: provider + "-homeaway" };
  }
  const comps = comp.competitors || [];

  const m = /([A-Z][A-Z' .-]+?)\s*([-+]\d{3,4})\b/.exec(String(o.details || "").toUpperCase());
  if (m) {
    const fav = parseInt(m[2], 10);
    const surname = m[1].trim().split(/\s+/).pop();
    const f1Name = (comps[0]?.athlete?.displayName || comps[0]?.athlete?.fullName || "").toUpperCase();
    const favIsF1 = f1Name.includes(surname);
    const dog = fav < 0 ? Math.abs(fav) : -fav;   // symmetric line when only the favorite is quoted
    return favIsF1 ? { f1_ml: fav, f2_ml: dog, source: `${provider}-details` } : { f1_ml: dog, f2_ml: fav, source: `${provider}-details` };
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

// Finished fights carry a `details` array: a play-by-play log ("Walkout", "Knockdown",
// "Submission Attempt", ...) plus one result entry, e.g. "Unofficial Winner Decision" or
// "Unofficial Winner Kotko" (ESPN's spelling of KO/TKO). Only that entry decides the method.
function methodFromDetails(c) {
  if (!Array.isArray(c.details)) return null;
  for (const d of c.details) {
    const t = String(d.type?.text || d.text || "").trim();
    const m = /^(?:unofficial\s+)?winner\s+(.+)$/i.exec(t);
    if (!m) continue;
    const k = m[1].toUpperCase();
    if (/DECISION|\bDEC\b|UNANIMOUS|SPLIT|MAJORITY/.test(k)) return { kind: "win", method: "DEC" };
    if (/KOTKO|\bKO\b|TKO|KNOCKOUT/.test(k)) return { kind: "win", method: "KO" };
    if (/SUBMISSION|\bSUB\b/.test(k)) return { kind: "win", method: "SUB" };
    if (/DISQUALIF|\bDQ\b/.test(k)) return { kind: "win", method: "DQ" };
    if (/NO CONTEST|\bNC\b/.test(k)) return { kind: "nc" };
    if (/DRAW/.test(k)) return { kind: "draw" };
  }
  return null;
}
function detailsText(c) {
  if (!Array.isArray(c.details)) return "";
  return c.details.map((d) => d.type?.text || d.text || "").filter(Boolean).join(" | ");
}

export function normalizeEvent(ev) {
  const comps = ev.competitions || [];
  const venue = comps[0]?.venue?.fullName || null;
  const fights = comps.map((c, i) => {
    const cs = c.competitors || [];
    const a = cs[0] || {}, b = cs[1] || {};
    const f1_id = idOf(a), f2_id = idOf(b);
    const st = c.status?.type || {};
    const statusText = [st.detail, st.shortDetail, st.description].filter(Boolean).join(" | ");
    const detail = [statusText, c.status?.displayClock, detailsText(c)].filter(Boolean).join(" | ");
    const rounds = c.format?.regulation?.periods === 5 ? 5 : 3;
    const { f1_ml, f2_ml, source } = extractMoneylines(c, f1_id, f2_id);

    let status = "scheduled", result_kind = null, winner_id = null, method = null, round = null;
    if (LIVE.has(st.name)) status = "live";
    if (FINAL.has(st.name)) {
      status = "final";
      const winner = a.winner === true ? a : b.winner === true ? b : null;
      const parsed = methodFromDetails(c) || methodFrom(statusText);
      const period = Number(c.status?.period);
      const clock = c.status?.displayClock || "";
      if (!winner) result_kind = parsed.kind === "win" ? null : parsed.kind;   // no winner flag: draw/NC or unknown
      else {
        result_kind = "win"; winner_id = idOf(winner); method = parsed.method;
        // Went the full distance -> decision, even when ESPN's text is just "Final".
        if (method == null && period === rounds && /^5:00$/.test(clock)) method = "DEC";
      }
      round = method === "DEC" ? null : Number.isFinite(period) && period > 0 ? period : null;
    }
    if (st.name === "STATUS_CANCELED" || st.name === "STATUS_POSTPONED") { status = "cancelled"; result_kind = "cancelled"; }

    return {
      id: String(c.id), order_idx: i,
      weight: c.type?.text || c.type?.abbreviation || null,
      rounds,
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
