export interface Profile {
  name: string
  tagline: string
  description: string
  heroVideo: string
  heroImage: string
  maturityRating: string
  year: string
  duration: string
}

export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  previewVideo: string
  tags: string[]
  year: string
  duration: string
  maturityRating: string
  liveUrl?: string
  githubUrl?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  thumbnail: string
  previewVideo: string
  tags: string[]
  year: string
  maturityRating: string
  issuer: string
  credentialUrl?: string
  projectUrl?: string
}

export interface Skill {
  id: string
  name: string
  category: string
}

export interface ConnectItem {
  id: string
  title: string
  description: string
  thumbnail: string
  icon: string
  url: string
}

export interface AboutFocusArea {
  id: string
  title: string
  points: string[]
}

export interface AboutJourneyItem {
  id: string
  label: string
  org?: string
  period?: string
  kind?: "education" | "work" | "achievement" | "projects"
}

export interface AboutJourneyEra {
  id: string
  stage: string
  tagline?: string
  items: AboutJourneyItem[]
}

export interface AboutExperience {
  id: string
  role: string
  org: string
  kind?: "work" | "study" | "independent"
  period?: string
  summary?: string
  highlights?: string[]
}

export interface AboutData {
  intro: string
  journey: AboutJourneyEra[]
  focusAreas: AboutFocusArea[]
  experience: AboutExperience[]
  exploring: string[]
  lookingFor: string
}

export interface PortfolioData {
  profile: Profile
  featuredProjects: Project[]
  allProjects: Project[]
  achievements: Achievement[]
  skills: Skill[]
  connect: ConnectItem[]
  about: AboutData
}
