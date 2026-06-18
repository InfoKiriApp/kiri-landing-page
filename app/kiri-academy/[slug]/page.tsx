import { notFound } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getArticleBySlug, getAllSlugs, ARTICLES, type ArticleSection } from "@/lib/academy-articles"
import { ArrowLeft, Clock, BookOpen } from "lucide-react"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | Kiri Academy`,
    description: article.excerpt,
  }
}

const KIRI_CATEGORY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  raices:  { label: "Las Raíces",              color: "text-rose-600",    bg: "bg-rose-50 border-rose-200" },
  tronco:  { label: "El Tronco y las Ramas",   color: "text-violet-600",  bg: "bg-violet-50 border-violet-200" },
  frutos:  { label: "Los Frutos",              color: "text-amber-600",   bg: "bg-amber-50 border-amber-200" },
  bosque:  { label: "El Bosque",               color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
}

function RenderSection({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 leading-snug">
          {section.content}
        </h2>
      )
    case "subheading":
      return (
        <h3 className="font-serif text-xl font-bold text-foreground mt-8 mb-3 leading-snug">
          {section.content}
        </h3>
      )
    case "paragraph":
      return (
        <p className="text-foreground/80 leading-relaxed text-base md:text-lg mb-5">
          {section.content}
        </p>
      )
    case "callout":
      return (
        <div className="my-8 border-l-4 border-primary bg-primary/5 rounded-r-2xl px-6 py-5">
          <p className="text-foreground/90 leading-relaxed text-sm md:text-base font-medium">
            {section.content}
          </p>
        </div>
      )
    case "list":
      return (
        <ul className="my-5 flex flex-col gap-3 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-foreground/80 text-base leading-relaxed">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const kiriMeta = KIRI_CATEGORY_LABELS[article.kiriCategory]

  // Related articles: same kiriCategory, excluding current
  const related = ARTICLES.filter(
    (a) => a.kiriCategory === article.kiriCategory && a.slug !== article.slug
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-28 pb-16 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/kiri-academy"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Kiri Academy
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className={`border text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${kiriMeta.bg} ${kiriMeta.color}`}
            >
              {kiriMeta.label}
            </span>
            <span className="bg-white/10 text-white/70 border border-white/20 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance mb-6">
            {article.title}
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} de lectura</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-3xl mx-auto">
          {article.body.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Seguir leyendo
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-10">
              Más artículos de {kiriMeta.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/kiri-academy/${rel.slug}`}
                  className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-4 group hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                      {rel.category}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <BookOpen className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-serif text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                    {rel.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
                    {rel.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                    <span className="text-xs text-muted-foreground">{rel.readTime} de lectura</span>
                    <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                      Leer &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back CTA */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/kiri-academy"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full text-sm hover:bg-accent transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Kiri Academy
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
