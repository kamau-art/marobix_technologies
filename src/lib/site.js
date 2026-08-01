export const siteConfig = {
  name: 'Marobix Technologies',
  legalName: 'Marobix Technologies Ltd',
  tagline: 'Web Development, IT Solutions & POS Systems',
  description:
    'Marobix Technologies helps businesses in Kenya and beyond build, launch, and scale their digital presence — from custom websites and ecommerce stores to point-of-sale systems, IT hardware sourcing, and AI-powered tools.',
  url: 'https://marobix.com',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://marobix.com',
  locale: 'en_KE',
  currency: 'KES',
  contact: {
    email: 'hello@marobix.com',
    phone: '+254700000000',
    phoneDisplay: '+254 700 000 000',
    whatsapp: 'https://wa.me/254700000000',
    address: 'Nairobi, Kenya',
  },
  social: {
    facebook: 'https://facebook.com/marobix',
    twitter: 'https://twitter.com/marobix',
    linkedin: 'https://linkedin.com/company/marobix',
    instagram: 'https://instagram.com/marobix',
  },
  trustBadges: ['50+ projects delivered', 'Clients in 10+ countries'],
  stats: [
    { label: 'Years active', value: 6 },
    { label: 'Projects delivered', value: 50 },
    { label: 'Countries served', value: 10 },
    { label: 'Happy clients', value: 40 },
  ],
  valueProps: [
    {
      title: 'End-to-end IT delivery',
      description:
        'We design, build, source, and support — one accountable team across every technology need.',
      icon: 'layers',
    },
    {
      title: 'Built for Kenya, engineered globally',
      description:
        'Local insight with global technical standards for businesses of every size.',
      icon: 'globe',
    },
    {
      title: 'Fast, transparent, and scalable',
      description:
        'Clear timelines, honest pricing, and solutions that grow as your business grows.',
      icon: 'rocket',
    },
    {
      title: 'Reliable support, always on',
      description:
        'Ongoing maintenance and support so your systems keep running smoothly.',
      icon: 'headphones',
    },
  ],
  process: [
    { title: 'Discover', description: 'We learn your business, goals, and constraints.' },
    { title: 'Design', description: 'We design the right solution for your needs.' },
    { title: 'Build', description: 'We build, test, and refine with you in the loop.' },
    { title: 'Launch', description: 'We deploy your solution and go live.' },
    { title: 'Support', description: 'We maintain, monitor, and keep improving.' },
  ],
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Our Work', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const contactBudgets = [
  'Under KES 50,000',
  'KES 50,000 – 150,000',
  'KES 150,000 – 500,000',
  'Over KES 500,000',
];

export const seoDefaults = {
  home: {
    title: 'Marobix Technologies — Web Development, IT Solutions & POS Systems in Kenya',
    description:
      'Custom websites, ecommerce stores, POS systems, IT sourcing, AI integrations, cloud hosting and IT support in Kenya. One team, every tech need.',
  },
  about: {
    title: 'About Us | Marobix Technologies',
    description:
      'Marobix Technologies is a Kenya-based IT and web development company serving clients across the globe with local insight and global standards.',
  },
  services: {
    title: 'IT & Web Development Services | Marobix Technologies',
    description:
      'Explore our services: website development, ecommerce, POS systems, IT sourcing, data backup, AI integrations, cloud & hosting, and IT support.',
  },
  portfolio: {
    title: 'Our Work | Portfolio | Marobix Technologies',
    description:
      'See how Marobix has helped businesses across Kenya and beyond with web, ecommerce, POS, AI, and IT sourcing projects.',
  },
  pricing: {
    title: 'Pricing & Plans | Marobix Technologies',
    description:
      'Transparent pricing for productized web packages. Custom IT sourcing, POS, and AI work is quote-based.',
  },
  checkout: {
    title: 'Checkout | Marobix Technologies',
    description: 'Secure checkout with M-Pesa, card, or PayPal.',
  },
  confirmation: {
    title: 'Order Confirmed | Marobix Technologies',
    description: 'Your order has been confirmed.',
  },
  contact: {
    title: 'Contact Us | Get a Free Quote | Marobix Technologies',
    description:
      'Tell us about your project and get a free quote from Marobix Technologies within 24 hours.',
  },
  blog: {
    title: 'Insights & Blog | Marobix Technologies',
    description:
      'Articles, guides, and insights on web development, IT solutions, POS systems, and business technology.',
  },
  careers: {
    title: 'Careers | Marobix Technologies',
    description:
      'Join the Marobix team — we are always looking for great people to build technology for Kenya and the world.',
  },
  privacy: {
    title: 'Privacy Policy | Marobix Technologies',
    description: 'How Marobix Technologies collects, uses, and protects your data.',
  },
  terms: {
    title: 'Terms of Service | Marobix Technologies',
    description: 'The terms governing your use of Marobix Technologies services and website.',
  },
};
