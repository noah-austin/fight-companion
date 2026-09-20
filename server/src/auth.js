import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { q } from "./db.js";

const SECRET = process.env.JWT_SECRET;
const INVITE = process.env.INVITE_CODE;
if (!SECRET || !INVITE) { console.error("JWT_SECRET and INVITE_CODE must be set"); process.exit(1); }

const USERNAME_RX = /^[a-z0-9_]{2,20}$/i;

export async function signup({ username, password, invite }) {
  if (invite !== INVITE) throw httpErr(403, "bad invite code");
  if (!USERNAME_RX.test(username || "")) throw httpErr(400, "username: 2-20 letters, numbers or _");
  if (!password || password.length < 6) throw httpErr(400, "password: at least 6 characters");
  const hash = await bcrypt.hash(password, 10);
  // First account in the league is the admin.
  const { rows: existing } = await q(`SELECT count(*)::int AS n FROM users`);
  const isAdmin = existing[0].n === 0;
  try {
    const { rows } = await q(
      `INSERT INTO users (username, pass_hash, is_admin) VALUES ($1,$2,$3) RETURNING id, username, is_admin`,
      [username.toLowerCase(), hash, isAdmin]
    );
    return rows[0];
  } catch (e) {
    if (e.code === "23505") throw httpErr(409, "username taken");
    throw e;
  }
}

export async function login({ username, password }) {
  const { rows } = await q(`SELECT id, username, pass_hash, is_admin FROM users WHERE username=$1`, [(username || "").toLowerCase()]);
  const u = rows[0];
  if (!u || !(await bcrypt.compare(password || "", u.pass_hash))) throw httpErr(401, "wrong username or password");
  return { id: u.id, username: u.username, is_admin: u.is_admin };
}

export const sign = (u) => jwt.sign({ id: u.id, username: u.username, is_admin: u.is_admin }, SECRET, { expiresIn: "90d" });

export function requireUser(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: "sign in" });
  try { req.user = jwt.verify(token, SECRET); next(); }
  catch { res.status(401).json({ error: "session expired, sign in again" }); }
}

export function requireAdmin(req, res, next) {
  requireUser(req, res, () => (req.user.is_admin ? next() : res.status(403).json({ error: "admin only" })));
}

export function httpErr(status, message) { const e = new Error(message); e.status = status; return e; }
