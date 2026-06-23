import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { GAMES } from "@/lib/academy-games"
import {
  Gamepad2,
  ArrowLeft,
  ArrowRight,
  Coins,
  PiggyBank,
  Scale,
  TrendingUp,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export const metadata = {
  title: "Juegos por edades | Kiri Academy",
  description:
    "Un juego de educación financiera para cada etapa: de los 3 a los 22 años. Los niños juegan y aprenden; los padres descubren cómo enseñar cada lección.",
}

const ICONS: Record<string, LucideIcon> = {
  Coins,
  PiggyBank,
  Scale,
  TrendingUp,
  ShieldCheck,
  Wallet,
}

export default function GamesHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-28 pb-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/15 blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/kiri-academy"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Kiri Academy
          </Link>
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground/80 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            <Gamepad2 className="w-3.5 h-3.5" />
            Aprender jugando
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6">
            Un juego para cada edad
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
            Seis juegos diseñados por etapas, de los 3 a los 22 años. Los niños juegan y aprenden una
            habilidad financiera; los padres descubren cómo enseñar esa misma lección en casa.
          </p>
        </div>
      </section>

      {/* Games grid */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game) => {
            const Icon = ICONS[game.icon] ?? Gamepad2
            return (
              <Link
                key={game.slug}
                href={`/kiri-academy/juegos/${game.slug}`}
                className={`group rounded-3xl border ${game.theme.border} ${game.theme.cardBg} p-7 flex flex-col gap-4 transition-all duration-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl ${game.theme.solid} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${game.theme.text} bg-white/70 px-3 py-1 rounded-full`}
                  >
                    {game.ageLabel}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <p className={`text-xs font-semibold uppercase tracking-widest ${game.theme.text}`}>
                    {game.skill}
                  </p>
                  <h2 className="font-serif text-xl font-bold text-foreground leading-snug">
                    {game.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {game.tagline}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${game.theme.text} mt-1`}
                >
                  Jugar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
