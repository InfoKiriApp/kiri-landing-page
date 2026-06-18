"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Wallet, Gift, Sparkles } from "lucide-react"
import { motion, useInView } from "framer-motion"

const slides = [
  {
    icon: Wallet,
    number: "01",
    title: "Abre una cuenta Kiri",
    description:
      "Abre una cuenta de ahorro e inversión para tus seres queridos de 0 a 18 años en nuestro banco colaborador MyInvestor.",
    extra:
      "Rellenando tus datos como tutor (Papá o Mamá), comienza la experiencia Kiri de tus niños en esta misma página.",
    cta: { label: "Abre tu cuenta", href: "https://myinvestor.es" },
    image: "/images/comofunciona1.svg",
  },
  {
    icon: Gift,
    number: "02",
    title: "Regala en sus ocasiones especiales",
    bullets: [
      "Abre su cuenta Kiri con nuestro banco colaborador",
      "Kiri es Agente Financiero del banco MyInvestor",
      "Tus ahorros con nosotros están garantizados por el Fondo de Garantías de Depósitos español",
      "Vamos a necesitar tus datos, como tutor (Papá o Mamá) y los del niño",
      "Una vez abierta la cuenta, tú y todos los familiares del niño podrán contribuir a su cuenta Kiri",
    ],
    image: "/images/comofunciona2.svg",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Comienza la experiencia Kiri",
    description: "Los menores podrán establecer metas de ahorro y a los 18 años podrán disponer de la inversión y sus rendimientos.",
    extra:
      "El niño recibirá un kit de bienvenida con un montón de sorpresas, entre las que encontrará semillas para cosechar un futuro mejor, un álbum de recuerdos para rememorar ocasiones especiales, y a todos los personajes de Kiri que le explicarán conceptos básicos de una forma alegre y divertida.",
    image: "/images/comofunciona3.svg",
  },
]

const experienceItems = [
  {
    title: "Tarjeta Regalo",
    description:
      "Todos los familiares del niño podrán contribuir a su cuenta Kiri, incrementando su inversión y aportando a metas de ahorro concretas. Además, podrán dejar sus mensajes, videos y fotos, para que el niño guarde todas las memorias en la cápsula del tiempo de Kiri.",
    image: "/images/gift-card-kiri.png",
    color: "bg-purple-50 border-purple-200",
    imgBg: "bg-purple-100",
  },
  {
    title: "Álbum de los Deseos",
    description:
      "En el Álbum el menor podrá guardar todas las Tarjetas Regalo con los deseos de sus seres queridos. En su colección podrá acceder a cada mensaje mediante el código QR de las Tarjetas Regalo.",
    image: "/images/album-deseos-kiri.png",
    color: "bg-violet-50 border-violet-200",
    imgBg: "bg-violet-100",
  },
  {
    title: "Kit de Bienvenida",
    description:
      "Kiri enviará un kit de bienvenida con una semilla del árbol Kiri para plantar y una historia divertida, adaptada a su edad, que explicará las ventajas de la inversión en etapas tempranas.",
    image: "/images/ninos-cuidando-plantas.png",
    color: "bg-fuchsia-50 border-fuchsia-200",
    imgBg: "bg-fuchsia-100",
  },
  {
    title: "Acceso KiriApp",
    description:
      "Se dará acceso al niño y a sus papás a su usuario en la App donde podrán ver el estado de sus inversiones. Además, allí estarán todos los mensajes de vídeo, voz o texto que dejaron sus seres queridos.",
    image: "/images/iphone-kiri-app-square.png",
    color: "bg-purple-50 border-purple-200",
    imgBg: "bg-purple-100",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="text-center mb-14"
    >
      <motion.p variants={fadeUp} custom={0} className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
        {label}
      </motion.p>
      <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
        {title}
      </motion.h2>
    </motion.div>
  )
}

export default function Featured() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const slideRef = useRef<HTMLDivElement>(null)
  const slideInView = useInView(slideRef, { once: true, amount: 0.2 })

  const expRef = useRef<HTMLDivElement>(null)
  const expInView = useInView(expRef, { once: true, amount: 0.15 })

  return (
    <section className="bg-background">
      {/* Cómo funciona — card slideshow */}
      <div id="como-funciona" className="bg-muted py-24 px-4 md:px-8 lg:px-12">
        <SectionHeader label="Cómo funciona" title="Tres pasos para garantizar su futuro" />

        <motion.div
          ref={slideRef}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={slideInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-hidden w-full">
              <div
                className="flex w-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.number} className="min-w-0 w-full flex-shrink-0 flex flex-col md:flex-row">
                    {/* Illustration panel */}
                    <div className="flex-shrink-0 bg-primary/5 flex items-center justify-center p-10 md:w-72 lg:w-80">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={220}
                        height={220}
                        className="object-contain w-44 h-44 md:w-52 md:h-52 drop-shadow-md"
                      />
                    </div>

                    {/* Text panel */}
                    <div className="flex flex-col justify-center gap-4 p-8 md:p-10 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">
                          {slide.number}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <slide.icon className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
                        {slide.title}
                      </h3>

                      {/* Primary description */}
                      {"description" in slide && slide.description && (
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {slide.description}
                        </p>
                      )}

                      {/* Bullet list (slide 2) */}
                      {"bullets" in slide && slide.bullets && (
                        <ul className="flex flex-col gap-2">
                          {slide.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Extra text */}
                      {"extra" in slide && slide.extra && (
                        <p className="text-muted-foreground leading-relaxed text-sm border-t border-border pt-3">
                          {slide.extra}
                        </p>
                      )}

                      {/* CTA button (slide 1) */}
                      {"cta" in slide && slide.cta && (
                        <a
                          href={slide.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center justify-center self-start bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          {slide.cta.label}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card footer: arrows + dots */}
            <div className="flex items-center justify-between px-8 py-5 border-t border-border bg-background">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Diapositiva anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2.5">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      index === currentSlide
                        ? "bg-primary w-8"
                        : "w-2 bg-primary/25 hover:bg-primary/50"
                    }`}
                    aria-label={`Ir al paso ${index + 1}: ${slide.title}`}
                    aria-current={index === currentSlide ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                onClick={() => { nextSlide(); setIsAutoPlaying(false) }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Siguiente diapositiva"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Kiri Experience */}
      <div id="experiencia" className="px-8 md:px-12 lg:px-20 py-24 bg-muted">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="La experiencia Kiri"
            title="Mucho más que una cuenta de inversión"
          />
          <motion.p
            ref={expRef}
            initial={{ opacity: 0, y: 20 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-center max-w-2xl mx-auto -mt-8 mb-16 leading-relaxed"
          >
            Cada Kiri viene con una experiencia completa que une finanzas, emociones y recuerdos familiares para toda la vida.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {experienceItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 36 }}
                animate={expInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl p-8 border ${item.color} flex gap-6`}
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${item.imgBg} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
