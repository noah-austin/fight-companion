#!/usr/bin/env node
// Fight Companion data check. Run before every commit that touches data.js:
//   node scripts/check-data.mjs
// Loads app.js's helpers and data.js the way the page does, then checks the data blocks against
// the rules in CLAUDE.md. ERRORS fail the run (exit 1) and must be fixed before pushing;
// WARNINGS are worth a look but don't block. Read-only: it never edits data.js.
import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const dataSrc = fs.readFileSync(path.join(ROOT, "data.js"), "utf8");

const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);

// app.js up to the "App state" banner: containers + pure helpers, no DOM work.
const cut = app.indexOf("   App state");
if (cut < 0) { console.error("check-data: couldn't find the 'App state' section in app.js"); process.exit(2); }
const prelude = app.slice(0, app.lastIndexOf("/* ====", cut)).replace('"use strict";', "");
const ctx = { console, document: { querySelector: () => null }, window: {}, navigator: { userAgent: "" } };
vm.createContext(ctx);
try {
  vm.runInContext(prelude + "\n" + dataSrc + `
    ;globalThis.__ = { FIGHTERS, MATCHUPS, EVENT_META, FALLBACK_EVENTS, DIVISIONS, P4P, STORYLINES, EXPLAINERS, ESPN_IDS,
      ANALYSIS_STAMP, norm, pairKey, inKey, espnIdFor, sameFighter, parseLine };`, ctx, { filename: "data.js" });
} catch (e) {
  console.error("ERROR data.js failed to load: " + e.message);
  process.exit(1);
}
const { FIGHTERS, MATCHUPS, EVENT_META, FALLBACK_EVENTS, DIVISIONS, P4P, STORYLINES, EXPLAINERS, ESPN_IDS,
  ANALYSIS_STAMP, norm, pairKey, inKey, espnIdFor, parseLine } = ctx.__;

// ---------- stamp ----------
if (!/^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/.test(ANALYSIS_STAMP || ""))
  err(`ANALYSIS_STAMP must look like "November 5, 2026" (got ${JSON.stringify(ANALYSIS_STAMP)})`);
if (/<script/i.test(dataSrc)) err("data.js contains a <script> tag");

// ---------- FIGHTERS ----------
const fighterObjs = new Map(); // object -> canonical key (aliases point at the same object)
for (const [k, v] of Object.entries(FIGHTERS)) {
  if (norm(v.name) === k) { fighterObjs.set(v, k); continue; }
}
for (const [k, v] of Object.entries(FIGHTERS)) {
  const canonical = fighterObjs.get(v);
  if (canonical && canonical !== k) continue; // alias line: FIGHTERS["variant"] = FIGHTERS["canonical"]
  if (norm(v.name) !== k) err(`FIGHTERS key "${k}" doesn't match norm(name) = "${norm(v.name)}"`);
  for (const f of ["name", "style", "history"]) if (!v[f]) err(`FIGHTERS.${k} is missing ${f}`);
  if (v.age == null) warn(`FIGHTERS.${k} has no age`);
  if (!v.country) warn(`FIGHTERS.${k} has no country`);
  if (!Array.isArray(v.strengths) || v.strengths.length < 2 || v.strengths.length > 3) err(`FIGHTERS.${k} needs 2-3 strengths`);
  if (!Array.isArray(v.weaknesses) || v.weaknesses.length < 1 || v.weaknesses.length > 3) err(`FIGHTERS.${k} needs 1-3 weaknesses`);
  if (v.ht != null && (typeof v.ht !== "number" || v.ht < 58 || v.ht > 84)) err(`FIGHTERS.${k}.ht must be inches as a number (got ${v.ht})`);
  if (v.reach != null && (typeof v.reach !== "number" || v.reach < 58 || v.reach > 90)) err(`FIGHTERS.${k}.reach must be inches as a number (got ${v.reach})`);
}

// ---------- MATCHUPS ----------
const NO_LINES = "Lines not posted at write-up time";
const muObjs = new Map();
for (const [k, v] of Object.entries(MATCHUPS)) if (!muObjs.has(v)) muObjs.set(v, k);
function nameFor(key) { return FIGHTERS[key] ? FIGHTERS[key].name : key; }
for (const [k, v] of Object.entries(MATCHUPS)) {
  if (muObjs.get(v) !== k) continue; // alias line
  const parts = k.split("|");
  if (parts.length !== 2 || [...parts].sort().join("|") !== k || parts.some(p => norm(p) !== p))
    err(`MATCHUPS key "${k}" must be two norm() names, sorted, joined with "|"`);
  if (!v.note) err(`MATCHUPS["${k}"] has no note`);
  if (!v.odds) err(`MATCHUPS["${k}"] has no odds (use "${NO_LINES}")`);
  else if (v.odds !== NO_LINES) {
    const f = { f1: { name: nameFor(parts[0]) }, f2: { name: nameFor(parts[1]) } };
    if (!FIGHTERS[parts[0]] || !FIGHTERS[parts[1]]) {
      if (!/[-+]\d{3}/.test(v.odds)) warn(`MATCHUPS["${k}"].odds has no moneylines: "${v.odds.slice(0, 60)}"`);
    } else if (!parseLine(v, f)) {
      err(`MATCHUPS["${k}"].odds isn't in "Name -NNN, Name +NNN" form, so the odds card can't read it: "${v.odds.slice(0, 70)}"`);
    } else {
      // both fighters must be matched by different words (two "Santos" would both read the first line)
      const head = v.odds.replace(/−/g, "-").split(/\s[—-]\s/)[0];
      const pos = n => { for (const t of n.split(/\s+/).filter(w => w.length > 2).reverse()) { const i = head.toLowerCase().indexOf(t.toLowerCase()); if (i >= 0) return i; } return -1; };
      if (pos(f.f1.name) === pos(f.f2.name)) err(`MATCHUPS["${k}"].odds names both fighters with the same word; use first names: "${head}"`);
    }
  }
}

