// -----------------------------------------------------------------------------
// Mock data for the ATELIER MONO storefront (UI phase only — no backend).
// Architecture is DESIGN-LED: a Design exists independently and is expressed
// across many product types. Products reference the design they belong to.
// -----------------------------------------------------------------------------

export type ProductType = {
  slug: string
  name: string
  group: 'Apparel' | 'Accessories' | 'Home & Lifestyle'
}

export const PRODUCT_TYPES: ProductType[] = [
  { slug: 't-shirts', name: 'T-Shirts', group: 'Apparel' },
  { slug: 'hoodies', name: 'Hoodies', group: 'Apparel' },
  { slug: 'sweatshirts', name: 'Sweatshirts', group: 'Apparel' },
  { slug: 'kids-t-shirts', name: 'Kids T-Shirts', group: 'Apparel' },
  { slug: 'baby-onesies', name: 'Baby Onesies', group: 'Apparel' },
  { slug: 'tote-bags', name: 'Tote Bags', group: 'Accessories' },
  { slug: 'caps', name: 'Caps', group: 'Accessories' },
  { slug: 'phone-cases', name: 'Phone Cases', group: 'Accessories' },
  { slug: 'mugs', name: 'Mugs', group: 'Home & Lifestyle' },
  { slug: 'posters', name: 'Posters / Wall Art', group: 'Home & Lifestyle' },
  { slug: 'cushions', name: 'Cushions', group: 'Home & Lifestyle' },
  { slug: 'notebooks', name: 'Notebooks', group: 'Home & Lifestyle' },
  { slug: 'stickers', name: 'Stickers', group: 'Home & Lifestyle' },
]

export type Badge = 'New' | 'Bestseller' | 'Limited' | 'Sale'

export type Product = {
  id: string
  title: string // e.g. "Midnight Lion Tee"
  designName: string // e.g. "Midnight Lion"
  designSlug: string
  productType: string // display, e.g. "T-Shirt"
  price: number
  compareAt?: number
  image: string
  hoverImage?: string
  colors: string[] // hex swatches
  badge?: Badge
  rating: number
  reviews: number
}

export type Design = {
  slug: string
  name: string
  tagline: string
  image: string // the standalone art / lead product
  productCount: number
  availableOn: string[] // product type display names
  swatch: string[]
}

// ---- Designs -----------------------------------------------------------------

export const DESIGNS: Design[] = [
  {
    slug: 'midnight-lion',
    name: 'Midnight Lion',
    tagline: 'Geometric line-art strength.',
    image: '/images/design-lion-art.png',
    productCount: 13,
    availableOn: ['T-Shirt', 'Hoodie', 'Tote', 'Mug', 'Phone Case'],
    swatch: ['#0a0a0a', '#c7a24c', '#e8e4dc'],
  },
  {
    slug: 'nordic-lines',
    name: 'Nordic Lines',
    tagline: 'A single continuous horizon.',
    image: '/images/nordic-tee.png',
    productCount: 11,
    availableOn: ['T-Shirt', 'Sweatshirt', 'Poster', 'Tote'],
    swatch: ['#e8e4dc', '#0a0a0a', '#9a9488'],
  },
  {
    slug: 'solar-horizon',
    name: 'Solar Horizon',
    tagline: 'Golden hour, distilled.',
    image: '/images/solar-sweatshirt.png',
    productCount: 9,
    availableOn: ['Sweatshirt', 'T-Shirt', 'Mug', 'Cushion'],
    swatch: ['#d8c7a2', '#c7a24c', '#0a0a0a'],
  },
  {
    slug: 'monogram-mark',
    name: 'Monogram Mark',
    tagline: 'The house signature.',
    image: '/images/lion-cap.png',
    productCount: 8,
    availableOn: ['Cap', 'Hoodie', 'Tote', 'Notebook'],
    swatch: ['#0a0a0a', '#c7a24c'],
  },
]

// ---- Midnight Lion across product types (signature "one design" section) -----

export const LION_EXPRESSIONS = [
  { type: 'T-Shirt', image: '/images/lion-tee.png', price: 29.99 },
  { type: 'Hoodie', image: '/images/lion-hoodie.png', price: 64.99 },
  { type: 'Tote Bag', image: '/images/lion-tote.png', price: 24.99 },
  { type: 'Mug', image: '/images/lion-mug.png', price: 18.99 },
  { type: 'Phone Case', image: '/images/lion-phonecase.png', price: 22.99 },
  { type: 'Poster', image: '/images/lion-poster.png', price: 34.99 },
  { type: 'Cap', image: '/images/lion-cap.png', price: 27.99 },
  { type: 'Cushion', image: '/images/lion-cushion.png', price: 32.99 },
]

