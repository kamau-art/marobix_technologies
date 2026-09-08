export const services = [
  {
    slug: 'website-development',
    title: 'Website Development',
    icon: 'code',
    category: 'web',
    blurb: 'Custom, fast-loading, mobile-first websites built to convert visitors into customers.',
    valueProp: 'Custom, fast-loading, mobile-first websites that turn visitors into customers.',
    included: [
      'Custom design tailored to your brand',
      'Mobile-first, responsive build',
      'Search engine optimisation (SEO) basics',
      'Contact & lead capture forms',
      'Google Analytics + Search Console setup',
      'CMS integration so you can edit content',
      'Speed and performance optimisation',
      'Training + 30 days of support',
    ],
    process: [
      { title: 'Discover', description: 'We map your goals, audience, and content needs.' },
      { title: 'Design', description: 'We design a conversion-focused site structure and UI.' },
      { title: 'Build', description: 'We build fast, secure, mobile-first pages.' },
      { title: 'Launch', description: 'We deploy to your domain and configure analytics.' },
      { title: 'Support', description: 'We maintain, monitor, and improve over time.' },
    ],
    pricingHint: 'Starting from KES 35,000',
    faqs: [
      { question: 'How long does a website take?', answer: 'A typical business website is delivered in 2–4 weeks depending on scope and content readiness.' },
      { question: 'Do you include hosting and domain?', answer: 'Yes — we can set up hosting and domain registration as part of the project, and manage it ongoing.' },
      { question: 'Will my website be mobile-friendly?', answer: 'Every site we build is mobile-first and tested across phones, tablets, and desktop.' },
      { question: 'Can I update the website myself?', answer: 'Yes. We integrate a CMS so you can edit text, images, and pages without technical help.' },
    ],
    tags: ['web'],
  },
  {
    slug: 'ecommerce-development',
    title: 'Ecommerce Development',
    icon: 'shopping-cart',
    category: 'ecommerce',
    blurb: 'Full-featured online stores with secure checkout, inventory, and payment integration.',
    valueProp: 'Full-featured online stores with secure checkout, inventory, and payments.',
    included: [
      'Product catalogue with categories & search',
      'M-Pesa, card, and PayPal checkout',
      'Inventory and stock management',
      'Order management dashboard',
      'Secure customer accounts',
      'Shipping & tax configuration',
      'Mobile-optimised storefront',
      'Training + 30 days of support',
    ],
    process: [
      { title: 'Discover', description: 'We review your products, sales process, and audience.' },
      { title: 'Design', description: 'We design a store that makes buying effortless.' },
      { title: 'Build', description: 'We build the store and integrate payments and inventory.' },
      { title: 'Launch', description: 'We test checkout end-to-end and go live.' },
      { title: 'Support', description: 'Ongoing maintenance, updates, and improvements.' },
    ],
    pricingHint: 'Custom quote',
    faqs: [
      { question: 'Which payment methods can my store accept?', answer: 'M-Pesa (Daraja STK push) and PayPal — cards and PayPal accounts for international buyers.' },
      { question: 'Can you migrate my existing store?', answer: 'Yes — we migrate products, customers, and order history from most platforms.' },
      { question: 'Do you handle delivery logistics?', answer: 'We integrate shipping calculators and courier options, and you manage fulfilment from your dashboard.' },
    ],
    tags: ['ecommerce'],
  },
  {
    slug: 'pos-system-development',
    title: 'POS System Development',
    icon: 'store',
    category: 'pos',
    blurb: 'Point-of-sale software tailored to retail, hospitality, and service businesses.',
    valueProp: 'Point-of-sale software tailored to retail, hospitality, and service businesses.',
    included: [
      'Sales & billing interface',
      'Product and category management',
      'M-Pesa, card, and cash payment capture',
      'Receipt printing & digital receipts',
      'Multi-branch support',
      'Inventory tracking & low-stock alerts',
      'Daily sales and profit reports',
      'Offline-first operation',
    ],
    process: [
      { title: 'Discover', description: 'We study your day-to-day sales workflow.' },
      { title: 'Design', description: 'We design screens that match how your team works.' },
      { title: 'Build', description: 'We build and integrate hardware and payments.' },
      { title: 'Launch', description: 'We train your staff and go live branch by branch.' },
      { title: 'Support', description: 'Dedicated support for your operations.' },
    ],
    pricingHint: 'Custom quote',
    faqs: [
      { question: 'Does the POS work offline?', answer: 'Yes — sales continue offline and sync automatically when connectivity returns.' },
      { question: 'Can it run across multiple branches?', answer: 'Yes. Our POS supports multi-branch with centralised reporting.' },
      { question: 'Which payment methods are supported?', answer: 'M-Pesa, card, and cash, all reconciled in one daily report.' },
    ],
    tags: ['pos'],
  },
  {
    slug: 'it-sourcing-procurement',
    title: 'IT Sourcing & Procurement',
    icon: 'package',
    category: 'it-sourcing',
    blurb: 'We source, vet, and deliver the right hardware and software for your business needs.',
    valueProp: 'We source, vet, and deliver the right hardware and software for your business.',
    included: [
      'Hardware sourcing (laptops, servers, networking)',
      'Software licensing & subscriptions',
      'Vendor vetting and price negotiation',
      'Delivery, setup, and asset tagging',
      'Warranty and support coordination',
      'Procurement status tracking',
    ],
    process: [
      { title: 'Requirements', description: 'We define your technical and budget needs.' },
      { title: 'Source', description: 'We quote vetted suppliers with warranty.' },
      { title: 'Deliver', description: 'We deliver, install, and configure on site.' },
      { title: 'Support', description: 'We manage warranties and replacements.' },
    ],
    pricingHint: 'Custom quote',
    faqs: [
      { question: 'Do you supply genuine hardware with warranty?', answer: 'Yes — all hardware is sourced from authorised vendors with full warranty.' },
      { question: 'Can you manage bulk orders?', answer: 'Yes, including multi-site delivery and asset tracking.' },
    ],
    tags: ['it-sourcing'],
  },
  {
    slug: 'data-backup-recovery',
    title: 'Data Backup & Recovery',
    icon: 'hard-drive',
    category: 'web',
    blurb: 'Automated, secure backup solutions so your business data is never at risk.',
    valueProp: 'Automated, secure backup solutions so your business data is never at risk.',
    included: [
      'Automated scheduled backups',
      'Off-site encrypted storage',
      'Point-in-time restore',
      'Backup monitoring dashboard',
      'Disaster recovery runbook',
      'Testing and verification of restores',
    ],
    process: [
      { title: 'Audit', description: 'We map your critical data and systems.' },
      { title: 'Configure', description: 'We set up automated, encrypted backups.' },
      { title: 'Monitor', description: 'We monitor and alert on every backup run.' },
      { title: 'Recover', description: 'We test restores and support you in a crisis.' },
    ],
    pricingHint: 'Custom quote',
    faqs: [
      { question: 'What data should I back up?', answer: 'At minimum: financial records, customer data, documents, and any business-critical databases.' },
      { question: 'How fast can I restore?', answer: 'Point-in-time restores typically complete within hours depending on volume.' },
    ],
    tags: ['web'],
  },
  {
    slug: 'ai-integrations',
    title: 'AI Integrations',
    icon: 'bot',
    category: 'ai',
    blurb: 'Chatbots, automation, and AI-powered tools built into your existing systems.',
    valueProp: 'Chatbots, automation, and AI-powered tools built into your existing systems.',
    included: [
      'Customer support chatbots',
      'Document and data automation',
      'Content generation workflows',
      'AI search and recommendations',
      'Integration with your existing tools',
      'Usage monitoring and tuning',
    ],
    process: [
      { title: 'Discover', description: 'We identify high-value AI opportunities.' },
      { title: 'Prototype', description: 'We build a working prototype fast.' },
      { title: 'Build', description: 'We productionise with security and guardrails.' },
      { title: 'Launch & tune', description: 'We launch and continuously improve accuracy.' },
    ],
    pricingHint: 'Custom quote',
    faqs: [
      { question: 'Which AI providers do you use?', answer: 'OpenAI, Anthropic, and open-source models — we choose based on cost, privacy, and accuracy.' },
      { question: 'Is my data used to train models?', answer: 'No. We configure privacy-safe integrations; your data stays yours.' },
    ],
    tags: ['ai'],
  },
  {
    slug: 'cloud-hosting-setup',
    title: 'Cloud & Hosting Setup',
    icon: 'cloud',
    category: 'web',
    blurb: 'Reliable hosting, domain, and cloud infrastructure setup and management.',
    valueProp: 'Reliable hosting, domain, and cloud infrastructure setup and management.',
    included: [
      'Domain registration & DNS management',
      'Reliable hosting setup (shared to cloud)',
      'SSL certificates & HTTPS',
      'Email setup (Google Workspace etc.)',
      'Cloud server configuration',
      'Performance & uptime monitoring',
      'Monthly maintenance & updates',
    ],
    process: [
      { title: 'Assess', description: 'We review your traffic and performance needs.' },
      { title: 'Set up', description: 'We configure hosting, DNS, SSL, and email.' },
      { title: 'Monitor', description: 'We monitor uptime and performance 24/7.' },
      { title: 'Maintain', description: 'Regular updates, backups, and hardening.' },
    ],
    pricingHint: 'Custom quote',
    faqs: [
      { question: 'Can you migrate my existing hosting?', answer: 'Yes — we migrate with minimal downtime and test everything after.' },
      { question: 'What happens if my site goes down?', answer: 'Our monitoring alerts us immediately and we respond within our support SLA.' },
    ],
    tags: ['web'],
  },
  {
    slug: 'it-support-maintenance',
    title: 'IT Support & Maintenance',
    icon: 'headphones',
    category: 'web',
    blurb: 'Ongoing technical support to keep your systems running smoothly.',
    valueProp: 'Ongoing technical support to keep your systems running smoothly.',
    included: [
      'Helpdesk with fast response times',
      'System health monitoring',
      'Software updates & patching',
      'Website & app maintenance',
      'User onboarding & training',
      'Monthly performance reviews',
      'Priority incident response',
    ],
    process: [
      { title: 'Onboard', description: 'We document your systems and agree SLAs.' },
      { title: 'Monitor', description: 'We watch your systems around the clock.' },
      { title: 'Respond', description: 'We resolve incidents within your SLA.' },
      { title: 'Improve', description: 'Monthly reviews keep everything optimised.' },
    ],
    pricingHint: 'Custom quote',
    faqs: [
      { question: 'What response times do you offer?', answer: 'Typical SLAs range from same-day for standard issues to 2-hour response for critical ones.' },
      { question: 'Do you support staff one-on-one?', answer: 'Yes — remote and on-site user support and training are included.' },
    ],
    tags: ['web'],
  },
];

