import { ArrowRight, ArrowUpRight } from "lucide-react"
import FadeIn from "./fade-in"
import { ApplyButton } from "./application/provider"
import { FOUNDER_LINKS } from "@/lib/careers"

const PREP_LINKS = [
  {
    label: "Podcast con Pedro Buerbaum",
    note: "desde el minuto 53:30",
    href: "https://www.youtube.com/watch?v=5p368IbLs_E",
  },
  {
    label: "Entrevista en First Movers",
    note: "Capital Radio",
    href: "https://www.capitalradio.es/audio/ONDEMAND_MERCADO_ABIERTO_FIRST-MOVERS-KIRI-2502/138017033",
  },
  { label: "Charla TEDx de Marta", note: "TEDxU Comillas", href: FOUNDER_LINKS.tedx },
]

const BY_ROLE = [
  { role: "Tech", text: "Tu GitHub o portfolio y las tecnologías que dominas." },
  { role: "Operaciones", text: "Tu experiencia previa y cómo conseguirías 100 familias para Kiri en un mes." },
  { role: "Marketing", text: "Tu portfolio o perfil de redes y un post de Instagram de dos líneas para Regala Kiri." },
]

const STEPS = [
  { title: "Aplicas", text: "5–10 min" },
  { title: "Revisamos tu candidatura", text: "Leemos cada solicitud con calma." },
  { title: "Entrevista con Marta", text: "Una conversación para conocernos." },
  { title: "Bienvenida", text: "Tu primera semana con onboarding, accesos y tu primera Kiri Weekly." },
]

export function Prepare() {
  return (
    <section className="px-6 py-20 bg-kiri-lilac/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <FadeIn className="flex max-w-2xl flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">Llega preparado/a</p>
          <h2 className="font-serif text-3xl font-bold text-kiri-ink text-balance md:text-4xl">Qué te preguntaremos</h2>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col gap-5 rounded-3xl bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-kiri-ink">Para todos</h3>
              <p className="text-sm leading-relaxed text-kiri-ink/75">
                Datos de contacto, puesto, curso y universidad, disponibilidad, nivel de inglés, LinkedIn y CV en PDF.
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-kiri-ink">Antes de aplicar, escucha o lee sobre Kiri:</p>
                <ul className="flex flex-col gap-2">
                  {PREP_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-2xl bg-kiri-lilac/30 px-4 py-3 text-sm transition-colors hover:bg-kiri-lilac/60"
                      >
                        <span className="flex flex-col">
                          <span className="font-semibold text-kiri-purple">{link.label}</span>
                          <span className="text-xs text-kiri-ink/60">{link.note}</span>
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 flex-shrink-0 text-kiri-purple transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col gap-5 rounded-3xl bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-kiri-ink">Según el puesto</h3>
              <dl className="flex flex-col gap-4">
                {BY_ROLE.map((item) => (
                  <div key={item.role} className="flex flex-col gap-1 border-l-0 rounded-2xl bg-kiri-blush/40 px-4 py-3">
                    <dt className="text-sm font-semibold text-kiri-magenta">{item.role}</dt>
                    <dd className="text-sm leading-relaxed text-kiri-ink/75">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <FadeIn className="flex max-w-2xl flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">El proceso</p>
          <h2 className="font-serif text-3xl font-bold text-kiri-ink text-balance md:text-4xl">Cómo es el proceso</h2>
        </FadeIn>

        <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
          <span
            className="absolute left-5 top-5 bottom-5 w-px bg-kiri-lilac md:left-5 md:right-5 md:top-5 md:bottom-auto md:h-px md:w-auto"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <li className="relative flex gap-4 md:flex-col">
                <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kiri-purple text-sm font-bold text-white ring-4 ring-white">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1 pt-1.5 md:pt-0">
                  <h3 className="text-base font-bold text-kiri-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-kiri-ink/70">{step.text}</p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="px-6 pb-24">
      <FadeIn>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-[2rem] bg-gradient-to-br from-kiri-purple via-kiri-purple to-kiri-magenta px-6 py-16 text-center shadow-md md:py-20">
          <h2 className="font-serif text-3xl font-bold text-white text-balance md:text-5xl">
            ¿Quieres crecer con nosotros?
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/90 text-pretty">
            Raíces fuertes, crecimiento compartido e impacto duradero.
          </p>
          <ApplyButton className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-kiri-purple shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-kiri-purple">
            Aplicar ahora
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ApplyButton>
        </div>
      </FadeIn>
    </section>
  )
}