// ---- Products ----------------------------------------------------------------

export const NEW_DROPS: Product[] = [
  {
    id: 'ml-tee',
    title: 'Midnight Lion Tee',
    designName: 'Midnight Lion',
    designSlug: 'midnight-lion',
    productType: 'T-Shirt',
    price: 29.99,
    image: '/images/lion-tee.png',
    hoverImage: '/images/lion-hoodie.png',
    colors: ['#0a0a0a', '#e8e4dc', '#3a3a3a'],
    badge: 'New',
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 'nl-tee',
    title: 'Nordic Lines Tee',
    designName: 'Nordic Lines',
    designSlug: 'nordic-lines',
    productType: 'T-Shirt',
    price: 29.99,
    image: '/images/nordic-tee.png',
    colors: ['#e8e4dc', '#0a0a0a'],
    badge: 'New',
    rating: 4.8,
    reviews: 64,
  },
  {
    id: 'sh-sweat',
    title: 'Solar Horizon Sweatshirt',
    designName: 'Solar Horizon',
    designSlug: 'solar-horizon',
    productType: 'Sweatshirt',
    price: 54.99,
    compareAt: 64.99,
    image: '/images/solar-sweatshirt.png',
    colors: ['#d8c7a2', '#0a0a0a'],
    badge: 'Sale',
    rating: 4.7,
    reviews: 41,
  },
  {
    id: 'ml-tote',
    title: 'Midnight Lion Tote',
    designName: 'Midnight Lion',
    designSlug: 'midnight-lion',
    productType: 'Tote Bag',
    price: 24.99,
    image: '/images/lion-tote.png',
    colors: ['#e8e4dc', '#0a0a0a'],
    badge: 'Limited',
    rating: 4.9,
    reviews: 87,
  },
]

export const BEST_SELLERS: Product[] = [
  {
    id: 'ml-hoodie',
    title: 'Midnight Lion Hoodie',
    designName: 'Midnight Lion',
    designSlug: 'midnight-lion',
    productType: 'Hoodie',
    price: 64.99,
    image: '/images/lion-hoodie.png',
    hoverImage: '/images/lion-tee.png',
    colors: ['#0a0a0a', '#3a3a3a', '#e8e4dc'],
    badge: 'Bestseller',
    rating: 5.0,
    reviews: 312,
  },
  {
    id: 'ml-mug',
    title: 'Midnight Lion Mug',
    designName: 'Midnight Lion',
    designSlug: 'midnight-lion',
    productType: 'Mug',
    price: 18.99,
    image: '/images/lion-mug.png',
    colors: ['#0a0a0a'],
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 203,
  },
  {
    id: 'ml-poster',
    title: 'Midnight Lion Wall Art',
    designName: 'Midnight Lion',
    designSlug: 'midnight-lion',
    productType: 'Poster',
    price: 34.99,
    image: '/images/lion-poster.png',
    colors: ['#0a0a0a', '#c7a24c'],
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 'ml-case',
    title: 'Midnight Lion Case',
    designName: 'Midnight Lion',
    designSlug: 'midnight-lion',
    productType: 'Phone Case',
    price: 22.99,
    image: '/images/lion-phonecase.png',
    colors: ['#0a0a0a'],
    badge: 'Bestseller',
    rating: 4.7,
    reviews: 98,
  },
]

// ---- Editorial: shop by product ----------------------------------------------

export const SHOP_BY_PRODUCT = [
  { name: 'T-Shirts', image: '/images/lion-tee.png', slug: 't-shirts' },
  { name: 'Hoodies', image: '/images/lion-hoodie.png', slug: 'hoodies' },
  { name: 'Sweatshirts', image: '/images/solar-sweatshirt.png', slug: 'sweatshirts' },
  { name: 'Tote Bags', image: '/images/lion-tote.png', slug: 'tote-bags' },
  { name: 'Mugs', image: '/images/lion-mug.png', slug: 'mugs' },
  { name: 'Phone Cases', image: '/images/lion-phonecase.png', slug: 'phone-cases' },
  { name: 'Caps', image: '/images/lion-cap.png', slug: 'caps' },
  { name: 'Posters', image: '/images/lion-poster.png', slug: 'posters' },
  { name: 'Cushions', image: '/images/lion-cushion.png', slug: 'cushions' },
]

