import {
  resolvePlan,
  assertPayablePlan,
  generateOrderId,
  validateCustomer,
  createStripeSession,
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

  const orderId = generateOrderId();

  let session;
  try {
    session = await createStripeSession({
      amount: plan.price,
      planName: plan.name,
      orderId,
      planId: plan.id,
      successUrl: `${orderBaseUrl()}/checkout/confirmation?order=${orderId}&plan=${plan.id}&method=card&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${orderBaseUrl()}/checkout?plan=${plan.id}`,
    });
  } catch (err) {
    await createOrderDoc({
      orderId,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      method: 'card',
      status: 'failed',
      customer,
    });
    return Response.json(
      { error: err.message || 'Stripe checkout failed. Please try again.' },
      { status: 502 }
    );
  }

  await createOrderDoc({
    orderId,
    planId: plan.id,
    planName: plan.name,
    amount: plan.price,
    method: 'card',
    status: 'pending',
    paymentRef: session.id,
    customer,
  });

  return Response.json({
    ok: true,
    orderId,
    url: session.url,
    plan: { id: plan.id, name: plan.name },
  });
}
