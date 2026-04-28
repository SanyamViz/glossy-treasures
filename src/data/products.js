import bouquet1 from './../assets/candle/boquet1.jpeg'
import bouquet2 from './../assets/candle/boquet2.jpeg'

import bubble1 from './../assets/candle/bubble.jpeg'
import bubble2 from './../assets/candle/bubble2.jpeg'

import coffee1 from './../assets/candle/coffe1.jpeg'
import coffee2 from './../assets/candle/coffe2.jpeg'

import coffebean1 from './../assets/candle/coffebean1.jpeg'
import coffebean2 from './../assets/candle/coffebean2.jpeg'

import daisy1 from './../assets/candle/daisy1.jpeg'
import daisy2 from './../assets/candle/daisy2.jpeg'

import happyheart1 from './../assets/candle/happyheart1.jpeg'
import happyheart2 from './../assets/candle/happyheart2.jpeg'

import heartflower1 from './../assets/candle/heartflower1.jpeg'
import heartflower2 from './../assets/candle/heartflower2.jpeg'

import heartflowerjar from './../assets/candle/heartflowerjar.jpeg'

import lovelove1 from './../assets/candle/lovelove1.jpeg'
import lovelove2 from './../assets/candle/lovelove2.jpeg'

import loveu1 from './../assets/candle/loveu1.jpeg'
import loveu2 from './../assets/candle/loveu2.jpeg'

import minibubble1 from './../assets/candle/minibubble1.jpeg'
import minibubble2 from './../assets/candle/minibubble2.jpeg'

import peony1 from './../assets/candle/peony1.jpeg'
import peony2 from './../assets/candle/peony2.jpeg'

import petalglow from './../assets/candle/petalglow.jpeg'

import pretty1 from './../assets/candle/pretty1.jpeg'
import pretty2 from './../assets/candle/pretty2.jpeg'

import purelove from './../assets/candle/purelove.jpeg'

import strawberry1 from './../assets/candle/strawberry1.jpeg'
import strawberry2 from './../assets/candle/strawberry2.jpeg'

import swirl1 from './../assets/candle/swirl1.jpeg'
import swirl2 from './../assets/candle/swirl2.jpeg'

import sunkisses from './../assets/candle/sunkisses.jpeg'

import tea1 from './../assets/candle/tea.jpeg'
import tea2 from './../assets/candle/tea2.jpeg'

import teddy from './../assets/candle/teddy.jpeg'

import teddyjar1 from './../assets/candle/teddyjar1.jpeg'
import teddyjar2 from './../assets/candle/teddyjar2.jpeg'

import teddyribbon1 from './../assets/candle/teddyribbon1.jpeg'
import teddyribbon2 from './../assets/candle/teddyribbon2.jpeg'

import tulipb1 from './../assets/candle/tulipb1.jpeg'
import tulipb2 from './../assets/candle/tulipb2.jpeg'


