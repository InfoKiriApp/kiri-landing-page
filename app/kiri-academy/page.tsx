import Header from "@/components/header"
import Footer from "@/components/footer"
import { BookOpen, Sprout, TrendingUp, Heart, Target, PiggyBank, TreePine, Scale } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    icon: Scale,
    category: "Fundamentos",
    title: "Necesidades vs. Deseos: La Brújula Financiera de Nuestros Hijos",
    excerpt:
      "¿Alguna vez has visto esa mirada de tu peque frente a un juguete nuevo, acompañada de un «¡Lo quiero!»? Una oportunidad de oro para enseñarles a diferenciar lo que necesitamos para vivir de lo que queremos.",
    readTime: "5 min",
  },
  {
    icon: PiggyBank,
    category: "Ahorro",
    title: "El Arte de Ahorrar: La Hucha Mágica",
    excerpt:
      "El impulso de gastar y obtener una recompensa inmediata es fuerte en niños y adultos. Descubre cómo convertir el ahorro en un hábito natural y emocionante desde edades tempranas.",
    readTime: "6 min",
  },
  {
    icon: TreePine,
    category: "Metáforas",
    title: "La Metáfora del Árbol y el Dinero",
    excerpt:
      "Imagínate una semilla diminuta con un potencial inmenso. Con tiempo y cuidado, esa semilla se convierte en un árbol majestuoso. Lo mismo ocurre con el dinero cuando se planta pronto.",
    readTime: "4 min",
  },
  {
    icon: Heart,
    category: "Valores",
    title: "Ser Generoso: Entender que el Dinero También Sirve para Ayudar",
    excerpt:
      "La semilla de la generosidad: cuando pensamos en dinero, a veces olvidamos que es también una herramienta para crear impacto positivo en el mundo. Aprende a cultivar esta actitud en tus hijos.",
    readTime: "5 min",
  },
  {
    icon: Target,
    category: "Objetivos",
    title: "Sembrando Sueños: Ahorro por Objetivos",
    excerpt:
      "¿Tu hijo sueña con el último videojuego, un viaje a Eurodisney o una bicicleta especial? Cuando los niños tienen un objetivo claro, descubren la motivación perfecta para ahorrar con propósito.",
    readTime: "6 min",
  },
  {
    icon: TrendingUp,
    category: "Inversión",
    title: "La Magia del Interés Compuesto: El Árbol que da Más Frutos",
    excerpt:
      "Imagina un árbol que no solo crece, sino que produce semillas que se siembran solas, creando nuevos árboles sin que tú hagas nada. Esa es exactamente la magia del interés compuesto.",
    readTime: "7 min",
  },
  {
    icon: BookOpen,
    category: "Fundamentos",
    title: "La Diferencia entre Activos y Pasivos",
    excerpt:
      "En el mundo de las finanzas, hay una distinción crucial entre lo que pone dinero en tu bolsillo y lo que lo saca. Enseña a tus hijos esta diferencia desde pequeños para encaminarles hacia la libertad financiera.",
    readTime: "5 min",
  },
  {
    icon: Sprout,
    category: "Inicio",
    title: "Introducción a la Educación Financiera en Casa",
    excerpt:
      "¿Cuál es el mejor momento para empezar a hablar de dinero con tus hijos? La respuesta es más sencilla de lo que imaginas: ¡ahora mismo! Recursos y estrategias adaptados por edades.",
    readTime: "8 min",
  },
  {
    icon: Scale,
    category: "Comportamiento",
    title: "Modelado de Comportamiento Financiero: Sé un Buen Ejemplo",
    excerpt:
      "Nuestros hijos son esponjas brillantes que absorben todo lo que ven. La tierra más fértil para que los conceptos financieros crezcan en la mente de tu hijo eres tú.",
    readTime: "6 min",
  },
  {
    icon: BookOpen,
    category: "Errores",
    title: "Errores Comunes en la Educación Financiera Infantil y Cómo Evitarlos",
    excerpt:
      "Como jardineros de Kiri, es fundamental identificar las «malas hierbas» que pueden sabotear el crecimiento financiero de nuestros hijos. Conocer estos errores nos ayuda a garantizar que el jardín florezca.",
    readTime: "7 min",
  },
]

const categories = ["Todos", "Fundamentos", "Ahorro", "Inversión", "Objetivos", "Valores", "Comportamiento", "Metáforas", "Inicio", "Errores"]

export default function KiriAcademyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-28 pb-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/15 blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground/80 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            <Sprout className="w-3.5 h-3.5" />
            Educación Financiera
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6">
            Kiri Academy
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            Guías, artículos y recursos para enseñar a tus hijos el valor del dinero, el ahorro y la inversión desde edades tempranas. Porque la mejor herencia que puedes dejar es la educación financiera.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Gratuito", "Para todas las edades", "Basado en evidencia"].map((tag) => (
              <span key={tag} className="bg-white/10 text-white/80 border border-white/20 px-4 py-1.5 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-md border-b border-border px-6 md:px-12 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 w-max">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <article
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                {/* Card header */}
                <div className="bg-primary/5 p-8 flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <article.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-7 flex flex-col flex-1 gap-4">
                  <h2 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                    <span className="text-xs text-muted-foreground">{article.readTime} de lectura</span>
                    <button className="text-sm font-semibold text-primary hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                      Leer más →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-primary px-6 md:px-12 lg:px-20 py-20 mx-6 md:mx-12 lg:mx-20 rounded-3xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <Sprout className="w-10 h-10 text-primary-foreground/60 mx-auto mb-5" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-5 text-balance">
            Planta la semilla hoy
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            La educación financiera empieza en casa. Abre una cuenta Kiri para tus seres queridos y dales el mejor regalo para su futuro.
          </p>
          <Link
            href="/#reserva"
            className="inline-flex bg-white text-primary font-semibold px-8 py-3.5 rounded-full text-sm hover:bg-white/90 transition-colors duration-300"
          >
            Reserva tu Kiri
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
