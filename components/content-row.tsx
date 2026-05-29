"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentItem {
  id: string
  title: string
  thumbnail: string
  previewVideo?: string
}

interface ContentRowProps<T extends ContentItem> {
  title: string
  items: T[]
  onItemClick: (item: T) => void
}

export function ContentRow<T extends ContentItem>({
  title,
  items,
  onItemClick,
}: ContentRowProps<T>) {
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
      {/* Row title */}
      <h2 className="mb-2 px-4 text-lg font-semibold text-foreground md:px-12 md:text-xl lg:px-16">
        {title}
      </h2>

      {/* Scroll container */}
      <div className="group relative">
        {/* Left arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-r from-background to-transparent opacity-0 transition-opacity group-hover:opacity-100 md:w-16"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-8 w-8 text-foreground" />
          </button>
        )}

        {/* Items container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="hide-scrollbar flex gap-2 overflow-x-auto px-4 md:px-12 lg:px-16"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group/card relative flex-shrink-0 cursor-pointer overflow-hidden rounded transition-all duration-300",
                "w-[140px] md:w-[180px] lg:w-[220px]",
                hoveredId === item.id && "z-10 scale-110 shadow-2xl"
              )}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onItemClick(item)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                  sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 220px"
                />

                {/* Hover overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/50 to-transparent p-3 opacity-0 transition-opacity duration-300",
                    hoveredId === item.id && "opacity-100"
                  )}
                >
                  {/* Play button */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110">
                      <Play className="h-5 w-5 fill-current" />
                    </div>
                  </div>

                  {/* Title */}
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                </div>
              </div>

              {/* Border on hover */}
              <div
                className={cn(
                  "absolute inset-0 rounded border-2 border-transparent transition-colors",
                  hoveredId === item.id && "border-foreground"
                )}
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
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
