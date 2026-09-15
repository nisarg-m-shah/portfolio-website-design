"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LookingForProps {
  lookingFor: string
  basePath?: string
}

export function LookingFor({ lookingFor, basePath = "" }: LookingForProps) {
  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-12 md:py-40 lg:px-16">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-mono text-[26vw] font-bold leading-none tracking-tighter text-foreground/[0.03] md:text-[18vw]"
      >
        CONNECT
      </span>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary md:text-sm">
          06 · What I&apos;m looking for
        </p>
        <p className="mt-8 text-2xl font-semibold leading-snug tracking-tight md:text-4xl md:leading-snug">
          {lookingFor}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Link href={`${basePath}#connect`}>
              Let&apos;s Connect
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2 bg-muted/80 px-6 font-semibold text-foreground hover:bg-muted"
          >
            <Link href={`${basePath}#featured`}>Back to the portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}