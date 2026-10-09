import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NotFoundContent from "@/components/not-found-content"

export const metadata: Metadata = {
  title: "Página no encontrada | Kiri",
  description: "Esta página se ha perdido en el bosque de Kiri. Vuelve al inicio y sigue haciendo crecer el futuro financiero de tus hijos.",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  )
}
