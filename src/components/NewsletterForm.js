'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { isValidEmail } from '@/lib/validation';
import { cn } from '@/lib/utils';

export default function NewsletterForm({ className, compact = false }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  function validate(value) {
    if (!value.trim()) return 'Please enter your email address.';
    if (!isValidEmail(value)) return 'Please enter a valid email address.';
    return '';
  }

  async function onSubmit(e) {
    e.preventDefault();
    const err = validate(email);
    setError(err);
    if (err) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }
      setStatus('success');
      setEmail('');
    } catch {
      setError('Could not subscribe right now. Please try again.');
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className={cn('flex items-center gap-2 text-sm font-medium text-success', className)}
      >
        <CheckCircle2 aria-hidden="true" className="size-5" />
        Thanks for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn('w-full', className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          onBlur={() => setError(validate(email))}
          placeholder="you@company.com"
          className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-white px-4 text-sm text-ink placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-disabled={status === 'loading'}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-secondary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:opacity-70"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {error && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-sm text-error"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </form>
  );
}
