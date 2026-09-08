import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className, light }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight',
        light ? 'text-white' : 'text-secondary',
        className
      )}
      aria-label="Marobix Technologies — Home"
    >
      <Image
        src="/images/logo5-mobius-m.svg"
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0"
        priority
      />
      <span>
        Marobix<span className="text-accent">.</span>
      </span>
    </Link>
  );
}