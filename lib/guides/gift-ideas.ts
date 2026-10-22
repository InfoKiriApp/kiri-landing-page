import type { GuideFaq, GuideSource } from "@/lib/guides/invest-for-kids"
import { INVEST_GUIDE } from "@/lib/guides/invest-for-kids"

import { INDEXA, INDEXA_CONSULTED, formatPercent } from "@/lib/indexa"

// Datos de Indexa Capital tomados de lib/indexa.ts (consultados en INDEXA_CONSULTED).
// Los que siguen en null dependen de Kiri y la página remite a las condiciones de Regala Kiri.
export const productFacts = {
  provider: INDEXA.name,
  consulted: INDEXA_CONSULTED,
  // TODO(producto): precio del regalo Regala Kiri.
  setupPrice: null,
  // TODO(producto): contenido exacto del Welcome Pack.
  welcomePack: null,
  fees: `Coste total medio publicado del ${formatPercent(INDEXA.fees.averageTotal)} anual`,
  legalDocuments: INDEXA.documents,
  adulthoodProcess: INDEXA.adulthood,
} as const

export const GIFT_GUIDE = {
  href: "/kiri-academy/regalos-financieros-para-ninos",
  metaTitle: "Regalos financieros para niños: ahorro o inversión | Kiri Academy",
  description:
    "Descubre qué diferencias hay entre regalar dinero, ahorrar e invertir para un niño, y qué revisar sobre titularidad, riesgo, costes, fiscalidad y plazo.",
  eyebrow: "Ahorro e inversión",
  title: "Regalos financieros para niños: cómo regalar ahorro o inversión con sentido",
  shortTitle: "Regalos financieros para niños",
  intro:
    "Para un cumpleaños, un bautizo, una comunión o una aportación de los abuelos, hay varias formas de regalar futuro. La mejor opción depende del objetivo, el plazo, la titularidad y el riesgo que la familia esté dispuesta a asumir.",
  ages: "De 0 a 18 años",
  author: "Equipo de Kiri Academy",
  reviewed: { iso: "2026-10-22", label: "22 de octubre de 2026" },
  image: {
    src: "/images/academy/regalos-financieros-para-ninos.png",
    alt: "Ilustración de una tarjeta regalo con lazo junto a una maceta de la que brota una planta y una pequeña gráfica sin cifras",
  },
  answer:
    "Si el objetivo está a muchos años vista y la familia entiende que el valor puede subir y bajar, una inversión diversificada puede encajar. Si el dinero puede hacer falta pronto o no se acepta una posible pérdida, el ahorro en efectivo suele ser más sencillo. Antes de decidir, hay que revisar la titularidad, los costes, las condiciones y la fiscalidad.",
  disclaimer:
    "Este contenido es educativo y no constituye una recomendación personalizada de inversión, asesoramiento financiero ni asesoramiento fiscal.",
  conditionsNotice:
    "Las condiciones comerciales y del producto pueden cambiar. Consulta siempre la información vigente antes de contratar.",
}

export const SECTIONS = {
  tipos: {
    label: "Qué tipo de regalo quieres hacer",
    title: "Un regalo financiero puede durar más que una celebración",
    summary:
      "Hay tres caminos habituales: dinero para gastar, una cuenta de ahorro o una inversión a largo plazo. Ninguno es correcto para todas las familias.",
  },
  comparativa: {
    label: "Dinero, ahorro o inversión",
    title: "Dinero, ahorro o inversión: qué revisar en cada caso",
    summary: "Cada opción encaja con un tipo de objetivo y tiene un límite principal que conviene conocer de antemano.",
  },
  edad: {
    label: "La edad del niño",
    title: "La edad del niño cambia la conversación, no elimina la decisión adulta",
    summary:
      "El niño puede participar según su edad, pero la decisión sobre el producto, el riesgo y la titularidad sigue siendo de los adultos.",
  },
  titularidad: {
    label: "Quién abre y gestiona la cuenta",
    title: "Los padres tutelan la cuenta, aunque el regalo lo haga otra persona",
    summary:
      "Quien regala y quien representa legalmente al menor no tienen por qué ser la misma persona. La cuenta la gestiona el representante legal.",
  },
  horizonte: {
    label: "El horizonte temporal",
    title: "El horizonte temporal debe estar definido antes de elegir",
    summary: "Cuanto antes se necesite el dinero, más pesan la disponibilidad y la estabilidad frente al crecimiento.",
  },
  riesgo: {
    label: "Riesgo y comisiones",
    title: "Las comisiones y el riesgo importan más que una rentabilidad pasada",
    summary: "Antes de elegir, mira el nivel de riesgo, los costes y el plazo de reembolso, no lo que ganó el producto en el pasado.",
  },
  fiscalidad: {
    label: "Fiscalidad",
    title: "La fiscalidad depende de la operación y de la situación familiar",
    summary:
      "Regalar dinero, depositarlo o invertirlo no son necesariamente la misma operación fiscal. Influyen el importe, el parentesco y la comunidad autónoma.",
  },
  "regala-kiri": {
    label: "Cómo funciona Regala Kiri",
    title: "Cómo funciona Regala Kiri",
    summary:
      "Quien regala inicia el proceso con los datos del regalo, y el padre, la madre o el tutor legal es quien completa la apertura de la cuenta.",
  },
  checklist: {
    label: "Checklist antes de regalar",
    title: "Checklist antes de hacer el regalo",
    summary: "Siete comprobaciones para que el regalo encaje con el plazo y la familia mantenga el control de la decisión.",
  },
  preguntas: { label: "Preguntas frecuentes", title: "Preguntas frecuentes", summary: "" },
  fuentes: { label: "Fuentes", title: "Fuentes para seguir aprendiendo", summary: "" },
} as const

