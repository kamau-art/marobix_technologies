'use client';

import { useState } from 'react';
import PortfolioCard from './PortfolioCard';
import FilterChips from './FilterChips';
import { cn } from '@/lib/utils';

const labels = {
  web: 'Web',
  ecommerce: 'Ecommerce',
  pos: 'POS',
  ai: 'AI',
  'it-sourcing': 'IT Sourcing',
};

export default function FeaturedPortfolio({ projects, showFilter = true }) {
  const [active, setActive] = useState('all');
  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {showFilter && projects.length > 1 && (
        <div className="mb-8 flex justify-center">
          <FilterChips
            categories={projects.map((p) => p.category)}
            active={active}
            onChange={setActive}
            labels={labels}
          />
        </div>
      )}
      <ul className={cn('grid gap-6', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>
        {filtered.map((project) => (
          <li key={project.slug}>
            <PortfolioCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
