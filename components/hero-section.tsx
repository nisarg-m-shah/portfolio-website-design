"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Info, Volume2, VolumeX } from "lucide-react"
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
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
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
      <div className="relative z-10 flex h-full flex-col justify-center px-4 md:px-12 lg:px-16">
        <div className="max-w-2xl space-y-4">
          {/* Title */}
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl text-foreground">
            {profile.name}
          </h1>

          {/* Metadata row */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
              {profile.maturityRating}
            </span>
            <span>{profile.year}</span>
            <span className="text-muted-foreground">•</span>
            <span>{profile.duration}</span>
          </div>

          {/* Tagline */}
          <p className="text-lg text-muted-foreground md:text-xl">
            {profile.tagline}
          </p>

          {/* Description */}
          <p className="max-w-xl text-base text-secondary-foreground/80 leading-relaxed">
            {profile.description}
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              size="lg"
              className="gap-2 bg-foreground text-background hover:bg-foreground/90 font-semibold px-8"
              onClick={onMoreInfo}
            >
              <Play className="h-5 w-5 fill-current" />
              View Work
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-muted/80 hover:bg-muted text-foreground font-semibold px-6"
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
        className="absolute bottom-32 right-4 z-20 rounded-full border border-muted-foreground/50 p-2 text-foreground transition-colors hover:bg-muted/50 md:right-12"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>

      {/* Age rating badge */}
      <div className="absolute bottom-32 right-16 z-20 flex items-center gap-2 border-l-2 border-muted-foreground/50 bg-muted/50 px-3 py-1 md:right-24">
        <span className="text-sm text-muted-foreground">{profile.maturityRating}</span>
      </div>
    </section>
  )
}
