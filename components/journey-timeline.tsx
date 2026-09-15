"use client"

import { AboutJourneyEra } from "@/types/portfolio"

interface JourneyTimelineProps {
  journey: AboutJourneyEra[]
}

const kindLabels: Record<string, string> = {
  education: "Education",
  work: "Work",
  achievement: "Award / Cert",
  projects: "Projects",
}

const kindColors: Record<string, string> = {
  education: "text-secondary-foreground",
  work: "text-primary",
  achievement: "text-primary",
  projects: "text-secondary-foreground",
}

export function JourneyTimeline({ journey }: JourneyTimelineProps) {
  return (
    <section className="relative overflow-hidden border-b border-border px-4 py-20 md:px-12 md:py-28 lg:px-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-16 select-none whitespace-nowrap font-mono text-[30vw] font-bold leading-none tracking-tighter text-foreground/[0.03] md:-right-8 md:text-[20vw]"
      >
        JOURNEY
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl md:mb-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary md:text-sm">
            02 · My journey
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            The path so far.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Five phases, from pure mathematics to machine learning.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-primary via-border to-transparent md:left-[55px]" />

          <div className="space-y-4 md:space-y-0">
            {journey.map((era, index) => (
              <div
                key={era.id}
                className={`relative py-8 pl-10 md:py-10 md:pl-[140px] ${
                  index % 2 === 1 ? "md:pl-[190px]" : ""
                }`}
              >
                {/* Node */}
                <span className="absolute top-8 block h-[15px] w-[15px] translate-x-[-3px] rotate-45 border border-primary bg-background md:left-[48px]" />

                {/* Era */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-3xl font-bold tracking-tight md:text-5xl">
                    {era.stage}
                  </h3>
                  {era.tagline && (
                    <p className="mt-1.5 text-sm italic text-secondary-foreground/70 md:text-base">
                      {era.tagline}
                    </p>
                  )}

                  <ul className="mt-6 space-y-4">
                    {era.items.map((item) => (
                      <li key={item.id} className="flex flex-col gap-0.5 border-l border-border pl-4">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                            kindColors[item.kind ?? ""] ?? "text-secondary-foreground"
                          }`}
                        >
                          {kindLabels[item.kind ?? ""] ?? "Milestone"}
                        </span>
                        <span className="text-base font-semibold text-foreground md:text-lg">
                          {item.label}
                        </span>
                        {(item.org || item.period) && (
                          <span className="text-sm text-muted-foreground">
                            {[item.org, item.period].filter(Boolean).join(" · ")}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}