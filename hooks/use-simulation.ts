"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { SimulationParameters, SimulationState, SimulationEvent } from "@/types/simulation"

interface ChartDataPoint {
  time: number
  [key: string]: number | string | undefined
}

interface AlgorithmRun {
  algorithm: string
  data: ChartDataPoint[]
  color: string
  label: string
  runId: string
}

const ALGORITHM_COLORS: Record<string, string> = {
  "slow-start": "#3b82f6",
  "congestion-avoidance": "#ef4444",
  "fast-retransmit": "#1f2937",
  "fast-recovery": "#22c55e",
}

const ALGORITHM_LABELS: Record<string, string> = {
  "slow-start": "Start",
  "congestion-avoidance": "Avoidance",
  "fast-retransmit": "Retransmit",
  "fast-recovery": "Recovery",
}

export function useSimulation() {
  const [algorithm, setAlgorithm] = useState("slow-start")
  const [parameters, setParameters] = useState<SimulationParameters>({
    initialCwnd: 2,
    ssthresh: 16,
    packetLossRate: 10,
    rtt: 50,
  })

  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [algorithmRuns, setAlgorithmRuns] = useState<AlgorithmRun[]>([])
  const [events, setEvents] = useState<SimulationEvent[]>([])
  const [networkState, setNetworkState] = useState<SimulationState>({
    cwnd: parameters.initialCwnd,
    ssthresh: parameters.ssthresh,
    state: "slow-start",
    packetsInFlight: 0,
    totalPacketsSent: 0,
    totalPacketsLost: 0,
  })

  const eventsRef = useRef<SimulationEvent[]>([])
  const previousAlgorithmRef = useRef(algorithm)

  const addEvent = useCallback(
    (type: string, description: string, color: string) => {
      const newEvent: SimulationEvent = { time, type, description, color }
      eventsRef.current = [...eventsRef.current, newEvent]
      setEvents([...eventsRef.current])
    },
    [time],
  )

  const step = useCallback(() => {
    setNetworkState((prevState) => {
      const newState = { ...prevState }
      let newCwnd = newState.cwnd
      let newSsthresh = newState.ssthresh
      let newStateType = newState.state

      const packetLoss = Math.random() * 100 < parameters.packetLossRate
      newState.totalPacketsSent++

      if (packetLoss) {
        newState.totalPacketsLost++
        addEvent("Packet Loss", `Packet loss detected at t=${time}`, "var(--color-error)")

        if (algorithm === "slow-start") {
          newSsthresh = Math.max(2, Math.floor(newCwnd / 2))
          newCwnd = 1
          newStateType = "slow-start"
          addEvent("Slow Start Reset", `ssthresh set to ${newSsthresh}, cwnd reset to 1`, "var(--color-warning)")
        } else if (algorithm === "congestion-avoidance") {
          newSsthresh = Math.max(2, Math.floor(newCwnd / 2))
          newCwnd = 1
          newStateType = "slow-start"
          addEvent("Congestion Avoidance Reset", `Returning to Slow Start`, "var(--color-warning)")
        } else if (algorithm === "fast-retransmit") {
          addEvent("Fast Retransmit", "Retransmitting lost packet immediately", "var(--color-info)")
          newState.totalPacketsSent++
        } else if (algorithm === "fast-recovery") {
          newSsthresh = Math.max(2, Math.floor(newCwnd / 2))
          newCwnd = newSsthresh + 3
          newStateType = "fast-recovery"
          addEvent("Fast Recovery", `cwnd reduced to ${newCwnd}`, "var(--color-warning)")
        }
      } else {
        if (newCwnd < newSsthresh) {
          newCwnd = newCwnd + 1
          newStateType = "slow-start"
          if (newCwnd >= newSsthresh) {
            addEvent("Phase Change", "Entering Congestion Avoidance", "var(--color-chart-1)")
            newStateType = "congestion-avoidance"
          }
        } else if (newStateType === "fast-recovery") {
          newCwnd = newCwnd + 1 / newCwnd
          if (newCwnd >= newSsthresh) {
            newStateType = "congestion-avoidance"
            addEvent("Recovery Complete", "Returning to Congestion Avoidance", "var(--color-chart-1)")
          }
        } else {
          newCwnd = newCwnd + 1 / newCwnd
          newStateType = "congestion-avoidance"
        }
        addEvent("ACK Received", `cwnd = ${Math.floor(newCwnd * 10) / 10}`, "var(--color-success)")
      }

      newCwnd = Math.max(1, Math.min(newCwnd, 64))
      newState.cwnd = newCwnd
      newState.ssthresh = newSsthresh
      newState.state = newStateType
      newState.packetsInFlight = Math.floor(newCwnd)

      return newState
    })

    setChartData((prev) => [
      ...prev,
      {
        time: time + 1,
        cwnd: Math.round(networkState.cwnd * 10) / 10,
        ssthresh: networkState.ssthresh,
      },
    ])

    setTime((prev) => prev + 1)
  }, [time, algorithm, parameters.packetLossRate, addEvent, networkState.cwnd, networkState.ssthresh])

  const saveAndResetRun = useCallback(() => {
    if (chartData.length > 0) {
      const baseLabel = ALGORITHM_LABELS[previousAlgorithmRef.current] || "Unknown"
      const existingCount = algorithmRuns.filter((r) => r.algorithm === previousAlgorithmRef.current).length
      const label = existingCount > 0 ? `${baseLabel}${existingCount + 1}` : baseLabel

      const newRun: AlgorithmRun = {
        algorithm: previousAlgorithmRef.current,
        data: chartData,
        color: ALGORITHM_COLORS[previousAlgorithmRef.current] || "#3b82f6",
        label,
        runId: `${previousAlgorithmRef.current}-${Date.now()}`,
      }
      setAlgorithmRuns((prev) => [...prev, newRun])
    }

    setTime(0)
    setChartData([])
    setEvents([])
    eventsRef.current = []
    setNetworkState({
      cwnd: parameters.initialCwnd,
      ssthresh: parameters.ssthresh,
      state: "slow-start",
      packetsInFlight: 0,
      totalPacketsSent: 0,
      totalPacketsLost: 0,
    })
  }, [chartData, algorithmRuns, parameters])

  useEffect(() => {
    if (algorithm !== previousAlgorithmRef.current) {
      saveAndResetRun()
      previousAlgorithmRef.current = algorithm
    }
  }, [algorithm, saveAndResetRun])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      step()
    }, parameters.rtt)
    return () => clearInterval(interval)
  }, [isRunning, step, parameters.rtt])

  return {
    algorithm,
    setAlgorithm,
    parameters,
    setParameters,
    isRunning,
    setIsRunning,
    step,
    reset: () => {
      setTime(0)
      setChartData([])
      setAlgorithmRuns([])
      setEvents([])
      eventsRef.current = []
      setNetworkState({
        cwnd: parameters.initialCwnd,
        ssthresh: parameters.ssthresh,
        state: "slow-start",
        packetsInFlight: 0,
        totalPacketsSent: 0,
        totalPacketsLost: 0,
      })
    },
    chartData,
    algorithmRuns,
    events,
    networkState,
  }
}
