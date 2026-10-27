"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { es } from "date-fns/locale"
import { subYears } from "date-fns"
import { CalendarDays, Check, CircleAlert } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BIRTH_DATE_MESSAGES,
  checkBirthDate,
  describeAge,
  formatDisplayDate,
  formatIsoDate,
  getBirthDateBounds,
  parseDisplayDate,
  parseIsoDate,
} from "@/lib/birth-date"

type BirthDatePickerProps = {
  // ISO date (yyyy-MM-dd) or "" while the date is missing or invalid.
  value: string
  onChange: (isoDate: string) => void
  className?: string
}

// "12" -> "12", "1203" -> "12/03", "12032018" -> "12/03/2018"
function maskDate(raw: string, previous: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8)
  const day = digits.slice(0, 2)
  const month = digits.slice(2, 4)
  const year = digits.slice(4, 8)

  let masked = day
  if (digits.length > 2) masked += `/${month}`
  if (digits.length > 4) masked += `/${year}`

  const isTyping = raw.length > previous.length
  if (isTyping && (digits.length === 2 || digits.length === 4)) masked += "/"
  return masked
}

export default function BirthDatePicker({ value, onChange, className = "" }: BirthDatePickerProps) {
  const inputId = useId()
  const hintId = `${inputId}-hint`
  const inputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState(() => {
    const initial = parseIsoDate(value)
    return initial ? formatDisplayDate(initial) : ""
  })
  const [open, setOpen] = useState(false)
  const [touched, setTouched] = useState(false)

  const today = useMemo(() => new Date(), [])
  const { min, max } = useMemo(() => getBirthDateBounds(today), [today])

  const parsed = text.length === 10 ? parseDisplayDate(text) : null
  const check = text.length === 10 ? checkBirthDate(parsed, today) : null
  const isValid = check === "ok" && parsed !== null

  const errorMessage =
    check && check !== "ok"
      ? BIRTH_DATE_MESSAGES[check]
      : touched && text.length > 0 && text.length < 10
        ? "Escribe la fecha completa: DD/MM/AAAA."
        : null

  // Hooks into the browser's form validation so the "Siguiente" button blocks invalid dates.
  useEffect(() => {
    const message = text.length === 0 ? "" : (errorMessage ?? (isValid ? "" : "Escribe la fecha completa: DD/MM/AAAA."))
    inputRef.current?.setCustomValidity(message)
  }, [text, errorMessage, isValid])

  const commit = (nextText: string) => {
    setText(nextText)
    const date = nextText.length === 10 ? parseDisplayDate(nextText) : null
    onChange(date && checkBirthDate(date, today) === "ok" ? formatIsoDate(date) : "")
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    commit(maskDate(e.target.value, text))
  }

  const handleSelect = (date: Date | undefined) => {
    if (!date) return
    commit(formatDisplayDate(date))
    setTouched(true)
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className={className}>
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          name="childBirthDate"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Fecha de nacimiento (DD/MM/AAAA) *"
          aria-label="Fecha de nacimiento del niño/a"
          aria-describedby={hintId}
          aria-invalid={errorMessage ? true : undefined}
          maxLength={10}
          value={text}
          onChange={handleTextChange}
          onBlur={() => setTouched(true)}
          required
          className={`w-full pl-4 pr-14 py-3 rounded-xl border bg-white text-foreground placeholder:text-muted-foreground text-sm tabular-nums tracking-wide focus:outline-none focus:ring-2 transition-colors ${
            errorMessage
              ? "border-destructive focus:ring-destructive/30"
              : isValid
                ? "border-primary/60 focus:ring-primary/40"
                : "border-border focus:ring-primary/40"
          }`}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Abrir calendario para elegir la fecha"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <CalendarDays className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto p-0 rounded-2xl border-border bg-white shadow-xl">
            <div className="flex flex-col">
              <p className="px-4 pt-4 pb-1 text-xs text-muted-foreground leading-relaxed text-pretty">
                Elige primero el año y el mes, y después el día.
              </p>
              <Calendar
                mode="single"
                locale={es}
                weekStartsOn={1}
                captionLayout="dropdown"
                startMonth={min}
                endMonth={max}
                defaultMonth={isValid && parsed ? parsed : subYears(today, 6)}
                selected={isValid && parsed ? parsed : undefined}
                onSelect={handleSelect}
                disabled={{ before: min, after: max }}
                formatters={{
                  formatMonthDropdown: (date) => date.toLocaleString("es-ES", { month: "long" }),
                }}
                labels={{
                  labelMonthDropdown: () => "Mes de nacimiento",
                  labelYearDropdown: () => "Año de nacimiento",
                  labelNext: () => "Mes siguiente",
                  labelPrevious: () => "Mes anterior",
                }}
                className="bg-white [--cell-size:2.5rem]"
                classNames={{
                  dropdowns: "w-full flex items-center justify-center gap-2 h-[--cell-size] text-sm font-semibold capitalize",
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <p
        id={hintId}
        aria-live="polite"
        className={`mt-2 flex min-h-5 items-center gap-1.5 text-xs leading-relaxed ${
          errorMessage ? "text-destructive" : isValid ? "text-primary font-medium" : "text-muted-foreground"
        }`}
      >
        {errorMessage ? (
          <>
            <CircleAlert className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            {errorMessage}
          </>
        ) : isValid && parsed ? (
          <span className="flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-300">
            <Check className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            {describeAge(parsed, today)}
          </span>
        ) : (
          "Escríbela o pulsa el calendario. Debe tener menos de 18 años."
        )}
      </p>
    </div>
  )
}
