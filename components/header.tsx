"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const NAV_GROUPS = [
  {
    label: "Kiri",
    items: [
      { label: "Sobre Kiri", href: "/#sobre" },
      { label: "Cómo funciona", href: "/#como-funciona" },
      { label: "La Experiencia", href: "/#experiencia" },
      { label: "Calculadora", href: "/#calculadora" },
    ],
  },
  {
    label: "Recursos",
    items: [
      { label: "Kiri Academy", href: "/kiri-academy" },
      { label: "Kiri en los Medios", href: "/kiri-en-los-medios" },
      { label: "Testimonios", href: "/#testimonios" },
    ],
  },
]

function DropdownMenu({
  group,
  isLight,
}: {
  group: (typeof NAV_GROUPS)[0]
  isLight: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
          isLight ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {group.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-border py-2 z-50"
          >
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors rounded-xl mx-1"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const pathname = usePathname()
  const isAcademy = pathname === "/kiri-academy"
  const isMedias = pathname === "/kiri-en-los-medios"
  const isSecondaryPage = isAcademy || isMedias || pathname === "/regala-kiri"
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const overlayActive = !isSecondaryPage && scrolled

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${isSecondaryPage ? "sticky" : "absolute"} top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
        overlayActive
          ? "py-3 bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : isSecondaryPage
          ? "py-4 bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "py-4"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo + MyInvestor side by side */}
        <Link href="/" className="flex items-center gap-4 flex-shrink-0">
          <Image
            src="/images/kiri-logo.svg"
            alt="Kiri"
            width={80}
            height={50}
            className={overlayActive || isSecondaryPage ? "" : "brightness-0 invert"}
            priority
          />
          <Image
            src="/images/agente-de-my-investor.png"
            alt="Agente de MyInvestor"
            width={160}
            height={40}
            className={`h-5 w-auto object-contain hidden sm:block ${
              overlayActive || isSecondaryPage ? "opacity-60" : "brightness-0 invert opacity-70"
            }`}
          />
        </Link>

        {/* Desktop nav — two dropdowns */}
        <nav className="hidden lg:flex gap-2 items-center" aria-label="Navegación principal">
          {NAV_GROUPS.map((group) => (
            <DropdownMenu
              key={group.label}
              group={group}
              isLight={overlayActive || isSecondaryPage}
            />
          ))}
        </nav>

        {/* CTA buttons + mobile toggle */}
        <div className="flex items-center gap-2">
          {/* Iniciar Sesión */}
          <a
            href="#"
            className={`hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
              overlayActive || isSecondaryPage
                ? "text-foreground/70 hover:text-foreground border border-border hover:border-foreground/30"
                : "text-white/80 hover:text-white border border-white/30 hover:border-white/60"
            }`}
          >
            Iniciar Sesión
          </a>

          {/* Abre tu Cuenta */}
          <a
            href="#"
            className={`hidden sm:inline-flex text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
              overlayActive || isSecondaryPage
                ? "bg-primary text-primary-foreground hover:bg-accent"
                : "bg-white text-primary hover:bg-white/90"
            }`}
          >
            Abre tu Cuenta
          </a>

          {/* Regala Kiri — corner ribbon via CSS clip triangle */}
          <Link
            href="/regala-kiri"
            className="relative hidden sm:inline-flex overflow-hidden text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 group bg-[hsl(330,80%,62%)] text-white hover:bg-[hsl(330,80%,55%)]"
            aria-label="Regala Kiri"
          >
            {/* Ribbon triangle — always present, scales in on hover */}
            <span
              aria-hidden="true"
              className="absolute top-0 right-0 w-0 h-0 transition-all duration-200 group-hover:w-7 group-hover:h-7"
              style={{
                borderStyle: "solid",
                borderWidth: "0 28px 28px 0",
                borderColor: "transparent hsl(50,100%,70%) transparent transparent",
              }}
            />
            Regala Kiri
          </Link>

          <button
            className={`lg:hidden p-2 rounded-lg ${overlayActive || isSecondaryPage ? "text-foreground" : "text-white"}`}
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
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-3 pt-3 pb-1">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium py-2.5 px-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-2.5 px-3 rounded-lg text-foreground hover:bg-muted transition-colors text-center border border-border"
              >
                Iniciar Sesión
              </a>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:bg-accent transition-colors"
              >
                Abre tu Cuenta
              </a>
              <Link
                href="/regala-kiri"
                onClick={() => setMenuOpen(false)}
                className="bg-[hsl(330,80%,62%)] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:bg-[hsl(330,80%,55%)] transition-colors"
              >
                Regala Kiri
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