// ---- Blog --------------------------------------------------------------------

export const ARTICLES = [
  {
    slug: 'style-minimal-graphic-tee',
    category: 'Style',
    title: 'How to Style a Minimal Graphic T-Shirt',
    excerpt:
      'Three quiet ways to build an outfit around a single considered graphic — without shouting.',
    image: '/images/blog-style.png',
    date: 'May 14, 2025',
  },
  {
    slug: 'story-behind-midnight-lion',
    category: 'Design',
    title: 'The Story Behind Midnight Lion',
    excerpt:
      'From a single continuous line to a house signature — the making of our most-loved design.',
    image: '/images/blog-design.png',
    date: 'May 02, 2025',
  },
  {
    slug: 'choose-the-right-hoodie-fit',
    category: 'Guides',
    title: 'How to Choose the Right Hoodie Fit',
    excerpt:
      'Boxy, regular or relaxed — a short guide to finding the weight and drape that suits you.',
    image: '/images/blog-guide.png',
    date: 'Apr 21, 2025',
  },
]

// ---- Reviews -----------------------------------------------------------------

export const REVIEWS = [
  {
    name: 'Elin S.',
    region: 'Stockholm, SE',
    text: 'Beautiful print and the design looks exactly like the preview. The fabric weight feels genuinely premium.',
  },
  {
    name: 'Julien M.',
    region: 'Lyon, FR',
    text: 'Ordered the hoodie and a matching mug of the same design. Loved that one idea could live across both.',
  },
  {
    name: 'Aisha R.',
    region: 'Riyadh, SA',
    text: 'Arrived well-packaged and faster than I expected internationally. The line-art detail is razor sharp.',
  },
  {
    name: 'Daniel K.',
    region: 'Toronto, CA',
    text: 'Understated, considered and well made. It finally feels like a design brand rather than a print shop.',
  },
]

// ---- International controls ---------------------------------------------------

export const REGIONS = [
  { flag: '🇪🇺', label: 'Europe', currency: 'EUR', symbol: '€' },
  { flag: '🇬🇧', label: 'United Kingdom', currency: 'GBP', symbol: '£' },
  { flag: '🇨🇭', label: 'Switzerland', currency: 'CHF', symbol: 'CHF' },
  { flag: '🇳🇴', label: 'Norway', currency: 'NOK', symbol: 'kr' },
  { flag: '🇺🇸', label: 'United States', currency: 'USD', symbol: '$' },
  { flag: '🇨🇦', label: 'Canada', currency: 'CAD', symbol: '$' },
  { flag: '🇸🇦', label: 'Saudi Arabia', currency: 'SAR', symbol: '﷼' },
  { flag: '🇧🇩', label: 'Bangladesh', currency: 'BDT', symbol: '৳' },
]

export const LANGUAGES = ['English', 'Deutsch', 'Français', 'العربية', 'Norsk']

// ---- Navigation config -------------------------------------------------------

export const COLLECTIONS = [
  'New Collection',
  'Summer',
  'Minimal',
  'Streetwear',
  'Art',
  'Quotes',
  'Gift',
  'Seasonal',
]

export const POPULAR_SEARCHES = [
  'T-Shirt',
  'Hoodie',
  'Minimal',
  'Lion',
  'Streetwear',
  'Gift',
]

// ---- Aggregated catalog + helpers -------------------------------------------

export const ALL_PRODUCTS: Product[] = [...NEW_DROPS, ...BEST_SELLERS]

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id)
}

export function getDesignBySlug(slug: string): Design | undefined {
  return DESIGNS.find((d) => d.slug === slug)
}

export function productsByDesign(slug: string): Product[] {
  return ALL_PRODUCTS.filter((p) => p.designSlug === slug)
}

export function productTypeBySlug(slug: string): ProductType | undefined {
  return PRODUCT_TYPES.find((p) => p.slug === slug)
}

// A design expressed across many product types (used on design detail +
// product detail "switch product" UX). Falls back to the Lion expression set.
export type Expression = { type: string; slug: string; image: string; price: number }

const TYPE_SLUG: Record<string, string> = {
  'T-Shirt': 't-shirts',
  Hoodie: 'hoodies',
  Sweatshirt: 'sweatshirts',
  'Tote Bag': 'tote-bags',
  Tote: 'tote-bags',
  Mug: 'mugs',
  'Phone Case': 'phone-cases',
  Cap: 'caps',
  Poster: 'posters',
  Cushion: 'cushions',
  'Kids T-Shirt': 'kids-t-shirts',
  'Baby Onesie': 'baby-onesies',
  Notebook: 'notebooks',
  Sticker: 'stickers',
}

