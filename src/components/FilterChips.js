'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function FilterChips({ categories, active, onChange, labels }) {
  const options = useMemo(() => {
    const seen = new Set();
    const all = [{ value: 'all', label: 'All' }];
    for (const c of categories) {
      if (c && !seen.has(c)) {
        seen.add(c);
        all.push({ value: c, label: labels?.[c] || c });
      }
    }
    return all;
  }, [categories, labels]);

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
    >
      {options.map((opt) => {
        const selected = active === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              selected
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-white text-secondary hover:border-primary hover:text-primary'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
