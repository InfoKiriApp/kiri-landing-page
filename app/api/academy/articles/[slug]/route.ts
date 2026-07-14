import { NextRequest, NextResponse } from "next/server"
import { ARTICLES } from "@/lib/academy-articles"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const article = ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    return NextResponse.json(
      { error: "Artículo no encontrado" },
      { status: 404 },
    )
  }

  return NextResponse.json({ article })
}
