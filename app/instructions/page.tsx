import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Play, RotateCcw, Sliders, TrendingUp, BookOpen } from "lucide-react"

export default function Instructions() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">How to Use the Simulator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A step-by-step guide to understanding and interacting with the TCP Congestion Control Simulator.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-12">
          {/* Getting Started */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Getting Started</h2>
              <p className="text-muted-foreground">Before diving into the simulator, here's what you need to know:</p>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="text-primary" size={20} />
                    What is TCP Congestion Control?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>
                    TCP Congestion Control is a mechanism that manages how much data is sent over a network to avoid
                    overwhelming it. The simulator demonstrates four key algorithms:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      <strong>Slow Start:</strong> Exponentially increases the congestion window until a threshold is
                      reached
                    </li>
                    <li>
                      <strong>Congestion Avoidance:</strong> Linearly increases the window to probe for available
                      bandwidth
                    </li>
                    <li>
                      <strong>Fast Retransmit:</strong> Quickly resends lost packets without waiting for timeout
                    </li>
                    <li>
                      <strong>Fast Recovery:</strong> Reduces the window moderately instead of drastically on packet
                      loss
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="text-accent" size={20} />
                    Key Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p>
                      <strong>Congestion Window (cwnd):</strong> The maximum amount of data that can be sent without
                      acknowledgment
                    </p>
                    <p>
                      <strong>Slow Start Threshold (ssthresh):</strong> The point where the algorithm switches from
                      exponential to linear growth
                    </p>
                    <p>
                      <strong>Round Trip Time (RTT):</strong> The time it takes for data to travel to the destination
                      and back
                    </p>
                    <p>
                      <strong>Packet Loss Rate:</strong> The percentage of packets that fail to reach their destination
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Using the Simulator */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Using the Simulator</h2>
              <p className="text-muted-foreground">Follow these steps to run and understand simulations:</p>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="text-primary" size={20} />
                    Step 1: Configure Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Before running a simulation, adjust the network parameters:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      <strong>Initial Congestion Window:</strong> Starting size of the congestion window (typically 1-4
                      MSS)
                    </li>
                    <li>
                      <strong>Slow Start Threshold:</strong> The target window size before switching algorithms
                    </li>
                    <li>
                      <strong>Packet Loss Rate:</strong> Simulate network congestion by setting a loss percentage
                    </li>
                    <li>
                      <strong>RTT (Round Trip Time):</strong> Simulate network latency in milliseconds
                    </li>
                    <li>
                      <strong>Maximum Congestion Window:</strong> The upper limit for window growth
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground italic mt-4">
                    Tip: Start with default values to understand the basic behavior, then experiment with different
                    settings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="text-accent" size={20} />
                    Step 2: Run the Simulation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>You have two ways to run the simulation:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">Auto-Run Mode:</p>
                      <p className="text-muted-foreground">
                        Click the Play button to automatically step through the simulation at a controlled speed. This
                        is great for watching the overall behavior.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Step-by-Step Mode:</p>
                      <p className="text-muted-foreground">
                        Click the Step button to advance one round at a time. This allows you to carefully observe what
                        happens at each stage.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic mt-4">
                    Tip: Use step-by-step mode when learning to understand each decision the algorithm makes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-info" size={20} />
                    Step 3: Observe the Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>The simulator displays real-time data through multiple visualizations:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      <strong>Congestion Window Chart:</strong> Shows how the window size changes over time with
                      color-coded events
                    </li>
                    <li>
                      <strong>Algorithm State:</strong> Displays which phase (Slow Start, Congestion Avoidance, etc.) is
                      currently active
                    </li>
                    <li>
                      <strong>Statistics Panel:</strong> Real-time metrics including current window size, packets sent,
                      and loss events
                    </li>
                    <li>
                      <strong>Event Log:</strong> Detailed record of what happened at each round (packets sent, losses,
                      state changes)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RotateCcw className="text-destructive" size={20} />
                    Step 4: Reset and Experiment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>After running a simulation, you can:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Click Reset to clear the simulation and start over with the same parameters</li>
                    <li>Adjust parameters and run again to see how different settings affect behavior</li>
                    <li>Compare results from different configurations to understand trade-offs</li>
                  </ul>
                  <p className="text-sm text-muted-foreground italic mt-4">
                    Tip: Try increasing packet loss rate to see how the algorithm responds to congestion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Understanding the Output */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Understanding the Output</h2>
              <p className="text-muted-foreground">Learn how to interpret the simulator's visualizations and data:</p>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Color-Coded Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-chart-1 rounded"></div>
                      <span>
                        <strong>Green:</strong> Successful packet transmission
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-chart-4 rounded"></div>
                      <span>
                        <strong>Red:</strong> Packet loss event
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-chart-3 rounded"></div>
                      <span>
                        <strong>Orange:</strong> Threshold reached or algorithm state change
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-chart-2 rounded"></div>
                      <span>
                        <strong>Blue:</strong> Fast retransmit or recovery event
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p>
                      <strong>Current Window Size:</strong> The congestion window at the current round
                    </p>
                    <p>
                      <strong>Total Packets Sent:</strong> Cumulative count of all packets transmitted
                    </p>
                    <p>
                      <strong>Packets Lost:</strong> Total number of packets that failed to reach destination
                    </p>
                    <p>
                      <strong>Loss Rate:</strong> Percentage of packets lost (actual vs. configured)
                    </p>
                    <p>
                      <strong>Throughput:</strong> Effective data transmission rate
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Experiment Ideas */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Experiment Ideas</h2>
              <p className="text-muted-foreground">Try these scenarios to deepen your understanding:</p>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Experiment 1: Impact of Packet Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Run two simulations: one with 0% packet loss and another with 5% loss. Compare how the congestion
                    window evolves. Notice how packet loss triggers the algorithm to reduce the window and restart.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experiment 2: Effect of RTT</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Try simulations with different RTT values (10ms, 100ms, 500ms). Observe how higher latency affects
                    the rate of window growth and recovery time after packet loss.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experiment 3: Threshold Sensitivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Set different slow start thresholds (low, medium, high) with the same packet loss rate. See how the
                    threshold affects the transition between Slow Start and Congestion Avoidance phases.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experiment 4: Real-World Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Simulate different network conditions: stable network (low loss), congested network (high loss), and
                    variable network (changing loss rate). Understand how TCP adapts to each scenario.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips and Best Practices */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Tips and Best Practices</h2>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="font-semibold mb-2">Start Simple</p>
                  <p className="text-muted-foreground">
                    Begin with default parameters and a 0% packet loss rate to understand the basic Slow Start and
                    Congestion Avoidance behavior.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Use Step-by-Step Mode for Learning</p>
                  <p className="text-muted-foreground">
                    When you're new to TCP congestion control, step through simulations one round at a time to
                    understand each decision.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Compare Configurations</p>
                  <p className="text-muted-foreground">
                    Run multiple simulations with different parameters and compare the results to understand how each
                    parameter affects behavior.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Read the Event Log</p>
                  <p className="text-muted-foreground">
                    The event log provides detailed information about what happened at each round. Use it to understand
                    the algorithm's decision-making process.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Relate to Real Networks</p>
                  <p className="text-muted-foreground">
                    Think about how the simulated scenarios relate to real-world networks (WiFi, cellular, data centers)
                    to build intuition.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to Explore?</h2>
            <p>Now that you understand how to use the simulator, launch it and start experimenting!</p>
            <Link
              href="/simulator"
              className="inline-flex items-center justify-center px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Launch Simulator
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
