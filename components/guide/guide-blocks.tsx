import Link from "next/link"
import type { ReactNode } from "react"
import { AlertTriangle, ArrowRight, Check, ChevronDown, ExternalLink, FileCheck2, ShieldCheck, TrendingDown } from "lucide-react"
import type { GuideFaq, GuideOption, GuideSource, GuideSubsection, OwnershipRow, RiskItem } from "@/lib/guides/invest-for-kids"

export const proseText = "text-base leading-relaxed text-foreground/80 md:text-lg text-pretty"
const inlineLink =
  "font-semibold text-primary underline underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"

export function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 flex flex-col gap-5 border-t border-border pt-12">
      <h2 id={`${id}-title`} className="font-serif text-2xl font-bold leading-snug text-foreground text-balance md:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function Callout({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "warning" }) {
  const styles = tone === "warning" ? "border-accent/40 bg-accent/10" : "border-primary/30 bg-primary/5"
  return (
    <div role="note" className={`flex gap-3 rounded-2xl border p-5 ${styles}`}>
      <AlertTriangle className={`mt-0.5 h-5 w-5 flex-shrink-0 ${tone === "warning" ? "text-accent" : "text-primary"}`} aria-hidden="true" />
      <p className="font-medium leading-relaxed text-foreground">{children}</p>
    </div>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 ${proseText}`}>
          <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

const OPTION_FIELDS: { key: keyof Omit<GuideOption, "name">; label: string }[] = [
  { key: "fit", label: "Para quién puede encajar" },
  { key: "check", label: "Qué debe revisar la familia" },
  { key: "complexity", label: "Complejidad" },
  { key: "marketRisk", label: "Riesgo de mercado" },
  { key: "liquidity", label: "Liquidez" },
]

export function OptionsComparison({ options }: { options: GuideOption[] }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-border xl:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Comparativa de alternativas para ahorrar o invertir para un menor</caption>
          <thead className="bg-muted/60 text-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Alternativa
              </th>
              {OPTION_FIELDS.map((field) => (
                <th key={field.key} scope="col" className="px-4 py-3 font-semibold">
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {options.map((option) => (
              <tr key={option.name} className="align-top">
                <th scope="row" className="px-4 py-4 font-serif text-base font-bold text-foreground">
                  {option.name}
                </th>
                {OPTION_FIELDS.map((field) => (
                  <td key={field.key} className="px-4 py-4 leading-relaxed text-foreground/80">
                    {option[field.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 xl:hidden">
        {options.map((option) => (
          <li key={option.name} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-serif text-lg font-bold text-foreground">{option.name}</h3>
            <dl className="mt-3 flex flex-col gap-3">
              {OPTION_FIELDS.map((field) => (
                <div key={field.key}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-primary">{field.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-foreground/80">{option[field.key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}

export function OptionDetail({ detail }: { detail: GuideSubsection }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-serif text-xl font-bold leading-snug text-foreground">{detail.title}</h3>
      {detail.paragraphs.map((paragraph) => (
        <p key={paragraph} className={proseText}>
          {paragraph}
        </p>
      ))}
      {detail.bullets && <BulletList items={detail.bullets} />}
      {detail.link && (
        <p className={proseText}>
          Para profundizar:{" "}
          <Link href={detail.link.href} className={inlineLink}>
            {detail.link.label}
          </Link>
          .
        </p>
      )}
    </div>
  )
}

export function OwnershipComparison({ rows }: { rows: OwnershipRow[] }) {
  const columns = [
    { key: "minor" as const, title: "A nombre del menor" },
    { key: "adult" as const, title: "A nombre del adulto" },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {columns.map((column) => (
        <div key={column.key} className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-serif text-xl font-bold text-foreground">{column.title}</h3>
          <dl className="mt-4 flex flex-col gap-4">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs font-semibold uppercase tracking-widest text-primary">{row.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-foreground/80 md:text-base">{row[column.key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}

export function DocumentsChecklist({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileCheck2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </span>
        <h3 className="font-serif text-lg font-bold text-foreground">Documentación habitual</h3>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-foreground/80">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-3 w-3" aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RiskGroup({ title, items, kind }: { title: string; items: RiskItem[]; kind: "market" | "entity" }) {
  const Icon = kind === "market" ? TrendingDown : ShieldCheck
  return (
    <div className="flex flex-col gap-4">
      <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        {title}
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/80">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function StepsTimeline({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
          {index < steps.length - 1 && (
            <span className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-px bg-border" aria-hidden="true" />
          )}
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            {index + 1}
          </span>
          <div className="pt-1.5">
            <h3 className="font-semibold text-foreground">{step.title}</h3>
            <p className="mt-1 leading-relaxed text-foreground/80">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function FaqList({ faqs }: { faqs: GuideFaq[] }) {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-2xl border border-border bg-card">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
            <h3 className="text-base">{faq.question}</h3>
            <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-foreground/80">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

export function SourcesList({ sources }: { sources: GuideSource[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {sources.map((source) => (
        <li key={source.href}>
          <a
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-widest text-primary">{source.publisher}</span>
              <span className="mt-1 block leading-snug text-foreground">{source.label}</span>
            </span>
            <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function KiriBridge({ text }: { text: string }) {
  return (
    <section aria-labelledby="kiri-bridge-title" className="rounded-3xl bg-primary p-8 md:p-10">
      <h2 id="kiri-bridge-title" className="font-serif text-2xl font-bold text-primary-foreground text-balance md:text-3xl">
        Un proyecto de largo plazo, en familia
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/kiri-academy"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Aprender en Kiri Academy
        </Link>
        <Link
          href="/regala-kiri"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Conocer Regala Kiri
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
