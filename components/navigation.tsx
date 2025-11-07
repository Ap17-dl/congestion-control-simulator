"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/simulator", label: "Simulator" },
    { href: "/instructions", label: "Instructions" },
    { href: "/algorithms", label: "Learn" },
    { href: "/about", label: "Developer" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="font-extrabold text-justify text-foreground mx-2 my-1.5 border-slate-50 opacity-100 rounded-2xl shadow-md text-xl">CF</span>
            </div>
            <span className="hidden sm:inline">Congestion Fixing Simulator</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href) ? "bg-accent text-accent-foreground" : "hover:bg-primary-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-md hover:bg-primary-hover">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href) ? "bg-accent text-accent-foreground" : "hover:bg-primary-hover"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
