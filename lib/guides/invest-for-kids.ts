import {
  INDEXA,
  INDEXA_CONSULTED,
  INDEXA_LINKS,
  INDEXA_SOURCES,
  INDEXA_STEPS,
  TAX_NOTE,
  formatEuros,
  formatPercent,
} from "@/lib/indexa"

export type GuideOption = {
  name: string
  fit: string
  check: string
  complexity: string
  marketRisk: string
  liquidity: string
}

export type GuideSubsection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
  link?: { href: string; label: string }
}

export type OwnershipRow = { label: string; minor: string; adult: string }

export type RiskItem = { title: string; text: string }

export type GuideFaq = { question: string; answer: string }

export type GuideSource = { label: string; publisher: string; href: string }

export const INVEST_GUIDE = {
  href: "/kiri-academy/como-invertir-para-tus-hijos",
  metaTitle: "Cómo invertir para tus hijos en España | Kiri",
  description:
    "Qué opciones existen para ahorrar e invertir para un menor, cómo elegir producto, a nombre de quién abrir la cuenta, qué documentación pedirán y qué riesgos y cuestiones fiscales revisar.",
  eyebrow: "Guía para familias",
  title: "Cómo invertir para tus hijos en España: opciones, titularidad y pasos",
  shortTitle: "Cómo invertir para tus hijos",
  subtitle: "Qué debes comparar antes de abrir una cuenta o empezar a invertir para un menor",
  readTime: "14 min",
  reviewed: { iso: "2026-10-22", label: "22 de octubre de 2026" },
  author: "Equipo de Kiri Academy",
  image: {
    src: "/images/academy/como-invertir-para-tus-hijos.png",
    alt: "Ilustración de la mano de un adulto y la de un niño plantando juntos una semilla de la que crece un pequeño árbol con raíces",
  },
  disclaimer: "Esta guía es educativa y no constituye asesoramiento financiero, fiscal ni legal.",
  answer:
    "Para ahorrar o invertir para un hijo en España, empieza por tres decisiones: cuándo necesitará el dinero, cuánto riesgo puedes asumir y a nombre de quién estará la cuenta o la inversión. Con esas tres respuestas ya puedes comparar con criterio una cuenta remunerada, un fondo de inversión, un fondo indexado, una cartera gestionada o la compra directa de acciones y ETF.",
}

export const KEY_DECISIONS = [
  {
    title: "Cuándo se necesitará el dinero",
    text: "Un objetivo a dos o tres años no admite el mismo riesgo que uno a quince años. El plazo es lo primero que condiciona el producto.",
  },
  {
    title: "Qué nivel de riesgo se puede aceptar",
    text: "Invertir implica que el valor puede bajar. Decide cuánta caída temporal puede soportar la familia sin verse obligada a vender.",
  },
  {
    title: "Quién tendrá la titularidad y el control",
    text: "Si la inversión está a nombre del menor, el dinero es suyo. Si está a nombre de un adulto, es del adulto. Decídelo antes de la primera aportación.",
  },
]

export const TOC = [
  { id: "plazo", label: "Primero decide para qué y cuándo necesitará el dinero" },
  { id: "alternativas", label: "Estas son las alternativas que conviene comparar" },
  { id: "titularidad", label: "La titularidad cambia quién controla el dinero" },
  { id: "mayoria-de-edad", label: "Al cumplir 18 años, el menor pasa a operar su cuenta" },
  { id: "familiares", label: "Las aportaciones de familiares" },
  { id: "documentacion", label: "La documentación identifica al menor y a su representante" },
  { id: "como-funciona", label: "Así se abre una cartera para un menor en Indexa Capital" },
  { id: "fiscalidad", label: "La fiscalidad no se puede resumir en una sola regla" },
  { id: "riesgos", label: "El riesgo tiene dos partes: mercado y entidad" },
  { id: "proceso", label: "Un proceso razonable para empezar" },
  { id: "preguntas", label: "Preguntas frecuentes" },
  { id: "fuentes", label: "Fuentes" },
] as const

