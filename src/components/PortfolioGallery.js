'use client';

import { useState } from 'react';
import PortfolioCard from './PortfolioCard';
import FilterChips from './FilterChips';

const labels = {
  web: 'Web',
  ecommerce: 'Ecommerce',
  pos: 'POS',
  ai: 'AI',
  'it-sourcing': 'IT Sourcing',
};

const PAGE_SIZE = 6;

export default function PortfolioGallery({ projects }) {
  const [active, setActive] = useState('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active);
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  function handleFilter(value) {
    setActive(value);
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      <div className="mb-8">
        <FilterChips
          categories={projects.map((p) => p.category)}
          active={active}
          onChange={handleFilter}
          labels={labels}
        />
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <li key={project.slug}>
            <PortfolioCard project={project} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex h-11 items-center justify-center rounded-lg border-2 border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Load more projects
          </button>
        </div>
      )}
    </div>
  );
}
