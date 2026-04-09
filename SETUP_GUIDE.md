# MerchNet Setup Guide 🚀

Complete step-by-step guide to set up MerchNet for your retail business.

## Prerequisites

Before you begin, ensure you have:
- Node.js 18 or higher installed
- A Supabase account (free tier works great)
- Basic knowledge of terminal/command line
- A code editor (VS Code recommended)

## Step 1: Install Dependencies

```bash
# Navigate to project directory
cd MerchNet

# Install all dependencies
npm install
```

This will install all required packages including:
- Next.js and React
- Supabase client
- UI components (shadcn/ui)
- Tailwind CSS
- And more...

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: MerchNet (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select closest to your location
5. Click "Create new project" and wait for setup to complete

### 2.2 Get Your API Credentials

1. In your Supabase project dashboard
2. Click on the **Settings** icon (gear icon) in the left sidebar
3. Go to **API** section
4. You'll see two important values:
   - **Project URL** (starts with https://)
   - **anon public** key (long string of characters)
5. Keep this page open - you'll need these values

### 2.3 Configure Environment Variables

1. In your project folder, find `.env.example`
2. Create a new file called `.env.local`
3. Copy the contents from `.env.example` to `.env.local`
4. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit `.env.local` to version control!

## Step 3: Set Up the Database

### 3.1 Run the Schema SQL

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `supabase/schema.sql` from your project
4. Copy ALL the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **Run** button (or press Ctrl/Cmd + Enter)
7. Wait for "Success. No rows returned" message

### 3.2 Verify Tables Created

1. Click **Table Editor** in the left sidebar
2. You should see these tables:
   - products
   - customers
   - sales
   - sale_items
   - invoices
   - invoice_items
   - payments
   - tax_rates
   - stock_movements

### 3.3 Check Sample Data

The schema includes sample products. To view them:
1. Click on **products** table
2. You should see 3 sample products
3. You can edit or delete these later

## Step 4: Start the Application

```bash
# Start the development server
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in X.Xs
```

## Step 5: First Time Setup

### 5.1 Access the Application

1. Open your browser
2. Go to `http://localhost:3000`
3. You should see the MerchNet dashboard

### 5.2 Add Your First Product

1. Click **Products** in the navigation
2. Click **Add Product** button
3. Fill in the form:
   - **Product Name**: e.g., "Laptop"
   - **SKU**: e.g., "LAP001" (must be unique)
   - **Barcode**: Optional, e.g., "1234567890123"
   - **Selling Price**: e.g., 45000
   - **Cost Price**: Optional, e.g., 40000
   - **Stock Quantity**: e.g., 10
   - **Category**: e.g., "Electronics"
4. Click **Add Product**

### 5.3 Add Your First Customer

1. Click **Customers** in the navigation
2. Click **Add Customer** button
3. Fill in the form:
   - **Name**: Customer name (required)
   - **Email**: Optional
   - **Phone**: Optional
   - **Address**: Optional
4. Click **Add Customer**

### 5.4 Make Your First Sale

1. Click **Billing** in the navigation
2. Click on a product to add it to cart
3. Adjust quantity if needed using +/- buttons
4. Select payment method (Cash/Card/UPI)
5. Click **Complete Sale**
6. Receipt will open in new window for printing

## Step 6: Customize Settings

### 6.1 Update Tax Rate

1. Go to Supabase **Table Editor**
2. Click **tax_rates** table
3. Edit the default rate (currently 18%)
4. Change to your local tax rate
5. Save changes

### 6.2 Update Currency (Optional)

The app uses INR (₹) by default. To change:
1. Edit `.env.local`
2. Add: `NEXT_PUBLIC_CURRENCY=USD` (or your currency)
3. Restart the dev server

## Common Issues & Solutions

### Issue: "Cannot connect to Supabase"
**Solution**: 
- Check your `.env.local` file
- Verify URL and key are correct
- Ensure no extra spaces in values
- Restart the dev server

### Issue: "Table does not exist"
**Solution**:
- Re-run the schema.sql in Supabase SQL Editor
- Check for any error messages
- Verify all tables are created

### Issue: "Module not found" errors
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Port 3000 already in use
**Solution**:
```bash
# Use a different port
npm run dev -- -p 3001
```

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub (don't include `.env.local`)
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"
7. Your app will be live in minutes!

## Security Best Practices

1. **Never commit** `.env.local` to version control
2. **Use Row Level Security** in Supabase for production
3. **Rotate keys** periodically
4. **Enable Supabase Auth** for multi-user access
5. **Set up backups** in Supabase dashboard

## Next Steps

Now that you're set up:

1. **Add your inventory**: Add all your products
2. **Import customers**: Add existing customer data
3. **Configure tax rates**: Set up your local tax rates
4. **Test thoroughly**: Make test transactions
5. **Train staff**: Show your team how to use the system
6. **Go live**: Start using for real transactions!

## Getting Help

- Check the main README.md for feature documentation
- Review the code comments for technical details
- Open an issue on GitHub for bugs
- Check Supabase documentation for database questions

## Backup & Maintenance

### Regular Backups
1. Go to Supabase Dashboard
2. Settings > Database
3. Enable automatic backups
4. Download manual backups periodically

### Database Maintenance
- Monitor storage usage in Supabase
- Archive old sales data periodically
- Keep product catalog updated
- Review and clean up inactive customers

---

**Congratulations!** 🎉 You've successfully set up MerchNet. Happy billing!
