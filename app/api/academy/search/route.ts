import { NextRequest, NextResponse } from "next/server"
import { ARTICLES } from "@/lib/academy-articles"
import { GAMES } from "@/lib/academy-games"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const q = searchParams.get("q")?.toLowerCase()

  if (!q || q.trim().length === 0) {
    return NextResponse.json(
      { error: "El parámetro 'q' es obligatorio" },
      { status: 400 },
    )
  }

  const matchedArticles = ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.kiriCategory.toLowerCase().includes(q),
  ).map(({ body, ...rest }) => ({ type: "article" as const, ...rest }))

  const matchedGames = GAMES.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.tagline.toLowerCase().includes(q) ||
      g.skill.toLowerCase().includes(q) ||
      g.stageName.toLowerCase().includes(q),
  ).map(({ theme, faqs, howToPlay, parentLesson, ...rest }) => ({
    type: "game" as const,
    ...rest,
    howToPlay,
    parentLesson,
  }))

  return NextResponse.json({
    query: q,
    total: matchedArticles.length + matchedGames.length,
    articles: matchedArticles,
    games: matchedGames,
  })
}
