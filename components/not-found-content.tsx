"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Sprout } from "lucide-react"

export default function NotFoundContent() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative flex-1 flex items-center bg-foreground pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/15 blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground/80 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sprout className="w-3.5 h-3.5" aria-hidden="true" />
            Error 404
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-5"
          >
            Ups, te has perdido en el bosque de Kiri
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg leading-relaxed max-w-xl text-pretty mb-8"
          >
            Hemos mirado en la hucha, debajo del colchón y entre las raíces del árbol. Esta página no aparece por
            ningún lado. Ni una moneda suelta. Tranquilo: tus ahorros están a salvo, es solo la página la que se ha
            ido de paseo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold px-7 py-3.5 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              Volver al inicio
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/kiri-academy"
              className="inline-flex items-center justify-center rounded-full border border-white/25 text-white text-sm font-semibold px-7 py-3.5 hover:bg-white/10 transition-colors duration-200"
            >
              Aprender en Kiri Academy
            </Link>
          </motion.div>
        </div>

        <div className="relative flex-1 flex items-center justify-center w-full max-w-sm md:max-w-none">
          <span
            aria-hidden="true"
            className="absolute font-serif font-bold leading-none text-white/10 select-none text-[9rem] sm:text-[12rem] lg:text-[16rem]"
          >
            404
          </span>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-56 sm:w-64 lg:w-80 aspect-[5/6]"
            >
              <Image
                src="/images/piggy.png"
                alt="Cerdito hucha de Kiri con monedas, desorientado"
                fill
                priority
                sizes="(max-width: 1024px) 256px, 320px"
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -top-2 -right-2 sm:-right-8 max-w-[11rem] rounded-2xl rounded-bl-sm bg-card text-card-foreground text-sm font-semibold px-4 py-3 shadow-xl"
            >
              Oink... ¿alguien ha visto mi árbol?
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
