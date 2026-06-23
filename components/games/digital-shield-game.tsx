"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, ShieldAlert, Check, X, Smartphone, RotateCcw, Play } from "lucide-react"

type Case = { text: string; channel: string; threat: boolean; why: string }

const CASES: Case[] = [
  { text: "Tu banco te pide por SMS la contraseña completa para «verificar» tu cuenta.", channel: "SMS", threat: true, why: "Ningún banco pide tu contraseña completa. Es phishing clásico." },
  { text: "Tu app bancaria avisa de un nuevo inicio de sesión en tu cuenta.", channel: "App banco", threat: false, why: "Es una alerta legítima de seguridad. Útil para detectar accesos extraños." },
  { text: "«¡Has ganado un iPhone! Haz clic aquí para reclamarlo ahora.»", channel: "Email", threat: true, why: "Premios que no has pedido = cebo. El enlace roba datos o instala malware." },
  { text: "Un amigo verificado te etiqueta en una foto del finde.", channel: "Instagram", threat: false, why: "Interacción normal entre contactos conocidos." },
  { text: "«Inversión garantizada: duplica tu dinero en 48 horas, plazas limitadas.»", channel: "DM", threat: true, why: "Rentabilidad garantizada y prisa son señales de estafa. No existe el dinero fácil." },
  { text: "Recordatorio para activar la verificación en dos pasos.", channel: "Ajustes", threat: false, why: "Es una buena práctica de seguridad: protege tus cuentas con doble factor." },
  { text: "«Tu cuenta será bloqueada en 24h. Verifica tus datos aquí: bit.ly/xz9»", channel: "Email", threat: true, why: "Urgencia + enlace acortado sospechoso = phishing. Entra siempre por la web oficial." },
  { text: "Un desconocido te ofrece 500 €/día por trabajar desde el móvil.", channel: "Telegram", threat: true, why: "Ofertas de empleo irreales de desconocidos suelen ser fraudes o blanqueo." },
  { text: "La tienda oficial te avisa de una actualización de tu app.", channel: "Sistema", threat: false, why: "Actualizar desde la tienda oficial es seguro y recomendable." },
  { text: "«Soy tu primo, perdí el móvil, mándame 200 € a este número ya.»", channel: "WhatsApp", threat: true, why: "Suplantación de familiar con urgencia. Verifica siempre por otra vía antes de pagar." },
]

export default function DigitalShieldGame() {
  const [started, setStarted] = useState(false)
  const [idx, setIdx] = useState(0)
  const [shield, setShield] = useState(100)
  const [correct, setCorrect] = useState(0)
  const [feedback, setFeedback] = useState<null | boolean>(null)

  const c = CASES[idx]
  const finished = idx >= CASES.length

  function answer(asThreat: boolean) {
    if (feedback !== null) return
    const ok = asThreat === c.threat
    setFeedback(ok)
    if (ok) setCorrect((n) => n + 1)
    else setShield((s) => Math.max(0, s - 12))
  }

  function next() {
    setFeedback(null)
    setIdx((i) => i + 1)
  }

  function start() {
    setStarted(true)
    setIdx(0)
    setShield(100)
    setCorrect(0)
    setFeedback(null)
  }

  if (!started) {
    return (
      <div className="rounded-3xl border border-sky-200 bg-sky-50 p-8 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-sky-600 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">El Escudo Digital</h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          Llegan notificaciones a tu móvil. Decide si cada una es segura o una amenaza. Cada acierto mantiene tu
          escudo; cada fallo lo debilita. ¿Llegarás al final con el escudo intacto?
        </p>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-3 px-7 transition-colors"
        >
          <Play className="w-4 h-4" />
          Encender dispositivo
        </button>
      </div>
    )
  }

  if (finished) {
    const safe = shield >= 60
    return (
      <div className="rounded-3xl border border-sky-200 bg-sky-50 p-8 text-center flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl ${safe ? "bg-sky-600" : "bg-amber-500"} flex items-center justify-center`}>
          {safe ? <ShieldCheck className="w-8 h-8 text-white" /> : <ShieldAlert className="w-8 h-8 text-white" />}
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">Escudo final: {shield}%</h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          Acertaste {correct} de {CASES.length} notificaciones.{" "}
          {safe
            ? "Sabes detectar las trampas más comunes. Mantén la verificación en dos pasos y desconfía de las prisas."
            : "Algunas trampas se colaron. Recuerda: urgencia, premios y rentabilidades garantizadas son siempre señales de alerta."}
        </p>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-2.5 px-6 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-sky-200 bg-sky-50 p-5 md:p-8">
      {/* Shield meter */}
      <div className="flex items-center gap-3 mb-5">
        <ShieldCheck className={`w-6 h-6 flex-shrink-0 ${shield >= 60 ? "text-sky-600" : "text-amber-500"}`} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600">Escudo</span>
            <span className="text-xs font-bold text-foreground">{shield}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-sky-100 overflow-hidden">
            <motion.div
              className={shield >= 60 ? "h-full bg-sky-600" : "h-full bg-amber-500"}
              animate={{ width: `${shield}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground flex-shrink-0">{idx + 1}/{CASES.length}</span>
      </div>

      {/* Notification card */}
      <div className="relative rounded-2xl bg-white border border-sky-200 p-5 mb-5 min-h-[9rem] flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-sky-600" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{c.channel}</span>
        </div>
        <p className="text-foreground font-medium leading-relaxed flex-1">{c.text}</p>

        <AnimatePresence>
          {feedback !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl p-5 text-white ${
                feedback ? "bg-sky-600/97" : "bg-amber-500/97"
              }`}
            >
              {feedback ? <Check className="w-7 h-7" /> : <X className="w-7 h-7" />}
              <p className="font-bold text-sm">{feedback ? "¡Bien visto!" : "¡Cuidado!"}</p>
              <p className="text-sm text-center leading-snug text-white/90">{c.why}</p>
              <button
                onClick={next}
                className="mt-2 rounded-full bg-white/20 hover:bg-white/30 font-semibold text-sm py-1.5 px-5 transition-colors"
              >
                Siguiente
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => answer(false)}
          disabled={feedback !== null}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-semibold text-sm py-3 transition-colors"
        >
          <Check className="w-4 h-4" />
          Es seguro
        </button>
        <button
          onClick={() => answer(true)}
          disabled={feedback !== null}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-amber-300 text-amber-700 hover:bg-amber-50 disabled:opacity-50 font-semibold text-sm py-3 transition-colors"
        >
          <ShieldAlert className="w-4 h-4" />
          Es una amenaza
        </button>
      </div>
    </div>
  )
}
