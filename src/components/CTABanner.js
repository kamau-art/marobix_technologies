import Button from './ui/Button';

export default function CTABanner({
  title = 'Ready to build something great?',
  description = 'Tell us about your project and get a free quote within 24 hours.',
  primaryCta = { label: 'Get a Free Quote', href: '/contact' },
  secondaryCta = { label: 'See Our Work', href: '/portfolio' },
}) {
  return (
    <section className="bg-primary">
      <div className="container-site flex flex-col items-center gap-6 py-16 text-center lg:py-20">
        <h2 className="max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-lg text-white/80">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {primaryCta && <Button href={primaryCta.href}>{primaryCta.label}</Button>}
          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
