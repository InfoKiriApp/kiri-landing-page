import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Orígenes autorizados para acceder a la API.
// Agrega aquí nuevos dominios cuando sea necesario.
const allowedOrigins = [
  "https://cuenta.kiriapp.com",
  "https://www.kiriapp.com",
  "https://kiriapp.com",
]

function buildCorsHeaders(origin: string | null) {
  const headers = new Headers()

  // Solo reflejamos el origen si está en la lista de permitidos.
  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin)
  }

  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  headers.set("Access-Control-Max-Age", "86400")
  headers.set("Vary", "Origin")

  return headers
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin")
  const corsHeaders = buildCorsHeaders(origin)

  // Respondemos a las solicitudes preflight (OPTIONS) directamente.
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  // Para el resto de solicitudes, agregamos los headers CORS a la respuesta.
  const response = NextResponse.next()
  corsHeaders.forEach((value, key) => {
    response.headers.set(key, value)
  })

  return response
}

// Aplicamos el middleware solo a las rutas de la API.
export const config = {
  matcher: "/api/:path*",
}
