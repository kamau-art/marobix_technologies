import Hero from '@/components/Hero';
import Container from '@/components/ui/Container';
import ContactForm from '@/components/ContactForm';
import MapEmbed from '@/components/MapEmbed';
import SocialLinksRow from '@/components/SocialLinksRow';
import CTABanner from '@/components/CTABanner';
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { getServices } from '@/lib/data';
import { siteConfig, seoDefaults } from '@/lib/site';

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: seoDefaults.contact.title,
    description: seoDefaults.contact.description,
  };
}

export default async function ContactPage({ searchParams }) {
  const { service } = await searchParams;
  const services = await getServices();

  const details = [
    {
      icon: Mail,
      label: 'Email us',
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: 'Call us',
      items: siteConfig.contact.phones.map(({ phone, display }) => ({
        value: display,
        href: `tel:${phone}`,
      })),
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp us',
      value: siteConfig.contact.phoneDisplay,
      href: siteConfig.contact.whatsapp,
    },
    {
      icon: MapPin,
      label: 'Find us',
      value: siteConfig.contact.address,
    },
    {
      icon: Clock,
      label: 'Response time',
      value: 'Within 24 hours, Mon–Sat',
    },
  ];

  return (
    <>
      <Hero
        compact
        eyebrow="Contact"
        title="Let us build something great together"
        subtitle="Tell us about your project and get a free quote within 24 hours. No pressure, no jargon."
      />

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm services={services} initialService={typeof service === 'string' ? service : ''} />
            </div>

            <aside className="lg:col-span-2">
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-secondary">Get in touch</h2>
                <ul className="mt-6 space-y-5">
                  {details.map(({ icon: Icon, label, value, href, items }) => (
                    <li key={label} className="flex items-start gap-4">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-secondary">{label}</p>
                        {items ? (
                          <div className="mt-0.5 space-y-1">
                            {items.map(({ value: itemValue, href: itemHref }) => (
                              <a
                                key={itemValue}
                                href={itemHref}
                                className="block text-muted underline-offset-2 hover:text-primary hover:underline"
                              >
                                {itemValue}
                              </a>
                            ))}
                          </div>
                        ) : href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="mt-0.5 block text-muted underline-offset-2 hover:text-primary hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-muted">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-secondary">
                    <MessageCircle aria-hidden="true" className="size-4 text-primary" />
                    Follow us
                  </p>
                  <SocialLinksRow />
                </div>
              </div>

              <div className="mt-6">
                <MapEmbed address="Nairobi Town Centre, Kenya" />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Prefer a quick chat?"
        description="Call or WhatsApp us and we will point you in the right direction today."
        primaryCta={{ label: 'WhatsApp Us', href: siteConfig.contact.whatsapp }}
        secondaryCta={{ label: 'View Pricing', href: '/pricing' }}
      />
    </>
  );
}
