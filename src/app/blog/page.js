import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import Pagination from '@/components/Pagination';
import NewsletterForm from '@/components/NewsletterForm';
import CTABanner from '@/components/CTABanner';
import { getPosts } from '@/lib/data';
import { seoDefaults } from '@/lib/site';
import { formatDate } from '@/lib/utils';

export const revalidate = 60;

const PAGE_SIZE = 6;

export async function generateMetadata() {
  return {
    title: seoDefaults.blog.title,
    description: seoDefaults.blog.description,
  };
}

export default async function BlogPage({ searchParams }) {
  const { page: rawPage } = await searchParams;
  const page = Math.max(1, Number.parseInt(rawPage, 10) || 1);
  const posts = await getPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = posts.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const [featured, ...rest] = current === 1 ? visible : [null, ...visible];

  return (
    <>
      <Hero
        compact
        eyebrow="Insights"
        title="Ideas, guides, and what we are learning"
        subtitle="Practical articles on web development, POS systems, ecommerce, and business technology in Kenya."
      />

      <section className="bg-white py-16">
        <Container>
          {featured && (
            <article className="mb-12 overflow-hidden rounded-2xl border border-line bg-surface">
              <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2">
                <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[320px]">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-primary-light text-primary">
                      {featured.title}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Latest article
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold text-secondary sm:text-3xl group-hover:text-primary">
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted">{featured.excerpt}</p>
                  <p className="mt-6 text-sm text-muted">
                    {formatDate(featured.date)} · {featured.readTime} min read · {featured.author}
                  </p>
                </div>
              </Link>
            </article>
          )}

          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg">
                  <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-primary-light text-primary">
                          {post.title}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="inline-flex w-fit rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                        {post.category}
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-secondary group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <p className="mt-4 text-xs text-muted">
                        {formatDate(post.date)} · {post.readTime} min read
                      </p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Pagination
              page={current}
              totalPages={totalPages}
              buildHref={(n) => (n === 1 ? '/blog' : `/blog?page=${n}`)}
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <NewsletterForm />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
