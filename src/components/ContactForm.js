'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Button from './ui/Button';
import { isValidEmail, isValidName, isValidPhone } from '@/lib/validation';
import { contactBudgets } from '@/lib/site';
import { cn } from '@/lib/utils';

const SERVICES_DEFAULT = [
  'Website development',
  'Ecommerce store',
  'POS system',
  'IT hardware sourcing',
  'Data backup & recovery',
  'AI integration',
  'Cloud & hosting',
  'IT support',
  'Something else',
];

function fieldError(name, value) {
  const v = value.trim();
  if (name === 'name' && !isValidName(value)) return 'Please enter your name.';
  if (name === 'email' && !isValidEmail(value)) return 'Please enter a valid email address.';
  if (name === 'phone' && value && !isValidPhone(value))
    return 'Use a valid phone number, e.g. 0712345678 or +254712345678.';
  if (name === 'message' && v.length < 10)
    return 'Please tell us a little more (min 10 characters).';
  if (name === 'message' && v.length > 2000) return 'Message must be 2,000 characters or fewer.';
  if (name === 'consent' && value !== true) return 'Please consent to being contacted.';
  return '';
}

export default function ContactForm({ services = [], initialService = '' }) {
  const optionList = services.length > 0 ? services : SERVICES_DEFAULT.map((s) => ({ slug: s, title: s }));
  const prefilled = optionList.find((s) => s.slug === initialService || s.title === initialService);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: prefilled ? prefilled.title : '',
    budget: '',
    message: '',
    consent: false,
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  function setField(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldError(name, value) }));
    }
  }

  function validateAll() {
    const next = {};
    for (const name of ['name', 'email', 'phone', 'message', 'consent']) {
      next[name] = fieldError(name, values[name]);
    }
    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }
      setStatus('success');
    } catch (err) {
      setErrors({ submit: err.message });
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-8"
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-success" />
        <div>
          <h2 className="text-2xl font-bold text-secondary">Message sent</h2>
          <p className="mt-2 text-muted">
            Thanks for reaching out. Our team will get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  const inputClass = (hasError) =>
    cn(
      'h-11 w-full rounded-lg border bg-white px-4 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2',
      hasError
        ? 'border-error focus:ring-error/40'
        : 'border-line focus:border-accent focus:ring-accent/40'
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-2xl border border-line bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-secondary">Tell us about your project</h2>
      <p className="mt-1 text-sm text-muted">We reply within 24 hours. All fields optional except those marked *.</p>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setValues((prev) => ({ ...prev, website: e.target.value }))}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-secondary">
            Full name *
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => setErrors((prev) => ({ ...prev, name: fieldError('name', values.name) }))}
            className={inputClass(errors.name)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-secondary">
            Email address *
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => setErrors((prev) => ({ ...prev, email: fieldError('email', values.email) }))}
            className={inputClass(errors.email)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-semibold text-secondary">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="0712 345 678"
            value={values.phone}
            onChange={(e) => setField('phone', e.target.value)}
            onBlur={() => setErrors((prev) => ({ ...prev, phone: fieldError('phone', values.phone) }))}
            className={inputClass(errors.phone)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          />
          {errors.phone && (
            <p id="contact-phone-error" role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-company" className="mb-1.5 block text-sm font-semibold text-secondary">
            Company <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => setField('company', e.target.value)}
            className={inputClass(false)}
          />
        </div>

        <div>
          <label htmlFor="contact-service" className="mb-1.5 block text-sm font-semibold text-secondary">
            Service interested in
          </label>
          <select
            id="contact-service"
            value={values.service}
            onChange={(e) => setField('service', e.target.value)}
            className={inputClass(false)}
          >
            <option value="">Select a service</option>
            {optionList.map((option) => (
              <option key={option.title} value={option.title}>
                {option.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-budget" className="mb-1.5 block text-sm font-semibold text-secondary">
            Budget range <span className="font-normal text-muted">(optional)</span>
          </label>
          <select
            id="contact-budget"
            value={values.budget}
            onChange={(e) => setField('budget', e.target.value)}
            className={inputClass(false)}
          >
            <option value="">Select a range</option>
            {contactBudgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-secondary">
            Project details *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            onBlur={() => setErrors((prev) => ({ ...prev, message: fieldError('message', values.message) }))}
            className={cn(inputClass(errors.message), 'h-auto min-h-28 resize-y py-3 leading-relaxed')}
            placeholder="What are you building, and what does success look like?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
          {errors.message && (
            <p id="contact-message-error" role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {errors.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-consent" className="flex items-start gap-3 text-sm text-muted">
            <input
              id="contact-consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => setField('consent', e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-primary"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
            />
            <span>
              I agree to be contacted by Marobix Technologies about my enquiry and consent to the
              processing of my data under the Kenya Data Protection Act 2019. *
            </span>
          </label>
          {errors.consent && (
            <p id="contact-consent-error" role="alert" className="mt-1.5 flex items-start gap-1 text-sm text-error">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {errors.submit && (
        <p role="alert" className="mt-5 flex items-start gap-1.5 text-sm text-error">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {errors.submit}
        </p>
      )}

      <div className="mt-8">
        <Button type="submit" loading={status === 'loading'} size="lg">
          Send Message
        </Button>
      </div>
    </form>
  );
}
