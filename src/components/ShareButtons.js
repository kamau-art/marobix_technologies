'use client';

import { Link2, Check } from 'lucide-react';
import { useState } from 'react';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from './icons/BrandIcons';

export default function ShareButtons({ title, path }) {
  const [copied, setCopied] = useState(false);
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: 'Share on Facebook',
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Share on X',
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'Share on LinkedIn',
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted">Share:</span>
      {links.map(({ name, icon: Icon, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="inline-flex size-10 items-center justify-center rounded-full border border-line text-secondary transition-colors hover:border-primary hover:text-primary"
        >
          <Icon className="size-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className="inline-flex size-10 items-center justify-center rounded-full border border-line text-secondary transition-colors hover:border-primary hover:text-primary"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4 text-success" />
        ) : (
          <Link2 aria-hidden="true" className="size-4" />
        )}
      </button>
    </div>
  );
}
