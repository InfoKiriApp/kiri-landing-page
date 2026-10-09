"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { ChevronRight, ChevronLeft, ArrowUpRight, Check } from "lucide-react"

const occasions = [
  "Primera Comunión",
  "Bautizo",
  "Cumpleaños",
  "Graduación",
  "Vuelta al colegio",
  "Navidad",
  "Otro",
]

const relationships = [
  "Padre/Madre",
  "Abuelo/Abuela",
  "Tío/Tía",
  "Amigo/a de la familia",
  "Otro",
]

// Spanish postal codes: 5 digits (00000-52999).
const SPANISH_POSTAL_REGEX = /^[0-5]\d{4}$/

const FORM_STEPS = ["Tus datos", "El niño/a", "Envío", "El regalo"] as const
const LAST_STEP = FORM_STEPS.length - 1

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

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"

const legendClass = "text-xs uppercase tracking-widest text-primary font-semibold mb-1"

export default function RegalaKiriPage() {
  const formTopRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    gifterFirstName: "",
    gifterLastName: "",
    gifterEmail: "",
    childFirstName: "",
    childLastName: "",
    relationship: "",
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    street: "",
    number: "",
    floor: "",
    postal: "",
    city: "",
    country: "España",
    occasion: "",
    message: "",
    wantsPersonalizedStory: false,
    childDescription: "",
    privacy: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [postalTouched, setPostalTouched] = useState(false)

  const SQUARE_CHECKOUT_URL =
    "https://checkout.square.site/merchant/ML80VD2C4SMJA/checkout/X2FBTHLVIZFD2NQOA3KACQ2Z"

  // The gifter is the parent → they go straight to account opening, no gift form.
  const isParent = form.relationship === "Padre/Madre"
  const showGiftForm = form.relationship !== "" && !isParent
  const postalValid = SPANISH_POSTAL_REGEX.test(form.postal.trim())
  const showPostalError = postalTouched && form.postal.trim().length > 0 && !postalValid

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const scrollToFormTop = () => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const goToStep = (target: number) => {
    setStep(target)
    scrollToFormTop()
  }

  const goNext = () => {
    // Only the current step's fields are mounted, so this validates just this page.
    if (!formRef.current?.reportValidity()) return
    if (step === 2 && !postalValid) {
      setPostalTouched(true)
      return
    }
    goToStep(Math.min(step + 1, LAST_STEP))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    if (step < LAST_STEP) {
      goNext()
      return
    }

    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch("/api/regala-kiri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data?.error ?? "No se pudo guardar tu solicitud. Inténtalo de nuevo en unos minutos.")
        setSubmitting(false)
        return
      }

      // Only redirect to Square checkout after a successful Google Sheets save.
      setSubmitted(true)
      window.location.href = SQUARE_CHECKOUT_URL
    } catch (err) {
      setError("Se produjo un error de conexión. Comprueba tu red e inténtalo de nuevo.")
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* How it works */}
        <section className="bg-muted pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center text-balance mb-14">
              ¿Cómo funciona el regalo?
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                      <h2 className="font-serif text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
                        {step.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-first lg:order-last">
                <Image
                  src="/images/regala-kiri-tarjeta.png"
                  alt="Tarjeta regalo Kiri abierta con un mensaje de felicitación y su sobre morado"
                  width={1200}
                  height={900}
                  priority
                  className="w-full h-auto rounded-3xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form + image */}
        <section className="bg-background py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div ref={formTopRef} className="scroll-mt-28">
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
                    Hemos guardado tu solicitud correctamente. Te estamos redirigiendo a la página de pago segura para completar tu regalo de €29 con el Welcome Pack incluido.
                  </p>
                  <a
                    href={SQUARE_CHECKOUT_URL}
                    className="inline-flex mt-6 text-primary text-sm font-semibold underline underline-offset-4 hover:text-accent transition-colors"
                  >
                    Si no se abre automáticamente, haz clic aquí para pagar
                  </a>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* First question: relationship */}
                  <div className="rounded-2xl border-2 border-primary bg-primary/5 p-5 md:p-6 shadow-sm ring-4 ring-primary/10">
                    <label
                      htmlFor="relationship"
                      className="block font-serif text-lg md:text-xl font-bold text-foreground leading-snug mb-1"
                    >
                      ¿Quién eres para el niño/a? <span className="text-primary">*</span>
                    </label>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Empecemos por aquí: según tu respuesta te llevaremos por el camino más corto.
                    </p>
                    <select
                      id="relationship"
                      name="relationship"
                      value={form.relationship}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-primary/40 bg-white text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="" disabled>Selecciona tu relación</option>
                      {relationships.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  {/* Parent: only the open-account pop-up */}
                  {isParent && (
                    <div
                      role="status"
                      className="flex flex-col items-center text-center gap-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/25 p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-500 ease-out"
                    >
                      <Image
                        src="/images/piggy.png"
                        alt="Cerdito hucha de Kiri rodeado de monedas"
                        width={140}
                        height={168}
                        className="w-28 md:w-32 h-auto animate-in zoom-in-50 duration-500 delay-100"
                      />
                      <p className="text-sm md:text-base font-semibold text-foreground leading-relaxed text-balance">
                        Si eres el Papá o la Mamá, por favor dirígete a Abre tu Cuenta. Desde allí, podrás comenzar toda la experiencia de Kiri de forma directa.
                      </p>
                      <a
                        href="https://cuenta.kiriapp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                      >
                        Abre tu cuenta
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <p className="text-xs text-muted-foreground">Gracias por confiar en Kiri.</p>
                    </div>
                  )}

                  {/* Everyone else: multi-page gift form */}
                  {showGiftForm && (
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-500"
                    >
                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-foreground">
                            Paso {step + 1} de {FORM_STEPS.length}
                            <span className="text-muted-foreground font-normal"> · {FORM_STEPS[step]}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="text-primary font-semibold">*</span> obligatorio
                          </p>
                        </div>
                        <ol className="flex items-center gap-2" aria-label="Progreso del formulario">
                          {FORM_STEPS.map((label, i) => {
                            const done = i < step
                            const current = i === step
                            return (
                              <li key={label} className="flex-1">
                                <button
                                  type="button"
                                  disabled={!done}
                                  onClick={() => goToStep(i)}
                                  aria-current={current ? "step" : undefined}
                                  aria-label={`${label}${done ? " (completado, volver)" : ""}`}
                                  className={`block h-2 w-full rounded-full transition-colors duration-300 ${
                                    done
                                      ? "bg-primary cursor-pointer hover:bg-accent"
                                      : current
                                        ? "bg-primary/60"
                                        : "bg-border"
                                  } disabled:cursor-default`}
                                />
                              </li>
                            )
                          })}
                        </ol>
                      </div>

                      <div key={step} className="animate-in fade-in slide-in-from-right-4 duration-300">
                        {step === 0 && (
                          <fieldset className="flex flex-col gap-4">
                            <legend className={legendClass}>Tus datos</legend>
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                name="gifterFirstName"
                                placeholder="Nombre *"
                                aria-label="Tu nombre"
                                autoComplete="given-name"
                                value={form.gifterFirstName}
                                onChange={handleChange}
                                required
                                className={inputClass}
                              />
                              <input
                                type="text"
                                name="gifterLastName"
                                placeholder="Apellidos *"
                                aria-label="Tus apellidos"
                                autoComplete="family-name"
                                value={form.gifterLastName}
                                onChange={handleChange}
                                required
                                className={inputClass}
                              />
                            </div>
                            <input
                              type="email"
                              name="gifterEmail"
                              placeholder="Tu correo electrónico *"
                              aria-label="Tu correo electrónico"
                              autoComplete="email"
                              value={form.gifterEmail}
                              onChange={handleChange}
                              required
                              className={inputClass}
                            />
                          </fieldset>
                        )}

                        {step === 1 && (
                          <div className="flex flex-col gap-6">
                            <fieldset className="flex flex-col gap-4">
                              <legend className={legendClass}>Datos del niño/a</legend>
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  name="childFirstName"
                                  placeholder="Nombre *"
                                  aria-label="Nombre del niño/a"
                                  value={form.childFirstName}
                                  onChange={handleChange}
                                  required
                                  className={inputClass}
                                />
                                <input
                                  type="text"
                                  name="childLastName"
                                  placeholder="Apellidos *"
                                  aria-label="Apellidos del niño/a"
                                  value={form.childLastName}
                                  onChange={handleChange}
                                  required
                                  className={inputClass}
                                />
                              </div>
                            </fieldset>

                            <fieldset className="flex flex-col gap-4 rounded-xl bg-muted/60 border border-border p-4">
                              <legend className={`${legendClass} px-1`}>Padre, madre o tutor</legend>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Necesitamos sus datos para enviarle el código con el que podrá crear la cuenta del niño/a.
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  name="parentFirstName"
                                  placeholder="Nombre del padre/madre/tutor *"
                                  aria-label="Nombre del padre, madre o tutor"
                                  value={form.parentFirstName}
                                  onChange={handleChange}
                                  required
                                  className={inputClass}
                                />
                                <input
                                  type="text"
                                  name="parentLastName"
                                  placeholder="Apellidos *"
                                  aria-label="Apellidos del padre, madre o tutor"
                                  value={form.parentLastName}
                                  onChange={handleChange}
                                  required
                                  className={inputClass}
                                />
                              </div>
                              <input
                                type="email"
                                name="parentEmail"
                                placeholder="Correo del padre/madre/tutor *"
                                aria-label="Correo del padre, madre o tutor"
                                value={form.parentEmail}
                                onChange={handleChange}
                                required
                                className={inputClass}
                              />
                            </fieldset>
                          </div>
                        )}

                        {step === 2 && (
                          <fieldset className="flex flex-col gap-4">
                            <legend className={legendClass}>Dirección de envío del niño/a</legend>
                            <input
                              type="text"
                              name="street"
                              placeholder="Calle / vía *"
                              aria-label="Calle o vía"
                              autoComplete="address-line1"
                              value={form.street}
                              onChange={handleChange}
                              required
                              className={inputClass}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                name="number"
                                placeholder="Número *"
                                aria-label="Número"
                                value={form.number}
                                onChange={handleChange}
                                required
                                className={inputClass}
                              />
                              <input
                                type="text"
                                name="floor"
                                placeholder="Piso, puerta (opcional)"
                                aria-label="Piso y puerta (opcional)"
                                autoComplete="address-line2"
                                value={form.floor}
                                onChange={handleChange}
                                className={inputClass}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1">
                                <input
                                  type="text"
                                  name="postal"
                                  inputMode="numeric"
                                  placeholder="Código postal *"
                                  aria-label="Código postal"
                                  autoComplete="postal-code"
                                  value={form.postal}
                                  onChange={handleChange}
                                  onBlur={() => setPostalTouched(true)}
                                  required
                                  aria-invalid={showPostalError}
                                  className={`w-full px-4 py-3 rounded-xl border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 ${
                                    showPostalError
                                      ? "border-destructive focus:ring-destructive/40"
                                      : "border-border focus:ring-primary/40"
                                  }`}
                                />
                                {showPostalError && (
                                  <span className="text-xs text-destructive">
                                    Código postal no válido
                                  </span>
                                )}
                              </div>
                              <input
                                type="text"
                                name="city"
                                placeholder="Población *"
                                aria-label="Población"
                                autoComplete="address-level2"
                                value={form.city}
                                onChange={handleChange}
                                required
                                className={inputClass}
                              />
                            </div>
                            <select
                              name="country"
                              aria-label="País"
                              value={form.country}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            >
                              <option value="España">España</option>
                            </select>
                          </fieldset>
                        )}

                        {step === 3 && (
                          <div className="flex flex-col gap-6">
                            <fieldset className="flex flex-col gap-4">
                              <legend className={legendClass}>El regalo</legend>
                              <select
                                name="occasion"
                                aria-label="Ocasión del regalo"
                                value={form.occasion}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                              >
                                <option value="" disabled>Ocasión del regalo *</option>
                                {occasions.map((o) => (
                                  <option key={o} value={o}>{o}</option>
                                ))}
                              </select>
                              <textarea
                                name="message"
                                placeholder="Mensaje personal para el futuro (opcional)"
                                aria-label="Mensaje personal para el futuro (opcional)"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                className={`${inputClass} resize-none`}
                              />

                              <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="wantsPersonalizedStory"
                                  checked={form.wantsPersonalizedStory}
                                  onChange={handleChange}
                                  className="mt-1 accent-primary flex-shrink-0"
                                />
                                <span className="text-sm text-foreground">
                                  Quiero recibir una mini historia personalizada sobre educación financiera para el niño / la niña
                                </span>
                              </label>

                              {form.wantsPersonalizedStory && (
                                <textarea
                                  name="childDescription"
                                  placeholder="Cuéntanos sobre tu hijo/a: edad, intereses, personalidad, hobbies... esto nos ayudará a personalizar la historia"
                                  aria-label="Descripción del niño/a para personalizar la historia"
                                  value={form.childDescription}
                                  onChange={handleChange}
                                  rows={4}
                                  className={`${inputClass} resize-none`}
                                />
                              )}
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
                                </Link>{" "}
                                <span className="text-primary font-semibold">*</span>
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

                            {error && (
                              <p
                                role="alert"
                                className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-xl px-4 py-3"
                              >
                                {error}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Navigation */}
                      <div className="flex items-center gap-3">
                        {step > 0 && (
                          <button
                            type="button"
                            onClick={() => goToStep(step - 1)}
                            className="inline-flex items-center justify-center gap-1 px-5 py-3.5 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Atrás
                          </button>
                        )}
                        {step < LAST_STEP ? (
                          <button
                            type="button"
                            onClick={goNext}
                            className="flex-1 inline-flex items-center justify-center gap-1 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-accent transition-colors duration-300 text-sm"
                          >
                            Siguiente
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-accent transition-colors duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {submitting ? (
                              "Guardando tu regalo…"
                            ) : (
                              <>
                                <Check className="w-4 h-4" />
                                Regalar Kiri por €29
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
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
      <Footer />
    </>
  )
}
