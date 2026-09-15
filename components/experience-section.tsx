"use client"

import { AboutExperience } from "@/types/portfolio"

interface ExperienceSectionProps {
  experience: AboutExperience[]
}

const kindLabels: Record<string, string> = {
  work: "Work",
  study: "Study & Research",
  independent: "Independent",
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border px-4 py-20 md:px-12 md:py-28 lg:px-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 bottom-10 select-none whitespace-nowrap font-mono text-[26vw] font-bold leading-none tracking-tighter text-foreground/[0.03] md:-left-12 md:text-[18vw]"
      >
        WORK
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary md:text-sm">
            03 · Experience
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Where I&apos;ve sharpened it.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Context around the work, rather than every resume bullet.
          </p>
        </div>

        <div>
          {experience.map((entry) => (
            <div
              key={entry.id}
              className="grid gap-4 border-t border-border py-8 md:grid-cols-12"
            >
              <div className="md:col-span-5">
                <span className="inline-block rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  {kindLabels[entry.kind ?? ""] ?? "Work"}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight md:text-2xl">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[entry.org, entry.period].filter(Boolean).join(" · ")}
                </p>
              </div>
              <div className="max-w-xl md:col-span-7 md:pt-2">
                {entry.highlights ? (
                  <ul className="space-y-4">
                    {entry.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-baseline gap-3 text-sm leading-relaxed text-secondary-foreground/80 md:text-base"
                      >
                        <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : entry.summary ? (
                  <p className="text-sm leading-relaxed text-secondary-foreground/80 md:text-base">
                    {entry.summary}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}