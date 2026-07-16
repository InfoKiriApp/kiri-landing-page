import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { appendRow } from "@/lib/google-sheets"

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
    message: z.string().trim().max(2000).optional().default(""),
    privacy: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
    }),
  })
  .superRefine((data, ctx) => {
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
  console.log("[REGALA-KIRI API] POST request received")
  
  let body: unknown
  try {
    body = await request.json()
    console.log("[REGALA-KIRI API] Request body parsed successfully")
  } catch (err) {
    console.log("[REGALA-KIRI API] ERROR: Failed to parse JSON body")
    return NextResponse.json({ error: "Cuerpo de la petición no válido" }, { status: 400 })
  }

  console.log("[REGALA-KIRI API] Validating schema...")
  const parsed = submissionSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Datos del formulario no válidos"
    console.log("[REGALA-KIRI API] Validation failed:", message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  console.log("[REGALA-KIRI API] Validation passed")
  const data = parsed.data
  const timestamp = new Date().toISOString()

  try {
    // Keep this order in sync with the Google Sheet header row (see docs/google-apps-script.gs):
    // Timestamp | Gifter First | Gifter Last | Gifter Email | Child First | Child Last |
    // Relationship | Parent First | Parent Last | Parent Email | Street | Number | Floor |
    // Postal | City | Country | Occasion | Message
    console.log("[REGALA-KIRI API] Starting appendRow call...")
    await appendRow([
      timestamp,
      data.gifterFirstName,
      data.gifterLastName,
      data.gifterEmail,
      data.childFirstName,
      data.childLastName,
      data.relationship,
      data.parentFirstName,
      data.parentLastName,
      data.parentEmail,
      data.street,
      data.number,
      data.floor,
      data.postal,
      data.city,
      data.country,
      data.occasion,
      data.message,
    ])

    console.log("[REGALA-KIRI API] appendRow completed successfully, returning success response")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("[REGALA-KIRI API] CATCH BLOCK: Exception caught")
    console.log("[REGALA-KIRI API] Error type:", error instanceof Error ? error.constructor.name : typeof error)
    console.log("[REGALA-KIRI API] Error message:", error instanceof Error ? error.message : String(error))
    if (error instanceof Error && error.stack) {
      console.log("[REGALA-KIRI API] Stack trace:", error.stack)
    }
    console.log("[REGALA-KIRI API] Returning 502 error response")
    return NextResponse.json(
      { error: "No se pudo guardar tu solicitud. Inténtalo de nuevo en unos minutos." },
      { status: 502 },
    )
  }
}
