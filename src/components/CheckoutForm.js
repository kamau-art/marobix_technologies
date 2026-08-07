'use client';

import { useState } from 'react';
import { CircleDollarSign, AlertCircle, Smartphone } from 'lucide-react';
import Button from './ui/Button';
import { isValidEmail } from '@/lib/validation';
import { formatKES } from '@/lib/utils';
import { cn } from '@/lib/utils';

const METHODS = [
  {
    id: 'mpesa',
    label: 'M-Pesa',
    hint: 'Kenya — instant STK push to your phone',
    icon: Smartphone,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    hint: 'International buyers — pay by card or PayPal account',
    icon: CircleDollarSign,
  },
];

function fieldError(name, value, method) {
  const v = value.trim();
  if (name === 'fullName' && v.length < 2) return 'Please enter your full name.';
  if (name === 'email' && !isValidEmail(value)) return 'Please enter a valid email address.';
  if (name === 'phone') {
    if (method === 'mpesa') {
      if (!v) return 'A valid M-Pesa phone number is required (e.g. 0712345678).';
      if (!/^(?:\+?254|0)[17]\d{8}$/.test(v.replace(/[\s()-]/g, '')))
        return 'Use a valid M-Pesa phone number, e.g. 0712345678.';
    } else if (v && !/^(?:\+?254|0)[17]\d{8}$/.test(v.replace(/[\s()-]/g, ''))) {
      return 'Use a valid phone number, e.g. 0712345678.';
    }
  }
  if (name === 'notes' && v.length > 500) return 'Notes must be 500 characters or fewer.';
  return '';
}

export default function CheckoutForm({ plan }) {
  const [method, setMethod] = useState('paypal');
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    billingAddress: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  function setField(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: fieldError(name, value, method) }));
  }

  function validateAll() {
    const next = {};
    for (const name of ['fullName', 'email', 'phone', 'billingAddress', 'notes']) {
      next[name] = fieldError(name, values[name], method);
    }
    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!validateAll()) return;
    setStatus('loading');
    try {
      const endpoint = { paypal: '/api/paypal', mpesa: '/api/mpesa' }[method];
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id, customer: values }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      window.location.href = data.url || data.confirmationUrl;
    } catch (err) {
      setFormError(err.message);
      setStatus('idle');
    }
  }

  const inputClass = (hasError) =>
    cn(
      'h-11 w-full rounded-lg border bg-white px-4 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2',
      hasError ? 'border-error focus:ring-error/40' : 'border-line focus:border-accent focus:ring-accent/40'
    );

  return (
    <form onSubmit={onSubmit} noValidate>
      <section className="rounded-2xl border border-line bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-secondary">Your details</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-semibold text-secondary">
              Full name *
            </label>
            <input
              id="checkout-name"
              type="text"
              autoComplete="name"
              value={values.fullName}
              onChange={(e) => setField('fullName', e.target.value)}
              className={inputClass(errors.fullName)}
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName && (
              <p role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="checkout-email" className="mb-1.5 block text-sm font-semibold text-secondary">
              Email address *
            </label>
            <input
              id="checkout-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              className={inputClass(errors.email)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <p role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="checkout-phone" className="mb-1.5 block text-sm font-semibold text-secondary">
              Phone{' '}
              {method === 'mpesa' ? (
                <span className="font-normal text-muted">(M-Pesa number)</span>
              ) : (
                <span className="font-normal text-muted">(optional)</span>
              )}
            </label>
            <input
              id="checkout-phone"
              type="tel"
              autoComplete="tel"
              placeholder="0712 345 678"
              value={values.phone}
              onChange={(e) => setField('phone', e.target.value)}
              className={inputClass(errors.phone)}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && (
              <p role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="checkout-company" className="mb-1.5 block text-sm font-semibold text-secondary">
              Company <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="checkout-company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => setField('company', e.target.value)}
              className={inputClass(false)}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="checkout-address" className="mb-1.5 block text-sm font-semibold text-secondary">
              Billing address <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="checkout-address"
              type="text"
              autoComplete="street-address"
              value={values.billingAddress}
              onChange={(e) => setField('billingAddress', e.target.value)}
              className={inputClass(errors.billingAddress)}
              aria-invalid={Boolean(errors.billingAddress)}
            />
            {errors.billingAddress && (
              <p role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {errors.billingAddress}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="checkout-notes" className="mb-1.5 block text-sm font-semibold text-secondary">
              Order notes <span className="font-normal text-muted">(optional, max 500)</span>
            </label>
            <textarea
              id="checkout-notes"
              rows={3}
              value={values.notes}
              onChange={(e) => setField('notes', e.target.value)}
              className={cn(inputClass(errors.notes), 'h-auto resize-y py-3 leading-relaxed')}
              placeholder="Anything we should know before we start?"
              aria-invalid={Boolean(errors.notes)}
            />
            {errors.notes && (
              <p role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {errors.notes}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-secondary">Payment method</h2>
        <div role="radiogroup" aria-label="Payment method" className="mt-5 grid gap-3 sm:grid-cols-3">
          {METHODS.map(({ id, label, hint, icon: Icon }) => (
            <label
              key={id}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors',
                method === id
                  ? 'border-primary bg-primary-light ring-2 ring-primary/30'
                  : 'border-line hover:border-primary'
              )}
            >
              <input
                type="radio"
                name="payment-method"
                value={id}
                checked={method === id}
                onChange={() => {
                  setMethod(id);
                  setErrors({});
                }}
                className="sr-only"
              />
              <Icon aria-hidden="true" className="mt-0.5 size-5 text-primary" />
          <span>
            <span className="block font-semibold text-secondary">{label}</span>
            <span className="block text-xs text-muted">{hint}</span>
          </span>
            </label>
          ))}
        </div>
      </section>

      {formError && (
        <p role="alert" className="mt-6 flex items-start gap-1.5 rounded-lg border border-error/30 bg-error/5 p-4 text-sm text-error">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {formError}
        </p>
      )}

      <div className="mt-8 flex flex-col items-start gap-3">
        <Button type="submit" size="lg" loading={status === 'loading'}>
          {method === 'mpesa' ? 'Pay with M-Pesa' : 'Pay with PayPal'}
        </Button>
        <p className="text-xs text-muted">
          {method === 'mpesa'
            ? 'M-Pesa payments are processed by Safaricom. We never see or store your M-Pesa PIN.'
            : 'Payments are processed securely by PayPal. We never store your payment details.'}
        </p>
      </div>
    </form>
  );
}
