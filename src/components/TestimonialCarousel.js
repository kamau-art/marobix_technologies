'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TestimonialCarousel({ testimonials, autoRotate = true }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const count = testimonials.length;

  useEffect(() => {
    if (!autoRotate || count <= 1) return;
    const id = setInterval(() => {
      if (paused || hoverRef.current || focusRef.current) return;
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(id);
  }, [autoRotate, paused, count]);

  if (count === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
      onFocus={() => {
        focusRef.current = true;
      }}
      onBlur={() => {
        focusRef.current = false;
      }}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        className="mx-auto max-w-3xl"
      >
        <div className="relative rounded-2xl border border-line bg-white p-8 shadow-sm sm:p-12">
          <Quote aria-hidden="true" className="size-10 text-accent" />
          <blockquote
            key={index}
            className="mt-4 min-h-28 text-lg leading-relaxed text-secondary sm:text-xl"
          >
            “{testimonials[index].quote}”
          </blockquote>
          <figcaption className="mt-6">
            <p className="font-heading font-bold text-primary">
              {testimonials[index].author}
            </p>
            {testimonials[index].role && (
              <p className="text-sm text-muted">{testimonials[index].role}</p>
            )}
          </figcaption>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + count) % count)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line text-secondary transition-colors hover:border-primary hover:text-primary"
          aria-label="Previous testimonial"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={cn(
                'size-2.5 rounded-full transition-all',
                i === index ? 'w-6 bg-primary' : 'bg-line hover:bg-muted'
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % count)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line text-secondary transition-colors hover:border-primary hover:text-primary"
          aria-label="Next testimonial"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="mt-4 mx-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted hover:text-primary"
        aria-pressed={paused}
        aria-label={paused ? 'Resume automatic rotation' : 'Pause automatic rotation'}
      >
        {paused ? (
          <Play aria-hidden="true" className="size-4" />
        ) : (
          <Pause aria-hidden="true" className="size-4" />
        )}
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}
