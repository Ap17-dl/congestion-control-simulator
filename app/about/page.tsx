import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Github } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">About This Project</h1>
          <p className="text-lg text-muted-foreground">
            Learn about the TCP Congestion Control Simulator and its purpose.
          </p>
        </div>
        
        {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact & Feedback</CardTitle>
              <CardDescription>Have questions or suggestions?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                This simulator is designed to be an educational resource. If you have feedback, suggestions, or find any
                issues, feel free to reach out to us:
              </p>

              <div className="flex flex-row items-center space-x-8 p-4">
                <img
                src="/images/design-mode/WhatsApp_Image_2025-11-05_at_14.48.40_twjkhe.jpg"
                alt="Dr. A Swaminathan"
                className="w-24 h-28 object-cover rounded-md border"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-lg">Guide: Dr. A Swaminathan</h4>
                  <div className="flex gap-4 mt-2">
                    <a
                      href="mailto:iamsuryanshmishra@gmail.com"
                      className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-background transition-colors"
                    >
                      <Mail size={18} /> Email
                    </a>
                    <a
                      href="https://share.google/u4AtFjLxK7WWnUAIA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-background transition-colors"
                    >
                      <Github size={18} /> GitHub
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-8 p-4">
                <img
                  src="/images/design-mode/SS8_0248_f1r6px.jpg"
                  alt="Ankush Pratham"
                  className="w-24 h-28 object-cover rounded-md border"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-lg">Developer1: Ankush Pratham 24BCE1937</h4>
                  <div className="flex gap-4 mt-2">
                    <a
                      href="mailto:ankush170306@gmail.com"
                      className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-background transition-colors"
                    >
                      <Mail size={18} /> Email
                    </a>
                    <a
                      href="https://github.com/Ap17-dl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-background transition-colors"
                    >
                      <Github size={18} /> GitHub
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-8 p-4">
                <img
                  src="/images/design-mode/PHOTO-2025-11-06-22-20-32_k81t92.jpg"
                  alt="Suryansh Mishra"
                  className="w-24 h-28 object-cover rounded-md border"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-lg">Developer2: Suryansh Mishra 24BCE1908</h4>
                  <div className="flex gap-4 mt-2">
                    <a
                      href="mailto:iamsuryanshmishra@gmail.com"
                      className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-background transition-colors"
                    >
                      <Mail size={18} /> Email
                    </a>
                    <a
                      href="https://share.google/u4AtFjLxK7WWnUAIA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-background transition-colors"
                    >
                      <Github size={18} /> GitHub
                    </a>
                  </div>
                </div>
              </div>

              
            </CardContent>
          </Card>


        {/* Project Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The TCP Congestion Control & Avoidance Mechanisms Simulator is an educational tool designed to help
              students, network engineers, and developers understand how TCP manages network congestion.
            </p>
            <p>
              TCP (Transmission Control Protocol) is one of the most important protocols on the internet. Its congestion
              control mechanisms ensure that networks don't become overwhelmed and that bandwidth is shared fairly among
              users.
            </p>
            <p>
              This simulator provides an interactive way to observe and experiment with four key TCP algorithms: Slow
              Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.
            </p>
          </CardContent>
        </Card>

        {/* Why It Matters */}
        <Card>
          <CardHeader>
            <CardTitle>Why TCP Congestion Control Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Without congestion control, the internet would quickly become unusable. When too much data is sent too
              quickly, routers become overwhelmed, packets are dropped, and performance degrades for everyone.
            </p>
            <p>TCP's congestion control algorithms solve this problem by:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Probing the network to find available bandwidth</li>
              <li>Backing off when congestion is detected</li>
              <li>Recovering quickly from packet loss</li>
              <li>Sharing bandwidth fairly among competing flows</li>
            </ul>
            <p>
              Understanding these mechanisms is crucial for anyone working with networks, from system administrators to
              application developers.
            </p>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>New to the simulator? Here are the best ways to get started:</p>
            <div className="space-y-3">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold">1. Read the Instructions</h4>
                <p className="text-sm text-muted-foreground">
                  Visit the{" "}
                  <Link href="/instructions" className="text-primary hover:underline">
                    Instructions page
                  </Link>{" "}
                  for a detailed walkthrough of the simulator interface and how to use it.
                </p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold">2. Learn the Algorithms</h4>
                <p className="text-sm text-muted-foreground">
                  Check out the{" "}
                  <Link href="/algorithms" className="text-primary hover:underline">
                    Algorithms page
                  </Link>{" "}
                  to understand the theory behind each congestion control mechanism.
                </p>
              </div>
              <div className="border-l-4 border-warning pl-4">
                <h4 className="font-semibold">3. Run the Simulator</h4>
                <p className="text-sm text-muted-foreground">
                  Head to the{" "}
                  <Link href="/simulator" className="text-primary hover:underline">
                    Simulator
                  </Link>{" "}
                  and start experimenting with different algorithms and network conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Further Reading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              Want to dive deeper into TCP congestion control? Here are some excellent resources:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>RFC 5681 - TCP Congestion Control (official specification)</li>
              <li>RFC 3168 - The Addition of Explicit Congestion Notification (ECN) to IP</li>
              <li>"Computer Networking" by Kurose & Ross (textbook)</li>
              <li>Stanford CS144 - Introduction to Computer Networking</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
