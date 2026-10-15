/* =====================================================================
   Bets — play-money sportsbook. Talks to the Railway API (server/).
   Everyone gets a fresh $1,000 per card; bets lock when the fight starts;
   every bet is public the moment it's placed.
   ===================================================================== */
const BETS_API = "https://api-production-34f6c.up.railway.app";

// Mirrors server/src/pricing.js so the "to win" number updates instantly.
// If you change one, change both.
const BT_PRICING = {
  VIG: 0.05,
  METHOD: { DEC: 2.0, KO: 3.3, SUB: 5.0 },
  ROUND: { 3: { 1: 2.2, 2: 3.3, 3: 4.0 }, 5: { 1: 2.5, 2: 3.3, 3: 4.0, 4: 5.0, 5: 6.0 } },
  FINISH: 2.0,
};
const btDecimal = ml => (ml > 0 ? 1 + ml / 100 : 1 + 100 / Math.abs(ml));
function btQuote({ ml, method, round, rounds, stake }) {
  let m = 1;
  if (method) m *= BT_PRICING.METHOD[method];
  if (round != null) m *= (method ? 1 : BT_PRICING.FINISH) * BT_PRICING.ROUND[rounds === 5 ? 5 : 3][round];
  const dec = Math.round(btDecimal(ml) * m * (1 - BT_PRICING.VIG) * 10000) / 10000;
  return { dec, win: Math.round(stake * dec * 100) / 100 };
}

const BT = { token: null, user: null, offline: false, events: [], eventId: null, detail: null, feed: [], board: null, slip: {}, loaded: false, view: "book" };
const btMoney = n => "$" + Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
const btPl = n => (n >= 0 ? "+" : "−") + btMoney(Math.abs(n));
const btMl = ml => (ml == null ? "no line" : (ml > 0 ? "+" : "−") + Math.abs(ml));
const btLast = n => esc((n || "").trim().replace(/\s+(jr\.?|sr\.?|ii|iii|iv)$/i, "").split(/\s+/).pop());
const btLegs = b => [b.method ? "by " + b.method : "", b.round != null ? "in R" + b.round : ""].filter(Boolean).join(" ");

