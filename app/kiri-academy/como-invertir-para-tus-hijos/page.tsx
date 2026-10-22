import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarCheck, Clock, Info } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import JsonLd from "@/components/json-ld"
import ArticleBreadcrumbs from "@/components/academy/article-breadcrumbs"
import { GuideTocDesktop, GuideTocMobile } from "@/components/guide/guide-toc"
import {
  BulletList,
  Callout,
  DocumentsChecklist,
  FaqList,
  GuideSection,
  KiriBridge,
  OptionDetail,
  OptionsComparison,
  OwnershipComparison,
  RiskGroup,
  SourcesList,
  StepsTimeline,
  proseText,
} from "@/components/guide/guide-blocks"
import { getArticleBySlug } from "@/lib/academy-articles"
import {
  DIVERSIFICATION_NOTE,
  DOCUMENTS,
  DOCUMENTS_NOTE,
  ENTITY_RISKS,
  FAMILY_CONTRIBUTIONS,
  FAQS,
  HORIZON,
  INVEST_GUIDE,
  KEY_DECISIONS,
  KIRI_BLOCK,
  MARKET_RISKS,
  OPTIONS,
  OPTIONS_NOTE,
  OPTION_DETAILS,
  OWNERSHIP_ROWS,
  OWNERSHIP_WARNING,
  RELATED_ARTICLE_SLUGS,
  SOURCES,
  STEPS,
  TAX,
  TOC,
} from "@/lib/guides/invest-for-kids"
import { KIRI_ORGANIZATION, absoluteUrl, breadcrumbJsonLd } from "@/lib/site"

export const metadata: Metadata = {
  title: INVEST_GUIDE.metaTitle,
  description: INVEST_GUIDE.description,
  alternates: { canonical: INVEST_GUIDE.href },
  openGraph: {
    type: "article",
    locale: "es_ES",
    title: INVEST_GUIDE.metaTitle,
    description: INVEST_GUIDE.description,
    url: INVEST_GUIDE.href,
    images: [{ url: INVEST_GUIDE.image.src, alt: INVEST_GUIDE.image.alt }],
    modifiedTime: INVEST_GUIDE.reviewed.iso,
  },
  twitter: {
    card: "summary_large_image",
    title: INVEST_GUIDE.metaTitle,
    description: INVEST_GUIDE.description,
    images: [INVEST_GUIDE.image.src],
  },
}

const BREADCRUMBS = [
  { name: "Inicio", href: "/" },
  { name: "Kiri Academy", href: "/kiri-academy" },
  { name: INVEST_GUIDE.shortTitle, href: INVEST_GUIDE.href },
]

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: INVEST_GUIDE.title,
    description: INVEST_GUIDE.description,
    image: absoluteUrl(INVEST_GUIDE.image.src),
    dateModified: INVEST_GUIDE.reviewed.iso,
    inLanguage: "es-ES",
    author: { "@type": "Organization", name: INVEST_GUIDE.author, url: absoluteUrl("/kiri-academy") },
    publisher: KIRI_ORGANIZATION,
    mainEntityOfPage: absoluteUrl(INVEST_GUIDE.href),
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

