"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, Send, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Hard-coded knowledge base ────────────────────────────────────────────────

const FAQS = [
  { id: "que-es-kiri",       label: "¿Qué es Kiri?" },
  { id: "abrir-cuenta",      label: "¿Cómo abro una cuenta?" },
  { id: "quien-puede",       label: "¿Quién puede abrir una cuenta?" },
  { id: "myinvestor",        label: "¿Qué es MyInvestor?" },
  { id: "regalo",            label: "¿Cómo funciona la Tarjeta Regalo?" },
  { id: "18-anos",           label: "¿Qué pasa a los 18 años?" },
  { id: "seguridad",         label: "¿Es seguro mi dinero?" },
  { id: "kit",               label: "¿Qué incluye el Kit de Bienvenida?" },
  { id: "contribuir",        label: "¿Pueden contribuir familiares?" },
  { id: "app",               label: "¿Cómo accedo a la app?" },
]

const RESPONSES: Record<string, string> = {
  "que-es-kiri":
    "Kiri es una cuenta de ahorro e inversión diseñada para niños y adolescentes de 0 a 18 años. Permite a toda la familia contribuir al futuro financiero del menor en momentos especiales como cumpleaños, bautizos o comuniones. Al cumplir 18 años, el joven puede disponer de la inversión y todos sus rendimientos.",

  "abrir-cuenta":
    "Abrir una cuenta Kiri es muy sencillo. El titular adulto (padre, madre o tutor) completa el proceso de alta en nuestra plataforma asociada MyInvestor en pocos minutos. Necesitarás tu DNI y los datos del menor. Una vez verificada la identidad, la cuenta queda activa y lista para recibir aportaciones.",

  "quien-puede":
    "Cualquier persona mayor de edad puede abrir una cuenta Kiri a nombre de un menor de 0 a 18 años. Puede ser un padre, madre, abuelo, tío o incluso un amigo cercano de la familia. La cuenta la gestiona el adulto titular hasta que el menor cumpla 18 años.",

  "myinvestor":
    "MyInvestor es nuestro banco colaborador y la entidad de crédito que custodia los fondos. Está respaldado por el Grupo Andbank, El Corte Inglés Seguros y AXA España, y está supervisado por el Banco de España y la CNMV. Tus ahorros están garantizados por el Fondo de Garantía de Depósitos Español.",

  "regalo":
    "La Tarjeta Regalo Kiri permite a cualquier familiar o amigo hacer una aportación económica a la cuenta del menor en un momento especial. Junto con la aportación pueden dejar un mensaje de texto, audio o vídeo que quedará guardado en la cápsula del tiempo de Kiri, para que el niño lo recuerde siempre.",

  "18-anos":
    "Al cumplir 18 años el menor podrá acceder de forma autónoma a su cuenta Kiri. Podrá disponer de toda la inversión acumulada y sus rendimientos. También tendrá acceso al Álbum de los Deseos con todos los mensajes de vídeo, voz y texto que sus seres queridos fueron dejando a lo largo de los años.",

  "seguridad":
    "Tu dinero está completamente seguro. MyInvestor Banco S.A. es una entidad supervisada por el Banco de España y la CNMV. Los depósitos están cubiertos por el Fondo de Garantía de Depósitos Español, que protege hasta 100.000 € por titular. Las inversiones en fondos indexados son transparentes y reguladas.",

  "kit":
    "Al activar la cuenta Kiri, el menor recibirá un Kit de Bienvenida especial en casa. Incluye una semilla real del árbol Kiri para plantar juntos en familia y un cuento ilustrado adaptado a su edad que explica de forma divertida qué es invertir y por qué empezar pronto marca la diferencia.",

  "contribuir":
    "¡Sí! Todos los familiares y amigos pueden contribuir a la cuenta Kiri del menor. A través de la Tarjeta Regalo pueden hacer aportaciones puntuales en ocasiones especiales: cumpleaños, Navidad, Primera Comunión, vuelta al cole o cualquier otro momento. Cada aportación puede ir acompañada de un mensaje personal.",

  "app":
    "Tanto el titular adulto como el menor (cuando tenga la edad adecuada) tienen acceso a la KiriApp. Desde la app podéis consultar el estado de la inversión, ver el crecimiento del árbol Kiri, acceder a todos los mensajes y vídeos de los seres queridos y establecer metas de ahorro. ¡Próximamente disponible en App Store y Google Play!",
}

// ─── Keyword matcher for free-text input ─────────────────────────────────────

