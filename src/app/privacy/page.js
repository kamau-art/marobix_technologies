import { notFound } from 'next/navigation';
import LegalContent from '@/components/LegalContent';
import { getLegalPage } from '@/lib/data';
import { siteConfig, seoDefaults } from '@/lib/site';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.privacy.title,
    description: seoDefaults.privacy.description,
    alternates: { canonical: '/privacy' },
    openGraph: {
      title: seoDefaults.privacy.title,
      description: seoDefaults.privacy.description,
      url: '/privacy',
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_KE',
    },
  };
}

export default async function PrivacyPage() {
  const page = await getLegalPage('privacy');
  if (!page) notFound();
  return <LegalContent page={page} />;
}
