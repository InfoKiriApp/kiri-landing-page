"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet, TrendingUp, Gamepad2, HeartHandshake, Plus, Minus, RotateCcw, Trophy, AlertTriangle } from "lucide-react"

const GOALS = [
  { label: "Portátil profesional", amount: 2000 },
  { label: "Ahorro para salir de casa", amount: 4000 },
  { label: "Fondo semilla para mi negocio", amount: 6000 },
]

const INCOMES = [1200, 1500, 1800]
const FIXED = [700, 900, 1100]
const SUPPORTS = [0, 200, 400]
const DEBTS = [0, 100, 250]

type Bucket = "inversion" | "liquidez" | "ocio" | "donaciones"

const BUCKETS: { id: Bucket; label: string; icon: typeof Wallet; color: string; saves: boolean }[] = [
  { id: "inversion", label: "Inversión", icon: TrendingUp, color: "bg-teal-600", saves: true },
  { id: "liquidez", label: "Ahorro / colchón", icon: Wallet, color: "bg-emerald-600", saves: true },
  { id: "ocio", label: "Ocio y caprichos", icon: Gamepad2, color: "bg-amber-500", saves: false },
  { id: "donaciones", label: "Donaciones", icon: HeartHandshake, color: "bg-rose-500", saves: false },
]

const MONTHLY_RETURN = 0.006 // ~7% annual

