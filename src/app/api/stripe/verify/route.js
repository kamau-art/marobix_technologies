import { verifyStripeSession } from '@/lib/payments';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');
  if (!sessionId) {
    return Response.json({ ok: false, error: 'Missing session_id.' }, { status: 400 });
  }
  const result = await verifyStripeSession(sessionId);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 502 });
  }
  return Response.json({ ok: true, orderId: result.orderId });
}
