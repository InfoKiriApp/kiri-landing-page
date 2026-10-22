import Link from "next/link"
import { TrendingDown } from "lucide-react"
import CostCard from "@/components/indexa/cost-card"
import { RISK_POINTS, RISK_TITLE } from "@/lib/indexa"

export default function RiskAndCosts() {
  return (
    <section
      id="riesgos-y-costes"
      aria-labelledby="riesgos-title"
      className="scroll-mt-24 bg-muted/40 px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Riesgos y costes</p>
          <h2 id="riesgos-title" className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl">
            {RISK_TITLE}
          </h2>
          <ul className="flex flex-col gap-3">
            {RISK_POINTS.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-foreground/80">
                <TrendingDown className="mt-1 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/kiri-academy/fondos-de-inversion-indexados#riesgo"
            className="w-fit rounded-sm text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Cómo funciona una cartera de fondos indexados para un menor
          </Link>
        </div>

        <div id="costes" className="scroll-mt-24">
          <CostCard />
        </div>
      </div>
    </section>
  )
}
