'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './ui/Logo';
import Button from './ui/Button';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const drawerRef = useRef(null);
  const lastFocusedRef = useRef(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement;
    const drawer = drawerRef.current;
    const focusables = drawer.querySelectorAll(FOCUSABLE);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    drawer.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      drawer.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      lastFocusedRef.current?.focus?.();
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-line bg-white/95 shadow-sm backdrop-blur'
          : 'border-b border-transparent bg-white'
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-secondary hover:bg-surface hover:text-primary'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact">Get a Quote</Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-secondary hover:bg-surface lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X aria-hidden="true" className="size-6" />
          ) : (
            <Menu aria-hidden="true" className="size-6" />
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={drawerRef}
        className={cn(
          'lg:hidden',
          open
            ? 'block border-t border-line bg-white'
            : 'hidden'
        )}
      >
        <nav aria-label="Mobile" className="container-site flex flex-col gap-1 py-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-3 py-3 text-base font-medium',
                pathname === item.href
                  ? 'bg-primary-light text-primary'
                  : 'text-secondary hover:bg-surface'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-3 w-full">
            Get a Free Quote
          </Button>
        </nav>
      </div>
    </header>
  );
}
