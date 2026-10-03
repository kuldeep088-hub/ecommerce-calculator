import { CATEGORIES } from '../data/categories';
import {
  MARKETPLACES,
  getAmazonClosingFee,
  getFlipkartFixedFee,
  calculateShippingFee,
} from '../data/marketplaces';

export interface CalculatorInputs {
  marketplace: string;
  category: string;
  sellingPrice: number;
  costOfGoods: number;
  packagingCost: number;
  adSpend: number;
  weightGrams: number;
  shippingZone: 'local' | 'regional' | 'national';
  productGstRate: number;
  gstOnFeesRate: number;
  // Overrides if user customizes
  customCommission?: number;
  customFixedFee?: number;
  customShippingFee?: number;
  // Return simulation inputs
  rtoRate: number; // e.g. 15%
  customerReturnRate: number; // e.g. 8%
  customerReturnReverseCost: number; // e.g. 120
}

export interface CalculationBreakdown {
  sellingPrice: number;
  taxableValue: number;
  productGst: number;
  commissionRate: number;
  commissionAmount: number;
  fixedFee: number;
  collectionFee: number;
  shippingFee: number;
  totalMarketplaceFeesExGst: number;
  gstOnFees: number;
  tcsTdsDeductions: number; // 1% TCS + 0.1% TDS
  totalMarketplaceDeduction: number;
  // Delivered order economics
  bankSettlement: number;
  totalDeliveredCost: number;
  deliveredNetProfit: number;
  deliveredProfitMargin: number; // percentage of selling price
  // Return & RTO loss analysis
  rtoLossPerOrder: number;
  customerReturnLossPerOrder: number;
  blendedNetProfitPerDispatch: number;
  blendedProfitMargin: number;
  isBlendedProfitable: boolean;
  // Waterfall percentages
  cogsPercent: number;
  marketplaceFeePercent: number;
  shippingPercent: number;
  taxesPercent: number;
  packagingAndAdPercent: number;
  returnLossBufferPercent: number;
  netProfitPercent: number;
}

