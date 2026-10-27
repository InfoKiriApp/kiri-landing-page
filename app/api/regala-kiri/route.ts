import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { checkBirthDate, formatDisplayDate, getTodayInSpain, parseIsoDate } from "@/lib/birth-date"

// Never cache this endpoint.
export const dynamic = "force-dynamic"

// Spanish postal codes: 5 digits (00000-52999)
const SPANISH_POSTAL_REGEX = /^[0-5]\d{4}$/

const submissionSchema = z
  .object({
    gifterFirstName: z.string().trim().min(1, "El nombre es obligatorio").max(120),
    gifterLastName: z.string().trim().min(1, "Los apellidos son obligatorios").max(120),
    gifterEmail: z.string().trim().email("Correo electrónico no válido").max(200),
    childFirstName: z.string().trim().min(1, "El nombre del niño/a es obligatorio").max(120),
    childLastName: z.string().trim().min(1, "Los apellidos del niño/a son obligatorios").max(120),
    childBirthDate: z
      .string()
      .trim()
      .refine((value) => parseIsoDate(value) !== null, "La fecha de nacimiento no es válida")
      .refine(
        (value) => checkBirthDate(parseIsoDate(value), getTodayInSpain()) === "ok",
        "El niño/a debe haber nacido en los últimos 18 años y la fecha no puede ser futura",
      ),
    relationship: z.string().trim().min(1, "Indica tu relación con el niño/a").max(60),
    parentFirstName: z.string().trim().max(120).optional().default(""),
    parentLastName: z.string().trim().max(120).optional().default(""),
    parentEmail: z
      .union([z.string().trim().email("Correo del tutor no válido").max(200), z.literal("")])
      .optional()
      .default(""),
    street: z.string().trim().min(1, "La calle es obligatoria").max(200),
    number: z.string().trim().min(1, "El número es obligatorio").max(30),
    floor: z.string().trim().max(60).optional().default(""),
    postal: z
      .string()
      .trim()
      .regex(SPANISH_POSTAL_REGEX, "Código postal español no válido"),
    city: z.string().trim().min(1, "La población es obligatoria").max(120),
    country: z.string().trim().min(1).max(60).default("España"),
    occasion: z.string().trim().min(1, "La ocasión es obligatoria").max(120),
    occasionOther: z.string().trim().max(120).optional().default(""),
    message: z.string().trim().max(2000).optional().default(""),
    // Optional photo, resized to JPEG in the browser (~2 MB of base64 is a generous ceiling).
    childPhoto: z
      .union([
        z
          .string()
          .max(2_800_000, "La foto es demasiado grande")
          .regex(/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/, "Formato de foto no válido"),
        z.literal(""),
      ])
      .optional()
      .default(""),
    childPhotoName: z.string().trim().max(200).optional().default(""),
    privacy: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.occasion === "Otro" && !data.occasionOther) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["occasionOther"],
        message: "Indica cuál es la ocasión",
      })
    }

    // When the gifter is NOT the parent, guardian details are required.
    if (data.relationship !== "Padre/Madre") {
      if (!data.parentFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["parentFirstName"],
          message: "El nombre del padre/madre/tutor es obligatorio",
        })
      }
      if (!data.parentLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["parentLastName"],
          message: "Los apellidos del padre/madre/tutor son obligatorios",
        })
      }
      if (!data.parentEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["parentEmail"],
          message: "El correo del padre/madre/tutor es obligatorio",
        })
      }
    }
  })

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Cuerpo de la petición no válido" }, { status: 400 })
  }

  const parsed = submissionSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Datos del formulario no válidos"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const data = parsed.data
  const timestamp = new Date().toISOString()

  // Send to Google Sheets via webhook
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("[v0] GOOGLE_SHEETS_WEBHOOK_URL not configured")
    return NextResponse.json(
      { error: "Error de configuración del servidor. Inténtalo de nuevo en unos minutos." },
      { status: 500 }
    )
  }

  try {
    console.log("[v0] Sending Regala Kiri data to Google Sheets webhook:", {
      url: webhookUrl,
      timestamp,
      gifterEmail: data.gifterEmail,
    })

    // Keep these field names in sync with the Apps Script doPost handler (see docs/google-apps-script.gs).
    // The script reads each field by name (data.gifterFirstName, data.timestamp, etc.) and
    // appends them as a row in the order defined there:
    // Timestamp | Gifter First | Gifter Last | Gifter Email | Child First | Child Last | Child Birth Date |
    // Relationship | Parent First | Parent Last | Parent Email | Street | Number | Floor |
    // Postal | City | Country | Occasion | Message | Child Photo
    const payload = {
      timestamp,
      gifterFirstName: data.gifterFirstName,
      gifterLastName: data.gifterLastName,
      gifterEmail: data.gifterEmail,
      childFirstName: data.childFirstName,
      childLastName: data.childLastName,
      childBirthDate: formatDisplayDate(parseIsoDate(data.childBirthDate)!),
      relationship: data.relationship,
      // A parent gifter is the guardian: the account code goes to their own email.
      parentFirstName: data.relationship === "Padre/Madre" ? data.gifterFirstName : data.parentFirstName,
      parentLastName: data.relationship === "Padre/Madre" ? data.gifterLastName : data.parentLastName,
      parentEmail: data.relationship === "Padre/Madre" ? data.gifterEmail : data.parentEmail,
      street: data.street,
      number: data.number,
      floor: data.floor,
      postal: data.postal,
      city: data.city,
      country: data.country,
      occasion: data.occasion === "Otro" ? `Otro: ${data.occasionOther}` : data.occasion,
      message: data.message,
      childPhotoBase64: data.childPhoto,
      childPhotoName: data.childPhotoName,
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    })

    const responseText = await response.text()
    console.log("[v0] Google Sheets webhook response status:", response.status)
    console.log("[v0] Google Sheets webhook response:", responseText.slice(0, 300))

    if (!response.ok) {
      console.error("[v0] Webhook error:", response.status, responseText.slice(0, 300))
      return NextResponse.json(
        { error: "No se pudo guardar tu solicitud. Inténtalo de nuevo en unos minutos." },
        { status: 502 }
      )
    }

    // Try to parse JSON response from Apps Script
    let result: { result?: string; error?: string } | null = null
    try {
      result = JSON.parse(responseText)
    } catch {
      console.warn("[v0] Could not parse webhook response as JSON")
    }

    if (result?.result !== "success") {
      console.error("[v0] Webhook reported failure:", result?.error ?? responseText.slice(0, 300))
      return NextResponse.json(
        { error: "No se pudo guardar tu solicitud. Inténtalo de nuevo en unos minutos." },
        { status: 502 }
      )
    }

    console.log("[v0] Regala Kiri submission saved successfully to Google Sheets")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(
      "[v0] Regala Kiri Google Sheets error:",
      error instanceof Error ? error.message : String(error)
    )
    return NextResponse.json(
      { error: "No se pudo guardar tu solicitud. Inténtalo de nuevo en unos minutos." },
      { status: 502 }
    )
  }
}
