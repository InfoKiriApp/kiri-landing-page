import { INDEXA, formatEuros, formatPercent } from "@/lib/indexa"

const { minimums, fees } = INDEXA

export type FaqGroup = { title: string; ids: string[] }

export const FAQS = [
  { id: "quien-declara", label: "¿Quién declara los fondos del menor?" },
  { id: "donacion-fiscal", label: "¿Cómo afecta fiscalmente una donación?" },
  { id: "irpf-menor", label: "¿Paga impuestos el menor por rendimientos?" },
  { id: "tutor-dispone", label: "¿Puede el tutor disponer del dinero?" },
  { id: "obligaciones-tutor", label: "¿Qué obligaciones fiscales tiene el tutor?" },
  { id: "mayoria-edad", label: "¿Qué pasa al cumplir la mayoría de edad?" },
  { id: "documentos", label: "¿Qué documentos se necesitan?" },
  { id: "productos", label: "¿En qué productos pueden invertir?" },
  { id: "cancelar-cuenta", label: "¿Puedo recuperar el dinero si cancelo?" },
  { id: "un-representante", label: "¿Puedo añadir un segundo representante?" },
  { id: "necesito-cuenta", label: "¿Necesito cuenta en Indexa Capital?" },
  { id: "condiciones", label: "¿Qué condiciones tienen las cuentas?" },
  { id: "codigo-verificacion", label: "No me llega el código de verificación" },
  { id: "cuentas-no-aparecen", label: "¿Por qué no veo la cuenta de mi hijo/a en mi perfil?" },
  { id: "cuando-funciona", label: "¿Cuándo estará disponible Kiri?" },
  { id: "vincular-cuenta-existente", label: "¿Puedo vincular mi cuenta ya existente de Indexa Capital?" },
  { id: "menor-sin-dni", label: "¿Puedo abrir la cuenta sin el DNI de mi hijo/a?" },
  { id: "envio-internacional", label: "¿El Welcome Pack se envía fuera de España?" },
  { id: "abrir-cuenta-hijos", label: "¿Cómo abro la cuenta de cada uno de mis hijos?" },
  { id: "contratar-carteras", label: "¿Cómo contrato las Carteras Kiri?" },
  { id: "tutor-principal-secundario", label: "Soy tutor/a y no veo las cuentas de mis hijos" },
  { id: "quien-es-indexa", label: "¿Quién es Indexa Capital?" },
  { id: "que-banco", label: "¿Qué banco guarda el dinero?" },
  { id: "por-que-banco", label: "¿Por qué Cecabank o Inversis Banco?" },
  { id: "dinero-seguro", label: "¿Está seguro el dinero si algo sale mal?" },
  { id: "comisiones", label: "¿Qué comisiones tiene la cuenta?" },
  { id: "inversion-minima", label: "¿Cuál es la inversión mínima?" },
]

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Abrir la cuenta",
    ids: ["necesito-cuenta", "documentos", "menor-sin-dni", "abrir-cuenta-hijos", "un-representante", "codigo-verificacion", "cuando-funciona"],
  },
  {
    title: "Indexa Capital y el banco",
    ids: ["quien-es-indexa", "que-banco", "por-que-banco", "dinero-seguro", "comisiones", "inversion-minima"],
  },
  {
    title: "Carteras e inversión",
    ids: ["productos", "contratar-carteras", "condiciones", "mayoria-edad", "cancelar-cuenta"],
  },
  {
    title: "Mi cuenta en Kiri",
    ids: ["cuentas-no-aparecen", "tutor-principal-secundario", "vincular-cuenta-existente", "tutor-dispone"],
  },
  {
    title: "Fiscalidad",
    ids: ["quien-declara", "donacion-fiscal", "irpf-menor", "obligaciones-tutor"],
  },
  {
    title: "Regala Kiri",
    ids: ["envio-internacional"],
  },
]