const KEYWORD_MAP: { keys: string[]; id: string }[] = [
  { keys: ["qué es", "que es", "kiri", "cuenta"],                    id: "que-es-kiri" },
  { keys: ["abrir", "alta", "registro", "crear", "abro"],            id: "abrir-cuenta" },
  { keys: ["quién", "quien", "puede", "edad", "menor", "0 a 18"],    id: "quien-puede" },
  { keys: ["myinvestor", "banco", "entidad", "colaborador"],         id: "myinvestor" },
  { keys: ["tarjeta", "regalo", "gift", "card"],                     id: "regalo" },
  { keys: ["18", "dieciocho", "mayoría", "mayoria", "disponer"],     id: "18-anos" },
  { keys: ["seguro", "seguridad", "garantía", "garantia", "fondo"],  id: "seguridad" },
  { keys: ["kit", "bienvenida", "semilla", "cuento", "árbol"],       id: "kit" },
  { keys: ["familiar", "familiares", "contribuir", "aportar"],       id: "contribuir" },
  { keys: ["app", "aplicación", "aplicacion", "acceder", "acceso"],  id: "app" },
]

const FALLBACK =
  "¡Gracias por tu pregunta! Nuestro equipo de soporte estará encantado de ayudarte. Puedes escribirnos a hola@kiriapp.com o consultar más información en kiriapp.com. ¿Hay algo más en lo que pueda ayudarte?"

function matchResponse(text: string): string {
  const lower = text.toLowerCase()
  for (const { keys, id } of KEYWORD_MAP) {
    if (keys.some((k) => lower.includes(k))) return RESPONSES[id]
  }
  return FALLBACK
}

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageRole = "genie" | "user"
interface Message {
  role: MessageRole
  text: string
}

const GREETING: Message = {
  role: "genie",
  text: "¡Hola! Soy el Genio de Kiri, ¡aquí para conceder tus deseos financieros! Elige una de las preguntas frecuentes o escríbeme lo que necesites.",
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GenieChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState("")
  const [faqsShown, setFaqsShown] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const handleOpen = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpen(true), 180)
  }, [])

  const handleLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
  }, [])

  const addMessage = (role: MessageRole, text: string) => {
    setMessages((prev) => [...prev, { role, text }])
  }

  const handleFAQ = (id: string) => {
    const faq = FAQS.find((f) => f.id === id)
    if (!faq) return
    setFaqsShown(false)
    addMessage("user", faq.label)
    setTimeout(() => addMessage("genie", RESPONSES[id]), 420)
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setFaqsShown(false)
    setInput("")
    addMessage("user", trimmed)
    setTimeout(() => addMessage("genie", matchResponse(trimmed)), 420)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend()
  }

  const resetChat = () => {
    setMessages([GREETING])
    setFaqsShown(true)
    setInput("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[22rem] sm:w-96 bg-white rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden"
            style={{ maxHeight: "min(80vh, 600px)" }}
            role="dialog"
            aria-label="Chat con el Genio de Kiri"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 overflow-hidden flex-shrink-0">
                <Image
                  src="/images/genio-kiri.png"
                  alt="Genio Kiri"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight">Genio Kiri</p>
                <p className="text-xs text-purple-200 leading-tight">Soporte · Siempre disponible</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={resetChat}
                  className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Reiniciar conversación"
                  title="Reiniciar"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[hsl(270,100%,97%)]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "genie" && (
                    <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1 bg-primary/10">
                      <Image
                        src="/images/genio-kiri.png"
                        alt=""
                        width={28}
                        height={28}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "genie"
                        ? "bg-white text-foreground rounded-tl-sm shadow-sm border border-border"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* FAQ chips — shown after greeting */}
              {faqsShown && (
                <div className="pt-1">
                  <p className="text-xs text-muted-foreground mb-2 ml-9">Preguntas frecuentes:</p>
                  <div className="flex flex-wrap gap-2 ml-9">
                    {FAQS.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => handleFAQ(faq.id)}
                        className="text-xs bg-white border border-primary/30 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {faq.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 border-t border-border bg-white flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                className="flex-1 text-sm bg-[hsl(270,100%,97%)] rounded-xl px-3.5 py-2 outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground text-foreground"
                aria-label="Escribe tu pregunta al Genio"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0"
                aria-label="Enviar"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Genie trigger button */}
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleLeave}
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
        aria-label="Abrir chat con el Genio de Kiri"
        aria-expanded={open}
        className="relative cursor-pointer select-none group"
      >
        {/* Tooltip on hover when closed */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute right-full mr-3 bottom-4 pointer-events-none"
            >
              <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ¡Pide un deseo!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
        )}

        {/* Genie avatar */}
        <motion.div
          animate={open ? { scale: 1.05 } : { scale: 1 }}
          whileHover={{ scale: 1.08, rotate: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full bg-white shadow-xl border-2 border-primary/30 overflow-hidden"
        >
          <Image
            src="/images/genio-kiri.png"
            alt="Genio de Kiri — Soporte"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  )
}
