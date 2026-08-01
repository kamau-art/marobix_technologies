import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Icon from './ui/Icon';

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg"
    >
      <span className="flex size-12 items-center justify-center rounded-lg bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon name={service.icon} className="size-6" />
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold text-secondary">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.blurb}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Learn more
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
