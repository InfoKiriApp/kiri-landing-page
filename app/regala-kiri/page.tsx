"use client"

import Header from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

const occasions = [
  "Primera Comunión",
  "Bautizo",
  "Cumpleaños",
  "Graduación",
  "Vuelta al colegio",
  "Navidad",
  "Otro",
]

const steps = [
  {
    number: "1",
    title: "Introduce los datos del regalo",
    description:
      "Rellena el formulario con la información del regalo: tus datos como la persona que regala, los datos del niño/a (nombre y su dirección de casa) y la ocasión del regalo (Primera Comunión, cumpleaños, graduación).",
  },
  {
    number: "2",
    title: "Regala el alta por €29 con Welcome Pack incluido",
    description:
      "Realiza un pago único de €29 para crear el alta de la cuenta Kiri que le vas a regalar. El Welcome Pack está incluido y es parte de su experiencia de bienvenida, junto con un mensaje personalizado para su futuro y un montón de sorpresas.",
  },
  {
    number: "3",
    title: "Confirmación y entrega del regalo",
    description:
      "Una vez recibida su información, enviaremos el Welcome Pack a su casa para que plante la semilla de Kiri y comience su aventura de ahorro e inversión. El Welcome Pack incluye un código gratuito para que el padre, madre o tutor pueda crear la cuenta, junto con todas las instrucciones sobre cómo funciona el proceso.",
  },
]

export default function RegalaKiriPage() {
  const [form, setForm] = useState({
    gifterName: "",
    gifterEmail: "",
    childName: "",
    childAddress: "",
    childCity: "",
    childPostal: "",
    occasion: "",
    message: "",
    privacy: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-primary pt-32 pb-20 px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-purple-200 font-semibold mb-4">
              Regala Kiri
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white text-balance leading-tight mb-6">
              Su primera Comunión,<br className="hidden md:block" /> su primera Inversión.
            </h1>
            <p className="text-purple-200 text-base md:text-lg leading-relaxed mb-8 text-balance">
              La cuenta de inversión para niños que les asegura un futuro mejor.
            </p>
            <p className="text-purple-300 text-sm leading-relaxed max-w-2xl mx-auto">
              Kiri es agente bancario de MyInvestor Banco S.A. Los ahorros de nuestros clientes están garantizados por el Fondo de Garantía de Depósito español. MyInvestor es un banco experto en inversión, respaldado por el Grupo Andbank, El Corte Inglés Seguros, AXA España y varios family offices españoles. MyInvestor Banco S.A. es una entidad supervisada por el Banco de España y la CNMV.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-14">
              ¿Cómo funciona el regalo?
            </h2>
            <div className="flex flex-col gap-0">
              {steps.map((step, i) => (
                <div key={step.number} className="flex gap-6 items-start">
                  {/* Step line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.number}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-2 mb-0" style={{ minHeight: "2.5rem" }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-10 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form + image */}
        <section className="bg-background py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                Completa tu regalo
              </h2>
              {submitted ? (
                <div className="bg-primary/8 border border-primary/20 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <ChevronRight className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    ¡Gracias por tu regalo!
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Hemos recibido tu solicitud. En breve nos pondremos en contacto contigo para completar el proceso de pago y envío del Welcome Pack.
                  </p>
                  <Link href="/" className="inline-flex mt-6 text-primary text-sm font-semibold underline underline-offset-4 hover:text-accent transition-colors">
                    Volver al inicio
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                      Tus datos
                    </legend>
                    <input
                      type="text"
                      name="gifterName"
                      placeholder="Tu nombre completo"
                      value={form.gifterName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                      type="email"
                      name="gifterEmail"
                      placeholder="Tu correo electrónico"
                      value={form.gifterEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </fieldset>

                  <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                      Datos del niño/a
                    </legend>
                    <input
                      type="text"
                      name="childName"
                      placeholder="Nombre del niño o niña"
                      value={form.childName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                      type="text"
                      name="childAddress"
                      placeholder="Dirección de envío"
                      value={form.childAddress}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="childCity"
                        placeholder="Ciudad"
                        value={form.childCity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                      <input
                        type="text"
                        name="childPostal"
                        placeholder="Código postal"
                        value={form.childPostal}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </fieldset>

                  <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                      El regalo
                    </legend>
                    <select
                      name="occasion"
                      value={form.occasion}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="" disabled>Ocasión del regalo</option>
                      {occasions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <textarea
                      name="message"
                      placeholder="Mensaje personal para el futuro (opcional)"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                    />
                  </fieldset>

                  <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={form.privacy}
                      onChange={handleChange}
                      required
                      className="mt-0.5 accent-primary"
                    />
                    <span>
                      Acepto compartir mis datos y la{" "}
                      <Link href="#" className="text-primary underline underline-offset-4 hover:text-accent">
                        política de privacidad
                      </Link>
                    </span>
                  </label>

                  {/* Price callout */}
                  <div className="bg-primary/8 border border-primary/20 rounded-2xl px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">Pago único</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Welcome Pack incluido</p>
                    </div>
                    <p className="font-serif text-2xl font-bold text-primary">€29</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-accent transition-colors duration-300 text-sm"
                  >
                    Regalar Kiri por €29
                  </button>
                </form>
              )}
            </div>

            {/* Image */}
            <div className="lg:sticky lg:top-28">
              <Image
                src="/images/regalos-kiri.png"
                alt="Tarjeta regalo Kiri con sobre"
                width={600}
                height={440}
                className="w-full h-auto rounded-3xl object-cover"
              />
              <p className="text-xs text-muted-foreground leading-relaxed mt-6 text-center">
                Kiri es agente bancario de MyInvestor Banco S.A., supervisado por el Banco de España y la CNMV. Tus ahorros están garantizados por el Fondo de Garantía de Depósitos Español.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
