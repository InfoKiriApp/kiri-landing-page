import { Pencil } from "lucide-react"
import { describeAge, formatDisplayDate, parseIsoDate } from "@/lib/birth-date"

function getBirthDate(iso: string) {
  const date = parseIsoDate(iso)
  return date ? { display: formatDisplayDate(date), age: describeAge(date) } : null
}

type SummaryForm = {
  gifterFirstName: string
  gifterLastName: string
  gifterEmail: string
  childFirstName: string
  childLastName: string
  childBirthDate: string
  relationship: string
  parentFirstName: string
  parentLastName: string
  parentEmail: string
  street: string
  number: string
  floor: string
  postal: string
  city: string
  country: string
  occasion: string
  occasionOther: string
  message: string
}

type Props = {
  form: SummaryForm
  photoUrl: string | null
  isParent: boolean
  onEdit: (step: number) => void
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <dt className="text-xs text-muted-foreground sm:w-28 sm:flex-shrink-0 sm:pt-0.5">{label}</dt>
      <dd className="min-w-0 text-sm text-foreground break-words">{children}</dd>
    </div>
  )
}

function Section({
  title,
  step,
  onEdit,
  children,
}: {
  title: string
  step: number
  onEdit: (step: number) => void
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Editar<span className="sr-only"> {title.toLowerCase()}</span>
        </button>
      </div>
      <dl className="flex flex-col gap-2.5">{children}</dl>
    </section>
  )
}

export default function GiftSummary({ form, photoUrl, isParent, onEdit }: Props) {
  const childName = `${form.childFirstName} ${form.childLastName}`.trim()
  const occasion = form.occasion === "Otro" ? form.occasionOther || "Otra ocasión" : form.occasion
  const birth = getBirthDate(form.childBirthDate)
  const codeRecipient = isParent ? form.gifterEmail : form.parentEmail

  return (
    <div className="flex flex-col gap-4">
      {/* Hero card: the child and the occasion, which is what the gifter most wants to double-check */}
      <div className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 md:p-5">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl || "/placeholder.svg"}
            alt={`Foto de ${form.childFirstName}`}
            className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-primary font-serif text-3xl font-bold text-primary-foreground"
          >
            {form.childFirstName.charAt(0).toUpperCase() || "K"}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Un regalo para</p>
          <p className="font-serif text-xl font-bold text-foreground leading-tight text-balance">{childName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {occasion}
            {birth ? ` · ${birth.age.replace(/^Tiene/, "tiene")}` : ""}
          </p>
        </div>
      </div>

      <Section title="El regalo" step={3} onEdit={onEdit}>
        <Row label="Ocasión">{occasion}</Row>
        <Row label="Mensaje">
          {form.message.trim() ? (
            <span className="block whitespace-pre-line italic leading-relaxed">&ldquo;{form.message.trim()}&rdquo;</span>
          ) : (
            <span className="text-muted-foreground">Sin mensaje</span>
          )}
        </Row>
        <Row label="Foto">{photoUrl ? "Incluida" : <span className="text-muted-foreground">Sin foto</span>}</Row>
      </Section>

      <Section title="El niño/a" step={1} onEdit={onEdit}>
        <Row label="Nombre">{childName}</Row>
        {birth && <Row label="Nacimiento">{birth.display}</Row>}
        {!isParent && (
          <Row label="Tutor/a">
            {`${form.parentFirstName} ${form.parentLastName}`.trim()}
            <span className="block text-xs text-muted-foreground">{form.parentEmail}</span>
          </Row>
        )}
      </Section>

      <Section title="Envío del Welcome Pack" step={2} onEdit={onEdit}>
        <Row label="Dirección">
          {form.street}
          {form.number ? `, ${form.number}` : ""}
          {form.floor ? `, ${form.floor}` : ""}
          <span className="block">
            {form.postal} {form.city}, {form.country}
          </span>
        </Row>
      </Section>

      <Section title="Tus datos" step={0} onEdit={onEdit}>
        <Row label="Nombre">
          {`${form.gifterFirstName} ${form.gifterLastName}`.trim()} · {form.relationship}
        </Row>
        <Row label="Correo">{form.gifterEmail}</Row>
      </Section>

      <p className="text-xs leading-relaxed text-muted-foreground">
        El código para crear la cuenta llegará a <span className="font-semibold text-foreground">{codeRecipient}</span>.
      </p>
    </div>
  )
}
