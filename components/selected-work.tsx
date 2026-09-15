"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/types/portfolio"

interface SelectedWorkProps {
  projects: Project[]
  basePath?: string
}

export function SelectedWork({ projects, basePath = "" }: SelectedWorkProps) {
  return (
    <section className="relative overflow-hidden border-b border-border px-4 py-20 md:px-12 md:py-28 lg:px-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 bottom-10 select-none whitespace-nowrap font-mono text-[28vw] font-bold leading-none tracking-tighter text-foreground/[0.03] md:-right-8 md:text-[18vw]"
      >
        PROOF
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary md:text-sm">
            04 · Selected work
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Proof, not promises.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A few studies that show how I approach real problems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`${basePath}#projects`}
              className="group relative block overflow-hidden rounded bg-secondary"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                      {project.maturityRating}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold tracking-tight md:text-lg">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <span>The full archive lives on the portfolio.</span>
          <Link
            href={`${basePath}#projects`}
            className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary/80"
          >
            See all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}