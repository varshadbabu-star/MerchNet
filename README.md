# MerchNet - Modern Retail Billing Software 🛍️

A comprehensive Point of Sale (POS) and billing solution built with Next.js and Supabase, designed specifically for retail stores and businesses.

## ✨ Features

### 🎯 Core Features
- **POS Billing System**: Fast and intuitive point-of-sale interface with cart management
- **Product Management**: Complete inventory management with stock tracking
- **Invoice Generation**: Create and manage invoices for credit sales
- **Customer Management**: Maintain customer database with contact information
- **Real-time Analytics**: Comprehensive dashboard with sales trends and insights

### 💡 Advanced Features
- **Barcode Support**: Scan products using barcode for quick billing
- **Receipt Printing**: Generate and print professional receipts
- **Stock Management**: Automatic stock updates with movement tracking
- **Tax Automation**: Automatic GST/tax calculation (configurable)
- **Multi-Payment Methods**: Support for Cash, Card, and UPI payments
- **Low Stock Alerts**: Get notified when products are running low

### 🎨 UI/UX Features
- **Modern Gradient Design**: Beautiful, professional interface
- **Responsive Layout**: Works seamlessly on desktop and tablet
- **Real-time Updates**: Instant feedback with toast notifications
- **Search & Filter**: Quick product and customer search
- **Smooth Animations**: Polished transitions and hover effects

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern utility-first CSS
- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization
- **React Hot Toast** - Toast notifications
- **shadcn/ui** - High-quality UI components

### Backend & Database
- **Supabase** - PostgreSQL database with real-time capabilities
- **Supabase Auth** - Authentication (optional)
- **Row Level Security** - Secure data access

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MerchNet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up Supabase**
   
   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to Project Settings > API to get your credentials
   
   c. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   d. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   a. Go to Supabase SQL Editor
   
   b. Copy and run the SQL from `supabase/schema.sql`
   
   This will create all necessary tables:
   - products
   - customers
   - sales
   - sale_items
   - invoices
   - invoice_items
   - payments
   - tax_rates
   - stock_movements

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will run on http://localhost:3000

6. **Open your browser**
   Navigate to http://localhost:3000 to see the application

## 📁 Project Structure

```
MerchNet/
├── app/                      # Next.js app directory
│   ├── billing/             # POS billing interface
│   ├── products/            # Product & inventory management
│   ├── customers/           # Customer management
│   ├── invoices/            # Invoice management
│   ├── analytics/           # Analytics dashboard
│   ├── payments/            # Payment settings
│   ├── tax/                 # Tax configuration
│   ├── currencies/          # Multi-currency support
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Dashboard home
├── components/              # Reusable UI components
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utility functions
│   ├── supabase.ts          # Supabase client & types
│   └── utils.ts             # Helper functions
├── supabase/                # Database schema
│   └── schema.sql           # Database setup SQL
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🎯 Key Features Explained

### 💰 POS Billing System
The heart of MerchNet - a fast, intuitive billing interface:
- **Product Grid**: Visual product selection with search
- **Cart Management**: Add/remove items, adjust quantities
- **Real-time Calculations**: Automatic subtotal, tax, and total
- **Multiple Payment Methods**: Cash, Card, UPI support
- **Receipt Generation**: Print professional receipts
- **Stock Updates**: Automatic inventory deduction

### 📦 Product Management
Complete inventory control:
- **Product Catalog**: Manage unlimited products
- **Stock Tracking**: Real-time stock levels
- **Barcode Support**: Quick product lookup
- **Categories**: Organize products efficiently
- **Pricing**: Set selling and cost prices
- **Low Stock Alerts**: Visual indicators for low inventory

### 👥 Customer Management
Build and maintain customer relationships:
- **Customer Database**: Store contact information
- **Quick Search**: Find customers instantly
- **Purchase History**: Track customer transactions
- **Walk-in Support**: No customer required for quick sales

### 📊 Analytics & Reporting
Make data-driven decisions:
- **Revenue Trends**: Visual charts and graphs
- **Sales Performance**: Track daily/monthly sales
- **Product Insights**: Best-selling products
- **Inventory Value**: Total stock worth
- **Payment Analytics**: Payment method breakdown

## 🗄️ Database Schema

The application uses Supabase (PostgreSQL) with the following tables:

### Core Tables
- **products** - Product catalog with SKU, barcode, pricing, and stock
- **customers** - Customer information and contact details
- **sales** - POS transaction records
- **sale_items** - Individual items in each sale
- **invoices** - Credit sale invoices
- **invoice_items** - Line items for invoices
- **payments** - Payment records for invoices
- **tax_rates** - Configurable tax rates
- **stock_movements** - Inventory movement history

### Key Features
- UUID primary keys for better scalability
- Automatic timestamps (created_at, updated_at)
- Foreign key relationships for data integrity
- Indexes for optimized queries
- Triggers for automatic timestamp updates

## 🛠️ Development

### Adding New Features
1. Create new pages in the `app/` directory
2. Use Supabase client from `lib/supabase.ts`
3. Update database schema in `supabase/schema.sql`
4. Add navigation links in page headers
5. Follow existing UI patterns for consistency

### Styling Guidelines
- Uses Tailwind CSS with custom gradients
- shadcn/ui components for consistency
- Responsive design (mobile-first approach)
- Smooth animations and transitions
- Modern gradient color schemes

### Database Operations
All database operations use Supabase client:
```typescript
// Example: Fetch products
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true)
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build for Production
```bash
npm run build
npm start
```

## 📝 Usage Guide

### Quick Start Workflow
1. **Add Products**: Go to Products page and add your inventory
2. **Add Customers** (Optional): Add customer information
3. **Start Billing**: Use the Billing page for POS transactions
4. **Generate Invoices**: Create invoices for credit sales
5. **View Analytics**: Check dashboard for insights

### Tips for Best Results
- Keep product SKUs unique
- Use barcodes for faster billing
- Regularly check low stock alerts
- Review analytics for business insights
- Print receipts for customer records

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**MerchNet** - Empowering retail businesses with modern billing solutions 🛍️✨



