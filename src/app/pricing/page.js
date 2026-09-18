import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/SectionHeading';
import PricingCard from '@/components/PricingCard';
import ComparisonTable from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import CTABanner from '@/components/CTABanner';
import { getPricing } from '@/lib/data';
import { siteConfig, seoDefaults } from '@/lib/site';
import { pricingOffersSchema, faqSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { Info } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.pricing.title,
    description: seoDefaults.pricing.description,
    alternates: { canonical: '/pricing' },
    openGraph: {
      title: seoDefaults.pricing.title,
      description: seoDefaults.pricing.description,
      url: '/pricing',
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_KE',
    },
  };
}

export default async function PricingPage() {
  const { plans, faqs } = await getPricing();

  return (
    <>
      <JsonLd data={pricingOffersSchema(plans)} />
      {faqs?.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <Hero
        compact
        eyebrow="Pricing"
        title="Simple, honest website pricing in Kenya"
        subtitle="Productized web packages with a fixed, one-time price. Custom IT sourcing, POS, and AI work is quote-based — tell us what you need."
        primaryCta={{ label: 'Get a Free Quote', href: '/contact' }}
        secondaryCta={{ label: 'See Our Work', href: '/portfolio' }}
      />

      <section className="bg-white py-16">
        <Container>
          <ul className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.id} className="h-full">
                <PricingCard plan={plan} />
              </li>
            ))}
          </ul>

          <p className="mt-10 flex items-start justify-center gap-2 text-center text-sm text-muted">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            Ecommerce stores, POS systems, IT sourcing, and custom AI work are priced per project.
            <a href="/contact" className="font-semibold text-primary underline underline-offset-4">
              Get a quote
            </a>
          </p>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <SectionHeading
            eyebrow="Compare"
            title="Compare the plans"
            description="Every plan includes mobile-first design, secure hosting setup, and post-launch support."
          />
          <div className="mt-10">
            <ComparisonTable plans={plans} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Pricing questions, answered"
          />
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
