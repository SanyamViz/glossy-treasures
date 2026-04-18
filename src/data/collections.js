import { CANDLES, RESIN } from './products.js';

export const COLLECTIONS = [
  {
    id: 'col1',
    slug: 'gifting-edit',
    name: 'The Gifting Edit',
    tagline: 'For the ones who deserve something beautiful.',
    description: 'A carefully curated selection of our most-loved pieces — perfect for birthdays, anniversaries, or just because. Each product in this collection has been chosen for its ability to make someone feel truly seen.',
    mood: 'Warm · Thoughtful · Personal',
    occasion: 'Gifting',
    color: '#C4948A',        // accent rose — used for this collection's theme tint
    heroGradient: 'linear-gradient(135deg, #F5E6E0 0%, #EDD5CC 100%)',
    productSlugs: ['amber-oud-candle', 'blush-decorative-plate', 'rose-musk-candle', 'ivory-jewellery-dish', 'lavender-haze-candle', 'teal-coaster-set'],
    productCount: 6,
    badge: 'Most Loved'
  },
  {
    id: 'col2',
    slug: 'wedding-season',
    name: 'Wedding Season',
    tagline: 'Gifts as beautiful as the occasion itself.',
    description: 'Handcrafted pieces designed to become part of your most cherished memories. From trousseau additions to guest favours — everything here tells a story worth keeping.',
    mood: 'Romantic · Timeless · Celebratory',
    occasion: 'Wedding',
    color: '#B8965A',
    heroGradient: 'linear-gradient(135deg, #F5F0E8 0%, #EDE0C8 100%)',
    productSlugs: ['blush-keepsake-box', 'gold-leaf-plate', 'ivory-box', 'jasmine-nights-candle', 'ivory-jewellery-dish', 'patchouli-vetiver-candle'],
    productCount: 6,
    badge: 'Seasonal'
  },
  {
    id: 'col3',
    slug: 'self-care-rituals',
    name: 'Self Care Rituals',
    tagline: 'Because you are worth the slow Sunday.',
    description: 'Light a candle, find your corner, breathe. This collection is designed for the ritual of coming back to yourself — one quiet evening at a time.',
    mood: 'Calm · Restorative · Soft',
    occasion: 'Self Care',
    color: '#9FB3A0',
    heroGradient: 'linear-gradient(135deg, #EBF0EB 0%, #D8E4D8 100%)',
    productSlugs: ['lavender-haze-candle', 'vanilla-sandalwood-candle', 'blush-dish', 'white-tea-candle', 'blush-decorative-plate', 'french-linen-candle'],
    productCount: 6,
    badge: null
  },
  {
    id: 'col4',
    slug: 'home-sanctuary',
    name: 'Home & Sanctuary',
    tagline: 'Turn your space into a feeling.',
    description: 'Every home deserves objects that earn their place. This collection brings together pieces that add quiet beauty to everyday corners — the shelf, the table, the windowsill.',
    mood: 'Grounded · Warm · Intentional',
    occasion: 'Home Decor',
    color: '#8B7355',
    heroGradient: 'linear-gradient(135deg, #EDE8E0 0%, #DDD5C8 100%)',
    productSlugs: ['midnight-wall-frame', 'forest-tray', 'oud-noir-candle', 'forest-wall-frame', 'fig-black-tea-candle', 'teal-tray'],
    productCount: 6,
    badge: null
  },
  {
    id: 'col5',
    slug: 'new-arrivals',
    name: 'New Arrivals',
    tagline: 'Fresh from Angel\'s studio.',
    description: 'The newest additions to Glossy Treasures — just finished, still warm. First to know, first to own.',
    mood: 'Fresh · Exciting · New',
    occasion: 'New',
    color: '#C4948A',
    heroGradient: 'linear-gradient(135deg, #FAF8F5 0%, #F0EBE3 100%)',
    productSlugs: ['vanilla-sandalwood-candle', 'ivory-jewellery-dish', 'oud-noir-candle', 'blush-keepsake-box', 'ivory-box', 'forest-wall-frame'],
    productCount: 6,
    badge: 'New'
  },
  {
    id: 'col6',
    slug: 'bestsellers',
    name: 'Bestsellers',
    tagline: 'The ones everyone keeps coming back for.',
    description: 'Our community has spoken. These are the pieces that sell out first, get gifted the most, and live permanently on wishlists. Start here if you\'re new.',
    mood: 'Trusted · Beloved · Essential',
    occasion: 'All',
    color: '#B8965A',
    heroGradient: 'linear-gradient(135deg, #F5F2EC 0%, #EDE6D8 100%)',
    productSlugs: ['amber-oud-candle', 'blush-decorative-plate', 'gold-leaf-plate', 'rose-musk-candle', 'teal-coaster-set', 'lavender-haze-candle'],
    productCount: 6,
    badge: 'Fan Favourites'
  }
];

export function getCollectionProducts(productSlugs) {
  const all = [...CANDLES, ...RESIN];
  return productSlugs.map(slug => all.find(p => p.slug === slug)).filter(Boolean);
}
