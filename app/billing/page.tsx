'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Search, 
  CreditCard, 
  DollarSign, 
  Banknote,
  IndianRupee,
  Scan,
  User,
  Receipt,
  X,
  Check
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { supabase, Product } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'

interface CartItem extends Product {
  cartQuantity: number
}

export default function BillingPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi'>('cash')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      if (existingItem.cartQuantity >= product.stock_quantity) {
        toast.error('Insufficient stock')
        return
      }
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      ))
    } else {
      if (product.stock_quantity < 1) {
        toast.error('Out of stock')
        return
      }
      setCart([...cart, { ...product, cartQuantity: 1 }])
    }
    toast.success('Added to cart')
  }

  const updateQuantity = (productId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.cartQuantity + change
        if (newQuantity <= 0) return item
        if (newQuantity > item.stock_quantity) {
          toast.error('Insufficient stock')
          return item
        }
        return { ...item, cartQuantity: newQuantity }
      }
      return item
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId))
    toast.success('Removed from cart')
  }

  const clearCart = () => {
    setCart([])
    setSelectedCustomer(null)
    toast.success('Cart cleared')
  }

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0)
  }

  const calculateTax = () => {
    const taxRate = 18 // 18% GST
    return (calculateSubtotal() * taxRate) / 100
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const completeSale = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty')
      return
    }

    setProcessing(true)
    try {
      // Generate sale number
      const saleNumber = `SALE-${Date.now()}`

      // Create sale record
      const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert({
          sale_number: saleNumber,
          customer_id: selectedCustomer?.id || null,
          total_amount: calculateSubtotal(),
          tax_amount: calculateTax(),
          discount_amount: 0,
          payment_method: paymentMethod,
          payment_status: 'completed'
        })
        .select()
        .single()

      if (saleError) throw saleError

      // Create sale items
      const saleItems = cart.map(item => ({
        sale_id: sale.id,
        product_id: item.id,
        quantity: item.cartQuantity,
        unit_price: item.price,
        discount: 0,
        total_price: item.price * item.cartQuantity
      }))

      const { error: itemsError } = await supabase
        .from('sale_items')
        .insert(saleItems)

      if (itemsError) throw itemsError

      // Update stock quantities
      for (const item of cart) {
        const { error: stockError } = await supabase
          .from('products')
          .update({ 
            stock_quantity: item.stock_quantity - item.cartQuantity 
          })
          .eq('id', item.id)

        if (stockError) throw stockError

        // Record stock movement
        await supabase
          .from('stock_movements')
          .insert({
            product_id: item.id,
            quantity: -item.cartQuantity,
            movement_type: 'out',
            reference_type: 'sale',
            reference_id: sale.id,
            notes: `Sale ${saleNumber}`
          })
      }

      toast.success('Sale completed successfully!')
      
      // Print receipt (optional)
      printReceipt(sale, cart)
      
      // Clear cart and refresh
      clearCart()
      fetchProducts()
    } catch (error) {
      console.error('Error completing sale:', error)
      toast.error('Failed to complete sale')
    } finally {
      setProcessing(false)
    }
  }

  const printReceipt = (sale: any, items: CartItem[]) => {
    // Simple receipt printing - can be enhanced with actual printer integration
    const receiptWindow = window.open('', '_blank')
    if (!receiptWindow) return

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${sale.sale_number}</title>
        <style>
          body { font-family: monospace; max-width: 300px; margin: 20px auto; }
          h1 { text-align: center; font-size: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .items { margin: 20px 0; }
          .item { display: flex; justify-content: space-between; margin: 5px 0; }
          .totals { border-top: 2px solid #000; margin-top: 10px; padding-top: 10px; }
          .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
          .grand-total { font-weight: bold; font-size: 18px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>MerchNet</h1>
          <p>Smart Billing Solution</p>
          <p>Receipt: ${sale.sale_number}</p>
          <p>Date: ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="items">
          ${items.map(item => `
            <div class="item">
              <span>${item.name} x ${item.cartQuantity}</span>
              <span>₹${(item.price * item.cartQuantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>₹${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Tax (18%):</span>
            <span>₹${calculateTax().toFixed(2)}</span>
          </div>
          <div class="total-row grand-total">
            <span>TOTAL:</span>
            <span>₹${calculateTotal().toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Payment Method:</span>
            <span>${paymentMethod.toUpperCase()}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>Visit again soon</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 100);
          }
        </script>
      </body>
      </html>
    `

    receiptWindow.document.write(receiptHTML)
    receiptWindow.document.close()
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MerchNet
                </h1>
                <span className="text-sm text-gray-500">POS Billing</span>
              </div>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
              <Link href="/billing" className="text-blue-600 font-medium">Billing</Link>
              <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">Products</Link>
              <Link href="/invoices" className="text-gray-600 hover:text-gray-900 transition-colors">Invoices</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                    <span>Products</span>
                  </CardTitle>
                  <Badge variant="secondary">{products.length} items</Badge>
                </div>
                
                {/* Search Bar */}
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by name, SKU, or barcode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-400"
                        onClick={() => addToCart(product)}
                      >
                        <CardContent className="p-4">
                          <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-3 flex items-center justify-center">
                            {product.image_url ? (
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <ShoppingCart className="h-12 w-12 text-gray-400" />
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{product.name}</h3>
                          <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
                            <Badge variant={product.stock_quantity > 10 ? 'default' : 'destructive'}>
                              {product.stock_quantity} left
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Receipt className="h-6 w-6 text-green-600" />
                    <span>Cart</span>
                  </CardTitle>
                  <Badge variant="secondary">{cart.length} items</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Customer Selection */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Customer:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCustomerModal(true)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {selectedCustomer ? selectedCustomer.name : 'Walk-in'}
                    </Button>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Cart is empty</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">{item.name}</h4>
                          <p className="text-xs text-gray-500">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.cartQuantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.cartQuantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Totals */}
                {cart.length > 0 && (
                  <>
                    <div className="space-y-2 border-t pt-4 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">₹{calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (18%):</span>
                        <span className="font-medium">₹{calculateTax().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-green-600">₹{calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                          onClick={() => setPaymentMethod('cash')}
                          className="flex flex-col items-center py-3"
                        >
                          <Banknote className="h-5 w-5 mb-1" />
                          <span className="text-xs">Cash</span>
                        </Button>
                        <Button
                          variant={paymentMethod === 'card' ? 'default' : 'outline'}
                          onClick={() => setPaymentMethod('card')}
                          className="flex flex-col items-center py-3"
                        >
                          <CreditCard className="h-5 w-5 mb-1" />
                          <span className="text-xs">Card</span>
                        </Button>
                        <Button
                          variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                          onClick={() => setPaymentMethod('upi')}
                          className="flex flex-col items-center py-3"
                        >
                          <DollarSign className="h-5 w-5 mb-1" />
                          <span className="text-xs">UPI</span>
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={completeSale}
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3"
                      >
                        {processing ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Check className="h-5 w-5 mr-2" />
                            Complete Sale
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={clearCart}
                        variant="outline"
                        className="w-full"
                        disabled={processing}
                      >
                        <X className="h-5 w-5 mr-2" />
                        Clear Cart
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
