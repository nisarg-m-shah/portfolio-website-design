"use client"

import { AboutData, Profile } from "@/types/portfolio"

interface AboutHeroProps {
  profile: Profile
  about: AboutData
}

export function AboutHero({ profile, about }: AboutHeroProps) {
  const highlights = [
    `Currently · ${profile.duration}`,
    `Focus · ${profile.maturityRating}`,
    `Archive · ${profile.year}`,
  ]

  return (
    <section className="relative flex min-h-[78vh] flex-col justify-center overflow-hidden border-b border-border px-4 md:min-h-[88vh] md:px-12 lg:px-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-mono text-[34vw] font-bold leading-none tracking-tighter text-foreground/[0.04] md:-right-10 md:text-[24vw]"
      >
        ABOUT
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-0 select-none font-mono text-5xl font-semibold tracking-tighter text-foreground/[0.03] md:text-7xl"
      >
        NISARG
      </span>

      <div className="relative z-10 mx-auto w-full max-w-6xl py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="space-y-7 md:col-span-8">
            <p className="animate-in fade-in slide-in-from-bottom-3 font-mono text-xs uppercase tracking-[0.3em] text-primary duration-700 md:text-sm">
              They don&apos;t know you yet. That&apos;s the whole point of this page.
            </p>
            <h1 className="animate-in fade-in slide-in-from-bottom-4 text-6xl font-bold tracking-tight duration-700 md:text-8xl lg:text-9xl">
              {profile.name}
            </h1>
            <div className="animate-in fade-in slide-in-from-bottom-5 space-y-4 pt-2 duration-700">
              <div className="flex items-center gap-3 border-l-2 border-primary pl-4 pt-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:text-sm">
                  {profile.tagline}
                </span>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-secondary-foreground/80 md:text-lg">
                {about.intro}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded border border-border bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden items-end justify-end md:col-span-4 md:flex">
            <p className="rotate-180 font-mono text-xs uppercase tracking-[0.5em] text-muted-foreground/70 [writing-mode:vertical-rl]">
              Data / Systems / Journey
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}