export const RESPONSES: Record<string, string> = {
  "quien-declara":
    "El titular de la cuenta es el menor, pero la responsabilidad de declarar los fondos puede recaer en el tutor legal, dependiendo del origen del dinero y la normativa fiscal vigente.",

  "donacion-fiscal":
    "Las aportaciones a la cuenta del menor pueden considerarse donaciones y estar sujetas al Impuesto sobre Sucesiones y Donaciones (ISD). La fiscalidad depende del importe, la comunidad autónoma y la relación entre donante y beneficiario. En comunidades como Madrid, Andalucía o la Comunidad Valenciana existe una bonificación del 99% para donaciones entre padres e hijos.",

  "irpf-menor":
    "Sí. Los intereses o rendimientos obtenidos en la cuenta del menor están sujetos al IRPF. En las cuentas remuneradas se aplica automáticamente una retención del 19%. Las inversiones en fondos de inversión o acciones no tributan mientras no se retira el dinero. Si se superan los umbrales establecidos por la normativa, puede nacer la obligación de presentar declaración de IRPF — te recomendamos consultar a un asesor fiscal.",

  "tutor-dispone":
    "No. El dinero depositado en la cuenta pertenece al menor y debe ser utilizado en su beneficio. El tutor administra los fondos pero no puede disponer libremente de ellos. Para operaciones de gran impacto financiero — como venta de activos o retiros importantes — puede requerirse autorización judicial.",

  "obligaciones-tutor":
    "El tutor debe asegurarse de que los impuestos derivados de la cuenta del menor sean correctamente declarados y pagados. En caso de inspección, deberá justificar el origen de los fondos. Gestiona el pago del ISD en nombre del menor, pero no puede disponer de los fondos para beneficio propio.",

  "mayoria-edad":
    "Al cumplir la mayoría de edad, el titular puede seguir con la cuenta con normalidad. A partir de ese momento tiene el derecho — pero no la obligación — de rescatar la cartera. Al tratarse de fondos traspasables, mientras mantenga la inversión no tributa nada; y si decide vender, solo en ese momento tributará en su IRPF por la venta, habiendo optimizado la fiscalidad durante todos los años previos.",

  documentos:
    "Para abrir una cuenta a un menor necesitas: (1) DNI o NIF del menor — si el menor no tiene DNI (no obligatorio para menores de 14 años), se puede usar el NIF emitido por la Agencia Tributaria; (2) el libro de familia o documento de inscripción del menor en el registro civil; (3) el representante legal debe aportar la misma documentación que si abriera una cuenta para sí mismo.",

  productos:
    "Con Kiri, los menores invierten en carteras de fondos indexados de bajo coste gestionadas por Indexa Capital: la Cartera Kiri Ambiciosa, Equilibrada o Prudente, según el nivel de riesgo que elijas.",

  "cancelar-cuenta":
    "Tras la cancelación de la cuenta de un menor, la disposición de valores — como fondos de inversión y carteras de gestión discrecional — debe hacerse en favor del menor titular. Aunque los padres tengan la representación legal, las posiciones en valores no pueden transferirse a la cuenta de los padres, sino a una nueva cuenta a nombre del menor. Si en la cuenta solo hay efectivo, los padres podrán disponer libremente de él.",

  "un-representante":
    "Indexa Capital indica que la cuenta del menor puede tener varios representantes legales cuando el banco custodio es Cecabank. Lo más sencillo es añadir a los dos representantes desde el principio, durante el alta. Si la cuenta ya está abierta con un solo representante, escríbenos y lo revisamos contigo y con Indexa Capital.",

  "necesito-cuenta":
    "No. No es necesario tener una cuenta propia en Indexa Capital para abrir una cuenta a un menor. Empieza el proceso en https://indexa.kiriapp.com/ y te guiaremos paso a paso.",

  condiciones:
    "La cuenta del menor invierte en carteras de fondos indexados de bajo coste gestionadas por Indexa Capital. Al ser una cuenta a nombre del menor, el dinero es suyo y, al cumplir los 18 años, podrá disponer de la inversión y sus rendimientos.",

  "codigo-verificacion":
    "Recuerda que el proceso de alta comienza en www.kiriapp.com, pero el registro y la verificación se completan en la plataforma de nuestro colaborador, Indexa Capital. Si no te llega el código de verificación, revisa tu carpeta de spam y contacta con la Atención al Cliente de Indexa Capital. Si sigues teniendo problemas, escríbenos y lo escalamos personalmente.",

  "cuentas-no-aparecen":
    "Esto suele ocurrir cuando la información que recibimos de Indexa Capital asocia la cuenta del menor a un tutor distinto al que ha iniciado sesión en Kiri (por ejemplo, si figura la madre y no el padre, o viceversa). Kiri solo puede mostrar las cuentas al tutor que aparece en esa información. Mientras resolvemos la vinculación, puedes hacer seguimiento directamente desde Indexa Capital. Escríbenos y lo revisamos con nuestro equipo técnico y con Indexa Capital.",

  "cuando-funciona":
    "¡Kiri ya está disponible! Puedes darte de alta y comenzar la experiencia en https://indexa.kiriapp.com/",

  "vincular-cuenta-existente":
    "Sí, si ya tienes una cuenta abierta en Indexa Capital puedes vincularla a Kiri. Escríbenos confirmando que deseas realizar la vinculación y comenzamos el trámite para que puedas disfrutar de todas las ventajas de Kiri con tu usuario actual.",

  "menor-sin-dni":
    "El DNI o NIF del menor es un dato imprescindible por motivos legales y para garantizar la futura disposición de los fondos. No es posible completar el alta únicamente con el libro de familia. Si el menor no tiene DNI (no es obligatorio antes de los 14 años), se puede usar el NIF emitido por la Agencia Tributaria.",

  "envio-internacional":
    "Por el momento, el Kiri Welcome Pack solo se envía dentro de España. Si el destinatario está fuera de España, te recomendamos indicar tu propia dirección postal al rellenar el formulario de 'Regala Kiri' para recibirlo tú y poder entregarlo en persona.",

  "abrir-cuenta-hijos":
    "Empieza en https://indexa.kiriapp.com/ y sigue el proceso de alta para cada uno de tus hijos. Después, escríbenos para que podamos vincular todas las cuentas a la Familia Kiri.",

  "contratar-carteras":
    "Durante el alta en Indexa Capital rellenarás un test de perfil inversor y podrás elegir la Cartera Kiri Ambiciosa, Equilibrada o Prudente, según el riesgo deseado. Si tienes dudas, escríbenos y te ayudamos.",

  "tutor-principal-secundario":
    "Cuando hay dos tutores legales, la cuenta del menor se vincula en Kiri únicamente al tutor que Indexa Capital nos indica como asociado en sus sincronizaciones de datos — que no siempre coincide con el tutor principal. Si te encuentras en esta situación, escríbenos para revisarlo con nuestro equipo técnico y con Indexa Capital.",

  "quien-es-indexa":
    "Indexa Capital es nuestro colaborador: un gestor automatizado independiente, especializado en carteras de fondos indexados de bajo coste para invertir a largo plazo. Es una agencia de valores autorizada y supervisada por la CNMV con el n.º 257, y es quien abre y gestiona las cuentas de los menores. Kiri te acompaña en el alta y en el seguimiento.",

  "que-banco":
    "El dinero no lo guarda ni Kiri ni Indexa Capital, sino un banco custodio: Cecabank o Inversis Banco, ambos supervisados por el Banco de España. Las inversiones están en una cuenta a nombre del menor en ese banco. Indexa Capital solo puede dar instrucciones de inversión y cobrar su comisión trimestral; no puede llevarse el dinero a ninguna otra cuenta.",

  "por-que-banco":
    "Indexa Capital trabaja con Cecabank e Inversis Banco porque están entre los bancos custodios más solventes de Europa y están especializados en custodia de valores: cada uno guarda más de 100.000 millones de euros. A cierre de 2024, su ratio de solvencia CET1 era del 42,8 % (Cecabank) y del 21,9 % (Inversis Banco). Además, Cecabank remunera el efectivo de la cuenta y permite que la cuenta del menor tenga varios representantes legales.",

  "dinero-seguro":
    "Las inversiones están en una cuenta de valores a nombre del menor, separada del balance del banco custodio, así que siguen siendo suyas aunque le pase algo al banco. Además, el Fondo de Garantía de Inversiones (FOGAIN) cubre hasta 100.000 € por titular en caso de fraude de Indexa Capital, y el pequeño efectivo de la cuenta (en torno al 0,5 %) está cubierto por el Fondo de Garantía de Depósitos hasta 100.000 €. Eso sí: estas garantías no protegen frente a las caídas del mercado, porque invertir siempre tiene riesgo.",

  comisiones: `Indexa Capital cobra una única comisión de gestión de entre el ${formatPercent(fees.managementMax)} y el ${formatPercent(fees.managementMin)} anual (IVA incluido), según el tamaño de la cuenta. Sumando la custodia del banco y los costes de los fondos, el coste total medio que publica es del ${formatPercent(fees.averageTotal)} anual. No hay comisiones por aportar, retirar ni cerrar la cuenta.`,

  "inversion-minima": `La inversión inicial es de ${formatEuros(minimums.initial)}, o de ${formatEuros(minimums.initialExistingClient)} si el representante legal ya es cliente de Indexa Capital. Después, las aportaciones no tienen mínimo: se van acumulando hasta que se puede hacer una nueva compra de al menos ${formatEuros(minimums.subscriptionThreshold)} en uno de los fondos.`,
}

