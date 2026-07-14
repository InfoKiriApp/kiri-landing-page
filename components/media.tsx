"use client"

import Image from "next/image"
import { Play, Mic } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const mediaItems = [
  {
    title: "Invierte en su Futuro, Hoy | Marta Echarri",
    source: "TEDxU",
    type: "video",
    label: "Ver video",
    href: "https://www.youtube.com/watch?v=oLpXg5HpUJE",
  },
  {
    title: "Entrevista Kiri en Intereconomía",
    source: "Intereconomía",
    type: "video",
    label: "Ver video",
    href: "https://www.youtube.com/watch?v=QENTNsnWSOg",
  },
  {
    title: "Entrevista First Movers con Kiri",
    source: "Capital Radio",
    type: "audio",
    label: "Escuchar entrevista",
    href: "https://www.youtube.com/watch?v=EN7jZYRfN7s",
  },
  {
    title: "Entrevista Marta Echarri en WorldCa$t con Pedro Buerbaum",
    source: "WorldCa$t",
    type: "audio",
    label: "Escuchar entrevista",
    href: "https://www.youtube.com/watch?v=LV6UMJ0wHEU",
  },
  {
    title: "Entrevista Kiri en podcast de finanzas",
    source: "YouTube",
    type: "video",
    label: "Ver video",
    href: "https://www.youtube.com/watch?v=qLQB7d26jco&t=1s",
  },
  {
    title: "Kiri en los medios — reportaje especial",
    source: "YouTube",
    type: "video",
    label: "Ver video",
    href: "https://www.youtube.com/watch?v=7J7THA-ILQQ",
  },
  {
    title: "Entrevista Marta Echarri — educación financiera",
    source: "YouTube",
    type: "video",
    label: "Ver video",
    href: "https://www.youtube.com/watch?v=c1W7r38oxPg&t=2s",
  },
]

const videoItems = mediaItems.filter(item => item.type === "video")
const audioItems = mediaItems.filter(item => item.type === "audio")

export default function Media() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="medios" className="bg-background px-8 md:px-12 lg:px-20 py-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3 text-center"
        >
          Prensa
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-center text-balance"
        >
          Kiri en los Medios
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Marta Echarri ha participado en destacados medios y plataformas para compartir su visión sobre educación financiera infantil e inversión responsable.
        </motion.p>

        {/* Videos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-8">Vídeos Destacados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {videoItems.map((item, i) => {
              const videoId = getYouTubeVideoId(item.href)
              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 md:h-48 bg-muted overflow-hidden flex items-center justify-center">
                    {videoId ? (
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to medium quality if maxres not available
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Play className="w-12 h-12 text-primary/30" />
                      </div>
                    )}
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary fill-primary ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-muted/50 p-5 flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                        {item.source}
                      </p>
                      <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-xs font-semibold mt-auto">
                      <Play className="w-3 h-3 fill-primary" />
                      Ver en YouTube
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Audio Section */}
        {audioItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.24 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-8">Podcast y Entrevistas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audioItems.map((item, i) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.06 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 bg-muted/50 rounded-2xl border border-border hover:border-primary/40 hover:bg-muted transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Mic className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                      {item.source}
                    </p>
                    <p className="font-semibold text-foreground text-sm leading-snug mb-2">
                      {item.title}
                    </p>
                    <span className="inline-flex text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {item.label}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
