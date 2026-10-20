import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieSettingsButton from "@/components/cookie-settings-button"
import { LEGAL_CONTACT, LEGAL_NAV, LEGAL_UPDATED, type LegalDoc, type LegalSection } from "@/lib/legal/shared"

export function legalMetadata(doc: LegalDoc): Metadata {
  const title = `${doc.title} | Kiri`
  return {
    title,
    description: doc.description,
    alternates: { canonical: doc.href },
    openGraph: { title, description: doc.description, type: "website", locale: "es_ES" },
  }
}

const inlineLink =
  "font-semibold text-kiri-purple underline underline-offset-4 hover:text-kiri-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2 rounded-sm"

function SectionBody({ section, showCookieSettings }: { section: LegalSection; showCookieSettings: boolean }) {
  return (
    <div className="mt-4 flex flex-col gap-4 leading-relaxed text-kiri-ink/85">
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-pretty">
          {paragraph}
        </p>
      ))}
      {section.table && (
        <div className="overflow-x-auto rounded-2xl border border-kiri-lilac">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">{section.table.caption}</caption>
            <thead className="bg-kiri-lilac/40 text-kiri-ink">
              <tr>
                {section.table.headers.map((header) => (
                  <th key={header} scope="col" className="px-4 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-kiri-lilac">
              {section.table.rows.map((row) => (
                <tr key={row[0]} className="align-top">
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell} scope="row" className="px-4 py-3 font-mono text-xs font-semibold text-kiri-ink">
                        {cell}
                      </th>
                    ) : (
                      <td key={cell} className="px-4 py-3 leading-relaxed">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.list && (
        <ul className="flex flex-col gap-3">
          {section.list.map((item) => (
            <li key={item.label} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-kiri-purple" />
              <span>
                <strong className="font-semibold text-kiri-ink">{item.label}</strong>
                {item.text && <> {item.text}</>}
              </span>
            </li>
          ))}
        </ul>
      )}
      {section.note && <p className="text-pretty">{section.note}</p>}
      {showCookieSettings && (
        <CookieSettingsButton className="self-start rounded-full bg-kiri-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-kiri-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2" />
      )}
      {section.links && (
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          {section.links.map((link) => (
            <Link key={link.href} href={link.href} className={inlineLink}>
              {link.label}
            </Link>
          ))}
        </p>
      )}
    </div>
  )
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const related = LEGAL_NAV.filter((link) => link.href !== doc.href)

  return (
    <div className="min-h-screen bg-white text-kiri-ink">
      <Header />
      <main>
        <section className="border-b border-kiri-lilac bg-kiri-lilac/30 px-6 pt-12 pb-14 md:pt-16 md:pb-16">
          <div className="mx-auto flex max-w-5xl flex-col gap-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-kiri-purple">{doc.eyebrow}</p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-balance md:text-5xl">{doc.title}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-pretty text-kiri-ink/80">{doc.intro}</p>
            <p className="text-sm text-kiri-ink/70">
              Última actualización: <time dateTime={LEGAL_UPDATED.iso}>{LEGAL_UPDATED.label}</time>
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-14 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <nav aria-label="Índice de la página" className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-kiri-ink/60">En esta página</p>
            <ol className="flex flex-col gap-1 border-l-2 border-kiri-lilac">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-sm text-kiri-ink/75 transition-colors hover:border-kiri-purple hover:text-kiri-purple focus-visible:border-kiri-purple focus-visible:text-kiri-purple focus-visible:outline-none"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="flex min-w-0 flex-col gap-12">
            <aside aria-labelledby="resumen" className="rounded-3xl bg-kiri-lilac/40 p-6 md:p-8">
              <h2 id="resumen" className="font-serif text-2xl font-bold">
                En resumen
              </h2>
              <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {doc.summary.map((item) => (
                  <div key={item.term} className="flex flex-col gap-1">
                    <dt className="text-sm font-semibold text-kiri-purple">{item.term}</dt>
                    <dd className="leading-relaxed text-kiri-ink/85">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
                <h2 id={`${section.id}-title`} className="font-serif text-2xl font-bold text-balance md:text-3xl">
                  {section.title}
                </h2>
                <SectionBody section={section} showCookieSettings={doc.href === "/politica-de-cookies" && section.id === "gestionar"} />
              </section>
            ))}

            <div className="flex flex-col gap-4 rounded-3xl border-2 border-kiri-lilac p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div className="flex flex-col gap-1">
                <p className="font-serif text-xl font-bold">¿Tienes alguna duda?</p>
                <p className="leading-relaxed text-kiri-ink/80">Escríbenos y te respondemos en un plazo máximo de un mes.</p>
              </div>
              <a
                href={`mailto:${LEGAL_CONTACT}?subject=${encodeURIComponent(doc.contactSubject)}`}
                className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-kiri-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-kiri-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2"
              >
                {LEGAL_CONTACT}
              </a>
            </div>

            <nav aria-labelledby="otras-politicas" className="flex flex-col gap-4 border-t border-kiri-lilac pt-8">
              <h2 id="otras-politicas" className="text-xs font-semibold uppercase tracking-widest text-kiri-ink/60">
                Otras políticas de Kiri
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-kiri-lilac px-4 py-3 font-medium text-kiri-ink transition-colors hover:border-kiri-purple hover:text-kiri-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-kiri-purple">
                        {"→"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {doc.back && (
              <Link href={doc.back.href} className={`self-start ${inlineLink}`}>
                {doc.back.label}
              </Link>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
