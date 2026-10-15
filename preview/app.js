"use strict";
/* =====================================================================
   Fight Companion v3 — app logic (Oct 2026 redesign)
   Live schedule + results: ESPN's public scoreboard. Headshots: ESPN CDN.
   Written analysis (breakdowns, rankings, storylines) lives in data.js,
   which loads after this file and is the only file a data refresh edits.
   Push alerts go through the Railway server (server/) and sw.js.
   ===================================================================== */

const SPINOFF_RX = /contender series|dana white|ultimate fighter|road to ufc|tuf\b/i;
const ALERTS_API = "https://api-production-34f6c.up.railway.app";
const SW_URL = "../sw.js";

/* ---------- baked data containers (filled by data.js) ---------- */
const FIGHTERS = {};
const MATCHUPS = {};
const EVENT_META = [];
const FALLBACK_EVENTS = [];
const DIVISIONS = { men: [], women: [] };
const P4P = { men: [], women: [], explain: "" };
const STORYLINES = [];
const EXPLAINERS = [];
const ESPN_IDS = {};

/* ---------- helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const norm = s => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");
const pairKey = (a, b) => [norm(a), norm(b)].sort().join("|");
const lastTok = name => norm((name || "").trim().split(/\s+/).pop());
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const lastName = n => (n || "").trim().split(/\s+/).filter(w => !/^(jr\.?|sr\.?|ii|iii|iv)$/i.test(w)).pop() || "";
const inKey = (key, name) => {
  const n = norm(name);
  if (n.length > 2 && key.includes(n)) return true;
  const t = lastTok(name);
  return t.length > 3 && key.includes(t);
};
function findMatchup(n1, n2) {
  const exact = MATCHUPS[pairKey(n1, n2)];
  if (exact) return exact;
  const hit = Object.keys(MATCHUPS).find(k => inKey(k, n1) && inKey(k, n2));
  return hit ? MATCHUPS[hit] : null;
}
// Exact name, else same last name AND first initial (spelling drift like Loopy/Lupita
// Godinez) without handing one Hernandez another Hernandez's breakdown.
function findFighter(name) {
  const k = norm(name);
  if (FIGHTERS[k]) return FIGHTERS[k];
  const t = lastTok(name);
  if (t.length <= 3) return null;
  const hits = Object.keys(FIGHTERS).filter(x => x.endsWith(t) && x[0] === k[0]);
  return hits.length === 1 ? FIGHTERS[hits[0]] : null;
}
function sameFighter(a, b) {
  const x = norm(a), y = norm(b);
  if (!x || !y) return false;
  if (x === y) return true;
  const t = lastTok(a);
  return t.length > 3 && t === lastTok(b) && x[0] === y[0];
}
function espnIdFor(name, liveId) {
  if (liveId) return liveId;
  const k = norm(name);
  if (ESPN_IDS[k]) return ESPN_IDS[k];
  const t = lastTok(name);
  if (t.length <= 3) return null;
  const hits = Object.keys(ESPN_IDS).filter(x => x.endsWith(t) && x[0] === k[0]);
  return hits.length === 1 ? ESPN_IDS[hits[0]] : null;
}
function avatar(name, size, ring, liveId) {
  if (/^vacant$/i.test((name || "").trim())) return `<span class="av av-${size} vacant ${ring || ""}"><i>&#127942;</i></span>`;
  const id = espnIdFor(name, liveId);
  const initials = (name || "?").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const img = id ? `<img loading="lazy" src="https://a.espncdn.com/i/headshots/mma/players/full/${encodeURIComponent(id)}.png" alt="" onerror="this.remove()">` : "";
  return `<span class="av av-${size} ${ring || ""}"><i>${esc(initials)}</i>${img}</span>`;
}
const fighterAttrs = (name, id) => ` data-fighter="${esc(name)}"${id ? ` data-fid="${esc(String(id))}"` : ""}`;
const wtLabel = w => (w || "").replace(/^W\s+/i, "Women's ").replace(/^Women's\s+/i, "Women's ");
const shortEventName = n => /fight night/i.test(n || "") ? n.replace(/^UFC Fight Night:\s*/i, "") : (n || "").split(":")[0];
const timeOf = ms => new Date(ms).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

function fmtEventDate(iso) {
  const d = new Date(iso), now = new Date();
  const date = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const short = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }).replace(",", "");
  // calendar-day difference, so "tomorrow" means tomorrow, not "less than 48 hours"
  const dayDiff = Math.round((new Date(d.toDateString()) - new Date(now.toDateString())) / 86400000);
  const rel = dayDiff === 0 ? "Tonight" : dayDiff === 1 ? "Tomorrow" : dayDiff > 1 ? "In " + dayDiff + " days" : "";
  return { date, short, time: timeOf(d), rel, dayDiff };
}

/* ---------- live schedule (ESPN) ---------- */
function espnUrl() {
  const p = d => d.toISOString().slice(0, 10).replace(/-/g, "");
  const start = new Date(Date.now() - 9 * 86400000);   // last weekend's results stay visible
  const end = new Date(Date.now() + 75 * 86400000);
  return `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard?dates=${p(start)}-${p(end)}`;
}

const LIVE_STATUSES = ["STATUS_IN_PROGRESS", "STATUS_END_PERIOD", "STATUS_HALFTIME"];
function normalizeEspnEvent(ev) {
  const comps = ev.competitions || [];
  const venue = (comps[0] && comps[0].venue && comps[0].venue.fullName) || "";
  return {
    name: ev.name,
    date: ev.date,
    venue,
    fights: comps.map(c => {
      const cs = c.competitors || [];
      const f = i => cs[i] ? {
        name: (cs[i].athlete && (cs[i].athlete.displayName || cs[i].athlete.fullName)) || "TBA",
        record: (cs[i].records && cs[i].records[0] && cs[i].records[0].summary) || "",
        winner: cs[i].winner === true,
        id: cs[i].id || (cs[i].athlete && cs[i].athlete.id) || null   // ESPN puts the athlete id on the competitor
      } : { name: "TBA", record: "", winner: false, id: null };
      const st = c.status || {};
      const status = st.type ? st.type.name : "";
      const fight = {
        weight: (c.type && (c.type.text || c.type.abbreviation)) || "",
        f1: f(0), f2: f(1),
        date: c.date || c.startDate || null,
        rounds: (c.format && c.format.regulation && c.format.regulation.periods) || 3,
        period: Number(st.period) || 0,
        done: status === "STATUS_FINAL",
        live: LIVE_STATUSES.includes(status),
        between: status === "STATUS_END_PERIOD" || status === "STATUS_HALFTIME",
        cancelled: status === "STATUS_CANCELED" || status === "STATUS_POSTPONED"
      };
      if (fight.done) fight.result = resultOf(c, fight);
      return fight;
    })
  };
}

