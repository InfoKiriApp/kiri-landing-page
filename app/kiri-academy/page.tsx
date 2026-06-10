import Header from "@/components/header"
import Footer from "@/components/footer"
import { Sprout } from "lucide-react"
import Link from "next/link"
import AcademyGrid from "@/components/academy-grid"

const categories = ["Todos", "Fundamentos", "Ahorro", "Inversión", "Objetivos", "Valores", "Comportamiento", "Metáforas", "Inicio", "Errores"]

export default function KiriAcademyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-28 pb-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/15 blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground/80 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            <Sprout className="w-3.5 h-3.5" />
            Educación Financiera
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6">
            Kiri Academy
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            Guías, artículos y recursos para enseñar a tus hijos el valor del dinero, el ahorro y la inversión desde edades tempranas. Porque la mejor herencia que puedes dejar es la educación financiera.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Gratuito", "Para todas las edades", "Basado en evidencia"].map((tag) => (
              <span key={tag} className="bg-white/10 text-white/80 border border-white/20 px-4 py-1.5 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-md border-b border-border px-6 md:px-12 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 w-max">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <AcademyGrid />

      {/* CTA banner */}
      <section className="bg-primary px-6 md:px-12 lg:px-20 py-20 mx-6 md:mx-12 lg:mx-20 rounded-3xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <Sprout className="w-10 h-10 text-primary-foreground/60 mx-auto mb-5" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-5 text-balance">
            Planta la semilla hoy
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            La educación financiera empieza en casa. Abre una cuenta Kiri para tus seres queridos y dales el mejor regalo para su futuro.
          </p>
          <Link
            href="/#reserva"
            className="inline-flex bg-white text-primary font-semibold px-8 py-3.5 rounded-full text-sm hover:bg-white/90 transition-colors duration-300"
          >
            Reserva tu Kiri
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
