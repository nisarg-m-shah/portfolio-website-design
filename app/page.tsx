"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ContentRow } from "@/components/content-row"
import { ConnectRow } from "@/components/connect-row"
import { ProjectModal } from "@/components/project-modal"
import { Footer } from "@/components/footer"
import portfolioData from "@/data/portfolio.json"
import { PortfolioData, Project, Blog, ConnectItem } from "@/types/portfolio"

type ModalItem = Project | Blog | ConnectItem

export default function HomePage() {
  const data = portfolioData as PortfolioData
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (item: ModalItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedItem(null), 300)
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

        {/* Blogs */}
        <section id="blogs">
          <ContentRow
            title="Blogs"
            items={data.blogs}
            onItemClick={handleItemClick}
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
      />
    </main>
  )
}
