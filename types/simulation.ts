export interface SimulationParameters {
  initialCwnd: number
  ssthresh: number
  packetLossRate: number
  rtt: number
}

export interface SimulationState {
  cwnd: number
  ssthresh: number
  state: "slow-start" | "congestion-avoidance" | "fast-recovery"
  packetsInFlight: number
  totalPacketsSent: number
  totalPacketsLost: number
}

export interface SimulationEvent {
  time: number
  type: string
  description: string
  color: string
}
