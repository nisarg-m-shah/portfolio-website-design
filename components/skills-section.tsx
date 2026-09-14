"use client"

import { Project, Skill } from "@/types/portfolio"
import { getProjectsForSkill } from "@/lib/skills"

interface SkillsSectionProps {
  skills: Skill[]
  projects: Project[]
  onSkillClick: (skill: Skill) => void
}

export function SkillsSection({
  skills,
  projects,
  onSkillClick,
}: SkillsSectionProps) {
  const displayedSkills = skills
    .map((skill) => ({ skill, count: getProjectsForSkill(skill.name, projects).length }))
    .filter(({ count }) => count > 0)

  if (displayedSkills.length === 0) return null

  const categories = Array.from(
    new Set(displayedSkills.map(({ skill }) => skill.category))
  )

  return (
    <section className="px-4 py-4 md:px-12 md:py-6 lg:px-16">
      <h2 className="mb-3 px-0 text-lg font-semibold text-foreground md:text-xl">
        Skills
      </h2>

      <div className="space-y-5">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {displayedSkills
                .filter(({ skill }) => skill.category === category)
                .map(({ skill, count }) => (
                  <button
                    key={skill.id}
                    onClick={() => onSkillClick(skill)}
                    className="group flex cursor-pointer flex-col items-start gap-1 rounded-lg border border-border bg-card p-3 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus-visible:border-primary/50 focus-visible:outline-none"
                  >
                    <span className="w-full truncate text-sm font-semibold text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {count} {count === 1 ? "project" : "projects"}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}