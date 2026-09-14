import type { Project, Skill } from "@/types/portfolio"

export function getUniqueProjects(projects: Project[]): Project[] {
  const seen = new Set<string>()
  return projects.filter((project) => {
    if (seen.has(project.id)) return false
    seen.add(project.id)
    return true
  })
}

export function getProjectsForSkill(
  skillName: string,
  projects: Project[]
): Project[] {
  const name = skillName.toLowerCase()
  return projects.filter((project) =>
    project.tags.some((tag) => tag.toLowerCase() === name)
  )
}

export function isSkillTag(tag: string, skills: Skill[]): boolean {
  const value = tag.toLowerCase()
  return skills.some((skill) => skill.name.toLowerCase() === value)
}

export function findSkillByName(
  skillName: string,
  skills: Skill[]
): Skill | undefined {
  const value = skillName.toLowerCase()
  return skills.find((skill) => skill.name.toLowerCase() === value)
}