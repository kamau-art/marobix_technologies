import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import ServiceCard from '@/components/ServiceCard';
import FeaturedPortfolio from '@/components/FeaturedPortfolio';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import CTABanner from '@/components/CTABanner';
import SectionHeading from '@/components/SectionHeading';
import ProcessStep from '@/components/ProcessStep';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { getServices, getProjects, getTestimonials } from '@/lib/data';
import { siteConfig } from '@/lib/site';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: 'Marobix Technologies — Web Development, IT Solutions & POS Systems in Kenya',
    description:
      'Custom websites, ecommerce stores, POS systems, IT sourcing, AI integrations, cloud hosting and IT support in Kenya. One team, every tech need.',
    openGraph: {
      title: 'Marobix Technologies — Web Development, IT Solutions & POS Systems in Kenya',
      description: siteConfig.description,
    },
  };
}

export default async function HomePage() {
  const [services, projects, testimonials] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
  ]);

  const featuredProjects = projects.slice(0, 6);

  return (
    <>
      <Hero
        eyebrow="Web · IT Solutions · POS Systems"
        title="IT solutions built in Kenya, engineered for the world."
        subtitle={siteConfig.description}
        primaryCta={{ label: 'Get a Free Quote', href: '/contact' }}
        secondaryCta={{ label: 'See Our Work', href: '/portfolio' }}
        trustBadges={siteConfig.trustBadges}
      />

      <section className="border-b border-line bg-white">
        <Container className="py-10">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted">
            Trusted by growing businesses across Kenya, Africa, and beyond
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-bold text-muted/50">
            {['Nkuru Retail', 'GreenLeaf Organics', 'Meru Traders', 'DataGuard', 'SwiftCart', 'Amani'].map(
              (name) => (
                <span key={name}>{name}</span>
              )
            )}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Every technology need, one team"
            description="From your website to your point of sale, we design, build, source, and support it all."
          />
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our work"
            title="Projects that move the numbers"
            description="Websites, stores, POS systems, and AI tools — built to perform."
          />
          <div className="mt-12">
            <FeaturedPortfolio projects={featuredProjects} />
          </div>
          <div className="mt-10 text-center">
            <Button href="/portfolio" variant="secondary">
              View All Projects
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why Marobix"
            title="Global capability, local roots"
          />
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.valueProps.map((prop) => (
              <li
                key={prop.title}
                className="rounded-xl border border-line bg-white p-6 transition-shadow hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-lg bg-primary text-white">
                  <Icon name={prop.icon} className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-secondary">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {prop.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Testimonials"
            title="What our clients say"
          />
          <div className="mt-12">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20 lg:pb-24">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="A simple process, done right"
          />
          <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.process.map((step, i) => (
              <ProcessStep
                key={step.title}
                step={i + 1}
                title={step.title}
                description={step.description}
                isLast={i === siteConfig.process.length - 1}
              />
            ))}
          </ol>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
