import { notFound } from 'next/navigation';
import LegalContent from '@/components/LegalContent';
import { getLegalPage } from '@/lib/data';
import { seoDefaults } from '@/lib/site';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.terms.title,
    description: seoDefaults.terms.description,
  };
}

export default async function TermsPage() {
  const page = await getLegalPage('terms');
  if (!page) notFound();
  return <LegalContent page={page} />;
}
