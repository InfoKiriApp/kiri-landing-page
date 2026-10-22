// Datos publicados por Indexa Capital. Al revisarlos, actualiza `consulted` y cada valor.
// Si una cifra deja de coincidir con la fuente, pon su campo `verified` en false:
// la web la mostrará como "pendiente de confirmar" en lugar de publicarla.

export const INDEXA_CONSULTED = { iso: "2026-10-22", label: "22 de octubre de 2026" }

export const INDEXA_LINKS = {
  minor: "https://indexacapital.com/es/esp/minor",
  minorAccount: "https://support.indexacapital.com/es/esp/cuenta-menor",
  adulthood: "https://support.indexacapital.com/es/esp/menor-mayor-edad",
  fees: "https://support.indexacapital.com/es/esp/comisiones-indexa",
  home: "https://indexacapital.com/es/esp/",
} as const

type Figure = { value: number; verified: boolean; source: string }

export const INDEXA = {
  name: "Indexa Capital",
  minimums: {
    initial: { value: 1000, verified: true, source: INDEXA_LINKS.minor } as Figure,
    initialExistingClient: { value: 500, verified: true, source: INDEXA_LINKS.minor } as Figure,
    subscriptionThreshold: { value: 100, verified: true, source: INDEXA_LINKS.minor } as Figure,
  },
  fees: {
    managementMax: { value: 0.52, verified: true, source: INDEXA_LINKS.fees } as Figure,
    managementMin: { value: 0.08, verified: true, source: INDEXA_LINKS.fees } as Figure,
    averageManagement: { value: 0.338, verified: true, source: INDEXA_LINKS.home } as Figure,
    averageCustody: { value: 0.093, verified: true, source: INDEXA_LINKS.home } as Figure,
    averageFunds: { value: 0.096, verified: true, source: INDEXA_LINKS.home } as Figure,
    averageTotal: { value: 0.527, verified: true, source: INDEXA_LINKS.home } as Figure,
  },
  documents: [
    "Documento de identidad del representante legal, por las dos caras.",
    "Documento de identidad o NIF del menor. Si tiene menos de 14 años, puede pedirse el NIF online.",
    "Certificado de nacimiento, libro de familia o inscripción del menor en el Registro Civil.",
    "Firma del contrato correspondiente.",
  ],
  documentsNote:
    "La documentación y el proceso pueden variar según el banco custodio y las condiciones vigentes. Comprueba siempre los requisitos antes de iniciar el alta.",
  adulthood:
    "Cuando el menor titular cumple 18 años, el representante legal deja de tener permisos para operar en la cuenta. El titular recibe acceso a su cuenta y puede mantener o retirar el acceso de lectura del antiguo representante. La inversión no se entrega automáticamente en efectivo: continúa sujeta al valor de mercado y a las condiciones del producto.",
}

const PENDING = "pendiente de confirmar"

export function formatPercent(figure: Figure) {
  if (!figure.verified) return PENDING
  return `${figure.value.toLocaleString("es-ES", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} %`
}

export function formatEuros(figure: Figure) {
  if (!figure.verified) return PENDING
  return `${figure.value.toLocaleString("es-ES", { useGrouping: true })} €`
}

const { minimums, fees } = INDEXA

export const INDEXA_STEPS = [
  {
    title: "El representante completa el perfil inversor",
    text: "El cuestionario lo responde el representante legal como si la cuenta fuera para él, salvo la pregunta sobre la edad, que se responde con la edad del menor.",
  },
  {
    title: "El menor figura como titular",
    text: "Indexa Capital indica que el menor es el único titular de la cuenta. Los representantes legales operan en su nombre y no se pueden añadir autorizados.",
  },
  {
    title: "Se aporta el dinero y se invierte",
    text: `La inversión inicial publicada es de ${formatEuros(minimums.initial)}, o ${formatEuros(minimums.initialExistingClient)} si el representante ya es cliente. Las aportaciones posteriores no tienen mínimo fijo y se acumulan hasta poder generar una nueva suscripción de al menos ${formatEuros(minimums.subscriptionThreshold)} en un fondo.`,
  },
  {
    title: "La cartera se reajusta según el perfil",
    text: "La cartera se construye con fondos indexados diversificados y se ajusta según el perfil de riesgo y las condiciones del servicio.",
  },
]

export const COST_INTRO =
  "En las carteras de fondos de Indexa Capital existen tres grupos de costes: la comisión de gestión de cartera, la comisión del banco custodio y los costes propios de los fondos."

export const COST_ROWS = [
  {
    label: "Gestión de cartera de Indexa Capital",
    value: `Entre ${formatPercent(fees.managementMax)} y ${formatPercent(fees.managementMin)} anual, según el tamaño de la cuenta`,
  },
  { label: "Comisión media de gestión de cartera", value: `${formatPercent(fees.averageManagement)} anual` },
  { label: "Comisión media de custodia", value: `${formatPercent(fees.averageCustody)} anual` },
  { label: "Costes medios de los fondos", value: `${formatPercent(fees.averageFunds)} anual` },
]

export const COST_TOTAL = { label: "Coste total medio publicado", value: `${formatPercent(fees.averageTotal)} anual` }

export const COST_NOTE =
  "Las cifras son orientativas y pueden variar según el tamaño de la cartera, el banco custodio y las condiciones vigentes. Consulta siempre la documentación aplicable a tu cuenta."

export const RISK_TITLE = "La inversión a largo plazo necesita tiempo, pero no elimina el riesgo"

export const RISK_POINTS = [
  "El valor de la cartera puede bajar.",
  "Una cartera con más renta variable puede sufrir mayores caídas.",
  "Un horizonte largo permite soportar mejor la volatilidad, pero no garantiza recuperar el dinero.",
  "El riesgo depende del perfil inversor, la composición de la cartera y el momento en el que se necesite retirar el dinero.",
  "Las rentabilidades pasadas no garantizan rentabilidades futuras.",
  "El dinero en efectivo y los valores invertidos tienen coberturas y riesgos diferentes.",
]

export const TAX_NOTE =
  "El tratamiento fiscal depende del producto, de la titularidad, de las aportaciones y del momento en que se produzca un reembolso o una transmisión. La familia debe consultar la documentación fiscal vigente y pedir asesoramiento profesional cuando sea necesario."

export const INDEXA_SOURCES = [
  { publisher: "Indexa Capital", label: "Cartera de fondos para un menor de edad", href: INDEXA_LINKS.minor },
  { publisher: "Indexa Capital", label: "¿Cómo abrir una cuenta para un menor?", href: INDEXA_LINKS.minorAccount },
  { publisher: "Indexa Capital", label: "¿Qué ocurre con la cuenta de fondos de menor al cumplir 18 años?", href: INDEXA_LINKS.adulthood },
  { publisher: "Indexa Capital", label: "¿Qué comisiones cobramos (carteras de fondos)?", href: INDEXA_LINKS.fees },
  { publisher: "Indexa Capital", label: "Costes y comisiones medios de las carteras de fondos", href: INDEXA_LINKS.home },
]
