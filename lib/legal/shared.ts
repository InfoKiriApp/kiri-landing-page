export const LEGAL_CONTACT = "info@kiriapp.com"

export const LEGAL_UPDATED = { iso: "2026-10-20", label: "20 de octubre de 2026" }

export const COMPANY = {
  brand: "Kiri",
  legalName: "[Razón social de Kiri]",
  taxId: "[NIF]",
  address: "[Domicilio social]",
  registry: "[Datos de inscripción en el Registro Mercantil]",
}

export const COMPANY_LINE = `${COMPANY.legalName}, con NIF ${COMPANY.taxId} y domicilio en ${COMPANY.address} («Kiri»)`

export type LegalLink = { href: string; label: string }

export type LegalSection = {
  id: string
  title: string
  paragraphs?: string[]
  list?: { label: string; text?: string }[]
  table?: { caption: string; headers: string[]; rows: string[][] }
  note?: string
  links?: LegalLink[]
}

export type LegalDoc = {
  href: string
  navLabel: string
  eyebrow: string
  title: string
  intro: string
  description: string
  summary: { term: string; description: string }[]
  sections: LegalSection[]
  contactSubject: string
  back?: LegalLink
}

export const LEGAL_NAV: LegalLink[] = [
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/privacidad-menores-y-familias", label: "Privacidad de menores y familias" },
  { href: "/terminos-y-condiciones", label: "Términos y condiciones" },
  { href: "/politica-de-cookies", label: "Política de cookies" },
  { href: "/condiciones-regala-kiri", label: "Condiciones de Regala Kiri" },
  { href: "/privacidad-candidatos", label: "Privacidad para candidatos" },
]

export const RIGHTS_LIST = [
  { label: "Acceso:", text: "saber qué datos tuyos tenemos." },
  { label: "Rectificación:", text: "corregir datos inexactos o incompletos." },
  { label: "Supresión:", text: "pedirnos que borremos tus datos." },
  { label: "Oposición y limitación:", text: "pedirnos que dejemos de tratarlos o que los tratemos solo en ciertos casos." },
  { label: "Portabilidad:", text: "recibir tus datos en un formato que puedas llevarte a otro sitio." },
]

export const RIGHTS_NOTE =
  "Te responderemos en un plazo máximo de un mes. Si crees que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es)."
