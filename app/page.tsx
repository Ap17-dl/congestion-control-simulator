import Link from "next/link"
import { ArrowRight, Zap, BarChart3, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              TCP Congestion Control
              <span className="text-primary"> Simulator</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Understand how TCP manages network congestion through interactive simulations of Slow Start, Congestion
              Avoidance, Fast Retransmit, and Fast Recovery algorithms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/simulator"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Launch Simulator
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/instructions"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Learn How to Use
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Simulation</h3>
            <p className="text-muted-foreground">
              Step through or auto-run simulations with real-time parameter adjustments to see how TCP responds to
              network conditions.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Visualization</h3>
            <p className="text-muted-foreground">
              Watch the congestion window evolve with color-coded events showing packet delivery, loss, and window
              changes.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-info" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Educational Content</h3>
            <p className="text-muted-foreground">
              Comprehensive explanations of each algorithm with diagrams, state transitions, and real-world
              implications.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Explore?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Start with the simulator to see TCP congestion control in action, or read the algorithms guide to understand
            the theory first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/simulator"
              className="inline-flex items-center justify-center px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Simulator
            </Link>
            <Link
              href="/algorithms"
              className="inline-flex items-center justify-center px-6 py-2 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              View Algorithms
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
