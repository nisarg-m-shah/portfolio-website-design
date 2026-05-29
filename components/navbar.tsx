"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Bell, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 0)
    })
  }

  return (
    <nav
      className={cn(
        "fixed top-0 z-40 w-full transition-colors duration-300",
        isScrolled ? "bg-background/95 backdrop-blur" : "bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-12 lg:px-16">
        {/* Left section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            N
          </Link>

          {/* Navigation links - desktop */}
          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="#featured"
              className="text-sm text-foreground transition-colors hover:text-muted-foreground"
            >
              Featured
            </Link>
            <Link
              href="#projects"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="#blogs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="#connect"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Connect
            </Link>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <button className="text-foreground transition-colors hover:text-muted-foreground">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-foreground transition-colors hover:text-muted-foreground">
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded bg-primary">
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-primary-foreground">
                N
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>
    </nav>
  )
}