// How a finished fight ended. Same rules as the server's settlement (server/src/espn.js):
// only the "Unofficial Winner Kotko|Decision|Submission" entry in `details` names the method;
// the rest of `details` is play-by-play. 5:00 of the last round with no entry = decision.
function resultOf(c, fight) {
  let method = null, kind = (fight.f1.winner || fight.f2.winner) ? "win" : null;
  (Array.isArray(c.details) ? c.details : []).forEach(d => {
    const m = /^(?:unofficial\s+)?winner\s+(.+)$/i.exec(String((d.type && d.type.text) || d.text || "").trim());
    if (!m || method) return;
    const k = m[1].toUpperCase();
    if (/DECISION|\bDEC\b|UNANIMOUS|SPLIT|MAJORITY/.test(k)) method = "DEC";
    else if (/KOTKO|\bKO\b|TKO|KNOCKOUT/.test(k)) method = "KO";
    else if (/SUBMISSION|\bSUB\b/.test(k)) method = "SUB";
    else if (/DISQUALIF|\bDQ\b/.test(k)) method = "DQ";
    else if (/NO CONTEST|\bNC\b/.test(k)) kind = "nc";
    else if (/DRAW/.test(k)) kind = "draw";
  });
  const clock = (c.status && c.status.displayClock) || "";
  if (kind === "win" && !method && fight.period === fight.rounds && /^5:00$/.test(clock)) method = "DEC";
  return { kind, method, round: method === "DEC" ? null : fight.period || null, clock: method === "DEC" ? "" : clock };
}
const METHOD_TXT = { KO: "KO/TKO", SUB: "Submission", DEC: "Decision", DQ: "DQ" };
const METHOD_SHORT = { KO: "KO", SUB: "Sub", DEC: "Dec", DQ: "DQ" };
// "KO/TKO · R1, 2:09" / "Decision" / "Draw" — "" when ESPN didn't say
function howItEnded(f, short) {
  const r = f.result;
  if (!r) return "";
  if (r.kind === "draw") return "Draw";
  if (r.kind === "nc") return "No contest";
  if (!r.method) return "";
  const m = short ? METHOD_SHORT[r.method] : METHOD_TXT[r.method];
  if (!r.round) return m;
  return m + " · R" + r.round + (!short && r.clock && r.clock !== "0:00" ? ", " + r.clock : "");
}
// "Round 2 of 3" / "Between rounds 1 & 2"
function liveText(f) {
  if (f.between) return f.period ? "Between rounds " + f.period + " & " + (f.period + 1) : "Between rounds";
  return f.period ? "Round " + f.period + " of " + f.rounds : "Live";
}
// Chronological (ESPN) order: the fight in the cage now, and the next one up.
function liveSnapshot(ev) {
  const chron = ev.fights.filter(f => !f.cancelled);
  const now = chron.find(f => f.live) || null;
  const from = now ? chron.indexOf(now) + 1 : 0;
  const next = chron.slice(from).find(f => !f.done && !f.live) || null;
  return { now, next };
}
const winnerOf = f => f.done && (f.f1.winner || f.f2.winner) ? (f.f1.winner ? f.f1 : f.f2) : null;

// Live = a fight is on, or the card has started (some results in, more to come) within 12h.
// Past = every fight settled, or (offline snapshot, no results) the card is over 12h old.
function eventState(ev) {
  if (ev.fights.some(f => f.live)) return "live";
  const settled = ev.fights.filter(f => f.done || f.cancelled).length;
  const stale = new Date(ev.date) < Date.now() - 12 * 3600e3;
  if ((ev.fights.length && settled === ev.fights.length) || stale) return "past";
  return settled > 0 ? "live" : "upcoming";
}
const evKey = ev => norm(ev.name) + "-" + String(ev.date).slice(0, 10);
function eventMetaFor(name) {
  const n = (name || "").toLowerCase();
  return EVENT_META.find(m => m.match.some(x => n.includes(x))) || null;
}

// Main card vs prelims. ESPN lists fights chronologically: earliest prelim FIRST, main
// event LAST. With baked meta we know the true main card (in broadcast order); without
// it, the last fight is the main event and everything else is a prelim.
function splitCard(ev) {
  const meta = eventMetaFor(ev.name);
  const mainKeys = meta ? meta.mainCard : [];
  const mains = [], prelims = [];
  ev.fights.forEach(f => {
    const i = mainKeys.findIndex(k => inKey(k, f.f1.name) && inKey(k, f.f2.name));
    if (i >= 0) mains[i] = f; else prelims.push(f);
  });
  const mainsClean = mains.filter(Boolean);
  const reversed = [...ev.fights].reverse();
  const useMains = mainsClean.length ? mainsClean : reversed.slice(0, 1);
  const usePrelims = mainsClean.length ? [...prelims].reverse() : reversed.slice(1);  // featured prelim first
  return { meta, mains: useMains, prelims: usePrelims, mainsClean };
}

// Start times from ESPN's per-fight dates: the main card starts at its earliest fight; the
// prelims (and early prelims, on numbered cards) are the earlier time groups. Returns null
// when ESPN gives one time for everything; the event time is shown instead.
function cardTimes(ev, mainsClean) {
  const t = d => new Date(d).getTime();
  const dated = ev.fights.filter(f => f.date && !isNaN(t(f.date)));
  const groups = [...new Set(dated.map(f => t(f.date)))].sort((a, b) => a - b);
  if (groups.length < 2 || groups.length > 6) return null;
  let main = mainsClean.length ? Math.min(...mainsClean.filter(f => f.date).map(f => t(f.date))) : NaN;
  if (!isFinite(main)) { if (groups.length > 3) return null; main = groups[groups.length - 1]; }
  const earlier = groups.filter(g => g < main);
  if (!earlier.length) return null;
  const prelims = earlier[earlier.length - 1];
  const early = earlier.length >= 2 ? earlier[0] : null;
  return { main, prelims, early };
}

