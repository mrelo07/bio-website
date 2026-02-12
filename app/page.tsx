"use client"

import { ParticlesBackground } from "@/components/particles-background"
import { ProfileCard } from "@/components/profile-card"
import { SocialLinks } from "@/components/social-links"
import { MusicPlayer } from "@/components/music-player"
import { StatsSection } from "@/components/stats-section"
import {
  Github,
  Gamepad2,
} from "lucide-react"

const socialLinks = [
  {
    label: "Discord Server",
    url: "https://dc.bloxmc.pl",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    url: "https://github.com/mrelo07",
    icon: <Github className="h-5 w-5" />,
  },
  {
    label: "Steam",
    url: "https://steamcommunity.com/id/mrelo07",
    icon: <Gamepad2 className="h-5 w-5" />,
  },
]

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Animated gradient background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsla(185, 80%, 55%, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsla(220, 60%, 30%, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, hsla(185, 80%, 55%, 0.04) 0%, transparent 50%)",
        }}
      />

      {/* Particle canvas */}
      <ParticlesBackground />

      {/* Main content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
        {/* Music toggle */}
        <MusicPlayer />

        {/* Profile card */}
        <ProfileCard
          username="mrelo07"
          displayName="mrelo07"
          bio="Building cool things on the internet and exploring the digital frontier."
          avatarSrc="/avatar.jpg"
          discordTag="mr_elo_07"
          status="online"
        />

        {/* Stats */}
        <StatsSection />

        {/* Social links */}
        <SocialLinks links={socialLinks} />

        {/* Footer */}
        <p className="mt-4 text-xs text-muted-foreground/50">
          {"built with "}
          <span className="text-neon/60">{"<3"}</span>
        </p>
      </div>
    </main>
  )
}
