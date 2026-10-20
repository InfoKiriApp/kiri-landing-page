import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CareersHero from "@/components/careers/careers-hero"
import { WhyKiri, Founder, Values } from "@/components/careers/careers-culture"
import OpenRoles from "@/components/careers/open-roles"
import ApplicationProvider from "@/components/careers/application/provider"
import { Prepare, Process, FinalCta } from "@/components/careers/careers-process"

const DESCRIPTION =
  "Prácticas en Kiri, la cuenta de inversión para niños. Tech, Operaciones y Marketing en Madrid/remoto, trabajando con Marta Echarri, ex CEO de N26 España."

export const metadata: Metadata = {
  title: "Trabaja con nosotros | Kiri",
  description: DESCRIPTION,
  openGraph: {
    title: "Trabaja con nosotros | Kiri",
    description: DESCRIPTION,
    type: "website",
    locale: "es_ES",
    images: [{ url: "/apple-icon.png", alt: "Logo de Kiri" }],
  },
}

export default function TrabajaConNosotrosPage() {
  return (
    <ApplicationProvider>
      <div className="min-h-screen bg-white text-kiri-ink">
        <Header />
        <main>
          <CareersHero />
          <WhyKiri />
          <Founder />
          <Values />
          <OpenRoles />
          <Prepare />
          <Process />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </ApplicationProvider>
  )
}
