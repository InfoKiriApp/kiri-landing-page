import type { ReactNode } from "react"
import { ExternalLink } from "lucide-react"

export default function IndexaLink({
  href,
  children,
  className = "font-semibold text-primary underline underline-offset-4 hover:text-accent",
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      <span className="sr-only">(abre la web de Indexa Capital en una pestaña nueva)</span>
    </a>
  )
}
