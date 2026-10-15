# Fight Companion — project guide

UFC companion web app for Noah (casual fan) and his friends.
Live site: **https://noah-austin.github.io/fight-companion/** — GitHub Pages, served from the repo root on `main`. A commit to `main` IS a deploy (live ~1 min later). **Push directly to main. Never open a pull request.**

Built with Claude Aug 15–16, 2026; refreshed twice weekly since; **redesigned Oct 15, 2026 (v3)** at Noah's request ("a second pass on every aspect").

## Why the app exists (don't drift from this)

1. The official UFC app is cluttered — this app shows **real UFC cards only** (numbered events + Fight Nights). Spin-offs (Contender Series, TUF, Road to UFC) are filtered out by `SPINOFF_RX`.
2. Noah doesn't know fighters — every main-card fight carries a written breakdown for casual fans.
3. Belts/rankings are confusing — plain-English champions list, division details, storylines, and "UFC 101".
4. **Men's divisions only** in rankings/P4P (his explicit request). Women's fights still appear on fight cards (they're part of the card), but no women's division/ranking content anywhere.

## Files

| File | What it is | Who edits it |
|---|---|---|
| `index.html` | Page shell: header, three page sections, bottom nav, add-to-home-screen banner. Loads `app.css`, then `app.js`, then `data.js`. | Design work only |
| `app.css` | All styles. Tokens on `:root` (dark canvas, `--red` corner, `--blue` corner, `--gold` for belts/winners/favorites); display font Barlow Condensed from `fonts/`. | Design work only |
| `app.js` | All logic: ESPN feed, live mode, rendering, sheets, alerts, update check. Declares the data containers (`FIGHTERS`, `MATCHUPS`, …) and helpers like `norm()`; boots on `DOMContentLoaded`, after `data.js` has run. | Design work only |
| `data.js` | **The baked data blocks — the ONLY file a refresh edits.** | Refresh |
| `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `fonts/` | Push service worker (push only, deliberately no fetch handler), PWA manifest and icons, fonts. | Never in a refresh |
| `server/` | Railway API: sends the fight-alert pushes (and still holds the archived Bets data). | Never in a refresh |
| `archive/bets/` | The retired Bets tab's page code + how to restore it. | Nobody |
| `preview/index.html` | Redirect from the old preview link to the site. | Nobody |

**The design is frozen again.** Noah approved v3. A refresh touches ONLY `data.js`. If a design change seems needed, leave it for Noah to request.

## What the app does (v3)

Three bottom tabs: **Fights / Rankings / Catch Up**, plus a ⚙️ settings sheet.

- **Fights**: a horizontal **card switcher** (last ~9 days of results, the live card, upcoming cards) and one card at a time, opening on the live or next card. Each card has a **poster** (status + title-fight badges, name, date/venue, the main-event face-off with big headshots, result method when finished) and **start times** from ESPN's per-fight dates (`cardTimes()`: Early prelims / Prelims / Main card; falls back to the single event time). Upcoming cards get **Remind me** (.ics with -1h and at-start alarms). Then a **live box** ("Now: X vs Y · Round 2 of 3 / Between rounds — Up next: A vs B"), the event note ("Why watch" / "How it went"), the **main card** list, and the **prelims** folded behind a button (open automatically while a prelim is live). Fight rows show Fav / ✓ Won / result method + round + time / live round.
- **Fight sheet** (tap a fight): face-off, result line, the **plain-English odds** card (parsed from `MATCHUPS[...].odds`), **tale of the tape** (record, age, height, reach, weight from the weight class), the matchup note, then both corners (strengths, weaknesses, story) with a link to each fighter's page.
- **Fighter sheet** (tap any `data-fighter` element: face-off photos, corners, contender/P4P rows, opponents): rank badges from `DIVISIONS`/`P4P`, record/age/height/reach tiles, country/style, their bouts on the cards in the app with results, write-up when in `FIGHTERS`, and a "Full fight record on ESPN" link when the ESPN id is known.
- **Rankings**: all eight men's champions at a glance (vacant belts say so, interim champs show underneath); tap → division sheet (champ, interim, belt facts, top 5, what's happening). Pound-for-pound list below.
- **Catch Up**: storylines (first paragraph + Read more) and **UFC 101** as a tap-to-open FAQ.
- **Settings**: Fight alerts switch (+ test alert), app version (Reload / Update), about the data.
- Sheets are history entries: the phone's back gesture closes the top one. Open fight/fighter sheets redraw in place when live data changes.

### Live data (no maintenance needed)
The page fetches ESPN's public scoreboard (`site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard?dates=…`, from 9 days back to 75 days ahead) and normalizes it in `normalizeEspnEvent()`. Facts learned in production, all relied on:
- **ESPN lists fights chronologically — earliest prelim first, main event LAST.** `splitCard()` uses `EVENT_META[...].mainCard` for the true main card in broadcast order and falls back to "last fight = main event".
- The athlete id is on `competitors[].id` (`athlete.id` is absent) — used for headshots (`a.espncdn.com/i/headshots/mma/players/full/{id}.png`, initials fallback).
- A finished fight's status says only "Final"; `status.period` + `displayClock` are set; the method is the `details` entry "Unofficial Winner Kotko|Decision|Submission" (Kotko = KO/TKO), the rest is play-by-play; 5:00 of the last round with no entry = decision (`resultOf()`, same rules as `server/src/espn.js`).
- Live statuses: `STATUS_IN_PROGRESS`, `STATUS_END_PERIOD`, `STATUS_HALFTIME`. A card with some results in and more to come counts as live (`eventState`). During a card window the page polls every 60s (5 min when a card starts within 2h).
- If the fetch fails, the page shows `FALLBACK_EVENTS` with an Offline banner.

### Fight alerts (Web Push)
Settings → Fight alerts asks for notification permission, registers `sw.js` and subscribes with the Railway API (`/push/key`, `/push/subscribe`, `/push/test`). The server pushes main-card fight starts and results from `settle.js`. On iPhone it works only from the Home-Screen install (the sheet says so). `fc-alerts` in localStorage mirrors the switch; in-app toasts also fire while the app is open.

### App updates
GitHub Pages caches files ~10 min and a home-screen app has no address bar. `checkVersion()` HEADs the page, `app.js`, `app.css` and `data.js` on resume and every 15 min; a change lights a dot on the gear and Settings shows **Update**, which re-fetches every file with `cache: "reload"` and loads a cache-busting URL.

## Baked data blocks — `data.js` (what a refresh replaces)

`data.js` starts with `ANALYSIS_STAMP` and then the blocks below, each marked with a `/* ============ ... */` comment. Shapes are unchanged since v1; follow them exactly.

- `ANALYSIS_STAMP` — "Month D, YYYY"; set to the refresh date. Shown in the app's footers and settings.
- `FIGHTERS` — key: `norm(fullName)` → `{name, ht, reach, nick, age, country, style, strengths[2-3], weaknesses[1-3], history}`. `history` may contain `<b>` tags. `ht` and `reach` are **inches as numbers** (6'2" → `ht: 74`; `73.5` is fine), cross-checked on ESPN / UFC Stats / Tapology; leave one out rather than guess (the tile shows "—").
- `MATCHUPS` — key: the two fighters' `norm()` names **sorted alphabetically, joined with "|"** → `{note, odds, title?}` (`title` only for title fights, e.g. "Welterweight title").
  **The odds format is load-bearing:** `"Name -NNN, Name +NNN"` (any part of each fighter's name, minus sign before the number), with optional commentary after an em dash `" — ..."`. It drives the Fav tag and the plain-English odds card; anything else falls back to showing the raw text.
- `EVENT_META` — per analyzed event: `{match: [lowercase substrings of the ESPN event name], titles: "" | "N title fights", note, mainCard: [pair keys in broadcast order, main event first]}`.
- `FALLBACK_EVENTS` — offline snapshot: `{name, date ISO, venue, fights: [{weight, f1:{name,record}, f2:{name,record}}]}` — main card first (main event at top), then prelims.
- `DIVISIONS.men` — 8 divisions (Heavyweight→Flyweight): `{name, weight, champ:{name,record,country}, interim?, beltFacts, top5:[{rank,name,record}], story}`. A vacant belt is `champ: {name: "Vacant", record: "<short note>", country: "<next title fight>"}`. **Verify every champion against 2+ current sources — belts change often.**
- `P4P.men` — top 10 `{name, record}`; `P4P.explain` — one short paragraph.
- `STORYLINES` — 5-6 `{em, title, body:[paragraphs]}` big-picture items.
- `EXPLAINERS` — "UFC 101" items; keep stable unless facts changed (e.g. broadcast deal).
- `ESPN_IDS` — display name → ESPN athlete id (the `RAW` map at the bottom). Fight cards don't depend on it (they use the competitor id ESPN sends), but Rankings, P4P, fighter pages for fighters not on the live feed, and the offline snapshot do — so every champion / top-5 / P4P name needs an id. Get ids only from the fighter's `espn.com/mma/fighter/_/id/NNN` profile URL; never guess. ESPN has no photo for some newer fighters (initials show) — not fixable here.

`norm()` = lowercase, strip accents, remove non-letters.

## Refresh procedure

1. Read the current `data.js` from `main` (never rebuild from scratch).
2. Research via web search, verified against 2+ current sources (ESPN, UFC.com, Sherdog, MMA media — facts must reflect today, not training data): next ~4 real UFC events (main-card lineups, per-fighter breakdowns, matchup notes with betting odds), men's champions + top 5 + division storylines, P4P top 10, big-picture storylines, ESPN ids for new fighters.
3. Edit only `data.js`: replace the blocks + stamp. Drop past events; add newly announced ones. Never edit `index.html`, `app.js`, `app.css`, `server/` or `archive/`.
4. Verify: `node --check data.js`, then **commit and push** (see failure modes below). Then, if Playwright is available (`executablePath: '/opt/pw-browsers/chromium'`), serve the repo root (`python3 -m http.server`) and click through the three tabs, a fight sheet and a division sheet — the ESPN fetch failing in the sandbox is EXPECTED (it exercises the offline path); any other JS error is a real bug.
5. Commit to `main` with a message like `Refresh: <date>` and push. No PRs. Verify with `git ls-remote origin refs/heads/main`.

## Tone of written content

For casual fans: plain English, no insider jargon without explanation, short sentences, a little personality ("classic pace-vs-power clash"), betting odds explained as favorite/underdog. Breakdowns are 2-3 strengths, 1-3 weaknesses, 2-4 sentence career story per fighter.

## Server (Railway)

`server/` (Node 20, Express, Postgres, no ORM), Railway project `fight-companion`, service `api`, root directory `/server`, Postgres alongside. Public URL `https://api-production-34f6c.up.railway.app` (`ALERTS_API` in app.js). Railway builds on every push to `main` that touches `server/`. Env vars live only in Railway (`DATABASE_URL`, `JWT_SECRET`, `INVITE_CODE`, `CORS_ORIGINS`, `STARTING_BANKROLL`).

Today it matters for **fight alerts**: it polls ESPN (every minute during a card, every 15 min otherwise) and pushes main-card starts/results to subscribed devices (VAPID keys in the `kv` table). It also still runs the archived Bets backend (accounts, bets, settlement, leaderboard) with all data intact; nothing on the site calls those endpoints any more. Verify the server from Railway deploy logs (`[sync]`, `[card]`, `[shape]`, `[push]` lines) — Railway and ESPN are egress-blocked from the Claude sandbox.

## Bets — archived Oct 15, 2026

The play-money sportsbook tab (added Sep 20) was retired in the v3 redesign at Noah's request ("no betting" — no standings page either). Page code is in `archive/bets/` with restore notes; the full pre-redesign site is on branch `backup/pre-redesign-2026-10-14`. Don't bring any of it back unless Noah asks.

## History / context

- Built Aug 15–16 2026 (UFC 330 week). v2 added headshots, embedded font, A2HS banner, PWA meta, and the fix for ESPN's chronological fight ordering. Aug 31: live mode + pick'em. Sep 20: Bets + Web Push + settings sheet. Oct 10–12: tale of the tape, readability refresh, headshot fix, results with method, live round/up next, start times, fighter pages. **Oct 15: v3 redesign** (files split, one-card-at-a-time Fights tab, sheets, Rankings overview, Bets archived). Backup of everything before v3: branch `backup/pre-redesign-2026-10-14`.
- The refresh runs from **one** Routine: "UFC Fight Companion refresh (this session, Sun + Thu 9am Central)", cron `CRON_TZ=America/Chicago 0 9 * * 0,4`, bound to the long-running Claude Code session that built the October work (runs in a fresh session were blocked from pushing to `main`). The older fresh-session trigger was deleted Oct 12; the Cowork-side task was deleted Sep 3 2026 — don't go looking for either.
- Known refresh failure modes, all seen for real: a run that researches but never commits (the container is ephemeral, so **commit and push as soon as `node --check` passes**, before browser verification); a run that fans out to subagents and never reaches the push; a run that reports success on work it never pushed; and a bare `git push` that printed "Everything up-to-date" without pushing. Push with an explicit refspec (`git push origin HEAD:refs/heads/main`) and verify with `git ls-remote`, not from the summary.
- This environment's network egress is restricted: WebFetch/curl to wikipedia.org, ufc.com, tapology.com, espn.com, `site.api.espn.com` and `noah-austin.github.io` fail. Research goes through web search; check a Pages deploy with `gh api repos/noah-austin/fight-companion/actions/runs`. `ESPN_IDS` entries come from web-searching each fighter's ESPN profile URL; leave one out rather than guessing — a wrong id renders someone else's face.
