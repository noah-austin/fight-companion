# Bets — archived Oct 2026

The play-money sportsbook (fourth tab, "Bets") was archived at Noah's request during the
October 2026 redesign. Only the **page side** is archived; the server is untouched.

- `bets.js` — the Bets script block as it ran on the site (UI, slip, feed, leaderboard).
  It also defines `BETS_API`, `BT`, `btApi`, … which the old settings sheet referenced.
- `bets.css` — the `.bt-*` styles.
- `page-bets.html` — the `#page-bets` section markup.

**Still running:** the Railway service (`server/`, project `fight-companion`, service `api`)
and its Postgres database, with every account, bet and leaderboard row. It also sends the
phone **fight alerts** (Web Push), which the redesigned site still uses — so don't shut it
down without moving alerts first.

**To bring Bets back:** the whole pre-redesign site (with Bets) is on the branch
`backup/pre-redesign-2026-10-14`. Restoring it on the redesigned site means adding a
fourth tab, a `#page-bets` section, these styles (restyled to the v3 tokens) and the script,
then calling `betsLoad()` when the tab opens, as the old tab handler did.
