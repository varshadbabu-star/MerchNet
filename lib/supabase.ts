// Dummy SQL Database Implementation (In-Memory)
// This simulates a SQL database without requiring actual database setup

// Database types
export interface Product {
  id: string
  name: string
  description?: string
  sku: string
  barcode?: string
  price: number
  cost_price?: number
  stock_quantity: number
  category?: string
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Sale {
  id: string
  sale_number: string
  customer_id?: string
  total_amount: number
  tax_amount: number
  discount_amount: number
  payment_method: string
  payment_status: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface SaleItem {
  id: string
  sale_id: string
  product_id: string
  quantity: number
  unit_price: number
  discount: number
  total_price: number
  created_at: string
}

export interface Invoice {
  id: string
  invoice_number: string
  customer_id: string
  amount: number
  tax_amount: number
  total_amount: number
  currency: string
  status: string
  due_date?: string
  created_at: string
  updated_at: string
}

// In-Memory Database Storage
class DummyDatabase {
  private products: Product[] = []
  private customers: Customer[] = []
  private sales: Sale[] = []
  private saleItems: SaleItem[] = []
  private invoices: Invoice[] = []

  constructor() {
    // Initialize with some dummy data
    this.initializeDummyData()
  }

  private initializeDummyData() {
    // Add sample products with realistic data
    this.products = [
      {
        id: '1',
        name: 'Wireless Mouse Logitech M185',
        description: 'Ergonomic wireless mouse with 2.4GHz USB receiver, 12-month battery life',
        sku: 'LOG-M185-BLK',
        barcode: '5099206052345',
        price: 599,
        cost_price: 350,
        stock_quantity: 45,
        category: 'Electronics',
        is_active: true,
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'USB-C Cable Anker PowerLine',
        description: 'Fast charging USB-C cable 2m, supports 60W power delivery',
        sku: 'ANK-USBC-2M',
        barcode: '8436574562891',
        price: 299,
        cost_price: 150,
        stock_quantity: 120,
        category: 'Accessories',
        is_active: true,
        created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Laptop Stand Aluminum',
        description: 'Adjustable aluminum laptop stand with heat dissipation design',
        sku: 'STAND-ALU-01',
        barcode: '7896541230987',
        price: 1299,
        cost_price: 800,
        stock_quantity: 8,
        category: 'Accessories',
        is_active: true,
        created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Mechanical Keyboard RGB',
        description: 'Gaming mechanical keyboard with RGB backlight, Blue switches',
        sku: 'KB-MECH-RGB',
        barcode: '6543219870456',
        price: 2499,
        cost_price: 1600,
        stock_quantity: 15,
        category: 'Electronics',
        is_active: true,
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Webcam HD 1080p',
        description: 'Full HD webcam with built-in microphone and auto-focus',
        sku: 'CAM-HD-1080',
        barcode: '4567891234560',
        price: 1899,
        cost_price: 1200,
        stock_quantity: 22,
        category: 'Electronics',
        is_active: true,
        created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'Phone Case iPhone 14',
        description: 'Shockproof silicone case for iPhone 14, multiple colors',
        sku: 'CASE-IP14-SIL',
        barcode: '3216549870123',
        price: 399,
        cost_price: 180,
        stock_quantity: 85,
        category: 'Mobile Accessories',
        is_active: true,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '7',
        name: 'Power Bank 20000mAh',
        description: 'Fast charging power bank with dual USB ports and LED display',
        sku: 'PWR-20K-BLK',
        barcode: '9876543210987',
        price: 1599,
        cost_price: 950,
        stock_quantity: 32,
        category: 'Electronics',
        is_active: true,
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '8',
        name: 'Bluetooth Earbuds TWS',
        description: 'True wireless stereo earbuds with charging case, 24hr battery',
        sku: 'EAR-TWS-BLK',
        barcode: '1597534862095',
        price: 1299,
        cost_price: 750,
        stock_quantity: 5,
        category: 'Audio',
        is_active: true,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '9',
        name: 'HDMI Cable 4K 3m',
        description: 'High-speed HDMI 2.1 cable supporting 4K@120Hz',
        sku: 'HDMI-4K-3M',
        barcode: '7539514862037',
        price: 449,
        cost_price: 220,
        stock_quantity: 65,
        category: 'Cables',
        is_active: true,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '10',
        name: 'Screen Protector Tempered Glass',
        description: '9H hardness tempered glass screen protector, anti-fingerprint',
        sku: 'SCRN-TEMP-9H',
        barcode: '2468135790246',
        price: 199,
        cost_price: 80,
        stock_quantity: 150,
        category: 'Mobile Accessories',
        is_active: true,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    // Add sample customers
    this.customers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 98765 43210',
        address: '123 Main St, Mumbai',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 98765 43211',
        address: '456 Park Ave, Delhi',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]
  }

  // Query builder methods to mimic Supabase API
  from(table: string) {
    const self = this
    return {
      select: (columns: string = '*') => {
        const selectQuery = {
          order: (column: string, options?: { ascending?: boolean }) => {
            return self.selectFrom(table, columns, column, options)
          },
          eq: (column: string, value: any) => {
            return self.selectWithFilter(table, columns, column, value)
          }
        }
        // Make it thenable so it can be awaited directly
        return Object.assign(
          self.selectFrom(table, columns),
          selectQuery
        )
      },
      insert: (data: any) => {
        return this.insertInto(table, data)
      },
      update: (data: any) => {
        return {
          eq: (column: string, value: any) => {
            return this.updateRecord(table, data, column, value)
          }
        }
      },
      delete: () => {
        return {
          eq: (column: string, value: any) => {
            return this.deleteRecord(table, column, value)
          }
        }
      }
    }
  }

  private selectFrom(table: string, columns: string = '*', orderBy?: string, options?: { ascending?: boolean }) {
    let data: any[] = []
    
    switch (table) {
      case 'products':
        data = [...this.products]
        break
      case 'customers':
        data = [...this.customers]
        break
      case 'sales':
        data = [...this.sales]
        break
      case 'sale_items':
        data = [...this.saleItems]
        break
      case 'invoices':
        data = [...this.invoices]
        break
    }

    // Apply ordering
    if (orderBy) {
      const ascending = options?.ascending ?? true
      data.sort((a, b) => {
        const aVal = a[orderBy]
        const bVal = b[orderBy]
        if (aVal < bVal) return ascending ? -1 : 1
        if (aVal > bVal) return ascending ? 1 : -1
        return 0
      })
    }

    return Promise.resolve({ data, error: null })
  }

  private selectWithFilter(table: string, columns: string, filterColumn: string, filterValue: any) {
    let data: any[] = []
    
    switch (table) {
      case 'products':
        data = this.products.filter(item => item[filterColumn as keyof Product] === filterValue)
        break
      case 'customers':
        data = this.customers.filter(item => item[filterColumn as keyof Customer] === filterValue)
        break
      case 'sales':
        data = this.sales.filter(item => item[filterColumn as keyof Sale] === filterValue)
        break
      case 'sale_items':
        data = this.saleItems.filter(item => item[filterColumn as keyof SaleItem] === filterValue)
        break
      case 'invoices':
        data = this.invoices.filter(item => item[filterColumn as keyof Invoice] === filterValue)
        break
    }

    return Promise.resolve({ data, error: null })
  }

  private insertInto(table: string, data: any) {
    const now = new Date().toISOString()
    const newRecord = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      created_at: now,
      updated_at: now,
    }

    switch (table) {
      case 'products':
        this.products.push(newRecord as Product)
        break
      case 'customers':
        this.customers.push(newRecord as Customer)
        break
      case 'sales':
        this.sales.push(newRecord as Sale)
        break
      case 'sale_items':
        this.saleItems.push(newRecord as SaleItem)
        break
      case 'invoices':
        this.invoices.push(newRecord as Invoice)
        break
    }

    return Promise.resolve({ data: newRecord, error: null })
  }

  private updateRecord(table: string, data: any, filterColumn: string, filterValue: any) {
    const now = new Date().toISOString()
    let updated = false

    switch (table) {
      case 'products':
        const productIndex = this.products.findIndex(item => item[filterColumn as keyof Product] === filterValue)
        if (productIndex !== -1) {
          this.products[productIndex] = { ...this.products[productIndex], ...data, updated_at: now }
          updated = true
        }
        break
      case 'customers':
        const customerIndex = this.customers.findIndex(item => item[filterColumn as keyof Customer] === filterValue)
        if (customerIndex !== -1) {
          this.customers[customerIndex] = { ...this.customers[customerIndex], ...data, updated_at: now }
          updated = true
        }
        break
      case 'sales':
        const saleIndex = this.sales.findIndex(item => item[filterColumn as keyof Sale] === filterValue)
        if (saleIndex !== -1) {
          this.sales[saleIndex] = { ...this.sales[saleIndex], ...data, updated_at: now }
          updated = true
        }
        break
      case 'invoices':
        const invoiceIndex = this.invoices.findIndex(item => item[filterColumn as keyof Invoice] === filterValue)
        if (invoiceIndex !== -1) {
          this.invoices[invoiceIndex] = { ...this.invoices[invoiceIndex], ...data, updated_at: now }
          updated = true
        }
        break
    }

    return Promise.resolve({ data: null, error: updated ? null : new Error('Record not found') })
  }

  private deleteRecord(table: string, filterColumn: string, filterValue: any) {
    let deleted = false

    switch (table) {
      case 'products':
        const productIndex = this.products.findIndex(item => item[filterColumn as keyof Product] === filterValue)
        if (productIndex !== -1) {
          this.products.splice(productIndex, 1)
          deleted = true
        }
        break
      case 'customers':
        const customerIndex = this.customers.findIndex(item => item[filterColumn as keyof Customer] === filterValue)
        if (customerIndex !== -1) {
          this.customers.splice(customerIndex, 1)
          deleted = true
        }
        break
      case 'sales':
        const saleIndex = this.sales.findIndex(item => item[filterColumn as keyof Sale] === filterValue)
        if (saleIndex !== -1) {
          this.sales.splice(saleIndex, 1)
          deleted = true
        }
        break
      case 'sale_items':
        const saleItemIndex = this.saleItems.findIndex(item => item[filterColumn as keyof SaleItem] === filterValue)
        if (saleItemIndex !== -1) {
          this.saleItems.splice(saleItemIndex, 1)
          deleted = true
        }
        break
      case 'invoices':
        const invoiceIndex = this.invoices.findIndex(item => item[filterColumn as keyof Invoice] === filterValue)
        if (invoiceIndex !== -1) {
          this.invoices.splice(invoiceIndex, 1)
          deleted = true
        }
        break
    }

    return Promise.resolve({ data: null, error: deleted ? null : new Error('Record not found') })
  }
}

// Export a singleton instance that mimics the Supabase client
export const supabase = new DummyDatabase()
