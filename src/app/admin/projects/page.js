import Link from 'next/link';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import { getProjects } from '@/lib/data';
import { dbEnabled } from '@/lib/db';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton';
import { Plus, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: 'Projects — Admin | Marobix',
    robots: { index: false, follow: false },
  };
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Admin', href: '/admin' },
              { label: 'Projects' },
            ]}
          />
        </Container>
      </section>

      <section className="bg-surface pb-20">
        <Container className="max-w-5xl">
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-secondary">Projects</h1>
              <p className="mt-2 text-sm text-muted">Manage the portfolio shown on /portfolio.</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:brightness-95"
            >
              <Plus aria-hidden="true" className="size-4" />
              New project
            </Link>
          </div>

          {!dbEnabled && (
            <div className="mt-6 rounded-lg border border-accent/40 bg-accent-light p-4 text-sm text-secondary">
              The database is not configured (missing <code className="font-mono">DATABASE_URL</code>).
              Project changes will not be persisted.
            </div>
          )}

          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
            {projects.length === 0 ? (
              <p className="p-8 text-sm text-muted">No projects yet — add your first one.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                      <th className="py-3 pl-6 pr-4 font-semibold">Title</th>
                      <th className="py-3 pr-4 font-semibold">Category</th>
                      <th className="py-3 pr-4 font-semibold">Slug</th>
                      <th className="py-3 pr-6 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p.slug} className="border-b border-line/60 last:border-0">
                        <td className="py-3 pl-6 pr-4 font-semibold text-secondary">{p.title}</td>
                        <td className="py-3 pr-4 text-muted">{p.categoryLabel || p.category}</td>
                        <td className="py-3 pr-4 font-mono text-xs text-muted">{p.slug}</td>
                        <td className="py-3 pr-6">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/portfolio/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-primary hover:text-accent-dark"
                            >
                              <ExternalLink aria-hidden="true" className="size-3.5" />
                              View
                            </Link>
                            <Link
                              href={`/admin/projects/${p.slug}`}
                              className="font-semibold text-primary hover:text-accent-dark"
                            >
                              Edit
                            </Link>
                            <DeleteProjectButton slug={p.slug} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}