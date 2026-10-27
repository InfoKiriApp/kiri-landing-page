"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import ApplicationModal, { type ApplicationController } from "./modal"
import {
  EMPTY_FORM,
  ROLE_ANSWERS_CLEARED,
  buildPayload,
  isDirty,
  validateCv,
  validateStep,
  type ApplicationForm,
  type StepNumber,
} from "@/lib/application"
import type { JobArea } from "@/lib/careers"

type ApplicationContextValue = {
  openApplication: (area?: JobArea) => void
}

const ApplicationContext = createContext<ApplicationContextValue | null>(null)

function useApplication() {
  const context = useContext(ApplicationContext)
  if (!context) throw new Error("useApplication debe usarse dentro de ApplicationProvider")
  return context
}

export function ApplyButton({
  area,
  className,
  children,
}: {
  area?: JobArea
  className?: string
  children: ReactNode
}) {
  const { openApplication } = useApplication()
  return (
    <button type="button" onClick={() => openApplication(area)} className={className}>
      {children}
    </button>
  )
}

const hasErrors = (step: StepNumber, form: ApplicationForm) => Object.keys(validateStep(step, form)).length > 0

export default function ApplicationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM)
  const [step, setStep] = useState<StepNumber>(1)
  const [attempted, setAttempted] = useState(false)
  const [showAreaQuestion, setShowAreaQuestion] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [confirmClose, setConfirmClose] = useState(false)
  const [fileError, setFileError] = useState<string | undefined>()
  const [focusTick, setFocusTick] = useState(0)
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (submitTimer.current) clearTimeout(submitTimer.current)
    }
  }, [])

  const update: ApplicationController["update"] = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }))

  const selectArea = (area: JobArea) => {
    if (form.area === area) return
    setForm((current) => ({ ...current, ...ROLE_ANSWERS_CLEARED, area }))
    setStep((current) => (current > 2 ? 2 : current))
  }

  const openApplication = (area?: JobArea) => {
    if (area) {
      selectArea(area)
      setShowAreaQuestion(false)
    } else {
      setShowAreaQuestion(true)
    }
    setConfirmClose(false)
    setOpen(true)
  }

  const resetAll = () => {
    setForm(EMPTY_FORM)
    setStep(1)
    setAttempted(false)
    setSuccess(false)
    setSubmitting(false)
    setFileError(undefined)
    setConfirmClose(false)
    setShowAreaQuestion(true)
  }

  const finish = () => {
    setOpen(false)
    resetAll()
  }

  const requestClose = () => {
    if (submitting) return
    if (success) return finish()
    if (confirmClose) return setConfirmClose(false)
    if (isDirty(form)) return setConfirmClose(true)
    setOpen(false)
  }

  const showFirstError = () => {
    setAttempted(true)
    setFocusTick((tick) => tick + 1)
  }

  const goToStep = (next: StepNumber) => {
    setStep(next)
    setAttempted(false)
  }

  const submit = () => {
    const invalidStep = ([1, 2, 3] as const).find((s) => hasErrors(s, form))
    if (invalidStep) {
      if (invalidStep !== step) setStep(invalidStep)
      showFirstError()
      return
    }
    setSubmitting(true)
    submitTimer.current = setTimeout(() => {
      console.log("Candidatura simulada (prototipo, no se envía a ningún servidor):", buildPayload(form))
      setSubmitting(false)
      setSuccess(true)
    }, 1500)
  }

  const goNext = () => {
    if (hasErrors(step, form)) return showFirstError()
    if (step === 3) return submit()
    goToStep((step + 1) as StepNumber)
  }

  const controller: ApplicationController = {
    open,
    step,
    form,
    errors: attempted ? validateStep(step, form) : {},
    showAreaQuestion,
    submitting,
    success,
    confirmClose,
    fileError,
    focusTick,
    update,
    selectArea,
    showAreaPicker: () => {
      setShowAreaQuestion(true)
      goToStep(1)
    },
    setCv: (file) => {
      const error = validateCv(file)
      setFileError(error ?? undefined)
      if (!error) update("cv", file)
    },
    removeCv: () => {
      setFileError(undefined)
      update("cv", null)
    },
    goBack: () => goToStep(Math.max(1, step - 1) as StepNumber),
    goNext,
    goToStep,
    requestClose,
    keepEditing: () => setConfirmClose(false),
    closeNow: () => {
      setConfirmClose(false)
      setOpen(false)
    },
    finish,
  }

  return (
    <ApplicationContext.Provider value={{ openApplication }}>
      {children}
      <ApplicationModal c={controller} />
    </ApplicationContext.Provider>
  )
}
