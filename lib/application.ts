import type { JobArea } from "@/lib/careers"

export type Choice = { value: string; label: string }

export const AREA_OPTIONS: (Choice & { value: JobArea; emoji: string; name: string })[] = [
  { value: "tech", emoji: "💻", name: "Tech & Product", label: "💻 Tech & Product" },
  {
    value: "operaciones",
    emoji: "📊",
    name: "Operaciones y Desarrollo de Negocio",
    label: "📊 Operaciones y Desarrollo de Negocio",
  },
  { value: "marketing", emoji: "📣", name: "Marketing y Contenido", label: "📣 Marketing y Contenido" },
]

export function areaOption(area: JobArea | "") {
  return AREA_OPTIONS.find((option) => option.value === area)
}

export const INFO_LINKS = [
  {
    label: "Podcast con Pedro Buerbaum (Kiri en el min 53:30)",
    href: "https://www.youtube.com/watch?v=5p368IbLs_E",
  },
  {
    label: "Entrevista en First Movers (15 min)",
    href: "https://www.capitalradio.es/audio/ONDEMAND_MERCADO_ABIERTO_FIRST-MOVERS-KIRI-2502/138017033",
  },
  {
    label: "Charla TEDx de Marta Echarri (16 min)",
    href: "https://www.youtube.com/watch?v=dcTR5Dc7_a0",
  },
]

export const YES_NO: Choice[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
]

export const COURSE_OPTIONS: Choice[] = [
  { value: "tercero", label: "Tercero" },
  { value: "cuarto", label: "Cuarto" },
  { value: "master", label: "Máster" },
  { value: "graduado", label: "Recién graduado/a" },
  { value: "otro", label: "Otro" },
]

export const UNIVERSITY_OPTIONS: Choice[] = [
  { value: "icade", label: "ICADE" },
  { value: "ie", label: "IE" },
  { value: "uc3m", label: "UC3M" },
  { value: "complutense", label: "Complutense" },
  { value: "politecnica", label: "Politécnica" },
  { value: "cunef", label: "CUNEF" },
  { value: "otra", label: "Otra" },
]

export const AVAILABILITY_OPTIONS: Choice[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
  { value: "part-time", label: "No, pero puedo empezar inmediatamente Part Time (mañana o tarde)" },
]

export const ENGLISH_OPTIONS: Choice[] = [
  { value: "b2", label: "B2" },
  { value: "c1", label: "C1" },
  { value: "c2", label: "C2" },
  { value: "nativo", label: "Nativo" },
]

export const TECH_STACK_OPTIONS: Choice[] = [
  { value: "javascript-typescript", label: "JavaScript / TypeScript" },
  { value: "react-next", label: "React / Next.js" },
  { value: "python", label: "Python" },
  { value: "apis", label: "APIs" },
  { value: "vercel", label: "Vercel" },
  { value: "otras", label: "Otras" },
]

export const MARKETING_TOOLS_OPTIONS: Choice[] = [
  { value: "canva", label: "Canva" },
  { value: "capcut", label: "CapCut" },
  { value: "mailchimp", label: "Mailchimp" },
  { value: "wordpress", label: "WordPress" },
  { value: "semrush", label: "Semrush" },
  { value: "otras", label: "Otras" },
]

export const LIMITS = { opsExperience: 1000, opsPlan: 1000, mktPost: 300 } as const

export const MAX_CV_BYTES = 10 * 1024 * 1024

export type ApplicationForm = {
  area: JobArea | ""
  fullName: string
  email: string
  phone: string
  readInfo: string
  course: string
  courseOther: string
  university: string
  universityOther: string
  availability: string
  english: string
  linkedin: string
  cv: File | null
  techPortfolio: string
  techStack: string[]
  techStackOther: string
  opsExperience: string
  opsPlan: string
  mktPortfolio: string
  mktTools: string[]
  mktToolsOther: string
  mktPost: string
  consent: boolean
}

export const ROLE_ANSWERS_CLEARED = {
  techPortfolio: "",
  techStack: [] as string[],
  techStackOther: "",
  opsExperience: "",
  opsPlan: "",
  mktPortfolio: "",
  mktTools: [] as string[],
  mktToolsOther: "",
  mktPost: "",
}

export const EMPTY_FORM: ApplicationForm = {
  area: "",
  fullName: "",
  email: "",
  phone: "+34 ",
  readInfo: "",
  course: "",
  courseOther: "",
  university: "",
  universityOther: "",
  availability: "",
  english: "",
  linkedin: "",
  cv: null,
  consent: false,
  ...ROLE_ANSWERS_CLEARED,
}

export type StepNumber = 1 | 2 | 3
export type Errors = Partial<Record<keyof ApplicationForm, string>>

