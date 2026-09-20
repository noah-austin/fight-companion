# Fight Companion — project guide

Single-file UFC companion web app for Noah (casual fan) and his friends.
Live site: **https://noah-austin.github.io/fight-companion/** — GitHub Pages, served from `index.html` on `main`. A commit to `main` IS a deploy (live ~1 min later). **Push directly to main. Never open a pull request.**

Built with Claude (Cowork) Aug 15–16, 2026; refreshed twice weekly since. The Cowork side remains where Noah asks for design changes; sessions here handle the recurring data refresh.

## Why the app exists (don't drift from this)

1. The official UFC app is cluttered — this app shows **real UFC cards only** (numbered events + Fight Nights). Spin-offs (Contender Series, TUF, Road to UFC) are filtered out by regex.
2. Noah doesn't know fighters — every main-card fight carries a written breakdown for casual fans.
3. Belts/rankings are confusing — plain-English division cards, storylines, and a "UFC 101" tab.
4. **Men's divisions only** in rankings/P4P (his explicit request). Women's fights still appear on event cards (they're part of the card), but no women's division/ranking content anywhere.

## Architecture — one file, design is FROZEN

Everything lives in `index.html` (~260KB): CSS, JS, base64-embedded Barlow Condensed font, add-to-home-screen banner, four bottom tabs (Fight Cards / Belts & Ranks / Catch Up / Bets). Since Sep 20 the PWA manifest and icons are real files (`manifest.webmanifest`, `icon-192.png`, `icon-512.png`) and `sw.js` is the push service worker — required for Web Push on iOS. A refresh never touches those.

Also in the renderer (added Aug 31, don't strip during refreshes — they live outside the data blocks and survive automatically):

- **Fight-night live mode**: when a card is in its ~8h window or any fight is IN_PROGRESS, the page polls ESPN every 60s (5 min when a card starts within 2h), shows a LIVE header chip and per-event "Live now" badges, and preserves open cards/picks UI across re-renders.
- **"Beat the Books" pick'em**: tap-to-pick buttons on upcoming fights, stored in localStorage per device (`fc-picks`, `fc-pick-hist`). Results settle automatically from ESPN winner flags; underdog calls are detected by parsing the favorite out of `MATCHUPS[...].odds` text (best-effort — keep odds text in the "Name -NNN, Name +NNN" style so the parser works). All-time record shows as a header chip.
- **Notifications**: per-event "🗓 Remind me" button generates a client-side .ics with alarms (-1h and at start). "Fight alerts" (added Sep 2, rebuilt Sep 20 as real Web Push) lives in the **settings sheet** (⚙️ gear in the header, next to ↻): turning it on asks for notification permission, registers `sw.js` and subscribes the device with the Bets API (`/push/subscribe`, VAPID keys generated on first boot into the `kv` table). The server pushes main-card fight starts and results, plus per-user bet settlements, from `settle.js`. On iPhone it works only for the Home-Screen (standalone) install — the sheet says so. `fc-alerts` in localStorage mirrors the switch; in-app toasts still fire while the app is open. Files outside `index.html` that this needs: `sw.js` (push only, deliberately no fetch handler), `manifest.webmanifest`, `icon-192.png`, `icon-512.png`.

**Do NOT redesign, restructure, or "improve" the design.** Noah approved it. A refresh touches ONLY the data blocks listed below plus `ANALYSIS_STAMP`. If a design change seems needed, leave it for Noah to request.

### Bets — server-side sportsbook (added Sep 20 2026, at Noah's request; the design freeze was lifted for this feature only)

A play-money book for Noah and his friends. Fourth bottom tab, **Bets**. Everyone gets a fresh **$1,000 per card**; you bet any amount on any fight — winner, winner + method (KO/SUB/DEC), winner + round, or all three — priced from the real DraftKings moneyline × base-rate multipliers × a 5% vig. **Only the next card takes bets** (added Sep 20 at Noah's request): the earliest event that isn't `final` is the open book — the server returns it as `upcoming_id` on `/events` and `POST /bets` rejects any other event with a 409; the UI shows later cards read-only with a "Betting opens once … is in the books" note. **Main card only** (same day): `fights.card_segment` comes from ESPN's core competition resource (`cardSegment.description`, "Main Card"/"Prelims"/"Early Prelims"; the `name` is a slug like `main`/`prelims1`); `is_main` is derived per event, falling back to the last five fights in ESPN order when a card has no labels. `POST /bets` rejects prelims; the UI hides them from the book. Bets lock when the fight starts and are **public the moment they're placed**. Leaderboard is cumulative profit/loss. The old device-only "Beat the Books" pick'em is retired: its UI is gone, its code is left inert in the script and can be deleted in a cleanup.

- **Backend:** `server/` (Node 20, Express, Postgres, no ORM). Deployed on Railway, project `fight-companion`, service `api`, root directory `/server`, Postgres template alongside. Public URL `https://api-production-34f6c.up.railway.app` (hard-coded as `BETS_API` in index.html). Railway builds on every push to `main` that touches `server/`.
- **Env vars on the api service:** `DATABASE_URL` (reference to Postgres), `JWT_SECRET`, `INVITE_CODE` (what friends type to sign up), `CORS_ORIGINS` (`https://noah-austin.github.io`), `STARTING_BANKROLL`. Values live only in Railway.
- **Accounts:** username + password, invite code to join. **The first account created is admin**; `/admin/promote` hands admin to others. Noah must be the first signup.
- **Pricing** is in `server/src/pricing.js` and **mirrored in `BT_PRICING` in index.html** for the instant quote. Change both together.
- **Settlement** (`server/src/settle.js`, `espn.js`) polls ESPN every minute during a card, every 15 min otherwise. Facts learned in production: the scoreboard has **no odds** — lines come from the core resource `.../events/{id}/competitions/{id}/odds` (DraftKings, `homeAthleteOdds`/`awayAthleteOdds`, athlete id in a `$ref`); a finished fight's status just says "Final" but `status.period` + `displayClock` are set; the method is in the `details` entry `"Unofficial Winner Decision|Kotko|Submission"` (Kotko = KO/TKO), everything else in `details` is play-by-play noise; 5:00 of the last round with no entry = decision. Draw/NC/cancelled → stake refunded. A bet whose method/round can't be determined sits `needs_manual`; `/admin/settle` fixes it and marks the fight `MANUAL` so the poller never overwrites it.
- **The refresh must not touch `server/`, the Bets CSS (`.bt-*`), the `#page-bets` section, or the Bets script block.** The `MATCHUPS[...].odds` text is prose for the breakdowns only; the book prices from ESPN.
- Can't be exercised from the Claude sandbox (Railway and ESPN are egress-blocked): verify the backend from Railway deploy logs (`[sync]`/`[shape]` lines) and the UI with the mocked-API Playwright script pattern used on Sep 20.

### Live-data layer (no maintenance needed)

On page load the app fetches ESPN's public scoreboard (`https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard?dates=YYYYMMDD-YYYYMMDD`, rolling window), filters spin-offs via `SPINOFF_RX`, and renders events, records, live status, and winners. Fighter headshots come from `https://a.espncdn.com/i/headshots/mma/players/full/{espnId}.png` with an initials fallback. **ESPN lists fights chronologically — earliest prelim first, main event LAST.** The code relies on `EVENT_META` for main-card ordering and falls back to "last fight = main event" for unanalyzed events. Don't break this.

### Baked data blocks (what a refresh replaces)

All in the inline `<script>`, clearly marked with `/* ============ ... */` comments:

- `ANALYSIS_STAMP` — "Month D, YYYY" string; set to the refresh date. Shown in header/footer.
- `FIGHTERS` — key: `norm(fullName)` → `{name, nick, age, country, style, strengths[2-3], weaknesses[1-3], history}`. `history` may contain `<b>` tags.
- `MATCHUPS` — key: the two fighters' `norm()` names **sorted alphabetically, joined with "|"** → `{note, odds, title?}` (`title` set only for title fights, e.g. "Welterweight title").
- `EVENT_META` — per analyzed event: `{match: [lowercase substrings of the ESPN event name], titles: "" | "N title fights", note, mainCard: [pair keys in broadcast order, main event first]}`.
- `FALLBACK_EVENTS` — offline snapshot rendered if the ESPN fetch fails: `{name, date ISO, venue, fights: [{weight, f1:{name,record}, f2:{name,record}}]}` — list main card first (main event at top), then prelims.
- `DIVISIONS.men` — 8 divisions (Heavyweight→Flyweight): `{name, weight, champ:{name,record,country}, interim?, beltFacts, top5:[{rank,name,record}], story}`. **Verify every champion against 2+ current sources — belts change often.**
- `P4P.men` — top 10 `{name, record}`.
- `STORYLINES` — 5-6 `{em, title, body:[paragraphs]}` big-picture items a casual fan should know.
- `EXPLAINERS` — "UFC 101" items; keep stable unless facts changed (e.g. broadcast deal).
- `ESPN_IDS` — display name → ESPN athlete id, used for headshots. Add ids for new fighters (from the scoreboard JSON: `competitors[].athlete.id`).

`norm()` = lowercase, strip accents, remove non-letters. Follow existing shapes exactly; the renderer is untouched.

## Refresh procedure

1. Read the current `index.html` from `main` (never rebuild from scratch).
2. Research via web search, verified against 2+ current sources (ESPN, UFC.com, Sherdog, MMA media — facts must reflect today, not training data): next ~4 real UFC events (main-card lineups, per-fighter breakdowns, matchup notes with betting odds), men's champions + top 5 + division storylines, P4P top 10, big-picture storylines, ESPN ids for new fighters.
3. Replace only the data blocks + stamp. Drop past events; add newly announced ones. Never edit `server/` or any Bets-tab code (see the Bets section).
4. Verify: extract the inline script and `node --check` it. If Playwright is available (`executablePath: '/opt/pw-browsers/chromium'`), render and click through the three tabs — the ESPN fetch failing in a sandbox is EXPECTED (it exercises the fallback path); any other JS error is a real bug.
5. Commit to `main` with a message like `Weekly refresh: <date>` and push. No PRs.

## Tone of written content

For casual fans: plain English, no insider jargon without explanation, short sentences, a little personality ("classic pace-vs-power clash"), betting odds explained as favorite/underdog. Breakdowns are 2-3 strengths, 1-3 weaknesses, 2-4 sentence career story per fighter.

## History / context

- Built Aug 15–16 2026 (UFC 330 week). v2 added headshots, embedded font, A2HS banner, PWA meta, and a fix for ESPN's chronological fight ordering.
- Publishing from Cowork sessions was blocked (git proxy + connector permission limits), so Noah manually uploaded each refresh until the scheduled task moved here, where pushes to the attached repo work.
- The refresh runs from **one** scheduled task, in this repo's environment: "UFC Fight Companion refresh (Sun + Thu, 9am Central)", cron `0 14 * * 0,4` (UTC — so it drifts to 8am local when Central falls back on Nov 1; needs `0 15` then). Pinned to Opus. The duplicate Cowork-side task was deleted Sep 3 2026 — don't go looking for it.
- Known refresh failure modes, all seen for real: a run that researches but never commits (the container is ephemeral, so **commit and push as soon as `node --check` passes**, before browser verification); a run that fans out to subagents and never reaches the push; and a run that reports success on work it never pushed. Verify a refresh landed with `git log --oneline origin/main -1`, not from the summary.
- This environment's network egress is restricted: WebFetch/curl to wikipedia.org, ufc.com, tapology.com, espn.com and `site.api.espn.com` all fail with EGRESS_BLOCKED. Research goes through web search. Consequence: new fighters' `ESPN_IDS` can't be read from the scoreboard JSON, so leave them out rather than guessing — a wrong id renders someone else's face, and missing ids fall back to initials.
