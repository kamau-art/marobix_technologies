import { siteConfig } from '@/lib/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/'],
    },
    sitemap: `${siteConfig.baseUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}