export const STEPS: { number: StepNumber; label: string }[] = [
  { number: 1, label: "Tus datos" },
  { number: 2, label: "Sobre el puesto" },
  { number: 3, label: "Enviar" },
]

export function isDirty(form: ApplicationForm) {
  return (Object.keys(EMPTY_FORM) as (keyof ApplicationForm)[]).some((key) => {
    if (key === "area") return false
    if (key === "cv") return form.cv !== null
    return JSON.stringify(form[key]) !== JSON.stringify(EMPTY_FORM[key])
  })
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function validateCv(file: File): string | null {
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  if (!isPdf) return "El CV debe ser un archivo PDF."
  if (file.size > MAX_CV_BYTES) return `El archivo pesa ${formatFileSize(file.size)}. El máximo es 10 MB.`
  return null
}

function isValidUrl(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    return url.hostname.includes(".")
  } catch {
    return false
  }
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "")
  if (value.trim().startsWith("+34")) return digits.length === 11
  return digits.length >= 9 && digits.length <= 15
}

export function validateStep(step: StepNumber, form: ApplicationForm): Errors {
  const errors: Errors = {}
  const empty = (value: string) => value.trim().length === 0

  if (step === 1) {
    if (!form.area) errors.area = "Elige el puesto al que quieres aplicar."
    if (form.fullName.trim().split(/\s+/).filter(Boolean).length < 2)
      errors.fullName = "Escribe tu nombre y apellidos."
    if (empty(form.email)) errors.email = "Escribe tu email."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      errors.email = "Revisa el formato del email, por ejemplo nombre@correo.com."
    if (empty(form.phone.replace("+34", ""))) errors.phone = "Escribe tu número de móvil."
    else if (!isValidPhone(form.phone)) errors.phone = "Revisa el número: un móvil español tiene 9 cifras."
    if (!form.readInfo) errors.readInfo = "Cuéntanos si has leído o escuchado la información sobre Kiri."
    if (!form.course) errors.course = "Elige tu curso."
    else if (form.course === "otro" && empty(form.courseOther))
      errors.courseOther = "Cuéntanos qué curso estás haciendo."
    if (!form.university) errors.university = "Elige tu universidad."
    else if (form.university === "otra" && empty(form.universityOther))
      errors.universityOther = "Cuéntanos en qué universidad estás."
    if (!form.availability) errors.availability = "Cuéntanos tu disponibilidad."
    if (!form.english) errors.english = "Elige tu nivel de inglés."
    if (empty(form.linkedin)) errors.linkedin = "Escribe la dirección de tu perfil de LinkedIn."
    else if (!/linkedin\.com/i.test(form.linkedin) || !isValidUrl(form.linkedin))
      errors.linkedin = "Pega la dirección completa de tu perfil, por ejemplo linkedin.com/in/tu-nombre."
    if (!form.cv) errors.cv = "Adjunta tu CV en PDF."
  }

  if (step === 2) {
    if (form.area === "tech") {
      if (empty(form.techPortfolio)) errors.techPortfolio = "Escribe la dirección de tu GitHub o portfolio."
      else if (!isValidUrl(form.techPortfolio)) errors.techPortfolio = "Revisa la dirección: debe ser un enlace válido."
      if (form.techStack.length === 0) errors.techStack = "Marca al menos una tecnología."
      else if (form.techStack.includes("otras") && empty(form.techStackOther))
        errors.techStackOther = "Cuéntanos qué otras tecnologías dominas."
    }
    if (form.area === "operaciones") {
      if (empty(form.opsExperience)) errors.opsExperience = "Cuéntanos tu experiencia previa."
      if (empty(form.opsPlan)) errors.opsPlan = "Cuéntanos cómo conseguirías esas 100 familias."
    }
    if (form.area === "marketing") {
      if (empty(form.mktPortfolio)) errors.mktPortfolio = "Escribe el enlace a tu portfolio o perfil."
      else if (!isValidUrl(form.mktPortfolio)) errors.mktPortfolio = "Revisa la dirección: debe ser un enlace válido."
      if (form.mktTools.length === 0) errors.mktTools = "Marca al menos una herramienta."
      else if (form.mktTools.includes("otras") && empty(form.mktToolsOther))
        errors.mktToolsOther = "Cuéntanos qué otras herramientas manejas."
      if (empty(form.mktPost)) errors.mktPost = "Escribe tu post de dos líneas."
    }
  }

  if (step === 3 && !form.consent)
    errors.consent = "Necesitamos que aceptes el tratamiento de tus datos para continuar."

  return errors
}

export function buildPayload(form: ApplicationForm) {
  const { cv, ...rest } = form
  return {
    ...rest,
    cv: cv ? { name: cv.name, size: cv.size } : null,
  }
}
