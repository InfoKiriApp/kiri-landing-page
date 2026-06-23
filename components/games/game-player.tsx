"use client"

import dynamic from "next/dynamic"
import { Gamepad2 } from "lucide-react"

const LOADERS: Record<string, ReturnType<typeof dynamic>> = {
  "3-5": dynamic(() => import("./coin-game"), { ssr: false }),
  "6-8": dynamic(() => import("./three-jars-game"), { ssr: false }),
  "9-11": dynamic(() => import("./budget-tree-game"), { ssr: false }),
  "12-14": dynamic(() => import("./stock-sim-game"), { ssr: false }),
  "15-18": dynamic(() => import("./digital-shield-game"), { ssr: false }),
  "19-22": dynamic(() => import("./life-balancer-game"), { ssr: false }),
}

export default function GamePlayer({ slug }: { slug: string }) {
  const Game = LOADERS[slug]

  if (!Game) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
        <Gamepad2 className="w-8 h-8" />
        <p>Este juego estará disponible muy pronto.</p>
      </div>
    )
  }

  return <Game />
}
