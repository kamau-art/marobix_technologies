import { getOrderByOrderId, updateOrderStatus } from '@/lib/db';
import { queryMpesaStatus } from '@/lib/payments';

const lastQueried = new Map();
const CALLBACK_GRACE_MS = 30000;
const QUERY_THROTTLE_MS = 20000;

export async function GET(request) {
  const orderId = new URL(request.url).searchParams.get('order');
  if (!orderId) {
    return Response.json({ ok: false, error: 'Missing order id.' }, { status: 400 });
  }

  const order = await getOrderByOrderId(orderId);
  if (!order) {
    return Response.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }

  let status = order.status;

  if (
    status === 'pending' &&
    order.payment_ref &&
    Date.now() - new Date(order.created_at).getTime() > CALLBACK_GRACE_MS
  ) {
    const last = lastQueried.get(orderId) || 0;
    if (Date.now() - last > QUERY_THROTTLE_MS) {
      lastQueried.set(orderId, Date.now());
      const result = await queryMpesaStatus(order.payment_ref).catch(() => null);
      if (result) {
        const next = result.success ? 'paid' : 'failed';
        await updateOrderStatus(orderId, {
          status: next,
          paymentRef: result.receipt || order.payment_ref,
        });
        status = next;
      }
    }
  }

  return Response.json({
    ok: true,
    orderId,
    status,
    method: order.method,
    amount: order.amount,
  });
}
