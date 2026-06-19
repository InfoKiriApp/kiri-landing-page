"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

const MIN = 50
const MAX = 500
const YEARS = 18
const RATE = 0.1156 / 12   // 11.56% annual → monthly
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

type Stage = "seed" | "sprout" | "sapling" | "tree"

function getStage(amount: number): Stage {
  if (amount <= 137) return "seed"
  if (amount <= 237) return "sprout"
  if (amount <= 362) return "sapling"
  return "tree"
}

const STAGE_IMAGES: Record<Stage, { src: string; alt: string; size: string; label: string }> = {
  seed:    { src: "/images/kiri-seed.png",      alt: "Semilla Kiri",              size: "w-32 h-32 md:w-40 md:h-40",   label: "Semilla" },
  sprout:  { src: "/images/kiri-sprout.png",    alt: "Árbol niño Kiri",           size: "w-40 h-40 md:w-52 md:h-52",   label: "Árbol Niño" },
  sapling: { src: "/images/kiri-sapling.png",   alt: "Árbol joven Kiri",          size: "w-48 h-48 md:w-60 md:h-60",   label: "Árbol Joven" },
  tree:    { src: "/images/kiri-tree-full.png",  alt: "Árbol Kiri adulto en flor", size: "w-64 h-64 md:w-80 md:h-80",   label: "Árbol Adulto" },
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

function useConfettiOnTree(stage: Stage) {
  const prevStageRef = useRef<Stage>(stage)
  const hasExplodedRef = useRef(false)

  useEffect(() => {
    const prev = prevStageRef.current
    prevStageRef.current = stage

    if (stage === "tree" && prev !== "tree") {
      hasExplodedRef.current = false
    }

    if (stage === "tree" && !hasExplodedRef.current) {
      hasExplodedRef.current = true
      const duration = 3000
      const end = Date.now() + duration
      const colors = ["#9333ea", "#c084fc", "#f9a8d4", "#fbbf24", "#ffffff"]

      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.65 },
          colors,
          scalar: 1.1,
        })
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.65 },
          colors,
          scalar: 1.1,
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    }
  }, [stage])
}

export default function Calculator() {
  const [monthly, setMonthly] = useState(50)
  const { total, contributed, returns } = calcFV(monthly)
  const stage = getStage(monthly)

  useConfettiOnTree(stage)

  const animTotal = useAnimatedNumber(total)
  const animContributed = useAnimatedNumber(contributed)
  const animReturns = useAnimatedNumber(returns)

  const pct = ((monthly - MIN) / (MAX - MIN)) * 100

  return (
    <section id="calculadora" className="bg-background py-20 md:py-28 px-4 md:px-8">
      {/* Section label — centred above the two columns */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2">Calculadora</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
          Haz crecer tu dinero
        </h2>
      </motion.div>

      {/* Two-column layout */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left — tree + description */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center lg:items-start gap-8 lg:w-[44%]"
        >
          {/* Tree stage visual */}
          <div className="flex flex-col items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, scale: 0.72, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.88, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: [0.34, 1.36, 0.64, 1] }}
              >
                <Image
                  src={STAGE_IMAGES[stage].src}
                  alt={STAGE_IMAGES[stage].alt}
                  width={320}
                  height={320}
                  className={`object-contain ${STAGE_IMAGES[stage].size} drop-shadow-xl`}
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/50">
              {STAGE_IMAGES[stage].label}
            </span>
          </div>

          {/* Kiri tree description */}
          <div className="text-center lg:text-left max-w-sm">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug">
              Kiri, el árbol que más rápido crece de todo el planeta
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Kiri es un árbol que puede llegar a los 30 metros de altura. Queremos conseguir que sus ahorros crezcan sanos y fuertes como un Kiri.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base mt-3">
              Crea un fondo semilla, regala inversiones en lugar de regalos materiales, impulsa su educación financiera y guarda recuerdos y memorias de las ocasiones especiales de toda la familia.
            </p>
          </div>
        </motion.div>

        {/* Right — calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:flex-1"
        >
          <div className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden">
            {/* Card header — results */}
            <div className="bg-primary/5 px-8 pt-8 pb-6 text-center border-b border-border">
              <p className="text-xs text-muted-foreground leading-relaxed mb-1">
                Ahorrando mensualmente durante{" "}
                <strong className="text-foreground">18 años</strong> con una rentabilidad media del{" "}
                <strong className="text-foreground">11,56% anual</strong>
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 mt-4">
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

            {/* Slider */}
            <div className="px-8 pt-6 pb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground">Aportación mensual</span>
                <span className="bg-primary text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full tabular-nums">
                  {monthly} €
                </span>
              </div>

              <div className="relative py-2">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border" />
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
            <div className="grid grid-cols-2 gap-3 px-8 pb-6">
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
            <div className="px-8 pb-6 flex flex-col gap-3">
              <a
                href="https://myinvestor.es"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary text-primary-foreground font-semibold text-base py-4 rounded-2xl hover:bg-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Empieza a invertir
              </a>
            </div>

            {/* Disclaimers */}
            <div className="px-8 pb-7 flex flex-col gap-2 border-t border-border pt-4">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Cálculo orientativo. La rentabilidad pasada no garantiza resultados futuros. Inversión sujeta a riesgo.
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Fuente: MyInvestor, a 31 de Mayo de 2026. Datos de Cartera Kiri Ambiciosa utilizando rentabilidad anualizada desde 1 de Enero de 2022.
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                De forma ilustrativa, utilizamos datos de rentabilidad histórica de la Cartera Kiri Ambiciosa, desde enero 2022 hasta 31 de mayo de 2026.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
