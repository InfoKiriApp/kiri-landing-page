"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Play, RotateCcw, Newspaper, Trophy } from "lucide-react"

const START_CASH = 1000
const TOTAL_TICKS = 24
const CHUNK = 5 // shares per trade

type News = { text: string; drift: number; tone: "up" | "down" | "flat" }

const NEWS: News[] = [
  { text: "ClickTok lanza una función que se hace viral.", drift: 0.07, tone: "up" },
  { text: "Resultados trimestrales mejores de lo esperado.", drift: 0.05, tone: "up" },
  { text: "Un famoso recomienda la app a sus seguidores.", drift: 0.06, tone: "up" },
  { text: "El mercado abre tranquilo, sin grandes noticias.", drift: 0.0, tone: "flat" },
  { text: "Rumores de una posible nueva regulación.", drift: -0.05, tone: "down" },
  { text: "Detectan un fallo de seguridad en la plataforma.", drift: -0.07, tone: "down" },
  { text: "Cae el número de usuarios activos este mes.", drift: -0.06, tone: "down" },
]

export default function StockSimGame() {
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [cash, setCash] = useState(START_CASH)
  const [shares, setShares] = useState(0)
  const [price, setPrice] = useState(50)
  const [history, setHistory] = useState<number[]>([50])
  const [tick, setTick] = useState(0)
  const [news, setNews] = useState<News>(NEWS[3])

  const driftRef = useRef(0)
  const newsCountdown = useRef(0)
  const priceRef = useRef(50)

  useEffect(() => {
    if (!started || finished) return
    const id = setInterval(() => {
      setTick((t) => {
        const nextTick = t + 1
        if (nextTick > TOTAL_TICKS) {
          clearInterval(id)
          setFinished(true)
          return t
        }
        // maybe new headline
        if (newsCountdown.current <= 0) {
          const n = NEWS[Math.floor(Math.random() * NEWS.length)]
          driftRef.current = n.drift
          newsCountdown.current = 3 + Math.floor(Math.random() * 2)
          setNews(n)
        } else {
          newsCountdown.current -= 1
        }
        // random walk + drift
        const noise = (Math.random() - 0.5) * 0.06
        const next = Math.max(5, +(priceRef.current * (1 + driftRef.current + noise)).toFixed(2))
        priceRef.current = next
        setPrice(next)
        setHistory((h) => [...h, next])
        return nextTick
      })
    }, 1400)
    return () => clearInterval(id)
  }, [started, finished])

  function buy() {
    const qty = Math.min(CHUNK, Math.floor(cash / price))
    if (qty <= 0) return
    setCash((c) => +(c - qty * price).toFixed(2))
    setShares((s) => s + qty)
  }
  function sell() {
    const qty = Math.min(CHUNK, shares)
    if (qty <= 0) return
    setCash((c) => +(c + qty * price).toFixed(2))
    setShares((s) => s - qty)
  }

  function start() {
    setStarted(true)
    setFinished(false)
    setCash(START_CASH)
    setShares(0)
    setPrice(50)
    priceRef.current = 50
    setHistory([50])
    setTick(0)
    driftRef.current = 0
    newsCountdown.current = 0
    setNews(NEWS[3])
  }

  const netWorth = +(cash + shares * price).toFixed(2)
  const gain = netWorth - START_CASH

  // sparkline geometry
  const w = 320
  const h = 90
  const min = Math.min(...history)
  const max = Math.max(...history)
  const range = max - min || 1
  const pts = history
    .map((p, i) => {
      const x = (i / Math.max(history.length - 1, 1)) * w
      const y = h - ((p - min) / range) * h
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")

  if (!started) {
    return (
      <div className="rounded-3xl border border-violet-200 bg-violet-50 p-8 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">Simulador de Bolsa Flash</h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          Tienes {START_CASH} € simulados. Sigue el precio de ClickTok Corp., lee las noticias y decide cuándo
          comprar y vender. ¿Puedes hacer crecer tu capital en {TOTAL_TICKS} jornadas?
        </p>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3 px-7 transition-colors"
        >
          <Play className="w-4 h-4" />
          Iniciar simulación
        </button>
      </div>
    )
  }

  if (finished) {
    const win = gain >= 0
    return (
      <div className="rounded-3xl border border-violet-200 bg-violet-50 p-8 text-center flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl ${win ? "bg-emerald-600" : "bg-amber-500"} flex items-center justify-center`}>
          {win ? <Trophy className="w-8 h-8 text-white" /> : <TrendingDown className="w-8 h-8 text-white" />}
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">Simulación concluida</h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          Terminas con <span className="font-bold text-foreground">{netWorth.toLocaleString("es-ES")} €</span>.{" "}
          {win
            ? `Has ganado ${gain.toLocaleString("es-ES")} €. Recuerda: ganar a corto plazo es difícil — invertir a largo plazo y diversificar es mucho más seguro.`
            : `Has perdido ${Math.abs(gain).toLocaleString("es-ES")} €. Así de difícil es acertar con el momento del mercado: por eso los expertos invierten a largo plazo.`}
        </p>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-2.5 px-6 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Volver a empezar
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-violet-200 bg-violet-50 p-5 md:p-8">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Stat label="Mi dinero" value={`${cash.toLocaleString("es-ES")} €`} />
        <Stat label="Acciones" value={`${shares}`} />
        <Stat label="Precio" value={`${price.toFixed(2)} €`} />
      </div>

      {/* Chart */}
      <div className="rounded-2xl bg-white border border-violet-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-serif font-bold text-foreground">ClickTok Corp.</span>
          <span className="text-xs text-muted-foreground">Jornada {tick} / {TOTAL_TICKS}</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" preserveAspectRatio="none" role="img" aria-label="Evolución del precio">
          <polyline
            points={pts}
            fill="none"
            stroke="hsl(272 65% 48%)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* News */}
      <motion.div
        key={news.text}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-start gap-3 rounded-2xl p-3.5 mb-4 ${
          news.tone === "up" ? "bg-emerald-100 text-emerald-800" : news.tone === "down" ? "bg-red-100 text-red-800" : "bg-muted text-muted-foreground"
        }`}
      >
        <Newspaper className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-snug">{news.text}</p>
      </motion.div>

      {/* Net worth + actions */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Patrimonio total</span>
        <span className={`font-serif text-xl font-bold tabular-nums ${gain >= 0 ? "text-emerald-700" : "text-red-600"}`}>
          {netWorth.toLocaleString("es-ES")} €
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={buy}
          disabled={cash < price}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-sm py-3 transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          Comprar {CHUNK}
        </button>
        <button
          onClick={sell}
          disabled={shares <= 0}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-violet-300 text-violet-700 hover:bg-violet-100 disabled:opacity-50 font-semibold text-sm py-3 transition-colors"
        >
          <TrendingDown className="w-4 h-4" />
          Vender {CHUNK}
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white border border-violet-200 p-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
      <p className="font-serif text-base md:text-lg font-bold text-foreground tabular-nums">{value}</p>
    </div>
  )
}
