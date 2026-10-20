import Image from "next/image"
import {
  ArrowUpRight,
  Bot,
  Compass,
  HandHeart,
  Hammer,
  Sparkles,
  Sprout,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import FadeIn from "./fade-in"
import { FOUNDER_LINKS } from "@/lib/careers"

const REASONS = [
  {
    icon: TrendingUp,
    title: "Impacto real",
    text: "En España se ahorra, pero no se invierte. 50 € al mes desde que nace pueden convertirse en unos 36.000 € a los 18 años. Tu trabajo ayuda a cambiar eso.",
  },
  {
    icon: Hammer,
    title: "Construye desde dentro",
    text: "Somos un equipo pequeño. Llevarás una parte real del producto o del negocio, no tareas de relleno.",
  },
  {
    icon: Bot,
    title: "Trabaja con IA de verdad",
    text: "Usamos agentes de IA en nuestro día a día y queremos gente que lo empuje más lejos.",
  },
]

const VALUES = [
  { icon: Target, title: "Own It", text: "Te responsabilizas, cumples lo que prometes y avisas pronto." },
  { icon: Compass, title: "Make It Matter", text: "Priorizas lo que mueve a Kiri hacia delante." },
  { icon: Users, title: "Grow Together", text: "Compartes lo que aprendes y documentas para el siguiente." },
  { icon: Sprout, title: "Stay Curious", text: "Preguntas, cuestionas y usas la IA para trabajar mejor." },
  { icon: Sparkles, title: "Beyond Expected", text: "Cuidas los detalles y entregas trabajo del que te sientas orgulloso/a." },
]

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-3 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">{eyebrow}</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-kiri-ink text-balance">{title}</h2>
    </div>
  )
}

export function WhyKiri() {
  return (
    <section className="px-6 py-20 bg-kiri-lilac/30">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <FadeIn>
          <SectionHeading eyebrow="Por qué Kiri" title="Un trabajo que se nota, hoy y dentro de 18 años" />
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-3">
          {REASONS.map((reason, i) => (
            <FadeIn key={reason.title} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-4 rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-kiri-blush text-kiri-magenta">
                  <reason.icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-kiri-ink">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-kiri-ink/70">{reason.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Founder() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:items-center">
        <FadeIn>
          <div className="relative aspect-[4/5] w-full max-w-xs mx-auto overflow-hidden rounded-3xl bg-kiri-lilac">
            <Image
              src="/images/marta-echarri.png"
              alt="Marta Echarri, fundadora de Kiri"
              fill
              sizes="20rem"
              className="object-cover"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="flex flex-col gap-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">Tu día a día</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-kiri-ink text-balance">
            Trabajarás con Marta Echarri
          </h2>
          <p className="text-base leading-relaxed text-kiri-ink/75 text-pretty">
            Kiri lo ha fundado Marta Echarri, con más de 20 años en banca y fintech: ex CEO de N26
            España y Portugal, ex CEO de Western Union International Bank y unos 12 años en JP Morgan,
            además de UBS y Merrill Lynch. Speaker de TEDx y divulgadora de educación financiera.
            Trabajarás directamente con ella.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={FOUNDER_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-kiri-purple/30 px-4 py-2 text-sm font-semibold text-kiri-purple transition-colors hover:bg-kiri-lilac/40"
            >
              LinkedIn
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={FOUNDER_LINKS.tedx}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-kiri-purple/30 px-4 py-2 text-sm font-semibold text-kiri-purple transition-colors hover:bg-kiri-lilac/40"
            >
              Charla TEDx
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export function Values() {
  return (
    <section className="px-6 py-20 bg-kiri-blush/40">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <FadeIn>
          <SectionHeading eyebrow="Nuestros valores" title="Cómo trabajamos" />
        </FadeIn>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.06}>
              <li className="flex h-full flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm">
                <value.icon className="w-6 h-6 text-kiri-purple" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="text-base font-bold text-kiri-ink">{value.title}</h3>
                <p className="text-sm leading-relaxed text-kiri-ink/70">{value.text}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
        <p className="flex items-center gap-2 text-sm text-kiri-ink/60">
          <HandHeart className="w-4 h-4 text-kiri-magenta" aria-hidden="true" />
          Raíces fuertes, crecimiento compartido e impacto duradero.
        </p>
      </div>
    </section>
  )
}
