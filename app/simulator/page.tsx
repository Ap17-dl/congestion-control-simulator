"use client"
import { useRef, useState } from "react"
import SimulatorControls from "@/components/simulator/simulator-controls"
import SimulatorChart from "@/components/simulator/simulator-chart"
import EventHistory from "@/components/simulator/event-history"
import NetworkState from "@/components/simulator/network-state"
import { useSimulation } from "@/hooks/use-simulation"

export default function SimulatorPage() {
  const {
    algorithm,
    setAlgorithm,
    parameters,
    setParameters,
    isRunning,
    setIsRunning,
    step,
    reset,
    chartData,
    algorithmRuns,
    events,
    networkState,
  } = useSimulation()

  const exportRef = useRef<HTMLDivElement | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    const el = exportRef.current
    if (!el) return
    setIsExporting(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      const canvas = await html2canvas(el, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const imgProps = pdf.getImageProperties(imgData)
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("simulation-results.pdf")
    } catch (err) {
      console.error("Export failed", err)
      alert("Failed to export PDF. Make sure html2canvas and jspdf are installed.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">TCP Congestion Control Simulator</h1>
          <p className="text-muted-foreground">
            Observe how different TCP algorithms manage network congestion in real-time.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* New: Export button placed near controls */}
            <div>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="inline-flex items-center px-3 py-2 bg-primary text-white rounded-md disabled:opacity-50"
                type="button"
              >
                {isExporting ? "Exporting..." : "Export as PDF"}
              </button>
            </div>

            <SimulatorControls
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              parameters={parameters}
              setParameters={setParameters}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              onStep={step}
              onReset={reset}
            />
            <NetworkState state={networkState} />
          </div>

          {/* Right Column - Visualization */}
          <div className="lg:col-span-2 space-y-6">
            {/* New: wrap visual area with ref so html2canvas captures chart + history */}
            <div ref={exportRef}>
              <SimulatorChart data={chartData} algorithmRuns={algorithmRuns} currentAlgorithm={algorithm} />
              <EventHistory events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
