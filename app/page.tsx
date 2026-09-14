"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ContentRow } from "@/components/content-row"
import { ConnectRow } from "@/components/connect-row"
import { ProjectModal } from "@/components/project-modal"
import { SkillsSection } from "@/components/skills-section"
import { SkillsModal } from "@/components/skills-modal"
import { Footer } from "@/components/footer"
import portfolioData from "@/data/portfolio.json"
import { PortfolioData, Project, Achievement, ConnectItem, Skill } from "@/types/portfolio"
import { getUniqueProjects, findSkillByName, getProjectsForSkill } from "@/lib/skills"

type ModalItem = Project | Achievement | ConnectItem

export default function HomePage() {
  const data = portfolioData as PortfolioData
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)

  const allProjects = getUniqueProjects([
    ...data.featuredProjects,
    ...data.allProjects,
  ])

  const handleItemClick = (item: ModalItem) => {
    setIsSkillModalOpen(false)
    setSelectedSkill(null)
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleSkillClick = (skill: Skill) => {
    setSelectedItem(null)
    setIsModalOpen(false)
    setSelectedSkill(skill)
    setIsSkillModalOpen(true)
  }

  const handleSkillTagClick = (skillName: string) => {
    const skill = findSkillByName(skillName, data.skills)
    if (skill) handleSkillClick(skill)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedItem(null), 300)
  }

  const handleCloseSkillModal = () => {
    setIsSkillModalOpen(false)
    setTimeout(() => setSelectedSkill(null), 300)
  }

  const handleProjectFromSkill = (project: Project) => {
    setSelectedSkill(null)
    setIsSkillModalOpen(false)
    setSelectedItem(project)
    setIsModalOpen(true)
  }

  const scrollToProjects = () => {
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <HeroSection profile={data.profile} onMoreInfo={scrollToProjects} />

      {/* Content Rows */}
      <div className="-mt-20 relative z-10 space-y-2 pb-12">
        {/* Featured Projects */}
        <section id="featured">
          <ContentRow
            title="Featured Projects"
            items={data.featuredProjects}
            onItemClick={handleItemClick}
          />
        </section>

        {/* All Projects */}
        <section id="projects">
          <ContentRow
            title="All Projects"
            items={data.allProjects}
            onItemClick={handleItemClick}
          />
        </section>

        {/* Achievements & Certifications */}
        <section id="achievements">
          <ContentRow
            title="Achievements & Certifications"
            items={data.achievements}
            onItemClick={handleItemClick}
          />
        </section>

        {/* Skills */}
        <section id="skills">
          <SkillsSection
            skills={data.skills}
            projects={allProjects}
            onSkillClick={handleSkillClick}
          />
        </section>

        {/* Connect with Me */}
        <section id="connect">
          <ConnectRow
            title="Connect with Me"
            items={data.connect}
            onItemClick={handleItemClick}
          />
        </section>
      </div>

      <Footer />

      {/* Project Modal */}
      <ProjectModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        skills={data.skills}
        onSkillClick={handleSkillTagClick}
      />

      {/* Skills Modal */}
      <SkillsModal
        skill={selectedSkill}
        projects={
          selectedSkill ? getProjectsForSkill(selectedSkill.name, allProjects) : []
        }
        isOpen={isSkillModalOpen}
        onClose={handleCloseSkillModal}
        onProjectClick={handleProjectFromSkill}
      />
    </main>
  )
}
