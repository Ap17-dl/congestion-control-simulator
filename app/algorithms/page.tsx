import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Zap } from "lucide-react"

export default function AlgorithmsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">TCP Congestion Control Algorithms</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Deep dive into the algorithms that manage network congestion and ensure fair bandwidth sharing across the
            internet.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-12">
          {/* Overview */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Overview</h2>
              <p className="text-muted-foreground">
                TCP Congestion Control is a fundamental mechanism in network communication that prevents data
                transmission from overwhelming network capacity. It works by dynamically adjusting the amount of data
                sent based on network conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Concepts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">Congestion Window (cwnd)</p>
                    <p className="text-sm text-muted-foreground">
                      The maximum amount of unacknowledged data (in MSS units) that can be in flight at any time.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Slow Start Threshold (ssthresh)</p>
                    <p className="text-sm text-muted-foreground">
                      A threshold that determines when to switch from exponential to linear window growth.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">MSS (Maximum Segment Size)</p>
                    <p className="text-sm text-muted-foreground">
                      The largest amount of data that can be transmitted in a single TCP segment.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why It Matters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Without congestion control, TCP would send data as fast as possible, causing network congestion,
                    packet loss, and poor performance for all users.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Congestion control algorithms ensure fair bandwidth sharing and network stability while maximizing
                    throughput.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Slow Start */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-primary" size={20} />
              </div>
              <h2 className="text-3xl font-bold">Slow Start</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Algorithm Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Slow Start is the initial phase of TCP congestion control where the congestion window grows
                  exponentially. Despite its name, it's actually quite aggressive in increasing the window size.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="font-semibold text-sm mb-2">Growth Formula:</p>
                  <p className="font-mono text-sm">cwnd = cwnd + 1 MSS per RTT</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    This results in exponential growth: 1, 2, 4, 8, 16...
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">When It's Used:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>At the start of a TCP connection</li>
                    <li>After a timeout (RTO - Retransmission Timeout)</li>
                    <li>When recovering from severe congestion</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">Characteristics:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Exponential window growth until ssthresh is reached</li>
                    <li>Quickly probes available bandwidth</li>
                    <li>May cause packet loss if network capacity is limited</li>
                    <li>Transitions to Congestion Avoidance when cwnd ≥ ssthresh</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Congestion Avoidance */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-accent" size={20} />
              </div>
              <h2 className="text-3xl font-bold">Congestion Avoidance</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Algorithm Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Congestion Avoidance is the steady-state phase where the window grows linearly. This conservative
                  approach probes for additional bandwidth while minimizing the risk of congestion.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="font-semibold text-sm mb-2">Growth Formula:</p>
                  <p className="font-mono text-sm">cwnd = cwnd + 1/cwnd MSS per RTT</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    This results in linear growth: increases by 1 MSS per RTT
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">When It's Used:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>After Slow Start phase (when cwnd ≥ ssthresh)</li>
                    <li>During normal network operation</li>
                    <li>When probing for additional bandwidth cautiously</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">Characteristics:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Linear window growth (AIMD: Additive Increase)</li>
                    <li>Conservative bandwidth probing</li>
                    <li>Reduces window on packet loss (Multiplicative Decrease)</li>
                    <li>Maintains network stability</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fast Retransmit */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Zap className="text-info" size={20} />
              </div>
              <h2 className="text-3xl font-bold">Fast Retransmit</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Algorithm Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Fast Retransmit improves TCP performance by detecting packet loss through duplicate ACKs rather than
                  waiting for a timeout. This allows faster recovery from isolated packet losses.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="font-semibold text-sm mb-2">Trigger Condition:</p>
                  <p className="text-sm">Retransmit when 3 duplicate ACKs are received</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    A duplicate ACK indicates the receiver got a packet but is missing an earlier one
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">How It Works:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Sender transmits packets 1, 2, 3, 4, 5</li>
                    <li>Packet 3 is lost; receiver gets 1, 2, 4, 5</li>
                    <li>Receiver sends duplicate ACKs for packet 2</li>
                    <li>After 3 duplicate ACKs, sender retransmits packet 3 immediately</li>
                    <li>No need to wait for RTO timeout</li>
                  </ol>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">Benefits:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Faster recovery from isolated packet losses</li>
                    <li>Reduces unnecessary timeouts</li>
                    <li>Improves throughput for bursty traffic</li>
                    <li>Typically combined with Fast Recovery</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fast Recovery */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-warning" size={20} />
              </div>
              <h2 className="text-3xl font-bold">Fast Recovery</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Algorithm Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Fast Recovery works with Fast Retransmit to avoid the drastic window reduction that would occur with a
                  timeout. Instead of resetting to 1, it reduces the window moderately and continues transmission.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="font-semibold text-sm mb-2">Window Reduction Formula:</p>
                  <p className="font-mono text-sm">ssthresh = cwnd / 2</p>
                  <p className="font-mono text-sm">cwnd = ssthresh + 3</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    The +3 accounts for the 3 duplicate ACKs that triggered recovery
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">Recovery Process:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Packet loss detected via 3 duplicate ACKs</li>
                    <li>Set ssthresh = cwnd / 2</li>
                    <li>Set cwnd = ssthresh + 3</li>
                    <li>Retransmit lost packet</li>
                    <li>For each additional duplicate ACK, increment cwnd by 1</li>
                    <li>When new ACK arrives, return to Congestion Avoidance</li>
                  </ol>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">Advantages:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Avoids drastic window reduction</li>
                    <li>Maintains higher throughput during recovery</li>
                    <li>Prevents unnecessary timeouts</li>
                    <li>Improves performance on networks with isolated losses</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Algorithm Comparison</h2>

            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-semibold">Aspect</th>
                        <th className="text-left py-2 px-3 font-semibold">Slow Start</th>
                        <th className="text-left py-2 px-3 font-semibold">Congestion Avoidance</th>
                        <th className="text-left py-2 px-3 font-semibold">Fast Retransmit</th>
                        <th className="text-left py-2 px-3 font-semibold">Fast Recovery</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 font-medium">Growth Rate</td>
                        <td className="py-2 px-3 text-muted-foreground">Exponential</td>
                        <td className="py-2 px-3 text-muted-foreground">Linear</td>
                        <td className="py-2 px-3 text-muted-foreground">N/A</td>
                        <td className="py-2 px-3 text-muted-foreground">Moderate</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 font-medium">When Used</td>
                        <td className="py-2 px-3 text-muted-foreground">Connection start</td>
                        <td className="py-2 px-3 text-muted-foreground">Normal operation</td>
                        <td className="py-2 px-3 text-muted-foreground">Loss detection</td>
                        <td className="py-2 px-3 text-muted-foreground">After loss</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 font-medium">Window Reduction</td>
                        <td className="py-2 px-3 text-muted-foreground">Reset to 1</td>
                        <td className="py-2 px-3 text-muted-foreground">Halved</td>
                        <td className="py-2 px-3 text-muted-foreground">None</td>
                        <td className="py-2 px-3 text-muted-foreground">Moderate</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">Aggressiveness</td>
                        <td className="py-2 px-3 text-muted-foreground">High</td>
                        <td className="py-2 px-3 text-muted-foreground">Low</td>
                        <td className="py-2 px-3 text-muted-foreground">Medium</td>
                        <td className="py-2 px-3 text-muted-foreground">Medium</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-World Implications */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Real-World Implications</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Network Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Congestion control algorithms directly impact user experience by determining how quickly data is
                    transmitted and how the network responds to congestion.
                  </p>
                  <p>
                    Better algorithms lead to higher throughput, lower latency, and more stable connections for all
                    users.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fairness</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    These algorithms ensure that multiple TCP connections share bandwidth fairly, preventing any single
                    connection from monopolizing network resources.
                  </p>
                  <p>
                    This fairness is crucial for the internet to function as a shared resource for billions of users.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Without proper congestion control, networks can enter a congestion collapse state where throughput
                    drops dramatically.
                  </p>
                  <p>
                    These algorithms prevent such collapses by proactively reducing transmission rates when congestion
                    is detected.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Modern variants like CUBIC, BBR, and others optimize for specific network conditions (high
                    bandwidth-delay products, mobile networks, etc.).
                  </p>
                  <p>The choice of algorithm can significantly impact performance on different types of networks.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Further Reading */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Key References</h2>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div>
                  <p className="font-semibold text-sm">RFC 5681 - TCP Congestion Control</p>
                  <p className="text-xs text-muted-foreground">
                    The standard specification for TCP congestion control algorithms including Slow Start, Congestion
                    Avoidance, Fast Retransmit, and Fast Recovery.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm">Van Jacobson's Original Work (1988)</p>
                  <p className="text-xs text-muted-foreground">
                    The foundational paper that introduced congestion control to TCP, preventing internet congestion
                    collapse.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm">Modern Variants</p>
                  <p className="text-xs text-muted-foreground">
                    CUBIC (RFC 8312), BBR (Google), and others optimize for modern high-speed networks and specific use
                    cases.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
