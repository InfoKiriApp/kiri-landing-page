import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Baby, CalendarCheck, Clock, GraduationCap, Info } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import JsonLd from "@/components/json-ld"
import ArticleBreadcrumbs from "@/components/academy/article-breadcrumbs"
import { GuideTocDesktop, GuideTocMobile } from "@/components/guide/guide-toc"
import { BulletList, Callout, FaqList, GuideSection, SourcesList, proseText } from "@/components/guide/guide-blocks"
import {
  CheckItems,
  DeeperLink,
  GiftComparison,
  GiftTypeCards,
  HorizonTimeline,
  NumberedChecklist,
  RegalaKiriSteps,
  RiskChecks,
  ShortAnswer,
} from "@/components/guide/gift-blocks"
import { getArticleBySlug } from "@/lib/academy-articles"
import {
  AGE_LINKS,
  AGE_POINTS,
  CHECKLIST,
  CHECKLIST_CLOSING,
  COMPARISON,
  FAQS,
  GIFT_GUIDE,
  GIFT_INTRO,
  GIFT_PATHS,
  GIFT_TYPES,
  HORIZONS,
  HORIZON_NOTE,
  INVEST_GUIDE_TEASER,
  OWNERSHIP,
  PAST_PERFORMANCE_NOTE,
  READ_TIME_MINUTES,
  REGALA_KIRI,
  RELATED_ARTICLE_SLUGS,
  RISK_CHECKS,
  SECTIONS,
  SOURCES,
  TAX,
  TOC,
  type GiftSectionId,
} from "@/lib/guides/gift-ideas"
import { KIRI_ORGANIZATION, absoluteUrl, breadcrumbJsonLd } from "@/lib/site"

export const metadata: Metadata = {
  title: { absolute: GIFT_GUIDE.metaTitle },
  description: GIFT_GUIDE.description,
  alternates: { canonical: GIFT_GUIDE.href },
  openGraph: {
    type: "article",
    locale: "es_ES",
    title: GIFT_GUIDE.metaTitle,
    description: GIFT_GUIDE.description,
    url: GIFT_GUIDE.href,
    images: [{ url: GIFT_GUIDE.image.src, alt: GIFT_GUIDE.image.alt }],
    modifiedTime: GIFT_GUIDE.reviewed.iso,
  },
  twitter: {
    card: "summary_large_image",
    title: GIFT_GUIDE.metaTitle,
    description: GIFT_GUIDE.description,
    images: [GIFT_GUIDE.image.src],
  },
}

const BREADCRUMBS = [
  { name: "Inicio", href: "/" },
  { name: "Kiri Academy", href: "/kiri-academy" },
  { name: GIFT_GUIDE.shortTitle, href: GIFT_GUIDE.href },
]

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: GIFT_GUIDE.title,
    description: GIFT_GUIDE.description,
    image: absoluteUrl(GIFT_GUIDE.image.src),
    dateModified: GIFT_GUIDE.reviewed.iso,
    inLanguage: "es-ES",
    author: { "@type": "Organization", name: GIFT_GUIDE.author, url: absoluteUrl("/kiri-academy") },
    publisher: KIRI_ORGANIZATION,
    mainEntityOfPage: absoluteUrl(GIFT_GUIDE.href),
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

function Section({ id, children }: { id: GiftSectionId; children: React.ReactNode }) {
  const section = SECTIONS[id]
  return (
    <GuideSection id={id} title={section.title}>
      {section.summary && <ShortAnswer>{section.summary}</ShortAnswer>}
      {children}
    </GuideSection>
  )
}

