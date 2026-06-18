"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function ExperienciaKiri() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="experiencia-kiri" className="bg-muted py-24 px-4 md:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
              Experiencia Kiri
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-snug">
              Mucho más que una cuenta de inversión
            </h2>
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed text-base">
              <p>
                Kiri es una cuenta de inversión para niños y adolescentes que ayuda a las familias a construir un futuro financiero con propósito.
              </p>
              <p>
                A través de un regalo inicial, padres, abuelos u otros familiares pueden iniciar una inversión a largo plazo, fomentando la educación financiera, el ahorro y el crecimiento personal. Cada cuenta incluye un kit de bienvenida y seguimiento anual, fortaleciendo el lazo emocional con quienes aportan.
              </p>
              <p>
                Queremos hacer realidad sus sueños a través de metas de ahorro con significado para los niños y sus familias.
              </p>
              <p>
                Más que un producto financiero, Kiri es una experiencia que evoluciona con el niño, enseñándole que el dinero, como un árbol, se cultiva con el tiempo y puede florecer en valor.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="/regala-kiri"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-full hover:bg-accent transition-colors duration-300 text-sm"
              >
                Regala Kiri
              </a>
            </div>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
          >
            <Image
              src="/images/regalos-kiri.png"
              alt="Regalos Kiri — tarjeta regalo con sobre y experiencias soñadas"
              width={720}
              height={520}
              className="w-full h-auto object-cover rounded-3xl"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
