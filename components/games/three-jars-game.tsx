"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, PiggyBank, HeartHandshake, RotateCcw, Minus, TreePine, Trophy } from "lucide-react"

const WEEKLY = 8
const GOAL = 24 // bike

type Jar = "gastar" | "ahorrar" | "compartir"

const JARS: { id: Jar; label: string; icon: typeof PiggyBank; color: string; ring: string }[] = [
  { id: "gastar", label: "Gastar", icon: ShoppingBag, color: "bg-amber-500", ring: "focus-visible:ring-amber-400" },
  { id: "ahorrar", label: "Ahorrar", icon: PiggyBank, color: "bg-emerald-600", ring: "focus-visible:ring-emerald-400" },
  { id: "compartir", label: "Compartir", icon: HeartHandshake, color: "bg-rose-500", ring: "focus-visible:ring-rose-400" },
]

export default function ThreeJarsGame() {
  const [week, setWeek] = useState(1)
  const [jars, setJars] = useState<Record<Jar, number>>({ gastar: 0, ahorrar: 0, compartir: 0 })
  const [totalSaved, setTotalSaved] = useState(0)
  const [feedback, setFeedback] = useState<{ msg: string; good: boolean } | null>(null)
  const [won, setWon] = useState(false)

  const placed = jars.gastar + jars.ahorrar + jars.compartir
  const remaining = WEEKLY - placed

  function add(jar: Jar) {
    if (remaining <= 0 || feedback) return
    setJars((j) => ({ ...j, [jar]: j[jar] + 1 }))
  }
  function remove(jar: Jar) {
    if (jars[jar] <= 0 || feedback) return
    setJars((j) => ({ ...j, [jar]: j[jar] - 1 }))
  }

  function confirm() {
    if (remaining > 0) return
    const balanced = jars.ahorrar > 0 && jars.compartir > 0 && jars.gastar > 0
    const newTotal = totalSaved + jars.ahorrar
    let msg: string
    if (!balanced) {
      msg = "Recuerda repartir entre los tres tarros: gastar, ahorrar y también compartir."
    } else if (jars.ahorrar >= 2) {
      msg = "¡Gran semana! Ahorras, compartes y disfrutas. Tu árbol está fuerte."
    } else {
      msg = "¡Buen reparto! Prueba a ahorrar un poco más la próxima semana."
    }
    setFeedback({ msg, good: balanced })
    setTotalSaved(newTotal)
    if (newTotal >= GOAL) setWon(true)
  }

  function nextWeek() {
    setJars({ gastar: 0, ahorrar: 0, compartir: 0 })
    setFeedback(null)
    setWeek((w) => w + 1)
  }

  function restart() {
    setJars({ gastar: 0, ahorrar: 0, compartir: 0 })
    setFeedback(null)
    setTotalSaved(0)
    setWeek(1)
    setWon(false)
  }

  if (won) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">¡Meta conseguida!</h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          Has ahorrado {totalSaved} € en {week} semanas y has comprado tu bici nueva, sin dejar de compartir
          por el camino. Eso es equilibrar el dinero.
        </p>
        <button
          onClick={restart}
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-2.5 px-6 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Jugar otra vez
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 md:p-8">
      {/* Header: week + goal */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">Semana {week}</p>
          <p className="font-serif text-lg font-bold text-foreground">Tu paga: {WEEKLY} €</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Meta: bici {GOAL} €</p>
          <p className="font-serif text-lg font-bold text-foreground tabular-nums">
            Ahorrado: {totalSaved} €
          </p>
        </div>
      </div>

      {/* Goal progress */}
      <div className="h-3 rounded-full bg-amber-100 overflow-hidden mb-6">
        <motion.div
          className="h-full bg-emerald-600"
          animate={{ width: `${Math.min((totalSaved / GOAL) * 100, 100)}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
        />
      </div>

      {/* Remaining coins */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="text-sm font-semibold text-foreground mr-1">Por repartir:</span>
        {Array.from({ length: WEEKLY }).map((_, i) => (
          <span
            key={i}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
              i < remaining ? "bg-yellow-400 text-amber-900" : "bg-amber-100 text-amber-300"
            }`}
          >
            1€
          </span>
        ))}
      </div>

      {/* Jars */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5">
        {JARS.map((jar) => {
          const Icon = jar.icon
          return (
            <div key={jar.id} className="flex flex-col items-center gap-2">
              <button
                onClick={() => add(jar.id)}
                disabled={remaining <= 0 || !!feedback}
                className={`w-full rounded-2xl ${jar.color} text-white p-4 flex flex-col items-center gap-2 shadow-md hover:scale-[1.03] active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 ${jar.ring} ring-offset-2`}
                aria-label={`Añadir 1 euro a ${jar.label}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wide">{jar.label}</span>
                <span className="font-serif text-2xl font-bold tabular-nums">{jars[jar.id]} €</span>
              </button>
              <button
                onClick={() => remove(jar.id)}
                disabled={jars[jar.id] <= 0 || !!feedback}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <Minus className="w-3 h-3" /> quitar
              </button>
            </div>
          )
        })}
      </div>

      {/* Feedback or confirm */}
      <AnimatePresence mode="wait">
        {feedback ? (
          <motion.div
            key="fb"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-2xl p-4 flex items-start gap-3 ${
              feedback.good ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            }`}
          >
            <TreePine className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feedback.good ? "text-emerald-600" : "text-amber-600"}`} />
            <div className="flex-1">
              <p className="text-sm leading-relaxed font-medium">{feedback.msg}</p>
              <button
                onClick={nextWeek}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground text-background font-semibold text-sm py-2 px-5 hover:opacity-90 transition-opacity"
              >
                Siguiente semana
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={confirm}
            disabled={remaining > 0}
            className="w-full rounded-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold text-sm py-3 transition-colors"
          >
            {remaining > 0 ? `Reparte ${remaining} € más` : "Confirmar reparto"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
