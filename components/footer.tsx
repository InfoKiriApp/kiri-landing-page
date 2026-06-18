"use client"

import Link from "next/link"
import Image from "next/image"
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

export default function Footer() {
  const trackRef = useRef<HTMLDivElement>(null)
  const testiRef = useRef<HTMLDivElement>(null)
  const testiInView = useInView(testiRef, { once: true, amount: 0.2 })
  const miRef = useRef<HTMLDivElement>(null)
  const miInView = useInView(miRef, { once: true, amount: 0.2 })
  return (
    <>
      {/* Testimonials */}
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
            ref={trackRef}
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
                <div className="mt-4 sm:mt-6 lg:mt-10 flex flex-col gap-4">
                  <Image
                    src="/images/kiri-logo.svg"
                    alt="Kiri"
                    width={280}
                    height={176}
                    className="brightness-0 invert w-32 sm:w-48 lg:w-64 h-auto"
                  />
                  <Image
                    src="/images/agente-de-my-investor.png"
                    alt="Agente de MyInvestor"
                    width={200}
                    height={50}
                    className="brightness-0 invert h-6 sm:h-7 w-auto object-contain opacity-70"
                  />
                </div>
                <p className="text-purple-400 text-sm sm:text-base">© {new Date().getFullYear()} Kiri. Agente Financiero de MyInvestor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
