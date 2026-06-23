"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const testimonials = [
  {
    quote: "Quiero que mi nieto reciba mi felicitación cuando yo ya no esté.",
    name: "Marichu",
    role: "Abuela de Javier",
  },
  {
    quote: "Es el regalo más bonito que he podido darle a mi hija en su bautizo.",
    name: "Ana",
    role: "Mamá de Lucía",
  },
  {
    quote: "Por fin un producto que une finanzas con emociones familiares.",
    name: "Carlos",
    role: "Padre de dos hijos",
  },
  {
    quote: "Nunca imaginé que invertir en el futuro de mis hijos fuera tan sencillo y tan emocionante.",
    name: "Beatriz",
    role: "Mamá de tres",
  },
  {
    quote: "La cápsula del tiempo es un detalle precioso. Mis nietos guardarán mis palabras para siempre.",
    name: "Fernando",
    role: "Abuelo de Sofía",
  },
  {
    quote: "El kit de bienvenida emocionó a toda la familia. La semilla del árbol Kiri ya está creciendo en casa.",
    name: "Laura",
    role: "Tía de Marco",
  },
]

export default function Testimonials() {
  const testiRef = useRef<HTMLDivElement>(null)
  const testiInView = useInView(testiRef, { once: true, amount: 0.2 })

  return (
    <section id="testimonios" className="bg-muted py-24 overflow-hidden">
      <div ref={testiRef} className="px-8 md:px-12 lg:px-20 mb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={testiInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3 text-center"
        >
          Testimonios
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={testiInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center text-balance"
        >
          Lo que dicen las familias Kiri
        </motion.h2>
      </div>

      {/* Marquee track — doubled for seamless loop */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-muted to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-muted to-transparent" />

        <div
          className="flex gap-6 w-max"
          style={{
            animation: "marquee 32s linear infinite",
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-80 flex-shrink-0 bg-background rounded-2xl p-7 border border-border flex flex-col gap-5"
            >
              <svg
                width="28"
                height="21"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0"
              >
                <path
                  d="M0 24V14.4C0 10.56 0.96 7.28 2.88 4.56C4.88 1.84 7.76 0.16 11.52 0L12.96 2.88C10.56 3.44 8.56 4.56 6.96 6.24C5.44 7.84 4.64 9.6 4.56 11.52H9.6V24H0ZM19.2 24V14.4C19.2 10.56 20.16 7.28 22.08 4.56C24.08 1.84 26.96 0.16 30.72 0L32 2.88C29.6 3.44 27.6 4.56 26 6.24C24.48 7.84 23.68 9.6 23.6 11.52H28.64V24H19.2Z"
                  fill="hsl(272 65% 48%)"
                  fillOpacity="0.25"
                />
              </svg>
              <p className="text-foreground text-base leading-relaxed font-serif italic flex-1">{`"${t.quote}"`}</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
