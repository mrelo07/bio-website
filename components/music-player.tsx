"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useCallback } from "react"

const YOUTUBE_VIDEO_ID = "fjGG9-4pYU0"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerReady = useRef(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const createPlayer = useCallback(() => {
    if (iframeRef.current) return

    const iframe = document.createElement("iframe")
    iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&modestbranding=1&origin=${window.location.origin}`
    iframe.allow = "autoplay"
    iframe.style.position = "absolute"
    iframe.style.width = "1px"
    iframe.style.height = "1px"
    iframe.style.opacity = "0"
    iframe.style.pointerEvents = "none"
    iframe.id = "yt-music-player"

    iframe.onload = () => {
      playerReady.current = true
    }

    containerRef.current?.appendChild(iframe)
    iframeRef.current = iframe
  }, [])

  const postMessage = useCallback((action: string) => {
    if (iframeRef.current && playerReady.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: action, args: [] }),
        "*"
      )
    }
  }, [])

  const toggleMusic = () => {
    if (!iframeRef.current) {
      createPlayer()
      setIsPlaying(true)
      return
    }

    if (isPlaying) {
      postMessage("pauseVideo")
    } else {
      postMessage("playVideo")
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <div ref={containerRef} className="fixed" aria-hidden="true" />
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
    </>
  )
}
