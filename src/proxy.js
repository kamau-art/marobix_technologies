import { NextResponse } from 'next/server';
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from '@/lib/admin-session';

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

export function proxy(request) {
  if (!USERNAME || !PASSWORD) {
    return new NextResponse('Not found', { status: 404 });
  }

  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const authorization = request.headers.get('authorization') || '';
  const expected = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')}`;
  if (matches(expected, authorization)) {
    return NextResponse.next();
  }

  if (verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value)) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};