export type GuideSectionId = (typeof TOC)[number]["id"]

export function tocLabel(id: GuideSectionId) {
  return TOC.find((item) => item.id === id)?.label ?? ""
}

// Datos de producto confirmados con las fuentes públicas de Indexa Capital (ver lib/indexa.ts).
export const productFacts = {
  provider: INDEXA.name,
  minimumInitial: formatEuros(INDEXA.minimums.initial),
  minimumInitialExistingClient: formatEuros(INDEXA.minimums.initialExistingClient),
  totalAverageCost: formatPercent(INDEXA.fees.averageTotal),
  legalDocuments: INDEXA.documents,
  adulthoodProcess: INDEXA.adulthood,
  consulted: INDEXA_CONSULTED,
} as const

export const ADULTHOOD = {
  text: INDEXA.adulthood,
  link: { href: INDEXA_LINKS.adulthood, label: "Qué ocurre al cumplir 18 años, según Indexa Capital" },
}

export const HOW_IT_WORKS = {
  intro:
    "Kiri trabaja con Indexa Capital como proveedor de la cartera de fondos indexados. Estos son los pasos que publica Indexa Capital para abrir una cuenta a un menor:",
  steps: INDEXA_STEPS,
  link: { href: INDEXA_LINKS.minorAccount, label: "Cómo abrir una cuenta para un menor en Indexa Capital" },
}

export const HORIZON = {
  paragraphs: [
    "El plazo es la variable que más condiciona la decisión. Cuanto más cerca está el momento de usar el dinero, menos margen hay para recuperarse de una caída.",
    "No es lo mismo ahorrar para un campamento dentro de dos veranos que para los estudios universitarios de un bebé. El primer objetivo pide que el dinero esté disponible y estable. El segundo deja tiempo para asumir altibajos a cambio de un posible mayor crecimiento.",
  ],
  horizons: [
    {
      title: "Objetivos próximos",
      range: "Menos de 3 a 5 años",
      text: "Gastos previsibles como actividades, material escolar o un viaje. Suele priorizarse la liquidez y la estabilidad del saldo.",
    },
    {
      title: "Objetivos a 10 o 15 años",
      range: "Largo plazo",
      text: "Estudios, una primera vivienda o un colchón para la mayoría de edad. El tiempo permite considerar productos con riesgo de mercado.",
    },
  ],
}

export const OPTIONS: GuideOption[] = [
  {
    name: "Cuenta corriente o remunerada",
    fit: "Dinero que la familia quiere tener disponible o que se usará en pocos años.",
    check: "Remuneración real, límites de saldo, comisiones, condiciones de vinculación y cobertura del Fondo de Garantía de Depósitos.",
    complexity: "Baja",
    marketRisk: "No tiene riesgo de mercado. La inflación puede reducir su poder de compra.",
    liquidity: "Alta, normalmente inmediata.",
  },
  {
    name: "Fondo de inversión",
    fit: "Objetivos a medio y largo plazo cuando la familia acepta que el valor fluctúe.",
    check: "Política de inversión, nivel de riesgo, comisiones y el documento de datos fundamentales para el inversor.",
    complexity: "Media",
    marketRisk: "Sí. Depende de los activos en los que invierta el fondo.",
    liquidity: "Reembolso habitualmente en pocos días hábiles.",
  },
  {
    name: "Fondo indexado",
    fit: "Familias que buscan diversificación amplia y costes contenidos para un horizonte largo.",
    check: "Índice que replica, divisa, costes totales y cuánto se desvía del índice.",
    complexity: "Media",
    marketRisk: "Sí. Sube y baja con el índice que sigue.",
    liquidity: "Reembolso habitualmente en pocos días hábiles.",
  },
  {
    name: "Cartera gestionada",
    fit: "Quien prefiere delegar la selección de fondos y los ajustes periódicos.",
    check: "Perfil de riesgo asignado, coste total de la gestión sumado al de los fondos y qué decisiones se delegan.",
    complexity: "Baja para la familia",
    marketRisk: "Sí. Delegar la gestión no elimina el riesgo.",
    liquidity: "Depende del contrato y de los fondos que la componen.",
  },
  {
    name: "Acciones o ETF",
    fit: "Personas con experiencia que quieren elegir y vigilar cada inversión.",
    check: "Si la entidad abre cuentas de valores a menores, costes por operación y custodia, divisa y fiscalidad.",
    complexity: "Alta",
    marketRisk: "Sí, y mayor si la inversión se concentra en pocas empresas.",
    liquidity: "Alta en horario de mercado, al precio de ese momento.",
  },
]

