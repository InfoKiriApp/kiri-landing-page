import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LEGAL_CONTACT } from "@/lib/legal/shared"

export const metadata: Metadata = {
  title: "¡Gracias por tu regalo! | Kiri",
  description: "Hemos recibido los datos de tu regalo Kiri. Esto es lo que pasa ahora.",
  robots: { index: false, follow: true },
}

const nextSteps = [
  {
    title: "Hemos guardado los datos del regalo",
    description: "Ya tenemos la información del niño o la niña, la ocasión y tu mensaje.",
  },
  {
    title: "Square gestiona el pago",
    description:
      "Square confirma tu pedido y, si has usado un código de descuento, el pedido queda confirmado igualmente.",
  },
  {
    title: "Kiri prepara el regalo",
    description:
      "Nuestro equipo se encarga de los siguientes pasos con el padre, la madre o el tutor legal.",
  },
]

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export default function GraciasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-muted px-4 pb-20 pt-32 md:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span
              className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-hidden="true"
            >
              <Check className="size-7" strokeWidth={3} />
            </span>
            <h1 className="mt-6 text-balance font-serif text-3xl font-bold text-foreground md:text-5xl">
              ¡Gracias por tu regalo!
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Has dado el primer paso para que un niño o una niña empiece con buen pie su futuro financiero. Esto es lo
              que pasa ahora.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20" aria-labelledby="que-pasa-ahora">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="que-pasa-ahora" className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Qué pasa ahora
              </h2>
              <ol className="mt-8 flex flex-col">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-5">
                    <div className="flex flex-col items-center self-stretch">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      {index < nextSteps.length - 1 && <span className="mt-2 min-h-8 w-px flex-1 bg-border" />}
                    </div>
                    <div className={index < nextSteps.length - 1 ? "pb-8" : ""}>
                      <h3 className="font-serif text-lg font-bold leading-snug text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Image
              src="/images/regala-kiri-tarjeta.png"
              alt="Tarjeta regalo Kiri abierta con un mensaje de felicitación y su sobre morado"
              width={1200}
              height={900}
              className="h-auto w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8" aria-labelledby="mientras-tanto">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl bg-card p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <h2 id="mientras-tanto" className="font-serif text-xl font-bold text-foreground md:text-2xl">
                Mientras tanto, sigue aprendiendo
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                En Kiri Academy encontrarás guías y juegos para hablar de dinero con niños y niñas de cualquier edad.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
              <Link
                href="/kiri-academy"
                className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent ${linkFocus}`}
              >
                Ir a Kiri Academy
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/"
                className={`inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted ${linkFocus}`}
              >
                Volver al inicio
              </Link>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-5xl text-center text-sm text-muted-foreground">
            ¿Algo no cuadra con tu pedido? Escríbenos a{" "}
            <a
              href={`mailto:${LEGAL_CONTACT}?subject=${encodeURIComponent("Mi regalo Kiri")}`}
              className={`rounded-sm font-semibold text-primary underline underline-offset-4 hover:text-accent ${linkFocus}`}
            >
              {LEGAL_CONTACT}
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
