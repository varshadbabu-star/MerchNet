'use client'

import React, { useState } from 'react'
import { 
  Package, 
  AlertTriangle, 
  ArrowDownUp, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  TrendingDown,
  Activity,
  IndianRupee
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock inventory data
  const inventoryItems = [
    { id: '1', name: 'Premium Wireless Headphones', sku: 'AUDIO-001', stock: 145, category: 'Electronics', price: 12999, status: 'In Stock' },
    { id: '2', name: 'Ergonomic Office Chair', sku: 'FURN-042', stock: 12, category: 'Furniture', price: 8500, status: 'Low Stock' },
    { id: '3', name: 'Organic Green Tea (500g)', sku: 'GROC-112', stock: 0, category: 'Groceries', price: 450, status: 'Out of Stock' },
    { id: '4', name: 'Smart Fitness Watch', sku: 'ELEC-089', stock: 68, category: 'Electronics', price: 4999, status: 'In Stock' },
    { id: '5', name: 'Professional Chef Knife', sku: 'HOME-005', stock: 8, category: 'Kitchen', price: 2100, status: 'Low Stock' },
    { id: '6', name: 'Mechanical Keyboard RGB', sku: 'COMP-023', stock: 34, category: 'Electronics', price: 3400, status: 'In Stock' },
    { id: '7', name: 'Yoga Mat Non-Slip', sku: 'FIT-011', stock: 110, category: 'Fitness', price: 899, status: 'In Stock' },
    { id: '8', name: 'Bluetooth Speaker Portable', sku: 'AUDIO-002', stock: 3, category: 'Electronics', price: 1599, status: 'Critical' },
  ]

  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Stock': return 'bg-green-100 text-green-800'
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800'
      case 'Out of Stock': return 'bg-red-100 text-red-800'
      case 'Critical': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inventory Management</h1>
            <p className="text-gray-500 mt-1">Track, manage and optimize your store stock</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowDownUp className="w-4 h-4" /> Import/Export
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 text-white">
              <Plus className="w-4 h-4" /> Add Item
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm border-t-4 border-indigo-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Items</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">1,248</h3>
                </div>
                <div className="p-3 bg-indigo-50 rounded-full">
                  <Package className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm border-t-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Inventory Value</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">₹4.2M</h3>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm border-t-4 border-yellow-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">23</h3>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm border-t-4 border-red-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">7</h3>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-xl">Stock Inventory</CardTitle>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    type="text" 
                    placeholder="Search by name or SKU..." 
                    className="pl-9 bg-gray-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50/80">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">Product Name</th>
                    <th scope="col" className="px-6 py-4 font-semibold">SKU</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Category</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Price</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Stock Level</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 text-gray-500">{item.sku}</td>
                      <td className="px-6 py-4 text-gray-500">{item.category}</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">₹{item.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`${item.stock < 15 ? 'text-red-500 font-bold' : 'text-gray-900'}`}>
                            {item.stock}
                          </span>
                          <span className="text-xs text-gray-400">units</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p>No inventory items found matching "{searchTerm}"</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="py-4 border-t flex justify-between items-center text-sm text-gray-500 bg-gray-50/50 rounded-b-lg">
            <span>Showing {filteredItems.length} of {inventoryItems.length} items</span>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
