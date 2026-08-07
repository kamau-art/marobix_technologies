import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/Breadcrumb';
import { listOrders, listLeads, dbEnabled } from '@/lib/db';
import { formatKES, formatDate, cn } from '@/lib/utils';
import { seoDefaults } from '@/lib/site';
import { Inbox, ShoppingBag } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: 'Admin — Marobix',
    description: 'Leads and orders dashboard',
    robots: { index: false, follow: false },
  };
}

const STATUS_STYLES = {
  paid: 'bg-success/10 text-success',
  pending: 'bg-accent/15 text-accent-dark',
  failed: 'bg-error/10 text-error',
  cancelled: 'bg-secondary/10 text-secondary',
};

function EmptyState({ icon: Icon, text }) {
  return (
    <p className="flex items-center gap-2 py-8 text-sm text-muted">
      <Icon aria-hidden="true" className="size-4" />
      {text}
    </p>
  );
}

export default async function AdminPage() {
  const [orders, leads] = await Promise.all([listOrders({ limit: 50 }), listLeads({ limit: 50 })]);

  return (
    <>
      <section className="bg-white">
        <Container>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Admin' }]} />
        </Container>
      </section>

      <section className="bg-surface pb-20">
        <Container className="max-w-5xl">
          <h1 className="mt-10 text-3xl font-extrabold text-secondary">Dashboard</h1>
          <p className="mt-2 text-sm text-muted">{seoDefaults.title} — leads and orders</p>

          {!dbEnabled && (
            <div className="mt-6 rounded-lg border border-accent/40 bg-accent-light p-4 text-sm text-secondary">
              The database is not configured (missing <code className="font-mono">DATABASE_URL</code>).
              Leads and orders are not being stored.
            </div>
          )}

          <div className="mt-8 grid gap-8">
            <section className="rounded-2xl border border-line bg-white p-6">
              <h2 className="flex items-center gap-2 font-heading text-xl font-extrabold text-secondary">
                <ShoppingBag aria-hidden="true" className="size-5 text-primary" />
                Recent orders
              </h2>
              {orders.length === 0 ? (
                <EmptyState icon={ShoppingBag} text="No orders yet." />
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                        <th className="py-3 pr-4 font-semibold">Order</th>
                        <th className="py-3 pr-4 font-semibold">Plan</th>
                        <th className="py-3 pr-4 font-semibold">Method</th>
                        <th className="py-3 pr-4 font-semibold">Amount</th>
                        <th className="py-3 pr-4 font-semibold">Status</th>
                        <th className="py-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-line/60 last:border-0">
                          <td className="py-3 pr-4 font-mono font-semibold text-secondary">
                            {o.order_id}
                          </td>
                          <td className="py-3 pr-4 text-secondary">{o.plan_name}</td>
                          <td className="py-3 pr-4 capitalize text-muted">{o.method}</td>
                          <td className="py-3 pr-4 font-semibold text-secondary">
                            {formatKES(o.amount)}
                          </td>
                          <td className="py-3 pr-4">
                            <span
                              className={cn(
                                'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                                STATUS_STYLES[o.status] || 'bg-surface text-muted'
                              )}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 text-muted">{formatDate(o.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-line bg-white p-6">
              <h2 className="flex items-center gap-2 font-heading text-xl font-extrabold text-secondary">
                <Inbox aria-hidden="true" className="size-5 text-primary" />
                Recent leads
              </h2>
              {leads.length === 0 ? (
                <EmptyState icon={Inbox} text="No leads yet." />
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                        <th className="py-3 pr-4 font-semibold">Name</th>
                        <th className="py-3 pr-4 font-semibold">Email</th>
                        <th className="py-3 pr-4 font-semibold">Service</th>
                        <th className="py-3 pr-4 font-semibold">Source</th>
                        <th className="py-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l.id} className="border-b border-line/60 last:border-0">
                          <td className="py-3 pr-4 font-semibold text-secondary">
                            {l.name || '—'}
                          </td>
                          <td className="py-3 pr-4 text-secondary">{l.email}</td>
                          <td className="py-3 pr-4 text-muted">{l.service || '—'}</td>
                          <td className="py-3 pr-4 capitalize text-muted">{l.source}</td>
                          <td className="py-3 text-muted">{formatDate(l.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
