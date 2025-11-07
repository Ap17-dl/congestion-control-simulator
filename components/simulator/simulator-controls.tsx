"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, StepForward, Info } from "lucide-react"
import type { SimulationParameters } from "@/types/simulation"
import { useState } from "react"

interface SimulatorControlsProps {
  algorithm: string
  setAlgorithm: (algo: string) => void
  parameters: SimulationParameters
  setParameters: (params: SimulationParameters) => void
  isRunning: boolean
  setIsRunning: (running: boolean) => void
  onStep: () => void
  onReset: () => void
}

const algorithms = [
  {
    id: "slow-start",
    name: "TCP Slow Start",
    description: "Exponential window growth until threshold",
  },
  {
    id: "congestion-avoidance",
    name: "Congestion Avoidance",
    description: "Linear window growth after threshold",
  },
  {
    id: "fast-retransmit",
    name: "Fast Retransmit",
    description: "Immediate retransmission on packet loss",
  },
  {
    id: "fast-recovery",
    name: "Fast Recovery",
    description: "Moderate window reduction on loss",
  },
]

export default function SimulatorControls({
  algorithm,
  setAlgorithm,
  parameters,
  setParameters,
  isRunning,
  setIsRunning,
  onStep,
  onReset,
}: SimulatorControlsProps) {
  const [showAlgoInfo, setShowAlgoInfo] = useState(false)

  const handleParameterChange = (key: keyof SimulationParameters, value: number) => {
    setParameters({ ...parameters, [key]: value })
  }

  const currentAlgo = algorithms.find((a) => a.id === algorithm)

  return (
    <div className="space-y-4">
      {/* Algorithm Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Algorithm</CardTitle>
              <CardDescription>Select TCP congestion control algorithm</CardDescription>
            </div>
            <button
              onClick={() => setShowAlgoInfo(!showAlgoInfo)}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle algorithm info"
            >
              <Info size={18} className="text-muted" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setAlgorithm(algo.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  algorithm === algo.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {algo.name.split(" ").pop()}
              </button>
            ))}
          </div>

          {showAlgoInfo && currentAlgo && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm font-medium mb-1">{currentAlgo.name}</p>
              <p className="text-xs text-muted">{currentAlgo.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Network Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Network Parameters</CardTitle>
          <CardDescription>Adjust initial conditions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Initial cwnd */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Initial cwnd (MSS)</label>
              <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                {parameters.initialCwnd}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={parameters.initialCwnd}
              onChange={(e) => handleParameterChange("initialCwnd", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">Starting congestion window size</p>
          </div>

          {/* ssthresh */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Slow Start Threshold</label>
              <span className="text-sm font-semibold text-accent bg-accent/10 px-2 py-1 rounded">
                {parameters.ssthresh}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="64"
              value={parameters.ssthresh}
              onChange={(e) => handleParameterChange("ssthresh", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <p className="text-xs text-muted-foreground mt-1">Threshold for algorithm phase transition</p>
          </div>

          {/* Packet Loss Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Packet Loss Rate</label>
              <span className="text-sm font-semibold text-error bg-error/10 px-2 py-1 rounded">
                {parameters.packetLossRate}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={parameters.packetLossRate}
              onChange={(e) => handleParameterChange("packetLossRate", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-error"
            />
            <p className="text-xs text-muted-foreground mt-1">Simulated network congestion level</p>
          </div>

          {/* RTT */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Round Trip Time (RTT)</label>
              <span className="text-sm font-semibold text-info bg-info/10 px-2 py-1 rounded">{parameters.rtt}ms</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={parameters.rtt}
              onChange={(e) => handleParameterChange("rtt", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-info"
            />
            <p className="text-xs text-muted-foreground mt-1">Network latency in milliseconds</p>
          </div>
        </CardContent>
      </Card>

      {/* Control Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Simulation Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-full font-semibold transition-all ${
              isRunning
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {isRunning ? (
              <>
                <Pause size={18} className="mr-2" />
                Pause Simulation
              </>
            ) : (
              <>
                <Play size={18} className="mr-2" />
                Run Simulation
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={onStep} variant="outline" className="bg-transparent hover:bg-muted transition-colors">
              <StepForward size={18} className="mr-2" />
              Step
            </Button>

            <Button
              onClick={onReset}
              variant="outline"
              className="bg-transparent hover:bg-destructive/10 text-destructive hover:text-destructive transition-colors"
            >
              <RotateCcw size={18} className="mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Presets</CardTitle>
          <CardDescription>Load common network scenarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <button
            onClick={() => {
              setParameters({ initialCwnd: 2, ssthresh: 16, packetLossRate: 0, rtt: 50 })
              onReset()
            }}
            className="w-full px-3 py-2 text-sm font-medium bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left"
          >
            <p className="font-semibold">Stable Network</p>
            <p className="text-xs text-muted-foreground">0% loss, 50ms RTT</p>
          </button>

          <button
            onClick={() => {
              setParameters({ initialCwnd: 2, ssthresh: 16, packetLossRate: 5, rtt: 50 })
              onReset()
            }}
            className="w-full px-3 py-2 text-sm font-medium bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left"
          >
            <p className="font-semibold">Moderate Congestion</p>
            <p className="text-xs text-muted-foreground">5% loss, 50ms RTT</p>
          </button>

          <button
            onClick={() => {
              setParameters({ initialCwnd: 2, ssthresh: 16, packetLossRate: 15, rtt: 100 })
              onReset()
            }}
            className="w-full px-3 py-2 text-sm font-medium bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left"
          >
            <p className="font-semibold">High Congestion</p>
            <p className="text-xs text-muted-foreground">15% loss, 100ms RTT</p>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
