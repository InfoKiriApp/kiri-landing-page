"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ArrowLeft, ArrowRight, Check, Loader2, X } from "lucide-react"
import { StepData, StepRole, StepSend } from "./steps"
import {
  STEPS,
  areaOption,
  type ApplicationForm,
  type Errors,
  type StepNumber,
} from "@/lib/application"
import type { JobArea } from "@/lib/careers"
import { fireKiriConfetti } from "@/lib/confetti"

export type ApplicationController = {
  open: boolean
  step: StepNumber
  form: ApplicationForm
  errors: Errors
  showAreaQuestion: boolean
  submitting: boolean
  success: boolean
  confirmClose: boolean
  fileError?: string
  focusTick: number
  update: <K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) => void
  selectArea: (area: JobArea) => void
  showAreaPicker: () => void
  setCv: (file: File) => void
  removeCv: () => void
  goBack: () => void
  goNext: () => void
  goToStep: (step: StepNumber) => void
  requestClose: () => void
  keepEditing: () => void
  closeNow: () => void
  finish: () => void
}

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-kiri-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-kiri-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full border border-kiri-purple/30 px-5 py-3 text-sm font-semibold text-kiri-purple transition-colors hover:bg-kiri-lilac/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2"

function Progress({ step }: { step: StepNumber }) {
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Progreso de la candidatura">
      {STEPS.map((item) => {
        const state = item.number < step ? "done" : item.number === step ? "current" : "todo"
        return (
          <li key={item.number} aria-current={state === "current" ? "step" : undefined} className="flex flex-col gap-2">
            <span
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-colors duration-300 ${
                state === "todo" ? "bg-kiri-lilac" : "bg-kiri-purple"
              }`}
            />
            <span
              className={`flex items-center gap-1.5 text-xs font-semibold ${
                state === "todo" ? "text-kiri-ink/50" : "text-kiri-purple"
              }`}
            >
              {state === "done" ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <span aria-hidden="true">{item.number}</span>
              )}
              <span>{item.label}</span>
              <span className="sr-only">{state === "done" ? " (completado)" : state === "current" ? " (paso actual)" : ""}</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export default function ApplicationModal({ c }: { c: ApplicationController }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const area = areaOption(c.form.area)
  const firstName = c.form.fullName.trim().split(/\s+/)[0]

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [c.step, c.success])

  useEffect(() => {
    if (!c.focusTick) return
    const invalid = bodyRef.current?.querySelector<HTMLElement>('[data-invalid="true"]')
    if (!invalid) return
    const target = invalid.matches("input, textarea, button")
      ? invalid
      : invalid.querySelector<HTMLElement>("input, textarea, button")
    target?.focus()
    invalid.scrollIntoView({ block: "center", behavior: "smooth" })
  }, [c.focusTick])

  useEffect(() => {
    if (c.success) fireKiriConfetti()
  }, [c.success])

  return (
    <DialogPrimitive.Root open={c.open} onOpenChange={(next) => !next && c.requestClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-kiri-ink/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col bg-white outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-[min(90vh,54rem)] sm:w-[calc(100%-2rem)] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:shadow-2xl"
        >
          <DialogPrimitive.Description className="sr-only">
            Formulario de candidatura en tres pasos: tus datos, sobre el puesto y envío.
          </DialogPrimitive.Description>

          {c.success ? (
            <>
              <div ref={bodyRef} className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-10 text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-[2rem] bg-gradient-to-br from-kiri-blush via-kiri-lilac to-kiri-lilac">
                  <Image
                    src="/images/kiri-tree-full.png"
                    alt="El árbol de Kiri, floreciendo"
                    fill
                    sizes="10rem"
                    className="object-contain p-4"
                  />
                </div>
                <div className="flex max-w-md flex-col gap-3">
                  <DialogPrimitive.Title className="font-serif text-3xl font-bold text-kiri-ink text-balance">
                    ¡Gracias, {firstName}!
                  </DialogPrimitive.Title>
                  <p className="text-base leading-relaxed text-kiri-ink/70 text-pretty">
                    Hemos recibido tu candidatura para{" "}
                    <strong className="font-semibold text-kiri-ink">{area?.name}</strong>. Revisamos todas las
                    candidaturas y te escribiremos en los próximos días.
                  </p>
                </div>
              </div>
              <div className="flex justify-center border-t border-kiri-lilac px-6 py-4">
                <button type="button" autoFocus onClick={c.finish} className={`${primaryButton} w-full sm:w-auto`}>
                  Volver a la página
                </button>
              </div>
            </>
          ) : (
            <>
              <header className="flex flex-col gap-4 border-b border-kiri-lilac px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <DialogPrimitive.Title className="font-serif text-2xl font-bold text-kiri-ink">
                      Tu candidatura
                    </DialogPrimitive.Title>
                    {area && !c.showAreaQuestion && (
                      <p className="flex flex-wrap items-center gap-x-2 text-sm text-kiri-ink/70">
                        <span>
                          Aplicando a:{" "}
                          <strong className="font-semibold text-kiri-ink">
                            {area.emoji} {area.name}
                          </strong>
                        </span>
                        <button
                          type="button"
                          onClick={c.showAreaPicker}
                          className="rounded text-sm font-semibold text-kiri-purple underline underline-offset-4 hover:text-kiri-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple"
                        >
                          cambiar
                        </button>
                      </p>
                    )}
                  </div>
                  <DialogPrimitive.Close
                    aria-label="Cerrar candidatura"
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-kiri-ink/70 transition-colors hover:bg-kiri-lilac/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </DialogPrimitive.Close>
                </div>
                <Progress step={c.step} />
              </header>

              <div ref={bodyRef} className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
                {c.step === 1 && (
                  <StepData
                    form={c.form}
                    update={c.update}
                    errors={c.errors}
                    showAreaQuestion={c.showAreaQuestion}
                    onSelectArea={c.selectArea}
                    cvError={c.fileError}
                    onCv={c.setCv}
                    onRemoveCv={c.removeCv}
                  />
                )}
                {c.step === 2 && <StepRole form={c.form} update={c.update} errors={c.errors} />}
                {c.step === 3 && (
                  <StepSend form={c.form} update={c.update} errors={c.errors} onEdit={c.goToStep} />
                )}
              </div>

              <footer className="border-t border-kiri-lilac bg-white px-5 py-4 sm:rounded-b-3xl sm:px-8">
                {c.confirmClose ? (
                  <div role="alert" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm leading-relaxed text-kiri-ink">
                      ¿Cerrar la candidatura? Guardaremos lo que has escrito hasta que recargues la página.
                    </p>
                    <div className="flex gap-2">
                      <button type="button" autoFocus onClick={c.keepEditing} className={`${primaryButton} flex-1 sm:flex-none`}>
                        Seguir editando
                      </button>
                      <button type="button" onClick={c.closeNow} className={`${secondaryButton} flex-1 sm:flex-none`}>
                        Cerrar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    {c.step > 1 ? (
                      <button type="button" onClick={c.goBack} disabled={c.submitting} className={secondaryButton}>
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Atrás
                      </button>
                    ) : (
                      <span />
                    )}
                    <button type="button" onClick={c.goNext} disabled={c.submitting} className={primaryButton}>
                      {c.step === 3 ? (
                        c.submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Enviando…
                          </>
                        ) : (
                          "Enviar candidatura"
                        )
                      ) : (
                        <>
                          Siguiente
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </footer>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