/* ---------- odds text -> plain English ---------- */
// best-effort favorite detection from the odds text ("Makhachev -350, Garry +255")
function favoriteOf(f) {
  const L = parseLine(findMatchup(f.f1.name, f.f2.name), f);
  if (!L || (L.a < 0 && L.b < 0) || L.a === L.b) return null;
  return norm(L.a < L.b ? f.f1.name : f.f2.name);
}
// The two moneylines from MATCHUPS odds text ("Allen -145, Duncan +120 — note"), mapped to
// the bout's fighters by name. Returns null when it can't be read cleanly.
function parseLine(mu, f) {
  if (!mu || !mu.odds) return null;
  const txt = mu.odds.replace(/−/g, "-");
  const head = txt.split(/\s[—-]\s/)[0];
  // try each part of the name, last first (handles "Wang Cong", whose family name comes first)
  const ml = name => {
    const toks = (name || "").trim().split(/\s+/).filter(w => w.length > 2 && !/^(jr\.?|sr\.?|ii|iii|iv)$/i.test(w)).reverse();
    for (const t of toks) {
      const m = new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[^,;]{0,14}?([-+]\\d{3,5})", "i").exec(head);
      if (m) return parseInt(m[1], 10);
    }
    return null;
  };
  const a = ml(f.f1.name), b = ml(f.f2.name);
  if (a == null || b == null) return null;
  const rest = txt.includes("—") ? txt.slice(txt.indexOf("—") + 1).trim() : "";
  return { a, b, rest };
}
function oddsHtml(mu, f) {
  const L = parseLine(mu, f);
  if (!L) return mu && mu.odds ? `<div class="odds">${mu.odds}</div>` : "";
  const inOdds = name => (name || "").trim().split(/\s+/).reverse().find(t => t.length > 2 && new RegExp("\\b" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(mu.odds)) || lastName(name);
  const n1 = inOdds(f.f1.name), n2 = inOdds(f.f2.name);
  const win = ml => ml > 0 ? ml : Math.round(10000 / -ml);
  let txt;
  if (L.a < 0 && L.b < 0) txt = `<b>Basically a coin flip.</b> Both sides are priced as slight favorites (${esc(n1)} ${L.a}, ${esc(n2)} ${L.b}).`;
  else {
    const favFirst = L.a < L.b;
    const [fav, favMl, dog, dogMl] = favFirst ? [n1, L.a, n2, L.b] : [n2, L.b, n1, L.a];
    const big = favMl <= -400 ? " — a heavy favorite" : favMl >= -130 ? " — only a slight favorite" : "";
    txt = `<b>${esc(fav)} is the favorite</b>${big} (${favMl}): $100 on ${esc(fav)} wins $${win(favMl)}. ${esc(dog)} is the underdog (+${Math.abs(dogMl)}): $100 wins $${win(dogMl)}.`;
  }
  return `<div class="odds">${txt}${L.rest ? '<span class="sub">' + L.rest + "</span>" : ""}</div>`;
}

// Tale of the tape. Height/reach come from FIGHTERS (ht, reach in inches, optional);
// fighting weight comes from the bout's weight class, so it's always the right number.
const DIV_LB = [[/light\s*heavy/i, 205], [/heavy/i, 265], [/middle/i, 185], [/welter/i, 170], [/light/i, 155], [/feather/i, 145], [/bantam/i, 135], [/fly/i, 125], [/straw/i, 115]];
const divPounds = w => { const m = DIV_LB.find(([rx]) => rx.test(w || "")); return m ? m[1] : null; };
const ftIn = h => Math.floor(h / 12) + "′" + (h % 12) + "″";
function taleOfTape(p1, p2, f) {
  const lb = divPounds(f.weight), catchW = /catch/i.test(f.weight || "");
  const rows = [
    ["Record", f.f1.record || "—", f.f2.record || "—", null],
    ["Age", p1 && p1.age ? p1.age : "—", p2 && p2.age ? p2.age : "—", null],
    ["Height", p1 && p1.ht ? ftIn(p1.ht) : "—", p2 && p2.ht ? ftIn(p2.ht) : "—", [p1 && p1.ht, p2 && p2.ht]],
    ["Reach", p1 && p1.reach ? p1.reach + "″" : "—", p2 && p2.reach ? p2.reach + "″" : "—", [p1 && p1.reach, p2 && p2.reach]],
  ];
  if (lb && !catchW) rows.push(["Weight", lb + " lb", lb + " lb", null]);
  const cell = (v, cmp, i, cls) => {
    const adv = cmp && cmp[0] && cmp[1] && cmp[i] > cmp[1 - i] ? " adv" : "";
    return `<div class="${cls}${adv}">${esc(String(v))}</div>`;
  };
  return `<div class="tot">
    <div class="tot-row"><div class="nm">${esc(lastName(f.f1.name))}</div><div class="k">Tale of the tape</div><div class="nm r">${esc(lastName(f.f2.name))}</div></div>
    ${rows.map(([k, a, b, cmp]) => `<div class="tot-row">${cell(a, cmp, 0, "")}<div class="k">${k}</div>${cell(b, cmp, 1, "r")}</div>`).join("")}
  </div>`;
}

/* =====================================================================
   App state
   ===================================================================== */
const S = {
  events: null,        // normalized events (live feed or fallback snapshot)
  offline: false,
  sel: null,           // evKey of the card being shown
  prelimsOpen: {},     // evKey -> true
  scrolledTo: null,    // evKey the switcher was last scrolled to
};
let pollTimer = null;

async function loadEvents() {
  try {
    const res = await fetch(espnUrl(), { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const events = (data.events || [])
      .filter(ev => !SPINOFF_RX.test(ev.name || ""))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(normalizeEspnEvent);
    if (!events.length) throw new Error("empty");
    S.offline = false;
    alertOnChanges(events);
    S.events = events;
  } catch (e) {
    if (!S.events || S.offline) { S.offline = true; S.events = FALLBACK_EVENTS; }
    // a failed poll during a live card keeps the last good data on screen
  }
  renderFights();
  refreshSheets();
  if (!S.offline) scheduleNextPoll(S.events);
}

/* ---------- fight-night live mode ---------- */
function isCardWindow(events) {
  const now = Date.now();
  return events.some(ev =>
    ev.fights.some(f => f.live) || eventState(ev) === "live" ||
    (now >= new Date(ev.date).getTime() - 30 * 60000 && now <= new Date(ev.date).getTime() + 8 * 3600000));
}
function scheduleNextPoll(events) {
  if (pollTimer) { clearTimeout(pollTimer); pollTimer = null; }
  const soon = events.some(ev => { const dt = new Date(ev.date).getTime() - Date.now(); return dt > 0 && dt < 2 * 3600000; });
  const delay = isCardWindow(events) ? 60000 : soon ? 5 * 60000 : null;   // fight night: every minute
  if (delay) pollTimer = setTimeout(() => { pollTimer = null; if (document.visibilityState === "visible") loadEvents(); }, delay);
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && S.events && !S.offline && isCardWindow(S.events) && !pollTimer) loadEvents();
});

/* ---------- in-app alerts (toasts) on status changes ---------- */
let ALERTS_ON = false;
try { ALERTS_ON = localStorage.getItem("fc-alerts") === "1"; } catch (e) {}
function toast(em, title, body) {
  let holder = document.getElementById("toasts");
  if (!holder) { holder = document.createElement("div"); holder.id = "toasts"; document.body.appendChild(holder); }
  const el = document.createElement("div");
  el.className = "toast";
  el.setAttribute("role", "status");
  el.innerHTML = `<div class="em">${em}</div><div><div class="tt">${esc(title)}</div><div class="tb">${esc(body)}</div></div>`;
  el.addEventListener("click", () => el.remove());
  holder.appendChild(el);
  setTimeout(() => el.remove(), 7000);
}
let PREV_STATUS = null;
function alertOnChanges(events) {
  const cur = {};
  events.forEach(ev => ev.fights.forEach(f => { cur[pairKey(f.f1.name, f.f2.name)] = { live: f.live, done: f.done, f, ev: ev.name }; }));
  if (PREV_STATUS && ALERTS_ON) {
    Object.keys(cur).forEach(pk => {
      const now = cur[pk], was = PREV_STATUS[pk];
      if (!was) return;
      const names = now.f.f1.name + " vs " + now.f.f2.name;
      if (now.live && !was.live && !was.done) toast("🔴", names + " — starting now", shortEventName(now.ev));
      if (now.done && !was.done) {
        const w = winnerOf(now.f), how = howItEnded(now.f);
        if (w) toast("🏁", w.name + " wins" + (how ? " · " + how : ""), names);
      }
    });
  }
  PREV_STATUS = cur;
}

/* ---------- add-to-calendar (.ics with built-in alarms) ---------- */
function downloadIcs(ev) {
  const dt = new Date(ev.date);
  const fmt = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(dt.getTime() + 6 * 3600000);
  const name = ev.name.replace(/[,;]/g, "\\$&");
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Fight Companion//EN",
    "BEGIN:VEVENT", "UID:" + norm(ev.name) + "@fight-companion", "DTSTAMP:" + fmt(new Date()),
    "DTSTART:" + fmt(dt), "DTEND:" + fmt(end),
    "SUMMARY:🥊 " + name,
    "LOCATION:" + (ev.venue || "").replace(/[,;]/g, "\\$&"),
    "DESCRIPTION:Fight card reminder from Fight Companion — noah-austin.github.io/fight-companion",
    "BEGIN:VALARM", "TRIGGER:-PT1H", "ACTION:DISPLAY", "DESCRIPTION:🥊 " + name + " starts in 1 hour", "END:VALARM",
    "BEGIN:VALARM", "TRIGGER:PT0M", "ACTION:DISPLAY", "DESCRIPTION:🥊 " + name + " is starting", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url; a.download = norm(ev.name).slice(0, 30) + ".ics";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast("🗓", "Calendar reminder ready", "Open the file and add it — your phone will remind you an hour before and at the start.");
}

/* =====================================================================
   Fights tab
   ===================================================================== */
function featuredEvent(evs) {
  return evs.find(ev => eventState(ev) === "live") || evs.find(ev => eventState(ev) === "upcoming") || evs[evs.length - 1];
}

function renderFights() {
  const box = document.getElementById("fightsView");
  const evs = S.events || [];
  const live = evs.some(ev => eventState(ev) === "live") && !S.offline;
  document.querySelector('.tab[data-page="fights"]').classList.toggle("is-live", live);
  if (!evs.length) { box.innerHTML = '<div class="card empty">No UFC cards on the schedule right now. Check back soon.</div>'; return; }
  if (!S.sel || !evs.some(ev => evKey(ev) === S.sel)) S.sel = evKey(featuredEvent(evs));
  const ev = evs.find(e => evKey(e) === S.sel);

  let html = "";
  if (S.offline) html += `<div class="banner warn"><span><b>Offline</b> — showing the saved schedule from ${esc(ANALYSIS_STAMP)}.</span><button class="btn sm" type="button" data-act="retry">Try again</button></div>`;
  html += `<div class="evbar" role="tablist" aria-label="Fight cards">${evs.map(e => evPill(e)).join("")}</div>`;
  html += eventView(ev);
  html += `<div class="foot">Times are in your time zone. Results and records update live from ESPN.<br>Breakdowns written ${esc(ANALYSIS_STAMP)}.</div>`;
  box.innerHTML = html;

  if (S.scrolledTo !== S.sel) {
    const pill = box.querySelector(".evpill.sel");
    if (pill) pill.parentElement.scrollLeft = Math.max(0, pill.offsetLeft - 16);
    S.scrolledTo = S.sel;
  }
}

function evPill(ev) {
  const st = eventState(ev), k = evKey(ev);
  const { short, rel } = fmtEventDate(ev.date);
  const d = st === "live" ? '<span class="pulse"></span>Live now' : st === "past" ? "Final · " + short.replace(/^\w+\s/, "") : (rel === "Tonight" || rel === "Tomorrow" ? rel : short);
  return `<button class="evpill ${st} ${k === S.sel ? "sel" : ""}" type="button" role="tab" aria-selected="${k === S.sel}" data-ev="${esc(k)}">
    <span class="d">${d}</span><span class="n">${esc(shortEventName(ev.name))}</span></button>`;
}

function eventView(ev) {
  const k = evKey(ev);
  const st = eventState(ev);
  const { meta, mains, prelims, mainsClean } = splitCard(ev);
  const T = cardTimes(ev, mainsClean);
  const dt = fmtEventDate(ev.date);
  const me = mains[0];

  // poster
  const status = st === "live" && !S.offline ? '<span class="badge live"><span class="pulse"></span>Live now</span>'
    : st === "past" ? '<span class="badge final">Final</span>'
    : dt.rel ? `<span class="badge soon">${dt.rel}</span>` : "";
  const titles = meta && meta.titles ? `<span class="badge title">&#127942; ${esc(meta.titles)}</span>` : "";
  let face = "";
  if (me) {
    const w = winnerOf(me);
    const side = (x, ring) => `<div class="fo-side ${w ? (x.winner ? "won" : "lost") : ""}"${fighterAttrs(x.name, x.id)}>
        ${avatar(x.name, 92, ring, x.id)}
        <div class="fo-name">${esc(x.name)}</div>
        <div class="fo-meta">${w && x.winner ? '<span class="tag-won">&#10003; Winner</span>' : esc(x.record)}</div>
      </div>`;
    const how = w ? howItEnded(me, true) : "";
    const mid = w ? `<div class="fo-how">${esc(how || "Final")}</div>`
      : me.live ? `<div class="fo-how" style="color:var(--red)">${me.between ? "Break" : "R" + (me.period || 1)}</div>`
      : '<div class="fo-vs">VS</div>';
    face = `<div class="faceoff">${side(me.f1, "red")}<div class="fo-mid">${mid}<div class="fo-wc">${esc(wtLabel(me.weight))}<br>Main event</div></div>${side(me.f2, "blue")}</div>`;
  }
  const timeCells = T
    ? (T.early ? `<div><span class="k">Early prelims</span><span class="v">${timeOf(T.early)}</span></div>` : "") +
      `<div><span class="k">Prelims</span><span class="v">${timeOf(T.prelims)}</span></div>` +
      `<div class="main"><span class="k">Main card</span><span class="v">${timeOf(T.main)}</span></div>`
    : `<div class="main"><span class="k">Starts</span><span class="v">${dt.time}</span></div>`;
  const remind = st === "upcoming" ? `<button class="btn ghost" type="button" data-act="ics">&#128467; Remind me</button>` : "";
  let html = `<section class="poster" aria-label="${esc(ev.name)}">
    <div class="p-head">
      <div class="p-badges">${status}${titles}</div>
      <h2 class="p-name">${esc(ev.name.replace(/^UFC Fight Night:\s*/i, ""))}</h2>
      <div class="p-sub">${esc(dt.date)}${ev.venue ? " · " + esc(ev.venue) : ""}</div>
    </div>
    ${face}
    <div class="times">${timeCells}</div>
    ${remind ? `<div class="p-foot"><span>Your time zone</span>${remind}</div>` : ""}
  </section>`;

  // live: what's in the cage, what's next
  if (st === "live" && !S.offline) {
    const { now, next } = liveSnapshot(ev);
    const vs = x => `<b>${esc(lastName(x.f1.name))}</b> vs <b>${esc(lastName(x.f2.name))}</b>`;
    html += `<div class="livebox" aria-live="polite">
      <div class="row"><span class="k">Now</span><span class="v">${now ? vs(now) + " · " + esc(liveText(now)) : "Between fights"}</span></div>
      ${next ? `<div class="row next"><span class="k">Up next</span><span class="v">${vs(next)}</span></div>` : ""}
    </div>`;
  }

  if (meta && meta.note) html += `<div class="card story"><div class="k">${st === "past" ? "How it went" : "Why watch"}</div><div class="t">${meta.note}</div><button class="more-btn" type="button" data-act="more">Read more</button></div>`;

  // fight lists
  const tag = (label, ms, main) => `<div class="seg ${main ? "main" : ""}"><h3>${label}</h3>${ms ? `<span class="t">${timeOf(ms)}</span>` : ""}</div>`;
  html += tag("Main card", T && T.main, true);
  html += `<div class="card fights">${mains.map(f => fightRow(f, k)).join("")}</div>`;
  if (prelims.length) {
    const open = S.prelimsOpen[k] || prelims.some(f => f.live) || (st === "live" && !mains.some(f => f.done || f.live));
    if (!open) {
      html += `<button class="btn block toggle-prelims" type="button" data-act="prelims">Show the prelims (${prelims.length} fights)</button>`;
    } else if (T && T.early) {
      const t = f => f.date ? new Date(f.date).getTime() : NaN;
      const early = prelims.filter(f => t(f) < T.prelims), reg = prelims.filter(f => !(t(f) < T.prelims));
      html += tag("Prelims", T.prelims) + `<div class="card fights">${reg.map(f => fightRow(f, k)).join("")}</div>`;
      if (early.length) html += tag("Early prelims", T.early) + `<div class="card fights">${early.map(f => fightRow(f, k)).join("")}</div>`;
    } else {
      html += tag("Prelims", T && T.prelims) + `<div class="card fights">${prelims.map(f => fightRow(f, k)).join("")}</div>`;
    }
  }
  return html;
}

function fightRow(f, k) {
  const mu = findMatchup(f.f1.name, f.f2.name);
  const p1 = findFighter(f.f1.name), p2 = findFighter(f.f2.name);
  const w = winnerOf(f);
  const fav = !f.done && !f.live ? favoriteOf(f) : null;
  const cls = x => (w ? (x.winner ? "won" : "lost") : "");
  const sub = x => w && x.winner ? '<span class="tag-won">&#10003; Won</span>'
    : esc(x.record) + (fav && norm(x.name) === fav ? ' · <span class="tag-fav">Fav</span>' : "");
  const side = (x, ring, ab) => `<div class="fs ${ab} ${cls(x)}">${avatar(x.name, 36, ring, x.id)}<div class="fs-t"><div class="nm">${esc(x.name)}</div><div class="sub">${sub(x)}</div></div></div>`;
  let mid;
  if (f.live) mid = `<span class="lv"><span class="pulse"></span>${f.between ? "Break" : "R" + (f.period || 1)}</span>`;
  else if (f.done) {
    const r = f.result || {};
    mid = r.kind === "draw" || r.kind === "nc" ? `<span class="how">${r.kind === "draw" ? "Draw" : "NC"}</span>`
      : r.method ? `<span class="how">${METHOD_SHORT[r.method]}${r.round ? `<small>R${r.round}${r.clock && r.clock !== "0:00" ? " " + esc(r.clock) : ""}</small>` : ""}</span>`
      : '<span class="how">Final</span>';
  } else if (f.cancelled) mid = '<span class="how"><small>Off</small></span>';
  else mid = '<span class="vs">VS</span>';
  const go = mu || p1 || p2 ? '<span class="fr-go">Breakdown</span>' : '<span class="fr-go">Details</span>';
  return `<button class="fr ${f.live ? "live" : ""} ${f.cancelled ? "cxl" : ""}" type="button" data-fight="${esc(pairKey(f.f1.name, f.f2.name))}" data-ev="${esc(k)}">
    <div class="fr-top"><span class="fr-wc">${esc(wtLabel(f.weight))}</span>${mu && mu.title ? `<span class="badge title">&#127942; Title</span>` : ""}${go}</div>
    <div class="fr-main">${side(f.f1, "red", "a")}<div class="fr-mid">${mid}</div>${side(f.f2, "blue", "b")}</div>
  </button>`;
}

/* =====================================================================
   Sheets (bottom panels): fight breakdown, fighter, division, settings.
   Each one is a history entry, so the phone's back gesture closes it.
   ===================================================================== */
const SHEETS = [];
let ignorePop = 0;
const RENDER = {};

function openSheet(kind, args) {
  if (SHEETS.length >= 5) closeTopSheet();
  const r = RENDER[kind](args);
  if (!r) return;
  const wrap = document.createElement("div");
  wrap.className = "sheet-wrap";
  wrap.innerHTML = `<div class="sheet-back"></div>
    <div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(r.title)}">
      <div class="sheet-grip"></div>
      <div class="sheet-head"><div class="sheet-title">${esc(r.title)}</div><button class="sheet-x" type="button" aria-label="Close">&times;</button></div>
      <div class="sheet-body">${r.html}</div>
    </div>`;
  document.body.appendChild(wrap);
  const s = { el: wrap, kind, args };
  SHEETS.push(s);
  wrap.querySelector(".sheet-back").addEventListener("click", () => closeTopSheet());
  wrap.querySelector(".sheet-x").addEventListener("click", () => closeTopSheet());
  const body = wrap.querySelector(".sheet-body"), head = wrap.querySelector(".sheet-head");
  body.addEventListener("scroll", () => head.classList.toggle("scrolled", body.scrollTop > 4), { passive: true });
  if (r.after) r.after(wrap);
  document.documentElement.classList.add("locked");
  requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add("open")));
  try { history.pushState({ sheet: SHEETS.length }, ""); } catch (e) {}
  setTimeout(() => { const x = wrap.querySelector(".sheet-x"); if (x) x.focus({ preventScroll: true }); }, 60);
}
function dropTopSheet() {
  const s = SHEETS.pop();
  if (!s) return;
  s.el.classList.remove("open");
  setTimeout(() => s.el.remove(), 260);
  if (!SHEETS.length) document.documentElement.classList.remove("locked");
}
function closeTopSheet() {
  if (!SHEETS.length) return;
  dropTopSheet();
  ignorePop++;
  try { history.back(); } catch (e) { ignorePop--; }
}
window.addEventListener("popstate", () => {
  if (ignorePop > 0) { ignorePop--; return; }
  if (SHEETS.length) dropTopSheet();
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && SHEETS.length) closeTopSheet(); });
// Live data changed: redraw open fight/fighter sheets in place, keeping their scroll.
function refreshSheets() {
  SHEETS.forEach(s => {
    if (s.kind !== "fight" && s.kind !== "fighter") return;
    const r = RENDER[s.kind](s.args);
    if (!r) return;
    const body = s.el.querySelector(".sheet-body"), y = body.scrollTop;
    body.innerHTML = r.html;
    body.scrollTop = y;
  });
}

function findFight(k, pk) {
  const ev = (S.events || []).find(e => evKey(e) === k);
  const f = ev && ev.fights.find(x => pairKey(x.f1.name, x.f2.name) === pk);
  return f ? { ev, f } : null;
}

RENDER.fight = ({ k, pk }) => {
  const hit = findFight(k, pk);
  if (!hit) return null;
  const { ev, f } = hit;
  const mu = findMatchup(f.f1.name, f.f2.name);
  const p1 = findFighter(f.f1.name), p2 = findFighter(f.f2.name);
  const w = winnerOf(f);
  const side = (x, ring) => `<div class="fo-side ${w ? (x.winner ? "won" : "lost") : ""}"${fighterAttrs(x.name, x.id)}>
      ${avatar(x.name, 72, ring, x.id)}<div class="fo-name">${esc(x.name)}</div><div class="fo-meta">${esc(x.record)}</div></div>`;
  const mid = f.live ? `<div class="fo-how" style="color:var(--red)">Live</div>` : w ? `<div class="fo-how">Final</div>` : '<div class="fo-vs">VS</div>';
  let h = `<div class="fs-face">${side(f.f1, "red")}<div class="fo-mid">${mid}<div class="fo-wc">${esc(wtLabel(f.weight))}${mu && mu.title ? "<br>" + esc(mu.title) : ""}</div></div>${side(f.f2, "blue")}</div>`;
  if (w) {
    const how = howItEnded(f);
    h += `<div class="result"><b>${esc(w.name)}</b> won${how ? " by " + esc(how.replace(" · ", " in ").replace("R", "round ")) : ""}.</div>`;
  } else if (f.done && f.result && f.result.kind) h += `<div class="result">${f.result.kind === "draw" ? "This one was scored a <b>draw</b>." : "This one was ruled a <b>no contest</b>."}</div>`;
  else if (f.live) h += `<div class="result" style="background:var(--red-wash);border-color:rgba(232,72,77,.45)"><b style="color:var(--red)">Live now</b> · ${esc(liveText(f))}</div>`;
  h += oddsHtml(mu, f);
  if (p1 || p2) h += taleOfTape(p1, p2, f);
  if (mu) h += `<div class="sh-sec">The matchup</div><div class="prose">${mu.note}</div>`;
  [[p1, f.f1, "red"], [p2, f.f2, "blue"]].forEach(([p, x, ring]) => {
    if (!p) return;
    h += `<div class="corner ${ring}">
      <button class="c-head" type="button"${fighterAttrs(x.name, x.id)}>${avatar(p.name, 56, ring, x.id)}<span><span class="c-name">${esc(p.name)}</span>${p.nick ? `<span class="c-nick">"${esc(p.nick)}"</span>` : ""}<span class="c-link">Fighter page &rsaquo;</span></span></button>
      <div class="pills">${[p.country, p.style].filter(Boolean).map(t => `<span class="pill">${esc(t)}</span>`).join("")}</div>
      ${p.strengths.map(s => `<div class="sw plus"><span class="ico">+</span><p>${s}</p></div>`).join("")}
      ${p.weaknesses.map(s => `<div class="sw minus"><span class="ico">&minus;</span><p>${s}</p></div>`).join("")}
      <div class="c-story">${p.history}</div>
    </div>`;
  });
  if (!mu && !p1 && !p2) h += `<p class="note">No written breakdown for this one — it's usually a prelim or a late booking. Tap a fighter above for their page.</p>`;
  else if (!p1 || !p2) h += `<p class="note">The other corner's write-up isn't in yet — usually a late replacement or a prelim fighter.</p>`;
  h += `<p class="note">${esc(shortEventName(ev.name))} · ${esc(fmtEventDate(f.date || ev.date).date)}</p>`;
  return { title: lastName(f.f1.name) + " vs " + lastName(f.f2.name), html: h };
};

