import Link from 'next/link';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-dark shadow-sm hover:shadow-md border border-transparent',
  secondary:
    'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-primary hover:bg-primary-light border border-transparent',
  dark: 'bg-secondary text-white hover:bg-primary border border-transparent',
};

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  loading,
  type,
  disabled,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200',
    'min-h-[44px] select-none',
    variants[variant],
    sizes[size],
    loading && 'pointer-events-none opacity-70',
    className
  );

  const content = loading ? (
    <>
      <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      <span>Please wait…</span>
    </>
  ) : (
    children
  );

  if (href) {
    const external = href.startsWith('http');
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <Link href={href} className={classes} {...linkProps} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type || 'button'}
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </button>
  );
}
