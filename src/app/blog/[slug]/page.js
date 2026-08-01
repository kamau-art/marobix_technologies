import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import ShareButtons from '@/components/ShareButtons';
import NewsletterForm from '@/components/NewsletterForm';
import CTABanner from '@/components/CTABanner';
import { getPostBySlug, getPosts } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Marobix Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
        </Container>
      </section>

      <article>
        <header className="border-b border-line bg-white">
          <Container className="max-w-3xl !px-0 text-center">
            <span className="inline-flex rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-secondary sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base text-muted">
              {formatDate(post.date)} · {post.readTime} min read · By {post.author}
            </p>
          </Container>

          <Container className="mt-8">
            <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-line bg-surface">
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-primary text-white">
                  {post.title}
                </div>
              )}
            </div>
          </Container>
        </header>

        <div className="bg-white py-12">
          <Container className="max-w-3xl">
            <div
              className="prose-cms"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
            <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
              <p className="text-sm text-muted">By {post.author}</p>
              <ShareButtons title={post.title} path={`/blog/${post.slug}`} />
            </div>
          </Container>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-surface py-16">
          <Container>
            <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">
              Keep reading
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/8] overflow-hidden bg-surface">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-primary-light text-primary">
                          {p.title}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-secondary group-hover:text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {p.excerpt}
                      </p>
                      <p className="mt-4 text-xs text-muted">
                        {formatDate(p.date)} · {p.readTime} min read
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-white py-16">
        <Container>
          <NewsletterForm />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
