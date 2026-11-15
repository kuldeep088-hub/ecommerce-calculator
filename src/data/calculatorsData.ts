// src/data/calculatorsData.ts

export interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'range';
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  hint?: string;
  options?: { label: string; value: string | number }[];
}

export interface CalculatorBreakdownItem {
  id: string;
  label: string;
  prefix?: string;
  suffix?: string;
  isTotal?: boolean;
  isNegative?: boolean;
}

export interface CalculatorDefinition {
  slug: string;
  category: 'marketplaces' | 'profit' | 'shipping' | 'gst' | 'fees' | 'advertising' | 'operations';
  categoryLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  subtitle: string;
  formulaDescription: string;
  inputs: CalculatorField[];
  heroKpi: {
    label: string;
    subLabel: string;
    prefix?: string;
    suffix?: string;
    badgeLabel?: string;
  };
  breakdown: CalculatorBreakdownItem[];
  tipTitle: string;
  tipText: string;
  faqs: { q: string; a: string }[];
  calcType: string; // Identifier for client calculation formula
}

export const CALCULATORS_CATALOG: CalculatorDefinition[] = [
  // ==========================================
  // 1. MARKETPLACE PROFIT CALCULATORS
  // ==========================================
  {
    slug: 'amazon-fba-calculator',
    category: 'marketplaces',
    categoryLabel: 'Marketplaces',
    title: 'Amazon FBA Profit Calculator',
    metaTitle: 'Amazon FBA Profit Calculator (2026) | Fulfillment by Amazon Fee & Profit Calculator',
    metaDescription: 'Calculate exact Amazon India FBA net profit, referral fees, closing fee slabs, FBA weight handling pick & pack, storage fees, and 18% GST.',
    badge: 'Amazon FBA 2026',
    subtitle: 'Model fulfillment by Amazon (FBA) storage, pick & pack fees, referral commissions, and true take-home margins.',
    formulaDescription: 'Net FBA Profit = Selling Price - COGS - (Referral + Closing + FBA Weight Handling + Storage) - 18% GST on Fees - TCS/TDS',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 899, prefix: '₹' },
      { id: 'cogs', label: 'Product Cost (COGS)', type: 'number', defaultValue: 300, prefix: '₹' },
      { id: 'commRate', label: 'Category Referral Fee %', type: 'number', defaultValue: 13.5, suffix: '%' },
      { id: 'fbaPickPack', label: 'FBA Pick & Pack Handling Fee', type: 'number', defaultValue: 45, prefix: '₹' },
      { id: 'fbaStorage', label: 'Monthly FBA Storage / Unit', type: 'number', defaultValue: 15, prefix: '₹' },
      { id: 'weightGrams', label: 'Product Weight (Grams)', type: 'number', defaultValue: 500, suffix: 'g' }
    ],
    heroKpi: { label: 'Net In-Hand FBA Profit', subLabel: 'take-home per delivered unit', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Customer Selling Price', prefix: '₹' },
      { id: 'bdReferral', label: 'Amazon Referral Fee', prefix: '- ₹', isNegative: true },
      { id: 'bdClosing', label: 'Closing Fee Slab', prefix: '- ₹', isNegative: true },
      { id: 'bdFbaFulfillment', label: 'FBA Weight Handling & Pick-Pack', prefix: '- ₹', isNegative: true },
      { id: 'bdStorage', label: 'Storage Fee / Unit', prefix: '- ₹', isNegative: true },
      { id: 'bdGstFees', label: '18% GST on Amazon Fees (ITC Claimable)', prefix: '- ₹', isNegative: true },
      { id: 'bdCogs', label: 'Product Cost (COGS)', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Final Net In-Hand Profit', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'FBA Advantage:',
    tipText: 'FBA products get the Prime badge, which increases conversion rates by 3x and cuts customer return rejections compared to self-ship.',
    faqs: [
      { q: 'How does Amazon FBA calculate weight handling fees?', a: 'Amazon charges based on 500g increments. Local FBA starts at ₹35, Regional at ₹45, and National at ₹65 for the first 500g.' },
      { q: 'Can sellers claim 18% GST on Amazon FBA fees?', a: 'Yes! All 18% GST charged by Amazon on FBA fees, closing charges, and referral commission is 100% claimable as Input Tax Credit (ITC) in GSTR-3B.' }
    ],
    calcType: 'amazon_fba'
  },
  {
    slug: 'amazon-fbm-calculator',
    category: 'marketplaces',
    categoryLabel: 'Marketplaces',
    title: 'Amazon FBM (Merchant Fulfilled) Calculator',
    metaTitle: 'Amazon FBM Profit Calculator (2026) | Self-Ship & Easy Ship Fee Calculator',
    metaDescription: 'Calculate net seller profit for Amazon Fulfillment by Merchant (FBM). Factor self-ship courier charges, polybag packaging, and referral fees.',
    badge: 'Amazon Self-Ship & FBM',
    subtitle: 'Model Merchant Fulfilled Network (MFN / Self-Ship) courier shipping, warehouse packaging, and Amazon commissions.',
    formulaDescription: 'Net FBM Profit = Selling Price - COGS - Merchant Shipping - Referral Fee - Closing Fee - Packaging - Taxes',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 699, prefix: '₹' },
      { id: 'cogs', label: 'Product Cost (COGS)', type: 'number', defaultValue: 240, prefix: '₹' },
      { id: 'commRate', label: 'Category Referral Fee %', type: 'number', defaultValue: 12.0, suffix: '%' },
      { id: 'shippingCost', label: 'Self-Ship Courier Charge', type: 'number', defaultValue: 60, prefix: '₹' },
      { id: 'packagingCost', label: 'Packaging Box & Label', type: 'number', defaultValue: 15, prefix: '₹' }
    ],
    heroKpi: { label: 'Net Take-Home FBM Profit', subLabel: 'per self-shipped order', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Selling Price', prefix: '₹' },
      { id: 'bdReferral', label: 'Referral Fee', prefix: '- ₹', isNegative: true },
      { id: 'bdClosing', label: 'Closing Fee', prefix: '- ₹', isNegative: true },
      { id: 'bdCourier', label: 'Self-Ship Courier', prefix: '- ₹', isNegative: true },
      { id: 'bdPkg', label: 'Packaging Materials', prefix: '- ₹', isNegative: true },
      { id: 'bdCogs', label: 'Product Cost', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net Merchant Profit', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'FBM Best Practice:',
    tipText: 'FBM saves on Amazon storage fees for slow-moving or bulky products, but requires diligent shipping dispatch within 24 hours to maintain seller account health.',
    faqs: [
      { q: 'What is the difference between Amazon FBA and FBM?', a: 'Under FBA, Amazon stores, packs, and ships your orders. Under FBM, you store inventory in your own warehouse and ship via your own couriers or Easy Ship.' }
    ],
    calcType: 'amazon_fbm'
  },
  {
    slug: 'ajio',
    category: 'marketplaces',
    categoryLabel: 'Marketplaces',
    title: 'AJIO Seller Profit Calculator',
    metaTitle: 'AJIO Seller Profit Calculator (2026) | Reliance Fashion Marketplace Fee Calculator',
    metaDescription: 'Calculate AJIO seller payout, fashion commission rates (15%-28%), courier shipping, return buffers, and net in-hand profit for 2026.',
    badge: 'AJIO Fashion Slabs',
    subtitle: 'Model Reliance AJIO category commissions, order processing fees, and fashion return penalties.',
    formulaDescription: 'Net AJIO Profit = Selling Price - COGS - AJIO Commission (15-28%) - Fixed/Shipping Fees - Return Penalty Buffer',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 1199, prefix: '₹' },
      { id: 'cogs', label: 'Product Cost (COGS)', type: 'number', defaultValue: 420, prefix: '₹' },
      { id: 'commRate', label: 'AJIO Category Commission %', type: 'number', defaultValue: 20.0, suffix: '%' },
      { id: 'shippingCost', label: 'AJIO Shipping & Logistics Fee', type: 'number', defaultValue: 70, prefix: '₹' },
      { id: 'returnRate', label: 'Customer Return Rate %', type: 'number', defaultValue: 25.0, suffix: '%' }
    ],
    heroKpi: { label: 'Net Take-Home AJIO Profit', subLabel: 'per dispatched order', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Customer Selling Price', prefix: '₹' },
      { id: 'bdCommission', label: 'AJIO Commission (20%)', prefix: '- ₹', isNegative: true },
      { id: 'bdShipping', label: 'Shipping & Logistics Fee', prefix: '- ₹', isNegative: true },
      { id: 'bdGstFees', label: '18% GST on AJIO Fees', prefix: '- ₹', isNegative: true },
      { id: 'bdCogs', label: 'Product Cost (COGS)', prefix: '- ₹', isNegative: true },
      { id: 'bdReturnBuffer', label: 'Return Loss Allowance', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net Realized Profit', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Fashion Marketplace Note:',
    tipText: 'AJIO buyers frequently order multiple sizes and return ill-fitting items. Budget at least 25% for reverse logistics and polybag repackaging.',
    faqs: [
      { q: 'How much commission does AJIO charge?', a: 'AJIO commissions typically range from 18% to 28% for apparel, footwear, and fashion accessories.' }
    ],
    calcType: 'ajio'
  },
  {
    slug: 'jiomart',
    category: 'marketplaces',
    categoryLabel: 'Marketplaces',
    title: 'JioMart Seller Profit Calculator',
    metaTitle: 'JioMart Seller Profit Calculator (2026) | Grocery & Consumer Marketplace Fee Calculator',
    metaDescription: 'Calculate JioMart seller settlement payouts, category commissions (3%-15%), delivery charges, and true net take-home profit.',
    badge: 'JioMart 2026 Slabs',
    subtitle: 'Model JioMart seller commissions, delivery fees, and grocery/general merchandise profit margins.',
    formulaDescription: 'Net JioMart Profit = Selling Price - COGS - Commission - Delivery Fee - 18% GST on Fees',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 549, prefix: '₹' },
      { id: 'cogs', label: 'Product Cost (COGS)', type: 'number', defaultValue: 260, prefix: '₹' },
      { id: 'commRate', label: 'JioMart Commission %', type: 'number', defaultValue: 8.0, suffix: '%' },
      { id: 'shippingCost', label: 'Delivery / Courier Fee', type: 'number', defaultValue: 45, prefix: '₹' }
    ],
    heroKpi: { label: 'JioMart Net Profit', subLabel: 'take-home per unit', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Selling Price', prefix: '₹' },
      { id: 'bdCommission', label: 'JioMart Commission', prefix: '- ₹', isNegative: true },
      { id: 'bdShipping', label: 'Delivery Fee', prefix: '- ₹', isNegative: true },
      { id: 'bdGstFees', label: '18% GST on Fees', prefix: '- ₹', isNegative: true },
      { id: 'bdCogs', label: 'Product Cost', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net Realized Profit', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'JioMart Hyperlocal Opportunity:',
    tipText: 'JioMart combines online orders with Reliance Retail store pickup and local delivery, reducing shipping transit times and courier damages.',
    faqs: [
      { q: 'What is JioMart commission on FMCG and grocery?', a: 'JioMart charges lower commissions on grocery and staples (3% to 6%) and standard commissions on electronics and lifestyle (8% to 14%).' }
    ],
    calcType: 'jiomart'
  },
  {
    slug: 'shopify-profit-calculator',
    category: 'marketplaces',
    categoryLabel: 'Marketplaces',
    title: 'Shopify Store Profit Calculator',
    metaTitle: 'Shopify Profit Calculator (2026) | D2C E-Commerce Store Margin & Fee Calculator',
    metaDescription: 'Calculate exact net profit for your Shopify D2C store. Factor in Meta/Google ad spend (CAC), payment gateway fees (2%), courier shipping, and returns.',
    badge: 'Shopify & D2C',
    subtitle: 'Model direct-to-consumer store economics: zero marketplace commissions, but factoring Meta/Google ad spend and gateway fees.',
    formulaDescription: 'Shopify Net Profit = Selling Price - COGS - Ad CAC - Shipping - Gateway Fee (2%) - Packaging - Return Loss',
    inputs: [
      { id: 'price', label: 'Store Listed Price', type: 'number', defaultValue: 999, prefix: '₹' },
      { id: 'cogs', label: 'Product Cost (COGS)', type: 'number', defaultValue: 320, prefix: '₹' },
      { id: 'adSpend', label: 'Ad Spend Per Order (CAC)', type: 'number', defaultValue: 250, prefix: '₹' },
      { id: 'shippingCost', label: 'Courier Shipping (Shiprocket/Delhivery)', type: 'number', defaultValue: 65, prefix: '₹' },
      { id: 'pgFeeRate', label: 'Payment Gateway Fee % (Razorpay/Cashfree)', type: 'number', defaultValue: 2.0, suffix: '%' },
      { id: 'packagingCost', label: 'Packaging Box & Flyer', type: 'number', defaultValue: 18, prefix: '₹' }
    ],
    heroKpi: { label: 'Net Take-Home Store Profit', subLabel: 'after ads, courier & gateway', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Customer Order Price', prefix: '₹' },
      { id: 'bdAdSpend', label: 'Meta/Google Ad Spend (CAC)', prefix: '- ₹', isNegative: true },
      { id: 'bdCourier', label: 'Courier Shipping Fee', prefix: '- ₹', isNegative: true },
      { id: 'bdPgFee', label: 'Payment Gateway Fee (2%)', prefix: '- ₹', isNegative: true },
      { id: 'bdPkg', label: 'Packaging Material', prefix: '- ₹', isNegative: true },
      { id: 'bdCogs', label: 'Product Cost (COGS)', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net Profit Per Order', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'D2C Profit Rule:',
    tipText: 'Unlike Amazon where marketplace commissions are fixed at 15%, on Shopify your primary expense is Customer Acquisition Cost (CAC). Keep Ad Spend under 30% of order price.',
    faqs: [
      { q: 'Does Shopify charge transaction fees in India?', a: 'Shopify charges 0.5% to 2% transaction fees unless using supported third-party gateways like Razorpay, Cashfree, or PayU.' }
    ],
    calcType: 'shopify'
  },

  // ==========================================
  // 2. SELLER COST & PROFIT CALCULATORS
  // ==========================================
  {
    slug: 'profit-margin-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'E-commerce Profit Margin Calculator',
    metaTitle: 'E-Commerce Profit Margin Calculator | Calculate Gross & Net Profit Margin %',
    metaDescription: 'Free profit margin calculator for online sellers. Calculate gross margin %, net profit margin %, and profit markup instantly.',
    badge: 'Core Profit Metric',
    subtitle: 'Find your exact profit margin percentage across all selling prices and operating expenses.',
    formulaDescription: 'Net Profit Margin % = ((Selling Price - Total Cost) / Selling Price) * 100',
    inputs: [
      { id: 'price', label: 'Selling Price (Revenue)', type: 'number', defaultValue: 1200, prefix: '₹' },
      { id: 'cogs', label: 'Cost of Goods Sold (COGS)', type: 'number', defaultValue: 450, prefix: '₹' },
      { id: 'otherCost', label: 'Shipping, Fees & Marketing Costs', type: 'number', defaultValue: 350, prefix: '₹' }
    ],
    heroKpi: { label: 'Net Profit Margin', subLabel: 'of total selling price', suffix: '%' },
    breakdown: [
      { id: 'bdRevenue', label: 'Total Revenue (Price)', prefix: '₹' },
      { id: 'bdCogs', label: 'Product Cost (COGS)', prefix: '- ₹', isNegative: true },
      { id: 'bdOther', label: 'Operating Costs (Fees, Shipping)', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net In-Hand Profit Amount', prefix: '₹', isTotal: true },
      { id: 'bdMarkup', label: 'Equivalent Profit Markup %', suffix: '%' }
    ],
    tipTitle: 'Margin vs Markup:',
    tipText: 'Margin is profit divided by selling price. Markup is profit divided by cost. A 33% profit margin requires a 50% markup on your cost.',
    faqs: [
      { q: 'What is a healthy profit margin for e-commerce in India?', a: 'A healthy net profit margin for Indian marketplace sellers is 15% to 25% after factoring in all returns, marketplace deductions, and shipping.' }
    ],
    calcType: 'profit_margin'
  },
  {
    slug: 'selling-price-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Product Selling Price Calculator',
    metaTitle: 'Product Selling Price Calculator | Find Required MRP for Desired Profit',
    metaDescription: 'Calculate the exact selling price and MRP to list on Meesho, Flipkart, and Amazon to guarantee your desired target profit margin.',
    badge: 'Pricing Strategy',
    subtitle: 'Input your product acquisition costs and desired profit margin to calculate the required customer listing price.',
    formulaDescription: 'Selling Price = Total Cost / (1 - Target Margin % / 100)',
    inputs: [
      { id: 'cogs', label: 'Product Cost (COGS)', type: 'number', defaultValue: 350, prefix: '₹' },
      { id: 'expenses', label: 'Courier Shipping & Packaging', type: 'number', defaultValue: 90, prefix: '₹' },
      { id: 'targetMargin', label: 'Desired Net Margin %', type: 'number', defaultValue: 25.0, suffix: '%' }
    ],
    heroKpi: { label: 'Required Selling Price', subLabel: 'minimum customer price to list', prefix: '₹' },
    breakdown: [
      { id: 'bdTotalCost', label: 'Total Product & Shipping Cost', prefix: '₹' },
      { id: 'bdTargetProfit', label: 'Target In-Hand Profit', prefix: '+ ₹' },
      { id: 'bdSellingPrice', label: 'Calculated Minimum Listing Price', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Pricing Tip:',
    tipText: 'Always round up to psychological price points (e.g., ₹599 instead of ₹584) to maximize perceived customer value and profit margin.',
    faqs: [
      { q: 'How do marketplace deductions affect my selling price?', a: 'Because marketplace commissions and payment fees are percentages of the final selling price, you must divide costs by (1 - total fee %) rather than just adding fees to cost.' }
    ],
    calcType: 'selling_price'
  },
  {
    slug: 'product-cost-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Product Cost (COGS) Calculator',
    metaTitle: 'Product Cost Calculator (COGS) | Total Landed Cost per Unit',
    metaDescription: 'Calculate true landed product cost per unit including raw materials, manufacturing labor, inward freight, polybag packaging, and custom duty.',
    badge: 'Manufacturing & Sourcing',
    subtitle: 'Determine true landed unit cost by factoring in raw materials, production, inward transport, and packaging.',
    formulaDescription: 'Landed Unit Cost = (Material + Labor + Inward Freight + Packaging + Duty) / Total Units',
    inputs: [
      { id: 'materialCost', label: 'Raw Material / Batch Cost', type: 'number', defaultValue: 20000, prefix: '₹' },
      { id: 'laborCost', label: 'Labor / Manufacturing Charge', type: 'number', defaultValue: 5000, prefix: '₹' },
      { id: 'freightCost', label: 'Inward Freight / Transport', type: 'number', defaultValue: 2000, prefix: '₹' },
      { id: 'packagingCost', label: 'Packaging & Labels (Total)', type: 'number', defaultValue: 3000, prefix: '₹' },
      { id: 'unitsProduced', label: 'Total Units Produced / Procured', type: 'number', defaultValue: 200 }
    ],
    heroKpi: { label: 'True Landed Cost Per Unit', subLabel: 'exact COGS per item', prefix: '₹' },
    breakdown: [
      { id: 'bdTotalBatchCost', label: 'Total Batch Production Expense', prefix: '₹' },
      { id: 'bdUnits', label: 'Total Output Units' },
      { id: 'bdUnitCost', label: 'Final Unit Landed Cost', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Sourcing Insight:',
    tipText: 'Sellers often forget inward freight when importing or buying from wholesale hubs (Surat, Tirupur, Delhi). Landed cost must include door delivery to your warehouse.',
    faqs: [
      { q: 'What is landed cost?', a: 'Landed cost is the total price of a product once it has arrived at your doorstep, including manufacture, customs, transport, and initial packaging.' }
    ],
    calcType: 'product_cost'
  },
  {
    slug: 'product-markup-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Product Markup Calculator',
    metaTitle: 'Product Markup Calculator | Calculate Selling Price from Markup %',
    metaDescription: 'Calculate product selling price and gross margin percentage based on cost markup percentage.',
    badge: 'Retail Pricing',
    subtitle: 'Convert markup percentage on cost into final selling price and see the corresponding profit margin.',
    formulaDescription: 'Selling Price = Cost * (1 + Markup % / 100) | Margin % = Markup / (1 + Markup)',
    inputs: [
      { id: 'cost', label: 'Product Unit Cost (COGS)', type: 'number', defaultValue: 300, prefix: '₹' },
      { id: 'markupRate', label: 'Desired Markup %', type: 'number', defaultValue: 100, suffix: '%' }
    ],
    heroKpi: { label: 'Final Selling Price', subLabel: 'at chosen markup percentage', prefix: '₹' },
    breakdown: [
      { id: 'bdCost', label: 'Cost Basis', prefix: '₹' },
      { id: 'bdMarkupAmount', label: 'Markup Added (Profit)', prefix: '+ ₹' },
      { id: 'bdPrice', label: 'Final Selling Price', prefix: '₹', isTotal: true },
      { id: 'bdMarginRate', label: 'Equivalent Gross Margin %', suffix: '%' }
    ],
    tipTitle: 'Markup Rule of Thumb:',
    tipText: 'A 100% markup (keystone pricing) doubles your cost and yields a 50% profit margin.',
    faqs: [
      { q: 'How does markup differ from margin?', a: 'Markup expresses profit as a percentage of cost (Profit / Cost). Margin expresses profit as a percentage of selling price (Profit / Price).' }
    ],
    calcType: 'markup'
  },
  {
    slug: 'net-profit-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Net Profit Calculator for Online Sellers',
    metaTitle: 'Net Profit Calculator | Business Take-Home Profit & Margin',
    metaDescription: 'Calculate bottom-line net profit after subtracting cost of goods, marketplace commissions, courier fees, advertising, and operating overhead.',
    badge: 'Bottom-Line Income',
    subtitle: 'Determine true in-hand take-home profits after deducting all direct and indirect expenses.',
    formulaDescription: 'Net Profit = Gross Revenue - COGS - Marketplace Fees - Courier - Ads - Overheads',
    inputs: [
      { id: 'revenue', label: 'Monthly Gross Sales / Revenue', type: 'number', defaultValue: 250000, prefix: '₹' },
      { id: 'cogs', label: 'Cost of Goods Sold (COGS)', type: 'number', defaultValue: 90000, prefix: '₹' },
      { id: 'fees', label: 'Marketplace Commissions & Shipping', type: 'number', defaultValue: 55000, prefix: '₹' },
      { id: 'adSpend', label: 'Advertising & Marketing (PPC)', type: 'number', defaultValue: 35000, prefix: '₹' },
      { id: 'overheads', label: 'Rent, Salaries & Software', type: 'number', defaultValue: 20000, prefix: '₹' }
    ],
    heroKpi: { label: 'Monthly Net Take-Home Profit', subLabel: 'after all operational deductions', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Gross Sales Revenue', prefix: '₹' },
      { id: 'bdTotalExpense', label: 'Total Monthly Operating Expenses', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net Clean Profit', prefix: '₹', isTotal: true },
      { id: 'bdNetMargin', label: 'Net Profit Margin %', suffix: '%' }
    ],
    tipTitle: 'Cash Flow Focus:',
    tipText: 'Revenue is vanity, profit is sanity, but cash flow is reality. Keep overheads low during your first 6 months of online selling.',
    faqs: [
      { q: 'What is net profit?', a: 'Net profit is the amount of money left over after paying all operating expenses, taxes, raw materials, and selling fees.' }
    ],
    calcType: 'net_profit'
  },
  {
    slug: 'gross-profit-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Gross Profit Calculator',
    metaTitle: 'Gross Profit Calculator | Calculate Gross Profit & Margin %',
    metaDescription: 'Calculate gross profit and gross margin percentage on your product catalog before operating overheads and marketing expenses.',
    badge: 'Direct Margin',
    subtitle: 'Calculate your core product profitability by subtracting direct manufacturing cost from total sales.',
    formulaDescription: 'Gross Profit = Revenue - COGS | Gross Margin % = (Gross Profit / Revenue) * 100',
    inputs: [
      { id: 'revenue', label: 'Total Product Revenue', type: 'number', defaultValue: 100000, prefix: '₹' },
      { id: 'cogs', label: 'Cost of Goods Sold (COGS)', type: 'number', defaultValue: 40000, prefix: '₹' }
    ],
    heroKpi: { label: 'Gross Profit', subLabel: 'before overheads and advertising', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Total Revenue', prefix: '₹' },
      { id: 'bdCogs', label: 'Direct Product Cost', prefix: '- ₹', isNegative: true },
      { id: 'bdGrossProfit', label: 'Gross Profit Amount', prefix: '₹', isTotal: true },
      { id: 'bdGrossMargin', label: 'Gross Profit Margin %', suffix: '%' }
    ],
    tipTitle: 'Gross Margin Benchmark:',
    tipText: 'E-commerce brands usually require at least a 60% gross margin to comfortably absorb marketplace commissions, courier shipping, and ad costs.',
    faqs: [
      { q: 'What is the difference between gross profit and net profit?', a: 'Gross profit only deducts direct product cost (COGS). Net profit deducts all expenses including shipping, advertising, rent, and platform commissions.' }
    ],
    calcType: 'gross_profit'
  },
  {
    slug: 'break-even-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Break-Even Calculator for Sellers',
    metaTitle: 'Break-Even Calculator | Calculate Units Needed to Cover Fixed Costs',
    metaDescription: 'Find the exact number of units and sales revenue you must generate to cover all fixed costs and break even.',
    badge: 'Financial Target',
    subtitle: 'Determine the exact sales volume needed so your total revenue matches total fixed and variable costs.',
    formulaDescription: 'Break-Even Units = Fixed Costs / (Price - Variable Cost per Unit)',
    inputs: [
      { id: 'fixedCosts', label: 'Monthly Fixed Costs (Rent, Tools, Team)', type: 'number', defaultValue: 45000, prefix: '₹' },
      { id: 'price', label: 'Selling Price Per Unit', type: 'number', defaultValue: 899, prefix: '₹' },
      { id: 'variableCost', label: 'Variable Cost / Unit (COGS + Ship + Fee)', type: 'number', defaultValue: 499, prefix: '₹' }
    ],
    heroKpi: { label: 'Break-Even Sales Required', subLabel: 'minimum monthly units to not lose money' },
    breakdown: [
      { id: 'bdContribution', label: 'Contribution Margin Per Unit', prefix: '₹' },
      { id: 'bdBreakEvenUnits', label: 'Break-Even Unit Volume' },
      { id: 'bdBreakEvenRevenue', label: 'Break-Even Monthly Revenue', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Lowering Break-Even:',
    tipText: 'You can lower your break-even point by either raising selling price, negotiating lower courier shipping rates, or cutting recurring SaaS subscriptions.',
    faqs: [
      { q: 'What is a contribution margin?', a: 'Contribution margin is the selling price minus variable costs per unit. It represents the money each sale contributes towards paying off your fixed monthly overheads.' }
    ],
    calcType: 'break_even'
  },
  {
    slug: 'product-roi-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Product ROI Calculator',
    metaTitle: 'Product ROI Calculator | Return on Investment for E-Commerce',
    metaDescription: 'Calculate Return on Investment (ROI %) on inventory batches, marketing campaigns, and product sourcing runs.',
    badge: 'Capital Efficiency',
    subtitle: 'Measure the return generated on every rupee invested in product inventory and advertising.',
    formulaDescription: 'ROI % = ((Net Profit) / Total Initial Investment) * 100',
    inputs: [
      { id: 'investment', label: 'Total Investment (Inventory + Ads + Warehousing)', type: 'number', defaultValue: 50000, prefix: '₹' },
      { id: 'totalReturn', label: 'Total Revenue / Settlement Received', type: 'number', defaultValue: 85000, prefix: '₹' }
    ],
    heroKpi: { label: 'Return on Investment (ROI)', subLabel: 'percentage return on capital invested', suffix: '%' },
    breakdown: [
      { id: 'bdInvestment', label: 'Total Capital Invested', prefix: '₹' },
      { id: 'bdReturn', label: 'Total Capital Recovered', prefix: '₹' },
      { id: 'bdNetProfit', label: 'Net Gain / Profit', prefix: '₹', isTotal: true },
      { id: 'bdRoi', label: 'Calculated ROI %', suffix: '%' }
    ],
    tipTitle: 'Velocity of Money:',
    tipText: 'A 30% ROI earned in 30 days is vastly more profitable than a 50% ROI that takes 6 months to sell through.',
    faqs: [
      { q: 'What is a good ROI for e-commerce inventory?', a: 'A healthy inventory ROI for Indian sellers is 40% to 80% per cycle after accounting for damaged returns and courier deductions.' }
    ],
    calcType: 'roi'
  },
  {
    slug: 'wholesale-profit-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Wholesale Profit Calculator',
    metaTitle: 'Wholesale Profit Calculator | B2B Bulk Order Margins & Payout',
    metaDescription: 'Calculate wholesale profit margins, bulk tier pricing, and retailer margins for B2B distributors and manufacturers.',
    badge: 'B2B Wholesale',
    subtitle: 'Model bulk manufacturing cost, distributor wholesale pricing, and retailer profit margins.',
    formulaDescription: 'Wholesale Profit = Quantity * (Wholesale Price - Manufacturing Cost)',
    inputs: [
      { id: 'unitCost', label: 'Unit Manufacturing Cost', type: 'number', defaultValue: 180, prefix: '₹' },
      { id: 'wholesalePrice', label: 'Wholesale Price (To Retailer)', type: 'number', defaultValue: 320, prefix: '₹' },
      { id: 'retailMrp', label: 'Suggested Retail MRP', type: 'number', defaultValue: 599, prefix: '₹' },
      { id: 'quantity', label: 'Order Quantity (Units)', type: 'number', defaultValue: 500 }
    ],
    heroKpi: { label: 'Total Wholesale Profit', subLabel: 'clean earnings on bulk shipment', prefix: '₹' },
    breakdown: [
      { id: 'bdWholesaleRevenue', label: 'Total Wholesale Order Value', prefix: '₹' },
      { id: 'bdProductionCost', label: 'Total Manufacturing Cost', prefix: '- ₹', isNegative: true },
      { id: 'bdWholesaleProfit', label: 'Manufacturer Net Profit', prefix: '₹', isTotal: true },
      { id: 'bdWholesaleMargin', label: 'Wholesaler Margin %', suffix: '%' },
      { id: 'bdRetailerMargin', label: 'Retailer Markup Potential %', suffix: '%' }
    ],
    tipTitle: 'Wholesale Scale:',
    tipText: 'Wholesale trade has lower margins (25%-40%) than retail D2C (50%-70%), but features zero customer return headaches and instant bulk payment.',
    faqs: [
      { q: 'How do you price wholesale products?', a: 'Standard wholesale pricing is typically 2x manufacturing cost, and retail price is 2x wholesale price.' }
    ],
    calcType: 'wholesale'
  },
  {
    slug: 'dropshipping-profit-calculator',
    category: 'profit',
    categoryLabel: 'Cost & Profit',
    title: 'Dropshipping Profit Calculator',
    metaTitle: 'Dropshipping Profit Calculator (India) | Roposo, GlowRoad & D2C Margin Calculator',
    metaDescription: 'Calculate exact net profit on dropshipping orders through Roposo Clout, GlowRoad, and Shopify after supplier costs, ad spend, and RTO return penalties.',
    badge: 'Dropshipping Model',
    subtitle: 'Model supplier item costs, Meta ad acquisition costs (CAC), COD courier fees, and return penalties.',
    formulaDescription: 'Dropshipping Profit = Retail Price - Supplier Cost - Ad CAC - Delivery Fees - RTO Buffer',
    inputs: [
      { id: 'price', label: 'Customer Listed Price', type: 'number', defaultValue: 899, prefix: '₹' },
      { id: 'supplierCost', label: 'Supplier Sourcing Cost (Roposo/GlowRoad)', type: 'number', defaultValue: 340, prefix: '₹' },
      { id: 'adCpa', label: 'Cost Per Purchase (Ad CAC)', type: 'number', defaultValue: 280, prefix: '₹' },
      { id: 'rtoRate', label: 'COD RTO Rate %', type: 'number', defaultValue: 25.0, suffix: '%' }
    ],
    heroKpi: { label: 'Realized Dropshipping Profit', subLabel: 'per order after RTO buffer', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Customer Selling Price', prefix: '₹' },
      { id: 'bdSupplier', label: 'Supplier Cost', prefix: '- ₹', isNegative: true },
      { id: 'bdAds', label: 'Ad CAC per Purchase', prefix: '- ₹', isNegative: true },
      { id: 'bdRtoBuffer', label: 'COD RTO Loss Reserve', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net Take-Home Per Sale', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Dropshipping Warning:',
    tipText: 'Indian dropshipping fails when ad costs (CPA) exceed 35% of selling price and COD RTO rates exceed 25%. Always confirm orders via automated WhatsApp calls before dispatching.',
    faqs: [
      { q: 'Is dropshipping profitable in India?', a: 'Yes, but only if you select products with at least 3x markup over supplier cost to absorb advertising CPA and COD courier return losses.' }
    ],
    calcType: 'dropshipping'
  },

  // ==========================================
  // 3. SHIPPING & RETURN CALCULATORS
  // ==========================================
  {
    slug: 'return-loss-calculator',
    category: 'shipping',
    categoryLabel: 'Shipping & Returns',
    title: 'Customer Return Loss Calculator',
    metaTitle: 'Customer Return Loss Calculator | True Cost of E-Commerce Returns',
    metaDescription: 'Calculate the true financial cost of customer returns: reverse courier shipping penalties, ruined packaging, and unsellable product damage.',
    badge: 'Reverse Logistics',
    subtitle: 'Measure total financial losses from post-delivery buyer returns, reverse courier penalties, and packaging destruction.',
    formulaDescription: 'Return Loss = Reverse Courier + Damaged Packaging + (COGS * Damage Rate %)',
    inputs: [
      { id: 'monthlyReturns', label: 'Monthly Returned Orders', type: 'number', defaultValue: 150 },
      { id: 'reverseCourierFee', label: 'Reverse Courier Fee (Charged by Platform)', type: 'number', defaultValue: 130, prefix: '₹' },
      { id: 'packagingLoss', label: 'Damaged Polybag/Box Cost', type: 'number', defaultValue: 20, prefix: '₹' },
      { id: 'unitCogs', label: 'Product Unit Cost (COGS)', type: 'number', defaultValue: 300, prefix: '₹' },
      { id: 'damageRate', label: 'Product Transit Damage / Unsellable %', type: 'number', defaultValue: 5.0, suffix: '%' }
    ],
    heroKpi: { label: 'Monthly Return Cash Loss', subLabel: 'total wasted capital on returns', prefix: '₹' },
    breakdown: [
      { id: 'bdReverseFreight', label: 'Reverse Courier Freight Deductions', prefix: '- ₹', isNegative: true },
      { id: 'bdPackagingLoss', label: 'Ruined Packaging Waste', prefix: '- ₹', isNegative: true },
      { id: 'bdDamagedGoods', label: 'Damaged / Unsellable Inventory', prefix: '- ₹', isNegative: true },
      { id: 'bdTotalLoss', label: 'Total Monthly Loss from Returns', prefix: '₹', isTotal: true },
      { id: 'bdLossPerReturn', label: 'Average Loss Per Returned Order', prefix: '₹' }
    ],
    tipTitle: 'Return Reduction:',
    tipText: 'Over 60% of fashion returns are due to size mismatch. Providing an exact measurement chart with chest/waist centimeters cuts returns dramatically.',
    faqs: [
      { q: 'Who pays for customer return shipping?', a: 'On marketplaces like Flipkart and Meesho, reverse shipping charges (₹120–₹160) are deducted directly from the seller payout unless a buyer fault claim is approved.' }
    ],
    calcType: 'return_loss'
  },
  {
    slug: 'shipping-cost-calculator',
    category: 'shipping',
    categoryLabel: 'Shipping & Returns',
    title: 'E-commerce Shipping Cost Calculator',
    metaTitle: 'E-Commerce Shipping Cost Calculator | Volumetric vs Dead Weight Slabs',
    metaDescription: 'Calculate chargeable courier shipping costs across Local, Regional, and National delivery zones in India. Compare volumetric weight against dead weight.',
    badge: 'Logistics Slabs',
    subtitle: 'Calculate chargeable courier freight based on dead weight and volumetric dimensions (L x W x H).',
    formulaDescription: 'Chargeable Weight = Max(Dead Weight, (Length * Width * Height) / 5000)',
    inputs: [
      { id: 'deadWeight', label: 'Physical Dead Weight (Grams)', type: 'number', defaultValue: 450, suffix: 'g' },
      { id: 'lengthCm', label: 'Length (cm)', type: 'number', defaultValue: 25, suffix: 'cm' },
      { id: 'widthCm', label: 'Width (cm)', type: 'number', defaultValue: 18, suffix: 'cm' },
      { id: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: 8, suffix: 'cm' },
      {
        id: 'zone',
        label: 'Delivery Zone',
        type: 'select',
        defaultValue: 'national',
        options: [
          { label: 'Local (Intra-City)', value: 'local' },
          { label: 'Regional (Intra-State)', value: 'regional' },
          { label: 'National (Inter-State)', value: 'national' }
        ]
      }
    ],
    heroKpi: { label: 'Estimated Courier Freight', subLabel: 'including fuel surcharge and GST', prefix: '₹' },
    breakdown: [
      { id: 'bdDeadWeight', label: 'Actual Physical Weight', suffix: 'g' },
      { id: 'bdVolumetricWeight', label: 'Volumetric Dimension Weight', suffix: 'g' },
      { id: 'bdChargeableWeight', label: 'Chargeable Courier Weight', suffix: 'g' },
      { id: 'bdBaseShipping', label: 'Base Zone Shipping Fee', prefix: '₹' },
      { id: 'bdGst', label: '18% GST on Freight', prefix: '₹' },
      { id: 'bdTotalFreight', label: 'Final Invoiced Courier Cost', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Volumetric Weight Alert:',
    tipText: 'If a light product (like a soft toy or shoes) is packed in an oversized box, couriers bill by volumetric weight! Use snugly fitted flyer bags whenever possible.',
    faqs: [
      { q: 'How is volumetric weight calculated in India?', a: 'Standard Indian logistics divisor is 5000: Volumetric Weight in Kg = (Length × Width × Height in cm) / 5000.' }
    ],
    calcType: 'shipping_cost'
  },
  {
    slug: 'courier-charges-calculator',
    category: 'shipping',
    categoryLabel: 'Shipping & Returns',
    title: 'Courier Charges & Weight Slabs Calculator',
    metaTitle: 'Courier Charges Calculator | Shiprocket, Delhivery & Bluedart Rates',
    metaDescription: 'Calculate third-party courier shipping charges across 500g weight increments with fuel surcharges, COD collection, and GST.',
    badge: '3PL Rate Card',
    subtitle: 'Model freight charges for aggregators like Shiprocket, Delhivery, Bluedart, and Ecom Express.',
    formulaDescription: 'Total Courier = Base Freight + Addl Weight + Fuel Surcharge (15%) + COD Fee + 18% GST',
    inputs: [
      { id: 'weightGrams', label: 'Shipment Weight (Grams)', type: 'number', defaultValue: 750, suffix: 'g' },
      { id: 'baseRate', label: 'Base Rate (First 500g)', type: 'number', defaultValue: 45, prefix: '₹' },
      { id: 'addlRate', label: 'Addl Rate (Per 500g)', type: 'number', defaultValue: 35, prefix: '₹' },
      { id: 'fuelSurcharge', label: 'Fuel Surcharge %', type: 'number', defaultValue: 12.0, suffix: '%' },
      { id: 'isCod', label: 'Payment Mode', type: 'select', defaultValue: 'prepaid', options: [{ label: 'Prepaid (0 COD Fee)', value: 'prepaid' }, { label: 'COD (+₹40 Collection)', value: 'cod' }] }
    ],
    heroKpi: { label: 'Total Invoiced Courier Charge', subLabel: 'payable to logistics partner', prefix: '₹' },
    breakdown: [
      { id: 'bdBaseCharge', label: 'Weight Slabs Charge', prefix: '₹' },
      { id: 'bdFuel', label: 'Fuel Surcharge', prefix: '₹' },
      { id: 'bdCodFee', label: 'COD Handling Charge', prefix: '₹' },
      { id: 'bdGst', label: '18% GST on Logistics', prefix: '₹' },
      { id: 'bdTotalCourier', label: 'Final Net Courier Deduction', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Logistics Tip:',
    tipText: 'Reconcile your courier weight disputes weekly. Logistics companies frequently overcharge weights by 100g-300g due to automated scanning errors.',
    faqs: [
      { q: 'What is a courier weight discrepancy?', a: 'When the courier scans your package heavier than your actual dispatch weight, deducting extra charges from your account.' }
    ],
    calcType: 'courier_charges'
  },
  {
    slug: 'reverse-shipping-cost-calculator',
    category: 'shipping',
    categoryLabel: 'Shipping & Returns',
    title: 'Reverse Shipping Cost Calculator',
    metaTitle: 'Reverse Shipping Cost Calculator | E-Commerce Reverse Pickup Fees',
    metaDescription: 'Calculate reverse courier pickup costs, QC inspection fees, return repackaging, and net cost per returned parcel.',
    badge: 'Reverse Freight',
    subtitle: 'Determine the exact cost to bring an item back to your warehouse after customer return.',
    formulaDescription: 'Reverse Cost = Reverse Pickup Freight + QC Inspection + Polybag Re-box + Taxes',
    inputs: [
      { id: 'reverseFreight', label: 'Reverse Courier Freight', type: 'number', defaultValue: 110, prefix: '₹' },
      { id: 'qcInspection', label: 'QC Quality Check Fee', type: 'number', defaultValue: 15, prefix: '₹' },
      { id: 'repackaging', label: 'New Box / Polybag Material', type: 'number', defaultValue: 15, prefix: '₹' }
    ],
    heroKpi: { label: 'Total Reverse Logistics Cost', subLabel: 'cost per returned unit', prefix: '₹' },
    breakdown: [
      { id: 'bdFreight', label: 'Reverse Pickup Freight', prefix: '₹' },
      { id: 'bdQc', label: 'QC & Restocking', prefix: '₹' },
      { id: 'bdRepack', label: 'Repackaging Material', prefix: '₹' },
      { id: 'bdGst', label: '18% GST on Reverse Logistics', prefix: '₹' },
      { id: 'bdTotalReverse', label: 'Total Reverse Expense', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Minimizing Reverse Freight:',
    tipText: 'Offer unhappy customers partial refunds or instant replacement instead of return pickups to avoid reverse logistics costs.',
    faqs: [
      { q: 'Why is reverse shipping more expensive than forward shipping?', a: 'Couriers must make multiple door attempt visits to schedule customer pickups, resulting in higher operational overhead.' }
    ],
    calcType: 'reverse_shipping'
  },
  {
    slug: 'order-cancellation-loss-calculator',
    category: 'shipping',
    categoryLabel: 'Shipping & Returns',
    title: 'Order Cancellation Loss Calculator',
    metaTitle: 'Order Cancellation Loss Calculator | Measure In-Transit Cancellation Waste',
    metaDescription: 'Calculate wasted shipping labels, pick-and-pack labor, and courier freight burned on pre-dispatch and in-transit order cancellations.',
    badge: 'Operations Loss',
    subtitle: 'Measure lost courier fees and packaging waste when buyers cancel orders after dispatch.',
    formulaDescription: 'Cancellation Loss = (Cancelled Orders) * (Forward Freight + Polybag Box + Label)',
    inputs: [
      { id: 'monthlyCancellations', label: 'Monthly In-Transit Cancellations', type: 'number', defaultValue: 80 },
      { id: 'courierCost', label: 'Forward Freight Burned', type: 'number', defaultValue: 65, prefix: '₹' },
      { id: 'packingCost', label: 'Wasted Packaging & Barcode Label', type: 'number', defaultValue: 15, prefix: '₹' }
    ],
    heroKpi: { label: 'Monthly Cancellation Loss', subLabel: 'capital lost to cancelled dispatches', prefix: '₹' },
    breakdown: [
      { id: 'bdOrders', label: 'Cancelled In-Transit Orders' },
      { id: 'bdLossPerUnit', label: 'Cost Burned Per Cancellation', prefix: '₹' },
      { id: 'bdTotalCancellationLoss', label: 'Total Financial Loss', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Dispatch Delay Fix:',
    tipText: 'Buyers cancel most frequently when order tracking has no updates for 48 hours. Fast same-day dispatch cuts cancellations by over 60%.',
    faqs: [
      { q: 'What happens when a buyer cancels in transit?', a: 'The courier halts delivery, marks the package as RTO, and returns it to your warehouse while billing you for forward freight.' }
    ],
    calcType: 'cancellation_loss'
  },

  // ==========================================
  // 4. GST & TAX CALCULATORS
  // ==========================================
  {
    slug: 'gst-inclusive-exclusive-calculator',
    category: 'gst',
    categoryLabel: 'GST & Taxes',
    title: 'GST Inclusive / Exclusive Calculator',
    metaTitle: 'GST Inclusive & Exclusive Calculator | Add or Remove GST from Price',
    metaDescription: 'Calculate GST amounts instantly. Add GST to net cost or extract GST from gross retail MRP across 0%, 3%, 5%, 12%, 18%, and 28% slabs.',
    badge: 'GST Slabs',
    subtitle: 'Instantly add GST on top of net cost, or extract taxable value from GST-inclusive retail prices.',
    formulaDescription: 'Inclusive Base = MRP / (1 + Rate/100) | Exclusive Total = Net + (Net * Rate/100)',
    inputs: [
      { id: 'amount', label: 'Enter Amount', type: 'number', defaultValue: 1180, prefix: '₹' },
      { id: 'rate', label: 'GST Rate %', type: 'number', defaultValue: 18, suffix: '%' },
      { id: 'mode', label: 'Mode', type: 'select', defaultValue: 'inclusive', options: [{ label: 'GST Inclusive (Extract from MRP)', value: 'inclusive' }, { label: 'GST Exclusive (Add Tax on Cost)', value: 'exclusive' }] }
    ],
    heroKpi: { label: 'Calculated GST Amount', subLabel: 'total tax payable', prefix: '₹' },
    breakdown: [
      { id: 'bdBase', label: 'Net Taxable Value (Before Tax)', prefix: '₹' },
      { id: 'bdTax', label: 'GST Tax Component', prefix: '₹' },
      { id: 'bdTotal', label: 'Gross Total Amount', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'MRP Invoicing Rule:',
    tipText: 'Under Indian law, customer listed prices on websites must be MRP inclusive of all taxes. Your invoice must break down the taxable base and GST separately.',
    faqs: [
      { q: 'How do you extract 18% GST from MRP?', a: 'Divide the MRP by 1.18 to find the base taxable price. The remaining difference is the 18% GST.' }
    ],
    calcType: 'gst_inc_exc'
  },
  {
    slug: 'gst-on-marketplace-fees-calculator',
    category: 'gst',
    categoryLabel: 'GST & Taxes',
    title: 'GST on Marketplace Fees Calculator',
    metaTitle: 'GST on Marketplace Fees Calculator | Amazon & Flipkart 18% GST',
    metaDescription: 'Calculate the 18% GST deducted by Amazon, Flipkart, and Meesho on referral commissions, closing fees, and courier shipping.',
    badge: '18% Service GST',
    subtitle: 'Calculate total 18% GST charged on seller commissions, fixed fees, and courier delivery.',
    formulaDescription: 'GST on Fees = (Commission + Fixed Fee + Shipping Fee) * 18%',
    inputs: [
      { id: 'commission', label: 'Marketplace Referral Commission', type: 'number', defaultValue: 120, prefix: '₹' },
      { id: 'fixedFee', label: 'Fixed Closing Fee', type: 'number', defaultValue: 25, prefix: '₹' },
      { id: 'shippingFee', label: 'Courier Shipping Fee', type: 'number', defaultValue: 74, prefix: '₹' }
    ],
    heroKpi: { label: '18% GST Deducted on Fees', subLabel: '100% claimable as Input Tax Credit (ITC)', prefix: '₹' },
    breakdown: [
      { id: 'bdFeesSubtotal', label: 'Total Marketplace Fees (Before Tax)', prefix: '₹' },
      { id: 'bdGstAmount', label: '18% GST Deducted from Payout', prefix: '₹' },
      { id: 'bdTotalDeduction', label: 'Total Fee Deduction from Settlement', prefix: '₹', isTotal: true }
    ],
    tipTitle: '100% Claimable:',
    tipText: 'Do not count the 18% GST on marketplace fees as a permanent expense! You can claim it back in your monthly GSTR-3B filing to offset output tax.',
    faqs: [
      { q: 'Where can I find the marketplace tax invoice?', a: 'In Amazon Seller Central under Reports > Tax Document Library, or in Flipkart Seller Hub under Reports > Invoices.' }
    ],
    calcType: 'gst_on_fees'
  },
  {
    slug: 'gst-profit-calculator',
    category: 'gst',
    categoryLabel: 'GST & Taxes',
    title: 'GST Profit & Tax Liability Calculator',
    metaTitle: 'GST Profit Calculator | Net Output Tax vs Input Tax Credit (ITC)',
    metaDescription: 'Calculate your net monthly GST liability by offsetting Input Tax Credit (ITC) from raw materials and marketplace fees against customer sales tax.',
    badge: 'Tax Reconciliation',
    subtitle: 'Calculate your exact net GST cash payable to the government after claiming all Input Tax Credits.',
    formulaDescription: 'Net GST Payable = Output GST (Sales) - Input GST (Purchases) - Input GST (Marketplace Fees)',
    inputs: [
      { id: 'outputGst', label: 'Output GST Collected from Customers', type: 'number', defaultValue: 45000, prefix: '₹' },
      { id: 'purchaseItc', label: 'Input Tax Credit (From Raw Material Invoices)', type: 'number', defaultValue: 28000, prefix: '₹' },
      { id: 'feeItc', label: 'Input Tax Credit (From Amazon/Flipkart Fees)', type: 'number', defaultValue: 11000, prefix: '₹' }
    ],
    heroKpi: { label: 'Net GST Payable to Govt', subLabel: 'cash tax to deposit via GSTR-3B', prefix: '₹' },
    breakdown: [
      { id: 'bdOutput', label: 'Total Output GST on Sales', prefix: '₹' },
      { id: 'bdTotalItc', label: 'Total Input Tax Credit (ITC) Available', prefix: '- ₹', isNegative: true },
      { id: 'bdNetPayable', label: 'Final Net Cash Tax Payable', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Cash Savings:',
    tipText: 'Many sellers fail to reconcile GSTR-2B and end up paying full output GST in cash. Properly claiming marketplace ITC saves thousands of rupees monthly.',
    faqs: [
      { q: 'What happens if ITC exceeds output GST?', a: 'If your Input Tax Credit exceeds output GST, the balance carries forward in your Electronic Credit Ledger to offset future sales taxes.' }
    ],
    calcType: 'gst_profit'
  },
  {
    slug: 'input-tax-credit-calculator',
    category: 'gst',
    categoryLabel: 'GST & Taxes',
    title: 'Input Tax Credit (ITC) Calculator',
    metaTitle: 'Input Tax Credit Calculator (ITC) | GSTR-3B Tax Credit Calculator',
    metaDescription: 'Calculate available Input Tax Credit (ITC) from vendor invoices, courier bills, packaging supplies, and marketplace service deductions.',
    badge: 'GSTR-3B Credit',
    subtitle: 'Add up eligible input tax credits across purchases, logistics, and commissions to reduce your tax bill.',
    formulaDescription: 'Total ITC = GST on Purchases + GST on Courier + GST on Platform Commissions',
    inputs: [
      { id: 'goodsGst', label: 'GST Paid on Goods Purchases (From Vendors)', type: 'number', defaultValue: 35000, prefix: '₹' },
      { id: 'courierGst', label: 'GST Paid on Courier & Shipping Bills', type: 'number', defaultValue: 8500, prefix: '₹' },
      { id: 'platformGst', label: 'GST Paid on Marketplace Commissions', type: 'number', defaultValue: 7200, prefix: '₹' }
    ],
    heroKpi: { label: 'Total Available ITC Credit', subLabel: 'to offset output tax liabilities', prefix: '₹' },
    breakdown: [
      { id: 'bdGoodsItc', label: 'Goods Procurement ITC', prefix: '₹' },
      { id: 'bdServicesItc', label: 'Courier & Marketplace Services ITC', prefix: '₹' },
      { id: 'bdTotalItc', label: 'Total ITC Eligible in GSTR-2B', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'GSTR-2B Matching:',
    tipText: 'Ensure all suppliers upload invoices on time. ITC can only be claimed if it appears in your auto-populated GSTR-2B statement.',
    faqs: [
      { q: 'Can composition dealers claim ITC?', a: 'No. Businesses registered under the GST Composition Scheme cannot claim Input Tax Credit.' }
    ],
    calcType: 'itc'
  },
  {
    slug: 'tcs-calculator',
    category: 'gst',
    categoryLabel: 'GST & Taxes',
    title: 'TCS Calculator for E-Commerce Sellers',
    metaTitle: 'TCS Calculator for E-Commerce (1%) | Tax Collected at Source',
    metaDescription: 'Calculate the 1% Tax Collected at Source (TCS) deducted by marketplaces under GST law, and learn how to claim it back.',
    badge: '1% GST TCS',
    subtitle: 'Calculate 1% Tax Collected at Source deducted by Amazon, Flipkart, and Meesho on net taxable supplies.',
    formulaDescription: 'TCS = 1% * Net Taxable Value (Sales - Returns)',
    inputs: [
      { id: 'grossSales', label: 'Monthly Gross Sales Value', type: 'number', defaultValue: 300000, prefix: '₹' },
      { id: 'returnsValue', label: 'Monthly Returns / Cancellations', type: 'number', defaultValue: 50000, prefix: '₹' }
    ],
    heroKpi: { label: '1% TCS Deducted by Platform', subLabel: 'refundable against monthly GST liabilities', prefix: '₹' },
    breakdown: [
      { id: 'bdNetSupply', label: 'Net Taxable Supplies (Sales - Returns)', prefix: '₹' },
      { id: 'bdTcsAmount', label: '1% TCS Deducted (0.5% CGST + 0.5% SGST)', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Claiming TCS Cash:',
    tipText: 'TCS is not an expense. You can accept the TCS return on the GST portal monthly, and the money gets credited directly into your Electronic Cash Ledger.',
    faqs: [
      { q: 'How do I claim TCS back?', a: 'Log in to the GST Portal > Services > Returns > TDS and TCS credit received, file the return, and the amount moves to your cash ledger.' }
    ],
    calcType: 'tcs'
  },
  {
    slug: 'tds-calculator',
    category: 'gst',
    categoryLabel: 'GST & Taxes',
    title: 'TDS Calculator for E-Commerce (Section 194-O)',
    metaTitle: 'TDS Calculator (Section 194-O) | 0.1% Income Tax TDS on E-Commerce',
    metaDescription: 'Calculate 0.1% TDS deducted by marketplaces under Section 194-O of the Income Tax Act. Reconcile with Form 26AS & AIS.',
    badge: 'Section 194-O',
    subtitle: 'Calculate 0.1% Income Tax TDS deducted on gross e-commerce sales value.',
    formulaDescription: 'TDS = 0.1% * Gross Transaction Value of Goods Sold',
    inputs: [
      { id: 'grossValue', label: 'Gross Sales Transaction Value', type: 'number', defaultValue: 500000, prefix: '₹' }
    ],
    heroKpi: { label: '0.1% Income Tax TDS Deducted', subLabel: 'claimable in annual Income Tax Return (ITR)', prefix: '₹' },
    breakdown: [
      { id: 'bdGross', label: 'Gross Order Transaction Value', prefix: '₹' },
      { id: 'bdTdsAmount', label: '0.1% Section 194-O TDS', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Form 26AS Match:',
    tipText: 'Marketplaces deposit TDS with your PAN every quarter. You can claim full credit or refund against income tax when filing your annual ITR-3 or ITR-4.',
    faqs: [
      { q: 'What is Section 194-O?', a: 'Under the Income Tax Act, e-commerce operators must deduct 0.1% TDS on the gross sales value of goods facilitated through their platform.' }
    ],
    calcType: 'tds'
  },

  // ==========================================
  // 5. MARKETPLACE FEE CALCULATORS
  // ==========================================
  {
    slug: 'amazon-seller-fee-calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    title: 'Amazon India Seller Fee Calculator',
    metaTitle: 'Amazon Seller Fee Calculator (2026) | Referral, Closing & Shipping Fees',
    metaDescription: 'Calculate all Amazon India seller fees in one place: category referral fee, closing fee price slabs, and Easy Ship courier rates.',
    badge: 'Amazon Slabs 2026',
    subtitle: 'Calculate referral fees, price-tier closing fees, and Easy Ship courier rates.',
    formulaDescription: 'Total Amazon Fees = Referral Fee + Closing Fee + Shipping Fee + 18% GST',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 999, prefix: '₹' },
      { id: 'commRate', label: 'Category Referral %', type: 'number', defaultValue: 12.0, suffix: '%' },
      { id: 'weightGrams', label: 'Weight (Grams)', type: 'number', defaultValue: 500, suffix: 'g' }
    ],
    heroKpi: { label: 'Total Amazon Fees + GST', subLabel: 'total deductions from selling price', prefix: '₹' },
    breakdown: [
      { id: 'bdReferral', label: 'Referral Fee', prefix: '₹' },
      { id: 'bdClosing', label: 'Closing Fee Slab', prefix: '₹' },
      { id: 'bdShipping', label: 'Easy Ship National Courier', prefix: '₹' },
      { id: 'bdGst', label: '18% GST on Fees', prefix: '₹' },
      { id: 'bdTotalFees', label: 'Total Amazon Deductions', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Weight Slab Savings:',
    tipText: 'Keeping your packaging under 500g saves you ₹36 on National Easy Ship compared to 501g-1000g.',
    faqs: [
      { q: 'What are Amazon closing fee slabs?', a: '₹0-250: ₹5; ₹251-500: ₹10; ₹501-1000: ₹25; ₹1001-2000: ₹35; Above ₹2000: ₹50.' }
    ],
    calcType: 'amz_fees'
  },
  {
    slug: 'flipkart-seller-fee-calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    title: 'Flipkart Seller Fee Calculator',
    metaTitle: 'Flipkart Seller Fee Calculator (2026) | Commission, Fixed & Collection Fees',
    metaDescription: 'Calculate all Flipkart seller fees: category commission (4%-16%), fixed closing fee slabs (₹13-₹52), 2% collection fee, and shipping tiers.',
    badge: 'Flipkart Slabs 2026',
    subtitle: 'Calculate fixed fees, referral commissions, collection fees, and courier shipping.',
    formulaDescription: 'Total Flipkart Fees = Commission + Fixed Fee + Collection Fee (2%) + Shipping + 18% GST',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 799, prefix: '₹' },
      { id: 'commRate', label: 'Category Commission %', type: 'number', defaultValue: 14.0, suffix: '%' },
      { id: 'shippingCost', label: 'Shipping Charge (National Standard)', type: 'number', defaultValue: 69, prefix: '₹' }
    ],
    heroKpi: { label: 'Total Flipkart Deductions', subLabel: 'including 18% GST and fees', prefix: '₹' },
    breakdown: [
      { id: 'bdComm', label: 'Commission Fee', prefix: '₹' },
      { id: 'bdFixed', label: 'Fixed Fee Slab', prefix: '₹' },
      { id: 'bdColl', label: '2% Payment Collection Fee', prefix: '₹' },
      { id: 'bdShip', label: 'Shipping Fee', prefix: '₹' },
      { id: 'bdGst', label: '18% GST on Fees', prefix: '₹' },
      { id: 'bdTotalFees', label: 'Total Flipkart Fee Deductions', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Flipkart Tiering:',
    tipText: 'Reaching Gold Tier on Flipkart reduces your shipping fees by ₹10-₹15 per order, directly boosting your profit margin.',
    faqs: [
      { q: 'What is Flipkart collection fee?', a: 'Flipkart charges a flat 2% on order value for processing payments, applicable on both prepaid and COD orders.' }
    ],
    calcType: 'fk_fees'
  },
  {
    slug: 'meesho-commission-calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    title: 'Meesho Commission Calculator (0% Model)',
    metaTitle: 'Meesho Commission Calculator | 0% Referral Fee & Shipping Slabs',
    metaDescription: 'Calculate Meesho seller deductions. See how Meesho 0% commission works with weight-slab shipping charges and return loss buffers.',
    badge: 'Meesho 0% Model',
    subtitle: 'Verify Meesho zero referral commission economics against courier shipping slabs and customer return penalties.',
    formulaDescription: 'Meesho Deductions = ₹0 Commission + Shipping Slabs + 18% GST on Shipping',
    inputs: [
      { id: 'price', label: 'Selling Price (Customer Price)', type: 'number', defaultValue: 499, prefix: '₹' },
      { id: 'weightGrams', label: 'Product Weight (Grams)', type: 'number', defaultValue: 450, suffix: 'g' }
    ],
    heroKpi: { label: 'Meesho Platform Commission', subLabel: 'zero referral fee model', prefix: '₹' },
    breakdown: [
      { id: 'bdComm', label: 'Referral Commission Fee', prefix: '₹' },
      { id: 'bdFixed', label: 'Fixed Closing Fee', prefix: '₹' },
      { id: 'bdShipping', label: 'Courier Shipping Fee (Weight Slab)', prefix: '₹' },
      { id: 'bdGst', label: '18% GST on Courier', prefix: '₹' },
      { id: 'bdTotal', label: 'Total Deductions from Payout', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Return Strategy on Meesho:',
    tipText: 'Because Meesho charges 0% commission, your only true costs are courier shipping and customer return penalties (~₹120-150). Budget your prices accordingly.',
    faqs: [
      { q: 'Is Meesho really 0% commission?', a: 'Yes, Meesho does not charge referral fees or closing fees. Sellers only pay for courier shipping plus 18% GST on shipping.' }
    ],
    calcType: 'meesho_comm'
  },
  {
    slug: 'amazon-referral-fee-calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    title: 'Amazon Referral Fee Calculator',
    metaTitle: 'Amazon Referral Fee Calculator | Category Commission Slabs',
    metaDescription: 'Calculate exact Amazon India referral commission percentages and rupee deductions for clothing, electronics, footwear, and beauty categories.',
    badge: 'Referral Slabs',
    subtitle: 'Look up category referral fee percentages and exact deduction amounts on Amazon India.',
    formulaDescription: 'Referral Fee = Taxable Selling Price * Category Referral %',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 750, prefix: '₹' },
      { id: 'rate', label: 'Category Referral Rate %', type: 'number', defaultValue: 13.5, suffix: '%' }
    ],
    heroKpi: { label: 'Amazon Referral Fee', subLabel: 'category commission deducted', prefix: '₹' },
    breakdown: [
      { id: 'bdTaxable', label: 'Taxable Product Value', prefix: '₹' },
      { id: 'bdRate', label: 'Category Commission Rate', suffix: '%' },
      { id: 'bdReferralFee', label: 'Referral Fee Amount', prefix: '₹', isTotal: true },
      { id: 'bdGstOnFee', label: '18% GST on Referral Fee', prefix: '₹' }
    ],
    tipTitle: 'Price Threshold Commission Changes:',
    tipText: 'Some Amazon categories have stepped commission rates (e.g. 5.5% for items under ₹300, but 13% for items above ₹300). Check your exact price tier.',
    faqs: [
      { q: 'What is an Amazon referral fee?', a: 'It is the percentage fee charged by Amazon on each item sold, varying by product category from 2% to 22%.' }
    ],
    calcType: 'amz_referral'
  },
  {
    slug: 'amazon-closing-fee-calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    title: 'Amazon Closing Fee Calculator',
    metaTitle: 'Amazon Closing Fee Calculator (2026) | Easy Ship Closing Slabs',
    metaDescription: 'Calculate dynamic Amazon India closing fee slabs based on your product listing price (₹5, ₹10, ₹25, ₹35, or ₹50).',
    badge: 'Price Slabs',
    subtitle: 'Calculate exact closing fee deductions across Amazon India price tiers.',
    formulaDescription: 'Closing Fee = Slabs: ≤250 (₹5), ≤500 (₹10), ≤1000 (₹25), ≤2000 (₹35), >2000 (₹50)',
    inputs: [
      { id: 'price', label: 'Product Selling Price (MRP)', type: 'number', defaultValue: 650, prefix: '₹' }
    ],
    heroKpi: { label: 'Amazon Closing Fee', subLabel: 'fixed slab fee deducted per unit', prefix: '₹' },
    breakdown: [
      { id: 'bdPrice', label: 'Selling Price Tier', prefix: '₹' },
      { id: 'bdClosingFee', label: 'Closing Fee Amount', prefix: '₹', isTotal: true },
      { id: 'bdGstOnFee', label: '18% GST on Closing Fee', prefix: '₹' },
      { id: 'bdTotalFee', label: 'Total Closing Deduction (+ Tax)', prefix: '₹' }
    ],
    tipTitle: 'Pricing Edge Case:',
    tipText: 'Listing an item at ₹500 results in a ₹10 closing fee, but listing at ₹505 bumps the closing fee up to ₹25! Keep price thresholds in mind.',
    faqs: [
      { q: 'What is a closing fee on Amazon?', a: 'A closing fee is a fixed fee per unit sold based on the product price band, charged on all completed orders.' }
    ],
    calcType: 'amz_closing'
  },
  {
    slug: 'amazon-shipping-fee-calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    title: 'Amazon Shipping & Weight Handling Calculator',
    metaTitle: 'Amazon Shipping Fee Calculator | Easy Ship Weight Handling Rates',
    metaDescription: 'Calculate Amazon Easy Ship courier shipping charges for Local, Regional, and National deliveries across 500g weight slabs.',
    badge: 'Easy Ship Rates',
    subtitle: 'Determine Amazon Easy Ship weight handling fees by delivery distance and shipment weight.',
    formulaDescription: 'Shipping = Base Fee (First 500g) + Addl Slabs (per 500g) + 18% GST',
    inputs: [
      { id: 'weightGrams', label: 'Weight (Grams)', type: 'number', defaultValue: 650, suffix: 'g' },
      {
        id: 'zone',
        label: 'Delivery Zone',
        type: 'select',
        defaultValue: 'national',
        options: [
          { label: 'Local (Intra-City: ₹44 base)', value: 'local' },
          { label: 'Regional (Intra-Zone: ₹53 base)', value: 'regional' },
          { label: 'National (Inter-State: ₹74 base)', value: 'national' }
        ]
      }
    ],
    heroKpi: { label: 'Easy Ship Delivery Fee', subLabel: 'including 18% GST', prefix: '₹' },
    breakdown: [
      { id: 'bdBase', label: 'Base Rate (First 500g)', prefix: '₹' },
      { id: 'bdAddl', label: 'Additional Weight Surcharge', prefix: '₹' },
      { id: 'bdSubtotal', label: 'Pre-Tax Shipping Fee', prefix: '₹' },
      { id: 'bdGst', label: '18% GST on Shipping', prefix: '₹' },
      { id: 'bdTotalShipping', label: 'Total Invoiced Shipping Fee', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Regional Warehouse Optimization:',
    tipText: 'Stocking inventory in regional FCs turns National shipments (₹74) into Regional shipments (₹53), saving you ₹21 per order.',
    faqs: [
      { q: 'What is the Amazon Easy Ship national rate?', a: 'The national standard rate for Easy Ship is ₹74 for the first 500g, plus ₹36 for each additional 500g up to 1kg.' }
    ],
    calcType: 'amz_shipping'
  },
  {
    slug: 'flipkart-commission-calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    title: 'Flipkart Commission Calculator',
    metaTitle: 'Flipkart Commission Calculator | Category Referral Fee Slabs',
    metaDescription: 'Calculate category referral commissions on Flipkart. See exact rupee commission deductions for footwear, clothing, electronics, and home decor.',
    badge: 'Flipkart Slabs',
    subtitle: 'Calculate Flipkart category commission percentages and rupee deductions.',
    formulaDescription: 'Commission = Taxable Selling Price * Flipkart Category %',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 899, prefix: '₹' },
      { id: 'commRate', label: 'Category Commission %', type: 'number', defaultValue: 15.0, suffix: '%' }
    ],
    heroKpi: { label: 'Flipkart Commission Deduction', subLabel: 'referral fee on order', prefix: '₹' },
    breakdown: [
      { id: 'bdTaxable', label: 'Taxable Product Base', prefix: '₹' },
      { id: 'bdRate', label: 'Category Commission Rate', suffix: '%' },
      { id: 'bdCommissionFee', label: 'Commission Fee', prefix: '₹', isTotal: true },
      { id: 'bdGstOnFee', label: '18% GST on Commission', prefix: '₹' }
    ],
    tipTitle: 'Flipkart Marketplace Advantage:',
    tipText: 'Flipkart has strong reach in Tier 2 and Tier 3 cities. Ensure category classification is accurate to avoid being charged higher general merchandise commission rates.',
    faqs: [
      { q: 'What is Flipkart commission rate for footwear?', a: 'Flipkart charges approximately 13% to 15% commission on footwear depending on sub-category.' }
    ],
    calcType: 'fk_commission'
  },
  {
    slug: 'marketplace-commission-calculator',
    category: 'fees',
    categoryLabel: 'Marketplace Fees',
    title: 'Multi-Marketplace Commission Comparison Calculator',
    metaTitle: 'Marketplace Commission Comparison Calculator | Amazon vs Flipkart vs Meesho',
    metaDescription: 'Compare seller commission rates side-by-side across Meesho (0%), Flipkart (4%-16%), Amazon (5%-15%), Myntra, and Snapdeal.',
    badge: 'Cross-Platform Fees',
    subtitle: 'Compare referral commissions across major Indian e-commerce marketplaces for any product price.',
    formulaDescription: 'Commissions Compared Across Meesho (0%), Flipkart, Amazon India, Myntra, Snapdeal',
    inputs: [
      { id: 'price', label: 'Product Selling Price (MRP)', type: 'number', defaultValue: 999, prefix: '₹' },
      { id: 'categoryRate', label: 'Average Marketplace Commission %', type: 'number', defaultValue: 14.0, suffix: '%' }
    ],
    heroKpi: { label: 'Commission Savings on Meesho', subLabel: 'saved vs standard 14% marketplaces', prefix: '₹' },
    breakdown: [
      { id: 'bdMeesho', label: 'Meesho Commission (0%)', prefix: '₹' },
      { id: 'bdFlipkart', label: 'Flipkart Commission (~14%)', prefix: '₹' },
      { id: 'bdAmazon', label: 'Amazon Commission (~13.5%)', prefix: '₹' },
      { id: 'bdMyntra', label: 'Myntra Commission (~18%)', prefix: '₹' },
      { id: 'bdSnapdeal', label: 'Snapdeal Commission (~6%)', prefix: '₹' }
    ],
    tipTitle: 'Multi-Channel Strategy:',
    tipText: 'List high-ticket, brand-conscious items on Amazon and Flipkart, while listing competitive budget items on Meesho to benefit from 0% commission.',
    faqs: [
      { q: 'Why do commissions differ across marketplaces?', a: 'Marketplaces price commissions based on their customer demographics, advertising spend, brand equity, and fulfillment network costs.' }
    ],
    calcType: 'multi_comm'
  },

  // ==========================================
  // 6. ADVERTISING CALCULATORS
  // ==========================================
  {
    slug: 'roas-calculator',
    category: 'advertising',
    categoryLabel: 'Advertising & PPC',
    title: 'ROAS Calculator (Return on Ad Spend)',
    metaTitle: 'ROAS Calculator | Return on Ad Spend for Meta, Google & Amazon Ads',
    metaDescription: 'Calculate Return on Ad Spend (ROAS) ratio and percentage. See if your Facebook, Google, and Amazon advertising campaigns are profitable.',
    badge: 'Ad Performance',
    subtitle: 'Measure the revenue generated for every single rupee spent on digital ads.',
    formulaDescription: 'ROAS = Revenue from Ads / Ad Spend (e.g. 4.0x or 400%)',
    inputs: [
      { id: 'adSpend', label: 'Total Ad Spend', type: 'number', defaultValue: 10000, prefix: '₹' },
      { id: 'adRevenue', label: 'Attributed Ad Sales Revenue', type: 'number', defaultValue: 45000, prefix: '₹' }
    ],
    heroKpi: { label: 'Calculated ROAS', subLabel: 'return on advertising spend', suffix: 'x' },
    breakdown: [
      { id: 'bdSpend', label: 'Ad Capital Spent', prefix: '₹' },
      { id: 'bdRevenue', label: 'Attributed Sales Generated', prefix: '₹' },
      { id: 'bdProfit', label: 'Gross Profit from Ads', prefix: '₹' },
      { id: 'bdRoasMultiplier', label: 'ROAS Multiplier', suffix: 'x', isTotal: true },
      { id: 'bdRoasPercentage', label: 'ROAS Percentage', suffix: '%' }
    ],
    tipTitle: 'ROAS Benchmark:',
    tipText: 'A high ROAS does not always mean high profit if your product margin is thin. Always compare your actual ROAS against your Break-Even ROAS.',
    faqs: [
      { q: 'What is a good ROAS for e-commerce in India?', a: 'A good ROAS is typically between 3.5x and 5.0x for D2C brands, depending on product gross margin.' }
    ],
    calcType: 'roas'
  },
  {
    slug: 'acos-calculator',
    category: 'advertising',
    categoryLabel: 'Advertising & PPC',
    title: 'ACOS Calculator (Advertising Cost of Sales)',
    metaTitle: 'ACOS Calculator | Amazon PPC Advertising Cost of Sales Calculator',
    metaDescription: 'Calculate ACOS percentage for Amazon Sponsored Products & Flipkart PLA campaigns. Compare against target profit margins.',
    badge: 'Amazon PPC Metric',
    subtitle: 'Measure advertising efficiency on Amazon and Flipkart Sponsored Ads.',
    formulaDescription: 'ACOS % = (Ad Spend / Ad Sales Revenue) * 100',
    inputs: [
      { id: 'adSpend', label: 'Total PPC Ad Spend', type: 'number', defaultValue: 5000, prefix: '₹' },
      { id: 'adSales', label: 'Total Sales from PPC', type: 'number', defaultValue: 25000, prefix: '₹' }
    ],
    heroKpi: { label: 'Calculated ACOS', subLabel: 'percentage of sales spent on ads', suffix: '%' },
    breakdown: [
      { id: 'bdSpend', label: 'PPC Ad Spend', prefix: '₹' },
      { id: 'bdSales', label: 'Sales from Ads', prefix: '₹' },
      { id: 'bdAcos', label: 'ACOS Percentage', suffix: '%', isTotal: true },
      { id: 'bdRoas', label: 'Equivalent ROAS Multiplier', suffix: 'x' }
    ],
    tipTitle: 'ACOS Target:',
    tipText: 'Your target ACOS should always be LOWER than your pre-ad profit margin. If your margin is 25%, an ACOS below 25% guarantees campaign profitability.',
    faqs: [
      { q: 'How is ACOS related to ROAS?', a: 'ACOS and ROAS are mathematical inverses: ACOS = 1 / ROAS. For example, a 4.0x ROAS equals a 25% ACOS.' }
    ],
    calcType: 'acos'
  },
  {
    slug: 'tacos-calculator',
    category: 'advertising',
    categoryLabel: 'Advertising & PPC',
    title: 'TACOS Calculator (Total ACOS)',
    metaTitle: 'TACOS Calculator | Total Advertising Cost of Sales for Amazon Sellers',
    metaDescription: 'Calculate TACOS to see the true holistic impact of advertising spend across your entire brand sales (both organic and paid).',
    badge: 'Holistic Growth',
    subtitle: 'Measure ad spend as a percentage of TOTAL store revenue (paid + organic sales).',
    formulaDescription: 'TACOS % = (Ad Spend / Total Store Revenue) * 100',
    inputs: [
      { id: 'adSpend', label: 'Total Monthly Ad Spend', type: 'number', defaultValue: 25000, prefix: '₹' },
      { id: 'totalRevenue', label: 'Total Store Revenue (Organic + Ads)', type: 'number', defaultValue: 250000, prefix: '₹' }
    ],
    heroKpi: { label: 'Calculated TACOS', subLabel: 'percentage of total store revenue', suffix: '%' },
    breakdown: [
      { id: 'bdSpend', label: 'Total Ad Spend', prefix: '₹' },
      { id: 'bdTotalRev', label: 'Total Store Revenue', prefix: '₹' },
      { id: 'bdTacos', label: 'TACOS Percentage', suffix: '%', isTotal: true }
    ],
    tipTitle: 'Healthy TACOS Trend:',
    tipText: 'A healthy brand has a declining or flat TACOS over time (typically 8%-14%), showing that paid ads are driving organic keyword ranking and repeat sales.',
    faqs: [
      { q: 'Why is TACOS better than ACOS?', a: 'ACOS only looks at direct ad sales. TACOS looks at overall business health, showing if PPC ads are fueling organic sales velocity.' }
    ],
    calcType: 'tacos'
  },
  {
    slug: 'break-even-roas-calculator',
    category: 'advertising',
    categoryLabel: 'Advertising & PPC',
    title: 'Break-Even ROAS Calculator',
    metaTitle: 'Break-Even ROAS Calculator | Minimum Ad Return to Avoid Loss',
    metaDescription: 'Calculate the minimum ROAS your ads must achieve before you start losing money, based on your product profit margins.',
    badge: 'Ad Safety Threshold',
    subtitle: 'Find the minimum ROAS required for your Meta, Google, and Amazon ads to not lose a single rupee.',
    formulaDescription: 'Break-Even ROAS = 1 / (Profit Margin % / 100)',
    inputs: [
      { id: 'price', label: 'Selling Price (MRP)', type: 'number', defaultValue: 999, prefix: '₹' },
      { id: 'cogs', label: 'Product Cost (COGS)', type: 'number', defaultValue: 320, prefix: '₹' },
      { id: 'feesAndShipping', label: 'Courier, Platform Fees & Packaging', type: 'number', defaultValue: 280, prefix: '₹' }
    ],
    heroKpi: { label: 'Break-Even ROAS Threshold', subLabel: 'minimum ad multiplier needed to break even', suffix: 'x' },
    breakdown: [
      { id: 'bdMarginAmt', label: 'Profit Available for Ads', prefix: '₹' },
      { id: 'bdMarginRate', label: 'Pre-Ad Profit Margin %', suffix: '%' },
      { id: 'bdBreakEvenRoas', label: 'Minimum Required ROAS', suffix: 'x', isTotal: true },
      { id: 'bdMaxAcos', label: 'Maximum Allowable ACOS %', suffix: '%' }
    ],
    tipTitle: 'Stop Loss Rule:',
    tipText: 'If a campaign consistently runs below your Break-Even ROAS, you are subsidizing customer purchases out of pocket. Turn it off or optimize creatives.',
    faqs: [
      { q: 'How do you calculate break-even ROAS?', a: 'Divide 100 by your profit margin percentage. For example, a 25% margin gives 100 / 25 = 4.0x break-even ROAS.' }
    ],
    calcType: 'be_roas'
  },
  {
    slug: 'cost-per-order-calculator',
    category: 'advertising',
    categoryLabel: 'Advertising & PPC',
    title: 'Cost Per Order (CPO / CPA) Calculator',
    metaTitle: 'Cost Per Order Calculator (CPO / CPA) | E-Commerce Acquisition Cost',
    metaDescription: 'Calculate Cost Per Order (CPO) and Cost Per Acquisition (CPA) on your marketing channels.',
    badge: 'Order Cost',
    subtitle: 'Determine how much you pay on average in advertising to generate a single customer order.',
    formulaDescription: 'Cost Per Order = Total Advertising Spend / Total Orders Acquired',
    inputs: [
      { id: 'adSpend', label: 'Total Marketing Spend', type: 'number', defaultValue: 30000, prefix: '₹' },
      { id: 'orders', label: 'Total Orders Generated', type: 'number', defaultValue: 120 }
    ],
    heroKpi: { label: 'Cost Per Order (CPO)', subLabel: 'average ad cost per sale', prefix: '₹' },
    breakdown: [
      { id: 'bdSpend', label: 'Total Ad Spend', prefix: '₹' },
      { id: 'bdOrders', label: 'Total Converted Orders' },
      { id: 'bdCpo', label: 'Average Cost Per Order', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Funnel Optimization:',
    tipText: 'Improving your website conversion rate from 1.5% to 3.0% cuts your Cost Per Order in half without spending an extra rupee on ads.',
    faqs: [
      { q: 'What is a good Cost Per Order in India?', a: 'For products priced under ₹1000, target a CPO below ₹200–₹250 to remain comfortably profitable.' }
    ],
    calcType: 'cpo'
  },
  {
    slug: 'customer-acquisition-cost-calculator',
    category: 'advertising',
    categoryLabel: 'Advertising & PPC',
    title: 'Customer Acquisition Cost (CAC) Calculator',
    metaTitle: 'Customer Acquisition Cost Calculator (CAC) | D2C Marketing Efficiency',
    metaDescription: 'Calculate your blended and paid Customer Acquisition Cost (CAC) and compare against Customer Lifetime Value (LTV).',
    badge: 'Growth Metric',
    subtitle: 'Measure the true full cost of acquiring a new paying customer.',
    formulaDescription: 'CAC = (Total Ad Spend + Marketing Agency + Software Costs) / New Customers',
    inputs: [
      { id: 'adSpend', label: 'Total Ad Spend', type: 'number', defaultValue: 50000, prefix: '₹' },
      { id: 'marketingOverhead', label: 'Marketing Agency & Tool Costs', type: 'number', defaultValue: 15000, prefix: '₹' },
      { id: 'newCustomers', label: 'New Customers Acquired', type: 'number', defaultValue: 250 },
      { id: 'customerLtv', label: 'Customer Lifetime Value (LTV)', type: 'number', defaultValue: 1200, prefix: '₹' }
    ],
    heroKpi: { label: 'Customer Acquisition Cost (CAC)', subLabel: 'cost per new buyer', prefix: '₹' },
    breakdown: [
      { id: 'bdTotalCost', label: 'Total Acquisition Expense', prefix: '₹' },
      { id: 'bdCustomers', label: 'New Buyers Acquired' },
      { id: 'bdCac', label: 'Final Blended CAC', prefix: '₹', isTotal: true },
      { id: 'bdLtvCacRatio', label: 'LTV to CAC Ratio', suffix: 'x' }
    ],
    tipTitle: 'LTV to CAC Ratio:',
    tipText: 'An LTV:CAC ratio of 3x or higher means your brand has strong organic retention and healthy unit economics.',
    faqs: [
      { q: 'What is LTV:CAC ratio?', a: 'It compares the total revenue or gross profit a customer brings over their lifetime against the cost to acquire them.' }
    ],
    calcType: 'cac'
  },
  {
    slug: 'ad-profit-calculator',
    category: 'advertising',
    categoryLabel: 'Advertising & PPC',
    title: 'Ad Profit & Campaign ROI Calculator',
    metaTitle: 'Ad Profit Calculator | Net In-Hand Profit from Ad Campaigns',
    metaDescription: 'Calculate the true bottom-line profit generated by your ad campaigns after deducting product manufacturing cost, courier fees, and ad spend.',
    badge: 'Campaign P&L',
    subtitle: 'Calculate net in-hand profit generated from your advertising spend after all product and delivery costs.',
    formulaDescription: 'Ad Profit = Ad Revenue - Product COGS - Shipping - Platform Fees - Ad Spend',
    inputs: [
      { id: 'adRevenue', label: 'Revenue Generated from Ads', type: 'number', defaultValue: 100000, prefix: '₹' },
      { id: 'adSpend', label: 'Total Ad Spend', type: 'number', defaultValue: 25000, prefix: '₹' },
      { id: 'cogsRate', label: 'Product Cost (COGS) % of Revenue', type: 'number', defaultValue: 30.0, suffix: '%' },
      { id: 'fulfillmentRate', label: 'Shipping & Processing % of Revenue', type: 'number', defaultValue: 15.0, suffix: '%' }
    ],
    heroKpi: { label: 'Net In-Hand Ad Profit', subLabel: 'clean profit after all campaign costs', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Ad Sales Revenue', prefix: '₹' },
      { id: 'bdAdSpend', label: 'Advertising Spend', prefix: '- ₹', isNegative: true },
      { id: 'bdCogs', label: 'Product COGS Expense', prefix: '- ₹', isNegative: true },
      { id: 'bdFulfillment', label: 'Shipping & Delivery Expenses', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net Campaign Profit', prefix: '₹', isTotal: true },
      { id: 'bdNetMargin', label: 'Net Campaign Margin %', suffix: '%' }
    ],
    tipTitle: 'Scale Profitably:',
    tipText: 'Scaling ad budgets often degrades ROAS. Use this calculator to monitor your net profit margin before increasing daily ad budgets.',
    faqs: [
      { q: 'Why do high ROAS campaigns sometimes lose money?', a: 'If product COGS and courier shipping eat up 75% of revenue, even a 3x ROAS (which costs 33% of revenue) results in a net financial loss.' }
    ],
    calcType: 'ad_profit'
  },

  // ==========================================
  // 7. MARKETPLACE OPERATIONS CALCULATORS
  // ==========================================
  {
    slug: 'marketplace-settlement-calculator',
    category: 'operations',
    categoryLabel: 'Operations & Inventory',
    title: 'Marketplace Settlement & Bank Payout Calculator',
    metaTitle: 'Marketplace Settlement Calculator | Bank Deposit Payout Calculator',
    metaDescription: 'Calculate exact net bank settlement deposits after marketplace commissions, fixed fees, courier charges, TCS, TDS, and GST deductions.',
    badge: 'Bank Payout',
    subtitle: 'Determine exact cash deposit hitting your bank account after all marketplace deductions.',
    formulaDescription: 'Bank Settlement = Order Price - (Commission + Fixed + Ship)*1.18 - TCS (1%) - TDS (0.1%)',
    inputs: [
      { id: 'price', label: 'Order Selling Price (MRP)', type: 'number', defaultValue: 999, prefix: '₹' },
      { id: 'commission', label: 'Marketplace Commission Fee', type: 'number', defaultValue: 135, prefix: '₹' },
      { id: 'fixedFee', label: 'Fixed Closing Fee', type: 'number', defaultValue: 25, prefix: '₹' },
      { id: 'shippingFee', label: 'Courier Shipping Fee', type: 'number', defaultValue: 65, prefix: '₹' }
    ],
    heroKpi: { label: 'Expected Bank Settlement', subLabel: 'cash deposit in your bank account', prefix: '₹' },
    breakdown: [
      { id: 'bdOrderPrice', label: 'Customer Order Price', prefix: '₹' },
      { id: 'bdFees', label: 'Marketplace Commission & Fees', prefix: '- ₹', isNegative: true },
      { id: 'bdGst', label: '18% GST on Fees', prefix: '- ₹', isNegative: true },
      { id: 'bdTcsTds', label: 'TCS (1%) & TDS (0.1%)', prefix: '- ₹', isNegative: true },
      { id: 'bdSettlement', label: 'Final Net Bank Payout', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Settlement Reconciliation:',
    tipText: 'Match your bank statement credit transactions against marketplace payment settlement sheets every Tuesday and Thursday.',
    faqs: [
      { q: 'When do marketplaces deposit seller settlements in India?', a: 'Amazon and Flipkart typically settle payments 7 to 10 days after order delivery, while Meesho settles on a 7-day cycle.' }
    ],
    calcType: 'settlement'
  },
  {
    slug: 'seller-payout-calculator',
    category: 'operations',
    categoryLabel: 'Operations & Inventory',
    title: 'Seller Payout Calculator',
    metaTitle: 'Seller Payout Calculator | Net Payout After E-Commerce Deductions',
    metaDescription: 'Calculate net seller payout after commission, shipping fees, returns reserve, and government tax deductions.',
    badge: 'Cash Deposit',
    subtitle: 'Calculate exact net payout deposited by e-commerce platforms after deductions and return allowances.',
    formulaDescription: 'Payout = Gross Orders - Deductions - Return Adjustments',
    inputs: [
      { id: 'grossOrderValue', label: 'Total Order Value', type: 'number', defaultValue: 50000, prefix: '₹' },
      { id: 'platformDeductionRate', label: 'Platform Deductions % (Fees + Shipping)', type: 'number', defaultValue: 28.0, suffix: '%' },
      { id: 'returnsReserveRate', label: 'Returns Hold Reserve %', type: 'number', defaultValue: 10.0, suffix: '%' }
    ],
    heroKpi: { label: 'Net Disbursed Payout', subLabel: 'cash transferred to seller account', prefix: '₹' },
    breakdown: [
      { id: 'bdGross', label: 'Gross Order Value', prefix: '₹' },
      { id: 'bdDeductions', label: 'Platform Deductions & Courier', prefix: '- ₹', isNegative: true },
      { id: 'bdReturnsReserve', label: 'Returns Hold Reserve', prefix: '- ₹', isNegative: true },
      { id: 'bdNetPayout', label: 'Net Cash Disbursed', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Reserve Release:',
    tipText: 'Most platforms hold a 14-day rolling return reserve to cover customer refunds. This reserve is credited back once the return window closes.',
    faqs: [
      { q: 'Why is my payout lower than expected?', a: 'Check for courier weight discrepancies, return reverse shipping deductions, and 18% GST on platform service fees.' }
    ],
    calcType: 'payout'
  },
  {
    slug: 'marketplace-reconciliation-calculator',
    category: 'operations',
    categoryLabel: 'Operations & Inventory',
    title: 'Marketplace Payment Reconciliation Calculator',
    metaTitle: 'Marketplace Reconciliation Calculator | Find Missing Payments & Deductions',
    metaDescription: 'Reconcile your order dispatches against bank settlements to detect unbilled sales, excess weight penalties, and missing returns.',
    badge: 'Audit & Recovery',
    subtitle: 'Audit marketplace accounts to identify missing payouts, incorrect weight charges, and uncredited returns.',
    formulaDescription: 'Discrepancy = Expected Settlement - Actual Received Payout',
    inputs: [
      { id: 'expectedSettlement', label: 'Expected Settlement Value (Order Sheet)', type: 'number', defaultValue: 150000, prefix: '₹' },
      { id: 'actualPayout', label: 'Actual Payout Received in Bank', type: 'number', defaultValue: 138500, prefix: '₹' }
    ],
    heroKpi: { label: 'Payment Discrepancy', subLabel: 'unreconciled amount to claim back', prefix: '₹' },
    breakdown: [
      { id: 'bdExpected', label: 'Expected Payout Amount', prefix: '₹' },
      { id: 'bdActual', label: 'Actual Bank Deposit', prefix: '₹' },
      { id: 'bdDiscrepancy', label: 'Unreconciled Shortage', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Claim Window:',
    tipText: 'Amazon and Flipkart have a strict 30-to-45 day claim window for weight discrepancies and missing return inventory reimbursements. Reconcile promptly.',
    faqs: [
      { q: 'How do I raise a ticket for missing payments?', a: 'File an SAFE-T claim on Amazon or a Seller Protection Fund (SPF) claim on Flipkart with proof of dispatch and invoice details.' }
    ],
    calcType: 'reconciliation'
  },
  {
    slug: 'monthly-seller-profit-calculator',
    category: 'operations',
    categoryLabel: 'Operations & Inventory',
    title: 'Monthly Seller Profit & P&L Calculator',
    metaTitle: 'Monthly Seller Profit Calculator | E-Commerce P&L Statement',
    metaDescription: 'Calculate full monthly P&L for your e-commerce business: revenue, product costs, shipping, advertising, staff, and net profit.',
    badge: 'Monthly P&L',
    subtitle: 'Comprehensive monthly profit & loss calculation across your entire e-commerce operations.',
    formulaDescription: 'Net Monthly Profit = Revenue - COGS - Platform Fees - Shipping - Ads - Overhead Expenses',
    inputs: [
      { id: 'monthlyRevenue', label: 'Total Monthly Sales Revenue', type: 'number', defaultValue: 500000, prefix: '₹' },
      { id: 'totalCogs', label: 'Total Product Sourcing (COGS)', type: 'number', defaultValue: 175000, prefix: '₹' },
      { id: 'marketplaceFees', label: 'Total Marketplace Commissions & Shipping', type: 'number', defaultValue: 125000, prefix: '₹' },
      { id: 'adSpend', label: 'Advertising & Marketing Spend', type: 'number', defaultValue: 65000, prefix: '₹' },
      { id: 'warehouseOverhead', label: 'Rent, Team Salaries & Packaging', type: 'number', defaultValue: 40000, prefix: '₹' }
    ],
    heroKpi: { label: 'Net Monthly Operating Profit', subLabel: 'clean business earnings for the month', prefix: '₹' },
    breakdown: [
      { id: 'bdRevenue', label: 'Total Monthly Revenue', prefix: '₹' },
      { id: 'bdCogs', label: 'Cost of Goods Sold (COGS)', prefix: '- ₹', isNegative: true },
      { id: 'bdFees', label: 'Platform Fees & Courier Delivery', prefix: '- ₹', isNegative: true },
      { id: 'bdAds', label: 'Advertising Spend', prefix: '- ₹', isNegative: true },
      { id: 'bdOverhead', label: 'Warehouse & Staff Overhead', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Net Monthly Business Profit', prefix: '₹', isTotal: true },
      { id: 'bdNetMargin', label: 'Net Business Margin %', suffix: '%' }
    ],
    tipTitle: 'Financial Health:',
    tipText: 'Maintain at least 3 months of operating expenses in reserve to handle seasonal demand fluctuations and holiday working capital requirements.',
    faqs: [
      { q: 'What is a good net profit margin for an Indian online seller?', a: 'After all marketplace fees, ad spend, and overhead, a healthy business earns between 12% and 20% net profit.' }
    ],
    calcType: 'monthly_profit'
  },
  {
    slug: 'bulk-order-profit-calculator',
    category: 'operations',
    categoryLabel: 'Operations & Inventory',
    title: 'Bulk Order Profit Calculator',
    metaTitle: 'Bulk Order Profit Calculator | Volume Discount & B2B Profit Margin',
    metaDescription: 'Calculate profit margins and total earnings when offering volume discounts on large B2B or wholesale orders.',
    badge: 'Volume Pricing',
    subtitle: 'Determine total profit when offering tiered volume discounts on large bulk shipments.',
    formulaDescription: 'Bulk Profit = Quantity * (Discounted Unit Price - Unit Cost) - Freight',
    inputs: [
      { id: 'basePrice', label: 'Standard Retail Price', type: 'number', defaultValue: 699, prefix: '₹' },
      { id: 'unitCost', label: 'Product Unit Cost (COGS)', type: 'number', defaultValue: 250, prefix: '₹' },
      { id: 'discountRate', label: 'Volume Discount Offered %', type: 'number', defaultValue: 20.0, suffix: '%' },
      { id: 'orderUnits', label: 'Order Quantity (Units)', type: 'number', defaultValue: 250 },
      { id: 'bulkFreight', label: 'Bulk Freight & Pallet Shipping', type: 'number', defaultValue: 3500, prefix: '₹' }
    ],
    heroKpi: { label: 'Total Bulk Order Profit', subLabel: 'net profit on entire bulk order', prefix: '₹' },
    breakdown: [
      { id: 'bdUnitPrice', label: 'Discounted Price Per Unit', prefix: '₹' },
      { id: 'bdGrossRevenue', label: 'Total Bulk Invoiced Value', prefix: '₹' },
      { id: 'bdTotalCogs', label: 'Total Product Manufacturing Cost', prefix: '- ₹', isNegative: true },
      { id: 'bdFreight', label: 'Bulk Freight Transport', prefix: '- ₹', isNegative: true },
      { id: 'bdNetProfit', label: 'Final Net Bulk Profit', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Volume Efficiency:',
    tipText: 'Even with a 20% discount, bulk orders eliminate individual packing boxes, courier tracking fees, and return risks, yielding higher overall cash profit.',
    faqs: [
      { q: 'How do you price bulk orders for corporate gifting?', a: 'Calculate your unit manufacturing cost, add freight, and target a minimum 25% gross profit margin on the total invoice.' }
    ],
    calcType: 'bulk_order'
  },
  {
    slug: 'inventory-profit-calculator',
    category: 'operations',
    categoryLabel: 'Operations & Inventory',
    title: 'Inventory Profit & Valuation Calculator',
    metaTitle: 'Inventory Profit Calculator | Stock Valuation & Unrealized Margin',
    metaDescription: 'Calculate the total potential profit and gross valuation locked in your warehouse stock inventory.',
    badge: 'Stock Valuation',
    subtitle: 'Calculate total potential profit and gross retail value of your current warehouse inventory.',
    formulaDescription: 'Inventory Profit = (Total Stock Units * Retail Price) - Total Inventory Cost',
    inputs: [
      { id: 'stockUnits', label: 'Total Units in Stock', type: 'number', defaultValue: 1200 },
      { id: 'costPerUnit', label: 'Purchase Cost Per Unit (COGS)', type: 'number', defaultValue: 280, prefix: '₹' },
      { id: 'sellingPrice', label: 'Expected Retail Selling Price', type: 'number', defaultValue: 699, prefix: '₹' }
    ],
    heroKpi: { label: 'Potential Inventory Profit', subLabel: 'unrealized profit in warehouse stock', prefix: '₹' },
    breakdown: [
      { id: 'bdStockValue', label: 'Total Retail Valuation', prefix: '₹' },
      { id: 'bdCostInvested', label: 'Total Capital Locked in Stock', prefix: '₹' },
      { id: 'bdUnrealizedProfit', label: 'Total Potential Profit', prefix: '₹', isTotal: true },
      { id: 'bdMarginRate', label: 'Gross Catalog Margin %', suffix: '%' }
    ],
    tipTitle: 'Aged Inventory Warning:',
    tipText: 'Inventory sitting unsold for over 90 days ties up working capital and incurs warehouse storage fees. Run flash sales or discount bundles to liquidate slow movers.',
    faqs: [
      { q: 'What is dead stock in e-commerce?', a: 'Dead stock refers to products in your warehouse that have generated zero sales for 90 to 180 days.' }
    ],
    calcType: 'inventory_profit'
  },
  {
    slug: 'inventory-reorder-calculator',
    category: 'operations',
    categoryLabel: 'Operations & Inventory',
    title: 'Inventory Reorder Point (ROP) Calculator',
    metaTitle: 'Inventory Reorder Point Calculator | Reorder Quantity & Safety Stock',
    metaDescription: 'Calculate your exact Reorder Point (ROP) and safety stock levels to prevent stockouts during peak e-commerce sales seasons.',
    badge: 'Supply Chain',
    subtitle: 'Determine the exact stock level at which you must place a purchase order with your factory.',
    formulaDescription: 'Reorder Point (ROP) = (Daily Sales * Lead Time Days) + Safety Stock',
    inputs: [
      { id: 'dailySales', label: 'Average Daily Units Sold', type: 'number', defaultValue: 35 },
      { id: 'leadTimeDays', label: 'Supplier Lead Time (Days to manufacture & deliver)', type: 'number', defaultValue: 14 },
      { id: 'safetyDays', label: 'Safety Buffer Stock (Days)', type: 'number', defaultValue: 7 }
    ],
    heroKpi: { label: 'Reorder Point (ROP)', subLabel: 'place order when stock reaches this level', suffix: ' units' },
    breakdown: [
      { id: 'bdLeadTimeDemand', label: 'Sales Demand During Lead Time', suffix: ' units' },
      { id: 'bdSafetyStock', label: 'Safety Buffer Stock', suffix: ' units' },
      { id: 'bdReorderPoint', label: 'Critical Reorder Trigger Point', suffix: ' units', isTotal: true }
    ],
    tipTitle: 'Festive Season Buffer:',
    tipText: 'Double your safety stock 45 days before Diwali, Great Indian Festival, and Big Billion Days to prevent running out of stock during peak demand.',
    faqs: [
      { q: 'What is lead time in inventory management?', a: 'Lead time is the total number of days between placing a purchase order with a supplier and having the goods ready on your warehouse shelves.' }
    ],
    calcType: 'inventory_reorder'
  },
  {
    slug: 'minimum-selling-price-calculator',
    category: 'operations',
    categoryLabel: 'Operations & Inventory',
    title: 'Minimum Selling Price Calculator (Floor Price)',
    metaTitle: 'Minimum Selling Price Calculator | Floor Price to Avoid Losses',
    metaDescription: 'Calculate the absolute lowest selling price (floor price) you can charge on marketplaces without losing money.',
    badge: 'Price Floor',
    subtitle: 'Determine the absolute bottom floor price you can list at without suffering a financial loss.',
    formulaDescription: 'Floor Price = (COGS + Shipping + Packaging + Return Buffer) / (1 - Platform Fee % - Tax %)',
    inputs: [
      { id: 'cogs', label: 'Product Cost (COGS)', type: 'number', defaultValue: 280, prefix: '₹' },
      { id: 'shipping', label: 'Forward Courier Shipping', type: 'number', defaultValue: 65, prefix: '₹' },
      { id: 'packaging', label: 'Packaging & Labels', type: 'number', defaultValue: 15, prefix: '₹' },
      { id: 'platformFeeRate', label: 'Total Platform Fees % (Commission + Closing + Tax)', type: 'number', defaultValue: 18.0, suffix: '%' },
      { id: 'returnBuffer', label: 'Expected RTO Return Buffer / Unit', type: 'number', defaultValue: 35, prefix: '₹' }
    ],
    heroKpi: { label: 'Absolute Minimum Floor Price', subLabel: 'lowest price to avoid losing money', prefix: '₹' },
    breakdown: [
      { id: 'bdDirectCost', label: 'Direct Product, Ship & Packaging Cost', prefix: '₹' },
      { id: 'bdReturnBuffer', label: 'RTO / Return Loss Reserve', prefix: '+ ₹' },
      { id: 'bdFloorPrice', label: 'Calculated Floor Selling Price', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Never Price Below Floor:',
    tipText: 'Price wars often cause sellers to lower prices below floor cost, generating high sales volume while burning bank capital. Never list below your floor price.',
    faqs: [
      { q: 'What is a floor price in e-commerce?', a: 'Floor price is the minimum viable selling price that covers all direct product, shipping, marketplace, and return costs with zero loss.' }
    ],
    calcType: 'min_price'
  }
];
