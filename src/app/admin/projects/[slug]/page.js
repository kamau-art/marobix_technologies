import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import ProjectForm from '@/components/admin/ProjectForm';
import { getProjectBySlug } from '@/lib/data';

export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: 'Edit Project — Admin | Marobix',
    robots: { index: false, follow: false },
  };
}

export default async function EditProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Admin', href: '/admin' },
              { label: 'Projects', href: '/admin/projects' },
              { label: project.title },
            ]}
          />
        </Container>
      </section>

      <section className="bg-surface pb-20">
        <Container className="max-w-5xl">
          <div className="mt-10">
            <h1 className="text-3xl font-extrabold text-secondary">Edit project</h1>
            <p className="mt-2 text-sm text-muted">{project.title}</p>
          </div>
          <div className="mt-8">
            <ProjectForm project={project} />
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