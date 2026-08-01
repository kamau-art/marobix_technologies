import { Check, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import { formatKES } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function PricingCard({ plan, onBuy }) {
  const recommended = plan.recommended;
  const isQuote = plan.price === null || plan.price === undefined;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-2xl border bg-white p-8 transition-shadow hover:shadow-xl',
        recommended ? 'border-accent shadow-lg ring-2 ring-accent/40' : 'border-line'
      )}
    >
      {recommended && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Recommended
        </span>
      )}
      <h3 className="font-heading text-xl font-extrabold text-secondary">{plan.name}</h3>
      <p className="mt-2 min-h-10 text-sm text-muted">{plan.tagline}</p>

      <div className="mt-6">
        {isQuote ? (
          <p className="font-heading text-4xl font-extrabold text-secondary">Custom</p>
        ) : (
          <p className="font-heading text-4xl font-extrabold text-secondary">
            {formatKES(plan.price)}
            {plan.period === 'one-time' && (
              <span className="text-base font-medium text-muted"> one-time</span>
            )}
          </p>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-secondary">
            <span
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10"
              aria-label="included"
            >
              <Check aria-hidden="true" className="size-3.5 text-success" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {isQuote ? (
          <Button href="/contact" variant="secondary" className="w-full">
            {plan.cta || 'Get a Quote'}
          </Button>
        ) : onBuy ? (
          <Button onClick={onBuy} className="w-full">
            {plan.cta}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        ) : (
          <Button href={`/checkout?plan=${plan.id}`} className="w-full">
            {plan.cta}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