// ---------- EVENT_META ----------
const keptMatchups = new Set();
for (const m of EVENT_META) {
  const label = (m.match && m.match[0]) || "?";
  if (!Array.isArray(m.match) || !m.match.length || m.match.some(x => x !== x.toLowerCase())) err(`EVENT_META "${label}": match must be lowercase substrings`);
  if (!m.note) err(`EVENT_META "${label}" has no note`);
  if (/^\s*RESULTS:/i.test(m.note || "")) warn(`EVENT_META "${label}": drop the "RESULTS:" prefix (the app already labels it "How it went")`);
  if (!Array.isArray(m.mainCard) || !m.mainCard.length) { err(`EVENT_META "${label}" has no mainCard`); continue; }
  for (const k of m.mainCard) {
    const parts = k.split("|");
    if (parts.length !== 2 || [...parts].sort().join("|") !== k) err(`EVENT_META "${label}": mainCard key "${k}" isn't sorted`);
    if (MATCHUPS[k]) keptMatchups.add(muObjs.get(MATCHUPS[k]));
    else warn(`EVENT_META "${label}": no MATCHUPS entry for main-card fight "${k}" yet`);
  }
  if (m.mainCard.length < 4) warn(`EVENT_META "${label}": only ${m.mainCard.length} main-card fight(s) listed; list the whole main card once it's known`);
}

// ---------- FALLBACK_EVENTS ----------
const now = Date.now();
const fallbackNames = new Set();
for (const ev of FALLBACK_EVENTS) {
  const t = new Date(ev.date).getTime();
  if (isNaN(t)) err(`FALLBACK_EVENTS "${ev.name}": bad date ${ev.date}`);
  else if (t < now - 36 * 3600e3) err(`FALLBACK_EVENTS "${ev.name}" is in the past (${ev.date}); drop it`);
  if (!EVENT_META.some(m => m.match.some(x => ev.name.toLowerCase().includes(x)))) warn(`FALLBACK_EVENTS "${ev.name}" has no EVENT_META entry`);
  for (const f of ev.fights) {
    for (const s of [f.f1, f.f2]) {
      fallbackNames.add(norm(s.name));
      if (!espnIdFor(s.name)) warn(`ESPN_IDS: no id for "${s.name}" (${ev.name}); offline it shows initials`);
    }
    const k = pairKey(f.f1.name, f.f2.name);
    if (MATCHUPS[k]) keptMatchups.add(muObjs.get(MATCHUPS[k]));
  }
}

// ---------- rankings ----------
const ranked = new Set();
if (DIVISIONS.men.length !== 8) err(`DIVISIONS.men should have 8 divisions (has ${DIVISIONS.men.length})`);
for (const d of DIVISIONS.men) {
  if (!d.name || !d.weight || !d.champ || !d.beltFacts || !d.story) err(`DIVISIONS "${d.name}" is missing a field`);
  if (!Array.isArray(d.top5) || d.top5.length !== 5) err(`DIVISIONS "${d.name}" needs exactly 5 contenders`);
  for (const n of [d.champ && d.champ.name, d.interim && d.interim.name, ...(d.top5 || []).map(c => c.name)].filter(Boolean)) {
    if (/^vacant$/i.test(n)) continue;
    ranked.add(norm(n));
    if (!espnIdFor(n)) err(`ESPN_IDS: no id for ranked fighter "${n}" (${d.name})`);
  }
}
if (P4P.men.length !== 10) err(`P4P.men should have 10 names (has ${P4P.men.length})`);
for (const x of P4P.men) { ranked.add(norm(x.name)); if (!espnIdFor(x.name)) err(`ESPN_IDS: no id for P4P fighter "${x.name}"`); }

// ---------- stale content (the refresh must prune it) ----------
for (const [k, v] of Object.entries(MATCHUPS)) {
  if (muObjs.get(v) !== k) { if (!keptMatchups.has(muObjs.get(v))) err(`MATCHUPS["${k}"] is an alias of a stale matchup; delete it`); continue; }
  if (!keptMatchups.has(k)) err(`MATCHUPS["${k}"] isn't on any card in EVENT_META or FALLBACK_EVENTS; delete it`);
}
const keptFighters = new Set([...keptMatchups].flatMap(k => k.split("|")));
for (const [k, v] of Object.entries(FIGHTERS)) {
  const canonical = fighterObjs.get(v) || k;
  if (keptFighters.has(canonical) || fallbackNames.has(canonical) || ranked.has(canonical)) continue;
  if ([...keptFighters, ...fallbackNames, ...ranked].some(x => ctx.__.sameFighter(FIGHTERS[canonical].name, x))) continue;
  err(`FIGHTERS.${k} isn't on any current card or in the rankings; delete it`);
}

// ---------- storylines / explainers ----------
if (STORYLINES.length < 4 || STORYLINES.length > 7) warn(`STORYLINES has ${STORYLINES.length} items (aim for 5-6)`);
for (const s of [...STORYLINES, ...EXPLAINERS]) if (!s.em || !s.title || !Array.isArray(s.body) || !s.body.length) err(`Story "${s.title}" is missing em/title/body`);

// ---------- report ----------
for (const w of warnings) console.log("WARN  " + w);
for (const e of errors) console.log("ERROR " + e);
console.log(`\ncheck-data: ${errors.length} error(s), ${warnings.length} warning(s) — ${Object.keys(FIGHTERS).length} fighters, ${Object.keys(MATCHUPS).length} matchups, ${EVENT_META.length} cards, stamp ${ANALYSIS_STAMP}`);
process.exit(errors.length ? 1 : 0);
