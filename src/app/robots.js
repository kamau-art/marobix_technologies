import { siteConfig } from '@/lib/site';

export default function robots() {
  const baseUrl = siteConfig.baseUrl.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/checkout/', '/checkout/confirmation/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
