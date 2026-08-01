import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PortfolioCard({ project, className }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-xl border border-line bg-white',
        className
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-surface">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — project screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary text-white">
            {project.title}
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {project.categoryLabel || project.category}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-secondary group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{project.outcome}</p>
      </div>
    </Link>
  );
}
