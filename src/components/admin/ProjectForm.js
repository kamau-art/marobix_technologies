'use client';

import { useActionState } from 'react';
import { AlertCircle } from 'lucide-react';
import { saveProject } from '@/app/admin/actions';
import { CATEGORY_LABELS } from '@/lib/project-categories';
import { cn } from '@/lib/utils';

const initialState = { error: '' };

const inputClass =
  'h-11 w-full rounded-lg border border-line bg-white px-4 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40';

const textareaClass =
  'w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40';

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-secondary">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export default function ProjectForm({ project }) {
  const [state, formAction, pending] = useActionState(saveProject, initialState);

  const slug = project?.slug || '';
  const techStack = (project?.overview?.techStack || []).join(', ');
  const screenshots = (project?.screenshots || []).join(', ');
  const results = (project?.results || [])
    .map(({ label, value }) => `${label}: ${value}`)
    .join('\n');

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      {project?.slug && <input type="hidden" name="originalSlug" value={project.slug} />}
      {state?.error && (
        <p
          role="alert"
          className="mb-6 flex items-start gap-2 rounded-lg border border-error/30 bg-error/5 p-3 text-sm text-error"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {state.error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Project title *">
          <input className={inputClass} name="title" defaultValue={project?.title || ''} required />
        </Field>
        <Field label="URL slug" hint={`Visible at /portfolio/${slug || 'your-slug'}`}>
          <input className={inputClass} name="slug" defaultValue={slug} />
        </Field>
        <Field label="Client">
          <input className={inputClass} name="client" defaultValue={project?.client || ''} />
        </Field>
        <Field label="Category">
          <select className={inputClass} name="category" defaultValue={project?.category || 'web'}>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Category label (card badge)">
          <input
            className={inputClass}
            name="categoryLabel"
            defaultValue={project?.categoryLabel || ''}
          />
        </Field>
        <Field label="Image path" hint="e.g. /images/project.png — drop the file in public/images/">
          <input className={inputClass} name="image" defaultValue={project?.image || ''} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Outcome (one-liner shown on the card)">
            <input className={inputClass} name="outcome" defaultValue={project?.outcome || ''} />
          </Field>
        </div>
        <Field label="Industry">
          <input
            className={inputClass}
            name="industry"
            defaultValue={project?.overview?.industry || ''}
          />
        </Field>
        <Field label="Timeline">
          <input
            className={inputClass}
            name="timeline"
            defaultValue={project?.overview?.timeline || ''}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field
            label="Tech stack"
            hint="Comma-separated, e.g. Next.js, PostgreSQL, Strapi"
          >
            <input className={inputClass} name="techStack" defaultValue={techStack} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Overview client (optional, shown in the stats row)">
            <input
              className={inputClass}
              name="overviewClient"
              defaultValue={project?.overview?.client || ''}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Challenge">
            <textarea
              className={cn(textareaClass, 'min-h-24')}
              name="challenge"
              rows={3}
              defaultValue={project?.challenge || ''}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Solution">
            <textarea
              className={cn(textareaClass, 'min-h-24')}
              name="solution"
              rows={3}
              defaultValue={project?.solution || ''}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Screenshots"
            hint="Comma-separated image paths — leave blank to reuse the cover image"
          >
            <input className={inputClass} name="screenshots" defaultValue={screenshots} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Results"
            hint="One per line as Label: value — e.g. Sales growth: 3x"
          >
            <textarea
              className={cn(textareaClass, 'min-h-24')}
              name="results"
              rows={3}
              defaultValue={results}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Testimonial (optional)">
            <textarea
              className={cn(textareaClass, 'min-h-24')}
              name="testimonial"
              rows={3}
              defaultValue={project?.testimonial || ''}
            />
          </Field>
        </div>
        <Field label="Testimonial author">
          <input
            className={inputClass}
            name="testimonialAuthor"
            defaultValue={project?.testimonialAuthor || ''}
          />
        </Field>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-95 disabled:opacity-70"
        >
          {pending ? 'Saving…' : 'Save project'}
        </button>
      </div>
    </form>
  );
}