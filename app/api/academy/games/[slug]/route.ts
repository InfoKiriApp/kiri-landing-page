import { NextRequest, NextResponse } from "next/server"
import { GAMES } from "@/lib/academy-games"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const game = GAMES.find((g) => g.slug === slug)

  if (!game) {
    return NextResponse.json(
      { error: "Juego no encontrado" },
      { status: 404 },
    )
  }

  const { theme, ...gameData } = game

  return NextResponse.json({ game: gameData })
}
