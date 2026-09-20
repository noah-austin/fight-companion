// Pricing for one bet. Everything here is deterministic and unit-testable.
//
// A bet = pick + optional method + optional round. Payout is stake x decimal_total where
//   decimal_total = decimal(moneyline) x methodMult x roundMult x (1 - VIG)
//
// Method and round multipliers are inverse UFC base rates, rounded to friendly numbers,
// and sit slightly BELOW break-even on purpose: a coin-flipper loses by going deep, a real
// read profits. Tune the tables, not the formula.

export const VIG = 0.05;

export const METHODS = ["KO", "SUB", "DEC"];

// P(method | this fighter wins): decision ~50%, KO/TKO ~30%, submission ~20%.
const METHOD_MULT = { DEC: 2.0, KO: 3.3, SUB: 5.0 };

// P(round | the fight is a finish). Early rounds are the common ones.
const ROUND_MULT = {
  3: { 1: 2.2, 2: 3.3, 3: 4.0 },
  5: { 1: 2.5, 2: 3.3, 3: 4.0, 4: 5.0, 5: 6.0 },
};

// P(finish at all) ~ 50%, used when someone calls a round without a method.
const FINISH_MULT = 2.0;

export function americanToDecimal(ml) {
  const n = Number(ml);
  if (!Number.isFinite(n) || n === 0) throw new Error("bad moneyline");
  return n > 0 ? 1 + n / 100 : 1 + 100 / Math.abs(n);
}

// Validate the (method, round, rounds) combination and return the multiplier for those legs.
export function legsMultiplier({ method, round, rounds = 3 }) {
  if (method != null && !METHODS.includes(method)) throw new Error("bad method");
  if (method === "DEC" && round != null) throw new Error("a decision goes the distance; drop the round");
  if (round != null) {
    const table = ROUND_MULT[rounds === 5 ? 5 : 3];
    if (!table[round]) throw new Error("bad round");
  }
  let m = 1;
  if (method) m *= METHOD_MULT[method];
  if (round != null) m *= (method ? 1 : FINISH_MULT) * ROUND_MULT[rounds === 5 ? 5 : 3][round];
  return m;
}

export function price({ ml, method = null, round = null, rounds = 3, stake }) {
  const dec = americanToDecimal(ml) * legsMultiplier({ method, round, rounds }) * (1 - VIG);
  const decimal_total = Math.round(dec * 10000) / 10000;
  const potential = Math.round(stake * decimal_total * 100) / 100;
  return { decimal_total, potential };
}

// Did this bet win, given the settled fight? Returns "won" | "lost" | "void" | "needs_manual".
export function grade(bet, fight) {
  if (fight.result_kind === "draw" || fight.result_kind === "nc" || fight.result_kind === "cancelled") return "void";
  if (fight.result_kind !== "win" || !fight.winner_id) return "needs_manual";
  if (bet.pick_id !== fight.winner_id) return "lost";
  // DQ settles as winner-only, whatever was bought (rare; don't punish a freak outcome).
  if (fight.method === "DQ") return "won";
  if (bet.method) {
    if (!fight.method) return "needs_manual";
    if (bet.method !== fight.method) return "lost";
  }
  if (bet.round != null) {
    if (fight.method === "DEC") return "lost";           // went the distance, no round
    if (fight.round == null) return "needs_manual";
    if (bet.round !== fight.round) return "lost";
  }
  return "won";
}
