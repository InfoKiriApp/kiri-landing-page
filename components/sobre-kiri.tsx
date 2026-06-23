"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const cards = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caja%20fuerte.png-KWkI1I5hyeqCj0c8MYzLpCBkYKF3eS.jpeg",
    title: "Abre una cuenta Kiri",
    description:
      "Abre una cuenta de ahorro e inversión para tus seres queridos de 0 a 18 años en nuestro banco colaborador MyInvestor.",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/birthdaycake-n6oxf54DqmB0hQYExRSiNKWbYP40xw.png",
    title: "Regala en sus ocasiones especiales",
    description:
      "En su cumpleaños, bautizo, primera comunión, confirmación, vuelta al colegio, comienza a contribuir para garantizarles un futuro financiero mejor.",
  },
  {
    image: "/images/reloj-de-arena-rosa.png",
    title: "Invierte en su futuro",
    description:
      "Los menores podrán establecer metas de ahorro y a los 18 años podrán disponer de la inversión y sus rendimientos.",
  },
]

export default function SobreKiri() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="sobre" className="bg-background py-24 px-4 md:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Sobre Kiri
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            El regalo que crece con ellos
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-6 p-8 rounded-3xl border border-border bg-background hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-28 h-28 rounded-2xl bg-primary/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={112}
                  height={112}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3 leading-snug text-balance">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
