'use client';

import { useActionState } from 'react';
import { AlertCircle, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import { adminLogin } from '@/app/admin/actions';

const initialState = { error: '' };

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  const inputClass =
    'h-11 w-full rounded-lg border border-line bg-white px-4 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40';

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <div>
        <label htmlFor="admin-username" className="mb-1.5 block text-sm font-semibold text-secondary">
          Username
        </label>
        <input
          id="admin-username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-secondary">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p
          role="alert"
          className="flex items-start gap-1.5 rounded-lg border border-error/30 bg-error/5 p-3 text-sm text-error"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {state.error}
        </p>
      )}

      <div className="pt-2">
        <Button type="submit" loading={pending} className="w-full" size="lg">
          Sign in to dashboard
        </Button>
      </div>
    </form>
  );
}