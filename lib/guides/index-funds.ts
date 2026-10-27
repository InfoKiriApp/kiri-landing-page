import type { GuideFaq, GuideSource } from "@/lib/guides/invest-for-kids"
import { INVEST_GUIDE } from "@/lib/guides/invest-for-kids"
import { INDEXA, INDEXA_CONSULTED, INDEXA_SOURCES, TAX_NOTE, formatEuros, formatPercent } from "@/lib/indexa"

export const INDEX_FUNDS_GUIDE = {
  slug: "fondos-de-inversion-indexados",
  href: "/kiri-academy/fondos-de-inversion-indexados",
  metaTitle: "Cartera de fondos indexados para un menor: riesgos y costes | Kiri",
  description:
    "Qué es una cartera de fondos indexados para un menor, por qué no garantiza rentabilidad, qué costes tiene en Indexa Capital y qué revisar antes de contratarla.",
  eyebrow: "Guía para familias",
  title: "¿Cómo funciona una cartera de fondos indexados para un menor?",
  shortTitle: "Cartera de fondos indexados para un menor",
  author: "Equipo de Kiri Academy",
  reviewed: INDEXA_CONSULTED,
  image: {
    src: "/images/academy/fondos-de-inversion-indexados.png",
    alt: "Ilustración de una cesta con frutas variadas que representa una cartera diversificada",
  },
  disclaimer: "Esta guía es educativa y no constituye asesoramiento financiero, fiscal ni legal.",
  answer:
    "Una cartera de fondos indexados reúne inversiones diversificadas que siguen distintos índices de mercado. Puede ser una opción para invertir a largo plazo para un menor, pero su valor puede bajar y no existe una rentabilidad garantizada. Antes de contratarla, la familia debe entender quién es el titular, quién puede operar, qué costes existen y qué ocurre al cumplir 18 años.",
}

export const SECTIONS = [
  { id: "que-es", label: "Una cartera indexada reparte el dinero entre muchos mercados" },
  { id: "riesgo", label: "Los fondos indexados siguen teniendo riesgo" },
  { id: "costes", label: "Los costes reducen la rentabilidad final" },
  { id: "titular", label: "El menor es el titular y un representante opera por él" },
  { id: "fiscalidad", label: "La fiscalidad depende del producto y de la operación" },
  { id: "preguntas", label: "Preguntas frecuentes" },
  { id: "fuentes", label: "Fuentes" },
] as const

export function sectionLabel(id: (typeof SECTIONS)[number]["id"]) {
  return SECTIONS.find((section) => section.id === id)?.label ?? ""
}

export const WHAT_IS = [
  "Imagina una cesta con cientos de frutas distintas en lugar de una sola pieza. Si una se estropea, el resto de la cesta sigue ahí. Un fondo indexado funciona de forma parecida: compra muchas empresas o bonos a la vez para reproducir un índice, como el de las mayores compañías del mundo.",
  "Una cartera de fondos indexados combina varios de estos fondos, por ejemplo de acciones de distintas regiones y de bonos, en proporciones que dependen del perfil de riesgo. En Indexa Capital, la cartera se construye según el perfil inversor y se reajusta para mantener esas proporciones.",
  "Como no hay un gestor eligiendo empresas una a una, los costes de los fondos suelen ser más bajos que en la gestión activa. Eso no hace que la inversión sea más segura: solo significa que se paga menos por ella.",
]

export const DIVERSIFICATION_VS_GUARANTEE = [
  {
    title: "Lo que hace la diversificación",
    text: "Reduce la dependencia de una sola empresa, sector o país. El mal resultado de una inversión pesa menos en el conjunto.",
  },
  {
    title: "Lo que no hace",
    text: "No impide que la cartera pierda valor. Si los mercados caen en conjunto, la cartera también cae, a veces durante años.",
  },
]

export const PAST_RETURN_NOTE = {
  text: "La Cartera Kiri Ambiciosa, gestionada por Indexa Capital, utiliza fondos indexados globales. Su rentabilidad anualizada desde 2022 ha sido del 11,56 %.",
  source:
    "Fuente: Kiri, a 31 de mayo de 2026. Datos de la Cartera Kiri Ambiciosa con rentabilidad anualizada desde el 1 de enero de 2022. Las rentabilidades pasadas no garantizan rentabilidades futuras.",
}

export const COSTS_PARAGRAPHS = [
  "Cada coste se descuenta del valor de la cartera todos los años. Una diferencia que parece pequeña se acumula durante 18 años, así que conviene revisar los tres grupos: la gestión de la cartera, la custodia y los costes propios de los fondos.",
]

export const OWNERSHIP_SUMMARY = [
  {
    title: "El menor es el titular",
    text: "La cuenta se abre a nombre del menor, que es su único titular. Las aportaciones de familiares no cambian la titularidad.",
    href: `${INVEST_GUIDE.href}#titularidad`,
  },
  {
    title: "El representante abre y opera la cuenta",
    text: "Completa el cuestionario, aporta la documentación, firma el contrato y opera hasta que el menor cumple 18 años.",
    href: `${INVEST_GUIDE.href}#documentacion`,
  },
  {
    title: "A los 18 años cambia quién opera",
    text: "El representante deja de tener permisos de operación y el titular obtiene acceso a su cuenta.",
    href: `${INVEST_GUIDE.href}#mayoria-de-edad`,
  },
]

export const TAX = { note: TAX_NOTE }

export const FAQS: GuideFaq[] = [
  {
    question: "¿Cuál es la inversión inicial mínima?",
    answer: `En la cartera de fondos para menores de Indexa Capital, la inversión inicial publicada es de ${formatEuros(INDEXA.minimums.initial)}, o ${formatEuros(INDEXA.minimums.initialExistingClient)} si el representante legal ya es cliente. Las aportaciones posteriores no tienen mínimo.`,
  },
  {
    question: "¿Puede la cartera perder dinero?",
    answer:
      "Sí. El valor de una cartera de fondos indexados sube y baja con los mercados, y en algunos periodos puede quedar por debajo de lo aportado. Un horizonte largo ayuda a soportar la volatilidad, pero no garantiza recuperar el dinero.",
  },
  {
    question: "¿Qué costes tiene una cartera de fondos indexados?",
    answer: `Hay tres grupos: la comisión de gestión de cartera, la de custodia del banco y los costes de los fondos. Indexa Capital publica un coste total medio del ${formatPercent(INDEXA.fees.averageTotal)} anual, que varía según el tamaño de la cuenta y el banco custodio.`,
  },
  {
    question: "¿La inversión de un menor tiene implicaciones fiscales?",
    answer:
      "Sí, puede tenerlas. Depende del producto, de la titularidad, de las aportaciones y de cuándo se produzca un reembolso o una transmisión. Conviene revisar la documentación fiscal vigente y pedir asesoramiento profesional cuando sea necesario.",
  },
]

export const SOURCES: GuideSource[] = [
  ...INDEXA_SOURCES,
  { publisher: "CNMV", label: "Documento de datos fundamentales para el inversor", href: "https://www.cnmv.es/portal/inversor/fondos-dfi?lang=es" },
  { publisher: "CNMV", label: "Comisiones de los fondos de inversión", href: "https://www.cnmv.es/portal/inversor/fondos-comisiones?lang=es" },
  { publisher: "Fondo de Garantía de Depósitos", label: "Información sobre la garantía de depósitos", href: "https://www.fgd.es/" },
]

export const RELATED_ARTICLE_SLUGS = ["magia-interes-compuesto", "sembrando-suenos-ahorro-por-objetivos"]
