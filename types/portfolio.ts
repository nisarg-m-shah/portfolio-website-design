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

export interface Blog {
  id: string
  title: string
  description: string
  thumbnail: string
  previewVideo: string
  tags: string[]
  year: string
  duration: string
  maturityRating: string
  url: string
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
  blogs: Blog[]
  connect: ConnectItem[]
}