export function expressionsForDesign(slug: string): Expression[] {
  return LION_EXPRESSIONS.map((e) => ({
    type: e.type,
    slug: TYPE_SLUG[e.type] ?? 't-shirts',
    image: e.image,
    price: e.price,
  }))
}

// ---- Sizes & product options -------------------------------------------------

export const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export const ONE_SIZE = ['One size']

export function sizesForType(displayType: string): string[] {
  const apparel = [
    'T-Shirt',
    'Hoodie',
    'Sweatshirt',
    'Kids T-Shirt',
    'Baby Onesie',
  ]
  return apparel.includes(displayType) ? APPAREL_SIZES : ONE_SIZE
}

// ---- Collections -------------------------------------------------------------

export type Collection = {
  slug: string
  name: string
  tagline: string
  image: string
  count: number
}

export const COLLECTION_DETAILS: Collection[] = [
  {
    slug: 'new-collection',
    name: 'New Collection',
    tagline: 'The latest chapter from the studio.',
    image: '/images/collection-minimal.png',
    count: 24,
  },
  {
    slug: 'summer',
    name: 'Summer',
    tagline: 'Lightweight pieces for warm days.',
    image: '/images/nordic-tee.png',
    count: 18,
  },
  {
    slug: 'minimal',
    name: 'Minimal',
    tagline: 'Quiet by design. Nothing shouting.',
    image: '/images/collection-minimal.png',
    count: 21,
  },
  {
    slug: 'streetwear',
    name: 'Streetwear',
    tagline: 'Considered graphics with an edge.',
    image: '/images/lion-hoodie.png',
    count: 16,
  },
  {
    slug: 'art',
    name: 'Art',
    tagline: 'Original artwork, wearable.',
    image: '/images/lion-poster.png',
    count: 14,
  },
  {
    slug: 'quotes',
    name: 'Quotes',
    tagline: 'Words worth wearing.',
    image: '/images/solar-sweatshirt.png',
    count: 11,
  },
  {
    slug: 'gift',
    name: 'Gift',
    tagline: 'Considered pieces for someone special.',
    image: '/images/lion-mug.png',
    count: 20,
  },
  {
    slug: 'seasonal',
    name: 'Seasonal',
    tagline: 'Limited edits, released in moments.',
    image: '/images/lion-cushion.png',
    count: 9,
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTION_DETAILS.find((c) => c.slug === slug)
}

// ---- Article lookup ----------------------------------------------------------

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug)
}

// ---- FAQ ---------------------------------------------------------------------

export const FAQ_GROUPS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: 'Orders & Production',
    items: [
      {
        q: 'How does made-on-demand work?',
        a: 'Every piece is printed to order on premium blanks once you place your order. This means no overstock, no waste, and a print made specifically for you. Production typically takes 2–4 business days before dispatch.',
      },
      {
        q: 'Can I put one design on different products?',
        a: 'Yes — that is the heart of the studio. Open any design and choose how you want it expressed: a tee, a hoodie, a mug, a wall print and more, all from the same artwork.',
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'Because pieces are made to order, we can only amend or cancel within 2 hours of purchase. Contact us as soon as possible and we will do our best to help.',
      },
    ],
  },
  {
    heading: 'Shipping & Delivery',
    items: [
      {
        q: 'Where do you ship?',
        a: 'We ship to over 40 countries across the EU, UK, Switzerland, Norway, the USA, Canada, Saudi Arabia, Bangladesh and beyond. Delivery estimates are shown at checkout based on your region.',
      },
      {
        q: 'Is shipping free?',
        a: 'Standard shipping is complimentary on EU orders over €75. Thresholds for other regions are shown in your local currency at checkout.',
      },
      {
        q: 'Will I be charged customs or duties?',
        a: 'For most destinations, taxes and duties are calculated and displayed transparently at checkout so there are no surprises on delivery.',
      },
    ],
  },
  {
    heading: 'Returns & Sizing',
    items: [
      {
        q: 'What is your returns policy?',
        a: 'You may return unworn items within 30 days. As pieces are made on demand, we ask that tags remain attached. See our Returns page for the full process.',
      },
      {
        q: 'How do I find my size?',
        a: 'Each product page includes a size guide with measurements. Our apparel runs true to size with a modern, slightly relaxed fit.',
      },
    ],
  },
]
