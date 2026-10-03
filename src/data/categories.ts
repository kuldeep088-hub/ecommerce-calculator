export interface CategoryFee {
  id: string;
  name: string;
  defaultGst: number;
  amazonCommission: number;
  flipkartCommission: number;
  meeshoCommission: number;
  snapdealCommission: number;
}

export const CATEGORIES: CategoryFee[] = [
  {
    id: 'fashion',
    name: 'Fashion & Apparel (Clothing, Ethnic wear)',
    defaultGst: 12,
    amazonCommission: 13.5,
    flipkartCommission: 15.0,
    meeshoCommission: 0,
    snapdealCommission: 5.0,
  },
  {
    id: 'footwear',
    name: 'Footwear & Shoes',
    defaultGst: 12,
    amazonCommission: 12.0,
    flipkartCommission: 14.0,
    meeshoCommission: 0,
    snapdealCommission: 6.0,
  },
  {
    id: 'electronics_accessories',
    name: 'Electronics Accessories (Cables, Chargers, Cases)',
    defaultGst: 18,
    amazonCommission: 14.0,
    flipkartCommission: 12.5,
    meeshoCommission: 0,
    snapdealCommission: 8.0,
  },
  {
    id: 'home_kitchen',
    name: 'Home & Kitchen Utilities',
    defaultGst: 18,
    amazonCommission: 10.5,
    flipkartCommission: 11.0,
    meeshoCommission: 0,
    snapdealCommission: 7.0,
  },
  {
    id: 'beauty_grooming',
    name: 'Beauty, Skincare & Grooming',
    defaultGst: 18,
    amazonCommission: 8.5,
    flipkartCommission: 9.0,
    meeshoCommission: 0,
    snapdealCommission: 6.0,
  },
  {
    id: 'jewellery_fashion',
    name: 'Fashion & Artificial Jewellery',
    defaultGst: 3,
    amazonCommission: 15.0,
    flipkartCommission: 16.0,
    meeshoCommission: 0,
    snapdealCommission: 8.0,
  },
  {
    id: 'grocery_fmcg',
    name: 'Packaged Grocery & Snacks',
    defaultGst: 5,
    amazonCommission: 6.0,
    flipkartCommission: 6.5,
    meeshoCommission: 0,
    snapdealCommission: 4.0,
  },
  {
    id: 'toys_baby',
    name: 'Toys, Games & Baby Care',
    defaultGst: 12,
    amazonCommission: 9.5,
    flipkartCommission: 10.5,
    meeshoCommission: 0,
    snapdealCommission: 6.0,
  },
  {
    id: 'books',
    name: 'Books & Stationery',
    defaultGst: 0,
    amazonCommission: 8.0,
    flipkartCommission: 9.0,
    meeshoCommission: 0,
    snapdealCommission: 5.0,
  },
  {
    id: 'custom',
    name: 'Custom / Other Category',
    defaultGst: 18,
    amazonCommission: 10.0,
    flipkartCommission: 10.0,
    meeshoCommission: 0,
    snapdealCommission: 5.0,
  },
];
