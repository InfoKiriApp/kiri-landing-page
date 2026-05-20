"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const MIN = 5
const MAX = 200
const YEARS = 18
const RATE = 0.08 / 12
const MONTHS = YEARS * 12

function calcFV(monthly: number) {
  const fv = monthly * ((Math.pow(1 + RATE, MONTHS) - 1) / RATE)
  const contributed = monthly * MONTHS
  const returns = fv - contributed
  return { total: Math.round(fv), contributed: Math.round(contributed), returns: Math.round(returns) }
}

function formatEur(n: number) {
  return n.toLocaleString("de-DE")
}

type Stage = "seed" | "sapling" | "tree"

function getStage(amount: number): Stage {
  if (amount <= 25) return "seed"
  if (amount <= 49) return "sapling"
  return "tree"
}

const STAGE_IMAGES: Record<Stage, { src: string; alt: string; size: string }> = {
  seed: { src: "/images/kiri-seed.png", alt: "Semilla Kiri", size: "w-36 h-36 md:w-44 md:h-44" },
  sapling: { src: "/images/kiri-sapling.png", alt: "Árbol Kiri joven", size: "w-48 h-48 md:w-60 md:h-60" },
  tree: { src: "/images/kiri-tree-full.png", alt: "Árbol Kiri adulto en flor", size: "w-64 h-64 md:w-80 md:h-80" },
}

function useAnimatedNumber(target: number, duration = 420) {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const fromRef = useRef(target)

  useEffect(() => {
    const from = fromRef.current
    if (from === target) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startRef.current = null

    const animate = (now: number) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (target - from) * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        fromRef.current = target
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return display
}

export default function Calculator() {
  const [monthly, setMonthly] = useState(50)
  const { total, contributed, returns } = calcFV(monthly)
  const stage = getStage(monthly)

  const animTotal = useAnimatedNumber(total)
  const animContributed = useAnimatedNumber(contributed)
  const animReturns = useAnimatedNumber(returns)

  const pct = ((monthly - MIN) / (MAX - MIN)) * 100

  return (
    <section id="calculadora" className="bg-background py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-lg mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2">Calculadora</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            Haz crecer tu dinero
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden"
        >
          {/* Card header */}
          <div className="bg-primary/5 px-8 pt-8 pb-6 text-center border-b border-border">
            <p className="text-xs text-muted-foreground leading-relaxed mb-5">
              Ahorrando mensualmente durante{" "}
              <strong className="text-foreground">18 años</strong> con una rentabilidad media del{" "}
              <strong className="text-foreground">8% anual</strong>
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Al cabo de 18 años tendrás
            </p>
            <div className="flex items-start justify-center gap-1 leading-none">
              <span className="font-serif text-4xl font-bold text-primary mt-2">€</span>
              <span className="font-serif text-6xl md:text-7xl font-bold text-primary tabular-nums">
                {formatEur(animTotal)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              aportando{" "}
              <strong className="text-foreground">{monthly} €/mes</strong>
            </p>
          </div>

          {/* Tree visual */}
          <div className="flex items-end justify-center pt-6 pb-2 min-h-[200px] md:min-h-[260px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-end justify-center"
              >
                <Image
                  src={STAGE_IMAGES[stage].src}
                  alt={STAGE_IMAGES[stage].alt}
                  width={320}
                  height={320}
                  className={`object-contain ${STAGE_IMAGES[stage].size} transition-all duration-300 drop-shadow-md`}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Growth stage label */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/50">
                {stage === "seed" ? "Semilla" : stage === "sapling" ? "Árbol joven" : "Árbol adulto"}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="px-8 pt-4 pb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">Aportación mensual</span>
              <span className="bg-primary text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full tabular-nums">
                {monthly} €
              </span>
            </div>

            {/* Custom slider */}
            <div className="relative py-2">
              {/* Track background */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border" />
              {/* Track fill */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-primary transition-all duration-150"
                style={{ width: `${pct}%` }}
              />
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={1}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="relative w-full appearance-none bg-transparent cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md"
                aria-label="Aportación mensual en euros"
                aria-valuemin={MIN}
                aria-valuemax={MAX}
                aria-valuenow={monthly}
                aria-valuetext={`${monthly} euros al mes`}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">{MIN} €</span>
              <span className="text-xs text-muted-foreground">{MAX} €</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 px-8 pb-7">
            <div className="bg-muted rounded-2xl p-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 leading-tight">
                Total aportado
              </p>
              <p className="font-serif text-xl md:text-2xl font-bold text-foreground tabular-nums">
                {formatEur(animContributed)} €
              </p>
            </div>
            <div className="bg-muted rounded-2xl p-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 leading-tight">
                Rentabilidad generada
              </p>
              <p className="font-serif text-xl md:text-2xl font-bold text-green-600 tabular-nums">
                +{formatEur(animReturns)} €
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="px-8 pb-8 flex flex-col gap-3">
            <a
              href="#reserva"
              className="block w-full text-center bg-primary text-primary-foreground font-semibold text-base py-4 rounded-2xl hover:bg-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Empieza a invertir →
            </a>
            <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
              Cálculo orientativo. La rentabilidad pasada no garantiza resultados futuros. Inversión sujeta a riesgo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
