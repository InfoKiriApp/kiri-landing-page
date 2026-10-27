"use client"

import { useId, useRef, useState } from "react"
import { Loader2, MapPin } from "lucide-react"
import type { AddressSuggestion } from "@/app/api/address-search/route"

const DEBOUNCE_MS = 450
const MIN_QUERY_LENGTH = 4

type Props = {
  value: string
  onType: (value: string) => void
  onSelect: (suggestion: AddressSuggestion) => void
  className: string
}

export default function AddressAutocomplete({ value, onType, onSelect, className }: Props) {
  const listId = useId()
  const hintId = useId()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(-1)

  const search = (query: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    abortRef.current?.abort()

    if (query.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([])
      setOpen(false)
      setLoading(false)
      return
    }

    setLoading(true)
    timerRef.current = setTimeout(async () => {
      const controller = new AbortController()
      abortRef.current = controller
      try {
        const res = await fetch(`/api/address-search?q=${encodeURIComponent(query.trim())}`, {
          signal: controller.signal,
        })
        const data = (await res.json()) as { suggestions?: AddressSuggestion[] }
        setSuggestions(data.suggestions ?? [])
        setActive(-1)
        setOpen(true)
      } catch (err) {
        if ((err as Error).name !== "AbortError") setSuggestions([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, DEBOUNCE_MS)
  }

  const choose = (suggestion: AddressSuggestion) => {
    onSelect(suggestion)
    setOpen(false)
    setSuggestions([])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => (i + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === "Escape") {
      setOpen(false)
    } else if (e.key === "Enter" && active >= 0) {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      e.preventDefault()
      choose(suggestions[active])
    }
  }

  const showList = open && (suggestions.length > 0 || !loading)

  return (
    <div className="relative">
      <MapPin
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
        aria-hidden="true"
      />
      <input
        type="text"
        name="street"
        role="combobox"
        aria-label="Calle o vía"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-describedby={hintId}
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        autoComplete="address-line1"
        placeholder="Empieza a escribir la calle *"
        value={value}
        onChange={(e) => {
          onType(e.target.value)
          search(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        required
        className={`${className} pl-10 pr-10`}
      />
      {loading && (
        <Loader2
          className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <p id={hintId} className="sr-only">
        Escribe al menos {MIN_QUERY_LENGTH} letras para ver sugerencias. Usa las flechas para moverte y Enter para elegir.
      </p>

      {showList && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-border bg-white shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          {suggestions.length > 0 ? (
            <ul id={listId} role="listbox" aria-label="Direcciones sugeridas">
              {suggestions.map((s, i) => (
                <li
                  key={s.id}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(s)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex cursor-pointer items-start gap-3 px-4 py-3 text-sm ${
                    i === active ? "bg-primary/10" : ""
                  }`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                  <span className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {s.street}
                      {s.number ? `, ${s.number}` : ""}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {[s.postal, s.city].filter(Boolean).join(" ")}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p id={listId} className="px-4 py-3 text-sm text-muted-foreground">
              No encontramos esa dirección. Puedes escribirla a mano en los campos de abajo.
            </p>
          )}
          <p className="border-t border-border px-4 py-1.5 text-[11px] text-muted-foreground">
            Datos de direcciones &copy; OpenStreetMap
          </p>
        </div>
      )}
    </div>
  )
}
