import { Pool } from 'pg';
import {
  services as seedServices,
  projects as seedProjects,
  testimonials as seedTestimonials,
  posts as seedPosts,
  pricingPlans as seedPricingPlans,
  teamMembers as seedTeam,
  careers as seedCareers,
  legalPages as seedLegalPages,
} from './seed.js';

export const dbEnabled = Boolean(process.env.DATABASE_URL);

let pool = null;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 3000,
      idleTimeoutMillis: 30000,
    });
    pool.on('error', () => {
      // Prevent idle-client errors from crashing the process.
    });
  }
  return pool;
}

let ensured = null;

export function ensureTables() {
  if (!ensured) {
    ensured = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS orders (
          id BIGSERIAL PRIMARY KEY,
          order_id TEXT NOT NULL UNIQUE,
          plan_id TEXT NOT NULL,
          plan_name TEXT NOT NULL,
          amount INTEGER NOT NULL,
          currency TEXT NOT NULL DEFAULT 'KES',
          method TEXT NOT NULL DEFAULT 'card',
          status TEXT NOT NULL DEFAULT 'pending',
          payment_ref TEXT,
          customer JSONB NOT NULL DEFAULT '{}',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS leads (
          id BIGSERIAL PRIMARY KEY,
          name TEXT,
          email TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          service TEXT,
          budget TEXT,
          message TEXT,
          source TEXT NOT NULL DEFAULT 'contact',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS content (
          id BIGSERIAL PRIMARY KEY,
          type TEXT NOT NULL,
          slug TEXT,
          sort_order INTEGER NOT NULL DEFAULT 0,
          body JSONB NOT NULL DEFAULT '{}',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          UNIQUE (type, slug)
        );`
      )
      .catch((err) => {
        ensured = null;
        throw err;
      });
  }
  return ensured;
}

export async function createLead({
  name = '',
  email = '',
  phone = '',
  company = '',
  service = '',
  budget = '',
  message = '',
  source = 'contact',
}) {
  if (!dbEnabled) return;
  await ensureTables();
  await getPool().query(
    `INSERT INTO leads (name, email, phone, company, service, budget, message, source)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [name, email, phone, company, service, budget, message, source]
  );
}

export async function createOrder({
  orderId,
  planId,
  planName,
  amount,
  method,
  status,
  paymentRef,
  customer,
}) {
  if (!dbEnabled) return null;
  try {
    await ensureTables();
    await getPool().query(
      `INSERT INTO orders (order_id, plan_id, plan_name, amount, currency, method, status, payment_ref, customer)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [orderId, planId, planName, amount, 'KES', method, status, paymentRef || '', JSON.stringify(customer || {})]
    );
    return { ok: true, orderId };
  } catch {
    return null;
  }
}

export async function updateOrderStatus(orderId, { status, paymentRef }) {
  if (!dbEnabled || !orderId) return;
  try {
    await ensureTables();
    await getPool().query(
      `UPDATE orders SET status = $1, payment_ref = $2, updated_at = now() WHERE order_id = $3`,
      [status, paymentRef || '', orderId]
    );
  } catch {
    /* best effort */
  }
}

export async function getOrderByOrderId(orderId) {
  if (!dbEnabled || !orderId) return null;
  try {
    await ensureTables();
    const { rows } = await getPool().query(
      `SELECT * FROM orders WHERE order_id = $1 LIMIT 1`,
      [orderId]
    );
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function getOrderByPaymentRef(paymentRef) {
  if (!dbEnabled || !paymentRef) return null;
  try {
    await ensureTables();
    const { rows } = await getPool().query(
      `SELECT * FROM orders WHERE payment_ref = $1 LIMIT 1`,
      [paymentRef]
    );
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function listOrders({ limit = 50 } = {}) {
  if (!dbEnabled) return [];
  try {
    await ensureTables();
    const { rows } = await getPool().query(
      `SELECT * FROM orders ORDER BY created_at DESC LIMIT $1`,
      [limit]
    );
    return rows;
  } catch {
    return [];
  }
}

export async function listLeads({ limit = 50 } = {}) {
  if (!dbEnabled) return [];
  try {
    await ensureTables();
    const { rows } = await getPool().query(
      `SELECT * FROM leads ORDER BY created_at DESC LIMIT $1`,
      [limit]
    );
    return rows;
  } catch {
    return [];
  }
}

export function buildContentRows() {
  const rows = [];
  const push = (type, list, slugOf) => {
    (list || []).forEach((item, i) => {
      rows.push({
        type,
        slug: slugOf ? slugOf(item) : null,
        sortOrder: i,
        body: item,
      });
    });
  };
  push('service', seedServices, (s) => s.slug);
  push('project', seedProjects, (p) => p.slug);
  push('testimonial', seedTestimonials, null);
  push('post', seedPosts, (p) => p.slug);
  push('plan', seedPricingPlans, (p) => p.id);
  push('teamMember', seedTeam, null);
  push('career', seedCareers, null);
  for (const [key, page] of Object.entries(seedLegalPages || {})) {
    rows.push({ type: 'page', slug: key, sortOrder: 0, body: page });
  }
  return rows;
}

let contentSeeded = null;

export async function ensureContentSeeded() {
  if (!dbEnabled) return false;
  if (!contentSeeded) {
    contentSeeded = (async () => {
      await ensureTables();
      const { rows } = await getPool().query(
        `SELECT COUNT(*)::int AS count FROM content`
      );
      if ((rows[0]?.count || 0) === 0) {
        const seedRows = buildContentRows();
        const client = await getPool().connect();
        try {
          await client.query('BEGIN');
          for (const r of seedRows) {
            await client.query(
              `INSERT INTO content (type, slug, sort_order, body) VALUES ($1, $2, $3, $4)`,
              [r.type, r.slug, r.sortOrder, JSON.stringify(r.body)]
            );
          }
          await client.query('COMMIT');
        } catch (err) {
          await client.query('ROLLBACK');
          throw err;
        } finally {
          client.release();
        }
      }
    })().catch(() => {
      contentSeeded = null;
    });
  }
  return contentSeeded;
}

export async function getContentByType(type) {
  if (!dbEnabled) return [];
  try {
    await ensureContentSeeded();
    const { rows } = await getPool().query(
      `SELECT slug, sort_order AS "sortOrder", body
       FROM content WHERE type = $1 ORDER BY sort_order ASC`,
      [type]
    );
    return rows;
  } catch {
    return [];
  }
}

export async function getContentBySlug(type, slug) {
  if (!dbEnabled) return null;
  try {
    await ensureContentSeeded();
    const { rows } = await getPool().query(
      `SELECT slug, sort_order AS "sortOrder", body
       FROM content WHERE type = $1 AND slug = $2 LIMIT 1`,
      [type, slug]
    );
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function upsertContent({ type, slug, sortOrder = 0, body }) {
  if (!dbEnabled) return;
  await ensureTables();
  await getPool().query(
    `INSERT INTO content (type, slug, sort_order, body)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (type, slug) DO UPDATE SET
       sort_order = EXCLUDED.sort_order,
       body = EXCLUDED.body,
       updated_at = now()`,
    [type, slug || null, sortOrder, JSON.stringify(body)]
  );
}
