import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './ui/Logo';
import NewsletterForm from './NewsletterForm';
import { siteConfig } from '@/lib/site';

const footerNav = {
  Services: [
    { label: 'Website Development', href: '/services/website-development' },
    { label: 'Ecommerce Development', href: '/services/ecommerce-development' },
    { label: 'POS System Development', href: '/services/pos-system-development' },
    { label: 'IT Sourcing & Procurement', href: '/services/it-sourcing-procurement' },
    { label: 'AI Integrations', href: '/services/ai-integrations' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  const { contact, social } = siteConfig;
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {siteConfig.tagline}. One team, every tech need, delivered with
            care — from Kenya to the world.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Mail aria-hidden="true" className="size-4 text-primary" />
              <a href={`mailto:${contact.email}`} className="hover:text-primary">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone aria-hidden="true" className="size-4 text-primary" />
              <a href={`tel:${contact.phone}`} className="hover:text-primary">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              {contact.address}
            </li>
          </ul>
        </div>

        {Object.entries(footerNav).map(([group, links]) => (
          <nav key={group} aria-label={`${group} footer`}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
              {group}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-site grid gap-6 py-10 md:grid-cols-2">
          <div>
            <h3 className="font-heading text-lg font-bold text-secondary">
              Insights, monthly.
            </h3>
            <p className="mt-1 text-sm text-muted">
              Web, ecommerce, POS, and IT tips for growing businesses.
            </p>
          </div>
          <NewsletterForm className="md:justify-self-end md:max-w-md" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <ul className="flex gap-4">
            {Object.entries(social).map(([name, url]) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capitalize hover:text-primary"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
