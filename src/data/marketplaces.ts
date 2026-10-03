export interface MarketplaceMeta {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  brandColor: string;
  accentBg: string;
  commissionSummary: string;
  closingFeeDescription: string;
  shippingModel: string;
  defaultRtoRate: number; // typical RTO % in India
  defaultReturnRate: number; // typical customer return % in India
}

export const MARKETPLACES: Record<string, MarketplaceMeta> = {
  meesho: {
    id: 'meesho',
    name: 'Meesho',
    tagline: 'Zero Commission Social Commerce',
    badge: '0% Commission',
    brandColor: '#db2777', // pink-600
    accentBg: '#fdf2f8',
    commissionSummary: '0% Referral Fee across almost all categories',
    closingFeeDescription: '₹0 Fixed Closing Fee',
    shippingModel: 'Weight slab based (starts ₹49 for 500g)',
    defaultRtoRate: 20, // 20% RTO is very standard on Meesho COD
    defaultReturnRate: 10, // 10% Customer Return
  },
  flipkart: {
    id: 'flipkart',
    name: 'Flipkart',
    tagline: 'India’s Largest Local Marketplace',
    badge: '4% – 16% Commission',
    brandColor: '#2563eb', // blue-600
    accentBg: '#eff6ff',
    commissionSummary: '4% to 16% Category referral fee',
    closingFeeDescription: 'Slab-based Fixed Fee (₹13 to ₹52 based on price)',
    shippingModel: 'Tier-based (Bronze/Silver/Gold) + Local/Regional/National',
    defaultRtoRate: 15,
    defaultReturnRate: 8,
  },
  amazon: {
    id: 'amazon',
    name: 'Amazon India',
    tagline: 'Prime & Easy Ship Network',
    badge: '5% – 15% Commission',
    brandColor: '#d97706', // amber-600
    accentBg: '#fffbeb',
    commissionSummary: '5% to 15% Referral Fee based on category',
    closingFeeDescription: 'Automatic Closing Fee slabs (₹5 to ₹50)',
    shippingModel: 'Easy Ship weight handling (Local ₹44, Reg ₹53, Nat ₹74)',
    defaultRtoRate: 12,
    defaultReturnRate: 7,
  },
  snapdeal: {
    id: 'snapdeal',
    name: 'Snapdeal',
    tagline: 'Value E-Commerce Platform',
    badge: '0% – 10% Commission',
    brandColor: '#dc2626', // red-600
    accentBg: '#fef2f2',
    commissionSummary: '0% to 10% Commission on value products',
    closingFeeDescription: '₹10 Flat Closing Fee',
    shippingModel: 'Standard courier delivery (₹55 base)',
    defaultRtoRate: 22,
    defaultReturnRate: 9,
  },
};

/**
 * Amazon Closing Fee Slabs (2025/2026 Easy Ship Standard)
 */
export function getAmazonClosingFee(sellingPrice: number): number {
  if (sellingPrice <= 250) return 5;
  if (sellingPrice <= 500) return 10;
  if (sellingPrice <= 1000) return 25;
  if (sellingPrice <= 2000) return 35;
  return 50;
}

/**
 * Flipkart Fixed Fee Slabs (Non-FBF Standard)
 */
export function getFlipkartFixedFee(sellingPrice: number): number {
  if (sellingPrice <= 300) return 13;
  if (sellingPrice <= 500) return 17;
  if (sellingPrice <= 1000) return 30;
  return 52;
}

/**
 * Standard Indian Courier Shipping Calculation
 */
export function calculateShippingFee(
  marketplace: string,
  weightGrams: number,
  zone: 'local' | 'regional' | 'national' = 'national'
): number {
  const weightKg = Math.max(1, Math.ceil(weightGrams / 500)) * 0.5; // 500g increments

  if (marketplace === 'meesho') {
    // Meesho shipping slabs: 500g: ₹49, 1kg: ₹85, 1.5kg: ₹125, +₹40 per 500g
    if (weightGrams <= 500) return 49;
    if (weightGrams <= 1000) return 85;
    if (weightGrams <= 1500) return 125;
    const extra500g = Math.ceil((weightGrams - 1500) / 500);
    return 125 + extra500g * 40;
  }

  if (marketplace === 'amazon') {
    // Amazon Easy Ship Standard
    // 500g: Local ₹44, Regional ₹53, National ₹74
    // Each additional 500g up to 1kg: Local +₹25, Regional +₹30, National +₹36
    let base = zone === 'local' ? 44 : zone === 'regional' ? 53 : 74;
    let addl = zone === 'local' ? 25 : zone === 'regional' ? 30 : 36;
    if (weightGrams <= 500) return base;
    const extra500g = Math.ceil((weightGrams - 500) / 500);
    return base + extra500g * addl;
  }

  if (marketplace === 'flipkart') {
    // Flipkart Standard
    // 500g: Local ₹44, Regional ₹54, National ₹69
    // Additional 500g: Local +₹22, Regional +₹26, National +₹32
    let base = zone === 'local' ? 44 : zone === 'regional' ? 54 : 69;
    let addl = zone === 'local' ? 22 : zone === 'regional' ? 26 : 32;
    if (weightGrams <= 500) return base;
    const extra500g = Math.ceil((weightGrams - 500) / 500);
    return base + extra500g * addl;
  }

  // Generic / Snapdeal fallback
  let base = 55;
  if (weightGrams <= 500) return base;
  return base + Math.ceil((weightGrams - 500) / 500) * 35;
}
