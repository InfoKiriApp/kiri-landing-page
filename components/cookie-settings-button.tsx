"use client"

export const OPEN_COOKIE_PREFERENCES_EVENT = "kiri:open-cookie-preferences"

export default function CookieSettingsButton({ className, label = "Configurar cookies" }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))}
      className={className}
    >
      {label}
    </button>
  )
}
