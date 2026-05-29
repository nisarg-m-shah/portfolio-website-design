"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ConnectItem } from "@/types/portfolio"
import { Github, Linkedin, Twitter, Mail, Youtube, MessageCircle } from "lucide-react"

interface ConnectRowProps {
  title: string
  items: ConnectItem[]
  onItemClick: (item: ConnectItem) => void
}

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="h-8 w-8" />,
  linkedin: <Linkedin className="h-8 w-8" />,
  twitter: <Twitter className="h-8 w-8" />,
  mail: <Mail className="h-8 w-8" />,
  youtube: <Youtube className="h-8 w-8" />,
  discord: <MessageCircle className="h-8 w-8" />,
}

export function ConnectRow({ title, items, onItemClick }: ConnectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8
      const newScrollLeft =
        direction === "left"
          ? rowRef.current.scrollLeft - scrollAmount
          : rowRef.current.scrollLeft + scrollAmount

      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <section className="relative py-4 md:py-6">
      <h2 className="mb-2 px-4 text-lg font-semibold text-foreground md:px-12 md:text-xl lg:px-16">
        {title}
      </h2>

      <div className="group relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-r from-background to-transparent opacity-0 transition-opacity group-hover:opacity-100 md:w-16"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-8 w-8 text-foreground" />
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="hide-scrollbar flex gap-2 overflow-x-auto px-4 md:px-12 lg:px-16"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group/card relative flex-shrink-0 cursor-pointer overflow-hidden rounded transition-all duration-300",
                "w-[140px] md:w-[180px] lg:w-[220px]",
                hoveredId === item.id && "z-10 scale-110 shadow-2xl"
              )}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.preventDefault()
                onItemClick(item)
              }}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                  sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 220px"
                />

                {/* Icon overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60">
                  <div className="mb-2 text-foreground">
                    {iconMap[item.icon] || <Mail className="h-8 w-8" />}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                </div>

                {/* Hover overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center bg-primary/90 p-3 opacity-0 transition-opacity duration-300",
                    hoveredId === item.id && "opacity-100"
                  )}
                >
                  <div className="mb-2 text-primary-foreground">
                    {iconMap[item.icon] || <Mail className="h-8 w-8" />}
                  </div>
                  <p className="text-center text-sm font-semibold text-primary-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-center text-xs text-primary-foreground/80">
                    Click to connect
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "absolute inset-0 rounded border-2 border-transparent transition-colors",
                  hoveredId === item.id && "border-primary"
                )}
              />
            </a>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-l from-background to-transparent opacity-0 transition-opacity group-hover:opacity-100 md:w-16"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-8 w-8 text-foreground" />
          </button>
        )}
      </div>
    </section>
  )
}