export const OPTIONS_NOTE =
  "Muchas entidades no permiten abrir una cuenta de valores para comprar acciones o ETF a nombre de un menor. Confírmalo antes de planificar con esta opción."

export const OPTION_DETAILS: GuideSubsection[] = [
  {
    title: "Una cuenta remunerada prioriza la liquidez",
    paragraphs: [
      "Una cuenta remunerada puede ser útil para el dinero que la familia necesita tener disponible. El saldo no depende de la evolución de los mercados y se puede retirar con facilidad.",
      "Antes de abrirla, revisa la remuneración que se aplica de verdad, si hay límites de saldo o plazos promocionales, qué comisiones tiene y si exige domiciliar ingresos o recibos.",
    ],
  },
  {
    title: "Un fondo de inversión agrupa las aportaciones de muchos partícipes",
    paragraphs: [
      "Un fondo reúne el dinero de muchas personas y una gestora lo invierte siguiendo una política definida. Cada partícipe tiene participaciones cuyo valor cambia cada día con el de los activos del fondo.",
      "Al repartir el dinero entre muchos activos, el fondo diversifica: el mal resultado de uno pesa menos en el conjunto. Aun así, si los mercados caen, el valor de las participaciones también puede caer y es posible perder dinero.",
    ],
  },
  {
    title: "Un fondo indexado sigue un índice, pero también tiene riesgo",
    paragraphs: [
      "Un fondo indexado intenta reproducir el comportamiento de un índice, por ejemplo uno que agrupe a grandes empresas de muchos países. No busca batir al mercado, sino acompañarlo, y por eso suele tener costes de gestión más bajos.",
      "Seguir un índice no lo convierte en una inversión segura. Si el índice baja, el fondo baja con él. Antes de elegir uno, revisa:",
    ],
    bullets: [
      "Qué índice replica y qué mercados incluye.",
      "Cuánta diversificación ofrece por países, sectores y número de empresas.",
      "En qué divisa invierte y cómo te afectan los cambios de divisa.",
      "Los costes totales, no solo la comisión de gestión.",
      "Su nivel de riesgo según el documento de datos fundamentales.",
      "Si el horizonte temporal del objetivo encaja con ese riesgo.",
      "Qué ocurre y cuánto tarda si necesitas retirar el dinero.",
    ],
    link: {
      href: "/kiri-academy/fondos-de-inversion-indexados",
      label: "Cómo funciona una cartera de fondos indexados para un menor, con sus riesgos y costes",
    },
  },
  {
    title: "Una cartera gestionada delega parte de las decisiones",
    paragraphs: [
      "En una cartera gestionada, una entidad elige y combina los fondos según un perfil de riesgo y los reajusta con el tiempo. La familia decide el perfil y las aportaciones, pero no cada movimiento.",
      "Delegar la gestión ahorra tiempo y reduce errores de comportamiento, como vender en plena caída. No elimina el riesgo ni garantiza ninguna rentabilidad, y añade un coste de gestión que conviene sumar al de los fondos.",
    ],
  },
  {
    title: "Acciones y ETF requieren más decisiones directas",
    paragraphs: [
      "Comprar acciones de empresas concretas concentra el riesgo: el resultado depende de pocas compañías y la volatilidad puede ser alta. Un ETF es un fondo que cotiza en bolsa como una acción y puede estar más diversificado, pero sigue exigiendo decidir cuándo comprar y cuándo vender.",
      "Además, cotizan en tiempo real, pueden estar en otra divisa y su fiscalidad no es necesariamente igual que la de los fondos de inversión. Por eso encajan mejor con personas que ya tienen experiencia.",
    ],
  },
]