async function btApi(path, opts = {}) {
  const headers = { "content-type": "application/json" };
  if (BT.token) headers.authorization = "Bearer " + BT.token;
  const res = await fetch(BETS_API + path, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
  let data = null;
  try { data = await res.json(); } catch (e) {}
  if (!res.ok) {
    if (res.status === 401 && BT.token) { btSignOut(false); }
    throw new Error((data && data.error) || ("HTTP " + res.status));
  }
  return data;
}

function btSignOut(rerender = true) {
  BT.token = null; BT.user = null;
  try { localStorage.removeItem("fc-token"); } catch (e) {}
  if (rerender) renderBets();
}

async function betsLoad(force) {
  if (BT.loaded && !force) return;
  try { BT.token = localStorage.getItem("fc-token") || null; } catch (e) {}
  const root = document.getElementById("betsRoot");
  try {
    await btApi("/health");
    BT.offline = false;
  } catch (e) {
    BT.offline = true; BT.loaded = true; renderBets(); return;
  }
  try {
    if (BT.token) { const me = await btApi("/me"); BT.user = me.user; }
  } catch (e) { /* token dead; btApi already cleared it */ }
  await btRefresh();
  BT.loaded = true;
  renderBets();
}

async function btRefresh() {
  const [ev, feed, board] = await Promise.all([btApi("/events"), btApi("/feed"), btApi("/leaderboard")]);
  BT.events = ev.events || [];
  BT.feed = feed.feed || [];
  BT.board = board;
  // The book is open on one card at a time: the earliest one that isn't finished. The server
  // enforces the same rule; the fallback keeps the UI honest if it's an older build.
  BT.upcomingId = ev.upcoming_id || (BT.events.filter(e => e.status !== "final" && new Date(e.date) > Date.now() - 12 * 36e5)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || {}).id || null;
  if (!BT.eventId || !BT.events.some(e => e.id === BT.eventId)) {
    const pick = BT.events.find(e => e.id === BT.upcomingId) || BT.events.find(e => e.status === "live") || BT.events.find(e => e.status === "scheduled") || BT.events[BT.events.length - 1];
    BT.eventId = pick ? pick.id : null;
  }
  BT.detail = BT.eventId ? await btApi("/events/" + BT.eventId) : null;
}

function renderBets() {
  const root = document.getElementById("betsRoot");
  if (BT.offline) {
    root.innerHTML = `<div class="bt-card"><div class="bt-title">The book is closed</div><div class="bt-sub">Can't reach the betting server right now. The rest of the app still works.</div><div style="margin-top:10px"><button class="bt-btn ghost sm" data-act="reload">Try again</button></div></div>`;
    return;
  }
  if (!BT.user) { root.innerHTML = renderBtAuth(); return; }
  root.innerHTML = renderBtTop() + renderBtNav() + renderBtSticky() + (BT.view === "feed" ? renderBtFeed() : BT.view === "board" ? renderBtBoard() : renderBtBook());
}

function renderBtAuth() {
  const mode = BT.authMode || "login";
  return `<div class="bt-card">
    <div class="bt-title">${mode === "signup" ? "Join the book" : "Sign in to bet"}</div>
    <div class="bt-sub">Play money only. Everyone gets $1,000 per card, bets lock when the fight starts, and every bet is public the second you place it.</div>
    <form class="bt-form" id="btAuthForm" data-mode="${mode}" style="margin-top:12px" autocomplete="on">
      <input name="username" placeholder="username" autocapitalize="none" autocorrect="off" required>
      <input name="password" type="password" placeholder="password" required>
      ${mode === "signup" ? '<input name="invite" placeholder="invite code" autocapitalize="characters" required>' : ""}
      <div class="bt-err" id="btAuthErr"></div>
      <button class="bt-btn" type="submit">${mode === "signup" ? "Create account" : "Sign in"}</button>
      <button class="bt-link" type="button" data-act="authmode" data-mode="${mode === "signup" ? "login" : "signup"}">${mode === "signup" ? "Already have an account? Sign in" : "New here? Join with an invite code"}</button>
    </form>
  </div>`;
}

function btMyStats() {
  const d = BT.detail; if (!d) return null;
  const mine = d.bets.filter(b => b.username === BT.user.username);
  const staked = mine.filter(b => b.status !== "void").reduce((s, b) => s + b.stake, 0);
  const inPlay = mine.filter(b => b.status === "open" || b.status === "needs_manual").reduce((s, b) => s + b.stake, 0);
  const pl = mine.filter(b => ["won", "lost", "void"].includes(b.status)).reduce((s, b) => s + (b.payout - b.stake), 0);
  const starting = (d.bankrolls.find(b => b.username === BT.user.username) || {}).starting || 1000;
  return { mine, starting, available: starting - staked, inPlay, pl };
}

function renderBtTop() {
  const ev = BT.detail && BT.detail.event;
  const rank = e => (e.status === "live" ? 0 : e.status === "scheduled" ? 1 : 2);
  const list = [...BT.events].sort((a, b) => rank(a) - rank(b) || (rank(a) === 2 ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)));
  const label = e => e.name.replace(/^UFC Fight Night:\s*/i, "") + (e.status === "live" ? "  \u2022 LIVE" : e.status === "final" ? "  \u2022 final" : e.id === BT.upcomingId ? "  \u2022 up next" : "  \u2022 not open yet");
  return `<div class="bt-card">
    <div class="bt-topbar">
      <div class="bt-user">${esc(BT.user.username)}${BT.user.is_admin ? "<small>admin</small>" : ""}</div>
      <button class="bt-link" data-act="signout">sign out</button>
    </div>
    ${ev ? `<select class="bt-select" data-act="event" aria-label="Fight card" style="margin-top:10px">${list.map(e => `<option value="${esc(e.id)}" ${e.id === BT.eventId ? "selected" : ""}>${esc(label(e))}</option>`).join("")}</select>` : ""}
  </div>`;
}

