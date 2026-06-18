"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Groups that get a dropdown
const NAV_GROUPS = [
  {
    label: "Kiri",
    items: [
      { label: "Sobre Kiri",    href: "/#sobre" },
      { label: "Cómo funciona", href: "/#como-funciona" },
    ],
  },
  {
    label: "Recursos",
    items: [
      { label: "Kiri en los Medios", href: "/kiri-en-los-medios" },
      { label: "Testimonios",        href: "/#testimonios" },
    ],
  },
]

// Standalone links always visible in the nav bar
const NAV_LINKS = [
  { label: "La Experiencia", href: "/#experiencia-kiri" },
  { label: "Calculadora",    href: "/#calculadora" },
  { label: "Kiri Academy",   href: "/kiri-academy" },
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
          isLight
            ? "text-foreground/70 hover:text-foreground"
            : "text-white/80 hover:text-white"
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
  const isSecondaryPage =
    pathname === "/kiri-academy" ||
    pathname === "/kiri-en-los-medios" ||
    pathname === "/regala-kiri"
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const overlayActive = !isSecondaryPage && scrolled
  const isLight = overlayActive || isSecondaryPage

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${isSecondaryPage ? "sticky" : "absolute"} top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
        isLight
          ? "py-3 bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "py-4"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto gap-4">

        {/* Logo + MyInvestor */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/images/kiri-logo.svg"
            alt="Kiri"
            width={72}
            height={44}
            className={isLight ? "" : "brightness-0 invert"}
            priority
          />
          <Image
            src="/images/agente-de-my-investor.png"
            alt="Agente de MyInvestor"
            width={150}
            height={38}
            className={`h-5 w-auto object-contain hidden md:block ${
              isLight ? "opacity-60" : "brightness-0 invert opacity-70"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-5"
          aria-label="Navegación principal"
        >
          {/* Dropdown groups */}
          {NAV_GROUPS.map((group) => (
            <DropdownMenu key={group.label} group={group} isLight={isLight} />
          ))}

          {/* Separator */}
          <span
            className={`w-px h-4 ${isLight ? "bg-border" : "bg-white/20"}`}
            aria-hidden="true"
          />

          {/* Standalone links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                isLight
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA buttons + mobile toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Iniciar Sesión */}
          <a
            href="#"
            className={`hidden xl:inline-flex text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
              isLight
                ? "text-foreground/70 hover:text-foreground border border-border hover:border-foreground/30"
                : "text-white/80 hover:text-white border border-white/30 hover:border-white/60"
            }`}
          >
            Iniciar Sesión
          </a>

          {/* Abre tu Cuenta */}
          <a
            href="#"
            className={`hidden sm:inline-flex text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
              isLight
                ? "bg-primary text-primary-foreground hover:bg-accent"
                : "bg-white text-primary hover:bg-white/90"
            }`}
          >
            Abre tu Cuenta
          </a>

          {/* Regala Kiri — pink bow ribbon positioned at top-right corner */}
          <div className="relative hidden sm:block">
            <Link
              href="/regala-kiri"
              className="inline-flex text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 bg-[hsl(330,80%,62%)] text-white hover:bg-[hsl(330,80%,55%)]"
              aria-label="Regala Kiri"
            >
              Regala Kiri
            </Link>
            {/* Pink satin bow ribbon at top-right corner */}
            <Image
              src="/images/pink-bow-ribbon.png"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="absolute -top-4 -right-3 w-10 h-10 object-contain pointer-events-none select-none drop-shadow-sm"
            />
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg ${
              isLight ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/97 backdrop-blur-md border-b border-border shadow-lg px-6 py-4 flex flex-col gap-1"
          >
            {/* Dropdown group items flattened */}
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

            {/* Standalone links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-3 pt-3 pb-1">
                Descubre
              </p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium py-2.5 px-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTAs */}
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