// Ordered: more specific questions first, so "¿por qué ese banco?" doesn't land on "¿qué banco?".
// Keys are written without accents; the matcher normalizes the user's text the same way.
export const KEYWORD_MAP: { keys: string[]; id: string }[] = [
  { keys: ["por que banco", "por que ese banco", "por que cecabank", "por que inversis", "por que usais", "por que usas", "por que trabajais", "solvencia", "cet1"], id: "por-que-banco" },
  { keys: ["que banco", "cual banco", "banco custodio", "custodio", "custodia", "cecabank", "inversis", "donde esta el dinero", "donde se guarda", "quien guarda", "banco"], id: "que-banco" },
  { keys: ["seguro", "garantia", "fogain", "fondo de garantia", "quiebra", "si cierra", "fraude", "proteg"], id: "dinero-seguro" },
  { keys: ["comision", "coste", "cuesta", "cuanto cobra", "gastos", "precio"], id: "comisiones" },
  { keys: ["minimo", "cuanto tengo que", "cuanto hay que", "cuanto dinero", "1000", "500"], id: "inversion-minima" },
  { keys: ["quien es indexa", "que es indexa", "cnmv", "supervisad", "regulad", "fiable"], id: "quien-es-indexa" },
  { keys: ["codigo", "verificacion", "sms", "no me llega"], id: "codigo-verificacion" },
  { keys: ["tutor principal", "tutor secundario", "segundo tutor", "segunda tutora"], id: "tutor-principal-secundario" },
  { keys: ["no veo", "no aparece", "no aparecen", "no me aparece", "no se muestra"], id: "cuentas-no-aparecen" },
  { keys: ["vincular", "vinculacion", "cuenta existente", "ya tengo cuenta"], id: "vincular-cuenta-existente" },
  { keys: ["sin dni", "no tiene dni", "no dispone de dni"], id: "menor-sin-dni" },
  { keys: ["internacional", "extranjero", "fuera de espana", "envio", "welcome pack"], id: "envio-internacional" },
  { keys: ["abrir la cuenta de", "cuenta junior", "abrir cuenta hijo", "abrir cuenta hija", "varios hijos"], id: "abrir-cuenta-hijos" },
  { keys: ["contratar cartera", "test de idoneidad", "perfil inversor", "cartera ambiciosa", "cartera equilibrada", "cartera prudente"], id: "contratar-carteras" },
  { keys: ["declara", "declarar", "quien declara"], id: "quien-declara" },
  { keys: ["donacion", "isd", "sucesiones", "afecta", "fiscal"], id: "donacion-fiscal" },
  { keys: ["irpf", "rendimiento", "intereses", "tributa", "impuesto"], id: "irpf-menor" },
  { keys: ["obligacion", "responsabilidad"], id: "obligaciones-tutor" },
  { keys: ["tutor", "disponer", "dispone", "retirar", "libre"], id: "tutor-dispone" },
  { keys: ["18", "mayoria", "mayor de edad", "cumplir"], id: "mayoria-edad" },
  { keys: ["documento", "dni", "nif", "libro de familia", "libro familia"], id: "documentos" },
  { keys: ["producto", "invertir", "fondos", "etf", "acciones", "cartera"], id: "productos" },
  { keys: ["cancelar", "cancel", "recuperar", "dinero invertido"], id: "cancelar-cuenta" },
  { keys: ["representante", "segundo", "anadir"], id: "un-representante" },
  { keys: ["necesito cuenta", "cliente", "propia", "indexa"], id: "necesito-cuenta" },
  { keys: ["condicion", "restriccion"], id: "condiciones" },
  { keys: ["cuando", "disponible", "lanzamiento", "empezar a funcionar"], id: "cuando-funciona" },
]

