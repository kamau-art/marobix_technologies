import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';

function loadEnv() {
  const file = resolve(process.cwd(), '.env');
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2];
    if (!(key in process.env)) {
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

loadEnv();

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL. Set it in .env.');
  process.exit(1);
}

const { Pool } = pg;
const pool = new Pool({ connectionString: DATABASE_URL });

const { buildContentRows, ensureTables } = await import('../src/lib/db.js');
const rows = buildContentRows();

const client = await pool.connect();
try {
  await client.query('BEGIN');
  await ensureTables();
  const types = [...new Set(rows.map((r) => r.type))];
  for (const type of types) {
    await client.query('DELETE FROM content WHERE type = $1', [type]);
  }
  for (const r of rows) {
    await client.query(
      `INSERT INTO content (type, slug, sort_order, body) VALUES ($1, $2, $3, $4)`,
      [r.type, r.slug, r.sortOrder, JSON.stringify(r.body)]
    );
  }
  await client.query('COMMIT');
  console.log(`Seeded ${rows.length} content rows across ${types.join(', ')}`);
} catch (err) {
  await client.query('ROLLBACK');
  console.error('Seed failed:', err.message);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
  process.exit(process.exitCode || 0);
}
