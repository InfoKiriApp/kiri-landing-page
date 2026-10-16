import {
  addDays,
  differenceInMonths,
  differenceInYears,
  format,
  isValid,
  parse,
  startOfDay,
  subYears,
} from "date-fns"

export const MAX_CHILD_AGE = 17

export type BirthDateCheck = "ok" | "invalid" | "future" | "too-old"

export const BIRTH_DATE_MESSAGES: Record<Exclude<BirthDateCheck, "ok">, string> = {
  invalid: "Esa fecha no existe. Usa el formato DD/MM/AAAA.",
  future: "La fecha de nacimiento no puede ser futura.",
  "too-old": "El niño/a debe tener menos de 18 años.",
}

// Oldest allowed birth date = the day after the 18th birthday would have happened.
export function getBirthDateBounds(today: Date = new Date()) {
  const max = startOfDay(today)
  const min = addDays(subYears(max, MAX_CHILD_AGE + 1), 1)
  return { min, max }
}

function parseStrict(text: string, pattern: string, shape: RegExp): Date | null {
  if (!shape.test(text)) return null
  const date = parse(text, pattern, new Date())
  if (!isValid(date) || format(date, pattern) !== text) return null
  return date
}

export function parseDisplayDate(text: string): Date | null {
  return parseStrict(text, "dd/MM/yyyy", /^\d{2}\/\d{2}\/\d{4}$/)
}

export function parseIsoDate(iso: string): Date | null {
  return parseStrict(iso, "yyyy-MM-dd", /^\d{4}-\d{2}-\d{2}$/)
}

export function formatDisplayDate(date: Date): string {
  return format(date, "dd/MM/yyyy")
}

export function formatIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd")
}

export function checkBirthDate(date: Date | null, today: Date = new Date()): BirthDateCheck {
  if (!date) return "invalid"
  const { min, max } = getBirthDateBounds(today)
  if (date > max) return "future"
  if (date < min) return "too-old"
  return "ok"
}

export function describeAge(date: Date, today: Date = new Date()): string {
  const years = differenceInYears(today, date)
  const months = differenceInMonths(today, date) % 12
  const yearsText = `${years} ${years === 1 ? "año" : "años"}`
  const monthsText = `${months} ${months === 1 ? "mes" : "meses"}`

  if (years === 0 && months === 0) return "Tiene menos de un mes"
  if (years === 0) return `Tiene ${monthsText}`
  if (months === 0) return `Tiene ${yearsText}`
  return `Tiene ${yearsText} y ${monthsText}`
}

// Today's calendar date in Spain, so server-side validation matches what families see.
export function getTodayInSpain(): Date {
  const iso = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date())
  return parseIsoDate(iso) ?? new Date()
}