export const OWNERSHIP_WARNING =
  "La titularidad no es un detalle administrativo. Cambia quién es el propietario del dinero y quién podrá decidir sobre él."

export const OWNERSHIP_ROWS: OwnershipRow[] = [
  {
    label: "Quién es el propietario",
    minor: "El menor. El dinero forma parte de su patrimonio.",
    adult: "El adulto titular. El menor no tiene derecho sobre ese dinero.",
  },
  {
    label: "Quién lo gestiona antes de los 18",
    minor: "Los padres o tutores, como representantes legales, lo administran en interés del menor. Algunas operaciones pueden requerir autorización judicial.",
    adult: "El adulto decide libremente si aporta, cambia de producto o retira.",
  },
  {
    label: "Qué puede cambiar a los 18",
    minor: "El titular pasa a decidir por sí mismo, también si quiere retirar el dinero.",
    adult: "Nada cambia de forma automática. Si el adulto quiere entregarlo, tendrá que hacerlo después.",
  },
  {
    label: "Consecuencias a tener en cuenta",
    minor: "El dinero no puede destinarse a fines ajenos al menor. Las aportaciones de terceros pueden considerarse donaciones al menor.",
    adult: "Más flexibilidad, pero el ahorro queda ligado a la situación personal y fiscal del adulto. Una entrega futura puede tener efectos fiscales.",
  },
  {
    label: "Qué confirmar con la entidad",
    minor: "Cómo acredita la representación legal y qué ocurre con la cuenta al alcanzar la mayoría de edad.",
    adult: "Si permite identificar la finalidad del ahorro y cómo se documentaría una entrega posterior.",
  },
]

export const FAMILY_CONTRIBUTIONS = {
  paragraphs: [
    "Padres, abuelos, tíos y padrinos suelen querer participar en el ahorro de un niño. Es una buena forma de convertir los regalos de cumpleaños o de Navidad en algo que crece, pero conviene hacerlo con orden.",
  ],
  bullets: [
    "Confirma si el producto permite aportaciones de terceros o solo del titular y sus representantes.",
    "Pregunta cómo se identifica a quien aporta, ya que la entidad puede pedir sus datos.",
    "Comprueba a qué cuenta se envía el dinero y que la referencia identifique al menor.",
    "Ten en cuenta que algunas aportaciones pueden tratarse como una donación al menor.",
    "Revisa las aportaciones relevantes con una asesoría fiscal, porque las reglas cambian según la comunidad autónoma.",
  ],
}

export const DOCUMENTS = INDEXA.documents

export const DOCUMENTS_INTRO = "Para abrir una cartera de fondos a un menor, Indexa Capital pide:"

export const DOCUMENTS_NOTE = INDEXA.documentsNote

export const TAX = {
  warning: TAX_NOTE,
  intro:
    "No existe una regla única para todos los casos. Estas ideas generales ayudan a saber qué preguntar a una asesoría fiscal:",
  points: [
    "Los intereses de cuentas y depósitos tienen su propio tratamiento fiscal.",
    "En los fondos, la ganancia o la pérdida se calcula al vender o reembolsar las participaciones, no mientras se mantienen.",
    "Algunos traspasos entre fondos pueden diferir la tributación si cumplen los requisitos legales.",
    "El tratamiento de los ETF no es necesariamente igual al de los fondos de inversión.",
    "Las donaciones a un menor pueden tener reglas específicas.",
    "Puede haber diferencias importantes entre comunidades autónomas.",
  ],
}