export type GiftSectionId = keyof typeof SECTIONS

export const TOC = (Object.keys(SECTIONS) as GiftSectionId[]).map((id) => ({ id, label: SECTIONS[id].label }))

export const GIFT_PATHS = [
  "Entregar dinero para gastar.",
  "Guardarlo en una cuenta de ahorro.",
  "Invertirlo a largo plazo.",
]

export const GIFT_INTRO =
  "La decisión depende de para qué se quiere usar el dinero, cuándo podría necesitarse, quién será el titular y qué riesgo se está dispuesto a asumir."

export type GiftType = { kind: "cash" | "savings" | "investment"; title: string; text: string; note: string }

export const GIFT_TYPES: GiftType[] = [
  {
    kind: "cash",
    title: "Regalar dinero da libertad inmediata",
    text: "Un sobre con dinero es fácil de entregar y no requiere abrir una cuenta. Puede ser una buena opción cuando el niño necesita comprar algo concreto o cuando el regalo tiene un horizonte corto.",
    note: "Puede mezclarse con otros gastos y no siempre crea un hábito de ahorro.",
  },
  {
    kind: "savings",
    title: "Ahorrar separa el dinero y facilita su disponibilidad",
    text: "Una cuenta de ahorro permite separar el dinero y mantenerlo disponible con mayor facilidad. Es útil para un objetivo cercano, una primera experiencia con el dinero o una familia que prioriza la estabilidad y la liquidez.",
    note: "La protección depende de la entidad y del producto. Una garantía de depósitos no equivale a proteger el valor de una inversión.",
  },
  {
    kind: "investment",
    title: "Invertir busca un objetivo lejano y acepta fluctuaciones",
    text: "Una inversión puede tener sentido cuando el objetivo está a largo plazo, por ejemplo, estudios, formación, el carnet de conducir o un proyecto al alcanzar la mayoría de edad. Un plazo largo puede dar más margen para atravesar subidas y bajadas del mercado, pero no elimina el riesgo ni asegura recuperar el capital.",
    note: "Un producto diversificado no es un producto sin riesgo.",
  },
]

export type GiftComparisonRow = { option: string; fit: string; check: string; limit: string }

export const COMPARISON_FIELDS = [
  { key: "fit", label: "Cuándo puede encajar" },
  { key: "check", label: "Qué revisar" },
  { key: "limit", label: "Principal límite" },
] as const

export const COMPARISON: GiftComparisonRow[] = [
  {
    option: "Dinero",
    fit: "Compras u objetivos próximos.",
    check: "Uso previsto y acuerdo familiar.",
    limit: "Puede gastarse sin crear hábito de ahorro.",
  },
  {
    option: "Ahorro",
    fit: "Objetivos cercanos y prioridad por liquidez.",
    check: "Remuneración, saldo cubierto y comisiones.",
    limit: "Puede ofrecer menor crecimiento a largo plazo.",
  },
  {
    option: "Inversión",
    fit: "Objetivos lejanos y horizonte amplio.",
    check: "Riesgo, costes, diversificación y liquidez.",
    limit: "El valor puede bajar.",
  },
]

export const INVEST_GUIDE_TEASER = {
  text: "Si te inclinas por invertir, la guía de inversión para menores compara cuenta remunerada, fondos, fondos indexados, carteras gestionadas y ETF.",
  href: `${INVEST_GUIDE.href}#alternativas`,
  label: "Ver las alternativas de inversión",
}