export const projects = [
  {
    slug: 'akmovie-search-app',
    title: 'AK Movie Search App',
    client: 'AK Movie',
    category: 'web',
    categoryLabel: 'Web',
    image: '/images/akmovie.png',
    outcome: 'Search any movie, view details, and save favorites in one place.',
    overview: {
      client: 'AK Movie',
      industry: 'Entertainment / Media',
      timeline: '4 weeks',
      techStack: ['Python', 'Flask', 'Flask-Login', 'TMDb API'],
    },
    challenge:
      'Movie fans are overwhelmed by the sheer volume of titles available. There was no quick way to search a film, see its details, and save favorites — most people bounced between sites or lost recommendations in chat apps.',
    solution:
      'We built AK Movie Search App, a responsive web app powered by the TMDb API. Users can search movies, view rich details, and save favorites to a personal account secured with Flask-Login authentication — one convenient place to discover and track films.',
    screenshots: ['/images/akmovie.png', '/images/akmovie.png', '/images/akmovie.png'],
    results: [
      { label: 'Movie catalogue', value: 'Full TMDb API' },
      { label: 'Favorites saved', value: 'Per account' },
      { label: 'Experience', value: 'Responsive' },
    ],
    testimonial: null,
    testimonialAuthor: null,
  },
  {
    slug: 'decree-ltd-website',
    title: 'Decree Ltd — Water, Power & Tank Solutions',
    client: 'Decree Ltd',
    category: 'web',
    categoryLabel: 'Web',
    image: '/images/decree.png',
    outcome: 'Marketing site plus admin panel for a five-service engineering company.',
    overview: {
      client: 'Decree Ltd',
      industry: 'Engineering / Infrastructure',
      timeline: '2 months',
      techStack: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'NextAuth.js'],
    },
    challenge:
      'Decree Ltd offers water drilling, power installation, tank construction, solar pumps, and piping services — but had no online presence to explain those services or capture enquiries, and no way for the team to update their own content.',
    solution:
      'We built a modern marketing site covering every service with its own detail page, company story, portfolio gallery, certifications, and partnerships. A protected admin panel (NextAuth credentials + JWT) lets the team manage services, testimonials, portfolio entries, certifications, partners, and contact messages without touching code.',
    screenshots: ['/images/decree.png', '/images/decree.png', '/images/decree.png'],
    results: [
      { label: 'Service pages', value: '5' },
      { label: 'Admin CMS', value: 'Full CRUD' },
      { label: 'Contact flow', value: 'Captured' },
    ],
    testimonial: null,
    testimonialAuthor: null,
  },
];

