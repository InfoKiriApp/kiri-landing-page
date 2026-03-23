"use client"

import Image from "next/image"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import Header from "./header"
import PiggyBank from "./piggy-bank"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"])

  return (
    <div ref={container} className="h-screen overflow-hidden">
      <Header />
      <motion.div style={{ y }} className="relative h-full">
        <Image
          src="/images/kiri-hero.jpg"
          fill
          alt="Árbol Kiri en flor — el árbol que más rápido crece del planeta"
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-purple-900/50" />

        <div className="absolute inset-0 flex items-center z-10 px-8 md:px-16">
          {/* Left: text */}
          <motion.div
            className="flex-1 text-white max-w-xl"
            initial="hidden"
            animate="visible"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.2em] mb-4 text-purple-200 font-medium"
            >
              Cuenta de inversión para niños
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance"
            >
              La cuenta que les asegura un futuro mejor
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-base md:text-lg leading-relaxed mb-8 text-white/80 max-w-lg"
            >
              Regala una cuenta Kiri. Invierte en su futuro. Los niños podrán ver crecer sus ahorros, como el árbol más rápido del planeta.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#reserva"
                className="px-7 py-3 bg-white text-primary font-semibold text-sm rounded-full hover:bg-purple-100 transition-colors duration-300 text-center"
              >
                Abre tu cuenta
              </a>
              <a
                href="#sobre"
                className="px-7 py-3 border-2 border-white/60 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors duration-300 text-center"
              >
                Descubre más
              </a>
            </motion.div>
          </motion.div>

          {/* Right: piggy bank */}
          <motion.div
            className="hidden lg:flex flex-1 items-center justify-center h-full"
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <PiggyBank />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
