"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Sprout, TrendingUp, Heart, Target, PiggyBank, TreePine, Scale, type LucideIcon } from "lucide-react"

type Article = {
  icon: LucideIcon
  category: string
  title: string
  excerpt: string
  readTime: string
}

const articles: Article[] = [
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

export default function AcademyGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section className="px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.05 + (i % 3) * 0.1 + Math.floor(i / 3) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:border-primary/40 hover:shadow-md transition-all duration-300"
            >
              {/* Card header */}
              <div className="bg-primary/5 p-8 flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
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
                    Leer más &rarr;
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
