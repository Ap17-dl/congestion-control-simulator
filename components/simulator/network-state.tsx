"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertCircle, Send, Package } from "lucide-react"

interface NetworkStateData {
  cwnd: number
  ssthresh: number
  state: string
  packetsInFlight: number
  totalPacketsSent: number
  totalPacketsLost: number
}

interface NetworkStateProps {
  state: NetworkStateData
}

export default function NetworkState({ state }: NetworkStateProps) {
  const lossRate =
    state.totalPacketsSent > 0 ? ((state.totalPacketsLost / state.totalPacketsSent) * 100).toFixed(2) : "0.00"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Network State</CardTitle>
        <CardDescription>Current simulation metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Current cwnd</p>
            <p className="text-2xl font-bold text-primary">{Math.round(state.cwnd * 10) / 10}</p>
          </div>
          <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">ssthresh</p>
            <p className="text-2xl font-bold text-accent">{state.ssthresh}</p>
          </div>
        </div>

        {/* Algorithm State */}
        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground mb-1">Algorithm State</p>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-info" />
            <p className="font-semibold text-info capitalize">{state.state.replace("-", " ")}</p>
          </div>
        </div>

        {/* Packet Statistics */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Send size={16} className="text-chart-1" />
              <span className="text-sm text-muted-foreground">Packets Sent</span>
            </div>
            <span className="font-semibold">{state.totalPacketsSent}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-error" />
              <span className="text-sm text-muted-foreground">Packets Lost</span>
            </div>
            <span className="font-semibold text-error">{state.totalPacketsLost}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-warning" />
              <span className="text-sm text-muted-foreground">Loss Rate</span>
            </div>
            <span className="font-semibold text-warning">{lossRate}%</span>
          </div>
        </div>

        {/* Packets in Flight */}
        <div className="bg-info/10 rounded-lg p-3 border border-info/20">
          <p className="text-xs text-muted-foreground mb-1">Packets in Flight</p>
          <p className="text-xl font-bold text-info">{state.packetsInFlight}</p>
        </div>
      </CardContent>
    </Card>
  )
}
