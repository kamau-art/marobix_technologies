import Link from 'next/link';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/ui/Button';
import MpesaStatus from '@/components/MpesaStatus';
import {
  resolvePlan,
  capturePaypalOrder,
  updateOrderStatus,
} from '@/lib/payments';
import { getOrderByOrderId } from '@/lib/db';
import { seoDefaults } from '@/lib/site';
import { formatKES, formatDate } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, Loader2, Smartphone } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: seoDefaults.confirmation.title,
    description: seoDefaults.confirmation.description,
    robots: { index: false, follow: false },
  };
}

function statusCopy({ paid, method, failed }) {
  if (paid) {
    return {
      title: 'Thank you — your payment was successful',
      body: 'Your order is confirmed and our team will be in touch within one business day to kick off your project.',
    };
  }
  if (failed) {
    return {
      title: 'Payment not completed',
      body:
        method === 'mpesa'
          ? 'We could not confirm your M-Pesa payment. If you completed it on your phone, contact us and we will investigate.'
          : 'We could not confirm your PayPal payment for this order. If you completed payment, contact us and we will investigate.',
    };
  }
  return {
    title: 'Enter your M-Pesa PIN',
    body: "We sent an M-Pesa prompt to your phone. Enter your PIN to complete payment — this page updates automatically.",
  };
}

export default async function ConfirmationPage({ searchParams }) {
  const { order, plan: planId, token, method } = await searchParams;

  const plan = typeof planId === 'string' ? await resolvePlan(planId) : null;
  const orderId = typeof order === 'string' ? order : '';
  const payMethod = method === 'mpesa' ? 'mpesa' : 'paypal';

  let paid = false;
  let failed = false;
  let paymentError = '';
  let mpesaPending = false;

  if (payMethod === 'paypal' && token && typeof token === 'string') {
    const result = await capturePaypalOrder(token);
    if (result.ok) {
      paid = true;
      await updateOrderStatus(result.orderId, { status: 'paid', paymentRef: result.paypalOrderId });
    } else {
      failed = true;
      paymentError = 'We could not capture your PayPal payment. Please contact us for assistance.';
    }
  } else if (payMethod === 'mpesa' && orderId) {
    const order = await getOrderByOrderId(orderId);
    if (order) {
      if (order.status === 'paid') paid = true;
      else if (order.status === 'pending') mpesaPending = true;
      else failed = true;
    }
  }

  const copy = statusCopy({ paid, method: payMethod, failed });
  const today = formatDate(new Date().toISOString());

  return (
    <>
      <section className="bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Order confirmation' },
            ]}
          />
        </Container>
      </section>

      <section className="bg-white pb-20">
        <Container className="max-w-2xl text-center">
          <div className="mx-auto flex flex-col items-center">
            {paid ? (
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 aria-hidden="true" className="size-8" />
              </span>
            ) : mpesaPending ? (
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Smartphone aria-hidden="true" className="size-8 animate-pulse" />
              </span>
            ) : (
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-error/10 text-error">
                <XCircle aria-hidden="true" className="size-8" />
              </span>
            )}

            <h1 className="mt-6 text-3xl font-extrabold text-secondary sm:text-4xl">{copy.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{copy.body}</p>

            {mpesaPending && <MpesaStatus orderId={orderId} />}

            {paymentError && (
              <p role="alert" className="mt-6 rounded-lg border border-error/30 bg-error/5 p-4 text-sm text-error">
                {paymentError}
              </p>
            )}

            {orderId && (
              <dl className="mt-10 w-full rounded-2xl border border-line bg-surface p-6 text-left sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-sm text-muted">Order number</dt>
                  <dd className="font-mono text-sm font-semibold text-secondary">{orderId}</dd>
                </div>
                {plan && (
                  <div className="flex items-center justify-between gap-4 border-b border-line py-4">
                    <dt className="text-sm text-muted">Plan</dt>
                    <dd className="text-sm font-semibold text-secondary">{plan.name}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4 border-b border-line py-4">
                  <dt className="text-sm text-muted">Date</dt>
                  <dd className="text-sm font-semibold text-secondary">{today}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 pt-4">
                  <dt className="text-sm text-muted">Amount</dt>
                  <dd className="font-heading text-xl font-extrabold text-primary">
                    {plan ? formatKES(plan.price) : '—'}
                  </dd>
                </div>
              </dl>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {failed && plan && (
                <Button href={`/checkout?plan=${plan.id}`}>Try again</Button>
              )}
              <Button href="/">Back to Home</Button>
              <Button href="/contact" variant="secondary">
                Contact Support
              </Button>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
              {paid ? (
                <>
                  <Clock aria-hidden="true" className="size-4" />
                  A confirmation email is on its way to you. {plan && <Link className="font-semibold text-primary underline" href="/blog">Meanwhile, explore our insights.</Link>}
                </>
              ) : mpesaPending ? (
                <>
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  Waiting for your payment to be confirmed…
                </>
              ) : (
                <Clock aria-hidden="true" className="size-4" />
              )}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
