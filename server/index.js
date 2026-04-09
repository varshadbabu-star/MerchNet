const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'billora.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    business_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Customers table
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Invoices table
  db.run(`CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending',
    due_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (customer_id) REFERENCES customers (id)
  )`);

  // Invoice items table
  db.run(`CREATE TABLE IF NOT EXISTS invoice_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices (id)
  )`);

  // Payments table
  db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    transaction_id TEXT,
    status TEXT DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices (id)
  )`);

  // Tax rates table
  db.run(`CREATE TABLE IF NOT EXISTS tax_rates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    rate DECIMAL(5,2) NOT NULL,
    is_default BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Currencies table
  db.run(`CREATE TABLE IF NOT EXISTS currencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    exchange_rate DECIMAL(10,4) DEFAULT 1.0
  )`);

  // Insert default currencies
  db.run(`INSERT OR IGNORE INTO currencies (code, name, symbol) VALUES 
    ('USD', 'US Dollar', '$'),
    ('EUR', 'Euro', '€'),
    ('GBP', 'British Pound', '£'),
    ('JPY', 'Japanese Yen', '¥'),
    ('CAD', 'Canadian Dollar', 'C$'),
    ('AUD', 'Australian Dollar', 'A$')
  `);

  // Insert default tax rate
  db.run(`INSERT OR IGNORE INTO tax_rates (user_id, name, rate, is_default) VALUES 
    (1, 'Standard Tax', 8.5, 1)
  `);
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, business_name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (email, password, name, business_name) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, business_name],
      function(err) {
        if (err) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        
        const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET);
        res.json({ token, user: { id: this.lastID, email, name, business_name } });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        business_name: user.business_name 
      } 
    });
  });
});

// Dashboard route
app.get('/api/dashboard', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  // Get stats
  db.get('SELECT COUNT(*) as totalInvoices FROM invoices WHERE user_id = ?', [userId], (err, invoiceCount) => {
    db.get('SELECT SUM(total_amount) as totalRevenue FROM invoices WHERE user_id = ? AND status = "paid"', [userId], (err, revenue) => {
      db.get('SELECT COUNT(*) as pendingPayments FROM invoices WHERE user_id = ? AND status = "pending"', [userId], (err, pending) => {
        db.get('SELECT COUNT(*) as customers FROM customers WHERE user_id = ?', [userId], (err, customerCount) => {
          // Get recent invoices
          db.all(`
            SELECT i.*, c.name as customerName 
            FROM invoices i 
            JOIN customers c ON i.customer_id = c.id 
            WHERE i.user_id = ? 
            ORDER BY i.created_at DESC 
            LIMIT 5
          `, [userId], (err, recentInvoices) => {
            res.json({
              stats: {
                totalInvoices: invoiceCount?.totalInvoices || 0,
                totalRevenue: revenue?.totalRevenue || 0,
                pendingPayments: pending?.pendingPayments || 0,
                customers: customerCount?.customers || 0
              },
              recentInvoices: recentInvoices || []
            });
          });
        });
      });
    });
  });
});

// Customers routes
app.get('/api/customers', authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.all('SELECT * FROM customers WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, customers) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(customers);
  });
});

app.post('/api/customers', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { name, email, phone, address } = req.body;
  
  db.run(
    'INSERT INTO customers (user_id, name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
    [userId, name, email, phone, address],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, name, email, phone, address });
    }
  );
});

// Invoices routes
app.get('/api/invoices', authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.all(`
    SELECT i.*, c.name as customerName 
    FROM invoices i 
    JOIN customers c ON i.customer_id = c.id 
    WHERE i.user_id = ? 
    ORDER BY i.created_at DESC
  `, [userId], (err, invoices) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(invoices);
  });
});

app.post('/api/invoices', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { customer_id, items, tax_rate = 0, currency = 'USD' } = req.body;
  
  // Calculate amounts
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const tax_amount = subtotal * (tax_rate / 100);
  const total_amount = subtotal + tax_amount;
  
  // Generate invoice number
  const invoice_number = `INV-${Date.now()}`;
  
  db.run(
    'INSERT INTO invoices (user_id, customer_id, invoice_number, amount, tax_amount, total_amount, currency) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [userId, customer_id, invoice_number, subtotal, tax_amount, total_amount, currency],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      const invoiceId = this.lastID;
      
      // Insert invoice items
      const stmt = db.prepare('INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)');
      items.forEach(item => {
        stmt.run([invoiceId, item.description, item.quantity, item.unit_price, item.quantity * item.unit_price]);
      });
      stmt.finalize();
      
      res.json({ 
        id: invoiceId, 
        invoice_number, 
        amount: subtotal, 
        tax_amount, 
        total_amount, 
        currency 
      });
    }
  );
});

// Tax rates routes
app.get('/api/tax-rates', authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.all('SELECT * FROM tax_rates WHERE user_id = ? ORDER BY is_default DESC', [userId], (err, rates) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rates);
  });
});

app.post('/api/tax-rates', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { name, rate, is_default = false } = req.body;
  
  db.run(
    'INSERT INTO tax_rates (user_id, name, rate, is_default) VALUES (?, ?, ?, ?)',
    [userId, name, rate, is_default],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, name, rate, is_default });
    }
  );
});

// Currencies routes
app.get('/api/currencies', (req, res) => {
  db.all('SELECT * FROM currencies ORDER BY code', (err, currencies) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(currencies);
  });
});

// Analytics routes
app.get('/api/analytics/revenue', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { period = '30' } = req.query;
  
  db.all(`
    SELECT DATE(created_at) as date, SUM(total_amount) as revenue
    FROM invoices 
    WHERE user_id = ? AND status = 'paid' AND created_at >= datetime('now', '-${period} days')
    GROUP BY DATE(created_at)
    ORDER BY date
  `, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(data);
  });
});

app.get('/api/analytics/invoices', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { period = '30' } = req.query;
  
  db.all(`
    SELECT DATE(created_at) as date, COUNT(*) as count
    FROM invoices 
    WHERE user_id = ? AND created_at >= datetime('now', '-${period} days')
    GROUP BY DATE(created_at)
    ORDER BY date
  `, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(data);
  });
});

// Payment routes
app.post('/api/payments', authenticateToken, (req, res) => {
  const { invoice_id, amount, payment_method, transaction_id } = req.body;
  
  db.run(
    'INSERT INTO payments (invoice_id, amount, payment_method, transaction_id) VALUES (?, ?, ?, ?)',
    [invoice_id, amount, payment_method, transaction_id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Update invoice status
      db.run('UPDATE invoices SET status = "paid" WHERE id = ?', [invoice_id]);
      
      res.json({ id: this.lastID, amount, payment_method, transaction_id });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Billora API server running on port ${PORT}`);
  console.log(`Database: ${dbPath}`);
});

module.exports = app;
