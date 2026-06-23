"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function Footer() {
  const miRef = useRef<HTMLDivElement>(null)
  const miInView = useInView(miRef, { once: true, amount: 0.2 })
  return (
    <>
      {/* MyInvestor Info */}
      <section className="bg-background px-8 md:px-12 lg:px-20 py-16 md:py-20 border-t border-border">
        <div ref={miRef} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={miInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Image
              src="/images/agente-de-my-investor.png"
              alt="Agente de MyInvestor"
              width={240}
              height={60}
              className="h-10 w-auto object-contain"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={miInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-widest text-primary">
                Sobre MyInvestor
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                MyInvestor es un banco experto en inversión. Está respaldado por el Grupo Andbank, El Corte Inglés Seguros, AXA España y varios &ldquo;family office&rdquo;.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={miInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
            >
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-widest text-primary">
                Seguridad y Regulación
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                MyInvestor Banco S.A. es una entidad de crédito supervisada por el Banco de España y la CNMV. Tus ahorros con nosotros están garantizados por el Fondo de Garantía de Depósitos Español.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky footer */}
      <div
        className="relative h-[400px] sm:h-[600px] lg:h-[800px] max-h-[800px]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative h-[calc(100vh+400px)] sm:h-[calc(100vh+600px)] lg:h-[calc(100vh+800px)] -top-[100vh]">
          <div className="h-[400px] sm:h-[600px] lg:h-[800px] sticky top-[calc(100vh-400px)] sm:top-[calc(100vh-600px)] lg:top-[calc(100vh-800px)]">
            <div
              className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 h-full w-full flex flex-col justify-between"
              style={{ backgroundColor: "hsl(272 75% 12%)" }}
            >
              <div className="flex shrink-0 gap-8 sm:gap-12 lg:gap-20">
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3 className="mb-1 sm:mb-2 uppercase text-purple-400 text-xs sm:text-sm tracking-widest font-semibold">
                    Kiri
                  </h3>
                  <Link
                    href="/#sobre"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Sobre nosotros
                  </Link>
                  <Link
                    href="/#como-funciona"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Cómo funciona
                  </Link>
                  <Link
                    href="/#experiencia-kiri"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Experiencia Kiri
                  </Link>
                  <Link
                    href="/regala-kiri"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Regala Kiri
                  </Link>
                  <Link
                    href="/#testimonios"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Testimonios
                  </Link>
                  <Link
                    href="/kiri-en-los-medios"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Kiri en los Medios
                  </Link>
                </div>
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3 className="mb-1 sm:mb-2 uppercase text-purple-400 text-xs sm:text-sm tracking-widest font-semibold">
                    Legal
                  </h3>
                  <Link
                    href="#"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Privacidad
                  </Link>
                  <Link
                    href="#"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Términos
                  </Link>
                  <a
                    href="mailto:info@kiriapp.com"
                    className="text-purple-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Contacto
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 lg:gap-12">
                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                  <Image
                    src="/images/kiri-logo.svg"
                    alt="Kiri"
                    width={280}
                    height={176}
                    className="brightness-0 invert w-32 sm:w-40 lg:w-56 h-auto"
                  />
                  <div className="w-px h-20 sm:h-24 lg:h-32 bg-white/20" />
                  <Image
                    src="/images/agente-de-my-investor.png"
                    alt="Agente de MyInvestor"
                    width={320}
                    height={80}
                    className="brightness-0 invert h-12 sm:h-16 lg:h-20 w-auto object-contain"
                  />
                </div>
                <p className="text-purple-400 text-xs sm:text-sm">© {new Date().getFullYear()} Kiri. Agente Financiero de MyInvestor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
