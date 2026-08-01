import { notFound } from 'next/navigation';
import LegalContent from '@/components/LegalContent';
import { getLegalPage } from '@/lib/data';
import { seoDefaults } from '@/lib/site';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.privacy.title,
    description: seoDefaults.privacy.description,
  };
}

export default async function PrivacyPage() {
  const page = await getLegalPage('privacy');
  if (!page) notFound();
  return <LegalContent page={page} />;
}
