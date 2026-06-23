"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { FAQ } from "@/lib/academy-games"

type Props = {
  faqs: FAQ[]
  accentText?: string
}

export default function GameFaq({ faqs, accentText = "text-primary" }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            className="border border-border rounded-2xl bg-card overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="font-semibold text-foreground text-sm md:text-base leading-snug">
                {faq.q}
              </span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 ${accentText} transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
