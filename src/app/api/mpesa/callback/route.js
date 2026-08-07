import { getOrderByPaymentRef, updateOrderStatus } from '@/lib/db';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ResultCode: 1, ResultDesc: 'Invalid callback body.' });
  }

  const stk = body?.Body?.stkCallback;
  const checkoutRequestId = stk?.CheckoutRequestID;
  if (!stk || !checkoutRequestId) {
    return Response.json({ ResultCode: 1, ResultDesc: 'Missing stkCallback.' });
  }

  const success = Number(stk.ResultCode) === 0;
  let receipt = '';
  for (const item of stk.CallbackMetadata?.Item || []) {
    if (item.Name === 'MpesaReceiptNumber') receipt = item.Value || '';
  }

  const order = await getOrderByPaymentRef(checkoutRequestId);
  if (order && order.status === 'pending') {
    await updateOrderStatus(order.order_id, {
      status: success ? 'paid' : 'failed',
      paymentRef: success && receipt ? receipt : checkoutRequestId,
    });
  }

  return Response.json({ ResultCode: 0, ResultDesc: 'Success' });
}