function renderBtSticky() {
  const s = btMyStats(); if (!s || BT.view !== "book") return "";
  return `<div class="bt-sticky"><div class="bt-roll">
      <div class="bt-stat"><div class="k">Available</div><div class="v">${btMoney(s.available)}</div></div>
      <div class="bt-stat"><div class="k">In play</div><div class="v">${btMoney(s.inPlay)}</div></div>
      <div class="bt-stat"><div class="k">This card</div><div class="v ${s.pl > 0 ? "pos" : s.pl < 0 ? "neg" : ""}">${btPl(s.pl)}</div></div>
    </div></div>`;
}

function renderBtNav() {
  const b = (v, label) => `<button class="${BT.view === v ? "sel" : ""}" data-act="view" data-view="${v}">${label}</button>`;
  return `<div class="bt-seg">${b("book", "Bet slip")}${b("feed", "Activity")}${b("board", "Leaderboard")}</div>`;
}

function btBookNote() {
  const d = BT.detail; if (!d || d.event.status === "final" || d.event.id === BT.upcomingId) return "";
  const next = BT.events.find(e => e.id === BT.upcomingId);
  const nm = next ? next.name.replace(/^UFC Fight Night:\s*/i, "") : "the current card";
  return `<div class="bt-note">Betting opens once ${esc(nm)} is in the books. Only the next card takes bets.</div>`;
}

