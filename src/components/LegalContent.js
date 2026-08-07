import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

export default function LegalContent({ page }) {
  return (
    <>
      <section className="bg-white">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: page.title },
            ]}
          />
        </Container>
      </section>

      <section className="border-b border-line bg-white pb-16">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Legal
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-secondary sm:text-5xl">
            {page.title}
          </h1>
          {page.lastUpdated && (
            <p className="mt-4 text-sm text-muted">
              Last updated: {formatDate(page.lastUpdated)}
            </p>
          )}
          {page.intro && (
            <p className="mt-6 text-lg leading-relaxed text-muted">{page.intro}</p>
          )}
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <div className="space-y-12">
            {page.sections.map((section, i) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-secondary">
                  <span className="mr-2 text-primary">{String(i + 1).padStart(2, '0')}.</span>
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-line bg-surface p-8 text-center">
            <h2 className="text-xl font-bold text-secondary">Questions?</h2>
            <p className="mt-2 text-muted">
              Email us at <a className="font-semibold text-primary underline" href="mailto:contact@marobix.com">contact@marobix.com</a> or reach out through our contact page.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="dark">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
