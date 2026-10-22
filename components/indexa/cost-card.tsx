import { Receipt } from "lucide-react"
import IndexaLink from "@/components/indexa/indexa-link"
import { COST_INTRO, COST_NOTE, COST_ROWS, COST_TOTAL, INDEXA_CONSULTED, INDEXA_LINKS } from "@/lib/indexa"

export default function CostCard({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Receipt className="h-5 w-5 text-primary" aria-hidden="true" />
        </span>
        <Heading className="font-serif text-xl font-bold leading-snug text-foreground">
          Estos son los costes publicados por Indexa Capital
        </Heading>
      </div>
      <p className="leading-relaxed text-foreground/80">{COST_INTRO}</p>
      <dl className="flex flex-col divide-y divide-border rounded-2xl border border-border">
        {COST_ROWS.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <dt className="text-sm text-foreground/80">{row.label}</dt>
            <dd className="text-sm font-semibold tabular-nums text-foreground sm:text-right">{row.value}</dd>
          </div>
        ))}
        <div className="flex flex-col gap-1 bg-primary/5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="text-sm font-semibold text-foreground">{COST_TOTAL.label}</dt>
          <dd className="font-serif text-lg font-bold tabular-nums text-primary sm:text-right">{COST_TOTAL.value}</dd>
        </div>
      </dl>
      <p role="note" className="text-sm leading-relaxed text-foreground/75">
        {COST_NOTE}
      </p>
      <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <IndexaLink href={INDEXA_LINKS.fees}>Ver las comisiones en Indexa Capital</IndexaLink>
        <span className="text-muted-foreground">
          Datos consultados el <time dateTime={INDEXA_CONSULTED.iso}>{INDEXA_CONSULTED.label}</time>
        </span>
      </div>
    </div>
  )
}
