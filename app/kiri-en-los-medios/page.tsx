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
    title: "#164 - Ex-Banquera de JP Morgan Lo Confirma: \"No Tendrás Pensión de Mayor\" - Marta Echarri",
    date: "Febrero 2025",
    source: "WorldCa$t",
    href: "https://www.youtube.com/watch?v=5p368IbLs_E",
    thumbnail: "https://i.ytimg.com/vi/5p368IbLs_E/maxresdefault.jpg",
  },
  {
    title: "¿Por qué invertimos mal en España? Neobancos y educación financiera con Marta Echarri",
    date: "Abril 2025",
    source: "Finect – Invertir mejor",
    href: "https://www.youtube.com/watch?v=mqeW3HNCXdE",
    thumbnail: "https://i.ytimg.com/vi/mqeW3HNCXdE/maxresdefault.jpg",
  },
  {
    title: 'Marta Echarri: "El gran freno de las \'startups\' femeninas es la aversión de las mujeres al riesgo"',
    date: "Febrero 2026",
    source: "Artículo 14",
    href: "https://www.articulo14.es/economia/marta-echarri-el-gran-freno-de-las-startups-femeninas-es-la-aversion-de-las-mujeres-al-riesgo-20260219.html",
    thumbnail: "https://www.articulo14.es/images/articulo-marta-echarri.jpg",
  },
  {
    title: "Invierte en su Futuro, Hoy | Marta Echarri | TEDxU Comillas",
    date: "Mayo 2025",
    source: "TEDx",
    href: "https://www.youtube.com/watch?v=dcTR5Dc7_a0",
    thumbnail: "https://i.ytimg.com/vi/dcTR5Dc7_a0/maxresdefault.jpg",
  },
  {
    title: "Entrevista First Movers con Kiri | Capital Radio",
    date: "Febrero 2025",
    source: "Capital Radio",
    href: "https://www.capitalradio.es/audio/680d03116edddb3679ea2091/138017033",
    thumbnail: null,
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
                  className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col gap-0 h-full"
                >
                  {pub.thumbnail && (
                    <div className="relative h-40 md:h-48 overflow-hidden bg-primary/10">
                      <Image
                        src={pub.thumbnail}
                        alt={pub.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3 flex-1">
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
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Founder bio */}
        <section className="bg-background py-20 px-4 md:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start gap-4">
              <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/marta-echarri.png"
                  alt="Marta Echarri"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
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
