"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Info, Volume2, VolumeX, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Profile } from "@/types/portfolio"

interface HeroSectionProps {
  profile: Profile
  onMoreInfo: () => void
}

export function HeroSection({ profile, onMoreInfo }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, that's okay
      })
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden md:h-[85vh] md:min-h-[600px]">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={profile.heroVideo}
          muted={isMuted}
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        />
        {/* Fallback image */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-5 pb-8 md:px-12 md:pb-0 lg:px-16">
        <div className="max-w-2xl space-y-3 md:space-y-4">
          {/* Title */}
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl text-foreground">
            {profile.name}
          </h1>

          {/* Metadata block */}
          <div className="flex flex-col gap-1 text-sm text-muted-foreground md:flex-row md:items-center md:gap-3">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="rounded bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
                {profile.maturityRating}
              </span>
              <span>{profile.year}</span>
            </div>
            <span className="hidden text-muted-foreground md:inline">•</span>
            <span>{profile.duration}</span>
          </div>

          {/* Tagline */}
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary py-1 pl-2.5 pr-3.5 shadow-sm shadow-primary/15 ring-1 ring-primary-foreground/10 md:gap-2.5 md:py-2 md:pl-3.5 md:pr-5 md:shadow-lg md:shadow-primary/30 md:ring-primary-foreground/20">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground md:h-4 md:w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground md:text-sm md:tracking-[0.2em]">
              {profile.tagline}
            </span>
          </div>

          {/* Description */}
          <p className="max-w-2xl text-sm text-secondary-foreground/80 leading-relaxed md:text-base">
            {profile.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 md:gap-3 md:pt-4">
            <Button
              size="lg"
              className="gap-2 bg-foreground text-background hover:bg-foreground/90 font-semibold px-5 md:px-8"
              onClick={onMoreInfo}
            >
              <Play className="h-5 w-5 fill-current" />
              View Work
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-muted/80 hover:bg-muted text-foreground font-semibold px-4 md:px-6"
              onClick={onMoreInfo}
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-28 right-4 z-20 rounded-full border border-muted-foreground/50 p-1.5 text-foreground transition-colors hover:bg-muted/50 md:bottom-32 md:right-12 md:p-2"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
        ) : (
          <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
        )}
      </button>

      {/* Age rating badge */}
      <div className="absolute bottom-16 right-4 z-20 hidden items-center gap-2 border-l-2 border-muted-foreground/50 bg-muted/50 px-3 py-1 md:bottom-32 md:right-24 md:flex">
        <span className="text-sm text-muted-foreground">{profile.maturityRating}</span>
      </div>
    </section>
  )
}
