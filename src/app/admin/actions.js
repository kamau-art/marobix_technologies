'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  upsertContent,
  deleteContent,
  getContentBySlug,
  getContentByType,
} from '@/lib/db';
import { isAdmin } from '@/lib/admin-auth';
import { CATEGORY_LABELS } from '@/lib/project-categories';

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function text(formData, name) {
  return String(formData.get(name) || '').trim();
}

function listOf(value, separator = ',') {
  return String(value || '')
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseResults(value) {
  return listOf(value, '\n').map((entry) => {
    const i = entry.indexOf(':');
    if (i === -1) return { label: entry, value: entry };
    return { label: entry.slice(0, i).trim(), value: entry.slice(i + 1).trim() };
  });
}

function buildBody(formData) {
  const title = text(formData, 'title');
  const slug = slugify(text(formData, 'slug') || title);
  const category = text(formData, 'category') || 'web';
  const client = text(formData, 'client') || '—';
  const categoryLabel =
    text(formData, 'categoryLabel') || CATEGORY_LABELS[category] || category;
  const overviewClient = text(formData, 'overviewClient') || client;

  return {
    slug,
    title,
    client,
    category,
    categoryLabel,
    image: text(formData, 'image') || null,
    outcome: text(formData, 'outcome'),
    overview: {
      client: overviewClient,
      industry: text(formData, 'industry'),
      timeline: text(formData, 'timeline'),
      techStack: listOf(text(formData, 'techStack')),
    },
    challenge: text(formData, 'challenge'),
    solution: text(formData, 'solution'),
    screenshots: listOf(text(formData, 'screenshots')),
    results: parseResults(text(formData, 'results')),
    testimonial: text(formData, 'testimonial') || null,
    testimonialAuthor: text(formData, 'testimonialAuthor') || null,
  };
}

export async function saveProject(prevState, formData) {
  if (!(await isAdmin())) {
    return { error: 'Unauthorized. Please sign in.' };
  }

  const title = text(formData, 'title');
  if (!title) {
    return { error: 'Title is required.' };
  }

  const originalSlug = text(formData, 'originalSlug');
  const body = buildBody(formData);
  if (!body.slug) {
    return { error: 'A URL slug is required.' };
  }

  const existing = originalSlug
    ? await getContentBySlug('project', originalSlug)
    : null;
  const projectRows = await getContentByType('project');
  const sortOrder = existing?.sortOrder ?? projectRows.length;

  await upsertContent({ type: 'project', slug: body.slug, sortOrder, body });

  if (originalSlug && originalSlug !== body.slug) {
    await deleteContent({ type: 'project', slug: originalSlug });
  }

  revalidatePath('/portfolio');
  revalidatePath('/portfolio/[slug]', 'page');
  redirect('/admin/projects');
}

export async function deleteProject(formData) {
  if (!(await isAdmin())) {
    return { error: 'Unauthorized. Please sign in.' };
  }

  const slug = text(formData, 'slug');
  if (slug) {
    await deleteContent({ type: 'project', slug });
    revalidatePath('/portfolio');
    revalidatePath('/portfolio/[slug]', 'page');
  }
  redirect('/admin/projects');
}