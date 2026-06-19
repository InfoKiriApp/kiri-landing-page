"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AcademyGrid from "@/components/academy-grid"
import Image from "next/image"
import Link from "next/link"
import { Sprout } from "lucide-react"
import type { KiriCategory, AgeRange } from "@/lib/academy-articles"
import { AGE_RANGES, ADRIANA } from "@/lib/academy-articles"

const TAG_FILTERS = [
  "Todos",
  "Fundamentos",
  "Ahorro",
  "Inversión",
  "Objetivos",
  "Valores",
  "Comportamiento",
  "Metáforas",
  "Inicio",
  "Errores",
]

type KiriCat = {
  id: KiriCategory
  title: string
  subtitle: string
  description: string
  image: string
  bg: string
  accent: string
  accentBg: string
  border: string
  activeBorder: string
}

const KIRI_CATEGORIES: KiriCat[] = [
  {
    id: "raices",
    title: "Las Raíces",
    subtitle: "Los fundamentos",
    description:
      "Por qué y cuándo empezar a hablar de dinero con los hijos. Hábitos financieros desde los primeros años.",
    image: "/images/kiri-raices-categoria.png",
    bg: "bg-rose-50",
    accent: "text-rose-500",
    accentBg: "bg-rose-500",
    border: "border-rose-100",
    activeBorder: "border-rose-400 ring-2 ring-rose-300",
  },
  {
    id: "tronco",
    title: "El Tronco y las Ramas",
    subtitle: "Crecer con fuerza",
    description:
      "Activos y pasivos, interés compuesto y los pilares de una base financiera sólida que aguante el paso del tiempo.",
    image: "/images/kiri-tronco-y-ramas-categoria.png",
    bg: "bg-violet-50",
    accent: "text-violet-600",
    accentBg: "bg-violet-600",
    border: "border-violet-100",
    activeBorder: "border-violet-400 ring-2 ring-violet-300",
  },
  {
    id: "frutos",
    title: "Los Frutos",
    subtitle: "La cosecha",
    description:
      "Metas de ahorro con significado y la inversión a largo plazo para hacer realidad los sueños de los niños.",
    image: "/images/kiri-frutos-categoria.png",
    bg: "bg-amber-50",
    accent: "text-amber-600",
    accentBg: "bg-amber-500",
    border: "border-amber-100",
    activeBorder: "border-amber-400 ring-2 ring-amber-300",
  },
  {
    id: "bosque",
    title: "El Bosque",
    subtitle: "La comunidad",
    description:
      "Errores comunes en la educación financiera infantil y cómo construir una cultura de ahorro familiar.",
    image: "/images/kiri-bosque-categoria.png",
    bg: "bg-emerald-50",
    accent: "text-emerald-600",
    accentBg: "bg-emerald-600",
    border: "border-emerald-100",
    activeBorder: "border-emerald-400 ring-2 ring-emerald-300",
  },
]

export default function KiriAcademyPage() {
  const [tagFilter, setTagFilter] = useState("Todos")
  const [kiriFilter, setKiriFilter] = useState<KiriCategory | undefined>(undefined)
  const [ageFilter, setAgeFilter] = useState<AgeRange | undefined>(undefined)

  function handleTagFilter(tag: string) {
    setTagFilter(tag)
    setKiriFilter(undefined)
  }

  function handleKiriFilter(id: KiriCategory) {
    if (kiriFilter === id) {
      setKiriFilter(undefined)
      setTagFilter("Todos")
    } else {
      setKiriFilter(id)
      setTagFilter("Todos")
    }
  }

  function handleAgeFilter(age: AgeRange) {
    setAgeFilter(ageFilter === age ? undefined : age)
  }

  const activeKiri = KIRI_CATEGORIES.find((c) => c.id === kiriFilter)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-28 pb-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/15 blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground/80 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            <Sprout className="w-3.5 h-3.5" />
            Educación Financiera
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6">
            Kiri Academy
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            Guías y artículos para enseñar a tus hijos el valor del dinero, el ahorro y la inversión desde edades
            tempranas. Porque la mejor herencia que puedes dejar es la educación financiera.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Gratuito", "Para todas las edades", "Basado en evidencia"].map((tag) => (
              <span
                key={tag}
                className="bg-white/10 text-white/80 border border-white/20 px-4 py-1.5 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="bg-background px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Categorías</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Aprende como crece un Kiri
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">
              Selecciona una categoría para filtrar los artículos.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {KIRI_CATEGORIES.map((cat) => {
              const isActive = kiriFilter === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleKiriFilter(cat.id)}
                  className={`rounded-3xl border ${isActive ? cat.activeBorder : cat.border} ${cat.bg} flex flex-col overflow-hidden text-left transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                >
                  <div className="flex items-center justify-center pt-8 pb-4 px-8">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      width={120}
                      height={120}
                      className="w-28 h-28 object-contain"
                    />
                  </div>
                  <div className="px-6 pb-7 flex flex-col gap-2 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-semibold uppercase tracking-widest ${cat.accent}`}>
                        {cat.subtitle}
                      </p>
                      {isActive && (
                        <span className={`text-xs text-white font-semibold px-2 py-0.5 rounded-full ${cat.accentBg}`}>
                          Activo
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground leading-snug">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cat.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Adriana author banner */}
      <section className="bg-muted/40 border-b border-border px-6 md:px-12 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto flex items-center gap-5">
          <Image
            src={ADRIANA.avatar}
            alt={ADRIANA.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-0.5">Autora</p>
            <h3 className="font-serif text-lg font-bold text-foreground">{ADRIANA.name}</h3>
            <p className="text-sm text-primary font-semibold">{ADRIANA.role}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-2xl hidden md:block">
              {ADRIANA.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Filter bars */}
      <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-md border-b border-border px-6 md:px-12 lg:px-20">
        {/* Age filter row */}
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pt-4 pb-2 border-b border-border/50">
          <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Edad
          </span>
          <div className="flex gap-2 w-max">
            {AGE_RANGES.map((age) => (
              <button
                key={age}
                onClick={() => handleAgeFilter(age)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  ageFilter === age
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {age} anos
              </button>
            ))}
          </div>
          {ageFilter && (
            <button
              onClick={() => setAgeFilter(undefined)}
              className="flex-shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors ml-1"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Tag filter row */}
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto py-3">
          {activeKiri && (
            <span className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full text-white ${activeKiri.accentBg}`}>
              {activeKiri.title}
            </span>
          )}
          <div className="flex gap-2 w-max">
            {TAG_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => handleTagFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  !kiriFilter && tagFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article grid */}
      <AcademyGrid categoryFilter={tagFilter} kiriFilter={kiriFilter} ageFilter={ageFilter} />

      {/* CTA banner */}
      <section className="bg-primary px-6 md:px-12 lg:px-20 py-20 mx-6 md:mx-12 lg:mx-20 rounded-3xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <Sprout className="w-10 h-10 text-primary-foreground/60 mx-auto mb-5" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-5 text-balance">
            Planta la semilla hoy
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            La educación financiera empieza en casa. Abre una cuenta Kiri para tus seres queridos y dales el mejor
            regalo para su futuro.
          </p>
          <Link
            href="/regala-kiri"
            className="inline-flex bg-white text-primary font-semibold px-8 py-3.5 rounded-full text-sm hover:bg-white/90 transition-colors duration-300"
          >
            Regala Kiri
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
