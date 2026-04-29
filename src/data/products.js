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
    slug: 'rose-bouquet',
    name: 'Rose bouquet',
    category: 'candle',
    price: 350,
    originalPrice: 450,
    weight: '250g',
    burnTime: '5 hrs',
    scentFamily: 'Warm',
    occasion: 'Gifting',
    badge: '5 HRS BURN TIME',
    image: bouquet1,
    images: [
      bouquet1,
      bouquet2,
    ],
    description: 'Realistic rose bouquet design with detailed red petals',
    tagline: 'Realistic rose bouquet design with detailed red petals',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 4,
    bestseller: true,

    fragrances: [
      { id: 'rose', label: 'Rose', available: true },
    ],
  },

  {
    id: 'c2',
    slug: 'bubble',
    name: 'Bubble',
    category: 'candle',
    price: 150,
    originalPrice: 200,
    weight: '150g',
    burnTime: '15 hrs',
    scentFamily: 'Floral',
    occasion: 'Sleep',
    badge: '25% OFF',
    image: bubble1,
    images: [
      bubble1,
      bubble2,
    ],
    description: 'Bubble candles are trendy, sculptural, and minimalist decor pieces featuring a stacked cube design.',
    tagline: 'Bubble candles are trendy, sculptural, and minimalist decor pieces featuring a stacked cube design.',
    ingredients: 'Soy wax, lavender essential oil, cotton wick',
    inStock: true,
    stock: 6,
    bestseller: false,

    sizes: [
      { id: '150g', label: '150g', price: 150, burnTime: '15 hrs' },
      { id: '40g', label: '40g', price: 60, burnTime: '5 hrs' },
    ],

    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'rose', label: 'Rose', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'chocolate', label: 'Chocolate', available: true },
      { id: 'strawberry', label: 'Strawberry', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'redwine', label: 'Red Wine', available: true },
      { id: 'coffee', label: 'Coffee', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon&levender', label: 'Lemon & Levender', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
    ]
  },

  {
    id: 'c3',
    slug: 'coffee',
    name: 'Coffee',
    category: 'candle',
    price: 350,
    originalPrice: 450,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: 'Warm',
    occasion: 'Home',
    badge: '25% OFF',
    image: coffee1,
    images: [
      coffee1,
      coffee2,
    ],
    description: 'Coffee candles provide a warm, inviting aroma designed to replicate the scent of a café, featuring rich notes of roasted coffee beans, espresso, cocoa, and cream.',
    tagline: 'Coffee candles provide a warm, inviting aroma designed to replicate the scent of a café, featuring rich notes of roasted coffee beans, espresso, cocoa, and cream.',
    ingredients: 'Soy wax, vanilla & sandalwood oil, cotton wick',
    inStock: true,
    stock: 8,
    bestseller: false,

    sizes: [
      { id: '150g', label: '150g', price: 200, burnTime: '45 hrs' },
      { id: '400g', label: '400g', price: 350, burnTime: '75 hrs' },
    ],

    fragrances: [
      { id: 'coffee', label: 'Coffee', available: true },
      { id: 'chocolate', label: 'Chocolate', available: true },
    ],
  },

  {
    id: 'c4',
    slug: 'coffebean',
    name: 'Coffe Bean',
    category: 'candle',
    price: 1299,
    originalPrice: null,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: 'Floral',
    occasion: 'Gifting',
    badge: null,
    image: coffebean1,
    images: [
      coffebean1,
      coffebean2,
    ],
    description: 'A coffee bean candle offers a warm, invigorating aroma, often featuring notes of freshly roasted coffee, rich espresso, and hints of vanilla or caramel.',
    tagline: 'A coffee bean candle offers a warm, invigorating aroma, often featuring notes of freshly roasted coffee, rich espresso, and hints of vanilla or caramel.',
    ingredients: 'Soy wax, rose essential oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: true,

    sizes: [
      { id: '150g', label: '150g', price: 200, burnTime: '45 hrs' },
      { id: '400g', label: '400g', price: 350, burnTime: '75 hrs' },
    ],

    fragrances: [
      { id: 'coffee', label: 'Coffee', available: true },
      { id: 'chocolate', label: 'Chocolate', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
    ],
  },

  {
    id: 'c5',
    slug: 'daisy',
    name: 'Daisy',
    category: 'candle',
    price: 250,
    originalPrice: null,
    weight: '150g',
    burnTime: '50 hrs',
    scentFamily: 'Floral',
    occasion: 'Gifting',
    badge: null,
    image: daisy1,
    images: [
      daisy1,
      daisy2,
    ],
    description: 'Daisy candles are handcrafted, floral-shaped candles designed to resemble blooming daisies, typically made from eco-friendly, clean-burning soy wax.',
    tagline: 'Daisy candles are handcrafted, floral-shaped candles designed to resemble blooming daisies, typically made from eco-friendly, clean-burning soy wax.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 12,
    bestseller: false,

    fragrances: [
      { id: 'rose', label: 'Rose', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
    ],
  },

  {
    id: 'c6',
    slug: 'happyheart',
    name: 'Happy Heart',
    category: 'candle',
    price: 350,
    originalPrice: null,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: null,
    occasion: 'Self Care',
    badge: null,
    image: happyheart1,
    images: [
      happyheart1,
      happyheart2,
    ],
    description: 'A happy heart candle is typically a romantic or celebratory, heart-shaped, red or pink, fragrant candle often used for gifting on occasions like Valentines Day or anniversaries..',
    tagline: 'A happy heart candle is typically a romantic or celebratory, heart-shaped, red or pink, fragrant candle often used for gifting on occasions like Valentines Day or anniversaries..',
    ingredients: 'Soy wax, rose & musk oil, cotton wick',
    inStock: true,
    stock: 7,
    bestseller: false,

    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'rose', label: 'Rose', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'strawberry', label: 'Strawberry', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon&levender', label: 'Lemon & Levender', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },

  {
    id: 'c7',
    slug: 'redrose',
    name: 'Red Rose',
    category: 'candle',
    price: 350,
    originalPrice: null,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: null,
    occasion: 'Self Care',
    badge: null,
    image: heartflower1,
    images: [
      heartflower1,
      heartflower2,
    ],
    description: 'A red rose scented candle offers a romantic, luxurious, and timeless floral aroma, often featuring notes of fresh-cut red roses, hints of violet leaves, and lemon.',
    tagline: 'A red rose scented candle offers a romantic, luxurious, and timeless floral aroma, often featuring notes of fresh-cut red roses, hints of violet leaves, and lemon.',
    ingredients: 'Soy wax, premium rose oil, cotton wick',
    inStock: true,
    stock: 10,
    bestseller: false,



    fragrances: [
      { id: 'rose', label: 'Rose', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
      { id: 'lavender', label: 'Lavender', available: true },
    ],
  },

  {
    id: 'c8',
    slug: 'pink-heart',
    name: 'Pink Heart',
    category: 'candle',
    price: 300,
    originalPrice: null,
    weight: '250g',
    burnTime: '50 hrs',
    scentFamily: 'Floral',
    occasion: 'Romance',
    badge: null,
    image: heartflowerjar,
    images: [
      heartflowerjar,
    ],
    description: 'This beautiful pink rose candle is perfect for adding a touch of romance to any room. The intricate detailing of the petals and the soft glow of the candlelight will create a warm and inviting atmosphere. ',
    tagline: 'Pink rose candle in glass jar with dried petals',
    ingredients: 'Soy wax,pink rose essential oil, cotton wick',
    inStock: true,
    stock: 4,
    bestseller: false,


    fragrances: [
      { id: 'rose', label: 'Rose', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
      { id: 'lavender', label: 'Lavender', available: true },
    ],
  },

  {
    id: 'c9',
    slug: 'lovelove',
    name: 'Love Love',
    category: 'candle',
    price: 350,
    originalPrice: null,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: 'Fruity',
    occasion: 'Gifting',
    badge: null,
    image: lovelove1,
    images: [
      lovelove1,
      lovelove2,
    ],
    description: 'Love-themed scented candles are designed to create a romantic, warm, and intimate atmosphere, often featuring scents like jasmine, rose, and sandalwood. ',
    tagline: 'Love-themed scented candles are designed to create a romantic, warm, and intimate atmosphere, often featuring scents like jasmine, rose, and sandalwood. ',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 8,
    bestseller: false,

    fragrances: [
      { id: 'rose', label: 'Rose', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
      { id: 'lavender', label: 'Lavender', available: true },
    ],
  },

  {
    id: 'c10',
    slug: 'i-love-you',
    name: 'I Love You',
    category: 'candle',
    price: 350,
    originalPrice: null,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: 'Gourmand',
    occasion: 'Self Care',
    badge: null,
    image: loveu1,
    images: [
      loveu1,
      loveu2,
    ],
    description: '"I Love You" candles are romantic, sentimental gifts designed to express affection through soothing fragrances and warm light.',
    tagline: '"I Love You" candles are romantic, sentimental gifts designed to express affection through soothing fragrances and warm light.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 3,
    bestseller: false,

    sizes: [
      { id: '150g', label: '150g', price: 200, burnTime: '40 hrs' },
      { id: '400g', label: '400g', price: 350, burnTime: '75 hrs' },
    ],

    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'rose', label: 'Rose', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'chocolate', label: 'Chocolate', available: true },
      { id: 'strawberry', label: 'Strawberry', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'redwine', label: 'Red Wine', available: true },
      { id: 'coffee', label: 'Coffee', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon&levender', label: 'Lemon & Levender', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
    ]
  },

  {
    id: 'c11',
    slug: 'minibubble',
    name: 'Mini Bubble',
    category: 'candle',
    price: 60,
    originalPrice: null,
    weight: '40g',
    burnTime: '5 hrs',
    scentFamily: 'Fruity',
    occasion: 'Romance',
    badge: null,
    image: minibubble1,
    images: [
      minibubble1,
      minibubble2,
    ],
    description: 'A mini bubble candle is a small, cube-shaped decorative piece featuring a unique aesthetic often described as "Pinterest-worthy" or "minimalist"',
    tagline: 'A mini bubble candle is a small, cube-shaped decorative piece featuring a unique aesthetic often described as "Pinterest-worthy" or "minimalist"',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 6,
    bestseller: false,

    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'rose', label: 'Rose', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'chocolate', label: 'Chocolate', available: true },
      { id: 'strawberry', label: 'Strawberry', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'redwine', label: 'Red Wine', available: true },
      { id: 'coffee', label: 'Coffee', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon&levender', label: 'Lemon & Levender', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
    ]
  },

  {
    id: 'c12',
    slug: 'peony',
    name: 'Peony',
    category: 'candle',
    price: 150,
    originalPrice: null,
    weight: '150g',
    burnTime: '7 hrs',
    scentFamily: 'Citrus',
    occasion: 'Home',
    badge: null,
    image: peony1,
    images: [
      peony1,
      peony2,
    ],
    description: 'A peony candle is a romantic, floral-scented candle featuring a soft, crisp, and intoxicating aroma often balanced with subtle woody undertones or musk. ',
    tagline: 'A peony candle is a romantic, floral-scented candle featuring a soft, crisp, and intoxicating aroma often balanced with subtle woody undertones or musk.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 9,
    bestseller: false,

    fragrances: [
      { id: 'rose', label: 'Rose', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
    ],
  },

  {
    id: 'c13',
    slug: 'petalglow',
    name: 'Petal Glow',
    category: 'candle',
    price: 350,
    originalPrice: null,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: petalglow,
    images: [
      petalglow,
    ],
    description: 'Petal Glow Candle is a delicate blend of floral beauty and soft illumination, designed to bring warmth, calm, and elegance into any space.',
    tagline: 'Petal Glow Candle is a delicate blend of floral beauty and soft illumination, designed to bring warmth, calm, and elegance into any space.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '150g', label: '150g', price: 200, burnTime: '40 hrs' },
      { id: '400g', label: '400g', price: 350, burnTime: '75 hrs' },
    ],

    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'rose', label: 'Rose', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'chocolate', label: 'Chocolate', available: true },
      { id: 'strawberry', label: 'Strawberry', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'redwine', label: 'Red Wine', available: true },
      { id: 'coffee', label: 'Coffee', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon&levender', label: 'Lemon & Levender', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
    ],
  },
  {
    id: 'c14',
    slug: 'pinkglow',
    name: 'Pink Glow',
    category: 'candle',
    price: 200,
    originalPrice: null,
    weight: '150g',
    burnTime: '40 hrs',
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

    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'rose', label: 'Rose', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'strawberry', label: 'Strawberry', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'redwine', label: 'Red Wine', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon&levender', label: 'Lemon & Levender', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
    ]
  },
  {
    id: 'c15',
    slug: 'purelove',
    name: 'Pure Love',
    category: 'candle',
    price: 350,
    originalPrice: null,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: purelove,
    images: [
      purelove,
    ],
    description: '"Pure Love" candles are typically marketed as romantic, high-quality soy wax blends, often featuring floral or calming scents like rose, lavender, and sage to promote positive energy.',
    tagline: '"Pure Love" candles are typically marketed as romantic, high-quality soy wax blends, often featuring floral or calming scents like rose, lavender, and sage to promote positive energy.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,
    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'rose', label: 'Rose', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'chocolate', label: 'Chocolate', available: true },
      { id: 'strawberry', label: 'Strawberry', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'redwine', label: 'Red Wine', available: true },
      { id: 'coffee', label: 'Coffee', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon&levender', label: 'Lemon & Levender', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
    ]
  },
  {
    id: 'c16',
    slug: 'strawberry',
    name: 'Strawberry',
    category: 'candle',
    price: 300,
    originalPrice: null,
    weight: '250g',
    burnTime: '50 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: strawberry1,
    images: [
      strawberry1,
      strawberry2,
    ],
    description: 'A strawberry candle is generally described as a sweet, fruity, and uplifting scent designed to evoke memories of summer, ripe berries, and, in some cases, nostalgic strawberry candy.',
    tagline: 'A strawberry candle is generally described as a sweet, fruity, and uplifting scent designed to evoke memories of summer, ripe berries, and, in some cases, nostalgic strawberry candy.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    fragrances: [
      { id: 'strawberry', label: 'Strawberry', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
    ],
  },
  {
    id: 'c17',
    slug: 'sunkissed',
    name: 'Sunkissed',
    category: 'candle',
    price: 350,
    originalPrice: null,
    weight: '400g',
    burnTime: '75 hrs',
    scentFamily: 'Fruity',
    occasion: 'Home',
    badge: null,
    image: sunkisses,
    images: [
      sunkisses,
    ],
    description: 'Sunkissed candles are generally described as sweet, fruity, and uplifting, evoking summer and ripe berries. Some may also feature nostalgic, candy-like sweetness.',
    tagline: 'Sunkissed candles are generally described as sweet, fruity, and uplifting, evoking summer and ripe berries. Some may also feature nostalgic, candy-like sweetness.',
    ingredients: 'Soy wax, premium essential oil, cotton wick',
    inStock: true,
    stock: 5,
    bestseller: false,

    sizes: [
      { id: '150g', label: '150g', price: 200, burnTime: '40 hrs' },
      { id: '400g', label: '400g', price: 350, burnTime: '75 hrs' },
    ],

    fragrances: [
      { id: 'lavender', label: 'Lavender', available: true },
      { id: 'loctus', label: 'Loctus', available: true },
      { id: 'jasmine', label: 'Jasmine', available: true },
      { id: 'rose', label: 'Rose', available: true },
      { id: 'vanilla', label: 'Vanilla', available: true },
      { id: 'sandalwood', label: 'Sandalwood', available: true },
      { id: 'oceanbreeze', label: 'Ocean Breeze', available: true },
      { id: 'berrybliss', label: 'Berry Bliss', available: true },
      { id: 'redwine', label: 'Red Wine', available: true },
      { id: 'lemongrass', label: 'Lemongrass', available: true },
      { id: 'lemon&levender', label: 'Lemon & Levender', available: true },
      { id: 'cranberry', label: 'Cranberry', available: true },
    ]
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