export default function LifeBalancerGame() {
  const [phase, setPhase] = useState<"config" | "split" | "result">("config")
  const [income, setIncome] = useState(1500)
  const [fixed, setFixed] = useState(900)
  const [support, setSupport] = useState(200)
  const [debt, setDebt] = useState(100)
  const [goal, setGoal] = useState(GOALS[1])
  const [blocks, setBlocks] = useState<Record<Bucket, number>>({ inversion: 0, liquidez: 0, ocio: 0, donaciones: 0 })

  const net = income + support - fixed - debt
  const usedBlocks = blocks.inversion + blocks.liquidez + blocks.ocio + blocks.donaciones
  const freeBlocks = 10 - usedBlocks
  const perBlock = net > 0 ? net / 10 : 0

  function addBlock(b: Bucket) {
    if (freeBlocks <= 0) return
    setBlocks((s) => ({ ...s, [b]: s[b] + 1 }))
  }
  function removeBlock(b: Bucket) {
    if (blocks[b] <= 0) return
    setBlocks((s) => ({ ...s, [b]: s[b] - 1 }))
  }

  // simulate 12 months
  const inversionMo = perBlock * blocks.inversion
  const liquidezMo = perBlock * blocks.liquidez
  let investValue = 0
  for (let m = 0; m < 12; m++) investValue = (investValue + inversionMo) * (1 + MONTHLY_RETURN)
  const liquidityValue = liquidezMo * 12
  const saved = Math.round(investValue + liquidityValue)
  const goalPct = Math.min(Math.round((saved / goal.amount) * 100), 999)

  const sustainable = blocks.ocio >= 1 // some room for life
  const hasBuffer = blocks.liquidez >= 1 // emergency cushion
  const reachedGoal = saved >= goal.amount

  function reset() {
    setPhase("config")
    setBlocks({ inversion: 0, liquidez: 0, ocio: 0, donaciones: 0 })
  }

  return (
    <div className="rounded-3xl border border-teal-200 bg-teal-50 p-5 md:p-8">
      {/* CONFIG */}
      {phase === "config" && (
        <div className="flex flex-col gap-5">
          <p className="text-sm text-muted-foreground">
            Configura tu situación real. Te quedarás con un dinero neto cada mes para repartir.
          </p>
          <Selector label="Salario / ingresos base" options={INCOMES} value={income} onChange={setIncome} suffix=" €" />
          <Selector label="Gastos fijos (alquiler, facturas, comida)" options={FIXED} value={fixed} onChange={setFixed} suffix=" €" />
          <Selector label="Apoyo externo (becas, familia)" options={SUPPORTS} value={support} onChange={setSupport} suffix=" €" />
          <Selector label="Préstamos / deudas mensuales" options={DEBTS} value={debt} onChange={setDebt} suffix=" €" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">Tu gran meta de ahorro</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {GOALS.map((g) => (
                <button
                  key={g.label}
                  onClick={() => setGoal(g)}
                  className={`rounded-2xl border p-3 text-left transition-colors ${
                    goal.label === g.label ? "border-teal-500 bg-white ring-2 ring-teal-300" : "border-teal-200 bg-white/60 hover:bg-white"
                  }`}
                >
                  <p className="text-sm font-bold text-foreground leading-snug">{g.label}</p>
                  <p className="text-xs text-teal-700 font-semibold mt-1">{g.amount.toLocaleString("es-ES")} €</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-teal-200 p-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Neto mensual para repartir</span>
            <span className={`font-serif text-xl font-bold tabular-nums ${net > 0 ? "text-teal-700" : "text-red-600"}`}>
              {net.toLocaleString("es-ES")} €
            </span>
          </div>

          {net <= 0 ? (
            <p className="flex items-center gap-2 text-sm text-red-600 font-medium">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Tus gastos superan tus ingresos. Ajusta el escenario antes de continuar.
            </p>
          ) : (
            <button
              onClick={() => setPhase("split")}
              className="w-full rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm py-3 transition-colors"
            >
              Generar mi ecosistema financiero
            </button>
          )}
        </div>
      )}

      {/* SPLIT */}
      {phase === "split" && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Reparto mensual</p>
              <p className="font-serif text-lg font-bold text-foreground">{net.toLocaleString("es-ES")} € al mes</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sin asignar</p>
              <p className="font-serif text-lg font-bold text-foreground tabular-nums">{freeBlocks * 10}%</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground -mt-2">
            Reparte tu neto en bloques del 10%. La regla 50/30/20 (necesidades/deseos/ahorro) es un buen punto de partida.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BUCKETS.map((b) => {
              const Icon = b.icon
              const pct = blocks[b.id] * 10
              return (
                <div key={b.id} className="rounded-2xl bg-white border border-teal-200 p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{b.label}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {pct}% · {Math.round(perBlock * blocks[b.id]).toLocaleString("es-ES")} €/mes
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => removeBlock(b.id)}
                      disabled={blocks[b.id] <= 0}
                      className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center disabled:opacity-30 hover:bg-teal-200 transition-colors"
                      aria-label={`Quitar 10% de ${b.label}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addBlock(b.id)}
                      disabled={freeBlocks <= 0}
                      className={`w-8 h-8 rounded-full ${b.color} text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-transform`}
                      aria-label={`Añadir 10% a ${b.label}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => setPhase("result")}
            disabled={freeBlocks > 0}
            className="w-full rounded-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-sm py-3 transition-colors"
          >
            {freeBlocks > 0 ? `Asigna el ${freeBlocks * 10}% restante` : "Simular 12 meses"}
          </button>
          <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Volver a configurar
          </button>
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && (
        <div className="flex flex-col items-center text-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              reachedGoal && sustainable && hasBuffer ? "bg-teal-600" : "bg-amber-500"
            }`}
          >
            {reachedGoal ? <Trophy className="w-8 h-8 text-white" /> : <Wallet className="w-8 h-8 text-white" />}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-1">Tras 12 meses</p>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              {saved.toLocaleString("es-ES")} € acumulados
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Meta «{goal.label}»: {goal.amount.toLocaleString("es-ES")} €
            </p>
          </div>

          <div className="w-full h-3 rounded-full bg-teal-100 overflow-hidden">
            <motion.div
              className={reachedGoal ? "h-full bg-teal-600" : "h-full bg-amber-500"}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(goalPct, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="font-serif text-lg font-bold text-foreground">{goalPct}% de tu meta</p>

          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {reachedGoal
              ? "Alcanzaste tu meta. "
              : "No llegaste a la meta este año, pero vas por buen camino. "}
            {!hasBuffer && "Sin colchón de liquidez, un imprevisto puede descarrilar todo el plan. "}
            {!sustainable && "Un plan sin nada de ocio es difícil de mantener en el tiempo. "}
            {hasBuffer && sustainable && "Equilibras inversión, colchón y vida: un plan sostenible y realista. "}
            La inversión incluye el interés compuesto a ~7% anual.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setPhase("split")}
              className="rounded-full border border-teal-300 text-teal-700 hover:bg-teal-100 font-semibold text-sm py-2.5 px-5 transition-colors"
            >
              Ajustar reparto
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm py-2.5 px-5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Nuevo escenario
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Selector({
  label,
  options,
  value,
  onChange,
  suffix = "",
}: {
  label: string
  options: number[]
  value: number
  onChange: (v: number) => void
  suffix?: string
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-xl border py-2.5 text-sm font-semibold tabular-nums transition-colors ${
              value === opt
                ? "border-teal-500 bg-teal-600 text-white"
                : "border-teal-200 bg-white text-foreground hover:bg-teal-100"
            }`}
          >
            {opt.toLocaleString("es-ES")}
            {suffix}
          </button>
        ))}
      </div>
    </div>
  )
}
