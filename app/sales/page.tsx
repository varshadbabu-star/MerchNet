'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Receipt, 
  IndianRupee, 
  Search, 
  Calendar,
  User,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'

interface Sale {
  id: string
  sale_number: string
  customer_id?: string
  total_amount: number
  tax_amount: number
  discount_amount: number
  payment_method: string
  payment_status: string
  created_at: string
  customers?: {
    name: string
  }
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          customers (
            name
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSales(data || [])
    } catch (error) {
      console.error('Error fetching sales:', error)
      toast.error('Failed to load sales')
    } finally {
      setLoading(false)
    }
  }

  const filteredSales = sales.filter(sale =>
    sale.sale_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customers?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total_amount, 0)
  const todaySales = sales.filter(sale => 
    new Date(sale.created_at).toDateString() === new Date().toDateString()
  )
  const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total_amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
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
                <span className="text-sm text-gray-500">Sales History</span>
              </div>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
              <Link href="/billing" className="text-gray-600 hover:text-gray-900 transition-colors">Billing</Link>
              <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">Products</Link>
              <Link href="/sales" className="text-blue-600 font-medium">Sales</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Sales History
          </h1>
          <p className="text-gray-600 mt-2 text-lg">View and manage all completed sales</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-100 shadow-lg">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">{sales.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-100 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-purple-100 shadow-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                  <p className="text-2xl font-bold text-gray-900">{todaySales.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-orange-100 shadow-lg">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{todayRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by sale number or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sales Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>All Sales</CardTitle>
            <CardDescription>Complete history of all transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading sales...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sale Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Tax</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSales.map((sale) => (
                      <TableRow key={sale.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium font-mono">
                          {sale.sale_number}
                        </TableCell>
                        <TableCell>
                          {sale.customers?.name || (
                            <span className="text-gray-400 flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              Walk-in
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{sale.total_amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          ₹{sale.tax_amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="uppercase">
                            {sale.payment_method}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {new Date(sale.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-600">
                            {sale.payment_status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredSales.length === 0 && (
                  <div className="text-center py-12">
                    <Receipt className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No sales found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm ? 'Try adjusting your search' : 'Start making sales to see them here'}
                    </p>
                    <div className="mt-6">
                      <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Link href="/billing">
                          Go to Billing
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