function renderBtBook() {
  const d = BT.detail;
  if (!d) return `<div class="bt-card"><div class="bt-empty">No cards on the board yet.</div></div>`;
  const fights = d.fights.filter(f => f.is_main !== false).reverse();   // main card only, main event first
  const prelims = d.fights.length - fights.length;
  return `<div class="bt-card">
    <div class="bt-title">${esc(d.event.name)}</div>
    <div class="bt-sub">${new Date(d.event.date).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}${d.event.venue ? " · " + esc(d.event.venue) : ""}</div>
    ${btBookNote()}
    ${fights.map(renderBtFight).join("")}
    ${prelims ? `<div class="bt-empty" style="margin-top:8px">Main card only — ${prelims} prelim${prelims === 1 ? "" : "s"} aren't on the book.</div>` : ""}
  </div>`;
}

function renderBtFight(f) {
  const slip = BT.slip[f.id] || {};
  const mine = (BT.detail.bets || []).filter(b => b.fight_id === f.id && b.username === BT.user.username);
  const others = (BT.detail.bets || []).filter(b => b.fight_id === f.id && b.username !== BT.user.username);
  const notYet = BT.detail.event.id !== BT.upcomingId && f.status === "scheduled";   // a later card: view only
  const locked = notYet || f.status !== "scheduled" || (f.start_at && new Date(f.start_at) <= new Date());
  const hasLine = f.f1_ml != null && f.f2_ml != null;
  const fav = hasLine ? (f.f1_ml < f.f2_ml ? f.f1_id : f.f2_id) : null;
  const status = f.status === "live" ? '<span style="color:var(--gold-bright)">&#9679; live</span>'
    : f.status === "final" ? `final${f.winner_id ? " · " + btLast(f.winner_id === f.f1_id ? f.f1_name : f.f2_name) + " won" + (f.method ? " by " + f.method : "") + (f.round ? " R" + f.round : "") : ""}`
    : f.status === "cancelled" ? "cancelled" : "";

  const side = (id, name, ml) => `<button class="bt-side ${slip.pick_id === id ? "sel" : ""}" data-act="pick" data-fight="${esc(f.id)}" data-id="${esc(id)}" ${locked || !hasLine ? "disabled" : ""}>
      ${avatar(name, 30, "", id)}<div><div class="nm">${btLast(name)}</div><div class="ml ${fav === id ? "fav" : ""}">${btMl(ml)}</div></div></button>`;

  let slipHtml = "";
  if (!locked && hasLine && slip.pick_id) {
    const rounds = f.rounds === 5 ? 5 : 3;
    const ml = slip.pick_id === f.f1_id ? f.f1_ml : f.f2_ml;
    const stake = Math.max(0, Math.floor(Number(slip.stake) || 0));
    const q = btQuote({ ml, method: slip.method || null, round: slip.round ?? null, rounds, stake: stake || 100 });
    const s = btMyStats();
    const chip = (act, val, label, sel, dis) => `<button class="bt-chip ${sel ? "sel" : ""}" data-act="${act}" data-fight="${esc(f.id)}" data-val="${val}" ${dis ? "disabled" : ""}>${label}</button>`;
    slipHtml = `<div class="bt-legs">
      <div class="bt-legrow"><span class="lbl">How</span>${["KO", "SUB", "DEC"].map(m => chip("method", m, m === "KO" ? "KO/TKO" : m === "SUB" ? "Submission" : "Decision", slip.method === m)).join("")}</div>
      <div class="bt-legrow"><span class="lbl">When</span>${Array.from({ length: rounds }, (_, i) => i + 1).map(r => chip("round", r, "R" + r, slip.round === r, slip.method === "DEC")).join("")}</div>
    </div>
    <div class="bt-stake">
      <span class="lbl" style="font-size:11px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.6px">Stake</span>
      <input type="number" inputmode="numeric" pattern="[0-9]*" min="1" step="1" value="${stake || ""}" placeholder="100" data-act="stake" data-fight="${esc(f.id)}">
      ${[25, 50, 100, 250].map(v => chip("stakeq", v, "$" + v, stake === v)).join("")}${chip("stakeq", s ? s.available : 0, "All in", s && stake === s.available)}
    </div>
    <div class="bt-quote"><div><div class="lbl">${stake ? btMoney(stake) : "$100"} on ${btLast(slip.pick_id === f.f1_id ? f.f1_name : f.f2_name)} ${esc(btLegs(slip))}<span class="x">×${q.dec.toFixed(2)}</span></div></div><div class="win">to win ${btMoney(q.win)}</div></div>
    <div style="margin-top:10px;display:flex;gap:8px"><button class="bt-btn sm" data-act="place" data-fight="${esc(f.id)}" ${stake < 1 ? "disabled" : ""}>Place bet</button><button class="bt-btn ghost sm" data-act="clear" data-fight="${esc(f.id)}">Clear</button></div>`;
  }

  const betRow = (b, canDelete) => `<div class="bt-bet"><div><span class="who">${esc(b.username)}</span> <span class="what">${btMoney(b.stake)} on ${btLast(b.pick_name)} ${esc(btLegs(b))} · to win ${btMoney(b.potential)}</span></div>
      <div style="display:flex;align-items:center;gap:8px"><span class="st ${b.status}">${b.status === "open" ? "open" : b.status === "won" ? btPl(b.payout - b.stake) : b.status === "lost" ? btPl(-b.stake) : b.status === "void" ? "void" : "pending"}</span>${canDelete && !locked && b.status === "open" ? `<button class="bt-link" data-act="delete" data-id="${b.id}">remove</button>` : ""}</div></div>`;

  return `<div class="bt-fight">
    <div class="bt-fmeta">${esc(f.weight || "")}${f.rounds === 5 ? " · 5 rounds" : ""}${status ? " · " + status : ""}${!hasLine && !locked ? " · no line yet" : ""}</div>
    <div class="bt-sides">${side(f.f1_id, f.f1_name, f.f1_ml)}${side(f.f2_id, f.f2_name, f.f2_ml)}</div>
    ${slipHtml}
    ${locked && !status && !notYet ? '<div class="bt-locked">Locked — this fight has started.</div>' : ""}
    ${mine.length || others.length ? `<div class="bt-mine">${mine.map(b => betRow(b, true)).join("")}${others.map(b => betRow(b, false)).join("")}</div>` : ""}
  </div>`;
}

function renderBtFeed() {
  if (!BT.feed.length) return `<div class="bt-card"><div class="bt-empty">Nobody's bet yet. Be first and set the tone.</div></div>`;
  const me = BT.user.username;
  return `<div class="bt-card"><div class="bt-title">Activity</div><div class="bt-feed" style="margin-top:10px">${BT.feed.map(b => {
    const r = {}; (b.reactions || []).forEach(x => { r[x.emoji] = r[x.emoji] || { n: 0, me: false }; r[x.emoji].n++; if (x.username === me) r[x.emoji].me = true; });
    const result = b.status === "won" ? `<span class="st won">won ${btPl(b.payout - b.stake)}</span>` : b.status === "lost" ? `<span class="st lost">lost ${btMoney(b.stake)}</span>` : b.status === "void" ? `<span class="st void">void</span>` : b.status === "needs_manual" ? `<span class="st needs_manual">pending review</span>` : `<span class="st open">open</span>`;
    return `<div class="bt-post">
      <div class="line"><b>${esc(b.username)}</b> put <b>${btMoney(b.stake)}</b> on <b>${btLast(b.pick_name)}</b> ${esc(btLegs(b))} at ${btMl(b.odds_ml)} · to win <b>${btMoney(b.potential)}</b></div>
      <div class="meta"><span>${esc(b.f1_name)} vs ${esc(b.f2_name)}</span><span>${esc((b.event_name || "").replace(/^UFC Fight Night:\s*/i, ""))}</span>${result}</div>
      <div class="bt-react">${["🔥", "💀", "🤡", "👀"].map(e => `<button class="${r[e] && r[e].me ? "on" : ""}" data-act="react" data-id="${b.id}" data-emoji="${e}">${e}${r[e] ? " " + r[e].n : ""}</button>`).join("")}</div>
    </div>`;
  }).join("")}</div></div>`;
}

