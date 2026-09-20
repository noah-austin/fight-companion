// Web Push (VAPID) for fight alerts. Subscriptions live in push_subs; the VAPID key pair
// is generated once on first boot and kept in the kv table, so nothing has to be pasted
// into Railway by hand (VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY env vars override it).
import webpush from "web-push";
import { q } from "./db.js";
import { httpErr } from "./auth.js";

const SUBJECT = process.env.VAPID_SUBJECT || "https://noah-austin.github.io/fight-companion/";
let PUB = "", PRIV = "";
export const pushEnabled = () => !!(PUB && PRIV);
export const vapidPublicKey = () => PUB;

export async function initPush() {
  PUB = process.env.VAPID_PUBLIC_KEY || ""; PRIV = process.env.VAPID_PRIVATE_KEY || "";
  if (!PUB || !PRIV) {
    const { rows } = await q(`SELECT k, v FROM kv WHERE k IN ('vapid_public','vapid_private')`);
    const kv = Object.fromEntries(rows.map((r) => [r.k, r.v]));
    if (kv.vapid_public && kv.vapid_private) { PUB = kv.vapid_public; PRIV = kv.vapid_private; }
    else {
      const k = webpush.generateVAPIDKeys();
      await q(`INSERT INTO kv (k, v) VALUES ('vapid_public',$1), ('vapid_private',$2) ON CONFLICT (k) DO NOTHING`, [k.publicKey, k.privateKey]);
      const { rows: again } = await q(`SELECT k, v FROM kv WHERE k IN ('vapid_public','vapid_private')`);
      const kv2 = Object.fromEntries(again.map((r) => [r.k, r.v]));
      PUB = kv2.vapid_public; PRIV = kv2.vapid_private;
      console.log("[push] generated VAPID keys");
    }
  }
  webpush.setVapidDetails(SUBJECT, PUB, PRIV);
  const { rows: [{ n }] } = await q(`SELECT COUNT(*)::int AS n FROM push_subs`);
  console.log(`[push] ready, ${n} subscription(s)`);
}

export async function saveSubscription(sub, userId) {
  const endpoint = sub?.endpoint, p256dh = sub?.keys?.p256dh, auth = sub?.keys?.auth;
  if (!endpoint || !p256dh || !auth) throw httpErr(400, "bad subscription");
  await q(
    `INSERT INTO push_subs (endpoint, p256dh, auth, user_id) VALUES ($1,$2,$3,$4)
     ON CONFLICT (endpoint) DO UPDATE SET p256dh=EXCLUDED.p256dh, auth=EXCLUDED.auth,
       user_id=COALESCE(EXCLUDED.user_id, push_subs.user_id), updated_at=now()`,
    [endpoint, p256dh, auth, userId ?? null]
  );
}
export async function removeSubscription(endpoint) { await q(`DELETE FROM push_subs WHERE endpoint=$1`, [endpoint]); }

// Send one payload to many subscriptions; dead endpoints (404/410) are pruned.
export async function sendTo(rows, payload) {
  if (!pushEnabled() || !rows.length) return 0;
  const body = JSON.stringify(payload);
  let ok = 0;
  await Promise.all(rows.map(async (r) => {
    try {
      await webpush.sendNotification({ endpoint: r.endpoint, keys: { p256dh: r.p256dh, auth: r.auth } }, body, { TTL: 3600, urgency: "high" });
      ok++;
    } catch (e) {
      if (e.statusCode === 404 || e.statusCode === 410) await q(`DELETE FROM push_subs WHERE endpoint=$1`, [r.endpoint]);
      else console.log(`[push] send failed ${e.statusCode || ""}: ${String(e.body || e.message).slice(0, 200)}`);
    }
  }));
  return ok;
}
export async function broadcast(payload) {
  const { rows } = await q(`SELECT endpoint, p256dh, auth FROM push_subs`);
  const n = await sendTo(rows, payload);
  console.log(`[push] "${payload.title}" -> ${n}/${rows.length}`);
  return n;
}
export async function notifyUser(userId, payload) {
  const { rows } = await q(`SELECT endpoint, p256dh, auth FROM push_subs WHERE user_id=$1`, [userId]);
  return sendTo(rows, payload);
}
