-- Fight Companion sportsbook schema. Applied on boot with IF NOT EXISTS, so it is safe to re-run.

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  username    TEXT UNIQUE NOT NULL,
  pass_hash   TEXT NOT NULL,
  is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One row per ESPN event (card). id is ESPN's event id.
CREATE TABLE IF NOT EXISTS events (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  date        TIMESTAMPTZ NOT NULL,
  venue       TEXT,
  status      TEXT NOT NULL DEFAULT 'scheduled',   -- scheduled | live | final
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One row per fight. id is ESPN's competition id. Odds are the moneylines
-- last seen from ESPN (American format); NULL means no line published yet.
CREATE TABLE IF NOT EXISTS fights (
  id          TEXT PRIMARY KEY,
  event_id    TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  order_idx   INT NOT NULL DEFAULT 0,               -- ESPN order: 0 = earliest prelim
  weight      TEXT,
  rounds      INT NOT NULL DEFAULT 3,
  f1_id       TEXT, f1_name TEXT NOT NULL,
  f2_id       TEXT, f2_name TEXT NOT NULL,
  f1_ml       INT,  f2_ml   INT,
  start_at    TIMESTAMPTZ,                          -- ESPN per-fight start if provided, else event date
  status      TEXT NOT NULL DEFAULT 'scheduled',   -- scheduled | live | final | cancelled
  winner_id   TEXT,                                 -- f1_id / f2_id, NULL for draw / NC / unknown
  result_kind TEXT,                                 -- win | draw | nc | cancelled
  method      TEXT,                                 -- KO | SUB | DEC | DQ | NULL (unknown)
  round       INT,
  end_time    TEXT,
  raw_detail  TEXT,                                 -- ESPN status detail string, kept for debugging
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS fights_event_idx ON fights(event_id);
-- Main card vs prelims (added Sep 20). card_segment is ESPN's label from the core
-- competition resource ("Main Card" / "Prelims" / "Early Prelims"); is_main is derived
-- from it per event, falling back to "the last five fights" when ESPN gives no labels.
ALTER TABLE fights ADD COLUMN IF NOT EXISTS card_segment TEXT;
ALTER TABLE fights ADD COLUMN IF NOT EXISTS is_main BOOLEAN NOT NULL DEFAULT TRUE;

-- Every user starts each card with the same bankroll. Row created lazily on first bet.
CREATE TABLE IF NOT EXISTS bankrolls (
  user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id    TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  starting    INT NOT NULL DEFAULT 1000,
  PRIMARY KEY (user_id, event_id)
);

-- A bet is one stake on one fight. method/round NULL = not part of the bet.
-- odds_ml and decimal_total are frozen at placement, like a real book.
CREATE TABLE IF NOT EXISTS bets (
  id            SERIAL PRIMARY KEY,
  user_id       INT  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id      TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  fight_id      TEXT NOT NULL REFERENCES fights(id) ON DELETE CASCADE,
  stake         INT  NOT NULL CHECK (stake > 0),
  pick_id       TEXT NOT NULL,
  pick_name     TEXT NOT NULL,
  method        TEXT,                               -- KO | SUB | DEC
  round         INT,
  odds_ml       INT  NOT NULL,
  decimal_total NUMERIC(10,4) NOT NULL,
  potential     NUMERIC(12,2) NOT NULL,             -- stake * decimal_total
  status        TEXT NOT NULL DEFAULT 'open',       -- open | won | lost | void | needs_manual
  payout        NUMERIC(12,2),                      -- amount returned: potential | 0 | stake
  placed_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  settled_at    TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS bets_user_idx  ON bets(user_id);
CREATE INDEX IF NOT EXISTS bets_fight_idx ON bets(fight_id);
CREATE INDEX IF NOT EXISTS bets_event_idx ON bets(event_id);

CREATE TABLE IF NOT EXISTS reactions (
  id        SERIAL PRIMARY KEY,
  bet_id    INT  NOT NULL REFERENCES bets(id) ON DELETE CASCADE,
  user_id   INT  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emoji     TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (bet_id, user_id, emoji)
);
