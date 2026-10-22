import Link from "next/link"
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  Check,
  Clock,
  FileText,
  Gauge,
  Globe,
  PiggyBank,
  Receipt,
  Sprout,
  TrendingDown,
  type LucideIcon,
} from "lucide-react"
import {
  COMPARISON_FIELDS,
  type GiftComparisonRow,
  type GiftType,
  type RiskCheck,
} from "@/lib/guides/gift-ideas"

const inlineLink =
  "font-semibold text-primary underline underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"

export function ShortAnswer({ children }: { children: string }) {
  return (
    <p className="rounded-2xl border-l-0 bg-muted/60 px-5 py-4 text-base font-medium leading-relaxed text-foreground">
      <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-primary">En resumen</span>
      {children}
    </p>
  )
}

export function DeeperLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="text-base leading-relaxed text-foreground/80">
      Para profundizar:{" "}
      <Link href={href} className={inlineLink}>
        {label}
      </Link>
      .
    </p>
  )
}

const GIFT_ICONS: Record<GiftType["kind"], LucideIcon> = {
  cash: Banknote,
  savings: PiggyBank,
  investment: Sprout,
}

export function GiftTypeCards({ types }: { types: GiftType[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {types.map((type) => {
        const Icon = GIFT_ICONS[type.kind]
        return (
          <li key={type.kind} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </span>
            <h3 className="font-serif text-lg font-bold leading-snug text-foreground text-balance">{type.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/80">{type.text}</p>
            <p className="mt-auto border-t border-border pt-3 text-sm leading-relaxed text-foreground">
              <span className="font-semibold">A tener en cuenta: </span>
              {type.note}
            </p>
          </li>
        )
      })}
    </ul>
  )
}

export function GiftComparison({ rows }: { rows: GiftComparisonRow[] }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-border md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Comparativa entre regalar dinero, ahorro o inversión</caption>
          <thead className="bg-muted/60 text-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Opción
              </th>
              {COMPARISON_FIELDS.map((field) => (
                <th key={field.key} scope="col" className="px-4 py-3 font-semibold">
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.option} className="align-top">
                <th scope="row" className="px-4 py-4 font-serif text-base font-bold text-foreground">
                  {row.option}
                </th>
                {COMPARISON_FIELDS.map((field) => (
                  <td key={field.key} className="px-4 py-4 leading-relaxed text-foreground/80">
                    {row[field.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-4 md:hidden">
        {rows.map((row) => (
          <li key={row.option} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-serif text-lg font-bold text-foreground">{row.option}</h3>
            <dl className="mt-3 flex flex-col gap-3">
              {COMPARISON_FIELDS.map((field) => (
                <div key={field.key}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-primary">{field.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-foreground/80">{row[field.key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}

export function CheckItems({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-foreground/80">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-3 w-3" aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function HorizonTimeline({ horizons }: { horizons: { title: string; range: string; check: string }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {horizons.map((horizon, index) => (
        <li key={horizon.title} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            Momento {index + 1} · {horizon.range}
          </span>
          <h3 className="font-serif text-lg font-bold text-foreground">{horizon.title}</h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            <span className="font-semibold text-foreground">Revisar: </span>
            {horizon.check}
          </p>
        </li>
      ))}
    </ol>
  )
}

const RISK_ICONS: Record<RiskCheck["icon"], LucideIcon> = {
  gauge: Gauge,
  globe: Globe,
  receipt: Receipt,
  clock: Clock,
  "trending-down": TrendingDown,
  "file-text": FileText,
}

export function RiskChecks({ items }: { items: RiskCheck[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = RISK_ICONS[item.icon]
        return (
          <li key={item.text} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
            <span className="leading-relaxed text-foreground/80">{item.text}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function RegalaKiriSteps({
  steps,
  notice,
  conditionsHref,
  cta,
}: {
  steps: { title: string; text: string }[]
  notice: string
  conditionsHref: string
  cta: { href: string; label: string }
}) {
  return (
    <div className="rounded-3xl bg-primary p-6 md:p-8">
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-2 rounded-2xl bg-primary-foreground/10 p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background font-semibold text-foreground">
              {index + 1}
            </span>
            <h3 className="font-semibold leading-snug text-primary-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-primary-foreground/85">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={conditionsHref}
          className="text-sm font-semibold text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background rounded-sm"
        >
          {notice}
        </Link>
        <Link
          href={cta.href}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export function NumberedChecklist({ items, closing }: { items: string[]; closing: string }) {
  return (
    <div className="rounded-3xl border border-accent/40 bg-accent/10 p-6 md:p-8">
      <ol className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={item} className="flex items-start gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
              {index + 1}
            </span>
            <span className="pt-1 leading-relaxed text-foreground">{item}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-accent/30 pt-5 font-serif text-lg font-bold leading-snug text-foreground text-pretty">
        {closing}
      </p>
    </div>
  )
}
