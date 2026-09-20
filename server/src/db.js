import pg from "pg";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const { Pool } = pg;
const here = dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Railway's internal Postgres URL doesn't need TLS; the public proxy does.
  ssl: /railway\.internal/.test(process.env.DATABASE_URL) ? false : { rejectUnauthorized: false },
});

export const q = (text, params) => pool.query(text, params);

export async function applySchema() {
  const sql = readFileSync(join(here, "schema.sql"), "utf8");
  await pool.query(sql);
}

// Run fn inside a transaction with a dedicated client.
export async function tx(fn) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const out = await fn(client);
    await client.query("COMMIT");
    return out;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