/* ---------- fighter pages ---------- */
function fighterRank(name) {
  const out = [];
  DIVISIONS.men.forEach(d => {
    if (sameFighter(d.champ.name, name)) out.push({ txt: "\u{1F3C6} " + d.name + " champ", champ: true, rec: d.champ.record, country: d.champ.country });
    else if (d.interim && sameFighter(d.interim.name, name)) out.push({ txt: "Interim " + d.name + " champ", champ: true, rec: d.interim.record, country: d.interim.country });
    d.top5.forEach(c => { if (/^\d+$/.test(String(c.rank)) && sameFighter(c.name, name)) out.push({ txt: "#" + c.rank + " " + d.name, rec: c.record }); });
  });
  P4P.men.forEach((x, i) => { if (sameFighter(x.name, name)) out.push({ txt: "#" + (i + 1) + " pound-for-pound", rec: x.record }); });
  return out;
}
function fighterBouts(name) {
  const out = [];
  (S.events || FALLBACK_EVENTS).forEach(ev => ev.fights.forEach(f => {
    const me = sameFighter(f.f1.name, name) ? f.f1 : sameFighter(f.f2.name, name) ? f.f2 : null;
    if (me) out.push({ ev, f, me, opp: me === f.f1 ? f.f2 : f.f1 });
  }));
  return out;
}
RENDER.fighter = ({ name, fid }) => {
  const p = findFighter(name);
  const ranks = fighterRank(name);
  const bouts = fighterBouts(name);
  const boutId = (bouts.find(b => b.me.id) || { me: {} }).me.id;
  const id = espnIdFor(name, fid) || boutId || null;
  const liveRec = (bouts.find(b => b.me.record) || { me: {} }).me.record;
  const record = liveRec || (ranks.find(r => r.rec) || {}).rec || "";
  const country = (p && p.country) || (ranks.find(r => r.country) || {}).country || "";
  const shown = (p && p.name) || name;
  let h = `<div class="fp-top">${avatar(shown, 92, ranks.some(r => r.champ) ? "gold" : "", id)}<div style="min-width:0">
      <div class="fp-name">${esc(shown)}</div>
      ${p && p.nick ? `<div class="fp-nick">"${esc(p.nick)}"</div>` : ""}
      ${ranks.length ? `<div class="fp-ranks">${ranks.map(r => `<span class="badge ${r.champ ? "title" : ""}">${esc(r.txt)}</span>`).join("")}</div>` : ""}
    </div></div>`;
  const stats = [[record || "—", "Record"], [p && p.age ? p.age : "—", "Age"], [p && p.ht ? ftIn(p.ht) : "—", "Height"], [p && p.reach ? p.reach + "″" : "—", "Reach"]];
  h += `<div class="stats">${stats.map(([v, k]) => `<div class="stat"><div class="v">${esc(String(v))}</div><div class="k">${k}</div></div>`).join("")}</div>`;
  const pills = [country, p && p.style].filter(Boolean);
  if (pills.length) h += `<div class="pills">${pills.map(t => `<span class="pill">${esc(t)}</span>`).join("")}</div>`;
  if (bouts.length) {
    h += `<div class="sh-sec">On the schedule</div>`;
    h += bouts.map(b => {
      const when = new Date(b.ev.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      let r = "", cls = "";
      const w = winnerOf(b.f);
      if (w) { const how = howItEnded(b.f, true); r = (b.me.winner ? "Won" : "Lost") + (how ? " · " + how : ""); cls = b.me.winner ? "w" : "l"; }
      else if (b.f.done) r = howItEnded(b.f) || "Final";
      else if (b.f.live) r = "Live now";
      else if (b.f.cancelled) r = "Off";
      else r = eventState(b.ev) === "live" ? "Tonight" : eventState(b.ev) === "past" ? "" : fmtEventDate(b.ev.date).rel || when;
      return `<button class="bout" type="button"${fighterAttrs(b.opp.name, b.opp.id)}><span><span>vs <b>${esc(b.opp.name)}</b></span><span class="ev" style="display:block">${esc(shortEventName(b.ev.name))} · ${esc(when)}</span></span><span class="r ${cls}">${esc(r)}</span></button>`;
    }).join("");
  }
  if (p) {
    h += `<div class="sh-sec">Their game</div>`;
    h += p.strengths.map(s => `<div class="sw plus"><span class="ico">+</span><p>${s}</p></div>`).join("");
    h += p.weaknesses.map(s => `<div class="sw minus"><span class="ico">&minus;</span><p>${s}</p></div>`).join("");
    h += `<div class="sh-sec">Story so far</div><div class="prose">${p.history}</div>`;
  } else {
    h += `<p class="note">No full write-up for this fighter yet — fighters get one when they're on an upcoming main card.</p>`;
  }
  if (id) h += `<a class="btn block ext" href="https://www.espn.com/mma/fighter/_/id/${encodeURIComponent(id)}" target="_blank" rel="noopener">Full fight record on ESPN &rsaquo;</a>`;
  return { title: "Fighter", html: h };
};

/* =====================================================================
   Rankings tab
   ===================================================================== */
function renderRankings() {
  const champs = DIVISIONS.men.map((d, i) => {
    const vacant = /^vacant$/i.test(d.champ.name);
    const sub = vacant ? esc(d.champ.record) + (d.champ.country ? " · " + esc(d.champ.country) : "") : esc(d.champ.record) + (d.champ.country ? " · " + esc(d.champ.country) : "");
    return `<button class="dv" type="button" data-div="${i}">${avatar(d.champ.name, 56, "gold")}
      <span class="dv-t"><span class="dv-w" style="display:block">${esc(d.name)} · ${esc(d.weight)}</span>
      <span class="dv-c" style="display:block">${vacant ? "Belt vacant" : esc(d.champ.name)}</span>
      <span class="dv-s" style="display:block">${d.interim ? "Interim: " + esc(d.interim.name) + (vacant ? "" : "") : sub}</span></span>
      <span class="chev">&rsaquo;</span></button>`;
  }).join("");
  const p4p = P4P.men.map((x, i) => `<button class="rk-row ${i === 0 ? "top" : ""}" type="button"${fighterAttrs(x.name)}><span class="rk-n">${i + 1}</span>${avatar(x.name, 36, i === 0 ? "gold" : "")}<span class="rk-nm">${esc(x.name)}</span><span class="rk-rc">${esc(x.record)}</span></button>`).join("");
  document.getElementById("rankingsView").innerHTML = `
    <h2 class="sec first">Champions <small>men's divisions</small></h2>
    <p class="lede">Tap a division for its top five and what's going on.</p>
    <div class="card champs">${champs}</div>
    <h2 class="sec">Pound-for-pound <small>best at any weight</small></h2>
    ${P4P.explain ? `<p class="lede">${P4P.explain}</p>` : ""}
    <div class="card champs">${p4p}</div>
    <div class="foot">Rankings as of ${esc(ANALYSIS_STAMP)}. An <b>interim</b> champ holds a stand-in belt while the real champ is out.</div>`;
}
RENDER.division = ({ i }) => {
  const d = DIVISIONS.men[i];
  if (!d) return null;
  const vacant = /^vacant$/i.test(d.champ.name);
  const champ = vacant
    ? `<div class="champ-blk">${avatar("Vacant", 56, "gold")}<div><div class="k">Champion</div><div class="n">Vacant</div><div class="s">${esc(d.champ.record)}${d.champ.country ? " · " + esc(d.champ.country) : ""}</div></div></div>`
    : `<button class="champ-blk" type="button"${fighterAttrs(d.champ.name)}>${avatar(d.champ.name, 56, "gold")}<div><div class="k">&#127942; Champion</div><div class="n">${esc(d.champ.name)}</div><div class="s">${esc(d.champ.record)} · ${esc(d.champ.country)}</div></div><span class="chev" style="margin-left:auto">&rsaquo;</span></button>`;
  const interim = d.interim ? `<button class="champ-blk" type="button"${fighterAttrs(d.interim.name)}>${avatar(d.interim.name, 56, "")}<div><div class="k">Interim champ</div><div class="n">${esc(d.interim.name)}</div><div class="s">${esc(d.interim.record)}${d.interim.country ? " · " + esc(d.interim.country) : ""}</div></div><span class="chev" style="margin-left:auto">&rsaquo;</span></button>` : "";
  const top = d.top5.map(c => `<button class="rk-row" type="button"${fighterAttrs(c.name)}><span class="rk-n">${esc(String(c.rank))}</span>${avatar(c.name, 36, "")}<span class="rk-nm">${esc(c.name)}</span><span class="rk-rc">${esc(c.record)}</span></button>`).join("");
  const h = `<div class="dv-w" style="margin-bottom:10px">${esc(d.weight)} limit</div>${champ}${interim}
    <div class="sh-sec">The belt</div><div class="prose">${d.beltFacts}</div>
    <div class="sh-sec">Top contenders</div><div class="card champs">${top}</div>
    <div class="sh-sec">What's happening</div><div class="prose">${d.story}</div>`;
  return { title: d.name, html: h };
};

/* =====================================================================
   Catch Up tab
   ===================================================================== */
function renderLearn() {
  const stories = STORYLINES.map(s => `<article class="card xp"><h3><span class="em">${s.em}</span><span>${esc(s.title)}</span></h3>
      <div class="prose"><p>${s.body[0]}</p>${s.body.length > 1 ? `<div class="rest">${s.body.slice(1).map(p => "<p>" + p + "</p>").join("")}</div>` : ""}</div>
      ${s.body.length > 1 ? '<button class="more-btn" type="button" data-act="xp-more">Read more</button>' : ""}</article>`).join("");
  const faq = EXPLAINERS.map(s => `<div class="faq-item"><button class="faq-q" type="button" aria-expanded="false"><span class="em">${s.em}</span><span>${esc(s.title)}</span><span class="chev">&rsaquo;</span></button>
      <div class="faq-a prose">${s.body.map(p => "<p>" + p + "</p>").join("")}</div></div>`).join("");
  document.getElementById("learnView").innerHTML = `
    <h2 class="sec first">What's going on</h2>
    <p class="lede">The big stories a casual fan should know, updated ${esc(ANALYSIS_STAMP)}.</p>
    ${stories}
    <h2 class="sec">UFC 101 <small>the stuff nobody explains</small></h2>
    <div class="card faq">${faq}</div>
    <div class="foot">Real UFC cards only — no Contender Series, no noise.<br>Live data from ESPN's public feed · headshots © ESPN.</div>`;
}

/* =====================================================================
   Settings + Web Push (server: /push/key, /push/subscribe, /push/test)
   ===================================================================== */
const PUSH = { sub: null, reg: null };
const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isStandalone = () => (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
const pushSupported = () => "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
function b64ToBytes(str) {
  const pad = "=".repeat((4 - str.length % 4) % 4);
  const bin = atob((str + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}
async function pushReg() {
  if (PUSH.reg) return PUSH.reg;
  PUSH.reg = await navigator.serviceWorker.register(SW_URL);
  await navigator.serviceWorker.ready;
  return PUSH.reg;
}
async function pushCurrent() {
  if (!pushSupported()) return null;
  try { const reg = await pushReg(); PUSH.sub = await reg.pushManager.getSubscription(); } catch (e) { PUSH.sub = null; }
  return PUSH.sub;
}
async function pushPost(path, body, method = "POST") {
  const r = await fetch(ALERTS_API + path, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "server error " + r.status);
  return r.json();
}
async function pushEnable() {
  if (!pushSupported()) throw new Error(isIOS && !isStandalone()
    ? "On iPhone, first add Fight Companion to your Home Screen (Share → Add to Home Screen), then turn alerts on from the app icon."
    : "This browser can't do notifications.");
  const perm = await Notification.requestPermission();
  if (perm !== "granted") throw new Error("Notifications are blocked for this app. Allow them in your phone's Settings, then try again.");
  const { enabled, key } = await fetch(ALERTS_API + "/push/key").then(r => r.json());
  if (!enabled || !key) throw new Error("The alert server isn't ready yet. Try again in a minute.");
  const reg = await pushReg();
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(key) });
  await pushPost("/push/subscribe", { subscription: sub.toJSON() });
  PUSH.sub = sub;
  return sub;
}
async function pushDisable() {
  const sub = await pushCurrent();
  if (sub) {
    try { await pushPost("/push/subscribe", { endpoint: sub.endpoint }, "DELETE"); } catch (e) {}
    try { await sub.unsubscribe(); } catch (e) {}
  }
  PUSH.sub = null;
}
async function pushTest() {
  const sub = await pushCurrent();
  if (!sub) { toast("🔕", "Alerts aren't on", "Turn on fight alerts first."); return; }
  try { await pushPost("/push/test", { subscription: sub.toJSON() }); toast("📨", "Test alert sent", "Should land in a second or two."); }
  catch (e) { toast("🔕", "Couldn't send", e.message); }
}
let alertsBusy = false;
async function toggleAlerts() {
  if (alertsBusy) return;
  alertsBusy = true; redrawSettings();
  try {
    if (!ALERTS_ON) { await pushEnable(); ALERTS_ON = true; toast("🔔", "Fight alerts on", "Main-card fight starts and results — even with the app closed."); }
    else { await pushDisable(); ALERTS_ON = false; toast("🔕", "Fight alerts off", "No more notifications from us."); }
  } catch (e) {
    ALERTS_ON = false;
    toast("🔕", "Couldn't turn on alerts", e.message);
  }
  try { localStorage.setItem("fc-alerts", ALERTS_ON ? "1" : "0"); } catch (e) {}
  alertsBusy = false; redrawSettings();
}
RENDER.settings = () => {
  const note = !pushSupported()
    ? (isIOS && !isStandalone() ? "Add Fight Companion to your Home Screen first (Share → Add to Home Screen), then turn this on from the app icon." : "This browser can't do notifications.")
    : ALERTS_ON ? "You'll get main-card fight starts and results, even with the app closed."
    : "Get a buzz when main-card fights start and finish.";
  const h = `
    <div class="set-row"><div><div class="set-k">Fight alerts</div><div class="set-s">${esc(note)}</div></div>
      <button class="switch ${ALERTS_ON ? "on" : ""}" type="button" data-act="alerts" role="switch" aria-checked="${ALERTS_ON}" aria-label="Fight alerts" ${alertsBusy ? "disabled" : ""}><span></span></button></div>
    ${ALERTS_ON ? '<button class="set-link" type="button" data-act="alerts-test">Send me a test alert</button>' : ""}
    <div class="set-row"><div><div class="set-k">App version</div><div class="set-s">${VERSION.fresh ? "A newer version is out — update to get it." : "Tap to reload the latest version of the app."}</div></div>
      <button class="btn ${VERSION.fresh ? "gold" : ""}" type="button" data-act="update">${VERSION.fresh ? "Update" : "Reload"}</button></div>
    <div class="set-row"><div><div class="set-k">About the data</div><div class="set-s">Schedules, results and records are live from ESPN. Breakdowns, rankings and storylines were written ${esc(ANALYSIS_STAMP)} and are refreshed every Sunday and Thursday.</div></div></div>`;
  return { title: "Settings", html: h };
};
function redrawSettings() {
  SHEETS.forEach(s => { if (s.kind === "settings") s.el.querySelector(".sheet-body").innerHTML = RENDER.settings().html; });
}

/* ---------- app updates: reload + "new version" nudge ----------
   A home-screen app has no address bar and GitHub Pages caches files for 10 minutes, so
   "Reload" re-fetches every file past the cache, then loads a cache-busting URL. A HEAD
   check of the page and its scripts on resume lights up the gear when something changed. */
const VERSION = { tag: null, fresh: false };
const ASSETS = ["app.js", "app.css", "data.js"];
async function versionTag() {
  const urls = [location.pathname, ...ASSETS];
  const tags = await Promise.all(urls.map(u => fetch(u, { method: "HEAD", cache: "no-store" })
    .then(r => (r.headers.get("etag") || "") + (r.headers.get("last-modified") || "")).catch(() => "")));
  return tags.join("|");
}
async function checkVersion() {
  if (!/^https?:$/.test(location.protocol)) return;
  try {
    const t = await versionTag();
    if (VERSION.tag === null) { VERSION.tag = t; return; }
    if (t.replace(/\|/g, "") && t !== VERSION.tag && !VERSION.fresh) {
      VERSION.fresh = true;
      document.getElementById("gearBtn").classList.add("has-dot");
      toast("✨", "New version available", "Open settings (the gear) and tap Update.");
      redrawSettings();
    }
  } catch (e) {}
}
async function hardReload() {
  try { await Promise.all(ASSETS.map(u => fetch(u, { cache: "reload" }))); } catch (e) {}
  const fresh = location.pathname + "?v=" + Date.now();
  try { location.replace(fresh); } catch (e) { location.href = fresh; }
}

/* ---------- add-to-home-screen banner ---------- */
function setupA2hs() {
  const banner = document.getElementById("a2hs");
  const hint = document.getElementById("a2hsHint");
  const installBtn = document.getElementById("a2hsInstall");
  const KEY = "fc-a2hs-done";
  const done = () => { try { localStorage.setItem(KEY, "1"); } catch (e) {} banner.classList.remove("show"); };
  let seen = null;
  try { seen = localStorage.getItem(KEY); } catch (e) {}
  const isAndroid = /android/i.test(navigator.userAgent);
  if (isStandalone()) { done(); return; }
  if (!(isIOS || isAndroid) || seen) return;
  hint.innerHTML = isIOS ? 'Tap <b style="display:inline;font:inherit;text-transform:none">Share</b>, then <b style="display:inline;font:inherit;text-transform:none">Add to Home Screen</b>. Needed for fight alerts on iPhone.'
    : 'Tap the &#8942; menu, then "Add to Home screen".';
  setTimeout(() => banner.classList.add("show"), 1500);
  let deferred = null;
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault(); deferred = e;
    installBtn.hidden = false;
    hint.textContent = "One tap adds Fight Companion to your Home Screen.";
    banner.classList.add("show");
  });
  installBtn.addEventListener("click", async () => {
    if (!deferred) return;
    deferred.prompt();
    const res = await deferred.userChoice;
    deferred = null;
    if (res && res.outcome === "accepted") done();
  });
  window.addEventListener("appinstalled", done);
  document.getElementById("a2hsClose").addEventListener("click", done);
}

