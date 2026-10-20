"use client"

import Link from "next/link"
import { ChoiceGroup, FileDrop, TextAreaField, TextField } from "./fields"
import {
  AREA_OPTIONS,
  AVAILABILITY_OPTIONS,
  COURSE_OPTIONS,
  ENGLISH_OPTIONS,
  INFO_LINKS,
  LIMITS,
  MARKETING_TOOLS_OPTIONS,
  TECH_STACK_OPTIONS,
  UNIVERSITY_OPTIONS,
  YES_NO,
  areaOption,
  type ApplicationForm,
  type Errors,
  type StepNumber,
} from "@/lib/application"
import type { JobArea } from "@/lib/careers"

type Update = <K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) => void

type BaseProps = {
  form: ApplicationForm
  update: Update
  errors: Errors
}

export function StepData({
  form,
  update,
  errors,
  showAreaQuestion,
  onSelectArea,
  cvError,
  onCv,
  onRemoveCv,
}: BaseProps & {
  showAreaQuestion: boolean
  onSelectArea: (area: JobArea) => void
  cvError?: string
  onCv: (file: File) => void
  onRemoveCv: () => void
}) {
  return (
    <div className="flex flex-col gap-7">
      {showAreaQuestion && (
        <ChoiceGroup
          id="app-area"
          legend="¿A qué puesto aplicas?"
          layout="stack"
          options={AREA_OPTIONS}
          value={form.area}
          onChange={(value) => onSelectArea(value as JobArea)}
          error={errors.area}
        />
      )}

      <TextField
        id="app-fullName"
        label="Nombre y apellidos"
        value={form.fullName}
        onChange={(value) => update("fullName", value)}
        autoComplete="name"
        error={errors.fullName}
      />
      <TextField
        id="app-email"
        label="Email"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={form.email}
        onChange={(value) => update("email", value)}
        error={errors.email}
      />
      <TextField
        id="app-phone"
        label="Móvil"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={(value) => update("phone", value)}
        error={errors.phone}
      />

      <ChoiceGroup
        id="app-readInfo"
        legend="¿Has leído/escuchado la información sobre Kiri?"
        options={YES_NO}
        value={form.readInfo}
        onChange={(value) => update("readInfo", value)}
        error={errors.readInfo}
        hint={
          <ul className="flex flex-col gap-1">
            {INFO_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kiri-purple underline underline-offset-4 hover:text-kiri-magenta focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple"
                >
                  {link.label}
                  <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        }
      />

      <ChoiceGroup
        id="app-course"
        legend="Curso de universidad"
        options={COURSE_OPTIONS}
        value={form.course}
        onChange={(value) => update("course", value)}
        error={errors.course}
      >
        {form.course === "otro" && (
          <TextField
            id="app-courseOther"
            label="¿Qué curso estás haciendo?"
            value={form.courseOther}
            onChange={(value) => update("courseOther", value)}
            error={errors.courseOther}
          />
        )}
      </ChoiceGroup>

      <ChoiceGroup
        id="app-university"
        legend="¿En qué universidad estás?"
        options={UNIVERSITY_OPTIONS}
        value={form.university}
        onChange={(value) => update("university", value)}
        error={errors.university}
      >
        {form.university === "otra" && (
          <TextField
            id="app-universityOther"
            label="¿En qué universidad estás?"
            value={form.universityOther}
            onChange={(value) => update("universityOther", value)}
            error={errors.universityOther}
          />
        )}
      </ChoiceGroup>

      <ChoiceGroup
        id="app-availability"
        legend="Disponibilidad: ¿podrías empezar de forma inmediata, Full Time?"
        layout="stack"
        options={AVAILABILITY_OPTIONS}
        value={form.availability}
        onChange={(value) => update("availability", value)}
        error={errors.availability}
      />

      <ChoiceGroup
        id="app-english"
        legend="Nivel de inglés"
        options={ENGLISH_OPTIONS}
        value={form.english}
        onChange={(value) => update("english", value)}
        error={errors.english}
      />

      <TextField
        id="app-linkedin"
        label="Perfil de LinkedIn"
        type="url"
        inputMode="url"
        autoComplete="url"
        placeholder="linkedin.com/in/tu-nombre"
        value={form.linkedin}
        onChange={(value) => update("linkedin", value)}
        error={errors.linkedin}
      />

      <FileDrop
        id="app-cv"
        file={form.cv}
        error={cvError ?? errors.cv}
        onFile={onCv}
        onRemove={onRemoveCv}
      />
    </div>
  )
}

export function StepRole({ form, update, errors }: BaseProps) {
  if (form.area === "tech") {
    return (
      <div className="flex flex-col gap-7">
        <TextField
          id="app-techPortfolio"
          label="GitHub o portfolio"
          type="url"
          inputMode="url"
          placeholder="github.com/tu-usuario"
          value={form.techPortfolio}
          onChange={(value) => update("techPortfolio", value)}
          error={errors.techPortfolio}
        />
        <ChoiceGroup
          multiple
          id="app-techStack"
          legend="Tecnologías que dominas"
          hint="Marca todas las que apliquen."
          options={TECH_STACK_OPTIONS}
          value={form.techStack}
          onChange={(value) => update("techStack", value)}
          error={errors.techStack}
        >
          {form.techStack.includes("otras") && (
            <TextField
              id="app-techStackOther"
              label="¿Qué otras tecnologías dominas?"
              value={form.techStackOther}
              onChange={(value) => update("techStackOther", value)}
              error={errors.techStackOther}
            />
          )}
        </ChoiceGroup>
      </div>
    )
  }

  if (form.area === "operaciones") {
    return (
      <div className="flex flex-col gap-7">
        <TextAreaField
          id="app-opsExperience"
          label="Experiencia previa en operaciones, desarrollo de negocio o chief of staff"
          value={form.opsExperience}
          onChange={(value) => update("opsExperience", value)}
          maxLength={LIMITS.opsExperience}
          error={errors.opsExperience}
        />
        <TextAreaField
          id="app-opsPlan"
          label="Si tuvieras que conseguir 100 familias para Kiri en un mes, ¿qué harías?"
          value={form.opsPlan}
          onChange={(value) => update("opsPlan", value)}
          maxLength={LIMITS.opsPlan}
          error={errors.opsPlan}
        />
      </div>
    )
  }

  if (form.area === "marketing") {
    return (
      <div className="flex flex-col gap-7">
        <TextField
          id="app-mktPortfolio"
          label="Portfolio o perfil de Instagram/TikTok que hayas gestionado"
          type="url"
          inputMode="url"
          placeholder="instagram.com/tu-cuenta"
          value={form.mktPortfolio}
          onChange={(value) => update("mktPortfolio", value)}
          error={errors.mktPortfolio}
        />
        <ChoiceGroup
          multiple
          id="app-mktTools"
          legend="Herramientas que manejas"
          hint="Marca todas las que apliquen."
          options={MARKETING_TOOLS_OPTIONS}
          value={form.mktTools}
          onChange={(value) => update("mktTools", value)}
          error={errors.mktTools}
        >
          {form.mktTools.includes("otras") && (
            <TextField
              id="app-mktToolsOther"
              label="¿Qué otras herramientas manejas?"
              value={form.mktToolsOther}
              onChange={(value) => update("mktToolsOther", value)}
              error={errors.mktToolsOther}
            />
          )}
        </ChoiceGroup>
        <TextAreaField
          id="app-mktPost"
          label="Escribe un post de Instagram de dos líneas para Regala Kiri"
          value={form.mktPost}
          onChange={(value) => update("mktPost", value)}
          maxLength={LIMITS.mktPost}
          rows={3}
          error={errors.mktPost}
        />
      </div>
    )
  }

  return null
}

function SummaryRow({ label, value, onEdit, editLabel }: { label: string; value: string; onEdit: () => void; editLabel: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <dt className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">{label}</dt>
        <dd className="break-words text-sm text-kiri-ink">{value}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label={editLabel}
        className="flex-shrink-0 rounded text-sm font-semibold text-kiri-purple underline underline-offset-4 hover:text-kiri-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple"
      >
        editar
      </button>
    </div>
  )
}

export function StepSend({
  form,
  update,
  errors,
  onEdit,
}: BaseProps & { onEdit: (step: StepNumber) => void }) {
  const area = areaOption(form.area)

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-xl font-bold text-kiri-ink">Revisa tu candidatura</h3>
        <p className="text-sm leading-relaxed text-kiri-ink/70">
          Esto es lo que vamos a enviar. Si algo no está bien, puedes corregirlo antes de enviar.
        </p>
      </div>

      <dl className="divide-y divide-kiri-lilac rounded-2xl border border-kiri-lilac px-4">
        <SummaryRow label="Nombre" value={form.fullName.trim()} onEdit={() => onEdit(1)} editLabel="Editar nombre" />
        <SummaryRow label="Email" value={form.email.trim()} onEdit={() => onEdit(1)} editLabel="Editar email" />
        <SummaryRow
          label="Puesto"
          value={area ? `${area.emoji} ${area.name}` : ""}
          onEdit={() => onEdit(1)}
          editLabel="Editar puesto"
        />
        <SummaryRow label="CV" value={form.cv?.name ?? ""} onEdit={() => onEdit(1)} editLabel="Editar CV" />
      </dl>

      <div className="flex flex-col gap-1.5" data-invalid={errors.consent ? "true" : undefined}>
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-kiri-lilac p-4 transition-colors has-[:checked]:border-kiri-purple has-[:checked]:bg-kiri-lilac has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-kiri-purple">
          <input
            type="checkbox"
            id="app-consent"
            checked={form.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "app-consent-error" : undefined}
            className="mt-0.5 h-5 w-5 flex-shrink-0 accent-kiri-purple"
          />
          <span className="text-sm leading-relaxed text-kiri-ink">
            Acepto que Kiri trate mis datos para este proceso de selección. Consulta la{" "}
            <Link
              href="/privacidad"
              target="_blank"
              className="font-semibold text-kiri-purple underline underline-offset-4 hover:text-kiri-magenta"
            >
              Política de privacidad
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="app-consent-error" role="alert" className="text-sm text-destructive">
            {errors.consent}
          </p>
        )}
      </div>
    </div>
  )
}
