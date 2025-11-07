"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartDataPoint {
  time: number
  cwnd?: number
  ssthresh?: number
  [key: string]: number | string | undefined
}

interface AlgorithmRun {
  algorithm: string
  data: ChartDataPoint[]
  color: string
  label: string
  runId: string
}

interface SimulatorChartProps {
  data: ChartDataPoint[]
  algorithmRuns?: AlgorithmRun[]
  currentAlgorithm?: string
}

const ALGORITHM_COLORS: Record<string, string> = {
  "slow-start": "#3b82f6",
  "congestion-avoidance": "#ef4444",
  "fast-retransmit": "#1f2937",
  "fast-recovery": "#22c55e",
}

const ALGORITHM_LABELS: Record<string, string> = {
  "slow-start": "Slow Start",
  "congestion-avoidance": "Congestion Avoidance",
  "fast-retransmit": "Fast Retransmit",
  "fast-recovery": "Fast Recovery",
}

export default function SimulatorChart({
  data,
  algorithmRuns = [],
  currentAlgorithm = "slow-start",
}: SimulatorChartProps) {
  const currentAlgorithmColor = ALGORITHM_COLORS[currentAlgorithm] || "#3b82f6"
  const currentAlgorithmLabel = ALGORITHM_LABELS[currentAlgorithm] || "Current"

  const currentRunNumber = algorithmRuns.filter((r) => r.algorithm === currentAlgorithm).length + 1
  const currentRunLabel = currentRunNumber > 1 ? `${currentAlgorithmLabel}${currentRunNumber}` : currentAlgorithmLabel

  const mergedData: ChartDataPoint[] = []
  let timeOffset = 0

  algorithmRuns.forEach((run) => {
    run.data.forEach((point) => {
      const mergedPoint: ChartDataPoint = { time: timeOffset + point.time }
      mergedPoint[`cwnd_${run.runId}`] = point.cwnd
      const existing = mergedData.find((p) => p.time === mergedPoint.time)
      if (existing) {
        Object.assign(existing, mergedPoint)
      } else {
        mergedData.push(mergedPoint)
      }
    })
    timeOffset += Math.max(...run.data.map((p) => p.time), 0) + 1
  })

  data.forEach((point, idx) => {
    mergedData.push({
      time: timeOffset + point.time,
      cwnd: point.cwnd,
      ssthresh: point.ssthresh,
    })
  })

  const allData = [...data, ...algorithmRuns.flatMap((run) => run.data)]
  const cwndValues = allData.map((d) => d.cwnd).filter((v): v is number => typeof v === 'number')
  const maxCwnd = cwndValues.length > 0 ? Math.max(...cwndValues) : 10
  const avgCwnd = cwndValues.length > 0 ? Math.round((cwndValues.reduce((sum, v) => sum + v, 0) / cwndValues.length) * 10) / 10 : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Congestion Window Evolution</CardTitle>
            <CardDescription>Real-time visualization of cwnd and ssthresh over time</CardDescription>
          </div>
          {allData.length > 0 && (
            <div className="flex gap-4 text-sm">
              <div className="text-right">
                <p className="text-muted-foreground">Max cwnd</p>
                <p className="font-semibold text-primary">{Math.round(maxCwnd * 10) / 10}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Avg cwnd</p>
                <p className="font-semibold text-accent">{avgCwnd}</p>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full h-96 min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mergedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted)" />
              <YAxis stroke="var(--color-muted)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                  padding: "8px 12px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
                formatter={(value) => [Math.round((value as number) * 10) / 10, ""]}
              />
              <Legend />
              {algorithmRuns.map((run) => (
                <Line
                  key={run.runId}
                  type="monotone"
                  dataKey={`cwnd_${run.runId}`}
                  stroke={run.color}
                  strokeWidth={2.5}
                  dot={false}
                  name={run.label}
                  isAnimationActive={false}
                />
              ))}
              {data.length > 0 && (
                <Line
                  type="monotone"
                  dataKey="cwnd"
                  stroke={currentAlgorithmColor}
                  strokeWidth={2.5}
                  dot={false}
                  name={currentRunLabel}
                  isAnimationActive={false}
                />
              )}
              <Line
                type="monotone"
                dataKey="ssthresh"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Slow Start Threshold (ssthresh)"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
