import { NextResponse } from "next/server"

export type AddressSuggestion = {
  id: string
  label: string
  street: string
  number: string
  postal: string
  city: string
}

type NominatimResult = {
  place_id: number
  address?: Record<string, string | undefined>
}

const MIN_QUERY_LENGTH = 4
const MAX_QUERY_LENGTH = 120
const ONE_DAY_SECONDS = 60 * 60 * 24

function toSuggestion(result: NominatimResult): AddressSuggestion | null {
  const a = result.address ?? {}
  const street = a.road ?? a.pedestrian ?? a.footway ?? a.square ?? ""
  const city = a.city ?? a.town ?? a.village ?? a.municipality ?? ""
  if (!street || !city) return null

  const number = a.house_number ?? ""
  const postal = a.postcode ?? ""
  const label = `${street}${number ? `, ${number}` : ""} · ${postal ? `${postal} ` : ""}${city}`
  return { id: String(result.place_id), label, street, number, postal, city }
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? ""
  if (q.length < MIN_QUERY_LENGTH || q.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ suggestions: [] })
  }

  const url = new URL("https://nominatim.openstreetmap.org/search")
  url.search = new URLSearchParams({
    q,
    format: "jsonv2",
    addressdetails: "1",
    countrycodes: "es",
    layer: "address",
    limit: "6",
    "accept-language": "es",
  }).toString()

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "KiriRegala/1.0 (info@kiriapp.com)" },
      next: { revalidate: ONE_DAY_SECONDS },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return NextResponse.json({ suggestions: [] }, { status: 502 })

    const results = (await res.json()) as NominatimResult[]
    const seen = new Set<string>()
    const suggestions = results
      .map(toSuggestion)
      .filter((s): s is AddressSuggestion => {
        if (!s || seen.has(s.label)) return false
        seen.add(s.label)
        return true
      })
      .slice(0, 5)

    return NextResponse.json(
      { suggestions },
      { headers: { "Cache-Control": `public, s-maxage=${ONE_DAY_SECONDS}` } },
    )
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 502 })
  }
}