export const FOLLOW_UPS: Record<string, string[]> = {
  "quien-declara": ["donacion-fiscal", "obligaciones-tutor", "irpf-menor"],
  "donacion-fiscal": ["quien-declara", "irpf-menor", "obligaciones-tutor"],
  "irpf-menor": ["donacion-fiscal", "quien-declara", "mayoria-edad"],
  "tutor-dispone": ["obligaciones-tutor", "cancelar-cuenta", "un-representante"],
  "obligaciones-tutor": ["tutor-dispone", "irpf-menor", "donacion-fiscal"],
  "mayoria-edad": ["productos", "cancelar-cuenta", "condiciones"],
  documentos: ["necesito-cuenta", "inversion-minima", "menor-sin-dni"],
  productos: ["comisiones", "contratar-carteras", "mayoria-edad"],
  "cancelar-cuenta": ["tutor-dispone", "productos", "un-representante"],
  "un-representante": ["por-que-banco", "documentos", "tutor-principal-secundario"],
  "necesito-cuenta": ["documentos", "inversion-minima", "quien-es-indexa"],
  condiciones: ["productos", "comisiones", "mayoria-edad"],
  "codigo-verificacion": ["cuentas-no-aparecen", "vincular-cuenta-existente", "necesito-cuenta"],
  "cuentas-no-aparecen": ["tutor-principal-secundario", "codigo-verificacion", "un-representante"],
  "cuando-funciona": ["documentos", "necesito-cuenta", "abrir-cuenta-hijos"],
  "vincular-cuenta-existente": ["necesito-cuenta", "codigo-verificacion", "abrir-cuenta-hijos"],
  "menor-sin-dni": ["documentos", "necesito-cuenta", "abrir-cuenta-hijos"],
  "envio-internacional": ["documentos", "cuando-funciona", "condiciones"],
  "abrir-cuenta-hijos": ["contratar-carteras", "inversion-minima", "tutor-principal-secundario"],
  "contratar-carteras": ["productos", "comisiones", "abrir-cuenta-hijos"],
  "tutor-principal-secundario": ["cuentas-no-aparecen", "un-representante", "codigo-verificacion"],
  "quien-es-indexa": ["que-banco", "dinero-seguro", "comisiones"],
  "que-banco": ["por-que-banco", "dinero-seguro", "quien-es-indexa"],
  "por-que-banco": ["dinero-seguro", "un-representante", "comisiones"],
  "dinero-seguro": ["que-banco", "quien-es-indexa", "cancelar-cuenta"],
  comisiones: ["inversion-minima", "productos", "que-banco"],
  "inversion-minima": ["comisiones", "documentos", "contratar-carteras"],
}

export const FALLBACK =
  "¡Gracias por tu pregunta! Nuestro equipo de soporte estará encantado de ayudarte. Puedes escribirnos a info@kiriapp.com o consultar más información en kiriapp.com. ¿Hay algo más en lo que pueda ayudarte?"

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function matchFaq(text: string): string | undefined {
  const lower = normalize(text)
  return KEYWORD_MAP.find(({ keys }) => keys.some((k) => lower.includes(k)))?.id
}

export function faqLabel(id: string) {
  return FAQS.find((f) => f.id === id)?.label
}
