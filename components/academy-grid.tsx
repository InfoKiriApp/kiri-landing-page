"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  BookOpen,
  Sprout,
  TrendingUp,
  Heart,
  Target,
  PiggyBank,
  TreePine,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ARTICLES, ADRIANA, type Article, type KiriCategory, type AgeRange } from "@/lib/academy-articles"

const ICON_MAP: Record<string, LucideIcon> = {
  Scale,
  PiggyBank,
  TreePine,
  Heart,
  Target,
  TrendingUp,
  BookOpen,
  Sprout,
  Users,
}

type Props = {
  categoryFilter?: string
  kiriFilter?: KiriCategory
  ageFilter?: AgeRange
}

export default function AcademyGrid({ categoryFilter, kiriFilter, ageFilter }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  const visible: Article[] = ARTICLES.filter((a) => {
    if (kiriFilter && a.kiriCategory !== kiriFilter) return false
    if (categoryFilter && categoryFilter !== "Todos" && a.category !== categoryFilter) return false
    if (ageFilter && a.ageRange !== ageFilter) return false
    return true
  })

  return (
    <section className="px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        {visible.length === 0 ? (
          <p className="text-center text-muted-foreground py-24 text-sm">
            No hay artículos en esta categoría todavía.
          </p>
        ) : (
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((article, i) => {
              const Icon = ICON_MAP[article.icon] ?? BookOpen
              return (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 36 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.55,
                    delay: 0.05 + (i % 3) * 0.1 + Math.floor(i / 3) * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  {/* Card header */}
                  <div className="bg-primary/5 p-6 flex items-start justify-between gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                        {article.ageRange} años
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <h2 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      <Image
                        src={ADRIANA.avatar}
                        alt={ADRIANA.name}
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{ADRIANA.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{ADRIANA.role}</p>
                      </div>
                      <Link
                        href={`/kiri-academy/${article.slug}`}
                        className="text-sm font-semibold text-primary hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded flex-shrink-0"
                      >
                        Leer &rarr;
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
