import { NextRequest, NextResponse } from "next/server"
import { ARTICLES } from "@/lib/academy-articles"
import type { KiriCategory, AgeRange } from "@/lib/academy-articles"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const category = searchParams.get("kiriCategory") as KiriCategory | null
  const ageRange = searchParams.get("ageRange") as AgeRange | null
  const search = searchParams.get("search")?.toLowerCase()

  let results = ARTICLES

  if (category) {
    results = results.filter((a) => a.kiriCategory === category)
  }

  if (ageRange) {
    results = results.filter((a) => a.ageRange === ageRange)
  }

  if (search) {
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(search) ||
        a.excerpt.toLowerCase().includes(search) ||
        a.category.toLowerCase().includes(search),
    )
  }

  const simplified = results.map(({ body, ...rest }) => ({
    ...rest,
    coverUrl: rest.coverUrl,
  }))

  return NextResponse.json({
    total: simplified.length,
    articles: simplified,
  })
}
