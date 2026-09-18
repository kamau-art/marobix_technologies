import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import CTABanner from '@/components/CTABanner';
import SectionHeading from '@/components/SectionHeading';
import TeamMemberCard from '@/components/TeamMemberCard';
import StatCounter from '@/components/StatCounter';
import { getTeam } from '@/lib/data';
import { siteConfig, seoDefaults } from '@/lib/site';
import { aboutPageSchema, organizationSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.about.title,
    description: seoDefaults.about.description,
    alternates: { canonical: '/about' },
    openGraph: {
      title: seoDefaults.about.title,
      description: seoDefaults.about.description,
      url: '/about',
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_KE',
    },
  };
}

const story = [
  {
    title: 'Our story',
    body: 'Marobix Technologies started with a simple goal: make world-class IT and web development accessible to businesses of every size, wherever they are. Based in Kenya and working with clients across the globe, our team combines local insight with global technical standards to deliver websites, software, and IT infrastructure that actually move businesses forward.',
  },
  {
    title: 'What drives us',
    body: 'We believe technology is not a luxury — it is a necessity for any business that wants to grow. That is why we build end-to-end: we design, we build, we source hardware, and we support it long after launch. One accountable team from first sketch to everyday support.',
  },
];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={aboutPageSchema()} />
      <Hero
        compact
        eyebrow="About us"
        title="A Kenya-based team building for the world"
        subtitle="Global technical standards, delivered with local insight and care."
        primaryCta={{ label: 'Work with us', href: '/contact' }}
      />

      <section className="bg-white py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {story.map((block, i) => (
                <div key={block.title} className={i > 0 ? 'mt-10' : ''}>
                  <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">
                    {block.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{block.body}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-line bg-surface p-8">
                <h2 className="text-xl font-extrabold text-secondary">Our mission</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  To make world-class technology accessible to every business —
                  starting in Kenya and reaching the world.
                </p>
                <h2 className="mt-8 text-xl font-extrabold text-secondary">Our vision</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  A future where growing businesses in Kenya, Africa, and beyond
                  run on technology that works as hard as they do — reliable,
                  scalable, and genuinely cared for.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <SectionHeading
            eyebrow="By the numbers"
            title="The proof in numbers"
          />
          <dl className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-line bg-white p-8 text-center shadow-sm"
              >
                <dt className="order-2 mt-2 block text-sm font-medium text-muted">
                  {stat.label}
                </dt>
                <dd className="order-1 font-heading text-4xl font-extrabold text-primary">
                  <StatCounter value={stat.value} />
                  {stat.label.includes('Countries') ? '+' : '+'}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="People who care about your project"
            description="A compact, senior team — no hand-offs, no vanishing points of contact."
          />
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li key={member.role}>
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABanner
        title="Let us build something great together"
        description="Tell us about your project — we respond within 24 hours."
      />
    </>
  );
}
