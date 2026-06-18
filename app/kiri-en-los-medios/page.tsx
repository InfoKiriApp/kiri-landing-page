import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kiri en los Medios | KiriApp",
  description:
    "Entrevistas, podcasts y apariciones de Kiri y su fundadora Marta Echarri en medios de comunicación.",
}

const publications = [
  {
    title: "Entrevista Marta Echarri en WorldCa$t con Pedro Buerbaum",
    date: "Febrero 2025",
    source: "WorldCa$t",
    href: "#",
  },
  {
    title: "Invierte en su Futuro, Hoy | Marta Echarri | TEDxU Comillas",
    date: "Mayo 2025",
    source: "TEDx",
    href: "#",
  },
  {
    title: "Entrevista First Movers con Kiri | Capital Radio",
    date: "Febrero 2025",
    source: "Capital Radio",
    href: "#",
  },
  {
    title: "Kiri: la innovadora plataforma que revoluciona la educación financiera infantil",
    date: "Febrero 2025",
    source: "Capital Radio",
    href: "#",
  },
  {
    title: "Why are we investing poorly in Spain? Neobanks and financial education with Marta Echarri",
    date: "Abril 2025",
    source: "Finect – Invertir mejor",
    href: "#",
  },
  {
    title: 'Marta Echarri: "El gran freno de las \'startups\' femeninas es la aversión de las mujeres al riesgo"',
    date: "Marzo 2025",
    source: "Artículo 14",
    href: "#",
  },
  {
    title: 'Marta Echarri: "No somos más agresivas como jefas"',
    date: "Mayo 2025",
    source: "Artículo 14",
    href: "#",
  },
  {
    title: "Ex-Banquera De JP Morgan Revela El Secreto De Los Ricos | Marta Echarri",
    date: "Septiembre 2024",
    source: "YouTube",
    href: "#",
  },
]

export default function KiriEnLosMediosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-primary pt-32 pb-20 px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-purple-200 font-semibold mb-4">
              Kiri en los Medios
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white text-balance leading-tight mb-6">
              Impulsando una nueva generación de educación financiera e inversión.
            </h1>
            <p className="text-purple-200 text-base md:text-lg leading-relaxed text-balance">
              Últimas noticias y publicaciones. Mantente informado con nuestras publicaciones recientes y noticias relevantes.
            </p>
          </div>
        </section>

        {/* Featured articles */}
        <section className="bg-muted py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              Todas las Publicaciones
            </h2>
            <p className="text-muted-foreground mb-12 leading-relaxed max-w-2xl">
              Kiri está ayudando a transformar la manera en que las nuevas generaciones aprenden sobre dinero, ahorro e inversión. A través de entrevistas, podcasts y apariciones en medios, nuestra fundadora Marta Echarri comparte la visión de hacer la educación financiera más accesible, cercana y relevante para todos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {publications.map((pub) => (
                <a
                  key={pub.title}
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-background rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/8 px-2.5 py-1 rounded-full">
                      {pub.source}
                    </span>
                    <span className="text-xs text-muted-foreground">{pub.date}</span>
                  </div>
                  <h3 className="font-serif text-base md:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {pub.title}
                  </h3>
                  <span className="text-xs text-primary font-semibold mt-auto">
                    Ver aquí →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Founder bio */}
        <section className="bg-background py-20 px-4 md:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start gap-4">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/kiri-logo.svg"
                  alt="Marta Echarri"
                  width={80}
                  height={80}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="font-serif text-xl font-bold text-foreground">Marta Echarri</h2>
                <p className="text-sm text-primary font-semibold mt-1">Fundadora de Kiri</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4">
                La fundadora de Kiri
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
                Marta Echarri cuenta con más de 20 años de experiencia en el sector financiero y transformación digital. Actualmente lidera dos proyectos de emprendimiento: Kiri, una plataforma de inversión y educación financiera para niños, y Muse Movement, una comunidad de bienestar integral en Madrid.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
                Previamente, fue CEO de Western Union International Bank y responsable de Banca Digital para Europa. También lideró N26 en España y Portugal y ocupó cargos ejecutivos en Merrill Lynch, UBS y JPMorgan, donde trabajó durante 12 años gestionando grandes patrimonios en España y Latinoamérica.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Es licenciada en ADE por ICADE (E-4) y Northeastern University, con formación adicional en transformación digital en ISDI y alumni de IE. Forma parte del Patronato de la Fundación Quiero Trabajo, del Consejo Asesor de Crescenta y es miembro fundador del Club de Inversión Calafia.
              </p>
            </div>
          </div>
        </section>

        {/* Press contact CTA */}
        <section className="bg-muted py-16 px-4 md:px-8 border-t border-border text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              ¿Quieres saber más o colaborar con nosotros?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Contacta con el equipo de Kiri para entrevistas, publicaciones o solicitudes de prensa.
            </p>
            <a
              href="mailto:info@kiriapp.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:bg-accent transition-colors duration-300 text-sm"
            >
              Contactar con el equipo de prensa
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
