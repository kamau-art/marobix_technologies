import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityEnabled =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET);

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'marobix';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2026-01-01';

export const client = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
      perspective: 'published',
    })
  : null;

export const sanityWritable = sanityEnabled && Boolean(process.env.SANITY_API_TOKEN);

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = sanityEnabled
  ? imageUrlBuilder({
      projectId,
      dataset,
    })
  : null;

export function urlFor(source) {
  if (!sanityEnabled || !builder || !source) return null;
  return builder.image(source);
}

export async function sanityFetch(query, params = {}) {
  if (!client) {
    throw new Error('Sanity is not configured');
  }
  return client.fetch(query, params);
}

export async function sanityCreate(doc) {
  if (!sanityWritable) {
    throw new Error('Sanity is not writable (missing SANITY_API_TOKEN)');
  }
  return writeClient.create(doc);
}

export async function sanityCreateIfNotExists(doc) {
  if (!sanityWritable) {
    throw new Error('Sanity is not writable (missing SANITY_API_TOKEN)');
  }
  return writeClient.createIfNotExists(doc);
}