export const MARKET_RISKS: RiskItem[] = [
  { title: "Caída del mercado", text: "El valor de la inversión puede bajar, a veces durante años, y no está garantizado recuperarlo." },
  { title: "Liquidez", text: "Puede que no sea posible retirar el dinero en el momento deseado o que haya que hacerlo a un precio peor." },
  { title: "Divisa", text: "Si los activos están en otra moneda, el tipo de cambio puede sumar o restar resultado." },
  { title: "Concentración", text: "Invertir en pocas empresas, sectores o países amplifica el efecto de un mal resultado." },
]

export const ENTITY_RISKS: RiskItem[] = [
  {
    title: "Entidad intermediaria",
    text: "Es el riesgo de que falle la entidad con la que contratas. Conviene comprobar que está registrada y supervisada.",
  },
  {
    title: "Cobertura de depósitos",
    text: "El dinero en cuentas y depósitos de entidades adheridas está cubierto por el Fondo de Garantía de Depósitos hasta el límite que fija la normativa.",
  },
  {
    title: "Cobertura de determinados instrumentos",
    text: "Si una empresa de servicios de inversión adherida es insolvente y no devuelve el dinero o los valores, el Fondo de Garantía de Inversiones puede cubrirlo en ciertos supuestos. No cubre las pérdidas por caídas del mercado.",
  },
]

export const DIVERSIFICATION_NOTE =
  "La diversificación puede ayudar a controlar el riesgo, pero no elimina la posibilidad de sufrir pérdidas."

export const STEPS = [
  { title: "Define el objetivo y el plazo", text: "Pon nombre al objetivo y una fecha aproximada. Así sabrás cuánto riesgo tiene sentido asumir." },
  { title: "Reserva la parte que debe estar disponible", text: "El dinero que podrías necesitar pronto, mejor en un producto líquido y sin riesgo de mercado." },
  { title: "Compara productos con sus documentos", text: "Lee el documento de datos fundamentales y las condiciones, no solo la publicidad." },
  { title: "Decide la titularidad antes de aportar", text: "Cambiarla después puede ser complicado y tener efectos fiscales." },
  { title: "Empieza con una aportación sostenible", text: "Una cantidad que la familia pueda mantener en el tiempo vale más que un gran esfuerzo puntual." },
  { title: "Revisa el objetivo, el plazo y los costes", text: "Al menos una vez al año, comprueba que el producto sigue encajando con lo que queda de plazo." },
]

export const KIRI_BLOCK =
  "Kiri ayuda a las familias a convertir una aportación para un menor en un proyecto de largo plazo, con metas de ahorro, contribuciones de familiares y recursos de educación financiera."

