import type { Metadata } from "next"
import AcademyIndex from "@/components/academy/academy-index"

const title = "Kiri Academy | Educación financiera para niños y familias"
const description =
  "Guías, artículos y juegos por edades para enseñar a tus hijos el valor del dinero, el ahorro y la inversión desde pequeños."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/kiri-academy" },
  openGraph: { title, description, type: "website", locale: "es_ES", url: "/kiri-academy" },
  twitter: { card: "summary_large_image", title, description },
}

export default function KiriAcademyPage() {
  return <AcademyIndex />
}