export const testimonials = [
  {
    quote:
      'Marobix delivered our new site and POS integration ahead of schedule — our checkout process has never been smoother.',
    author: 'Retail Client',
    role: 'Operations Director',
    type: 'retail',
  },
  {
    quote:
      'They understood exactly what we needed and handled everything from hosting to payments. Genuinely reliable team.',
    author: 'Ecommerce Client',
    role: 'Founder',
    type: 'ecommerce',
  },
  {
    quote:
      'Working with a Kenya-based team that thinks globally was exactly what our business needed.',
    author: 'International Client',
    role: 'Business Owner',
    type: 'international',
  },
];

export const posts = [
  {
    slug: 'choosing-a-tech-partner-in-kenya',
    title: 'How to Choose a Technology Partner in Kenya',
    category: 'Insights',
    excerpt:
      'From websites to POS systems, picking the right technology partner can make or break your project. Here is a practical checklist.',
    image: '/images/blog-tech-partner.jpg',
    date: '2026-06-12',
    author: 'Marobix Team',
    readTime: 6,
    body:
      '<p>Choosing a technology partner is one of the most important decisions a growing business can make. The right partner accelerates your growth; the wrong one wastes time and money.</p><h2>1. Look for proof, not promises</h2><p>Ask for case studies, client references, and live examples of work that resembles your project. A partner who has done this before will show you, not just tell you.</p><h2>2. Check they understand local reality</h2><p>In Kenya, that means M-Pesa integration, mobile-first browsing, and reliability during connectivity hiccups. Global standards matter — but local context matters more.</p><h2>3. Demand transparent pricing</h2><p>Clear scopes, clear timelines, and honest pricing. Avoid partners who disappear once the invoice is paid.</p><h2>4. Consider the full lifecycle</h2><p>Websites need maintenance, POS systems need support, data needs backups. Choose a partner who will be there after launch.</p><p>Marobix combines local insight with global technical standards — and we would love to talk about your next project.</p>',
  },
  {
    slug: 'why-your-business-needs-a-pos-system',
    title: 'Why Your Business Needs a POS System (Not Just a Cash Register)',
    category: 'POS',
    excerpt:
      'A modern POS does far more than take payments. Here is how retail and hospitality businesses in Kenya win with the right system.',
    image: '/images/blog-pos.jpg',
    date: '2026-05-28',
    author: 'Marobix Team',
    readTime: 5,
    body:
      '<p>If your business still runs on a cash register and a spreadsheet, you are losing money every day. Here is what a modern POS gives you.</p><h2>Real-time stock control</h2><p>Know exactly what you have, what is moving, and what needs reordering — across every branch.</p><h2>Faster, error-free checkout</h2><p>M-Pesa and card payments captured automatically, with digital receipts and automatic reconciliation.</p><h2>Reports that run your business</h2><p>Daily sales, top products, busy hours, and staff performance — available at a glance.</p><h2>Multi-branch visibility</h2><p>Own more than one outlet? See everything in one dashboard and keep stock in sync.</p><p>Our custom POS systems are tailored to retail, hospitality, and service businesses — and built to work offline.</p>',
  },
  {
    slug: 'mpesa-checkout-guide',
    title: 'M-Pesa Checkout: A Practical Guide for Online Stores',
    category: 'Ecommerce',
    excerpt:
      'M-Pesa is the payment method Kenyan shoppers prefer. Here is what you need to know to integrate it into your online store safely.',
    image: '/images/blog-mpesa.jpg',
    date: '2026-04-15',
    author: 'Marobix Team',
    readTime: 7,
    body:
      '<p>For Kenyan ecommerce, M-Pesa is not an optional extra — it is table stakes. Here is what a solid integration looks like.</p><h2>STK push is the gold standard</h2><p>Customers enter their phone number and approve the payment on their phone. No typing card details, no redirects.</p><h2>Verify callbacks, never trust the client</h2><p>Your backend must verify payment status with Safaricom before confirming an order. Never confirm based on what the browser tells you.</p><h2>Handle the failure gracefully</h2><p>Some STK pushes get declined or time out. Build a retry flow and clear messaging so customers finish checkout, not abandon it.</p><h2>Reconcile daily</h2><p>Match your order system against your M-Pesa statements so nothing slips through the cracks.</p><p>We build M-Pesa checkout into every store we ship — and we can help you add it to your existing one.</p>',
  },
];

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For new businesses that need a credible online presence.',
    price: 35000,
    period: 'one-time',
    features: [
      'Up to 5 pages',
      'Mobile-first design',
      'Contact & lead form',
      'Basic SEO setup',
      'SSL + secure hosting setup',
      '14 days post-launch support',
    ],
    cta: 'Get Started',
    recommended: false,
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For growing businesses that want to convert and scale.',
    price: 65000,
    period: 'one-time',
    features: [
      'Up to 12 pages',
      'Premium custom design',
      'CMS so you can edit content',
      'On-page SEO + analytics',
      'Blog or news section',
      'Lead capture + WhatsApp integration',
      '30 days post-launch support',
    ],
    cta: 'Start Your Project',
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Custom',
    tagline: 'Ecommerce, POS, AI, and complex builds — quote-based.',
    price: null,
    period: 'quote',
    features: [
      'Ecommerce stores',
      'POS system development',
      'AI integrations',
      'IT sourcing & procurement',
      'Dedicated project team',
      'Ongoing maintenance & SLAs',
    ],
    cta: 'Get a Quote',
    recommended: false,
  },
];

