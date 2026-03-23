"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Wallet, Gift, TrendingUp } from "lucide-react"

const slides = [
  {
    icon: Wallet,
    number: "01",
    title: "Abre una cuenta Kiri",
    description:
      "Abre una cuenta de ahorro e inversión para tus seres queridos de 0 a 18 años en nuestro banco colaborador MyInvestor",
    image: "/images/comofunciona1.svg",
  },
  {
    icon: Gift,
    number: "02",
    title: "Regala en sus ocasiones especiales",
    description:
      "En su cumpleaños, bautizo, primera comunión, confirmación, vuelta al colegio, comienza a contribuir para garantizarles un futuro financiero mejor",
    image: "/images/comofunciona2.svg",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Invierte en su futuro",
    description:
      "Los menores podrán establecer metas de ahorro y a los 18 años podrán disponer de la inversión y sus rendimientos",
    image: "/images/comofunciona3.svg",
  },
]

const experienceItems = [
  {
    title: "Tarjeta Regalo",
    description:
      "Todos los familiares del niño podrán contribuir a su cuenta Kiri, incrementando su inversión y aportando a metas de ahorro concretas. Además, podrán dejar sus mensajes, videos y fotos, para que el niño guarde todas las memorias en la cápsula del tiempo de Kiri.",
    icon: "🎁",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
  },
  {
    title: "Álbum de los Deseos",
    description:
      "En el Álbum el menor podrá guardar todas las Tarjetas Regalo con los deseos de sus seres queridos. En su colección podrá acceder a cada mensaje mediante el código QR de las Tarjetas Regalo.",
    icon: "📖",
    color: "bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100",
  },
  {
    title: "Kit de Bienvenida",
    description:
      "Kiri enviará un kit de bienvenida con una semilla del árbol Kiri para plantar y una historia divertida, adaptada a su edad, que explicará las ventajas de la inversión en etapas tempranas.",
    icon: "🌱",
    color: "bg-fuchsia-50 border-fuchsia-200",
    iconBg: "bg-fuchsia-100",
  },
  {
    title: "Acceso KiriApp",
    description:
      "Se dará acceso al niño y a sus papás a su usuario en la App donde podrán ver el estado de sus inversiones. Además, allí estarán todos los mensajes de vídeo, voz o texto que dejaron sus seres queridos.",
    icon: "📱",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
  },
]

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

  return (
    <section id="sobre" className="bg-background">
      {/* Cómo funciona — card slideshow */}
      <div id="como-funciona" className="bg-muted py-24 px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">Cómo funciona</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Tres pasos para garantizar su futuro
          </h2>
        </div>

        {/* Slide container */}
        <div className="max-w-3xl mx-auto">
          {/* Card */}
          <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.number} className="min-w-full flex flex-col md:flex-row">
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
                    <div className="flex flex-col justify-center gap-5 p-8 md:p-10 flex-1">
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
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {slide.description}
                      </p>
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
        </div>
      </div>

      {/* Kiri Experience */}
      <div className="px-8 md:px-12 lg:px-20 py-24 bg-muted">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3 text-center">
            La experiencia Kiri
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-center text-balance">
            Mucho más que una cuenta de inversión
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 leading-relaxed">
            Cada Kiri viene con una experiencia completa que une finanzas, emociones y recuerdos familiares para toda la vida.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {experienceItems.map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl p-8 border ${item.color} flex gap-6`}
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center text-2xl`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
