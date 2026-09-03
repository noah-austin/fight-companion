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

Everything lives in `index.html` (~230KB): CSS, JS, base64-embedded Barlow Condensed font, PWA manifest + icons as data URLs, add-to-home-screen banner, three bottom tabs (Fight Cards / Belts & Ranks / Catch Up).

Also in the renderer (added Aug 31, don't strip during refreshes — they live outside the data blocks and survive automatically):

- **Fight-night live mode**: when a card is in its ~8h window or any fight is IN_PROGRESS, the page polls ESPN every 60s (5 min when a card starts within 2h), shows a LIVE header chip and per-event "Live now" badges, and preserves open cards/picks UI across re-renders.
- **"Beat the Books" pick'em**: tap-to-pick buttons on upcoming fights, stored in localStorage per device (`fc-picks`, `fc-pick-hist`). Results settle automatically from ESPN winner flags; underdog calls are detected by parsing the favorite out of `MATCHUPS[...].odds` text (best-effort — keep odds text in the "Name -NNN, Name +NNN" style so the parser works). All-time record shows as a header chip.
- **Notifications (added Sep 2)**: per-event "🗓 Remind me" button generates a client-side .ics with alarms (-1h and at start); "🔔 Fight alerts" toggle (`fc-alerts` in localStorage) fires in-app toasts + system Notifications (where the platform allows local web notifications — Android/desktop yes, iOS no) on fight-start and result transitions detected by the live poll. No server, no push subscriptions — do not add a push service.

**Do NOT redesign, restructure, or "improve" the design.** Noah approved it. A refresh touches ONLY the data blocks listed below plus `ANALYSIS_STAMP`. If a design change seems needed, leave it for Noah to request.

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
3. Replace only the data blocks + stamp. Drop past events; add newly announced ones.
4. Verify: extract the inline script and `node --check` it. If Playwright is available (`executablePath: '/opt/pw-browsers/chromium'`), render and click through the three tabs — the ESPN fetch failing in a sandbox is EXPECTED (it exercises the fallback path); any other JS error is a real bug.
5. Commit to `main` with a message like `Weekly refresh: <date>` and push. No PRs.

## Tone of written content

For casual fans: plain English, no insider jargon without explanation, short sentences, a little personality ("classic pace-vs-power clash"), betting odds explained as favorite/underdog. Breakdowns are 2-3 strengths, 1-3 weaknesses, 2-4 sentence career story per fighter.

## History / context

- Built Aug 15–16 2026 (UFC 330 week). v2 added headshots, embedded font, A2HS banner, PWA meta, and a fix for ESPN's chronological fight ordering.
- Publishing from Cowork sessions was blocked (git proxy + connector permission limits), so Noah manually uploaded each refresh until the scheduled task moved here, where pushes to the attached repo work.
- A Cowork-side scheduled task ("UFC Fight Companion refresh (Sun + Thu)") may still exist — if this repo's schedule is confirmed working, Noah should ask his Cowork chat to delete the old task to avoid duplicate refreshes.
