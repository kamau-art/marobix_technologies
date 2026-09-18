import AdminLoginForm from '@/components/admin/AdminLoginForm';
import Logo from '@/components/ui/Logo';
import { Lock } from 'lucide-react';

export const metadata = {
  title: 'Admin Sign In — Marobix',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="bg-surface min-h-[70vh] py-16">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-secondary">
            <Lock aria-hidden="true" className="size-4 text-primary" />
            Secure admin area
          </div>
          <AdminLoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          This area is restricted to Marobix staff. Unauthorized access is prohibited.
        </p>
      </div>
    </section>
  );
}