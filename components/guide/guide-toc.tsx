import { ChevronDown, ListOrdered } from "lucide-react"

type TocItem = { id: string; label: string }

function TocLinks({ items }: { items: readonly TocItem[] }) {
  return (
    <ol className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="block rounded-lg px-3 py-2 text-sm leading-snug text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  )
}

export function GuideTocMobile({ items }: { items: readonly TocItem[] }) {
  return (
    <details className="group rounded-2xl border border-border bg-card lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-primary" aria-hidden="true" />
          Contenido de la guía
        </span>
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <nav aria-label="Contenido de la guía" className="border-t border-border px-2 py-3">
        <TocLinks items={items} />
      </nav>
    </details>
  )
}

export function GuideTocDesktop({ items }: { items: readonly TocItem[] }) {
  return (
    <nav aria-label="Contenido de la guía" className="sticky top-28 hidden lg:block">
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-primary">En esta guía</p>
      <TocLinks items={items} />
    </nav>
  )
}
