import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarCheck, Info } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import JsonLd from "@/components/json-ld"
import ArticleBreadcrumbs from "@/components/academy/article-breadcrumbs"
import { GuideTocDesktop, GuideTocMobile } from "@/components/guide/guide-toc"
import { BulletList, Callout, FaqList, GuideSection, SourcesList, proseText } from "@/components/guide/guide-blocks"
import CostCard from "@/components/indexa/cost-card"
import IndexaLink from "@/components/indexa/indexa-link"
import { getArticleBySlug } from "@/lib/academy-articles"
import {
  COSTS_PARAGRAPHS,
  DIVERSIFICATION_VS_GUARANTEE,
  FAQS,
  INDEX_FUNDS_GUIDE,
  OWNERSHIP_SUMMARY,
  PAST_RETURN_NOTE,
  RELATED_ARTICLE_SLUGS,
  SECTIONS,
  SOURCES,
  TAX,
  sectionLabel,
} from "@/lib/guides/index-funds"
import { INDEXA_LINKS, RISK_POINTS } from "@/lib/indexa"
import { KIRI_ORGANIZATION, absoluteUrl, breadcrumbJsonLd } from "@/lib/site"

export const metadata: Metadata = {
  title: INDEX_FUNDS_GUIDE.metaTitle,
  description: INDEX_FUNDS_GUIDE.description,
  alternates: { canonical: INDEX_FUNDS_GUIDE.href },
  openGraph: {
    type: "article",
    locale: "es_ES",
    title: INDEX_FUNDS_GUIDE.metaTitle,
    description: INDEX_FUNDS_GUIDE.description,
    url: INDEX_FUNDS_GUIDE.href,
    images: [{ url: INDEX_FUNDS_GUIDE.image.src, alt: INDEX_FUNDS_GUIDE.image.alt }],
    modifiedTime: INDEX_FUNDS_GUIDE.reviewed.iso,
  },
  twitter: {
    card: "summary_large_image",
    title: INDEX_FUNDS_GUIDE.metaTitle,
    description: INDEX_FUNDS_GUIDE.description,
    images: [INDEX_FUNDS_GUIDE.image.src],
  },
}

const BREADCRUMBS = [
  { name: "Inicio", href: "/" },
  { name: "Kiri Academy", href: "/kiri-academy" },
  { name: INDEX_FUNDS_GUIDE.shortTitle, href: INDEX_FUNDS_GUIDE.href },
]

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: INDEX_FUNDS_GUIDE.title,
    description: INDEX_FUNDS_GUIDE.description,
    image: absoluteUrl(INDEX_FUNDS_GUIDE.image.src),
    dateModified: INDEX_FUNDS_GUIDE.reviewed.iso,
    inLanguage: "es-ES",
    author: { "@type": "Organization", name: INDEX_FUNDS_GUIDE.author, url: absoluteUrl("/kiri-academy") },
    publisher: KIRI_ORGANIZATION,
    mainEntityOfPage: absoluteUrl(INDEX_FUNDS_GUIDE.href),
  },
  breadcrumbJsonLd(BREADCRUMBS),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
]

const readMinutes = Math.max(
  1,
  Math.round(
    [
      INDEX_FUNDS_GUIDE.answer,
      ...DIVERSIFICATION_VS_GUARANTEE.map((item) => item.text),
      ...COSTS_PARAGRAPHS,
      ...OWNERSHIP_SUMMARY.map((item) => item.text),
      ...RISK_POINTS,
      ...FAQS.map((faq) => faq.answer),
      TAX.note,
    ]
      .join(" ")
      .split(/\s+/).length / 200,
  ) + 2,
)

const internalLink =
  "rounded-sm font-semibold text-primary underline underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"