export const pricingFaqs = [
  {
    question: 'What is included in the one-time price?',
    answer:
      'Design, build, and launch of your website, plus the support window listed on each plan. Hosting and domains are billed separately and managed by us if you choose.',
  },
  {
    question: 'Why are ecommerce and POS quote-based?',
    answer:
      'Ecommerce stores, POS systems, and AI work vary widely in scope. We price these per project after understanding your requirements, so you only pay for what you need.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes. For larger projects we can split payments — commonly 50% deposit and 50% on delivery. M-Pesa, card, and bank transfer are accepted.',
  },
  {
    question: 'Can I upgrade plans later?',
    answer:
      'Absolutely. You can start with a Starter site and upgrade to Business features at any time.',
  },
];

export const careers = [
  {
    title: 'Full-Stack Developer',
    type: 'Full-time',
    location: 'Nairobi (hybrid)',
    apply: 'mailto:careers@marobix.com?subject=Full-Stack Developer Application',
  },
  {
    title: 'UI/UX Designer',
    type: 'Full-time',
    location: 'Nairobi (hybrid)',
    apply: 'mailto:careers@marobix.com?subject=UI/UX Designer Application',
  },
  {
    title: 'Client Success Manager',
    type: 'Full-time',
    location: 'Nairobi',
    apply: 'mailto:careers@marobix.com?subject=Client Success Manager Application',
  },
];

