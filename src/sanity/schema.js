const slugField = {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: { source: 'title' },
  validation: (Rule) => Rule.required(),
};

const sectionBlock = {
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'body', title: 'Body', type: 'text', rows: 5 },
  ],
};

export const settings = {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'email', title: 'Contact email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'whatsapp', title: 'WhatsApp link', type: 'url' },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'stats', title: 'Stats', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'value', type: 'number' }] }] },
  ],
};

export const service = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    slugField,
    { name: 'icon', title: 'Icon', type: 'string', options: { list: ['code', 'shopping-cart', 'store', 'package', 'hard-drive', 'bot', 'cloud', 'headphones', 'globe', 'layers', 'rocket'] } },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'blurb', title: 'Blurb (1 line)', type: 'string' },
    { name: 'valueProp', title: 'Value proposition', type: 'string' },
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 },
    { name: 'included', title: "What's included", type: 'array', of: [{ type: 'string' }] },
    {
      name: 'process',
      title: 'Process',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'description', type: 'text', rows: 2 }] }],
    },
    { name: 'pricingHint', title: 'Pricing hint', type: 'string' },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'answer', type: 'text', rows: 3 }] }],
    },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
  ],
  preview: { select: { title: 'title' } },
};

export const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    slugField,
    { name: 'client', title: 'Client', type: 'string' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['web', 'ecommerce', 'pos', 'ai', 'it-sourcing'] },
    },
    { name: 'categoryLabel', title: 'Category label', type: 'string' },
    { name: 'image', title: 'Cover image', type: 'image', options: { hotspot: true } },
    { name: 'outcome', title: 'One-line outcome', type: 'string' },
    {
      name: 'overview',
      title: 'Overview',
      type: 'object',
      fields: [
        { name: 'client', type: 'string' },
        { name: 'industry', type: 'string' },
        { name: 'timeline', type: 'string' },
        { name: 'techStack', type: 'array', of: [{ type: 'string' }] },
      ],
    },
    { name: 'challenge', title: 'The Challenge', type: 'text', rows: 5 },
    { name: 'solution', title: 'The Solution', type: 'text', rows: 5 },
    { name: 'screenshots', title: 'Screenshots', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'value', type: 'string' }] }],
    },
    { name: 'testimonial', title: 'Testimonial', type: 'text', rows: 3 },
    { name: 'testimonialAuthor', title: 'Testimonial author', type: 'string' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 },
  ],
  preview: { select: { title: 'title' } },
};

export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'type', title: 'Type', type: 'string' },
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 },
  ],
  preview: { select: { title: 'author' } },
};

export const post = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    slugField,
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2 },
    { name: 'image', title: 'Cover image', type: 'image', options: { hotspot: true } },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'readTime', title: 'Read time (minutes)', type: 'number' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
  preview: { select: { title: 'title' } },
};

export const plan = {
  name: 'plan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'id', title: 'ID (slug-like)', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'price', title: 'Price (KES)', type: 'number', description: 'Leave empty for quote-based' },
    { name: 'period', title: 'Period', type: 'string', options: { list: ['one-time', 'monthly', 'yearly', 'quote'] } },
    { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
    { name: 'cta', title: 'CTA label', type: 'string' },
    { name: 'recommended', title: 'Recommended', type: 'boolean' },
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 },
  ],
  preview: { select: { title: 'name' } },
};

export const teamMember = {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 },
  ],
  preview: { select: { title: 'name' } },
};

export const career = {
  name: 'career',
  title: 'Career / Role',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'type', title: 'Type', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'apply', title: 'Apply link', type: 'url' },
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 },
  ],
  preview: { select: { title: 'title' } },
};

export const page = {
  name: 'page',
  title: 'Page (Legal)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    slugField,
    { name: 'lastUpdated', title: 'Last updated', type: 'date' },
    { name: 'intro', title: 'Intro', type: 'text', rows: 3 },
    { name: 'sections', title: 'Sections', type: 'array', of: [sectionBlock] },
  ],
  preview: { select: { title: 'title' } },
};

export const schemaTypes = [
  settings,
  service,
  project,
  testimonial,
  post,
  plan,
  teamMember,
  career,
  page,
  lead,
  order,
];

export const lead = {
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'service', title: 'Service interested in', type: 'string' },
    { name: 'budget', title: 'Budget range', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'source', title: 'Source', type: 'string' },
  ],
};

export const order = {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'orderId', title: 'Order ID', type: 'string' },
    { name: 'planId', title: 'Plan ID', type: 'string' },
    { name: 'planName', title: 'Plan name', type: 'string' },
    { name: 'amount', title: 'Amount (KES)', type: 'number' },
    { name: 'currency', title: 'Currency', type: 'string' },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['pending', 'paid', 'failed', 'cancelled'] } },
    { name: 'method', title: 'Payment method', type: 'string', options: { list: ['mpesa', 'card', 'paypal'] } },
    { name: 'paymentRef', title: 'Payment reference', type: 'string' },
    { name: 'customer', title: 'Customer', type: 'object', fields: [{ name: 'fullName', type: 'string' }, { name: 'email', type: 'string' }, { name: 'phone', type: 'string' }, { name: 'company', type: 'string' }, { name: 'billingAddress', type: 'string' }, { name: 'notes', type: 'string' }] },
  ],
  preview: { select: { title: 'orderId' } },
};
