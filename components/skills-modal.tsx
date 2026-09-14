"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Project, Skill } from "@/types/portfolio"

interface SkillsModalProps {
  skill: Skill | null
  projects: Project[]
  isOpen: boolean
  onClose: () => void
  onProjectClick: (project: Project) => void
}

export function SkillsModal({
  skill,
  projects,
  isOpen,
  onClose,
  onProjectClick,
}: SkillsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !skill) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 pt-8 pb-8 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative mx-4 mb-8 w-full max-w-2xl animate-in overflow-hidden rounded-lg bg-card shadow-2xl fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground transition-colors hover:bg-card"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="border-b border-border p-6">
          <span className="mb-2 inline-block rounded bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
            {skill.category}
          </span>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            {skill.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {projects.length > 0
              ? `${projects.length} ${
                  projects.length === 1 ? "project" : "projects"
                } using ${skill.name}`
              : "No projects mapped to this skill yet"}
          </p>
        </div>

        {/* Project list */}
        <div className="space-y-3 p-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onProjectClick(project)}
                className={cn(
                  "group flex w-full cursor-pointer items-center gap-4 rounded-lg border border-border bg-background p-3 text-left",
                  "transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                )}
              >
                <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded bg-secondary">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {project.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {project.maturityRating} · {project.year}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </button>
            ))
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No projects are currently tagged with {skill.name}. Mapping tags
              on a project will surface it here.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}