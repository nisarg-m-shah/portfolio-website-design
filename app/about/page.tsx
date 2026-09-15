"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { FocusAreas } from "@/components/focus-areas"
import { JourneyTimeline } from "@/components/journey-timeline"
import { ExperienceSection } from "@/components/experience-section"
import { SelectedWork } from "@/components/selected-work"
import { ExploringSection } from "@/components/exploring-section"
import { LookingFor } from "@/components/looking-for"
import portfolioData from "@/data/portfolio.json"
import { PortfolioData, Project } from "@/types/portfolio"

export default function AboutPage() {
  const data = portfolioData as PortfolioData

  const selectedIds = ["featured-3", "featured-4", "featured-5", "project-12"]
  const all = [...data.featuredProjects, ...data.allProjects]
  const selected = selectedIds
    .map((id) => all.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project))

  return (
    <main className="min-h-screen bg-background">
      <Navbar basePath="/" />
      <AboutHero profile={data.profile} about={data.about} />
      <FocusAreas focusAreas={data.about.focusAreas} basePath="/" />
      <JourneyTimeline journey={data.about.journey} />
      <ExperienceSection experience={data.about.experience} />
      <SelectedWork projects={selected} basePath="/" />
      <ExploringSection exploring={data.about.exploring} />
      <LookingFor lookingFor={data.about.lookingFor} basePath="/" />
      <Footer basePath="/" />
    </main>
  )
}