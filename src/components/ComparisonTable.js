import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ComparisonTable({ plans }) {
  const rows = [
    { label: 'Pages', starter: 'Up to 5', business: 'Up to 12', enterprise: 'Custom' },
    { label: 'Mobile-first design', starter: true, business: true, enterprise: true },
    { label: 'CMS editing', starter: false, business: true, enterprise: true },
    { label: 'SEO + analytics', starter: 'Basic', business: 'Advanced', enterprise: 'Advanced' },
    { label: 'Blog / news section', starter: false, business: true, enterprise: true },
    { label: 'Lead forms', starter: true, business: true, enterprise: true },
    { label: 'WhatsApp integration', starter: false, business: true, enterprise: true },
    { label: 'Ecommerce / POS / AI', starter: false, business: false, enterprise: true },
    { label: 'Post-launch support', starter: '14 days', business: '30 days', enterprise: 'Ongoing' },
  ];

  function cell(value) {
    if (value === true) {
      return (
        <span aria-label="included" className="inline-flex">
          <Check aria-hidden="true" className="size-5 text-success" />
        </span>
      );
    }
    if (value === false) {
      return (
        <span aria-label="not included" className="inline-flex">
          <Minus aria-hidden="true" className="size-5 text-line" />
        </span>
      );
    }
    return <span>{value}</span>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-surface">
            <th scope="col" className="px-4 py-4 font-heading font-bold text-secondary">
              Feature
            </th>
            {plans.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={cn(
                  'px-4 py-4 text-center font-heading font-bold',
                  p.recommended ? 'text-accent-dark' : 'text-secondary'
                )}
              >
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={cn('border-b border-line last:border-0', i % 2 === 0 && 'bg-white')}>
              <th scope="row" className="px-4 py-4 font-medium text-secondary">
                {row.label}
              </th>
              <td className="px-4 py-4 text-center">{cell(row.starter)}</td>
              <td className="px-4 py-4 text-center">{cell(row.business)}</td>
              <td className="px-4 py-4 text-center">{cell(row.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
