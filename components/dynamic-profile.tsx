"use client"

import { motion } from "framer-motion"
import { Copy, Check, ExternalLink, User as UserIcon } from "lucide-react"
import { useState } from "react"
import {
  Github,
  Gamepad2,
  Globe,
  Mail,
  Twitter,
  Instagram,
  Music,
  Youtube,
  Twitch,
} from "lucide-react"

interface Profile {
  username: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  discord_tag: string | null
}

interface SocialLink {
  id: string
  label: string
  url: string
  icon: string
}

interface DynamicProfileProps {
  profile: Profile
  socialLinks: SocialLink[]
}

const ICON_MAP: Record<string, React.ReactNode> = {
  discord: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  ),
  github: <Github className="h-5 w-5" />,
  steam: <Gamepad2 className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  tiktok: <Music className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  twitch: <Twitch className="h-5 w-5" />,
  website: <Globe className="h-5 w-5" />,
  email: <Mail className="h-5 w-5" />,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export function DynamicProfile({ profile, socialLinks }: DynamicProfileProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!profile.discord_tag) return
    await navigator.clipboard.writeText(profile.discord_tag)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-neon/30 bg-secondary shadow-[0_0_20px_hsla(270,70%,65%,0.3)]">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={`${profile.display_name || profile.username}'s avatar`}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-1 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            {profile.display_name || profile.username}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            @{profile.username}
          </motion.p>

          {profile.bio && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-2 max-w-xs text-sm leading-relaxed text-secondary-foreground"
            >
              {profile.bio}
            </motion.p>
          )}

          {profile.discord_tag && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={handleCopy}
              className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-neon/40 hover:text-foreground hover:shadow-[0_0_12px_hsla(270,70%,65%,0.15)]"
              aria-label={`Copy Discord tag: ${profile.discord_tag}`}
            >
              {ICON_MAP.discord}
              <span>{profile.discord_tag}</span>
              {copied ? (
                <Check className="h-3 w-3 text-emerald-400" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex w-full max-w-sm flex-col gap-3"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-card/60 px-5 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-neon/40 hover:bg-secondary/80 hover:shadow-[0_0_20px_hsla(270,70%,65%,0.12)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,hsla(270,70%,65%,0.05),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors duration-300 group-hover:bg-neon/10 group-hover:text-neon">
                {ICON_MAP[link.icon] || ICON_MAP.website}
              </span>
              <span className="relative z-10 flex-1 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-foreground">
                {link.label}
              </span>
              <ExternalLink
                className="relative z-10 h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-neon"
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </motion.div>
      )}

      {/* Footer */}
      <p className="mt-4 text-xs text-muted-foreground/50">
        {"built with "}
        <span className="text-neon/60">{"<3"}</span>
      </p>
    </div>
  )
}
