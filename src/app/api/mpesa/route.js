import {
  resolvePlan,
  assertPayablePlan,
  generateOrderId,
  validateCustomer,
  initiateMpesaStkPush,
  normalizeMpesaPhone,
  createOrderDoc,
  orderBaseUrl,
} from '@/lib/payments';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const planId = typeof payload?.planId === 'string' ? payload.planId : '';
  const plan = await resolvePlan(planId);
  const payable = assertPayablePlan(plan);
  if (!payable.ok) return Response.json({ error: payable.error }, { status: 400 });

  const customerCheck = validateCustomer(payload?.customer);
  if (!customerCheck.ok) return Response.json({ error: customerCheck.error }, { status: 400 });
  const { customer } = customerCheck;

  const mpesaPhone = normalizeMpesaPhone(customer.phone);
  if (!mpesaPhone) {
    return Response.json(
      { error: 'A valid M-Pesa phone number is required (07XXXXXXXX or +2547XXXXXXXX).' },
      { status: 400 }
    );
  }

  const orderId = generateOrderId();

  let result;
  try {
    result = await initiateMpesaStkPush({
      amount: plan.price,
      phone: mpesaPhone,
      orderId,
      planName: plan.name,
    });
  } catch (err) {
    await createOrderDoc({
      orderId,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      method: 'mpesa',
      status: 'failed',
      customer,
    });
    return Response.json(
      { error: err.message || 'M-Pesa request failed. Please try again.' },
      { status: 502 }
    );
  }

  await createOrderDoc({
    orderId,
    planId: plan.id,
    planName: plan.name,
    amount: plan.price,
    method: 'mpesa',
    status: 'pending',
    paymentRef: result.checkoutRequestId,
    customer,
  });

  return Response.json({
    ok: true,
    orderId,
    plan: { id: plan.id, name: plan.name },
    checkoutRequestId: result.checkoutRequestId,
    confirmationUrl: `${orderBaseUrl()}/checkout/confirmation?order=${orderId}&plan=${plan.id}&method=mpesa`,
  });
}
