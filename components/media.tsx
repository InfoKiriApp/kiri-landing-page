"use client"

import Image from "next/image"
import { Play, Mic } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

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

export default function Media() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="medios" className="bg-background px-8 md:px-12 lg:px-20 py-24">
      <div className="max-w-6xl mx-auto" ref={ref}>
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
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 text-center text-balance"
        >
          Kiri en los Medios
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Founder column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center lg:items-start gap-6"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/20 flex-shrink-0">
              <Image
                src="/images/marta-echarri.png"
                alt="Marta Echarri, fundadora de Kiri"
                width={256}
                height={256}
                className="object-cover w-64 h-64"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="font-serif text-2xl font-bold text-foreground">Marta Echarri</p>
              <p className="text-primary font-medium mt-1">Fundadora</p>
              <p className="text-muted-foreground mt-3 leading-relaxed max-w-sm">
                Emprendedora especializada en finanzas e impacto social. Creó Kiri para democratizar la inversión infantil y construir futuros financieros desde el primer día de vida.
              </p>
            </div>
          </motion.div>

          {/* Media items column */}
          <div className="flex flex-col gap-4">
            {mediaItems.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-muted rounded-2xl px-6 py-5 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  {item.type === "video" ? (
                    <Play className="w-5 h-5 text-primary fill-primary/40" />
                  ) : (
                    <Mic className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm leading-snug mb-1 text-balance">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">Fuente: {item.source}</p>
                </div>
                <span className="flex-shrink-0 text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
