import Link from "next/link"

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Kiri leaf icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <ellipse cx="14" cy="10" rx="8" ry="10" fill="white" fillOpacity="0.9" />
            <line x1="14" y1="20" x2="14" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="14" x2="9" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="14" x2="19" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-white font-serif text-xl font-bold tracking-wide">Kiri</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="#sobre" className="text-white/80 hover:text-white transition-colors duration-300 text-sm">
            Sobre Kiri
          </Link>
          <Link href="#como-funciona" className="text-white/80 hover:text-white transition-colors duration-300 text-sm">
            Cómo funciona
          </Link>
          <Link href="#testimonios" className="text-white/80 hover:text-white transition-colors duration-300 text-sm">
            Testimonios
          </Link>
        </nav>
        <Link
          href="#reserva"
          className="bg-white text-primary px-5 py-2 text-sm font-semibold rounded-full hover:bg-white/90 transition-colors duration-300"
        >
          Reserva tu Kiri
        </Link>
      </div>
    </header>
  )
}
