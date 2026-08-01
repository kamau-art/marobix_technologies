import Button from './ui/Button';
import { BadgeCheck } from 'lucide-react';

export default function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta = { label: 'Get a Free Quote', href: '/contact' },
  secondaryCta,
  trustBadges = [],
  children,
  compact = false,
}) {
  return (
    <section
      className={`relative overflow-hidden bg-primary ${
        compact ? 'py-20' : 'pt-32 pb-24 lg:pt-40 lg:pb-32'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-white/5"
      />
      <div className="container-site relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryCta && <Button href={primaryCta.href}>{primaryCta.label}</Button>}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" className="border-white text-white hover:bg-white hover:text-primary">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
          {trustBadges.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {trustBadges.map((badge) => (
                <li
                  key={badge}
                  className="flex items-center gap-2 text-sm font-medium text-white/85"
                >
                  <BadgeCheck aria-hidden="true" className="size-5 text-accent" />
                  {badge}
                </li>
              ))}
            </ul>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
