# Aura Retail — High-Conversion Storefront

An architectural, high-conversion luxury storefront and catalog engineered with responsive checkout architecture, dynamic bag drawer, and tactile editorial design.

---

## Features

- **Conversion-Optimized Cart & Checkout**:
  - Live slide-over cart drawer with dynamic free shipping progress threshold.
  - Multi-tier promo code redemption (`WELCOME10`, `AURA20`).
  - 1-click in-cart upsell modules.
  - 2-step streamlined checkout supporting Credit Card, Apple Pay, and Cash on Delivery.
  - Verified receipt order confirmation screen.
- **Contiguous Purchase Module (PDP)**:
  - Multi-angle gallery with zoom.
  - Live stock scarcity markers and colorway swatches.
  - Size selector with interactive Sizing Guide table.
  - 4-split installment payment breakdown (Klarna / Afterpay).
- **Domain-Authentic Design**:
  - Clean unboxed metadata discipline.
  - Strict Top Bar Contract with responsive mobile drawer.
  - Attributable customer reviews with helpfulness ratings.
  - Provenance & material integrity sections.

---

## Deployment & GitHub Setup

### 1. Push to your GitHub Repository

Run these commands in your local terminal:

```bash
# Initialize git and stage all files
git init
git add .
git commit -m "feat: initial commit for Aura Retail high-conversion storefront"

# Link to your GitHub repository
git remote add origin https://github.com/GRAXDEV/aura-retail.git
git push -u origin main
```

### 2. Live Hosting Options

- **Option A: GitHub Pages (Automatic)**
  1. In your GitHub repository (`github.com/GRAXDEV/aura-retail`), go to **Settings** > **Pages**.
  2. Under **Build and deployment > Source**, select **GitHub Actions**.
  3. The included workflow (`.github/workflows/deploy.yml`) will build and publish your site automatically at:
     **`https://GRAXDEV.github.io/aura-retail/`**

- **Option B: Vercel / Netlify (Recommended for Portfolios)**
  1. Go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and log in with your GitHub (`GRAXDEV`).
  2. Select your `aura-retail` repository and click **Deploy**.
  3. Your site will be live instantly with automated continuous deployment.