export const CANDLES = [
  {
    id: 'c1',
    slug: 'bouquet',
    name: 'Bouquet',
    category: 'candle',
    price: 1299,
    originalPrice: 1599,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Warm',
    occasion: 'Gifting',
    badge: '45 HRS BURN TIME',
    image: bouquet1,
    images: [
      bouquet1,
      bouquet2,
    ],
    description: 'Hand-poured in small batches. A slow, meditative release of warmth.',
    tagline: 'Hand-poured in small batches. A slow, meditative release of warmth.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 4,
    bestseller: true,

    sizes: [
      { id: '100g', label: '100g', price: 699, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1299, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1799, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'amber-oud', label: 'Amber & Oud', available: true },
    ],
  },

  {
    id: 'c2',
    slug: 'bubble',
    name: 'Bubble',
    category: 'candle',
    price: 899,
    originalPrice: 999,
    weight: '200g',
    burnTime: '40 hrs',
    scentFamily: 'Floral',
    occasion: 'Sleep',
    badge: '22% OFF',
    image: bubble1,
    images: [
      bubble1,
      bubble2,
    ],
    description: 'Fields at dusk. Quiet and unhurried, soft on the air.',
    tagline: 'Fields at dusk. Quiet and unhurried, soft on the air.',
    ingredients: 'Soy wax, lavender essential oil, cotton wick',
    inStock: true,
    stock: 6,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 599, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 899, burnTime: '40 hrs' },
      { id: '300g', label: '300g', price: 1299, burnTime: '60 hrs' },
    ],

    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'locus', label: 'Locus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
    ],
  },

  {
    id: 'c3',
    slug: 'coffee',
    name: 'Coffee',
    category: 'candle',
    price: 1299,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Warm',
    occasion: 'Home',
    badge: null,
    image: coffee1,
    images: [
      coffee1,
      coffee2,
    ],
    description: 'Rich vanilla blended with earthy sandalwood. Warm and grounding.',
    tagline: 'Rich vanilla blended with earthy sandalwood. Warm and grounding.',
    ingredients: 'Soy wax, vanilla & sandalwood oil, cotton wick',
    inStock: true,
    stock: 8,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 699, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1299, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1799, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'vanilla-sandalwood', label: 'Vanilla Sandalwood', available: true },
    ],
  },

  {
    id: 'c4',
    slug: 'coffebean',
    name: 'Coffe Bean',
    category: 'candle',
    price: 1299,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Floral',
    occasion: 'Gifting',
    badge: null,
    image: coffebean1,
    images: [
      coffebean1,
      coffebean2,
    ],
    description: 'Delicate rose petals with soft musk. Romantic and calming.',
    tagline: 'Delicate rose petals with soft musk. Romantic and calming.',
    ingredients: 'Soy wax, rose essential oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: true,

    sizes: [
      { id: '100g', label: '100g', price: 699, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1299, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1799, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'rose', label: 'Rose', available: true },
    ],
  },

  {
    id: 'c5',
    slug: 'daisy',
    name: 'Daisy',
    category: 'candle',
    price: 999,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Floral',
    occasion: 'Gifting',
    badge: null,
    image: daisy1,
    images: [
      daisy1,
      daisy2,
    ],
    description: 'Bring a modern glow to your space with our bubble candle.',
    tagline: 'Bring a modern glow to your space with our bubble candle.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 12,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 599, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 999, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1399, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'bubble', label: 'Bubble', available: true },
    ],
  },

  {
    id: 'c6',
    slug: 'happyheart',
    name: 'Happy Heart',
    category: 'candle',
    price: 1299,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Floral',
    occasion: 'Self Care',
    badge: null,
    image: happyheart1,
    images: [
      happyheart1,
      happyheart2,
    ],
    description: 'Floral rose with warm musk undertones. Feminine and sophisticated.',
    tagline: 'Floral rose with warm musk undertones. Feminine and sophisticated.',
    ingredients: 'Soy wax, rose & musk oil, cotton wick',
    inStock: true,
    stock: 7,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 699, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1299, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1799, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'rose-musk', label: 'Rose & Musk', available: true },
    ],
  },

  {
    id: 'c7',
    slug: 'heartflower',
    name: 'Heart Flower',
    category: 'candle',
    price: 699,
    originalPrice: 899,
    weight: '100g',
    burnTime: '25 hrs',
    scentFamily: 'Woody',
    occasion: 'Self Care',
    badge: null,
    image: heartflower1,
    images: [
      heartflower1,
      heartflower2,
    ],
    description: 'Fresh cedarwood with petrichor. Grounding and natural.',
    tagline: 'Fresh cedarwood with petrichor. Grounding and natural.',
    ingredients: 'Soy wax, cedarwood oil, cotton wick',
    inStock: true,
    stock: 10,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 699, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1199, burnTime: '45 hrs' },
    ],

    fragrances: [
      { id: 'cedarwood', label: 'Cedarwood', available: true },
    ],
  },

  {
    id: 'c8',
    slug: 'heartflowerjar',
    name: 'Heart Flower Jar',
    category: 'candle',
    price: 1299,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Floral',
    occasion: 'Romance',
    badge: null,
    image: heartflowerjar,
    images: [
      heartflowerjar,
    ],
    description: 'Romantic jasmine blooms. Perfect for intimate evenings.',
    tagline: 'Romantic jasmine blooms. Perfect for intimate evenings.',
    ingredients: 'Soy wax, jasmine essential oil, cotton wick',
    inStock: true,
    stock: 4,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 699, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1299, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1799, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'jasmine', label: 'Jasmine', available: true },
    ],
  },

  {
    id: 'c9',
    slug: 'lovelove',
    name: 'Love Love',
    category: 'candle',
    price: 999,
    originalPrice: null,
    weight: '200g',
    burnTime: '40 hrs',
    scentFamily: 'Fruity',
    occasion: 'Gifting',
    badge: null,
    image: lovelove1,
    images: [
      lovelove1,
      lovelove2,
    ],
    description: 'Fresh strawberry with vanilla cream. Sweet and playful.',
    tagline: 'Fresh strawberry with vanilla cream. Sweet and playful.',
    ingredients: 'Soy wax, strawberry & vanilla oil, cotton wick',
    inStock: true,
    stock: 8,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 599, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 999, burnTime: '40 hrs' },
      { id: '300g', label: '300g', price: 1399, burnTime: '60 hrs' },
    ],

    fragrances: [
      { id: 'strawberry', label: 'Strawberry', available: true },
    ],
  },

  {
    id: 'c10',
    slug: 'loveu',
    name: 'Love U',
    category: 'candle',
    price: 1499,
    originalPrice: null,
    weight: '300g',
    burnTime: '65 hrs',
    scentFamily: 'Gourmand',
    occasion: 'Self Care',
    badge: null,
    image: loveu1,
    images: [
      loveu1,
      loveu2,
    ],
    description: 'Rich dark chocolate with hints of espresso. Indulgent and cozy.',
    tagline: 'Rich dark chocolate with hints of espresso. Indulgent and cozy.',
    ingredients: 'Soy wax, chocolate & coffee oil, cotton wick',
    inStock: true,
    stock: 3,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 699, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1199, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1499, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'chocolate', label: 'Chocolate', available: true },
    ],
  },

  {
    id: 'c11',
    slug: 'minibubble',
    name: 'Mini Bubble',
    category: 'candle',
    price: 1199,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Romance',
    badge: null,
    image: minibubble1,
    images: [
      minibubble1,
      minibubble2,
    ],
    description: 'Deep red wine with plum and oakwood notes. Sophisticated.',
    tagline: 'Deep red wine with plum and oakwood notes. Sophisticated.',
    ingredients: 'Soy wax, wine & fruit oil, cotton wick',
    inStock: true,
    stock: 6,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1199, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1699, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'redwine', label: 'Red Wine', available: true },
    ],
  },

  {
    id: 'c12',
    slug: 'peony',
    name: 'Peony',
    category: 'candle',
    price: 899,
    originalPrice: null,
    weight: '200g',
    burnTime: '40 hrs',
    scentFamily: 'Citrus',
    occasion: 'Home',
    badge: null,
    image: peony1,
    images: [
      peony1,
      peony2,
    ],
    description: 'Fresh lemongrass with ginger. Uplifting and energizing.',
    tagline: 'Fresh lemongrass with ginger. Uplifting and energizing.',
    ingredients: 'Soy wax, lemongrass oil, cotton wick',
    inStock: true,
    stock: 9,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 549, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 899, burnTime: '40 hrs' },
      { id: '300g', label: '300g', price: 1299, burnTime: '60 hrs' },
    ],

    fragrances: [
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon-lavender', label: 'Lemon & Lavender', available: true },
    ],
  },

  {
    id: 'c13',
    slug: 'petalglow',
    name: 'Petal Glow',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: petalglow,
    images: [
      petalglow,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c14',
    slug: 'pretty',
    name: 'Pretty',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: pretty1,
    images: [
      pretty1,
      pretty2,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c15',
    slug: 'purelove',
    name: 'Pure Love',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: purelove,
    images: [
      purelove,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c16',
    slug: 'strawberry',
    name: 'Strawberry',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: strawberry1,
    images: [
      strawberry1,
      strawberry2,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c17',
    slug: 'sunkissed',
    name: 'Sunkissed',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: sunkisses,
    images: [
      sunkisses,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c18',
    slug: 'swirl',
    name: 'Swirl',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: swirl1,
    images: [
      swirl1,
      swirl2,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c19',
    slug: 'teatime',
    name: 'Teatime',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: tea1,
    images: [
      tea1,
      tea2,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c20',
    slug: 'teddy',
    name: 'Teddy',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: teddy,
    images: [
      teddy,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c21',
    slug: 'teddyjar',
    name: 'Teddy Jar',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: teddyjar1,
    images: [
      teddyjar1,
      teddyjar2,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c22',
    slug: 'teddyribbon',
    name: 'Teddy Ribbon',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: teddyribbon1,
    images: [
      teddyribbon1,
      teddyribbon2,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c23',
    slug: 'tulipbath',
    name: 'Tulip Bath',
    category: 'candle',
    price: 1099,
    originalPrice: null,
    weight: '200g',
    burnTime: '45 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: tulipb1,
    images: [
      tulipb1,
      tulipb2,
    ],
    description: 'Tart cranberry with subtle spice. Festive and warm.',
    tagline: 'Tart cranberry with subtle spice. Festive and warm.',
    ingredients: 'Soy wax, cranberry oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '100g', label: '100g', price: 649, burnTime: '25 hrs' },
      { id: '200g', label: '200g', price: 1099, burnTime: '45 hrs' },
      { id: '300g', label: '300g', price: 1599, burnTime: '65 hrs' },
    ],

    fragrances: [
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
];

// ── RESIN PRODUCTS ───────────────────────────────────────────────────────
export const RESIN_PRODUCTS = [
  {
    id: 'r1',
    slug: 'marble-serving-platter',
    name: 'Marble Serving Platter',
    category: 'resin',
    type: 'platter',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
    images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400'],
    description: 'Elegant marble effect platter for entertaining.',
    size: '12" x 8"',
    inStock: true,
    bestseller: true,
    colors: [
      { id: 'white-gold', label: 'White Gold', hex: '#F5F5F5' },
      { id: 'black-gold', label: 'Black Gold', hex: '#2A2A2A' },
    ],
  },

  {
    id: 'r2',
    slug: 'gold-leaf-photo-frame',
    name: 'Gold Leaf Photo Frame',
    category: 'resin',
    type: 'frame',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400',
    images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400'],
    description: 'Beautiful resin frame with embedded gold leaf.',
    inStock: true,
    bestseller: true,

    colors: [
      { id: 'rose-gold', label: 'Rose Gold', hex: '#C4948A' },
      { id: 'champagne', label: 'Champagne', hex: '#B8965A' },
    ],

    frameSizes: [
      { id: '4x6', label: '4x6 Photo', dimensions: '6" x 8" frame', price: 1499 },
      { id: '5x7', label: '5x7 Photo', dimensions: '8" x 10" frame', price: 1899 },
      { id: '8x10', label: '8x10 Photo', dimensions: '11" x 13" frame', price: 2499 },
    ],

    standMaterials: [
      { id: 'wooden', label: 'Wooden Stand', priceAdd: 0 },
      { id: 'acrylic', label: 'Acrylic Stand', priceAdd: 150 },
      { id: 'metal', label: 'Metal Stand', priceAdd: 200 },
    ],
  },

  {
    id: 'r3',
    slug: 'agate-coaster-set',
    name: 'Agate Coaster Set',
    category: 'resin',
    type: 'coaster',
    price: 799,
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400',
    images: ['https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400'],
    description: 'Set of 4 agate-effect coasters with holder.',
    size: '4" diameter (set of 4)',
    inStock: true,
    bestseller: true,
    colors: [
      { id: 'purple', label: 'Purple Agate', hex: '#8B4789' },
      { id: 'green', label: 'Green Agate', hex: '#50C878' },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════
// EXPORT FUNCTIONS
// ════════════════════════════════════════════════════════════════════════

export const ALL_PRODUCTS = [...CANDLES, ...RESIN_PRODUCTS];

// Get product by slug (THIS IS WHAT CandlePDP NEEDS!)
export const getProductBySlug = (slug) => {
  return ALL_PRODUCTS.find(p => p.slug === slug);
};

export const getCandleProducts = () => CANDLES;
export const getResinProducts = () => RESIN_PRODUCTS;
export const getResinByType = (type) => RESIN_PRODUCTS.filter(p => p.type === type);
export const getBestsellers = () => ALL_PRODUCTS.filter(p => p.bestseller);

// Calculate frame price
export const calculateFramePrice = (basePrice, frameSizePrice, standMaterialPrice) => {
  return basePrice + (frameSizePrice - basePrice) + standMaterialPrice;
};