export default function IndexFundsGuidePage() {
  const related = RELATED_ARTICLE_SLUGS.map(getArticleBySlug).filter((article) => article !== undefined)

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={structuredData} />
      <Header />

      <header className="bg-foreground px-6 pb-16 pt-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <ArticleBreadcrumbs items={BREADCRUMBS} />
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">{INDEX_FUNDS_GUIDE.eyebrow}</span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-white text-balance md:text-5xl">
              {INDEX_FUNDS_GUIDE.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
              <span>{readMinutes} min de lectura</span>
              <span className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Datos de Indexa Capital consultados el{" "}
                <time dateTime={INDEX_FUNDS_GUIDE.reviewed.iso}>{INDEX_FUNDS_GUIDE.reviewed.label}</time>
              </span>
              <span>Por el {INDEX_FUNDS_GUIDE.author}</span>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/10">
            <Image
              src={INDEX_FUNDS_GUIDE.image.src}
              alt={INDEX_FUNDS_GUIDE.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <div className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 py-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          <aside>
            <GuideTocDesktop items={SECTIONS} />
          </aside>

          <article className="flex min-w-0 max-w-3xl flex-col gap-12">
            <div className="flex flex-col gap-6">
              <div role="note" className="flex gap-3 rounded-2xl border border-border bg-muted/50 p-4 text-sm text-foreground/80">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <p>{INDEX_FUNDS_GUIDE.disclaimer}</p>
              </div>
              <p className="text-xl leading-relaxed text-foreground text-pretty md:text-2xl">{INDEX_FUNDS_GUIDE.answer}</p>
              <GuideTocMobile items={SECTIONS} />
            </div>

            <GuideSection id="que-es" title={sectionLabel("que-es")}>
              <p className={proseText}>
                Imagina una cesta con cientos de frutas distintas en lugar de una sola pieza. Si una se estropea, el resto
                sigue ahí. Un fondo indexado compra muchas empresas o bonos a la vez para reproducir un índice de mercado.
              </p>
              <p className={proseText}>
                Una cartera de fondos indexados combina varios de estos fondos, de acciones y de bonos de distintas
                regiones, en proporciones que dependen del perfil de riesgo. Kiri trabaja con Indexa Capital como
                proveedor de esta cartera.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {DIVERSIFICATION_VS_GUARANTEE.map((item) => (
                  <div key={item.title} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/75">{item.text}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            <GuideSection id="riesgo" title={sectionLabel("riesgo")}>
              <BulletList items={[...RISK_POINTS]} />
              <figure className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/50 p-5">
                <p className="text-foreground">{PAST_RETURN_NOTE.text}</p>
                <figcaption className="text-xs leading-relaxed text-muted-foreground">{PAST_RETURN_NOTE.source}</figcaption>
              </figure>
            </GuideSection>

            <GuideSection id="costes" title={sectionLabel("costes")}>
              {COSTS_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph} className={proseText}>
                  {paragraph}
                </p>
              ))}
              <CostCard />
              <p className={proseText}>
                <IndexaLink href={INDEXA_LINKS.fees}>Detalle de comisiones en Indexa Capital</IndexaLink>
              </p>
            </GuideSection>

            <GuideSection id="titular" title={sectionLabel("titular")}>
              <ul className="grid gap-4 md:grid-cols-3">
                {OWNERSHIP_SUMMARY.map((item) => (
                  <li key={item.title} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-semibold leading-snug text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/75">{item.text}</p>
                    <Link href={item.href} className={`mt-auto inline-flex items-center gap-1 text-sm ${internalLink}`}>
                      Ver en la guía
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </GuideSection>

            <GuideSection id="fiscalidad" title={sectionLabel("fiscalidad")}>
              <Callout tone="warning">{TAX.note}</Callout>
            </GuideSection>

            <GuideSection id="preguntas" title={sectionLabel("preguntas")}>
              <FaqList faqs={FAQS} />
              <p className={proseText}>
                Titularidad, documentación y mayoría de edad se responden en la{" "}
                <Link href="/kiri-academy/como-invertir-para-tus-hijos#preguntas" className={internalLink}>
                  guía para invertir para tus hijos
                </Link>
                .
              </p>
            </GuideSection>

            <section className="flex flex-col items-start gap-4 rounded-3xl bg-primary p-6 text-primary-foreground md:p-8">
              <h2 className="font-serif text-2xl font-bold text-balance">Regala un futuro con Kiri</h2>
              <p className="leading-relaxed text-primary-foreground/85">
                Antes de contratar, revisa los riesgos y costes de la cartera.
              </p>
              <Link
                href="/regala-kiri"
                className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
              >
                Regala Kiri
              </Link>
            </section>

            {related.length > 0 && (
              <section aria-labelledby="relacionados-title" className="flex flex-col gap-4">
                <h2 id="relacionados-title" className="font-serif text-2xl font-bold text-foreground">
                  Sigue leyendo
                </h2>
                <ul className="grid gap-4 md:grid-cols-2">
                  {related.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/kiri-academy/${article.slug}`}
                        className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{article.category}</span>
                        <span className="font-serif font-bold leading-snug text-foreground">{article.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <GuideSection id="fuentes" title={sectionLabel("fuentes")}>
              <SourcesList sources={SOURCES} />
            </GuideSection>
          </article>
        </div>
      </div>

      <Footer />
    </div>
  )
}
