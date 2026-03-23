"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react"

type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = "kiri-cookie-consent"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      // slight delay so banner doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const save = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    setVisible(false)
  }

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true })

  const acceptSelected = () => save(preferences)

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preferencias de cookies"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 lg:p-6 flex justify-center items-end pointer-events-none"
    >
      <div
        className="pointer-events-auto w-full max-w-2xl rounded-2xl shadow-2xl border border-purple-200 bg-white/95 backdrop-blur-md overflow-hidden animate-in slide-in-from-bottom-4 duration-500"
        style={{ boxShadow: "0 -4px 40px hsl(272 65% 48% / 0.12), 0 8px 32px rgba(0,0,0,0.08)" }}
      >
        {/* Top stripe */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(272,65%,48%), hsl(272,80%,70%), hsl(272,90%,83%))" }} />

        <div className="p-5 sm:p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <Cookie size={18} />
              </span>
              <h2 className="text-base font-semibold text-foreground font-sans leading-snug">
                Usamos cookies
              </h2>
            </div>
            <button
              onClick={() => save({ necessary: true, analytics: false, marketing: false })}
              aria-label="Cerrar y aceptar solo las necesarias"
              className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:bg-purple-50 hover:text-purple-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y mostrarte contenido relevante. Puedes aceptar todas o personalizar tus preferencias.{" "}
            <Link
              href="/politica-de-cookies"
              className="text-purple-600 underline underline-offset-2 hover:text-purple-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Política de cookies
            </Link>
          </p>

          {/* Expandable preferences */}
          <div className="mt-4">
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="cookie-preferences-panel"
              className="flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expanded ? "Ocultar opciones" : "Personalizar preferencias"}
            </button>

            {expanded && (
              <div
                id="cookie-preferences-panel"
                className="mt-3 rounded-xl border border-purple-100 bg-purple-50/50 divide-y divide-purple-100"
              >
                {/* Necessary — always on */}
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      id="cookie-necessary"
                      checked
                      disabled
                      className="w-4 h-4 rounded accent-purple-600 cursor-not-allowed opacity-60"
                    />
                  </div>
                  <label htmlFor="cookie-necessary" className="cursor-default">
                    <span className="text-sm font-medium text-foreground">Necesarias</span>
                    <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-purple-600 bg-purple-100 rounded px-1.5 py-0.5">
                      Siempre activas
                    </span>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      Esenciales para el correcto funcionamiento del sitio. No pueden desactivarse.
                    </p>
                  </label>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      id="cookie-analytics"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                      }
                      className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="cookie-analytics" className="cursor-pointer">
                    <span className="text-sm font-medium text-foreground">Analíticas</span>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      Nos ayudan a entender cómo interactúas con la web para mejorar nuestros servicios.
                    </p>
                  </label>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      id="cookie-marketing"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                      }
                      className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="cookie-marketing" className="cursor-pointer">
                    <span className="text-sm font-medium text-foreground">Marketing</span>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      Permiten mostrarte publicidad personalizada y medir su efectividad.
                    </p>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 sm:justify-end">
            {expanded && (
              <button
                onClick={acceptSelected}
                className="px-4 py-2 rounded-xl border border-purple-300 text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Guardar preferencias
              </button>
            )}
            {!expanded && (
              <button
                onClick={() => save({ necessary: true, analytics: false, marketing: false })}
                className="px-4 py-2 rounded-xl border border-purple-300 text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Solo necesarias
              </button>
            )}
            <button
              onClick={acceptAll}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ background: "hsl(272, 65%, 48%)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(272, 68%, 38%)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(272, 65%, 48%)")}
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
