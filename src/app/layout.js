import { Sora, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import JsonLd from '@/components/JsonLd';
import { siteConfig, seoDefaults } from '@/lib/site';
import { organizationSchema, websiteSchema } from '@/lib/seo';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: seoDefaults.home.title,
    template: '%s',
  },
  description: siteConfig.description,
  keywords: [
    'web development Kenya',
    'IT solutions Kenya',
    'POS systems Kenya',
    'ecommerce development Kenya',
    'M-Pesa integration',
    'website design Nairobi',
    'AI integrations Kenya',
    'IT sourcing Kenya',
    'web design company Nairobi',
    'IT company Nairobi',
    'Marobix Technologies',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: siteConfig.name,
    url: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@marobix',
    title: seoDefaults.home.title,
    description: siteConfig.description,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <a
          href="#main"
          className="sr-only z-[60] bg-accent px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
