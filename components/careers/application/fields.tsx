"use client"

import { useRef, useState, type ReactNode } from "react"
import { FileText, Upload, X } from "lucide-react"
import { formatFileSize, type Choice } from "@/lib/application"

const inputBase =
  "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-kiri-ink placeholder:text-kiri-ink/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple"

function inputState(error?: string) {
  return error ? "border-destructive bg-destructive/5" : "border-kiri-lilac hover:border-kiri-purple/50"
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-kiri-ink">
      {children}
      {required && (
        <span className="text-kiri-magenta" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  )
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {error}
    </p>
  )
}

function Hint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-sm leading-relaxed text-kiri-ink/60">
      {children}
    </p>
  )
}

function describedBy(id: string, error?: string, hint?: boolean) {
  const ids = []
  if (hint) ids.push(`${id}-hint`)
  if (error) ids.push(`${id}-error`)
  return ids.length ? ids.join(" ") : undefined
}

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  autoComplete,
  placeholder,
  inputMode,
  required = true,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  type?: string
  autoComplete?: string
  placeholder?: string
  inputMode?: "text" | "email" | "tel" | "url"
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {hint && <Hint id={`${id}-hint`}>{hint}</Hint>}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, !!hint)}
        data-invalid={error ? "true" : undefined}
        className={`${inputBase} ${inputState(error)}`}
      />
      <ErrorText id={`${id}-error`} error={error} />
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  maxLength,
  error,
  rows = 5,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  maxLength: number
  error?: string
  rows?: number
  placeholder?: string
}) {
  const remaining = maxLength - value.length
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} required>
        {label}
      </Label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, true)}
        data-invalid={error ? "true" : undefined}
        className={`${inputBase} resize-y leading-relaxed ${inputState(error)}`}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <ErrorText id={`${id}-error`} error={error} />
        </div>
        <p
          id={`${id}-hint`}
          className={`text-xs tabular-nums ${remaining <= 20 ? "text-kiri-magenta" : "text-kiri-ink/60"}`}
        >
          {value.length}/{maxLength} caracteres
        </p>
      </div>
    </div>
  )
}

function ChoiceCard({
  type,
  name,
  choice,
  checked,
  onChange,
  invalid,
  describedById,
}: {
  type: "radio" | "checkbox"
  name: string
  choice: Choice
  checked: boolean
  onChange: () => void
  invalid: boolean
  describedById?: string
}) {
  return (
    <label className="group relative flex cursor-pointer">
      <input
        type={type}
        name={name}
        value={choice.value}
        checked={checked}
        onChange={onChange}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedById}
        className="peer sr-only"
      />
      <span
        className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-sm font-medium text-kiri-ink transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-kiri-purple peer-focus-visible:ring-offset-2 peer-checked:border-kiri-purple peer-checked:bg-kiri-lilac ${
          invalid ? "border-destructive/60" : "border-kiri-lilac group-hover:border-kiri-purple/50"
        }`}
      >
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center border-2 border-kiri-purple/40 bg-white transition-colors ${
            type === "radio" ? "rounded-full" : "rounded-md"
          } ${checked ? "border-kiri-purple bg-kiri-purple" : ""}`}
        >
          {checked &&
            (type === "radio" ? (
              <span className="h-2 w-2 rounded-full bg-white" />
            ) : (
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.5 6.5l2.5 2.5 4.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
        </span>
        <span className="leading-snug">{choice.label}</span>
      </span>
    </label>
  )
}

export function ChoiceGroup({
  id,
  legend,
  options,
  error,
  hint,
  layout = "grid",
  children,
  ...mode
}: {
  id: string
  legend: string
  options: Choice[]
  error?: string
  hint?: ReactNode
  layout?: "grid" | "stack"
  children?: ReactNode
} & (
  | { multiple?: false; value: string; onChange: (value: string) => void }
  | { multiple: true; value: string[]; onChange: (value: string[]) => void }
)) {
  const describedById = describedBy(id, error, !!hint)

  return (
    <fieldset
      id={id}
      data-invalid={error ? "true" : undefined}
      aria-describedby={describedById}
      className="flex min-w-0 flex-col gap-2"
    >
      <legend className="mb-1 text-sm font-semibold text-kiri-ink">
        {legend}
        <span className="text-kiri-magenta" aria-hidden="true">
          {" "}
          *
        </span>
      </legend>
      {hint && <div id={`${id}-hint`} className="text-sm leading-relaxed text-kiri-ink/60">{hint}</div>}
      <div className={layout === "grid" ? "grid gap-2 sm:grid-cols-2" : "flex flex-col gap-2"}>
        {options.map((choice) => {
          const checked = mode.multiple ? mode.value.includes(choice.value) : mode.value === choice.value
          return (
            <ChoiceCard
              key={choice.value}
              type={mode.multiple ? "checkbox" : "radio"}
              name={id}
              choice={choice}
              checked={checked}
              invalid={!!error}
              describedById={error ? `${id}-error` : undefined}
              onChange={() => {
                if (mode.multiple) {
                  mode.onChange(
                    checked ? mode.value.filter((v) => v !== choice.value) : [...mode.value, choice.value],
                  )
                } else {
                  mode.onChange(choice.value)
                }
              }}
            />
          )
        })}
      </div>
      {children}
      <ErrorText id={`${id}-error`} error={error} />
    </fieldset>
  )
}

export function FileDrop({
  id,
  file,
  error,
  onFile,
  onRemove,
}: {
  id: string
  file: File | null
  error?: string
  onFile: (file: File) => void
  onRemove: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  return (
    <div
      data-invalid={error ? "true" : undefined}
      className="flex flex-col gap-1.5"
    >
      <span id={`${id}-label`} className="text-sm font-semibold text-kiri-ink">
        Adjunta tu CV
        <span className="text-kiri-magenta" aria-hidden="true">
          {" "}
          *
        </span>
      </span>
      <p id={`${id}-hint`} className="text-sm leading-relaxed text-kiri-ink/60">
        Solo PDF, máximo 10 MB.
      </p>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        tabIndex={-1}
        aria-labelledby={`${id}-label`}
        onChange={(event) => {
          const selected = event.target.files?.[0]
          if (selected) onFile(selected)
          event.target.value = ""
        }}
      />

      {file ? (
        <div className="flex items-center gap-3 rounded-2xl border-2 border-kiri-purple bg-kiri-lilac/60 px-4 py-3">
          <FileText className="h-5 w-5 flex-shrink-0 text-kiri-purple" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-semibold text-kiri-ink">{file.name}</span>
            <span className="text-xs text-kiri-ink/60">{formatFileSize(file.size)}</span>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Quitar ${file.name}`}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-kiri-purple transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            const dropped = event.dataTransfer.files?.[0]
            if (dropped) onFile(dropped)
          }}
          className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
            dragging
              ? "border-kiri-purple bg-kiri-lilac"
              : error
                ? "border-destructive bg-destructive/5"
                : "border-kiri-purple/40 bg-white hover:bg-kiri-lilac/30"
          }`}
        >
          <Upload className="h-6 w-6 text-kiri-purple" aria-hidden="true" />
          <p className="text-sm text-kiri-ink/70">Arrastra tu CV aquí o</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-describedby={describedBy(id, error, true)}
            className="rounded-full bg-kiri-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-kiri-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2"
          >
            Seleccionar archivo
          </button>
        </div>
      )}
      <ErrorText id={`${id}-error`} error={error} />
    </div>
  )
}
