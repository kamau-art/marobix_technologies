import { cookies, headers } from 'next/headers';
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from './admin-session';

const USERNAME = process.env.ADMIN_USERNAME || '';
const PASSWORD = process.env.ADMIN_PASSWORD || '';

function matches(expected, actual) {
  if (expected.length !== actual.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ actual.charCodeAt(i);
  }
  return diff === 0;
}

export async function isAdmin() {
  if (!USERNAME || !PASSWORD) return false;
  const list = await headers();
  const authorization = list.get('authorization') || '';
  const expected = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')}`;
  if (matches(expected, authorization)) return true;

  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE_NAME)?.value);
}