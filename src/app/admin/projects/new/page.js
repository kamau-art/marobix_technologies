import Link from 'next/link';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import ProjectForm from '@/components/admin/ProjectForm';

export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: 'New Project — Admin | Marobix',
    robots: { index: false, follow: false },
  };
}

export default function NewProjectPage() {
  return (
    <>
      <section className="bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Admin', href: '/admin' },
              { label: 'Projects', href: '/admin/projects' },
              { label: 'New' },
            ]}
          />
        </Container>
      </section>

      <section className="bg-surface pb-20">
        <Container className="max-w-5xl">
          <div className="mt-10">
            <h1 className="text-3xl font-extrabold text-secondary">New project</h1>
            <p className="mt-2 text-sm text-muted">
              Saves to the portfolio. Images go in{' '}
              <code className="font-mono">public/images/</code> on the server first.
            </p>
          </div>
          <div className="mt-8">
            <ProjectForm />
          </div>
          <p className="mt-6 text-sm text-muted">
            <Link href="/admin/projects" className="font-semibold text-primary hover:underline">
              ← Back to projects
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}