export const FAQS: GuideFaq[] = [
  {
    question: "¿Es mejor ahorrar o invertir para un hijo?",
    answer:
      "Depende del plazo. Para dinero que se usará en pocos años, suele tener más sentido ahorrar en un producto líquido y sin riesgo de mercado. Para objetivos a 10 o 15 años, invertir puede ofrecer un mayor crecimiento a cambio de aceptar que el valor suba y baje. Muchas familias combinan ambas cosas.",
  },
  {
    question: "¿A qué nombre debe estar la inversión?",
    answer:
      "No hay una respuesta única. A nombre del menor, el dinero es suyo y lo administran sus representantes legales hasta los 18 años. A nombre de un adulto, el dinero es del adulto y conserva el control. Es una decisión con efectos legales y fiscales, así que conviene tomarla antes de la primera aportación.",
  },
  {
    question: "¿Quién es el titular de la cuenta de inversión de un menor?",
    answer:
      "En la cartera de fondos para menores de Indexa Capital, el menor es el único titular de la cuenta. No se pueden añadir cotitulares ni autorizados: son sus representantes legales quienes operan en su nombre.",
  },
  {
    question: "¿Quién puede abrir y gestionar la cuenta?",
    answer:
      "El padre, la madre u otro representante legal. Completa el perfil inversor, aporta la documentación, firma el contrato y opera la cuenta hasta que el menor cumple 18 años.",
  },
  {
    question: "¿Qué documentación hace falta para abrir la cuenta?",
    answer:
      "Indexa Capital pide el documento de identidad del representante, el documento de identidad o NIF del menor y el certificado de nacimiento, libro de familia o inscripción en el Registro Civil, además de la firma del contrato. Los requisitos pueden variar, así que conviene comprobarlos antes del alta.",
  },
  {
    question: "¿Las aportaciones de familiares cambian la titularidad?",
    answer:
      "No. Aunque aporten abuelos u otros familiares, la cuenta sigue siendo del menor. Esas aportaciones pueden considerarse donaciones, así que las relevantes conviene revisarlas con una asesoría fiscal.",
  },
  {
    question: "¿Qué pasa cuando el menor cumple 18 años?",
    answer:
      "El representante legal deja de tener permisos para operar y el titular recibe acceso a su cuenta. Puede mantener o retirar el acceso de lectura del antiguo representante. La inversión no se convierte automáticamente en efectivo: sigue sujeta al valor de mercado.",
  },
  {
    question: "¿Cuánto dinero hay que aportar cada mes?",
    answer:
      "No hay una cifra correcta ni un mínimo para las aportaciones posteriores en Indexa Capital. Lo importante es elegir una cantidad que la familia pueda mantener en el tiempo sin tocar el dinero que necesita para el día a día.",
  },
  {
    question: "¿Esta guía sustituye el asesoramiento financiero o fiscal?",
    answer:
      "No. Es una guía educativa para entender las opciones y saber qué preguntar. Para decisiones concretas, sobre todo fiscales o de titularidad, consulta con un profesional que conozca tu situación.",
  },
]

export const SOURCES: GuideSource[] = [
  ...INDEXA_SOURCES,
  { publisher: "CNMV", label: "Fondos de inversión", href: "https://www.cnmv.es/portal/inversor/fondos-inversion?lang=es" },
  { publisher: "CNMV", label: "Guía sobre fondos de inversión (PDF)", href: "https://www.cnmv.es/DocPortal/Publicaciones/Guias/guia_FI.pdf" },
  {
    publisher: "CNMV",
    label: "Fondo de Garantía de Inversiones",
    href: "https://www.cnmv.es/webservices/verdocumento/ver?e=cgBgpS4hzsoseUhfymNcDa5dehIxSu4zahhfYaOkxqkCTnQ/TscTkHyPmnPrTyLm",
  },
  { publisher: "Fondo de Garantía de Depósitos", label: "Información sobre la garantía de depósitos", href: "https://www.fgd.es/" },
  {
    publisher: "Banco de España",
    label: "Cómo abrir una cuenta para menores de edad",
    href: "https://clientebancario.bde.es/pcb/es/blog/cuentas-antes-de-los-18.html",
  },
  {
    publisher: "BOE",
    label: "Código Civil, artículos 162 y 164 a 168 (representación y administración de los bienes de los hijos)",
    href: "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763",
  },
  {
    publisher: "BOE",
    label: "Ley 29/1987 del Impuesto sobre Sucesiones y Donaciones",
    href: "https://www.boe.es/buscar/act.php?id=BOE-A-1987-28141",
  },
  {
    publisher: "Agencia Tributaria",
    label: "Ganancias y pérdidas patrimoniales en el IRPF",
    href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/irpf-2025/c11-ganancias-perdidas-patrimoniales/declaracion-tributacion-ganancias-perdidas-patrimoniales/ganancias-perdidas-patrimoniales-que-integran-imponible.html",
  },
]

export const RELATED_ARTICLE_SLUGS = [
  "fondos-de-inversion-indexados",
  "magia-interes-compuesto",
  "sembrando-suenos-ahorro-por-objetivos",
]
