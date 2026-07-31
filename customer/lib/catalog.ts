export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  stock: number;
  ingredients: string;
  benefits: string[];
  weight: string;
  sku: string;
};

export const products: Product[] = [
  { id: 'vel-001', slug: 'veloura-instant-coffee', name: 'Veloura Instant Coffee', brand: 'VELOURA®', category: 'Instant Coffee', description: 'A smooth, aromatic instant coffee for an effortless premium cup.', price: 299, mrp: 349, rating: 4.8, reviews: 126, stock: 24, ingredients: '100% soluble coffee.', benefits: ['Rich aroma', 'Quick to prepare', 'No added preservatives'], weight: '100 g', sku: 'VEL-IC-100' },
  { id: 'vel-002', slug: 'veloura-coffee-premix', name: 'Veloura Coffee Premix', brand: 'VELOURA®', category: 'Coffee Premixes', description: 'Balanced coffee premix with a creamy, café-style finish.', price: 249, mrp: 299, rating: 4.6, reviews: 74, stock: 8, ingredients: 'Coffee, milk solids, sugar.', benefits: ['Convenient single serves', 'Creamy taste', 'Travel friendly'], weight: '10 sachets', sku: 'VEL-CP-10' },
  { id: 'mas-001', slug: 'masala-matka-mango-pickle', name: 'Masala Matka Mango Pickle', brand: 'Masala Matka®', category: 'Pickles', description: 'Traditional mango pickle made with bold, familiar Indian spices.', price: 199, mrp: 225, rating: 4.9, reviews: 203, stock: 32, ingredients: 'Mango, edible oil, salt, spices.', benefits: ['Traditional recipe', 'Bold flavour', 'Vegetarian'], weight: '400 g', sku: 'MM-MP-400' },
  { id: 'mas-002', slug: 'masala-matka-garlic-chutney', name: 'Masala Matka Garlic Chutney', brand: 'Masala Matka®', category: 'Chutneys', description: 'A lively garlic chutney that adds instant character to every meal.', price: 179, mrp: 199, rating: 4.7, reviews: 91, stock: 3, ingredients: 'Garlic, chilli, sesame, salt, oil.', benefits: ['Authentic taste', 'Ready to serve', 'Versatile pairing'], weight: '200 g', sku: 'MM-GC-200' },
  { id: 'vel-003', slug: 'veloura-gift-pack', name: 'Veloura Coffee Gift Pack', brand: 'VELOURA®', category: 'Gift Packs', description: 'A thoughtful coffee selection for festive gifting and celebrations.', price: 599, mrp: 699, rating: 4.8, reviews: 42, stock: 12, ingredients: 'Curated coffee products.', benefits: ['Gift-ready pack', 'Premium selection', 'Festive favourite'], weight: '3 products', sku: 'VEL-GP-03' },
  { id: 'mas-003', slug: 'masala-matka-regional-combo', name: 'Masala Matka Regional Combo', brand: 'Masala Matka®', category: 'Regional Specialties', description: 'A discovery box of distinctive regional flavours for the dining table.', price: 449, mrp: 525, rating: 4.5, reviews: 36, stock: 0, ingredients: 'Assorted regional preparations.', benefits: ['Regional flavours', 'Curated combo', 'Great for sharing'], weight: '3 jars', sku: 'MM-RC-03' },
];

export const categories = ['All Products', 'Instant Coffee', 'HORECA Coffee', 'Coffee Premixes', 'Gift Packs', 'Pickles', 'Chutneys', 'Regional Specialties', 'Functional Foods', 'Nutraceuticals', 'Beverages', 'Health Foods', 'Seasonal Products'];
  