import { notFound } from 'next/navigation';
import LegalContent from '@/components/LegalContent';
import { getLegalPage } from '@/lib/data';
import { siteConfig, seoDefaults } from '@/lib/site';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.terms.title,
    description: seoDefaults.terms.description,
    alternates: { canonical: '/terms' },
    openGraph: {
      title: seoDefaults.terms.title,
      description: seoDefaults.terms.description,
      url: '/terms',
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_KE',
    },
  };
}

export default async function TermsPage() {
  const page = await getLegalPage('terms');
  if (!page) notFound();
  return <LegalContent page={page} />;
}