export default function InvestForKidsGuidePage() {
  const related = RELATED_ARTICLE_SLUGS.map(getArticleBySlug).filter((article) => article !== undefined)

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={structuredData} />
      <Header />

      <header className="bg-foreground px-6 pb-16 pt-10 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <ArticleBreadcrumbs items={BREADCRUMBS} tone="dark" />
            <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
              {INVEST_GUIDE.eyebrow}
            </span>
            <h1 className="font-serif text-3xl font-bold leading-tight text-white text-balance md:text-4xl lg:text-5xl">
              {INVEST_GUIDE.title}
            </h1>
            <p className="text-lg leading-relaxed text-white/75 text-pretty">{INVEST_GUIDE.subtitle}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {INVEST_GUIDE.readTime} de lectura
              </span>
              <span className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Revisada el <time dateTime={INVEST_GUIDE.reviewed.iso}>{INVEST_GUIDE.reviewed.label}</time>
              </span>
              <span>Por el {INVEST_GUIDE.author}</span>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/10">
            <Image
              src={INVEST_GUIDE.image.src}
              alt={INVEST_GUIDE.image.alt}
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
            <GuideTocDesktop items={TOC} />
          </aside>

          <article className="flex min-w-0 max-w-3xl flex-col gap-12">
            <div className="flex flex-col gap-6">
              <div role="note" className="flex gap-3 rounded-2xl border border-border bg-muted/50 p-4 text-sm text-foreground/80">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <p>{INVEST_GUIDE.disclaimer}</p>
              </div>
              <p className="text-xl leading-relaxed text-foreground text-pretty md:text-2xl">{INVEST_GUIDE.answer}</p>

              <section aria-labelledby="decisiones-title" className="rounded-3xl border border-accent/40 bg-accent/10 p-6 md:p-8">
                <h2 id="decisiones-title" className="font-serif text-xl font-bold text-foreground md:text-2xl">
                  Antes de empezar, decide estas tres cosas
                </h2>
                <ol className="mt-5 grid gap-4 md:grid-cols-3">
                  {KEY_DECISIONS.map((decision, index) => (
                    <li key={decision.title} className="flex flex-col gap-2 rounded-2xl bg-background p-5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold leading-snug text-foreground">{decision.title}</h3>
                      <p className="text-sm leading-relaxed text-foreground/75">{decision.text}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <GuideTocMobile items={TOC} />
            </div>

            <GuideSection id="plazo" title={TOC[0].label}>
              {HORIZON.paragraphs.map((paragraph) => (
                <p key={paragraph} className={proseText}>
                  {paragraph}
                </p>
              ))}
              <div className="grid gap-4 sm:grid-cols-2">
                {HORIZON.horizons.map((horizon) => (
                  <div key={horizon.title} className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">{horizon.range}</p>
                    <h3 className="mt-1 font-serif text-lg font-bold text-foreground">{horizon.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{horizon.text}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            <GuideSection id="alternativas" title={TOC[1].label}>
              <p className={proseText}>
                Ninguna opción es la mejor para todas las familias. Esta comparativa resume qué revisar en cada una, sin
                cifras de rentabilidad ni de comisiones, que cambian según la entidad y el momento.
              </p>
              <OptionsComparison options={OPTIONS} />
              <Callout tone="warning">{OPTIONS_NOTE}</Callout>
              <div className="flex flex-col gap-10 pt-4">
                {OPTION_DETAILS.map((detail) => (
                  <OptionDetail key={detail.title} detail={detail} />
                ))}
              </div>
            </GuideSection>

            <GuideSection id="titularidad" title={TOC[2].label}>
              <Callout>{OWNERSHIP_WARNING}</Callout>
              <OwnershipComparison rows={OWNERSHIP_ROWS} />
            </GuideSection>

            <GuideSection id="familiares" title={TOC[3].label}>
              {FAMILY_CONTRIBUTIONS.paragraphs.map((paragraph) => (
                <p key={paragraph} className={proseText}>
                  {paragraph}
                </p>
              ))}
              <BulletList items={FAMILY_CONTRIBUTIONS.bullets} />
            </GuideSection>

            <GuideSection id="documentacion" title={TOC[4].label}>
              <p className={proseText}>{DOCUMENTS_NOTE}</p>
              <DocumentsChecklist items={DOCUMENTS} />
            </GuideSection>

            <GuideSection id="fiscalidad" title={TOC[5].label}>
              <Callout tone="warning">{TAX.warning}</Callout>
              <p className={proseText}>{TAX.intro}</p>
              <BulletList items={TAX.points} />
            </GuideSection>

            <GuideSection id="riesgos" title={TOC[6].label}>
              <RiskGroup title="Riesgos de mercado" items={MARKET_RISKS} kind="market" />
              <RiskGroup title="Riesgo de la entidad y coberturas" items={ENTITY_RISKS} kind="entity" />
              <Callout>{DIVERSIFICATION_NOTE}</Callout>
            </GuideSection>

            <GuideSection id="proceso" title={TOC[7].label}>
              <StepsTimeline steps={STEPS} />
            </GuideSection>

            <KiriBridge text={KIRI_BLOCK} />

            <GuideSection id="preguntas" title={TOC[8].label}>
              <FaqList faqs={FAQS} />
            </GuideSection>

            {related.length > 0 && (
              <section aria-labelledby="relacionados-title" className="flex flex-col gap-4 border-t border-border pt-12">
                <h2 id="relacionados-title" className="font-serif text-2xl font-bold text-foreground">
                  Sigue aprendiendo en Kiri Academy
                </h2>
                <ul className="grid gap-4 sm:grid-cols-3">
                  {related.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/kiri-academy/${article.slug}`}
                        className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{article.category}</span>
                        <span className="font-serif font-bold leading-snug text-foreground">{article.title}</span>
                        <span className="mt-auto text-xs text-muted-foreground">{article.readTime} de lectura</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <GuideSection id="fuentes" title={TOC[9].label}>
              <SourcesList sources={SOURCES} />
            </GuideSection>
          </article>
        </div>
      </div>

      <Footer />
    </div>
  )
}
