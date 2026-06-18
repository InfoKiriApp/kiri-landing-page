"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import Hero from "@/components/hero"
import SobreKiri from "@/components/sobre-kiri"
import ExperienciaKiri from "@/components/experiencia-kiri"
import Featured from "@/components/featured"
import Calculator from "@/components/calculator"
import Promo from "@/components/promo"
import Media from "@/components/media"
import Footer from "@/components/footer"

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main>
      <Hero />
      <SobreKiri />
      <ExperienciaKiri />
      <Featured />
      <Calculator />
      <Promo />
      <Media />
      <Footer />
    </main>
  )
}
