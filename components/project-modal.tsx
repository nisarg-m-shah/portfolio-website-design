"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { X, Play, ExternalLink, Github, Plus, ThumbsUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Project, Blog, ConnectItem } from "@/types/portfolio"

type ModalItem = Project | Blog | ConnectItem

interface ProjectModalProps {
  item: ModalItem | null
  isOpen: boolean
  onClose: () => void
}

function isProject(item: ModalItem): item is Project {
  return 'githubUrl' in item || ('previewVideo' in item && 'maturityRating' in item && 'liveUrl' in item)
}

function isBlog(item: ModalItem): item is Blog {
  return 'url' in item && 'previewVideo' in item && 'maturityRating' in item && !('liveUrl' in item)
}

function isConnectItem(item: ModalItem): item is ConnectItem {
  return 'icon' in item && !('previewVideo' in item)
}

export function ProjectModal({ item, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

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

  useEffect(() => {
    if (isOpen && videoRef.current && item && 'previewVideo' in item && item.previewVideo) {
      videoRef.current.play().catch(() => {})
      setIsVideoPlaying(true)
    }
    return () => setIsVideoPlaying(false)
  }, [isOpen, item])

  if (!isOpen || !item) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const hasVideo = 'previewVideo' in item && item.previewVideo
  const hasTags = 'tags' in item && item.tags

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm pt-8 pb-8"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-3xl animate-in fade-in-0 zoom-in-95 duration-300",
          "mx-4 mb-8 overflow-hidden rounded-lg bg-card shadow-2xl"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground transition-colors hover:bg-card"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video/Image header */}
        <div className="relative aspect-video w-full overflow-hidden bg-secondary">
          {hasVideo ? (
            <video
              ref={videoRef}
              src={item.previewVideo}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Action buttons */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {isProject(item) && item.liveUrl && (
              <Button
                size="lg"
                className="gap-2 bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="h-5 w-5 fill-current" />
                  Live Demo
                </a>
              </Button>
            )}
            {isProject(item) && item.githubUrl && (
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                asChild
              >
                <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  Source Code
                </a>
              </Button>
            )}
            {isBlog(item) && item.url && (
              <Button
                size="lg"
                className="gap-2 bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5" />
                  Read Article
                </a>
              </Button>
            )}
            {isConnectItem(item) && item.url && (
              <Button
                size="lg"
                className="gap-2 bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5" />
                  Connect
                </a>
              </Button>
            )}
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground/50 text-foreground transition-colors hover:border-foreground">
              <Plus className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground/50 text-foreground transition-colors hover:border-foreground">
              <ThumbsUp className="h-5 w-5" />
            </button>
          </div>

          {/* Metadata */}
          {'year' in item && 'duration' in item && 'maturityRating' in item && (
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-green-500 font-semibold">New</span>
              <span className="text-muted-foreground">{item.year}</span>
              <span className="rounded border border-muted-foreground/50 px-1.5 py-0.5 text-xs text-muted-foreground">
                {item.maturityRating}
              </span>
              <span className="text-muted-foreground">{item.duration}</span>
            </div>
          )}

          {/* Description */}
          <p className="mb-6 text-base text-secondary-foreground/90 leading-relaxed">
            {item.description}
          </p>

          {/* Tags */}
          {hasTags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-muted text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* More like this section */}
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              More Details
              <ChevronDown className="h-4 w-4" />
            </h3>
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div>
                <span className="text-muted-foreground">Type:</span>{" "}
                <span className="text-foreground">
                  {isProject(item) ? "Project" : isBlog(item) ? "Blog Post" : "Social Link"}
                </span>
              </div>
              {'year' in item && (
                <div>
                  <span className="text-muted-foreground">Year:</span>{" "}
                  <span className="text-foreground">{item.year}</span>
                </div>
              )}
              {hasTags && (
                <div className="md:col-span-2">
                  <span className="text-muted-foreground">Technologies:</span>{" "}
                  <span className="text-foreground">{item.tags.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
