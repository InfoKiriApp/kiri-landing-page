"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import type { LucideIcon } from "lucide-react"

type Article = {
  icon: LucideIcon
  category: string
  title: string
  excerpt: string
  readTime: string
}

export default function AcademyGrid({ articles }: { articles: Article[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section className="px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={i}
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
              <div className="bg-primary/5 p-8 flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <article.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Card body */}
              <div className="p-7 flex flex-col flex-1 gap-4">
                <h2 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                  <span className="text-xs text-muted-foreground">{article.readTime} de lectura</span>
                  <button className="text-sm font-semibold text-primary hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                    Leer más &rarr;
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
