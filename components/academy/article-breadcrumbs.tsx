import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { BreadcrumbItem } from "@/lib/site"

export default function ArticleBreadcrumbs({ items, tone = "dark" }: { items: BreadcrumbItem[]; tone?: "dark" | "light" }) {
  const linkColor = tone === "dark" ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
  const currentColor = tone === "dark" ? "text-white/90" : "text-foreground"

  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex min-w-0 items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className={`line-clamp-1 ${currentColor}`}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className={`rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${linkColor}`}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 ${linkColor}`} aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
