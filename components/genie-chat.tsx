"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, Send, RotateCcw, ChevronDown, ListIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FAQ_GROUPS, FALLBACK, FOLLOW_UPS, RESPONSES, faqLabel, matchFaq } from "@/lib/genie-faqs"

type MessageRole = "genie" | "user"
interface Message {
  role: MessageRole
  text: string
  followUpIds?: string[]
}

const GREETING: Message = {
  role: "genie",
  text: "¡Hola! Soy el Genio de Kiri, ¡aquí para conceder tus deseos financieros! Elige una de las preguntas frecuentes o escríbeme lo que necesites.",
}

const CHIP_CLASS =
  "text-left text-xs bg-white border border-primary/30 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"

export default function GenieChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState("")
  const [faqsShown, setFaqsShown] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [hasMoreBelow, setHasMoreBelow] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const skipAutoScroll = useRef(true)

  const updateScrollHint = useCallback(() => {
    const el = messagesRef.current
    if (!el) return
    setHasMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 24)
  }, [])

  useEffect(() => {
    if (skipAutoScroll.current) {
      skipAutoScroll.current = false
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
    const frame = requestAnimationFrame(updateScrollHint)
    return () => cancelAnimationFrame(frame)
  }, [messages, isTyping, updateScrollHint])

  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(updateScrollHint)
    const focusTimer = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(focusTimer)
    }
  }, [open, faqsShown, updateScrollHint])

  const handleOpen = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpen(true), 180)
  }, [])

  const handleLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
  }, [])

  const askGenie = (question: string, answerId: string | undefined) => {
    setFaqsShown(false)
    setMessages((prev) => [...prev, { role: "user", text: question }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          role: "genie",
          text: answerId ? RESPONSES[answerId] : FALLBACK,
          followUpIds: answerId ? FOLLOW_UPS[answerId] : undefined,
        },
      ])
    }, 620)
  }

  const handleFAQ = (id: string) => {
    const label = faqLabel(id)
    if (label) askGenie(label, id)
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setInput("")
    askGenie(trimmed, matchFaq(trimmed))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing || e.keyCode === 229) return
    handleSend()
  }

  const showAllFaqs = () => {
    setFaqsShown(true)
    requestAnimationFrame(() => faqsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  const scrollDown = () => {
    messagesRef.current?.scrollBy({ top: 220, behavior: "smooth" })
  }

  const resetChat = () => {
    skipAutoScroll.current = true
    setMessages([GREETING])
    setFaqsShown(true)
    setIsTyping(false)
    setInput("")
    messagesRef.current?.scrollTo({ top: 0 })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(22rem,calc(100vw-3rem))] sm:w-96 bg-white rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden"
            style={{ height: "min(78vh, 580px)" }}
            role="dialog"
            aria-label="Chat con el Genio de Kiri"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 overflow-hidden flex-shrink-0">
                <Image src="/images/genio-kiri.png" alt="Genio Kiri" width={36} height={36} className="object-cover w-full h-full" />
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
                  <RotateCcw className="w-4 h-4" />
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

            <div className="relative flex-1 min-h-0">
              {/* data-lenis-prevent: the home page's Lenis smooth scroll otherwise swallows wheel events here. */}
              <div
                ref={messagesRef}
                onScroll={updateScrollHint}
                data-lenis-prevent
                tabIndex={0}
                aria-label="Conversación y preguntas frecuentes"
                className="h-full overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-3 bg-[hsl(270,100%,97%)] focus-visible:outline-none"
              >
                {messages.map((msg, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "genie" && (
                        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1 bg-primary/10">
                          <Image src="/images/genio-kiri.png" alt="" width={28} height={28} className="object-cover w-full h-full" />
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

                    {msg.role === "genie" && msg.followUpIds && msg.followUpIds.length > 0 && (
                      <div className="ml-9 flex flex-col gap-1.5">
                        <p className="text-xs text-muted-foreground">Puede que también te interese:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.followUpIds.map((id) => {
                            const label = faqLabel(id)
                            if (!label) return null
                            return (
                              <button key={id} onClick={() => handleFAQ(id)} className={CHIP_CLASS}>
                                {label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1 bg-primary/10">
                      <Image src="/images/genio-kiri.png" alt="" width={28} height={28} className="object-cover w-full h-full" />
                    </div>
                    <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                {faqsShown ? (
                  <div ref={faqsRef} className="ml-9 flex flex-col gap-4 pt-1 scroll-mt-4">
                    {FAQ_GROUPS.map((group) => (
                      <section key={group.title} className="flex flex-col gap-2" aria-label={group.title}>
                        <h3 className="text-xs font-semibold text-foreground">{group.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {group.ids.map((id) => (
                            <button key={id} onClick={() => handleFAQ(id)} className={CHIP_CLASS}>
                              {faqLabel(id)}
                            </button>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  !isTyping && (
                    <button
                      onClick={showAllFaqs}
                      className="ml-9 self-start inline-flex items-center gap-1.5 text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      <ListIcon className="w-3.5 h-3.5" aria-hidden="true" />
                      Ver todas las preguntas
                    </button>
                  )
                )}

                <div ref={bottomRef} />
              </div>

              <AnimatePresence>
                {hasMoreBelow && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-2 pt-8 bg-gradient-to-t from-[hsl(270,100%,97%)] to-transparent"
                  >
                    <button
                      onClick={scrollDown}
                      className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Desliza para ver más
                      <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 px-3 py-3 border-t border-border bg-white flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                className="flex-1 min-w-0 text-sm bg-[hsl(270,100%,97%)] rounded-xl px-3.5 py-2 outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground text-foreground"
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

        {!open && <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />}

        <motion.div
          animate={open ? { scale: 1.05 } : { scale: 1 }}
          whileHover={{ scale: 1.08, rotate: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full bg-white shadow-xl border-2 border-primary/30 overflow-hidden"
        >
          <Image src="/images/genio-kiri.png" alt="Genio de Kiri — Soporte" width={64} height={64} className="object-cover w-full h-full" />
        </motion.div>
      </div>
    </div>
  )
}
