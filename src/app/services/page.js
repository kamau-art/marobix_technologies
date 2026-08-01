import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import ServiceCard from '@/components/ServiceCard';
import CTABanner from '@/components/CTABanner';
import SectionHeading from '@/components/SectionHeading';
import { getServices } from '@/lib/data';
import { seoDefaults } from '@/lib/site';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.services.title,
    description: seoDefaults.services.description,
  };
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Hero
        compact
        eyebrow="Services"
        title="IT & Web Development services in Kenya"
        subtitle="From your website to your point of sale, we design, build, source, and support it all."
        primaryCta={{ label: 'Get a Free Quote', href: '/contact' }}
      />

      <section className="bg-surface py-20">
        <Container>
          <SectionHeading
            eyebrow="Explore services"
            title="Pick the service you need"
            description="Every service is delivered end-to-end by one accountable team."
          />
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-2xl border border-accent/40 bg-accent-light p-8 text-center">
            <h2 className="text-xl font-extrabold text-secondary sm:text-2xl">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted">
              Book a free consult and we will point you in the right direction —
              no obligation.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                Get a free consult
              </a>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
