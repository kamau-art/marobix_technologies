import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import IconListItem from '@/components/IconListItem';
import ProcessStep from '@/components/ProcessStep';
import FAQAccordion from '@/components/FAQAccordion';
import PortfolioCard from '@/components/PortfolioCard';
import CTABanner from '@/components/CTABanner';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { getServiceBySlug, getServices, getProjects } from '@/lib/data';

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} Services in Kenya | Marobix Technologies`,
    description: service.blurb,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [related] = await Promise.all([getProjects()]);
  const relatedProjects = related
    .filter((p) => (service.tags || []).includes(p.category) || p.category === service.category)
    .slice(0, 3);
  const fallbackProjects = related.slice(0, 3);
  const shownProjects = relatedProjects.length > 0 ? relatedProjects : fallbackProjects;

  const contactHref = `/contact?service=${service.slug}`;

  return (
    <>
      <section className="border-b border-line bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.title },
            ]}
          />
          <div className="grid items-center gap-10 pb-12 pt-4 lg:grid-cols-2">
            <div>
              <span className="flex size-14 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Icon name={service.icon} className="size-7" aria-hidden="true" />
              </span>
              <h1 className="mt-6 text-4xl font-extrabold text-secondary sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                {service.valueProp || service.blurb}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={contactHref}>
                  Start Your Project
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
                <Button href="/portfolio" variant="ghost">
                  See Related Work
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-accent/40 bg-accent-light p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
                Pricing
              </p>
              <p className="mt-2 font-heading text-2xl font-extrabold text-secondary">
                {service.pricingHint}
              </p>
              <p className="mt-2 text-sm text-muted">
                {service.pricingHint === 'Custom quote'
                  ? 'Every project is scoped and quoted after a free consultation.'
                  : 'Exact pricing depends on scope — get a free quote within 24 hours.'}
              </p>
              <Button href={service.pricingHint === 'Custom quote' ? contactHref : '/pricing'} className="mt-6">
                {service.pricingHint === 'Custom quote' ? 'Get a Quote' : 'See Pricing'}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">
                What&apos;s included
              </h2>
              <ul className="mt-6 space-y-4">
                {service.included.map((item) => (
                  <IconListItem key={item}>{item}</IconListItem>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">
                Our process for {service.title.toLowerCase()}
              </h2>
              <ol className="mt-8 space-y-8">
                {service.process.map((step, i) => (
                  <ProcessStep
                    key={step.title}
                    step={i + 1}
                    title={step.title}
                    description={step.description}
                    isLast={i === service.process.length - 1}
                  />
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {shownProjects.length > 0 && (
        <section className="bg-surface py-16">
          <Container>
            <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">
              Related work
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownProjects.map((project) => (
                <li key={project.slug}>
                  <PortfolioCard project={project} />
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                View all projects
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </p>
          </Container>
        </section>
      )}

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <h2 className="text-center text-2xl font-extrabold text-secondary sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </Container>
      </section>

      <CTABanner
        title={`Ready to get started with ${service.title}?`}
        description="Get a free, no-obligation quote within 24 hours."
        primaryCta={{ label: 'Get a Free Quote', href: contactHref }}
      />
    </>
  );
}
