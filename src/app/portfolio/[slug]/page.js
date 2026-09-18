import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import MetricCallout from '@/components/MetricCallout';
import TechStackBadge from '@/components/TechStackBadge';
import PortfolioCard from '@/components/PortfolioCard';
import CTABanner from '@/components/CTABanner';
import Button from '@/components/ui/Button';
import { getProjectBySlug, getProjects } from '@/lib/data';
import { siteConfig } from '@/lib/site';
import { creativeWorkSchema, breadcrumbSchema, absUrl } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.title} Case Study | Marobix Technologies`;
  const image = project.image ? absUrl(project.image) : undefined;
  return {
    title,
    description: project.outcome,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title,
      description: project.outcome,
      url: `/portfolio/${project.slug}`,
      type: 'article',
      siteName: siteConfig.name,
      locale: 'en_KE',
      ...(image ? { images: [{ url: image, alt: project.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.outcome,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getProjects();
  const related = allProjects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);
  const fallback = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);
  const shown = related.length > 0 ? related : fallback;

  const overview = project.overview || {};
  const techStack = overview.techStack || [];

  return (
    <>
      <JsonLd data={creativeWorkSchema(project)} />
      <JsonLd
        data={breadcrumbSchema([
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: project.title },
        ])}
      />
      <section className="bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: project.title },
            ]}
          />
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
              {project.categoryLabel || project.category}
            </span>
            <h1 className="mt-3 w-full text-4xl font-extrabold text-secondary sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-lg text-muted">
              A case study for <span className="font-semibold text-secondary">{project.client}</span>
            </p>
          </div>

          <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-2xl border border-line bg-surface">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} — project overview`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-primary text-white">
                {project.title}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <dl className="grid grid-cols-2 gap-6 rounded-2xl border border-line bg-surface p-8 sm:grid-cols-4">
            {[
              { label: 'Client', value: project.client },
              { label: 'Industry', value: overview.industry },
              { label: 'Timeline', value: overview.timeline },
              { label: 'Category', value: project.categoryLabel },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-sm font-semibold text-muted">{item.label}</dt>
                <dd className="mt-1 font-heading font-bold text-secondary">{item.value || '—'}</dd>
              </div>
            ))}
          </dl>

          {techStack.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-muted">Technology stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <TechStackBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">The challenge</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">The solution</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{project.solution}</p>
            </div>
          </div>

          {project.screenshots?.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.screenshots.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/2] overflow-hidden rounded-xl border border-line bg-white"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="text-center text-2xl font-extrabold text-secondary sm:text-3xl">The results</h2>
          <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
            {project.results.map((result) => (
              <MetricCallout key={result.label} label={result.label} value={result.value} />
            ))}
          </div>

          {project.testimonial && (
            <figure className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-surface p-8 text-center">
              <blockquote className="text-lg leading-relaxed text-secondary">
                “{project.testimonial}”
              </blockquote>
              <figcaption className="mt-4 font-heading font-bold text-primary">
                {project.testimonialAuthor}
              </figcaption>
            </figure>
          )}
        </Container>
      </section>

      {shown.length > 0 && (
        <section className="bg-surface py-16">
          <Container>
            <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">Related projects</h2>
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {shown.map((p) => (
                <li key={p.slug}>
                  <PortfolioCard project={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-primary">
        <Container className="flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Want results like these?
          </h2>
          <p className="max-w-xl text-lg text-white/80">
            Tell us about your project and get a free quote within 24 hours.
          </p>
          <Button href="/contact">Get a Free Quote</Button>
        </Container>
      </section>
    </>
  );
}