export const AGE_POINTS = [
  "Un niño pequeño puede entender que cada aportación ayuda a construir un objetivo.",
  "Un adolescente puede participar en la elección de una meta.",
  "La familia debe explicar que una inversión puede valer menos durante un tiempo.",
  "Las comisiones reducen el resultado final.",
  "Retirar dinero durante una bajada puede convertir una pérdida temporal en una pérdida efectiva.",
]

export const AGE_LINKS = [
  { href: "/kiri-academy/magia-interes-compuesto", label: "La magia del interés compuesto" },
  { href: "/kiri-academy/introduccion-educacion-financiera-en-casa", label: "Educación financiera en casa" },
]

export const OWNERSHIP = {
  text: "El adulto que regala y el adulto que representa al menor no tienen por qué ser la misma persona. Un abuelo, una tía o un amigo de la familia puede hacer una aportación, pero la apertura y la operativa de una cuenta para un menor dependen de las reglas de la entidad y de la representación legal correspondiente.",
  checklist: [
    "Quién será el titular.",
    "Quién actuará como padre, madre o tutor legal.",
    "Quién podrá consultar y operar.",
    "Cómo se harán las aportaciones de otros familiares.",
    "Qué ocurrirá cuando el menor cumpla 18 años.",
  ],
  warning:
    "Una tarjeta regalo no es la apertura automática de una cuenta. El regalo puede iniciar el proceso, pero la cuenta debe abrirse conforme a las condiciones vigentes de la entidad.",
  deeperLink: { href: `${INVEST_GUIDE.href}#titularidad`, label: "Qué cambia si la cuenta está a nombre del menor o de un adulto" },
}

export const HORIZONS = [
  { title: "Compra próxima", range: "Meses o pocos años", check: "Disponibilidad y estabilidad." },
  { title: "Estudios, formación o viaje", range: "Varios años", check: "Riesgo, costes y posibilidad de retirar." },
  {
    title: "Proyecto al cumplir 18 años",
    range: "Largo plazo",
    check: "Política de inversión, diversificación y evolución del riesgo.",
  },
]

export const HORIZON_NOTE = "Esta línea orienta la conversación, pero no sustituye el análisis del producto."

export const PAST_PERFORMANCE_NOTE = "La rentabilidad pasada puede describir lo que ocurrió, pero no garantiza lo que ocurrirá."

export type RiskCheck = { icon: "gauge" | "globe" | "receipt" | "clock" | "trending-down" | "file-text"; text: string }

export const RISK_CHECKS: RiskCheck[] = [
  { icon: "gauge", text: "Nivel de riesgo." },
  { icon: "globe", text: "Activos y zonas geográficas." },
  { icon: "receipt", text: "Comisiones de gestión, custodia, entrada y salida." },
  { icon: "clock", text: "Plazo de reembolso." },
  { icon: "trending-down", text: "Posibles pérdidas." },
  { icon: "file-text", text: "Documentación oficial del producto, como el documento de datos fundamentales." },
]

export const TAX = {
  text: "Regalar dinero, depositarlo en una cuenta o invertirlo no son necesariamente la misma operación desde el punto de vista fiscal. Pueden importar la comunidad autónoma, el importe, el parentesco, quién figura como titular, si existe una donación y si se venden participaciones con una ganancia o una pérdida.",
  warning:
    "Esta guía es educativa y no sustituye el asesoramiento fiscal. La familia debe revisar la información vigente y consultar a un profesional cuando la situación o el importe lo requieran.",
  deeperLink: { href: `${INVEST_GUIDE.href}#fiscalidad`, label: "Qué preguntar sobre la fiscalidad de una inversión" },
}

export const REGALA_KIRI = {
  intro:
    "El regalo puede incluir una tarjeta, una experiencia y las instrucciones necesarias para que el padre, la madre o el tutor legal complete el proceso.",
  steps: [
    {
      title: "Introducir los datos del regalo",
      text: "Quien regala indica sus datos, los del niño y su fecha de nacimiento, la dirección de entrega y la ocasión, con un mensaje personal y una foto opcional.",
    },
    {
      title: "Entregar la experiencia y las instrucciones",
      text: "El regalo llega a la familia con las indicaciones para continuar.",
    },
    {
      title: "El representante legal completa la apertura",
      text: "El padre, la madre o el tutor legal decide si abre la cuenta, conforme a las condiciones vigentes.",
    },
  ],
  pendingNotice: "Consulta las condiciones vigentes de Regala Kiri",
  conditionsHref: "/condiciones-regala-kiri",
  cta: { href: "/regala-kiri", label: "Ver Regala Kiri" },
}

