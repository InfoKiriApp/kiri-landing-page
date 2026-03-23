"use client"

import Image from "next/image"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

export default function Promo() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"])

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src="/images/kiri-tree-growth.jpg"
            fill
            alt="El árbol Kiri, el que más rápido crece en el planeta"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-purple-900/60" />
        </motion.div>
      </div>

      <p className="absolute top-12 right-6 md:right-10 text-purple-200 uppercase z-10 text-sm tracking-[0.2em] font-medium">
        Kiri — El árbol más rápido del planeta
      </p>

      <div className="absolute bottom-12 left-6 md:left-10 z-10 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance"
        >
          Como el árbol Kiri, sus ahorros crecerán sanos y fuertes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-purple-200 text-base md:text-lg leading-relaxed max-w-lg mb-8"
        >
          El árbol Kiri puede alcanzar los 30 metros de altura. Queremos que los ahorros de tus hijos crezcan igual: rápido, fuerte y con raíces sólidas para toda la vida.
        </motion.p>
        <motion.a
          href="#reserva"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="inline-block px-7 py-3 bg-white text-primary rounded-full text-sm font-semibold hover:bg-purple-100 transition-colors duration-300"
        >
          Reserva tu Kiri
        </motion.a>
      </div>
    </div>
  )
}
