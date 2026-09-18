import { siteConfig } from './site';

export const baseUrl = siteConfig.baseUrl.replace(/\/$/, '');

export function absUrl(path = '') {
  if (/^https?:\/\//.test(path)) return path;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function stripHtml(html) {
  return (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function contactPoint() {
  return {
    '@type': 'ContactPoint',
    telephone: siteConfig.contact.phone,
    contactType: 'sales',
    email: siteConfig.contact.email,
    areaServed: siteConfig.areaServed,
    availableLanguage: ['English', 'Swahili'],
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: baseUrl,
    logo: absUrl(siteConfig.logo),
    image: absUrl(siteConfig.logo),
    description: siteConfig.description,
    foundingDate: siteConfig.foundingDate,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    areaServed: siteConfig.areaServed,
    sameAs: Object.values(siteConfig.social),
    contactPoint: contactPoint(),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: siteConfig.name,
    url: baseUrl,
    publisher: { '@id': `${baseUrl}/#organization` },
    inLanguage: 'en',
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#localbusiness`,
    name: siteConfig.name,
    url: baseUrl,
    logo: absUrl(siteConfig.logo),
    image: absUrl(siteConfig.logo),
    description: siteConfig.description,
    foundingDate: siteConfig.foundingDate,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: 'KES, USD',
    paymentAccepted: 'M-Pesa, PayPal, Bank Transfer, Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: siteConfig.areaServed,
    sameAs: Object.values(siteConfig.social),
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absUrl(crumb.href) } : {}),
    })),
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} in Kenya`,
    serviceType: service.title,
    description: service.valueProp || service.blurb,
    url: absUrl(`/services/${service.slug}`),
    provider: { '@id': `${baseUrl}/#organization` },
    areaServed: siteConfig.areaServed,
    ...(service.pricingHint && service.pricingHint !== 'Custom quote'
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'KES',
            price: service.pricingHint.replace(/\D/g, ''),
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };
}

export function serviceListSchema(services) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteConfig.name} services`,
    url: absUrl('/services'),
    itemListElement: services.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: service.title,
      url: absUrl(`/services/${service.slug}`),
      description: service.valueProp || service.blurb,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: stripHtml(faq.answer) },
    })),
  };
}

export function blogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: stripHtml(post.excerpt || ''),
    image: post.image ? absUrl(post.image) : absUrl('/opengraph-image'),
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: baseUrl,
    },
    publisher: { '@id': `${baseUrl}/#organization` },
    mainEntityOfPage: absUrl(`/blog/${post.slug}`),
    ...(post.body ? { articleBody: stripHtml(post.body) } : {}),
  };
}

export function creativeWorkSchema(project) {
  const overview = project.overview || {};
  const keywords = [project.categoryLabel || project.category, ...(overview.techStack || [])]
    .filter(Boolean)
    .join(', ');
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: project.title,
    description: project.outcome || project.solution,
    image: project.image ? absUrl(project.image) : absUrl('/opengraph-image'),
    author: { '@id': `${baseUrl}/#organization` },
    creator: { '@id': `${baseUrl}/#organization` },
    about: project.challenge,
    ...(keywords ? { keywords } : {}),
    mainEntityOfPage: absUrl(`/portfolio/${project.slug}`),
  };
}

export function pricingOffersSchema(plans) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteConfig.name} website packages`,
    url: absUrl('/pricing'),
    itemListElement: plans
      .filter((plan) => typeof plan.price === 'number')
      .map((plan) => ({
        '@type': 'Product',
        name: `${plan.name} Package`,
        description: plan.tagline,
        url: absUrl('/pricing'),
        offers: {
          '@type': 'Offer',
          priceCurrency: siteConfig.currency,
          price: plan.price,
          availability: 'https://schema.org/InStock',
          url: absUrl(`/checkout?plan=${plan.id}`),
        },
      })),
  };
}

export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Marobix Technologies',
    url: absUrl('/about'),
    mainEntity: { '@id': `${baseUrl}/#organization` },
  };
}

export function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Marobix Technologies',
    url: absUrl('/contact'),
    mainEntity: { '@id': `${baseUrl}/#localbusiness` },
  };
}