import { dbEnabled, getContentByType, getContentBySlug } from './db';
import {
  services as seedServices,
  projects as seedProjects,
  testimonials as seedTestimonials,
  posts as seedPosts,
  pricingPlans as seedPricingPlans,
  pricingFaqs as seedPricingFaqs,
  teamMembers as seedTeam,
  careers as seedCareers,
  legalPages as seedLegalPages,
} from './seed';

async function fromDb(type, fallback) {
  if (dbEnabled) {
    const rows = await getContentByType(type);
    if (rows?.length) return rows.map((r) => r.body);
  }
  return fallback;
}

export async function getServices() {
  return fromDb('service', seedServices);
}

export async function getServiceBySlug(slug) {
  const all = await getServices();
  return all.find((s) => s.slug === slug) || null;
}

export async function getProjects({ category } = {}) {
  let list = await fromDb('project', seedProjects);
  if (category) {
    list = list.filter((p) => p.category === category);
  }
  return list;
}

export async function getProjectBySlug(slug) {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) || null;
}

export async function getTestimonials() {
  return fromDb('testimonial', seedTestimonials);
}

export async function getPosts() {
  const list = await fromDb('post', seedPosts);
  return [...list].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const dbDate = b.date ? new Date(b.date).getTime() : 0;
    return dbDate - da;
  });
}

export async function getPostBySlug(slug) {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) || null;
}

export async function getPricing() {
  const plans = await fromDb('plan', seedPricingPlans);
  return { plans, faqs: seedPricingFaqs };
}

export async function getTeam() {
  return fromDb('teamMember', seedTeam);
}

export async function getCareers() {
  return fromDb('career', seedCareers);
}

export async function getLegalPage(slug) {
  if (dbEnabled) {
    const row = await getContentBySlug('page', slug);
    if (row) return row.body;
  }
  return seedLegalPages[slug] || null;
}
