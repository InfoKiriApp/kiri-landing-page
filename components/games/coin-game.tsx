"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TreePine, RotateCcw, Trash2 } from "lucide-react"

const COINS = [
  { cents: 1, label: "1c", color: "bg-amber-700" },
  { cents: 2, label: "2c", color: "bg-amber-700" },
  { cents: 5, label: "5c", color: "bg-amber-600" },
  { cents: 10, label: "10c", color: "bg-yellow-500" },
  { cents: 20, label: "20c", color: "bg-yellow-500" },
  { cents: 50, label: "50c", color: "bg-yellow-400" },
]

export default function CoinGame() {
  const [tray, setTray] = useState<number[]>([])
  const [euros, setEuros] = useState(0)
  const [flash, setFlash] = useState<"win" | "over" | null>(null)

  const total = tray.reduce((s, c) => s + c, 0)

  function addCoin(cents: number) {
    if (flash) return
    const next = total + cents
    if (next > 100) {
      setFlash("over")
      setTimeout(() => setFlash(null), 700)
      return
    }
    setTray((t) => [...t, cents])
    if (next === 100) {
      setFlash("win")
      setTimeout(() => {
        setEuros((e) => e + 1)
        setTray([])
        setFlash(null)
      }, 1100)
    }
  }

  function reset() {
    setTray([])
    setFlash(null)
  }

  const treeScale = 0.6 + Math.min(euros, 6) * 0.12

  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 md:p-8">
      {/* Tree + progress */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-28 flex items-end justify-center">
          <motion.div animate={{ scale: treeScale }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
            <TreePine className="w-20 h-20 text-emerald-600" />
          </motion.div>
        </div>
        <p className="text-sm text-rose-700 font-semibold mt-2">
          {euros === 0 ? "¡Consigue 1 € para que tu árbol crezca!" : `Has hecho ${euros} ${euros === 1 ? "euro" : "euros"} · ¡tu árbol crece!`}
        </p>
      </div>

      {/* Tray */}
      <div
        className={`relative rounded-2xl border-2 border-dashed bg-white p-4 mb-5 transition-colors ${
          flash === "over" ? "border-red-400" : flash === "win" ? "border-emerald-400" : "border-rose-200"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">Tu bandeja</span>
          <span className="font-serif text-2xl font-bold text-foreground tabular-nums">
            {total} <span className="text-base text-muted-foreground">/ 100 céntimos</span>
          </span>
        </div>
        {/* progress bar */}
        <div className="h-3 rounded-full bg-rose-100 overflow-hidden mb-4">
          <motion.div
            className={flash === "over" ? "h-full bg-red-400" : "h-full bg-rose-500"}
            animate={{ width: `${Math.min(total, 100)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <div className="flex flex-wrap gap-2 min-h-[2.5rem] items-center">
          <AnimatePresence>
            {tray.map((c, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, y: -8 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-yellow-400 text-amber-900 text-xs font-bold shadow-sm"
              >
                {c < 100 ? `${c}c` : "1€"}
              </motion.span>
            ))}
          </AnimatePresence>
          {tray.length === 0 && (
            <span className="text-sm text-muted-foreground">Toca las monedas de abajo para empezar.</span>
          )}
        </div>

        <AnimatePresence>
          {flash === "win" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/95"
            >
              <TreePine className="w-7 h-7 text-white" />
              <p className="font-serif text-2xl font-bold text-white">¡1 euro!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Coin buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
        {COINS.map((coin) => (
          <button
            key={coin.cents}
            onClick={() => addCoin(coin.cents)}
            disabled={!!flash}
            className={`aspect-square rounded-full ${coin.color} text-white font-bold text-base flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ring-offset-2`}
            aria-label={`Añadir moneda de ${coin.label}`}
          >
            {coin.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-rose-300 text-rose-700 font-semibold text-sm py-2.5 hover:bg-rose-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Vaciar bandeja
        </button>
        <button
          onClick={() => {
            setEuros(0)
            reset()
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm py-2.5 px-5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </button>
      </div>
    </div>
  )
}
