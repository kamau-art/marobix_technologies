import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schema.js';

export default defineConfig({
  name: 'marobix',
  title: 'Marobix CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'marobix',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
