import { sanityEnabled, sanityFetch, urlFor } from './sanity';
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

function img(source, fallback) {
  if (source && typeof source === 'object') {
    const url = urlFor(source)?.width(1600).url();
    if (url) return url;
  }
  if (typeof source === 'string' && source.length > 0) return source;
  return fallback;
}

export async function getServices() {
  if (sanityEnabled) {
    const docs = await sanityFetch(`*[_type == "service" && defined(slug)] | order(order asc)`);
    if (docs?.length) {
      return docs.map((d) => ({
        slug: d.slug?.current,
        title: d.title,
        icon: d.icon,
        category: d.category,
        blurb: d.blurb,
        valueProp: d.valueProp || d.blurb,
        included: d.included || [],
        process: d.process || [],
        pricingHint: d.pricingHint || 'Custom quote',
        faqs: d.faqs || [],
        tags: d.tags || [d.category],
      }));
    }
  }
  return seedServices;
}

export async function getServiceBySlug(slug) {
  const all = await getServices();
  return all.find((s) => s.slug === slug) || null;
}

export async function getProjects({ category } = {}) {
  let list;
  if (sanityEnabled) {
    const docs = await sanityFetch(`*[_type == "project" && defined(slug)] | order(order asc)`);
    list = (docs || []).map((d) => ({
      slug: d.slug?.current,
      title: d.title,
      client: d.client,
      category: d.category,
      categoryLabel: d.categoryLabel,
      image: img(d.image, null),
      outcome: d.outcome,
      overview: d.overview || {},
      challenge: d.challenge,
      solution: d.solution,
      screenshots: (d.screenshots || []).map((s) => img(s, null)).filter(Boolean),
      results: d.results || [],
      testimonial: d.testimonial,
      testimonialAuthor: d.testimonialAuthor,
      tags: d.tags || [d.category],
    }));
  } else {
    list = seedProjects;
  }
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
  if (sanityEnabled) {
    const docs = await sanityFetch(`*[_type == "testimonial"] | order(order asc)`);
    if (docs?.length) {
      return docs.map((d) => ({
        quote: d.quote,
        author: d.author,
        role: d.role || '',
        type: d.type || 'client',
      }));
    }
  }
  return seedTestimonials;
}

export async function getPosts() {
  let list;
  if (sanityEnabled) {
    const docs = await sanityFetch(
      `*[_type == "post" && defined(slug)] | order(date desc) { slug, title, category, excerpt, image, date, author, readTime, "body": pt::text(body) }`
    );
    list = (docs || []).map((d) => ({
      slug: d.slug?.current,
      title: d.title,
      category: d.category,
      excerpt: d.excerpt,
      image: img(d.image, null),
      date: d.date,
      author: d.author,
      readTime: d.readTime,
      body: d.body,
    }));
  } else {
    list = seedPosts;
  }
  return list;
}

export async function getPostBySlug(slug) {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) || null;
}

export async function getPricing() {
  if (sanityEnabled) {
    const plans = await sanityFetch(`*[_type == "plan"] | order(order asc)`);
    if (plans?.length) {
      return {
        plans: plans.map((p) => ({
          id: p.id || p.slug?.current,
          name: p.name,
          tagline: p.tagline,
          price: p.price,
          period: p.period,
          features: p.features || [],
          cta: p.cta || 'Get Started',
          recommended: Boolean(p.recommended),
        })),
        faqs: seedPricingFaqs,
      };
    }
  }
  return { plans: seedPricingPlans, faqs: seedPricingFaqs };
}

export async function getTeam() {
  if (sanityEnabled) {
    const docs = await sanityFetch(`*[_type == "teamMember"] | order(order asc)`);
    if (docs?.length) {
      return docs.map((d) => ({
        name: d.name,
        role: d.role,
        image: img(d.image, null),
      }));
    }
  }
  return seedTeam;
}

export async function getCareers() {
  if (sanityEnabled) {
    const docs = await sanityFetch(`*[_type == "career"] | order(order asc)`);
    if (docs?.length) {
      return docs.map((d) => ({
        title: d.title,
        type: d.type,
        location: d.location,
        apply: d.apply || `mailto:careers@marobix.com`,
      }));
    }
  }
  return seedCareers;
}

export async function getLegalPage(slug) {
  if (sanityEnabled) {
    const docs = await sanityFetch(`*[_type == "page" && slug.current == $slug][0]`, { slug });
    if (docs) {
      return {
        slug: docs.slug?.current,
        title: docs.title,
        lastUpdated: docs.lastUpdated,
        intro: docs.intro,
        sections: docs.sections || [],
      };
    }
  }
  return seedLegalPages[slug] || null;
}

export async function getSettings() {
  if (sanityEnabled) {
    const settings = await sanityFetch(`*[_type == "settings"][0]`);
    return settings || null;
  }
  return null;
}