export function calculateProfit(inputs: CalculatorInputs): CalculationBreakdown {
  const {
    marketplace,
    category,
    sellingPrice = 0,
    costOfGoods = 0,
    packagingCost = 0,
    adSpend = 0,
    weightGrams = 500,
    shippingZone = 'national',
    productGstRate = 12,
    gstOnFeesRate = 18,
    rtoRate = 15,
    customerReturnRate = 8,
    customerReturnReverseCost = 130,
  } = inputs;

  const sp = Math.max(0, sellingPrice);
  const cogs = Math.max(0, costOfGoods);
  const pkg = Math.max(0, packagingCost);
  const ads = Math.max(0, adSpend);

  // 1. Taxable Value & Product GST
  const taxableValue = sp > 0 ? sp / (1 + productGstRate / 100) : 0;
  const productGst = sp - taxableValue;

  // 2. Marketplace commission
  const categoryData = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
  let commissionRate = 0;
  if (inputs.customCommission !== undefined) {
    commissionRate = inputs.customCommission;
  } else {
    if (marketplace === 'meesho') commissionRate = categoryData.meeshoCommission;
    else if (marketplace === 'flipkart') commissionRate = categoryData.flipkartCommission;
    else if (marketplace === 'amazon') commissionRate = categoryData.amazonCommission;
    else commissionRate = categoryData.snapdealCommission;
  }
  const commissionAmount = taxableValue * (commissionRate / 100);

  // 3. Fixed / Closing Fee
  let fixedFee = 0;
  if (inputs.customFixedFee !== undefined) {
    fixedFee = inputs.customFixedFee;
  } else {
    if (marketplace === 'amazon') {
      fixedFee = getAmazonClosingFee(sp);
    } else if (marketplace === 'flipkart') {
      fixedFee = getFlipkartFixedFee(sp);
    } else if (marketplace === 'meesho') {
      fixedFee = 0;
    } else {
      fixedFee = 10;
    }
  }

  // 4. Collection Fee (2% for Flipkart/Amazon payment gateway, 0 for Meesho)
  let collectionFee = 0;
  if (marketplace === 'flipkart' || marketplace === 'amazon') {
    collectionFee = sp * 0.02; // 2% gateway collection fee
  }

  // 5. Shipping Fee
  let shippingFee = 0;
  if (inputs.customShippingFee !== undefined) {
    shippingFee = inputs.customShippingFee;
  } else {
    shippingFee = calculateShippingFee(marketplace, weightGrams, shippingZone);
  }

  // 6. Marketplace Subtotal Fees and GST on Fees
  const totalMarketplaceFeesExGst =
    commissionAmount + fixedFee + collectionFee + shippingFee;
  const gstOnFees = totalMarketplaceFeesExGst * (gstOnFeesRate / 100);

  // 7. TCS (1%) & TDS u/s 194-O (0.1%)
  const tcsTdsDeductions = taxableValue * 0.011; // 1.1% of taxable value

  // 8. Total Marketplace Deduction
  const totalMarketplaceDeduction =
    totalMarketplaceFeesExGst + gstOnFees + tcsTdsDeductions;

  // 9. Bank Settlement
  const bankSettlement = Math.max(0, sp - totalMarketplaceDeduction);

  // 10. Net Profit on Delivered Order
  // Net in hand = Bank Settlement - COGS - Packaging - Ads - Product GST liability (ignoring ITC)
  // Or in true financial terms: Taxable Value - COGS - Total Marketplace Fees - Packaging - Ads
  const deliveredNetProfit =
    taxableValue - cogs - totalMarketplaceFeesExGst - pkg - ads;
  const deliveredProfitMargin = sp > 0 ? (deliveredNetProfit / sp) * 100 : 0;
  const totalDeliveredCost = sp - deliveredNetProfit;

  // 11. RTO & Customer Return Economics
  // RTO Order: Item undelivered, returns to warehouse.
  // Seller loses forward courier charges (if not compensated) + ruined packaging + tape.
  const rtoCourierLoss = marketplace === 'meesho' ? 0 : shippingFee; // Meesho doesn't penalize courier on RTO
  const rtoPackagingLoss = pkg + 10; // packaging destroyed
  const rtoLossPerOrder = rtoCourierLoss + rtoPackagingLoss;

  // Customer Return: Item accepted by buyer, opened, then returned.
  // Seller pays return reverse courier (₹120-150) + forward shipping + damaged packaging + 5% product depreciation
  const customerReturnCourierLoss = customerReturnReverseCost;
  const customerReturnDamageLoss = pkg + 15 + cogs * 0.05;
  const customerReturnLossPerOrder =
    customerReturnCourierLoss + customerReturnDamageLoss;

  // Blended net profit per dispatched order:
  const deliveredRate = Math.max(0, 100 - rtoRate - customerReturnRate) / 100;
  const rtoFraction = Math.max(0, rtoRate) / 100;
  const returnFraction = Math.max(0, customerReturnRate) / 100;

  const blendedNetProfitPerDispatch =
    deliveredNetProfit * deliveredRate -
    rtoLossPerOrder * rtoFraction -
    customerReturnLossPerOrder * returnFraction;

  const blendedProfitMargin =
    sp > 0 ? (blendedNetProfitPerDispatch / sp) * 100 : 0;
  const isBlendedProfitable = blendedNetProfitPerDispatch > 0;

  // 12. Waterfall Percentages for UI
  const cogsPercent = sp > 0 ? (cogs / sp) * 100 : 0;
  const marketplaceFeePercent =
    sp > 0 ? ((commissionAmount + fixedFee + collectionFee) / sp) * 100 : 0;
  const shippingPercent = sp > 0 ? (shippingFee / sp) * 100 : 0;
  const taxesPercent = sp > 0 ? ((productGst + gstOnFees) / sp) * 100 : 0;
  const packagingAndAdPercent = sp > 0 ? ((pkg + ads) / sp) * 100 : 0;
  const returnLossBufferPercent =
    sp > 0
      ? ((rtoLossPerOrder * rtoFraction +
          customerReturnLossPerOrder * returnFraction) /
          sp) *
        100
      : 0;
  const netProfitPercent = sp > 0 ? blendedProfitMargin : 0;

  return {
    sellingPrice: sp,
    taxableValue,
    productGst,
    commissionRate,
    commissionAmount,
    fixedFee,
    collectionFee,
    shippingFee,
    totalMarketplaceFeesExGst,
    gstOnFees,
    tcsTdsDeductions,
    totalMarketplaceDeduction,
    bankSettlement,
    totalDeliveredCost,
    deliveredNetProfit,
    deliveredProfitMargin,
    rtoLossPerOrder,
    customerReturnLossPerOrder,
    blendedNetProfitPerDispatch,
    blendedProfitMargin,
    isBlendedProfitable,
    cogsPercent,
    marketplaceFeePercent,
    shippingPercent,
    taxesPercent,
    packagingAndAdPercent,
    returnLossBufferPercent,
    netProfitPercent,
  };
}

/**
 * Solve for Target Selling Price given a desired profit or margin %
 */
export function solveTargetSellingPrice(
  baseInputs: Omit<CalculatorInputs, 'sellingPrice'>,
  targetType: 'fixed_profit' | 'margin_percent',
  targetValue: number
): number {
  let low = Math.max(1, baseInputs.costOfGoods);
  let high = low * 10 + 2000;
  let bestPrice = low;

  // Binary search for accurate price point
  for (let i = 0; i < 35; i++) {
    const mid = (low + high) / 2;
    const result = calculateProfit({ ...baseInputs, sellingPrice: mid });

    const currentMetric =
      targetType === 'fixed_profit'
        ? result.blendedNetProfitPerDispatch
        : result.blendedProfitMargin;

    if (Math.abs(currentMetric - targetValue) < 0.2) {
      return Math.round(mid);
    }

    if (currentMetric < targetValue) {
      low = mid;
    } else {
      high = mid;
      bestPrice = mid;
    }
  }

  return Math.round(bestPrice);
}
