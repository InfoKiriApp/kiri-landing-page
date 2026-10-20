import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PRIVACY_CONTACT, PRIVACY_SECTIONS, PRIVACY_SUMMARY, PRIVACY_UPDATED } from "@/lib/privacy"

const DESCRIPTION =
  "Cómo trata Kiri los datos personales de las personas que se presentan a sus procesos de selección: qué datos recogemos, para qué, cuánto tiempo y cuáles son tus derechos."

export const metadata: Metadata = {
  title: "Política de privacidad para candidatos | Kiri",
  description: DESCRIPTION,
  openGraph: {
    title: "Política de privacidad para candidatos | Kiri",
    description: DESCRIPTION,
    type: "website",
    locale: "es_ES",
  },
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white text-kiri-ink">
      <Header />
      <main>
        <section className="border-b border-kiri-lilac bg-kiri-lilac/30 px-6 pt-12 pb-14 md:pt-16 md:pb-16">
          <div className="mx-auto flex max-w-5xl flex-col gap-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-kiri-purple">Procesos de selección</p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-balance md:text-5xl">
              Política de privacidad para candidatos
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-pretty text-kiri-ink/80">
              Cuando te presentas a una oferta de Kiri nos confías tus datos. Aquí te explicamos, sin letra pequeña, qué
              hacemos con ellos.
            </p>
            <p className="text-sm text-kiri-ink/70">
              Última actualización: <time dateTime={PRIVACY_UPDATED.iso}>{PRIVACY_UPDATED.label}</time>
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-14 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <nav aria-label="Índice de la política" className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-kiri-ink/60">En esta página</p>
            <ol className="flex flex-col gap-1 border-l-2 border-kiri-lilac">
              {PRIVACY_SECTIONS.map((section) => (
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
                {PRIVACY_SUMMARY.map((item) => (
                  <div key={item.term} className="flex flex-col gap-1">
                    <dt className="text-sm font-semibold text-kiri-purple">{item.term}</dt>
                    <dd className="leading-relaxed text-kiri-ink/85">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            {PRIVACY_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
                <h2 id={`${section.id}-title`} className="font-serif text-2xl font-bold text-balance md:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-4 flex flex-col gap-4 leading-relaxed text-kiri-ink/85">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-pretty">
                      {paragraph}
                    </p>
                  ))}
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
                </div>
              </section>
            ))}

            <div className="flex flex-col gap-4 rounded-3xl border-2 border-kiri-lilac p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div className="flex flex-col gap-1">
                <p className="font-serif text-xl font-bold">¿Tienes alguna duda sobre tus datos?</p>
                <p className="leading-relaxed text-kiri-ink/80">Escríbenos y te respondemos en un plazo máximo de un mes.</p>
              </div>
              <a
                href={`mailto:${PRIVACY_CONTACT}?subject=${encodeURIComponent("Privacidad - proceso de selección")}`}
                className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-kiri-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-kiri-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2"
              >
                {PRIVACY_CONTACT}
              </a>
            </div>

            <Link
              href="/trabaja-con-nosotros"
              className="self-start font-semibold text-kiri-purple underline underline-offset-4 hover:text-kiri-magenta"
            >
              Volver a Trabaja con nosotros
            </Link>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
