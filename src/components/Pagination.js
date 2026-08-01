import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, buildHref }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link
          href={buildHref(page - 1)}
          className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-secondary hover:border-primary hover:text-primary"
          aria-label="Previous page"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </Link>
      ) : (
        <span className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-muted/40">
          <ChevronLeft aria-hidden="true" className="size-5" />
        </span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={buildHref(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`inline-flex size-11 items-center justify-center rounded-lg border text-sm font-semibold ${
            n === page
              ? 'border-primary bg-primary text-white'
              : 'border-line text-secondary hover:border-primary hover:text-primary'
          }`}
        >
          {n}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={buildHref(page + 1)}
          className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-secondary hover:border-primary hover:text-primary"
          aria-label="Next page"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </Link>
      ) : (
        <span className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-muted/40">
          <ChevronRight aria-hidden="true" className="size-5" />
        </span>
      )}
    </nav>
  );
}
