import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/SectionHeading';
import CTABanner from '@/components/CTABanner';
import Button from '@/components/ui/Button';
import { getCareers } from '@/lib/data';
import { seoDefaults } from '@/lib/site';
import { ArrowRight, HeartHandshake, Rocket, Users } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.careers.title,
    description: seoDefaults.careers.description,
  };
}

const values = [
  {
    icon: Rocket,
    title: 'Ship real work',
    description: 'We build things that make money for our clients — and you get to own real outcomes.',
  },
  {
    icon: HeartHandshake,
    title: 'Clients come back',
    description: 'Long-term relationships, not one-off gigs. You will work on projects that grow over years.',
  },
  {
    icon: Users,
    title: 'Small team, big learning',
    description: 'A tight team where your work is visible, your feedback matters, and you grow fast.',
  },
];

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <>
      <Hero
        compact
        eyebrow="Careers"
        title="Build technology for Kenya and the world"
        subtitle="Marobix is always looking for great people — developers, designers, and client champions who care about craft."
        primaryCta={{ label: 'See Open Roles', href: '#roles' }}
        secondaryCta={{ label: 'About Us', href: '/about' }}
      />

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-line bg-surface p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-secondary">{title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="roles" className="bg-surface py-16">
        <Container>
          <SectionHeading
            eyebrow="Open roles"
            title="Join the team"
            description="No role matches? Send your CV anyway — great people always get a seat."
          />

          <ul className="mx-auto mt-10 max-w-3xl space-y-4">
            {careers.length === 0 && (
              <li className="rounded-2xl border border-line bg-white p-8 text-center text-muted">
                We are not hiring right now — but email us your CV for future roles.
              </li>
            )}
            {careers.map((role) => (
              <li
                key={role.title}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-secondary">{role.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {role.type} · {role.location}
                  </p>
                </div>
                <Button
                  href={role.apply}
                  variant="secondary"
                  className="shrink-0"
                  {...(role.apply.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  Apply
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-muted">
            Applications: send your CV and portfolio to{' '}
            <a href="mailto:careers@marobix.com" className="font-semibold text-primary underline underline-offset-4">
              careers@marobix.com
            </a>
          </p>
        </Container>
      </section>

      <CTABanner
        title="Not looking for a job — but need a team?"
        description="We build websites, stores, POS systems, and AI tools for businesses like yours."
        primaryCta={{ label: 'Start a Project', href: '/contact' }}
      />
    </>
  );
}
