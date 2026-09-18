import { createHmac, timingSafeEqual } from 'node:crypto';

const USERNAME = process.env.ADMIN_USERNAME || '';
const PASSWORD = process.env.ADMIN_PASSWORD || '';
const SECRET = process.env.SESSION_SECRET || PASSWORD;
export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 8;

function b64url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload) {
  return createHmac('sha256', SECRET).update(payload).digest('base64url');
}

function safeEqual(a, b) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function createSessionToken() {
  const payload = JSON.stringify({ u: USERNAME, exp: Date.now() + SESSION_MAX_AGE * 1000 });
  return `${b64url(payload)}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || !USERNAME || !PASSWORD) return false;
  const [payload, sig] = String(token).split('.');
  if (!payload || !sig) return false;
  if (!safeEqual(sign(payload), sig)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.u === USERNAME && data.exp > Date.now();
  } catch {
    return false;
  }
}