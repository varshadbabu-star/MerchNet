import { NextResponse } from 'next/server'

export async function GET() {
  // Mock data for dashboard - replace with actual Supabase queries
  const stats = {
    totalInvoices: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    customers: 0
  }

  const recentInvoices: any[] = []

  return NextResponse.json({
    stats,
    recentInvoices
  })
}