export const CHECKLIST = [
  "Define el objetivo y cuándo se necesitará el dinero.",
  "Decide si buscas disponibilidad, estabilidad o inversión.",
  "Comprueba quién será el titular.",
  "Lee el riesgo, las comisiones y la documentación.",
  "No uses una rentabilidad pasada como promesa.",
  "Revisa las implicaciones fiscales.",
  "Explica al niño qué se está construyendo y qué puede cambiar.",
]

export const CHECKLIST_CLOSING =
  "Un buen regalo financiero no es el que promete más. Es el que encaja con el plazo, se entiende antes de contratar y deja a la familia con el control de la decisión."

export const FAQS: GuideFaq[] = [
  {
    question: "¿Puedo regalar una inversión a un niño aunque no sea su padre o su madre?",
    answer:
      "Sí, puedes iniciar el regalo o hacer una aportación, pero la cuenta de un menor la abren y la gestionan sus representantes legales. Que puedas aportar más adelante depende de las condiciones de cada entidad y del producto.",
  },
  {
    question: "¿Es mejor regalar dinero o invertirlo?",
    answer:
      "Depende del objetivo y del plazo. Para una compra próxima, el dinero o el ahorro suelen ser más sencillos. Para un objetivo a muchos años, una inversión diversificada puede encajar si la familia acepta que el valor suba y baje.",
  },
  {
    question: "¿El dinero pasa automáticamente al niño al cumplir 18 años?",
    answer:
      "Si la cuenta está a nombre del menor, el dinero ya es suyo y al alcanzar la mayoría de edad pasa a decidir por sí mismo. El procedimiento concreto depende de cada entidad, así que conviene preguntarlo antes de contratar. En Regala Kiri, consulta las condiciones vigentes.",
  },
  {
    question: "¿Puedo aportar todos los meses?",
    answer:
      "Algunos productos permiten aportaciones periódicas y otros no, y pueden tener mínimos. Revisa las condiciones del producto antes de comprometerte. En el caso de Regala Kiri, consulta las condiciones vigentes.",
  },
  {
    question: "¿Una inversión para un menor está protegida como un depósito?",
    answer:
      "No de la misma forma. El Fondo de Garantía de Depósitos cubre el dinero en cuentas y depósitos de entidades adheridas hasta el límite legal, pero no protege el valor de una inversión frente a caídas del mercado.",
  },
]

export const SOURCES: GuideSource[] = [
  {
    publisher: "Banco de España",
    label: "Cómo abrir una cuenta para menores de edad",
    href: "https://clientebancario.bde.es/pcb/es/blog/cuentas-antes-de-los-18.html",
  },
  {
    publisher: "Banco de España",
    label: "¿Pueden los abuelos abrir cuentas a sus nietos?",
    href: "https://clientebancario.bde.es/pcb/es/blog/Pueden_los_abu_bfaab8d90351661.html",
  },
  { publisher: "CNMV", label: "Fondos de inversión", href: "https://www.cnmv.es/portal/inversor/fondos-inversion?lang=es" },
  {
    publisher: "CNMV",
    label: "Guía sobre fondos de inversión, con el documento de datos fundamentales (PDF)",
    href: "https://www.cnmv.es/DocPortal/Publicaciones/Guias/guia_FI.pdf",
  },
  { publisher: "Fondo de Garantía de Depósitos", label: "Información sobre la garantía de depósitos", href: "https://www.fgd.es/" },
  {
    publisher: "Agencia Tributaria",
    label: "Impuesto sobre Sucesiones y Donaciones",
    href: "https://sede.agenciatributaria.gob.es/Sede/impuestos-tasas/impuesto-sobre-sucesiones-donaciones.html",
  },
]

export const RELATED_ARTICLE_SLUGS = [
  "sembrando-suenos-ahorro-por-objetivos",
  "magia-interes-compuesto",
  "introduccion-educacion-financiera-en-casa",
]

function collectText(value: unknown): string[] {
  if (typeof value === "string") return [value]
  if (Array.isArray(value)) return value.flatMap(collectText)
  if (value && typeof value === "object") return Object.values(value).flatMap(collectText)
  return []
}

const WORDS_PER_MINUTE = 200

export const READ_TIME_MINUTES = Math.max(
  1,
  Math.ceil(
    collectText([
      GIFT_GUIDE.intro,
      GIFT_GUIDE.answer,
      SECTIONS,
      GIFT_PATHS,
      GIFT_INTRO,
      GIFT_TYPES,
      COMPARISON,
      AGE_POINTS,
      OWNERSHIP,
      HORIZONS,
      HORIZON_NOTE,
      PAST_PERFORMANCE_NOTE,
      RISK_CHECKS,
      TAX,
      REGALA_KIRI,
      CHECKLIST,
      CHECKLIST_CLOSING,
      FAQS,
    ])
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length / WORDS_PER_MINUTE,
  ),
)
