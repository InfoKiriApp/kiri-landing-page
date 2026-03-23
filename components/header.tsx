"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "Sobre Kiri", href: "/#sobre" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "La Experiencia", href: "/#experiencia" },
  { label: "En los Medios", href: "/#medios" },
  { label: "Testimonios", href: "/#testimonios" },
  { label: "Kiri Academy", href: "/kiri-academy" },
]

export default function Header() {
  const pathname = usePathname()
  const isAcademy = pathname === "/kiri-academy"
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const overlayActive = !isAcademy && scrolled

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${isAcademy ? "sticky" : "absolute"} top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
        overlayActive
          ? "py-3 bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : isAcademy
          ? "py-4 bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "py-4"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/kiri-logo.svg"
            alt="Kiri"
            width={80}
            height={50}
            className={overlayActive || isAcademy ? "" : "brightness-0 invert"}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-6 items-center" aria-label="Navegación principal">
          {navLinks.map((link, i) => {
            const isActive = link.href === "/kiri-academy" && isAcademy
            const isLight = overlayActive || isAcademy
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i, ease: "easeOut" }}
              >
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    link.href === "/kiri-academy"
                      ? isAcademy
                        ? "text-primary font-semibold"
                        : isLight
                        ? "text-primary font-semibold border border-primary/40 px-3 py-1.5 rounded-full hover:bg-primary/10"
                        : "text-white bg-white/15 border border-white/30 px-3 py-1.5 rounded-full hover:bg-white/25"
                      : isLight
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/#reserva"
            className={`hidden sm:inline-flex text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
              overlayActive || isAcademy
                ? "bg-primary text-primary-foreground hover:bg-accent"
                : "bg-white text-primary hover:bg-white/90"
            }`}
          >
            Reserva tu Kiri
          </Link>

          <button
            className={`lg:hidden p-2 rounded-lg ${overlayActive || isAcademy ? "text-foreground" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/97 backdrop-blur-md border-b border-border shadow-lg px-6 py-4 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                  link.href === "/kiri-academy" && isAcademy
                    ? "text-primary bg-primary/8 font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#reserva"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:bg-accent transition-colors"
            >
              Reserva tu Kiri
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
