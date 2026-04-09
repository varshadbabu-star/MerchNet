'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Calculator, Settings } from 'lucide-react'

interface TaxRate {
  id: number
  name: string
  rate: number
  is_default: boolean
  created_at: string
}

export default function TaxPage() {
  const [taxRates, setTaxRates] = useState<TaxRate[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTaxRate, setNewTaxRate] = useState({
    name: '',
    rate: 0,
    is_default: false
  })

  useEffect(() => {
    fetchTaxRates()
  }, [])

  const fetchTaxRates = async () => {
    try {
      const response = await fetch('/api/tax-rates')
      const data = await response.json()
      setTaxRates(data)
    } catch (error) {
      console.error('Error fetching tax rates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTaxRate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/tax-rates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaxRate)
      })

      if (response.ok) {
        setNewTaxRate({ name: '', rate: 0, is_default: false })
        setShowAddForm(false)
        fetchTaxRates()
      } else {
        alert('Error adding tax rate')
      }
    } catch (error) {
      console.error('Error adding tax rate:', error)
      alert('Error adding tax rate')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tax rates...</p>
        </div>
      </div>
    )
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tax Management</h1>
            <p className="text-gray-600 mt-2">Configure automatic tax calculations for your invoices</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Tax Rate
          </button>
        </div>

        {/* Add Tax Rate Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Tax Rate</h3>
              <form onSubmit={handleAddTaxRate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Name *
                  </label>
                  <input
                    type="text"
                    value={newTaxRate.name}
                    onChange={(e) => setNewTaxRate({ ...newTaxRate, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Sales Tax, VAT"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={newTaxRate.rate}
                    onChange={(e) => setNewTaxRate({ ...newTaxRate, rate: Number(e.target.value) })}
                    className="input-field"
                    placeholder="8.5"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_default"
                    checked={newTaxRate.is_default}
                    onChange={(e) => setNewTaxRate({ ...newTaxRate, is_default: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
                    Set as default tax rate
                  </label>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Tax Rate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tax Rates List */}
        <div className="space-y-4">
          {taxRates.map((taxRate) => (
            <div key={taxRate.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Calculator className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="font-semibold text-gray-900">{taxRate.name}</h3>
                      {taxRate.is_default && (
                        <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Rate: {taxRate.rate}% • Created {new Date(taxRate.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{taxRate.rate}%</p>
                    <p className="text-sm text-gray-500">Tax Rate</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {taxRates.length === 0 && (
          <div className="text-center py-12">
            <Calculator className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tax rates configured</h3>
            <p className="mt-1 text-sm text-gray-500">Set up tax rates to automatically calculate taxes on your invoices.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Tax Rate
              </button>
            </div>
          </div>
        )}

        {/* Tax Configuration Info */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Automatic Tax Calculation</h4>
              <p className="text-sm text-gray-600 mb-4">
                When creating invoices, taxes will be automatically calculated based on your configured tax rates.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Settings className="h-4 w-4 mr-2" />
                <span>Tax calculation is enabled by default</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Default Tax Rate</h4>
              <p className="text-sm text-gray-600 mb-4">
                The default tax rate will be automatically applied to new invoices unless manually changed.
              </p>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Current default:</span> {
                  taxRates.find(rate => rate.is_default)?.name || 'None set'
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
