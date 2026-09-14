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

export interface ConnectItem {
  id: string
  title: string
  description: string
  thumbnail: string
  icon: string
  url: string
}

export interface PortfolioData {
  profile: Profile
  featuredProjects: Project[]
  allProjects: Project[]
  achievements: Achievement[]
  connect: ConnectItem[]
}
