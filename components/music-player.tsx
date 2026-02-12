"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Audio autoplay blocked
      })
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      onClick={toggleMusic}
      className="group flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 backdrop-blur-md transition-all hover:border-neon/40 hover:shadow-[0_0_12px_hsla(270,70%,65%,0.15)]"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="h-4 w-4 text-neon" />
      ) : (
        <VolumeX className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
      )}
      <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
        {isPlaying ? "Now playing" : "Music off"}
      </span>
      {isPlaying && (
        <span className="flex items-center gap-0.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="inline-block w-0.5 rounded-full bg-neon"
              animate={{
                height: [4, 12, 4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      )}
    </motion.button>
  )
}
