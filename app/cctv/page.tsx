'use client'

import React, { useState, useEffect } from 'react'
import { 
  Cctv, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle,
  Video,
  Settings,
  BellRing,
  Activity,
  Maximize2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CctvSecurity() {
  const [alerts, setAlerts] = useState([
    { id: 1, time: '10:42 AM', camera: 'Cam 1 - Main Entrance', type: 'suspicious', message: 'Person lingering near high-value goods', severity: 'medium', active: true },
    { id: 2, time: '09:15 AM', camera: 'Cam 3 - Aisle 4', type: 'theft', message: 'Bag manipulation detected', severity: 'high', active: false },
    { id: 3, time: '08:05 AM', camera: 'Cam 2 - Rear Exit', type: 'motion', message: 'Motion detected during closed hours', severity: 'medium', active: false },
  ])

  const [systemStatus, setSystemStatus] = useState('active') // active, scanning, offline

  useEffect(() => {
    // Simulate real-time scanning activity
    const interval = setInterval(() => {
      setSystemStatus(prev => prev === 'active' ? 'scanning' : 'active')
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-50 p-6 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header Region */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                CCTV Security & Theft Detection
                <Badge variant={systemStatus === 'active' ? 'default' : 'secondary'} className="ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0">
                  <Activity className="w-3 h-3 mr-1 animate-pulse" /> Live Analysis
                </Badge>
              </h1>
              <p className="text-neutral-400 text-sm mt-1">AI-powered surveillance and automated anomaly detection</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
              <Settings className="w-4 h-4 mr-2" /> Model Config
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <BellRing className="w-4 h-4 mr-2" /> Sound Alarm
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Video Feed Area - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Primary Camera (Active Alert/Scan) */}
              <Card className="bg-neutral-900 border-neutral-800 shadow-xl overflow-hidden relative group">
                <CardHeader className="p-3 border-b border-neutral-800 bg-neutral-900/50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-300">CAM 01 - Main Entrance (AI Active)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-neutral-500 font-mono">REC</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative aspect-video bg-black flex items-center justify-center">
                  {/* Fake video feed overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  
                  {/* Bounding box simulation */}
                  <div className={`absolute border-2 border-red-500 w-32 h-64 left-[40%] top-[20%] transition-opacity duration-1000 ${systemStatus === 'scanning' ? 'opacity-100' : 'opacity-40'}`}>
                    <div className="absolute -top-6 left-[-2px] bg-red-500 text-white text-xs px-2 py-0.5 font-mono whitespace-nowrap">
                      PERSON 89% | BAG 76%
                    </div>
                  </div>

                  <p className="text-neutral-700 font-mono flex items-center gap-2">
                    <Cctv className="w-6 h-6" /> No Input Signal
                  </p>
                  
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-500">
                    {new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}
                  </div>
                  <Button size="icon" variant="ghost" className="absolute bottom-2 right-2 hover:bg-white/10 text-white/50 hover:text-white">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Secondary Camera */}
              <Card className="bg-neutral-900 border-neutral-800 shadow-xl overflow-hidden relative">
                <CardHeader className="p-3 border-b border-neutral-800 bg-neutral-900/50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-300">CAM 02 - Checkout Area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative aspect-video bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <p className="text-neutral-700 font-mono">Stream Offline</p>
                </CardContent>
              </Card>

              {/* Third Camera */}
              <Card className="bg-neutral-900 border-neutral-800 shadow-xl overflow-hidden relative">
                <CardHeader className="p-3 border-b border-neutral-800 bg-neutral-900/50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-300">CAM 03 - Aisle 4 (High Value)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative aspect-video bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <p className="text-neutral-700 font-mono">Stream Offline</p>
                </CardContent>
              </Card>

              {/* Fourth Camera */}
              <Card className="bg-neutral-900 border-neutral-800 shadow-xl overflow-hidden relative">
                <CardHeader className="p-3 border-b border-neutral-800 bg-neutral-900/50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-300">CAM 04 - Back Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative aspect-video bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <p className="text-neutral-700 font-mono">Stream Offline</p>
                </CardContent>
              </Card>

            </div>

          </div>

          {/* Sidebar - Alert Log */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* System Status Summary */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardContent className="p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-400">ML Model</span>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-mono">YOLOv8-Theft-V2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-400">FPS Processing</span>
                  <span className="text-sm font-mono text-neutral-200">28.4 FPS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-400">Confidence Threshold</span>
                  <span className="text-sm font-mono text-neutral-200">75%</span>
                </div>
              </CardContent>
            </Card>

            {/* Alert List */}
            <Card className="bg-neutral-900 border-neutral-800 flex-1">
              <CardHeader className="p-4 border-b border-neutral-800">
                <CardTitle className="text-lg text-neutral-200 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-neutral-800">
                  {alerts.map(alert => (
                    <div key={alert.id} className={`p-4 transition-colors ${alert.active ? 'bg-red-500/5' : 'hover:bg-neutral-800/50'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline" className={`text-[10px] font-mono border-0 rounded-sm px-1.5 py-0 ${
                          alert.severity === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-neutral-500 font-mono">{alert.time}</span>
                      </div>
                      <p className={`font-medium text-sm ${alert.active ? 'text-red-400' : 'text-neutral-200'} mb-1`}>
                        {alert.message}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <Video className="w-3 h-3" />
                        {alert.camera}
                      </div>
                      
                      {alert.active && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="w-full h-7 text-xs bg-neutral-800 hover:bg-neutral-700 text-white">View Clip</Button>
                          <Button size="sm" className="w-full h-7 text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400">Dismiss</Button>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="p-4 text-center">
                    <Button variant="ghost" className="text-neutral-500 text-sm hover:text-white hover:bg-neutral-800 w-full">
                      View All History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  )
}