export default function GiftIdeasGuidePage() {
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
              {GIFT_GUIDE.eyebrow}
            </span>
            <h1 className="font-serif text-3xl font-bold leading-tight text-white text-balance md:text-4xl lg:text-5xl">
              {GIFT_GUIDE.title}
            </h1>
            <p className="text-lg leading-relaxed text-white/75 text-pretty">{GIFT_GUIDE.intro}</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Baby className="h-4 w-4" aria-hidden="true" />
                {GIFT_GUIDE.ages}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {READ_TIME_MINUTES} min de lectura
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Guía educativa
              </li>
              <li className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Revisada el <time dateTime={GIFT_GUIDE.reviewed.iso}>{GIFT_GUIDE.reviewed.label}</time>
              </li>
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={REGALA_KIRI.cta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              >
                Explorar Regala Kiri
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#tipos"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Leer la guía
              </a>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/10">
            <Image
              src={GIFT_GUIDE.image.src}
              alt={GIFT_GUIDE.image.alt}
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
                <p>{GIFT_GUIDE.disclaimer}</p>
              </div>
              <section aria-labelledby="respuesta-title" className="rounded-3xl border border-accent/40 bg-accent/10 p-6 md:p-8">
                <h2 id="respuesta-title" className="font-serif text-xl font-bold text-foreground md:text-2xl">
                  La respuesta corta
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-foreground text-pretty">{GIFT_GUIDE.answer}</p>
              </section>
              <GuideTocMobile items={TOC} />
            </div>

            <Section id="tipos">
              <BulletList items={GIFT_PATHS} />
              <p className={proseText}>{GIFT_INTRO}</p>
              <h3 className="pt-2 font-serif text-xl font-bold text-foreground">
                Primero hay que decidir qué tipo de regalo se quiere hacer
              </h3>
              <GiftTypeCards types={GIFT_TYPES} />
            </Section>

            <Section id="comparativa">
              <GiftComparison rows={COMPARISON} />
              <DeeperLink href={INVEST_GUIDE_TEASER.href} label={INVEST_GUIDE_TEASER.label} />
            </Section>

            <Section id="edad">
              <BulletList items={AGE_POINTS} />
              <ul className="grid gap-3 sm:grid-cols-2">
                {AGE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 font-semibold text-foreground transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="titularidad">
              <p className={proseText}>{OWNERSHIP.text}</p>
              <CheckItems items={OWNERSHIP.checklist} />
              <Callout tone="warning">{OWNERSHIP.warning}</Callout>
              <DeeperLink href={OWNERSHIP.deeperLink.href} label={OWNERSHIP.deeperLink.label} />
            </Section>

            <Section id="horizonte">
              <HorizonTimeline horizons={HORIZONS} />
              <p className="text-sm leading-relaxed text-muted-foreground">{HORIZON_NOTE}</p>
            </Section>

            <Section id="riesgo">
              <Callout>{PAST_PERFORMANCE_NOTE}</Callout>
              <RiskChecks items={RISK_CHECKS} />
            </Section>

            <Section id="fiscalidad">
              <p className={proseText}>{TAX.text}</p>
              <Callout tone="warning">{TAX.warning}</Callout>
              <DeeperLink href={TAX.deeperLink.href} label={TAX.deeperLink.label} />
            </Section>

            <Section id="regala-kiri">
              <p className={proseText}>{REGALA_KIRI.intro}</p>
              <RegalaKiriSteps
                steps={REGALA_KIRI.steps}
                notice={REGALA_KIRI.pendingNotice}
                conditionsHref={REGALA_KIRI.conditionsHref}
                cta={REGALA_KIRI.cta}
              />
            </Section>

            <Section id="checklist">
              <NumberedChecklist items={CHECKLIST} closing={CHECKLIST_CLOSING} />
            </Section>

            <Section id="preguntas">
              <FaqList faqs={FAQS} />
            </Section>

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

            <Section id="fuentes">
              <SourcesList sources={SOURCES} />
            </Section>

            <aside aria-label="Aviso" className="rounded-2xl border border-border bg-muted/50 p-5 text-sm leading-relaxed text-foreground/80">
              <p>{GIFT_GUIDE.disclaimer}</p>
              <p className="mt-2">{GIFT_GUIDE.conditionsNotice}</p>
            </aside>
          </article>
        </div>
      </div>

      <Footer />
    </div>
  )
}
