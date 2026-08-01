import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="bg-white">
      <Container className="flex flex-col items-center py-28 text-center lg:py-40">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Error 404</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
          This page went on leave
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The page you are looking for does not exist, or has been moved. Let us get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
        <Link
          href="/portfolio"
          className="mt-8 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
        >
          See our work instead
        </Link>
      </Container>
    </section>
  );
}