/* =====================================================================
   Events + boot
   ===================================================================== */
function showTab(name) {
  document.querySelectorAll(".tab").forEach(t => { const on = t.dataset.page === name; t.classList.toggle("active", on); t.setAttribute("aria-current", on ? "page" : "false"); });
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === "page-" + name));
  window.scrollTo({ top: 0 });
}

document.addEventListener("click", e => {
  const t = e.target;
  // fighter links win over whatever row they sit in
  const fl = t.closest("[data-fighter]");
  if (fl) { e.preventDefault(); openSheet("fighter", { name: fl.dataset.fighter, fid: fl.dataset.fid || null }); return; }
  const tab = t.closest(".tab");
  if (tab) { showTab(tab.dataset.page); return; }
  const pill = t.closest(".evpill");
  if (pill) { S.sel = pill.dataset.ev; renderFights(); return; }
  const fr = t.closest(".fr");
  if (fr) { openSheet("fight", { k: fr.dataset.ev, pk: fr.dataset.fight }); return; }
  const dv = t.closest(".dv");
  if (dv) { openSheet("division", { i: +dv.dataset.div }); return; }
  const faq = t.closest(".faq-q");
  if (faq) { const it = faq.parentElement; it.classList.toggle("open"); faq.setAttribute("aria-expanded", it.classList.contains("open")); return; }
  if (t.closest("#gearBtn")) { openSheet("settings"); return; }
  const act = t.closest("[data-act]");
  if (!act) return;
  const a = act.dataset.act;
  if (a === "retry") { S.events = null; loadEvents(); }
  else if (a === "prelims") { S.prelimsOpen[S.sel] = true; renderFights(); }
  else if (a === "more") act.closest(".story").classList.add("full");
  else if (a === "xp-more") act.closest(".xp").classList.add("full");
  else if (a === "ics") { const ev = S.events.find(x => evKey(x) === S.sel); if (ev) downloadIcs(ev); }
  else if (a === "alerts") toggleAlerts();
  else if (a === "alerts-test") pushTest();
  else if (a === "update") hardReload();
});

function boot() {
  if (/[?&]v=\d+/.test(location.search)) { try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) {} }
  renderRankings();
  renderLearn();
  loadEvents();
  setupA2hs();
  checkVersion();
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") checkVersion(); });
  setInterval(() => { if (document.visibilityState === "visible") checkVersion(); }, 15 * 60e3);
  // "on" only counts if this device still holds a push subscription
  if (ALERTS_ON) pushCurrent().then(sub => { if (!sub) { ALERTS_ON = false; try { localStorage.setItem("fc-alerts", "0"); } catch (e) {} } });
}
document.addEventListener("DOMContentLoaded", boot);
