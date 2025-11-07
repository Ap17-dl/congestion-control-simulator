"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

interface Event {
  time: number
  type: string
  description: string
  color: string
}

interface EventHistoryProps {
  events: Event[]
}

const getEventIcon = (type: string) => {
  switch (type) {
    case "Packet Loss":
      return <AlertCircle size={16} />
    case "ACK Received":
      return <CheckCircle size={16} />
    case "Phase Change":
      return <Info size={16} />
    case "Fast Retransmit":
    case "Fast Recovery":
      return <AlertTriangle size={16} />
    default:
      return <Info size={16} />
  }
}

export default function EventHistory({ events }: EventHistoryProps) {
  const displayEvents = events.slice(-20) // Show last 20 events

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event History</CardTitle>
        <CardDescription>Detailed log of simulation events (showing last 20)</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Screen: scrollable area */}
        <ScrollArea className="h-64 w-full border border-border rounded-lg p-4 print:hidden">
          <div className="space-y-2">
            {displayEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">No events yet. Start the simulation to see events.</p>
            ) : (
              displayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 pb-2 border-b border-border last:border-0 hover:bg-muted/50 p-2 rounded transition-colors"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      <span className="text-muted">t={event.time}:</span> {event.type}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Print: expanded, no-scroll view so PDF exporters capture everything */}
        <div className="hidden print:block w-full border border-border rounded-lg p-4">
          <div className="space-y-2">
            {displayEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">No events yet. Start the simulation to see events.</p>
            ) : (
              displayEvents.map((event, idx) => (
                <div
                  key={`print-${idx}`}
                  className="flex items-start gap-3 pb-2 border-b border-border last:border-0 p-2"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      <span className="text-muted">t={event.time}:</span> {event.type}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
