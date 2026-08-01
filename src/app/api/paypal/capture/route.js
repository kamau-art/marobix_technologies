import { capturePaypalOrder } from '@/lib/payments';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  const token = typeof payload?.token === 'string' ? payload.token : '';
  if (!token) {
    return Response.json({ ok: false, error: 'Missing PayPal token.' }, { status: 400 });
  }
  const result = await capturePaypalOrder(token);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 502 });
  }
  return Response.json({ ok: true, orderId: result.orderId });
}
