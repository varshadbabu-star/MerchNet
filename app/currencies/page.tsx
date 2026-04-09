'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, IndianRupee, TrendingUp, Settings, RefreshCw, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Currency {
  id: number
  code: string
  name: string
  symbol: string
  exchange_rate: number
}

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCurrency, setSelectedCurrency] = useState('INR')

  useEffect(() => {
    fetchCurrencies()
  }, [])

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('/api/currencies')
      const data = await response.json()
      setCurrencies(data)
    } catch (error) {
      console.error('Error fetching currencies:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading currencies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MerchNet</h1>
                  <span className="text-sm text-gray-500">Smart Billing Solution</span>
                </div>
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/invoices" className="text-gray-600 hover:text-gray-900 transition-colors">Invoices</Link>
              <Link href="/customers" className="text-gray-600 hover:text-gray-900 transition-colors">Customers</Link>
              <Link href="/analytics" className="text-gray-600 hover:text-gray-900 transition-colors">Analytics</Link>
              <Link href="/currencies" className="text-blue-600 font-medium">Currencies</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Multi-Currency Support
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Manage currencies and exchange rates for international billing</p>
        </div>

        {/* Currency Selection */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <span>Default Currency</span>
            </CardTitle>
            <CardDescription>Set your primary currency for billing operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency-select">Select Default Currency</Label>
                <select
                  id="currency-select"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exchange-rate">Exchange Rate</Label>
                <Input 
                  id="exchange-rate"
                  value="1.0000 (Base Currency)" 
                  disabled 
                  className="bg-gray-50"
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Update Default
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supported Currencies */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>Supported Currencies</span>
            </CardTitle>
            <CardDescription>Manage all available currencies and their exchange rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Currency</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Exchange Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currencies.map((currency) => (
                    <TableRow key={currency.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <Globe className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{currency.name}</div>
                            <div className="text-sm text-gray-500">{currency.code}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{currency.symbol}</TableCell>
                      <TableCell>{currency.exchange_rate.toFixed(4)}</TableCell>
                      <TableCell>
                        <Badge variant={currency.code === selectedCurrency ? 'default' : 'secondary'}>
                          {currency.code === selectedCurrency ? 'Active' : 'Available'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Currency Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Currency Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-green-100 shadow-lg">
                    <IndianRupee className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Multi-Currency Invoicing</h4>
                    <p className="text-sm text-gray-600 mt-1">Create invoices in different currencies for international clients.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-blue-100 shadow-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Exchange Rates</h4>
                    <p className="text-sm text-gray-600 mt-1">Automatic conversion using current exchange rates.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-purple-100 shadow-lg">
                    <Settings className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Currency Preferences</h4>
                    <p className="text-sm text-gray-600 mt-1">Set default currencies for different regions.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-orange-600" />
                <span>Exchange Rate Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Base Currency</span>
                      <span className="text-sm font-semibold text-gray-900">INR</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Last Updated</span>
                      <span className="text-sm font-semibold text-gray-900">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Rate Source</span>
                      <span className="text-sm font-semibold text-gray-900">OpenExchange API</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Exchange rates are updated automatically every hour to ensure accurate conversions.</p>
                  <p>You can manually update rates or set custom rates for specific currencies if needed.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-purple-600" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Manage your currency settings and data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Exchange Rates
              </Button>
              <Button variant="outline">
                Add Custom Currency
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Currency Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
