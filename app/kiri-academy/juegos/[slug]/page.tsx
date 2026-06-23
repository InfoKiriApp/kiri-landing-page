import Link from "next/link"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import GamePlayer from "@/components/games/game-player"
import GameFaq from "@/components/games/game-faq"
import { GAMES, getGameBySlug, getAllGameSlugs } from "@/lib/academy-games"
import {
  Gamepad2,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Users,
  ListChecks,
  HelpCircle,
  Coins,
  PiggyBank,
  Scale,
  TrendingUp,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react"

const ICONS: Record<string, LucideIcon> = {
  Coins,
  PiggyBank,
  Scale,
  TrendingUp,
  ShieldCheck,
  Wallet,
}

export function generateStaticParams() {
  return getAllGameSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug)
  if (!game) return { title: "Juego | Kiri Academy" }
  return {
    title: `${game.title} (${game.ageLabel}) | Kiri Academy`,
    description: game.tagline,
  }
}

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug)
  if (!game) notFound()

  const Icon = ICONS[game.icon] ?? Gamepad2

  const currentIndex = GAMES.findIndex((g) => g.slug === game.slug)
  const nextGame = GAMES[currentIndex + 1]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-28 pb-16 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/kiri-academy/juegos"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Todos los juegos
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl ${game.theme.solid} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                {game.ageLabel} · {game.stageName}
              </span>
              <p className={`text-sm font-semibold ${game.theme.text}`}>{game.skill}</p>
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight text-balance mb-4">
            {game.title}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{game.tagline}</p>
        </div>
      </section>

      {/* Game player */}
      <section className="px-6 md:px-12 lg:px-20 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-3xl border ${game.theme.border} ${game.theme.bg} p-5 md:p-8 shadow-xl`}>
            <GamePlayer slug={game.slug} />
          </div>
        </div>
      </section>

      {/* How to play */}
      <section className="px-6 md:px-12 lg:px-20 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <ListChecks className={`w-5 h-5 ${game.theme.text}`} />
            <h2 className="font-serif text-2xl font-bold text-foreground">Cómo se juega</h2>
          </div>
          <ol className="flex flex-col gap-3">
            {game.howToPlay.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className={`w-7 h-7 rounded-full ${game.theme.solid} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}
                >
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What the child learns + parent lesson */}
      <section className="px-6 md:px-12 lg:px-20 pb-14">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-3xl border ${game.theme.border} ${game.theme.bg} p-7`}>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className={`w-5 h-5 ${game.theme.text}`} />
              <h3 className="font-serif text-xl font-bold text-foreground">Qué aprende el niño</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{game.kidLearns}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-7">
            <div className="flex items-center gap-2 mb-3">
              <Users className={`w-5 h-5 ${game.theme.text}`} />
              <h3 className="font-serif text-xl font-bold text-foreground">La lección para los padres</h3>
            </div>
            <p className={`text-sm font-semibold ${game.theme.text} mb-2`}>{game.parentLesson.title}</p>
            <p className="text-muted-foreground leading-relaxed">{game.parentLesson.body}</p>
          </div>
        </div>
      </section>

      {/* FAQ for parents */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className={`w-5 h-5 ${game.theme.text}`} />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Para los padres: cómo enseñar esta lección
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Preguntas frecuentes para acompañar a tu hijo y llevar lo aprendido en el juego a la vida real.
          </p>
          <GameFaq faqs={game.faqs} accentText={game.theme.text} />
        </div>
      </section>

      {/* Next game */}
      {nextGame && (
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/kiri-academy/juegos/${nextGame.slug}`}
              className={`group flex items-center justify-between gap-4 rounded-3xl border ${nextGame.theme.border} ${nextGame.theme.cardBg} p-7 transition-all duration-200 hover:shadow-lg`}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Siguiente juego · {nextGame.ageLabel}
                </p>
                <p className="font-serif text-xl font-bold text-foreground">{nextGame.title}</p>
              </div>
              <ArrowRight
                className={`w-6 h-6 ${nextGame.theme.text} group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0`}
              />
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
