import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { appendRow } from "@/lib/google-sheets"

// Never cache this endpoint.
export const dynamic = "force-dynamic"

const submissionSchema = z.object({
  gifterName: z.string().trim().min(1, "El nombre es obligatorio").max(200),
  gifterEmail: z.string().trim().email("Correo electrónico no válido").max(200),
  childName: z.string().trim().min(1, "El nombre del niño/a es obligatorio").max(200),
  childAddress: z.string().trim().min(1, "La dirección es obligatoria").max(300),
  childCity: z.string().trim().min(1, "La ciudad es obligatoria").max(120),
  childPostal: z.string().trim().min(1, "El código postal es obligatorio").max(20),
  occasion: z.string().trim().min(1, "La ocasión es obligatoria").max(120),
  message: z.string().trim().max(2000).optional().default(""),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
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
    console.log("[v0] Regala Kiri validation failed:", parsed.error.flatten().fieldErrors)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const data = parsed.data
  const timestamp = new Date().toISOString()

  try {
    // Column order — keep in sync with the Google Sheet header row:
    // Timestamp | Gifter Name | Gifter Email | Child Name | Address | City | Postal | Occasion | Message
    await appendRow([
      timestamp,
      data.gifterName,
      data.gifterEmail,
      data.childName,
      data.childAddress,
      data.childCity,
      data.childPostal,
      data.occasion,
      data.message,
    ])

    console.log("[v0] Regala Kiri submission saved to Google Sheets:", {
      gifterEmail: data.gifterEmail,
      occasion: data.occasion,
      timestamp,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(
      "[v0] Regala Kiri Google Sheets error:",
      error instanceof Error ? error.message : String(error),
    )
    return NextResponse.json(
      { error: "No se pudo guardar tu solicitud. Inténtalo de nuevo en unos minutos." },
      { status: 502 },
    )
  }
}
