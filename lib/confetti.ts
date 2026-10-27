const KIRI_CONFETTI_COLORS = ["#7F47B2", "#DBCDEF", "#BA2FA4", "#FAD3F1", "#495CC0"]

export async function fireKiriConfetti() {
  if (typeof window === "undefined") return
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  const { default: confetti } = await import("canvas-confetti")

  const base = {
    colors: KIRI_CONFETTI_COLORS,
    disableForReducedMotion: true,
    zIndex: 200,
    ticks: 220,
  }

  confetti({ ...base, particleCount: 90, spread: 80, startVelocity: 45, origin: { x: 0.5, y: 0.55 } })

  const end = Date.now() + 900
  const sideCannons = () => {
    confetti({ ...base, particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } })
    confetti({ ...base, particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } })
    if (Date.now() < end) requestAnimationFrame(sideCannons)
  }
  sideCannons()
}
