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
  foundingDate: '2020',
  logo: '/images/logo5-mobius-m.svg',
  areaServed: ['KE', 'East Africa', 'Africa', 'Global'],
  address: {
    streetAddress: 'Nairobi Town Centre',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    postalCode: '00100',
    addressCountry: 'KE',
  },
  geo: { latitude: -1.2833, longitude: 36.8167 },
  openingHours: [
    { days: 'Monday-Friday', opens: '08:00', closes: '17:00' },
    { days: 'Saturday', opens: '09:00', closes: '13:00' },
  ],
  priceRange: 'KES 35,000 - KES 500,000+',
  contact: {
    email: 'contact@marobix.com',
    phones: [
      { phone: '+254758302664', display: '+254 758 302 664', whatsapp: 'https://wa.me/254758302664' },
      { phone: '+254740334858', display: '+254 740 334 858', whatsapp: 'https://wa.me/254740334858' },
    ],
    phone: '+254790034811',
    phoneDisplay: '+254 790 034 811',
    whatsapp: 'https://wa.me/254758302664',
    address: 'Nairobi Town Centre, Kenya',
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
    title: 'Web Development, IT Solutions & POS Systems in Kenya | Marobix',
    description:
      'Marobix Technologies — Kenya web development, ecommerce, POS systems, M-Pesa integrations, IT sourcing & IT support. One team, every tech need.',
  },
  about: {
    title: 'About Marobix | Web & IT Company in Nairobi, Kenya',
    description:
      'Marobix Technologies is a Nairobi-based web development and IT company serving businesses across Kenya, Africa, and the world with global technical standards.',
  },
  services: {
    title: 'IT & Web Development Services in Kenya | Marobix',
    description:
      'Website development, ecommerce, POS systems, IT sourcing, cloud hosting, M-Pesa integrations and IT support in Kenya — delivered end-to-end by one team.',
  },
  portfolio: {
    title: 'Portfolio & Case Studies | Web, Ecommerce & POS in Kenya | Marobix',
    description:
      'Real Marobix projects: websites, online stores, POS systems and AI tools built for businesses across Kenya and beyond.',
  },
  pricing: {
    title: 'Website Packages & Pricing in Kenya | Marobix',
    description:
      'Transparent one-time website pricing in Kenya — Starter KES 35,000, Business KES 65,000. Custom quotes for ecommerce, POS systems and AI integrations.',
  },
  checkout: {
    title: 'Checkout | Marobix Technologies',
    description: 'Secure checkout with M-Pesa (Kenya) or PayPal (international).',
  },
  confirmation: {
    title: 'Order Confirmed | Marobix Technologies',
    description: 'Your order has been confirmed.',
  },
  contact: {
    title: 'Contact Marobix | Free Web Development Quote in Kenya',
    description:
      'Tell us about your project and get a free quote from Marobix Technologies, Nairobi, within 24 hours. Call, WhatsApp, or email us.',
  },
  blog: {
    title: 'Blog: Web, Ecommerce & POS Insights | Marobix Kenya',
    description:
      'Practical articles and guides on web development, ecommerce, POS systems, M-Pesa and business technology in Kenya.',
  },
  careers: {
    title: 'Careers at Marobix | Developer, Design & Client Roles in Kenya',
    description:
      'Join the Marobix team in Nairobi — full-stack developers, UI/UX designers and client champions building technology for Kenya and the world.',
  },
  privacy: {
    title: 'Privacy Policy | Marobix Technologies',
    description: 'How Marobix Technologies collects, uses, and protects your data in line with the Kenya Data Protection Act 2019.',
  },
  terms: {
    title: 'Terms of Service | Marobix Technologies',
    description: 'The terms governing your use of Marobix Technologies services and website.',
  },
};
