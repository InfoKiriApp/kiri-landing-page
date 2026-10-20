import Image from "next/image"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import FadeIn from "./fade-in"
import { applyUrlFor } from "@/lib/careers"

export default function CareersHero() {
  return (
    <section className="px-6 pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <FadeIn className="flex flex-col gap-6">
          <span className="inline-flex self-start items-center gap-2 rounded-full bg-kiri-lilac/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-kiri-purple">
            Prácticas · Madrid / remoto
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-kiri-ink text-balance">
            Ayúdanos a que la próxima generación no solo ahorre, sino que{" "}
            <span className="text-kiri-purple">invierta</span>
          </h1>
          <p className="text-lg leading-relaxed text-kiri-ink/70 text-pretty max-w-xl">
            Buscamos becarios/as con ganas de construir una fintech desde dentro,
            trabajando directamente con su fundadora.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#puestos"
              className="inline-flex items-center gap-2 rounded-full bg-kiri-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2"
            >
              Ver puestos
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={applyUrlFor()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-kiri-purple/30 px-6 py-3 text-sm font-semibold text-kiri-purple transition-colors hover:bg-kiri-lilac/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2"
            >
              Aplicar ahora
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative aspect-square max-w-md mx-auto w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-kiri-blush via-kiri-lilac to-kiri-lilac shadow-sm">
            <Image
              src="/images/kiri-tree-full.png"
              alt="El árbol de Kiri, símbolo de un futuro que crece con ellos"
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-contain p-10"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
