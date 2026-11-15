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
      { q: 'Can sellers claim 18% GST on Amazon FBA fees?', a: 'Yes! All 18% GST charged by Amazon on FBA fees, closing charges, and referral commission is 100% claimable as Input Tax Credit (ITC) in GSTR-3B.' },
      { q: 'Is Amazon FBA or Easy Ship more profitable for small sellers?', a: 'For lightweight products under 500g with fast turnover, FBA often yields higher sales volume due to Prime badges and lower return rates, compensating for storage fees. However, for slow-moving or bulky items, Easy Ship is usually more cost-effective as it avoids FBA monthly storage and removal penalties.' }
    ],
    calcType: 'amazon_fba'
  },
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
{ q: 'What is a healthy profit margin for e-commerce in India?', a: 'A healthy net profit margin for Indian marketplace sellers is 15% to 25% after factoring in all returns, marketplace deductions, and shipping.' },
      { q: "How do you calculate net profit margin percentage?", a: "Net Margin % = (Net Profit ÷ Total Revenue) × 100. For example, if you sell a product for ₹1,000 and keep ₹200 after all costs and marketplace deductions, your net margin is 20%." },
      { q: "What is the difference between markup and profit margin?", a: "Margin is profit divided by selling price, while markup is profit divided by cost. A 50% markup on a ₹100 cost item gives a ₹150 selling price, which is a 33.3% margin." }
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
{ q: 'How do marketplace deductions affect my selling price?', a: 'Because marketplace commissions and payment fees are percentages of the final selling price, you must divide costs by (1 - total fee %) rather than just adding fees to cost.' },
      { q: "What formula determines target selling price from desired margin?", a: "Selling Price = Total Unit Cost ÷ (1 - Desired Margin %). If total costs are ₹300 and you want a 25% margin: ₹300 ÷ (1 - 0.25) = ₹400 selling price." },
      { q: "How do marketplace commissions impact required selling price?", a: "Marketplace deductions must be included in the denominator: Selling Price = (COGS + Shipping) ÷ [1 - (Commission % + Margin % + Tax Factor)]." }
    ],
    calcType: 'selling_price'
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
{ q: 'What is net profit?', a: 'Net profit is the amount of money left over after paying all operating expenses, taxes, raw materials, and selling fees.' },
      { q: "What expenses are deducted to find net profit?", a: "Net profit subtracts product cost (COGS), marketplace referral fees, closing fees, forward & reverse courier charges, ad spend (PPC), warehouse packaging, and overhead expenses from gross revenue." },
      { q: "How is operating net profit different from bank settlement?", a: "Bank settlement is cash credited by platforms before your product production cost, packaging, and office overheads are accounted for." }
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
{ q: 'What is the difference between gross profit and net profit?', a: 'Gross profit only deducts direct product cost (COGS). Net profit deducts all expenses including shipping, advertising, rent, and platform commissions.' },
      { q: "What is a healthy gross profit margin for online brands?", a: "A healthy gross margin in Indian e-commerce is 55% to 75% before marketplace fees, courier charges, and customer acquisition advertising." },
      { q: "What formula calculates gross profit margin?", a: "Gross Profit Margin % = [(Gross Revenue - COGS) ÷ Gross Revenue] × 100." }
    ],
    calcType: 'gross_profit'
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
{ q: 'What is a good ROI for e-commerce inventory?', a: 'A healthy inventory ROI for Indian sellers is 40% to 80% per cycle after accounting for damaged returns and courier deductions.' },
      { q: "What is the formula for Return on Investment (ROI)?", a: "ROI % = (Net Profit ÷ Total Capital Invested) × 100. If you invest ₹10,000 in inventory and earn ₹14,000 back, your net profit is ₹4,000 and ROI is 40%." },
      { q: "How does inventory turnover speed affect annualized ROI?", a: "A 20% ROI achieved 6 times a year (inventory turning every 60 days) yields an annualized return of 120% on your working capital." }
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
{ q: 'How do you price wholesale products?', a: 'Standard wholesale pricing is typically 2x manufacturing cost, and retail price is 2x wholesale price.' },
      { q: "What discount margin do retail distributors typically expect?", a: "Retailers and distributors typically expect a 35% to 50% discount off MRP, meaning wholesale prices should generally be set at 50% to 65% of MRP." },
      { q: "How do wholesale orders reduce return risk?", a: "B2B wholesale orders are non-returnable bulk sales with payment in advance or against credit terms, completely eliminating consumer COD RTO return burn." }
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
{ q: 'Is dropshipping profitable in India?', a: 'Yes, but only if you select products with at least 3x markup over supplier cost to absorb advertising CPA and COD courier return losses.' },
      { q: "Why do most Indian dropshippers lose money?", a: "High COD failure rates (30%+ RTO) and rising Meta ad acquisition costs (CPA ₹250–₹400) deplete margins if product pricing does not include an upfront RTO buffer." },
      { q: "How can dropshippers minimize RTO delivery failures?", a: "Call every COD customer to confirm shipping address and PIN code before dispatch, and offer a ₹30–₹50 instant discount incentive for prepaid payment." }
    ],
    calcType: 'dropshipping'
  },

  // ==========================================
  // 3. SHIPPING & RETURN CALCULATORS
  // ==========================================
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
{ q: 'How is volumetric weight calculated in India?', a: 'Standard Indian logistics divisor is 5000: Volumetric Weight in Kg = (Length × Width × Height in cm) / 5000.' },
      { q: "How do courier aggregators charge volumetric weight?", a: "Couriers calculate Volumetric Weight as (Length × Width × Height in cm) ÷ 5000. You are billed on whichever is higher between actual dead weight and volumetric weight." },
      { q: "How can sellers reduce volumetric shipping charges?", a: "Use vacuum packing for apparel, custom-fit boxes for fragile goods, and eliminate empty void space inside polybags." }
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
{ q: 'What is a courier weight discrepancy?', a: 'When the courier scans your package heavier than your actual dispatch weight, deducting extra charges from your account.' },
      { q: "What surcharges are added to base courier rates in India?", a: "Courier bills typically include a base weight charge (500g slab), fuel surcharge (15%–25%), COD collection fee (₹35–₹50), and 18% GST on the total invoice." },
      { q: "How are courier weight disputes handled?", a: "Audit your courier weight bills regularly using 3D automated dimension scanners or scale photos to dispute weight overcharging with courier aggregators." }
    ],
    calcType: 'courier_charges'
  },
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
{ q: 'How do you extract 18% GST from MRP?', a: 'Divide the MRP by 1.18 to find the base taxable price. The remaining difference is the 18% GST.' },
      { q: "What is the reverse GST formula for MRP?", a: "Base Price = MRP ÷ (1 + GST Rate / 100). For an item sold at ₹1,180 with 18% GST: Base = ₹1,180 ÷ 1.18 = ₹1,000, and GST is ₹180." },
      { q: "Is GST included in customer listing prices on marketplaces?", a: "Yes, in Indian e-commerce, consumer protection laws mandate that all listed selling prices and MRPs must be inclusive of all taxes." }
    ],
    calcType: 'gst_inc_exc'
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
{ q: 'Can composition dealers claim ITC?', a: 'No. Businesses registered under the GST Composition Scheme cannot claim Input Tax Credit.' },
      { q: "Which e-commerce business expenses qualify for GST ITC?", a: "GST paid on raw materials, packaging boxes, courier charges, platform referral fees, warehouse rent, and advertising invoices can all be claimed as ITC." },
      { q: "Can composition dealers claim Input Tax Credit?", a: "No, sellers registered under the GST Composition Scheme cannot collect tax or claim Input Tax Credit on input purchases." }
    ],
    calcType: 'itc'
  },
  {
    slug: 'tcs-calculator',
    category: 'gst',
    categoryLabel: 'GST & Taxes',
    title: 'TCS Calculator for E-Commerce Sellers',
    metaTitle: 'TCS Calculator for E-Commerce (0.5%) | Tax Collected at Source',
    metaDescription: 'Calculate the 0.5% Tax Collected at Source (TCS) deducted by marketplaces under GST law, and learn how to claim it back.',
    badge: '0.5% GST TCS',
    subtitle: 'Calculate 0.5% Tax Collected at Source deducted by Amazon, Flipkart, and Meesho on net taxable supplies.',
    formulaDescription: 'TCS = 0.5% * Net Taxable Value (Sales - Returns)',
    inputs: [
      { id: 'grossSales', label: 'Monthly Gross Sales Value', type: 'number', defaultValue: 300000, prefix: '₹' },
      { id: 'returnsValue', label: 'Monthly Returns / Cancellations', type: 'number', defaultValue: 50000, prefix: '₹' }
    ],
    heroKpi: { label: '0.5% TCS Deducted by Platform', subLabel: 'refundable against monthly GST liabilities', prefix: '₹' },
    breakdown: [
      { id: 'bdNetSupply', label: 'Net Taxable Supplies (Sales - Returns)', prefix: '₹' },
      { id: 'bdTcsAmount', label: '0.5% TCS Deducted (0.25% CGST + 0.25% SGST)', prefix: '₹', isTotal: true }
    ],
    tipTitle: 'Claiming TCS Cash:',
    tipText: 'TCS is not an expense. You can accept the TCS return on the GST portal monthly, and the money gets credited directly into your Electronic Cash Ledger.',
    faqs: [
{ q: 'How do I claim TCS back?', a: 'Log in to the GST Portal > Services > Returns > TDS and TCS credit received, file the return, and the amount moves to your cash ledger.' },
      { q: "What is the current TCS rate for e-commerce operators in India?", a: "E-commerce operators deduct 0.5% (0.25% CGST + 0.25% SGST, or 0.5% IGST) Tax Collected at Source (TCS) under Section 52 on net taxable supplies." },
      { q: "How do sellers claim back 0.5% TCS deducted by marketplaces?", a: "Accept the TCS credit ledger in your GST portal dashboard (Services > Returns > TDS and TCS Credit Received) to credit it into your cash ledger." }
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
{ q: 'What is Section 194-O?', a: 'Under the Income Tax Act, e-commerce operators must deduct 0.1% TDS on the gross sales value of goods facilitated through their platform.' },
      { q: "Who is exempt from Section 194-O TDS on marketplaces?", a: "Individual or HUF sellers whose gross sales through an e-commerce platform do not exceed ₹5,00,000 during the financial year and who provide their PAN/Aadhaar are exempt." },
      { q: "Where does Section 194-O TDS reflect for tax filing?", a: "TDS deducted reflects in your Form 26AS and Annual Information Statement (AIS) and directly offsets your annual advance tax or income tax liability." }
    ],
    calcType: 'tds'
  },

  // ==========================================
  // 5. MARKETPLACE FEE CALCULATORS
  // ==========================================
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
{ q: 'Why do commissions differ across marketplaces?', a: 'Marketplaces price commissions based on their customer demographics, advertising spend, brand equity, and fulfillment network costs.' },
      { q: "Which Indian marketplace offers the highest seller margins?", a: "Meesho offers 0% commission for budget value goods. Amazon and Flipkart have higher fees (12%–22% total) but offer 5x–10x higher customer volume and Prime/Plus badges." },
      { q: "How do commission rates differ between fashion and electronics?", a: "Electronics typically carry low commissions (3%–8%) due to high ticket values, while fashion carries higher commissions (12%–24%) to offset high returns." }
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
{ q: 'What is a good ROAS for e-commerce in India?', a: 'A good ROAS is typically between 3.5x and 5.0x for D2C brands, depending on product gross margin.' },
      { q: "How do you calculate ROAS multiplier?", a: "ROAS = Total Ad Revenue ÷ Total Ad Spend. A ₹50,000 revenue generated from ₹10,000 ad spend represents a 5.0x ROAS (or 500%)." },
      { q: "What is the difference between ROAS and ROI?", a: "ROAS measures gross revenue generated per ad rupee spent. ROI measures net bottom-line profit generated against total capital invested including product COGS." }
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
{ q: 'How is ACOS related to ROAS?', a: 'ACOS and ROAS are mathematical inverses: ACOS = 1 / ROAS. For example, a 4.0x ROAS equals a 25% ACOS.' },
      { q: "What is a healthy target ACOS on Amazon India?", a: "A healthy target ACOS is below your product profit margin. If your profit margin before ads is 25%, an ACOS under 20% ensures your campaigns remain profitable." },
      { q: "How do you convert ACOS to ROAS?", a: "ROAS = 100 ÷ ACOS. For example, a 20% ACOS equals a 5.0x ROAS (100 ÷ 20)." }
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
{ q: 'Why is TACOS better than ACOS?', a: 'ACOS only looks at direct ad sales. TACOS looks at overall business health, showing if PPC ads are fueling organic sales velocity.' },
      { q: "What is the formula for TACOS?", a: "TACOS = (Total Ad Spend ÷ Total Organic + Ad Revenue) × 100. A TACOS between 8% and 15% indicates healthy organic momentum driven by advertising." },
      { q: "Why is a declining TACOS a positive sign?", a: "A declining TACOS over time means your paid ads are driving organic keyword ranking and customer repeat purchases, growing total revenue faster than ad spend." }
    ],
    calcType: 'tacos'
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
{ q: 'What is a good Cost Per Order in India?', a: 'For products priced under ₹1000, target a CPO below ₹200–₹250 to remain comfortably profitable.' },
      { q: "What is a good Cost Per Order in India?", a: "A good CPO depends on product selling price and margin. For a ₹999 fashion item with a 40% margin, an ad CPO under ₹180 maintains strong profitability." },
      { q: "How do you reduce Cost Per Order (CPO)?", a: "Lower CPO by optimizing product listing images, running negative keyword targeting in PPC, improving click-to-order conversion rates, and offering bundle discounts." }
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
{ q: 'What is LTV:CAC ratio?', a: 'It compares the total revenue or gross profit a customer brings over their lifetime against the cost to acquire them.' },
      { q: "What is a healthy LTV to CAC ratio for D2C brands?", a: "A 3:1 or higher LTV:CAC ratio is the gold standard for e-commerce, meaning a customer lifetime value is at least 3 times the cost to acquire them." },
      { q: "What marketing overheads should be included in CAC?", a: "Include paid ad spend (Meta/Google), influencer marketing fees, agency management retainers, and marketing tool software subscriptions." }
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
{ q: 'Why do high ROAS campaigns sometimes lose money?', a: 'If product COGS and courier shipping eat up 75% of revenue, even a 3x ROAS (which costs 33% of revenue) results in a net financial loss.' },
      { q: "How can ad campaigns with positive ROAS still generate losses?", a: "If your ROAS is 3.0x (33% ad cost) but your product COGS is 40% and marketplace fees are 30%, your total costs equal 103%, creating a net 3% loss on every order." },
      { q: "What is Contribution Margin 3 (CM3) in ad profitability?", a: "CM3 is revenue minus product COGS, shipping, marketplace fees, and direct paid advertising expenses." }
    ],
    calcType: 'ad_profit'
  },

  // ==========================================
  // 7. MARKETPLACE OPERATIONS CALCULATORS
  // ==========================================
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
{ q: 'Why is my payout lower than expected?', a: 'Check for courier weight discrepancies, return reverse shipping deductions, and 18% GST on platform service fees.' },
      { q: "Why do platforms withhold a returns reserve from payouts?", a: "Marketplaces retain a rolling reserve (typically 5%–15% for 7–14 days) to cover potential return refunds and RTO courier penalties during the return window." },
      { q: "When is the marketplace reserve fund released?", a: "Reserve amounts are released into your subsequent settlement cycles once the customer return window (7 to 10 days) closes without dispute." }
    ],
    calcType: 'payout'
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
{ q: 'What is a good net profit margin for an Indian online seller?', a: 'After all marketplace fees, ad spend, and overhead, a healthy business earns between 12% and 20% net profit.' },
      { q: "What overhead costs should sellers include in monthly P&L?", a: "Include warehouse rent, packing tape & thermal label paper, utility bills, employee packing wages, accounting software subscriptions, and interest on working capital." },
      { q: "What is a realistic net profit margin for an Indian marketplace seller?", a: "Top quartile marketplace sellers achieve 12% to 18% net profit margin after all platform deductions, returns, and taxes." }
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
{ q: 'How do you price bulk orders for corporate gifting?', a: 'Calculate your unit manufacturing cost, add freight, and target a minimum 25% gross profit margin on the total invoice.' },
      { q: "How do bulk B2B orders increase net profitability?", a: "Bulk orders consolidate shipping into single freight packages, eliminate individual polybag costs, reduce payment processing fees, and carry 0% RTO return risk." },
      { q: "How should volume tiered discounts be structured?", a: "Offer 5% off for 50–100 units, 10% off for 100–500 units, and 15%–20% off for 500+ units, ensuring your manufacturing margin remains above 20%." }
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
{ q: 'What is dead stock in e-commerce?', a: 'Dead stock refers to products in your warehouse that have generated zero sales for 90 to 180 days.' },
      { q: "What is dead stock in e-commerce?", a: "Dead stock refers to inventory that has not generated a sale in over 90–120 days, tying up working capital and generating warehouse holding costs." },
      { q: "How do holding costs erode inventory profit?", a: "Holding inventory beyond 90 days accumulates warehouse storage fees, ties up cash flow, increases risk of damage/expiry, and incurs cost of capital." }
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
{ q: 'What is lead time in inventory management?', a: 'Lead time is the total number of days between placing a purchase order with a supplier and having the goods ready on your warehouse shelves.' },
      { q: "What is safety stock and why is it critical?", a: "Safety stock is buffer inventory held to prevent stockouts caused by sudden sales spikes (e.g. festive sales) or unexpected supplier manufacturing delays." },
      { q: "What formula calculates Reorder Point (ROP)?", a: "Reorder Point = (Average Daily Sales Rate × Lead Time in Days) + Safety Stock." }
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
{ q: 'What is a floor price in e-commerce?', a: 'Floor price is the minimum viable selling price that covers all direct product, shipping, marketplace, and return costs with zero loss.' },
      { q: "How do you calculate minimum selling price (floor price)?", a: "Floor Price = (Direct Cost + Return Buffer) ÷ [1 - (Platform Fee Rate % + GST Factor)]. Selling below this price guarantees a financial loss on every dispatched order." },
      { q: "Why must return buffers be factored into floor pricing?", a: "If you don't include return penalties in your floor price, every returned or RTO order directly consumes your operating profit." }
    ],
    calcType: 'min_price'
  }
];
