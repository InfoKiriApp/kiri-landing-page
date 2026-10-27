import Link from "next/link"
import { ArrowRight, Receipt, TrendingDown, UserRound, UsersRound } from "lucide-react"

const GUIDE = "/kiri-academy/como-invertir-para-tus-hijos"

const FACTS = [
  {
    icon: UserRound,
    title: "El menor es el titular",
    text: "La cuenta se abre a nombre del menor. Las aportaciones de familiares no cambian por sí solas la titularidad.",
    href: `${GUIDE}#titularidad`,
    linkLabel: "Qué implica la titularidad",
  },
  {
    icon: UsersRound,
    title: "Un representante legal gestiona la cuenta",
    text: "El padre, la madre u otro representante legal completa el alta, firma la documentación y opera hasta que el menor cumple 18 años.",
    href: `${GUIDE}#mayoria-de-edad`,
    linkLabel: "Qué cambia a los 18 años",
  },
  {
    icon: TrendingDown,
    title: "La inversión tiene riesgo",
    text: "El valor de la cartera puede subir o bajar. Diversificar ayuda a gestionar el riesgo, pero no elimina las pérdidas posibles.",
    href: "#riesgos-y-costes",
    linkLabel: "Ver los riesgos",
  },
  {
    icon: Receipt,
    title: "Los costes deben poder comprobarse",
    text: "Antes de contratar puedes consultar las comisiones de gestión, custodia y fondos.",
    href: "#costes",
    linkLabel: "Ver los costes",
  },
]

const GUIDE_LINKS = [
  { href: `${GUIDE}#como-funciona`, label: "Cómo se abre la cuenta paso a paso" },
  { href: `${GUIDE}#documentacion`, label: "Qué documentación hace falta" },
  { href: `${GUIDE}#mayoria-de-edad`, label: "Qué ocurre al cumplir 18 años" },
]

export default function KeyFacts() {
  return (
    <section aria-labelledby="key-facts-title" className="bg-background px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Antes de empezar</p>
          <h2 id="key-facts-title" className="font-serif text-3xl font-bold text-foreground text-balance md:text-4xl">
            Lo esencial de una cuenta de inversión para un menor
          </h2>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <li key={fact.title} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                <fact.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-lg font-bold leading-snug text-foreground text-balance">{fact.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/75">{fact.text}</p>
              <Link
                href={fact.href}
                className="mt-auto inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {fact.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <nav aria-label="Más información en la guía para familias" className="flex flex-col gap-3 rounded-3xl bg-muted/60 p-6 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-foreground">Lo explicamos en detalle en la guía para familias:</p>
          <ul className="flex flex-col gap-2 md:flex-row md:gap-6">
            {GUIDE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
