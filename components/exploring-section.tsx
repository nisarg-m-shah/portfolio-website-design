"use client"

import { ArrowDownRight } from "lucide-react"

interface ExploringSectionProps {
  exploring: string[]
}

export function ExploringSection({ exploring }: ExploringSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border px-4 py-20 md:px-12 md:py-28 lg:px-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-8 select-none whitespace-nowrap font-mono text-[30vw] font-bold leading-none tracking-tighter text-foreground/[0.03] md:-right-8 md:text-[18vw]"
      >
        NEXT
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary md:text-sm">
              05 · Currently exploring
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              The frontier.
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground md:mt-0">
            Directions I&apos;m actively learning and building toward — not established
            expertise yet.
          </p>
        </div>

        <ul className="md:grid md:grid-cols-2 md:gap-x-16">
          {exploring.map((item, index) => (
            <li
              key={item}
              className={`flex items-center gap-4 border-b border-border py-6 ${
                index % 2 === 1 ? "md:pt-14" : ""
              }`}
            >
              <ArrowDownRight className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-xl font-bold tracking-tight md:text-3xl">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}