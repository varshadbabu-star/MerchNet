# Quick Start Guide - MerchNet 🚀

Get MerchNet up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free)

## Installation Steps

### 1. Install Dependencies (2 minutes)
```bash
npm install
```

### 2. Set Up Supabase (2 minutes)

**Create Project:**
1. Go to [supabase.com](https://supabase.com) → New Project
2. Note your Project URL and anon key from Settings → API

**Set Environment Variables:**
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your credentials:
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Set Up Database:**
1. Open Supabase SQL Editor
2. Copy all content from `supabase/schema.sql`
3. Paste and run in SQL Editor

### 3. Start Application (1 minute)
```bash
npm run dev
```

Open http://localhost:3000 🎉

## First Steps

### Add a Product
1. Go to **Products** page
2. Click **Add Product**
3. Fill in: Name, SKU, Price, Stock
4. Save

### Make a Sale
1. Go to **Billing** page
2. Click on products to add to cart
3. Select payment method
4. Click **Complete Sale**
5. Receipt prints automatically

## That's It!

You're ready to start billing. Check out:
- `SETUP_GUIDE.md` for detailed setup
- `README.md` for full documentation

## Need Help?

Common issues:
- **Can't connect?** Check your `.env.local` credentials
- **No tables?** Re-run the schema.sql in Supabase
- **Port in use?** Run `npm run dev -- -p 3001`

## What's Next?

1. Add your inventory (Products page)
2. Add customers (Customers page)
3. Configure tax rates (in Supabase tax_rates table)
4. Start selling! (Billing page)

---

**Happy Billing!** 🛍️