export const teamMembers = [
  {
    name: 'Marobix Co-founder',
    role: 'Co-founder & CEO',
    image: '/images/team-ceo.jpg',
  },
  {
    name: 'Marobix Co-founder',
    role: 'Co-founder & CTO',
    image: '/images/team-cto.jpg',
  },
  {
    name: 'Delivery Lead',
    role: 'Head of Delivery',
    image: '/images/team-hod.jpg',
  },
];

export const legalPages = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: '2026-01-01',
    intro:
      'This Privacy Policy explains how Marobix Technologies ("we", "us") collects, uses, and protects your personal data in accordance with the Kenya Data Protection Act 2019 and applicable laws.',
    sections: [
      {
        heading: 'Who we are (data controller)',
        body: 'Marobix Technologies is the data controller. Contact us at contact@marobix.com for any data protection requests.',
      },
      {
        heading: 'What data we collect',
        body: 'We collect information you give us through our contact and quote forms (name, email, phone, company, message), and payment data needed to process your order via our payment providers (PayPal and M-Pesa).',
      },
      {
        heading: 'Third-party processors',
        body: 'Payment data is processed by PayPal and Safaricom (M-Pesa) under their own privacy policies. We do not store full card numbers.',
      },
      {
        heading: 'How we use your data',
        body: 'We use your data to respond to enquiries, prepare quotes, deliver and support our services, process orders, and send occasional marketing updates you have opted into.',
      },
      {
        heading: 'Your rights',
        body: 'You have the right to access, correct, or delete your personal data, and to object to or restrict processing. Email contact@marobix.com to exercise these rights.',
      },
      {
        heading: 'Cookies',
        body: 'We use essential cookies to operate the site and consent-based analytics cookies. You can manage preferences via our cookie banner.',
      },
      {
        heading: 'Data retention',
        body: 'We retain personal data only as long as necessary for the purposes described, or as required by law.',
      },
      {
        heading: 'Contact for data requests',
        body: 'Email contact@marobix.com or write to Marobix Technologies, Nairobi Town Centre, Kenya.',
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    lastUpdated: '2026-01-01',
    intro:
      'These Terms of Service ("Terms") govern your use of the Marobix Technologies website and services. By using our site or services, you agree to these Terms.',
    sections: [
      {
        heading: 'Services',
        body: 'Marobix provides web development, ecommerce, POS systems, IT sourcing, data backup, AI integrations, cloud hosting, and IT support services as described on our site and in your project agreement.',
      },
      {
        heading: 'Quotes and pricing',
        body: 'Productized pricing is published on our pricing page. Custom work is quoted per project. All prices are in Kenyan Shillings (KES) unless stated otherwise.',
      },
      {
        heading: 'Payments',
        body: 'Payments are due as agreed in your quote or plan. Deposits are non-refundable once work has begun. Payment failures may pause delivery.',
      },
      {
        heading: 'Client responsibilities',
        body: 'You agree to provide timely feedback, content, and access required for delivery, and to use our services in compliance with applicable law.',
      },
      {
        heading: 'Intellectual property',
        body: 'Upon full payment, you own the final deliverables. We retain the right to reuse generic components and to showcase the work in our portfolio unless agreed otherwise.',
      },
      {
        heading: 'Limitation of liability',
        body: 'To the maximum extent permitted by law, Marobix is not liable for indirect or consequential damages arising from our services.',
      },
      {
        heading: 'Governing law',
        body: 'These Terms are governed by the laws of the Republic of Kenya.',
      },
      {
        heading: 'Contact',
        body: 'Questions about these Terms? Email contact@marobix.com.',
      },
    ],
  },
};
