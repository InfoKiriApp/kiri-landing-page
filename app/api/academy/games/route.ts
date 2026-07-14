import { NextRequest, NextResponse } from "next/server"
import { GAMES } from "@/lib/academy-games"
import type { GameStage } from "@/lib/academy-games"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const stage = searchParams.get("stage") as GameStage | null

  let results = GAMES

  if (stage) {
    results = results.filter((g) => g.stage === stage)
  }

  const simplified = results.map(({ theme, faqs, howToPlay, parentLesson, ...rest }) => ({
    ...rest,
    howToPlay,
    parentLesson,
  }))

  return NextResponse.json({
    total: simplified.length,
    games: simplified,
  })
}
