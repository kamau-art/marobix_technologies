'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-white">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-heading text-base font-semibold text-secondary hover:text-primary"
              >
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn('size-5 shrink-0 text-muted transition-transform', open && 'rotate-180')}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              className={cn(
                'grid transition-all duration-200',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
