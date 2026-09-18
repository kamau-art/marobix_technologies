import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import PortfolioGallery from '@/components/PortfolioGallery';
import CTABanner from '@/components/CTABanner';
import { getProjects } from '@/lib/data';
import { siteConfig, seoDefaults } from '@/lib/site';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.portfolio.title,
    description: seoDefaults.portfolio.description,
    alternates: { canonical: '/portfolio' },
    openGraph: {
      title: seoDefaults.portfolio.title,
      description: seoDefaults.portfolio.description,
      url: '/portfolio',
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_KE',
    },
  };
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <Hero
        compact
        eyebrow="Our work"
        title="Web, ecommerce & POS projects that move the numbers"
        subtitle="Websites, stores, POS systems, and AI tools — proven across Kenya and beyond."
        primaryCta={{ label: 'Start Your Project', href: '/contact' }}
        secondaryCta={{ label: 'View Services', href: '/services' }}
      />

      <section className="bg-white py-16">
        <Container>
          <PortfolioGallery projects={projects} />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
