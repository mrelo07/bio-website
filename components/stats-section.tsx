"use client"

import { motion } from "framer-motion"
import { Eye, Heart, Users } from "lucide-react"

interface Stat {
  label: string
  value: string
  icon: React.ReactNode
}

const stats: Stat[] = [
  { label: "Views", value: "12.4K", icon: <Eye className="h-4 w-4" /> },
  { label: "Likes", value: "3.2K", icon: <Heart className="h-4 w-4" /> },
  { label: "Followers", value: "8.7K", icon: <Users className="h-4 w-4" /> },
]

export function StatsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="flex items-center gap-6"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 text-neon">
            {stat.icon}
            <span className="text-sm font-semibold text-foreground">
              {stat.value}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </motion.div>
  )
}
