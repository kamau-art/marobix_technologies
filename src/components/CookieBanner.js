'use client';

import { useState, useSyncExternalStore } from 'react';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const KEY = 'marobix-cookie-consent';

function subscribe(cb) {
  window.addEventListener('storage', cb);
  return () => window.removeEventListener('storage', cb);
}

function getConsented() {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    return false;
  }
}

function getServerConsented() {
  return false;
}

export default function CookieBanner() {
  const consented = useSyncExternalStore(subscribe, getConsented, getServerConsented);
  const [dismissed, setDismissed] = useState(false);
  const visible = !consented && !dismissed;

  function accept(preference) {
    try {
      localStorage.setItem(KEY, JSON.stringify(preference));
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-xl rounded-2xl border border-line bg-white p-6 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Cookie aria-hidden="true" className="size-6" />
        </span>
        <div>
          <h2 className="font-heading text-base font-bold text-secondary">
            We value your privacy
          </h2>
          <p className="mt-1 text-sm text-muted">
            We use essential cookies to run our site and optional analytics
            cookies to improve it. See our{' '}
            <Link href="/privacy" className="font-medium text-primary underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => accept({ analytics: true })}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => accept({ analytics: false })}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line px-5 text-sm font-semibold text-secondary hover:border-primary hover:text-primary"
            >
              Essential only
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => accept({ analytics: false })}
          aria-label="Dismiss cookie banner"
          className="ml-auto inline-flex size-9 items-center justify-center rounded-lg text-muted hover:text-secondary"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