function renderBtBoard() {
  const b = BT.board; if (!b) return "";
  const rows = (b.alltime || []).filter(u => u.cards > 0);
  const card = BT.detail ? (BT.detail.bankrolls || []) : [];
  const table = (list, plKey, extra) => list.length ? `<div class="bt-tablewrap"><table class="bt-board"><tr><th></th><th>Who</th><th>P/L</th>${extra ? "<th>W-L</th><th>Cards</th>" : ""}</tr>${list.map((u, i) => `<tr><td class="rk">${i + 1}</td><td>${esc(u.username)}</td><td class="pl ${Number(u[plKey]) > 0 ? "pos" : Number(u[plKey]) < 0 ? "neg" : ""}">${btPl(Number(u[plKey]))}</td>${extra ? `<td>${u.wins}-${u.losses}</td><td>${u.cards}</td>` : ""}</tr>`).join("")}</table></div>` : `<div class="bt-empty">Nothing settled yet.</div>`;
  return `<div class="bt-card"><div class="bt-title">All-time</div>${table(rows, "pl", true)}</div>
    <div class="bt-card"><div class="bt-title">This card</div><div class="bt-sub">${BT.detail ? esc(BT.detail.event.name) : ""}</div><div style="margin-top:8px">${table(card, "settled_pl", false)}</div></div>`;
}

