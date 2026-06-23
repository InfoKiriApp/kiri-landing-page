"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TreePine, Plus, Minus, RotateCcw, Check, X, Sprout } from "lucide-react"

const BUDGET = 25

type Item = { name: string; cost: number; need: boolean }

const ITEMS: Item[] = [
  { name: "Comida de la semana", cost: 6, need: true },
  { name: "Videojuego nuevo", cost: 8, need: false },
  { name: "Material escolar", cost: 4, need: true },
  { name: "Transporte al cole", cost: 3, need: true },
  { name: "Cromos de fútbol", cost: 3, need: false },
]

export default function BudgetTreeGame() {
  const [phase, setPhase] = useState<"sort" | "split" | "done">("sort")
  const [idx, setIdx] = useState(0)
  const [spentOnNeeds, setSpentOnNeeds] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [feedback, setFeedback] = useState<null | boolean>(null)
  const [ahorrar, setAhorrar] = useState(0)
  const [caprichos, setCaprichos] = useState(0)

  const item = ITEMS[idx]
  const free = BUDGET - spentOnNeeds
  const leftToSplit = free - ahorrar - caprichos

  function classify(asNeed: boolean) {
    if (feedback !== null) return
    const isCorrect = asNeed === item.need
    setFeedback(isCorrect)
    setTimeout(() => {
      if (item.need) setSpentOnNeeds((s) => s + item.cost)
      if (isCorrect) setCorrect((c) => c + 1)
      setFeedback(null)
      if (idx + 1 < ITEMS.length) {
        setIdx((i) => i + 1)
      } else {
        setPhase("split")
      }
    }, 850)
  }

  function finish() {
    setPhase("done")
  }

  function restart() {
    setPhase("sort")
    setIdx(0)
    setSpentOnNeeds(0)
    setCorrect(0)
    setFeedback(null)
    setAhorrar(0)
    setCaprichos(0)
  }

  // tree health 0..1 based on savings ratio + classification accuracy
  const savingsRatio = free > 0 ? ahorrar / free : 0
  const treeScale = 0.7 + savingsRatio * 0.6
  const treeColor = savingsRatio >= 0.5 ? "text-emerald-600" : savingsRatio >= 0.25 ? "text-emerald-500" : "text-amber-500"

  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 md:p-8">
      {/* Tree status */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div animate={{ scale: phase === "sort" ? 0.8 : treeScale }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
          {phase === "sort" ? <Sprout className="w-12 h-12 text-emerald-500" /> : <TreePine className={`w-14 h-14 ${treeColor}`} />}
        </motion.div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Paga semanal: {BUDGET} €</p>
          <p className="font-serif text-lg font-bold text-foreground">
            {phase === "sort"
              ? "Primero: cubre tus necesidades"
              : phase === "split"
                ? `Te quedan ${free} € libres`
                : "Resultado de tu semana"}
          </p>
        </div>
      </div>

      {/* Phase: sort needs vs wants */}
      {phase === "sort" && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Artículo {idx + 1} de {ITEMS.length}. ¿Es una necesidad obligatoria o un deseo prescindible?
          </p>
          <div className="relative rounded-2xl bg-white border border-emerald-200 p-6 text-center mb-5 min-h-[8rem] flex flex-col items-center justify-center">
            <p className="font-serif text-xl font-bold text-foreground mb-1">{item.name}</p>
            <p className="text-sm text-muted-foreground">Coste: {item.cost} €</p>
            <AnimatePresence>
              {feedback !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl ${
                    feedback ? "bg-emerald-500/95" : "bg-amber-500/95"
                  } text-white`}
                >
                  {feedback ? <Check className="w-7 h-7" /> : <X className="w-7 h-7" />}
                  <p className="font-semibold text-sm px-4">
                    {feedback
                      ? "¡Correcto!"
                      : item.need
                        ? "Es una necesidad: hay que cubrirla."
                        : "En realidad es un deseo prescindible."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => classify(true)}
              disabled={feedback !== null}
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 transition-colors disabled:opacity-50"
            >
              Necesidad
            </button>
            <button
              onClick={() => classify(false)}
              disabled={feedback !== null}
              className="rounded-full bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100 font-semibold text-sm py-3 transition-colors disabled:opacity-50"
            >
              Deseo
            </button>
          </div>
        </div>
      )}

      {/* Phase: split remaining */}
      {phase === "split" && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Has cubierto tus necesidades. Reparte los {free} € que te sobran. Cuanto más ahorres, más crece tu árbol.
          </p>
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5">
            {[
              { label: "Ahorrar", val: ahorrar, set: setAhorrar, color: "bg-emerald-600" },
              { label: "Caprichos", val: caprichos, set: setCaprichos, color: "bg-amber-500" },
            ].map((col) => (
              <div key={col.label} className="rounded-2xl bg-white border border-emerald-200 p-4 flex flex-col items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{col.label}</span>
                <span className="font-serif text-3xl font-bold text-foreground tabular-nums">{col.val} €</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => col.set(Math.max(0, col.val - 1))}
                    disabled={col.val <= 0}
                    className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center disabled:opacity-30 hover:bg-emerald-200 transition-colors"
                    aria-label={`Quitar 1 € de ${col.label}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => col.set(col.val + 1)}
                    disabled={leftToSplit <= 0}
                    className={`w-9 h-9 rounded-full ${col.color} text-white flex items-center justify-center disabled:opacity-40 transition-transform hover:scale-105`}
                    aria-label={`Añadir 1 € a ${col.label}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Sin repartir: <span className="font-bold text-foreground">{leftToSplit} €</span>
          </p>
          <button
            onClick={finish}
            disabled={leftToSplit > 0}
            className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm py-3 transition-colors"
          >
            {leftToSplit > 0 ? `Reparte ${leftToSplit} € más` : "Guardar presupuesto"}
          </button>
        </div>
      )}

      {/* Phase: done */}
      {phase === "done" && (
        <div className="text-center flex flex-col items-center gap-3">
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Acertaste <span className="font-bold text-foreground">{correct} de {ITEMS.length}</span> al separar
            necesidades de deseos, ahorraste <span className="font-bold text-foreground">{ahorrar} €</span> y dejaste{" "}
            <span className="font-bold text-foreground">{caprichos} €</span> para caprichos.
          </p>
          <p className={`font-serif text-lg font-bold ${savingsRatio >= 0.5 ? "text-emerald-700" : "text-amber-700"}`}>
            {savingsRatio >= 0.5
              ? "Tu árbol Kiri crece fuerte. ¡Gran equilibrio!"
              : "Tu árbol sobrevive, pero crecería más si ahorraras un poco más."}
          </p>
          <button
            onClick={restart}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2.5 px-6 transition-colors mt-1"
          >
            <RotateCcw className="w-4 h-4" />
            Hacer otro presupuesto
          </button>
        </div>
      )}
    </div>
  )
}
