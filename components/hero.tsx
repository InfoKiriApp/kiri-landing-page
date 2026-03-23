"use client"
import Image from "next/image"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import Header from "./header"

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
        {/* Purple overlay for brand tone */}
        <div className="absolute inset-0 bg-purple-900/40" />
        <div className="absolute inset-0 flex items-center justify-start z-10">
          <div className="text-left text-white max-w-3xl px-8 md:px-16">
            <p className="text-sm uppercase tracking-[0.2em] mb-4 text-purple-200 font-medium">
              Cuenta de inversión para niños
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
              La cuenta que les asegura un futuro mejor
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-white/80 max-w-xl">
              Regala una cuenta Kiri. Invierte en su futuro. Los niños podrán ver crecer sus ahorros, como el árbol más rápido del planeta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
