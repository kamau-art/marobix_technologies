import { headers } from 'next/headers';

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
  return matches(expected, authorization);
}