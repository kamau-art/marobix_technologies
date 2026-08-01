import { redirect } from 'next/navigation';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import CheckoutForm from '@/components/CheckoutForm';
import CTABanner from '@/components/CTABanner';
import { resolvePlan } from '@/lib/payments';
import { seoDefaults } from '@/lib/site';
import { formatKES } from '@/lib/utils';
import { Check, Lock, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata({ searchParams }) {
  const { plan: planId } = await searchParams;
  const plan = typeof planId === 'string' ? await resolvePlan(planId) : null;
  return {
    title: plan ? `Checkout — ${plan.name} Plan | Marobix Technologies` : seoDefaults.checkout.title,
    description: seoDefaults.checkout.description,
  };
}

export default async function CheckoutPage({ searchParams }) {
  const { plan: planId } = await searchParams;
  const plan = typeof planId === 'string' ? await resolvePlan(planId) : null;

  if (!plan || plan.price === null || plan.price === undefined) {
    redirect('/pricing');
  }

  return (
    <>
      <section className="bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Checkout' },
            ]}
          />
        </Container>
      </section>

      <section className="border-b border-line bg-white pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h1 className="text-3xl font-extrabold text-secondary sm:text-4xl">Checkout</h1>
              <p className="mt-3 text-muted">
                Complete your details and choose how you want to pay. Your order is only confirmed once payment succeeds.
              </p>
              <div className="mt-8">
                <CheckoutForm plan={plan} />
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-secondary">Order summary</h2>
                <dl className="mt-5 space-y-3 border-b border-line pb-5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Plan</dt>
                    <dd className="font-semibold text-secondary">{plan.name}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Currency</dt>
                    <dd className="font-semibold text-secondary">KES (Kenyan Shillings)</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Total due today</dt>
                    <dd className="font-heading text-2xl font-extrabold text-primary">
                      {formatKES(plan.price)}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-secondary">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                        <Check aria-hidden="true" className="size-3.5 text-success" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2 border-t border-line pt-5 text-xs text-muted">
                  <p className="flex items-center gap-2">
                    <Lock aria-hidden="true" className="size-4 shrink-0 text-success" />
                    Secure payments via Stripe or PayPal
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-success" />
                    Amount re-validated server-side before any charge
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Not sure which plan fits?"
        description="Talk to us and we will recommend the right package — no obligation."
        primaryCta={{ label: 'Talk to Us', href: '/contact' }}
        secondaryCta={{ label: 'Compare Plans', href: '/pricing' }}
      />
    </>
  );
}
