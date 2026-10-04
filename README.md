# Seller Profit Calculator

An e-commerce seller profit & fee calculator website for Indian marketplaces (**Meesho, Flipkart, and Amazon India**). Built with **Astro**, **Tailwind CSS v4**, and the Vercel-inspired **Geist** design system.

Live Domain: [freesellerprofitcalculator.com](https://freesellerprofitcalculator.com)

---

## Key Features

- **Instant Price Calculation & Smart Paste:** Paste or type selling prices (e.g. `₹599.00` or `1,250`) &mdash; all deductions and charts update with zero delay.
- **Accurate 2026 Indian Marketplace Slabs:**
  - **Meesho:** 0% referral commission model and courier weight slabs.
  - **Flipkart:** Category commissions (4%–16%), Fixed closing fees (₹13–₹52), collection fees, and distance tiers.
  - **Amazon India:** Category referral fees (5%–15%), automatic price closing fee slabs (₹5–₹50), Easy Ship courier rates.
  - **Snapdeal:** Value platform fee rates.
- **RTO & Customer Return Loss Simulator:** Indian COD orders face 15%–30% returns. Calculates true **Blended In-Hand Profit** per dispatched order factoring reverse courier penalties and packaging losses.
- **Unit Economics Waterfall:** Interactive stacked progress bar showing where every ₹100 of the selling price goes (COGS, Fees, Shipping, Taxes, Return Reserve, Profit).
- **Side-by-Side Comparison Matrix:** Live head-to-head comparison of Meesho vs Flipkart vs Amazon for the exact same product with an automated winner badge.
- **Reverse Target Price Solver:** Find the exact required selling price to list for any desired in-hand profit or margin percentage.
- **1-Click Export:** Copy summary formatted for WhatsApp/notes or save as printable PDF.
- **GST Input Tax Credit (ITC) Guide & SEO FAQ:** Helps sellers claim back the 18% GST charged on marketplace fees.

---

## Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Design System:** Vercel Geist design guidelines (`DESIGN.md`)
- **Fonts:** Geist Sans & Geist Mono (tabular numerals for financial clarity)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kuldeep088-hub/ecommerce-calculator.git

# Navigate into the project
cd ecommerce-calculator

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:4321` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## License

MIT
