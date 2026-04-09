'use client'

import { useState, useEffect } from 'react'
import { 
  FileText, 
  CreditCard, 
  Calculator, 
  BarChart3, 
  Globe, 
  Plus,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  IndianRupee,
  Activity,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    customers: 0
  })

  const [recentInvoices, setRecentInvoices] = useState([])
  const [chartData, setChartData] = useState<Array<{name: string, revenue: number, invoices: number}>>([])

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setStats(data.stats)
      setRecentInvoices(data.recentInvoices)
      
      // Mock chart data for infographics
      setChartData([
        { name: 'Jan', revenue: 12000, invoices: 45 },
        { name: 'Feb', revenue: 15000, invoices: 52 },
        { name: 'Mar', revenue: 18000, invoices: 48 },
        { name: 'Apr', revenue: 22000, invoices: 61 },
        { name: 'May', revenue: 19500, invoices: 55 },
        { name: 'Jun', revenue: 25000, invoices: 68 }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const quickActions = [
    {
      title: 'POS Billing',
      description: 'Quick billing for retail transactions',
      icon: ShoppingCart,
      href: '/billing',
      color: 'bg-gradient-to-r from-green-500 to-emerald-600'
    },
    {
      title: 'Products',
      description: 'Manage inventory and products',
      icon: Target,
      href: '/products',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-600'
    },
    {
      title: 'Create Invoice',
      description: 'Generate a new invoice for a customer',
      icon: FileText,
      href: '/invoices/new',
      color: 'bg-gradient-to-r from-purple-500 to-pink-600'
    },
    {
      title: 'Customers',
      description: 'Manage customer database',
      icon: Users,
      href: '/customers',
      color: 'bg-gradient-to-r from-orange-500 to-red-600'
    },
    {
      title: 'Analytics',
      description: 'View billing trends and reports',
      icon: BarChart3,
      href: '/analytics',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-600'
    },
    {
      title: 'Tax Calculator',
      description: 'Configure automatic tax calculations',
      icon: Calculator,
      href: '/tax',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-600'
    }
  ]

  const statCards = [
    {
      title: 'Total Invoices',
      value: stats.totalInvoices,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'Active Customers',
      value: stats.customers,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+8%',
      changeType: 'positive'
    }
  ]

  const pieData = [
    { name: 'Paid', value: 75, color: '#10B981' },
    { name: 'Pending', value: 20, color: '#F59E0B' },
    { name: 'Overdue', value: 5, color: '#EF4444' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MerchNet</h1>
                  <span className="text-sm text-gray-500">Smart Billing Solution</span>
                </div>
              </div>
            </div>
            <nav className="flex space-x-6">
              <Link href="/billing" className="text-gray-600 hover:text-gray-900 transition-colors">Billing</Link>
              <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">Products</Link>
              <Link href="/sales" className="text-gray-600 hover:text-gray-900 transition-colors">Sales</Link>
              <Link href="/customers" className="text-gray-600 hover:text-gray-900 transition-colors">Customers</Link>
              <Link href="/invoices" className="text-gray-600 hover:text-gray-900 transition-colors">Invoices</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome to MerchNet
          </h2>
          <p className="text-gray-600 mt-2 text-lg">Your intelligent billing companion for modern retail businesses</p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor} shadow-lg`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  <Badge variant={stat.changeType === 'positive' ? 'default' : 'destructive'} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-gray-100/50 rounded-full -translate-y-10 translate-x-10"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Trend Chart */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Revenue Trend</span>
            </CardTitle>
            <CardDescription>Monthly revenue performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions with Enhanced Design */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Zap className="h-6 w-6 text-yellow-500 mr-2" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-xl ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Enhanced Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice Status Pie Chart */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Invoice Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Recent Invoices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInvoices.length > 0 ? (
                  recentInvoices.map((invoice: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">#{invoice.invoiceNumber}</p>
                        <p className="text-sm text-gray-600">{invoice.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{invoice.amount}</p>
                        <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent invoices</p>
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Link href="/invoices" className="flex items-center justify-center">
                  View all invoices
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month's Revenue</span>
                  <span className="font-semibold text-green-600">₹12,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Invoices Generated</span>
                  <span className="font-semibold text-blue-600">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Success Rate</span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Invoice Value</span>
                  <span className="font-semibold text-purple-600">₹276</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="text-sm font-semibold text-green-600">+15.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