// ---- interactions -------------------------------------------------------------------
document.getElementById("page-bets").addEventListener("click", async e => {
  const el = e.target.closest("[data-act]"); if (!el) return;
  const act = el.dataset.act, fid = el.dataset.fight;
  const slip = fid ? (BT.slip[fid] = BT.slip[fid] || {}) : null;
  try {
    if (act === "reload") { BT.loaded = false; renderBets(); await betsLoad(true); }
    else if (act === "authmode") { BT.authMode = el.dataset.mode; renderBets(); }
    else if (act === "signout") btSignOut();
    else if (act === "view") { BT.view = el.dataset.view; renderBets(); }
    else if (act === "pick") { slip.pick_id = slip.pick_id === el.dataset.id ? null : el.dataset.id; renderBets(); const row = document.querySelector(`.bt-side[data-fight="${fid}"]`); if (row && slip.pick_id) row.closest(".bt-fight").scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    else if (act === "method") { const m = el.dataset.val; slip.method = slip.method === m ? null : m; if (slip.method === "DEC") slip.round = null; renderBets(); }
    else if (act === "round") { const r = Number(el.dataset.val); slip.round = slip.round === r ? null : r; renderBets(); }
    else if (act === "stakeq") { slip.stake = Number(el.dataset.val); renderBets(); }
    else if (act === "clear") { delete BT.slip[fid]; renderBets(); }
    else if (act === "place") {
      el.disabled = true;
      const b = await btApi("/bets", { method: "POST", body: { fight_id: fid, pick_id: slip.pick_id, method: slip.method || null, round: slip.round ?? null, stake: Math.floor(Number(slip.stake)) } });
      delete BT.slip[fid];
      toast("💵", "Bet placed", `${btMoney(b.bet.stake)} on ${b.bet.pick_name.split(/\s+/).pop()} ${btLegs(b.bet)} — to win ${btMoney(b.bet.potential)}.`);
      await btRefresh(); renderBets();
    }
    else if (act === "delete") { await btApi("/bets/" + el.dataset.id, { method: "DELETE" }); await btRefresh(); renderBets(); }
    else if (act === "react") { await btApi("/bets/" + el.dataset.id + "/react", { method: "POST", body: { emoji: el.dataset.emoji } }); const f = await btApi("/feed"); BT.feed = f.feed || []; renderBets(); }
  } catch (err) { toast("⚠️", "That didn't go through", err.message); renderBets(); }
});
document.getElementById("page-bets").addEventListener("change", async e => {
  const el = e.target; if (el.dataset.act !== "event") return;
  try { BT.eventId = el.value; BT.detail = await btApi("/events/" + BT.eventId); renderBets(); }
  catch (err) { toast("\u26a0\ufe0f", "Couldn't load that card", err.message); }
});
document.getElementById("page-bets").addEventListener("input", e => {
  const el = e.target; if (el.dataset.act !== "stake") return;
  const slip = BT.slip[el.dataset.fight] = BT.slip[el.dataset.fight] || {};
  slip.stake = Number(el.value);
  // update only the quote + button, so the input keeps focus
  const q = el.closest(".bt-fight"); if (!q) return;
  const f = BT.detail.fights.find(x => x.id === el.dataset.fight); if (!f || !slip.pick_id) return;
  const ml = slip.pick_id === f.f1_id ? f.f1_ml : f.f2_ml;
  const stake = Math.max(0, Math.floor(slip.stake || 0));
  const quote = btQuote({ ml, method: slip.method || null, round: slip.round ?? null, rounds: f.rounds === 5 ? 5 : 3, stake: stake || 100 });
  const w = q.querySelector(".bt-quote .win"); if (w) w.textContent = "to win " + btMoney(quote.win);
  const l = q.querySelector(".bt-quote .lbl"); if (l) l.firstChild.textContent = (stake ? btMoney(stake) : "$100") + " on " + (slip.pick_id === f.f1_id ? f.f1_name : f.f2_name).split(/\s+/).pop() + " " + btLegs(slip);
  const p = q.querySelector('[data-act="place"]'); if (p) p.disabled = stake < 1;
});
document.getElementById("page-bets").addEventListener("submit", async e => {
  const form = e.target; if (form.id !== "btAuthForm") return;
  e.preventDefault();
  const err = document.getElementById("btAuthErr"); err.textContent = "";
  const fd = new FormData(form);
  const body = { username: fd.get("username"), password: fd.get("password"), invite: fd.get("invite") };
  try {
    const r = await btApi(form.dataset.mode === "signup" ? "/auth/signup" : "/auth/login", { method: "POST", body });
    BT.token = r.token; BT.user = r.user;
    try { localStorage.setItem("fc-token", BT.token); } catch (e2) {}
    pushLink();
    await btRefresh(); renderBets();
    toast("🥊", `Welcome, ${BT.user.username}`, "You've got $1,000 on every card. Don't blow it all on the prelims.");
  } catch (e2) { err.textContent = e2.message; }
});
document.querySelector('.tab[data-page="bets"]').addEventListener("click", () => betsLoad());
// keep the book fresh while a card is live
setInterval(() => { if (BT.loaded && BT.user && document.getElementById("page-bets").classList.contains("active")) btRefresh().then(renderBets).catch(() => {}); }, 60000);

