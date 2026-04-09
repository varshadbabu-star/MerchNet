'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CreditCard, Shield, Zap, Settings, CheckCircle, AlertCircle } from 'lucide-react'

interface PaymentGateway {
  id: string
  name: string
  status: 'active' | 'inactive' | 'pending'
  description: string
  features: string[]
  setupRequired: boolean
}

export default function PaymentsPage() {
  const [gateways, setGateways] = useState<PaymentGateway[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      status: 'active',
      description: 'Accept payments from customers worldwide with Stripe\'s secure payment processing.',
      features: ['Credit Cards', 'Debit Cards', 'Digital Wallets', 'International Payments'],
      setupRequired: false
    },
    {
      id: 'paypal',
      name: 'PayPal',
      status: 'inactive',
      description: 'Enable PayPal payments for customers who prefer this popular payment method.',
      features: ['PayPal Account', 'Credit Cards via PayPal', 'Buy Now Pay Later'],
      setupRequired: true
    },
    {
      id: 'square',
      name: 'Square',
      status: 'inactive',
      description: 'Accept in-person and online payments with Square\'s comprehensive payment solution.',
      features: ['Point of Sale', 'Online Payments', 'Invoicing', 'Inventory Management'],
      setupRequired: true
    }
  ])
  const [loading, setLoading] = useState(false)

  const handleGatewayToggle = async (gatewayId: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setGateways(gateways.map(gateway => 
        gateway.id === gatewayId 
          ? { ...gateway, status: gateway.status === 'active' ? 'inactive' : 'active' }
          : gateway
      ))
    } catch (error) {
      console.error('Error toggling gateway:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'inactive':
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">Billora</Link>
              <span className="ml-2 text-sm text-gray-500">Billing Software</span>
            </div>
            <nav className="flex space-x-8">
              <Link href="/invoices" className="text-gray-600 hover:text-gray-900">Invoices</Link>
              <Link href="/customers" className="text-gray-600 hover:text-gray-900">Customers</Link>
              <Link href="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
              <Link href="/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment Integration</h1>
          <p className="text-gray-600 mt-2">Configure payment gateways to accept payments directly from invoices</p>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">$24,580</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Gateways</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-100">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Setup</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Payment Gateways</h2>
          
          {gateways.map((gateway) => (
            <div key={gateway.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{gateway.name}</h3>
                      <span className={`ml-3 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(gateway.status)}`}>
                        {getStatusIcon(gateway.status)}
                        <span className="ml-1">{gateway.status}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{gateway.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {gateway.features.map((feature, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {gateway.setupRequired && gateway.status === 'inactive' && (
                    <button className="btn-primary">
                      Setup Required
                    </button>
                  )}
                  <button
                    onClick={() => handleGatewayToggle(gateway.id)}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      gateway.status === 'active'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {loading ? 'Updating...' : gateway.status === 'active' ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Features */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Features</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-green-100 mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Secure Payments</h4>
                  <p className="text-sm text-gray-600">All payments are processed securely with industry-standard encryption.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-blue-100 mr-3">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Instant Processing</h4>
                  <p className="text-sm text-gray-600">Payments are processed instantly and reflected in your dashboard.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-purple-100 mr-3">
                  <Shield className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">PCI Compliance</h4>
                  <p className="text-sm text-gray-600">All payment gateways are PCI DSS compliant for maximum security.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Payment Method
                </label>
                <select className="input-field">
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                  <option value="square">Square</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Terms
                </label>
                <select className="input-field">
                  <option value="net15">Net 15</option>
                  <option value="net30">Net 30</option>
                  <option value="due_on_receipt">Due on Receipt</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto_reminders"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="auto_reminders" className="ml-2 block text-sm text-gray-700">
                  Send automatic payment reminders
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-primary">
              Test Payment Gateway
            </button>
            <button className="btn-secondary">
              View Payment History
            </button>
            <button className="btn-secondary">
              Configure Webhooks
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
