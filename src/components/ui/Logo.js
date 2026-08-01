import Link from 'next/link';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className, light }) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-2 text-xl font-bold tracking-tight',
        light ? 'text-white' : 'text-secondary',
        className
      )}
      aria-label="Marobix Technologies — Home"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
        <Zap aria-hidden="true" className="size-5 text-accent" />
      </span>
      <span>
        Marobix<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
