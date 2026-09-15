"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AboutFocusArea } from "@/types/portfolio"

interface FocusAreasProps {
  focusAreas: AboutFocusArea[]
  basePath?: string
}

const areaLayouts = [
  "md:col-span-6 md:col-start-1",
  "md:col-span-5 md:col-start-7",
  "md:col-span-6 md:col-start-2 md:-mt-6",
  "md:col-span-5 md:col-start-8 md:-mt-10",
]

export function FocusAreas({ focusAreas, basePath = "" }: FocusAreasProps) {
  return (
    <section className="relative overflow-hidden border-b border-border px-4 py-20 md:px-12 md:py-28 lg:px-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 top-10 select-none whitespace-nowrap font-mono text-[26vw] font-bold leading-none tracking-tighter text-foreground/[0.03] md:-left-12 md:text-[18vw]"
      >
        WORK
      </span>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-14 max-w-2xl md:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary md:text-sm">
            01 · What I work on
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Four core lanes.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            The methods I reach for most, and the tools that carry them.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-12">
          {focusAreas.map((area, index) => (
            <div
              key={area.id}
              className={`border border-border bg-card/40 p-6 transition-colors duration-300 hover:border-primary/60 md:p-8 ${
                areaLayouts[index % areaLayouts.length]
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="mt-8 text-2xl font-bold tracking-tight md:mt-12 md:text-3xl">
                {area.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {area.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-baseline gap-2.5 text-sm text-secondary-foreground/80 md:text-base"
                  >
                    <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>Every capability is cross-referenced in the interactive Skills index.</span>
          <Link
            href={`${basePath}#skills`}
            className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary/80"
          >
            Explore Skills
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}