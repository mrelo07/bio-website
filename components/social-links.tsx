"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface SocialLink {
  label: string
  url: string
  icon: React.ReactNode
}

interface SocialLinksProps {
  links: SocialLink[]
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

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex w-full max-w-sm flex-col gap-3"
    >
      {links.map((link) => (
        <motion.a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={item}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-card/60 px-5 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-neon/40 hover:bg-secondary/80 hover:shadow-[0_0_20px_hsla(185,80%,55%,0.12)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,hsla(185,80%,55%,0.05),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors duration-300 group-hover:bg-neon/10 group-hover:text-neon">
            {link.icon}
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
  )
}
