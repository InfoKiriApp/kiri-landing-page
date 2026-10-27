import { notFound } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getArticleBySlug, getAllSlugs, ARTICLES, type ArticleSection } from "@/lib/academy-articles"
import { ArrowLeft, ArrowRight, Clock, BookOpen, Gift, Users } from "lucide-react"
import Image from "next/image"
import { ADRIANA } from "@/lib/academy-articles"
import JsonLd from "@/components/json-ld"
import ArticleBreadcrumbs from "@/components/academy/article-breadcrumbs"
import { INVEST_GUIDE } from "@/lib/guides/invest-for-kids"
import { KIRI_ORGANIZATION, absoluteUrl, breadcrumbJsonLd } from "@/lib/site"

export function generateStaticParams() {
  return getAllSlugs()
    .filter((slug) => slug !== "fondos-de-inversion-indexados")
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  const title = `${article.title} | Kiri Academy`
  const href = `/kiri-academy/${article.slug}`
  return {
    title,
    description: article.excerpt,
    alternates: { canonical: href },
    openGraph: {
      type: "article",
      locale: "es_ES",
      title,
      description: article.excerpt,
      url: href,
      images: [{ url: article.coverUrl, alt: article.title }],
      authors: [ADRIANA.name],
    },
    twitter: { card: "summary_large_image", title, description: article.excerpt, images: [article.coverUrl] },
  }
}

const GIFT_BRIDGE_CATEGORIES = new Set(["frutos", "bosque"])

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

  const sameBranch = ARTICLES.filter((a) => a.kiriCategory === article.kiriCategory && a.slug !== article.slug)
  const sameTopic = ARTICLES.filter(
    (a) => a.category === article.category && a.kiriCategory !== article.kiriCategory && a.slug !== article.slug
  )
  const related = [...sameBranch, ...sameTopic].slice(0, 3)

  const href = `/kiri-academy/${article.slug}`
  const breadcrumbs = [
    { name: "Inicio", href: "/" },
    { name: "Kiri Academy", href: "/kiri-academy" },
    { name: article.title, href },
  ]
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      image: absoluteUrl(article.coverUrl),
      inLanguage: "es-ES",
      articleSection: article.category,
      author: { "@type": "Person", name: ADRIANA.name, jobTitle: ADRIANA.role },
      publisher: KIRI_ORGANIZATION,
      mainEntityOfPage: absoluteUrl(href),
    },
    breadcrumbJsonLd(breadcrumbs),
  ]
  const showGuideLink = article.category === "Inversión"
  const showGiftBridge = GIFT_BRIDGE_CATEGORIES.has(article.kiriCategory)

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={structuredData} />
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-28 pb-16 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-8">
            <ArticleBreadcrumbs items={breadcrumbs} tone="dark" />
          </div>

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

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} de lectura</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Users className="w-4 h-4" />
              <span>{article.ageRange} años</span>
            </div>
          </div>

          {/* Author chip */}
          <div className="flex items-center gap-3 mt-2">
            <Image
              src={ADRIANA.avatar}
              alt={ADRIANA.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-white text-sm font-semibold">{ADRIANA.name}</p>
              <p className="text-white/50 text-xs">{ADRIANA.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="px-6 md:px-12 lg:px-20 -mt-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden shadow-xl ring-1 ring-border">
            <Image
              src={article.coverUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-3xl mx-auto">
          {article.body.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}

          {showGuideLink && (
            <Link
              href={INVEST_GUIDE.href}
              className="group mt-10 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-widest text-primary">
                  {INVEST_GUIDE.eyebrow}
                </span>
                <span className="mt-1 block font-serif text-lg font-bold leading-snug text-foreground">
                  {INVEST_GUIDE.title}
                </span>
              </span>
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          )}

          {showGiftBridge && (
            <aside className="mt-10 flex flex-col gap-4 rounded-2xl bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Gift className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <p className="leading-relaxed text-foreground/80">
                  ¿Buscas un regalo que crezca con ellos? Con Regala Kiri, la familia puede aportar a su futuro en
                  cumpleaños y fechas especiales.
                </p>
              </div>
              <Link
                href="/regala-kiri"
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Conocer Regala Kiri
              </Link>
            </aside>
          )}
        </div>
      </article>

      {/* Author bio */}
      <section className="px-6 md:px-12 lg:px-20 py-12 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="bg-muted/40 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-5 items-start">
            <Image
              src={ADRIANA.avatar}
              alt={ADRIANA.name}
              width={72}
              height={72}
              className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Autora</p>
              <h3 className="font-serif text-lg font-bold text-foreground">{ADRIANA.name}</h3>
              <p className="text-sm text-primary font-semibold mb-2">{ADRIANA.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{ADRIANA.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Seguir leyendo
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-10">
              {sameBranch.length >= 3 ? `Más artículos de ${kiriMeta.label}` : "Artículos relacionados"}
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
