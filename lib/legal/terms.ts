import { COMPANY, LEGAL_CONTACT, type LegalDoc } from "./shared"

export const TERMS_DOC: LegalDoc = {
  href: "/terminos-y-condiciones",
  navLabel: "Términos y condiciones",
  eyebrow: "Aviso legal",
  title: "Términos y condiciones",
  intro: "Las reglas para usar la web de Kiri, contadas de forma clara. Al navegar por ella aceptas estas condiciones.",
  description:
    "Aviso legal y condiciones de uso de la web de Kiri: quién es el titular, cómo se puede usar la web, la relación con Indexa Capital, propiedad intelectual y legislación aplicable.",
  summary: [
    { term: "Titular", description: "Kiri, la plataforma de ahorro e inversión para niños y niñas." },
    { term: "Inversión", description: "Las cuentas las abre y gestiona Indexa Capital, entidad supervisada por la CNMV." },
    { term: "Información", description: "El contenido de la web es divulgativo y no es asesoramiento financiero." },
    { term: "Ley aplicable", description: "La legislación española." },
  ],
  contactSubject: "Términos y condiciones",
  sections: [
    {
      id: "titular",
      title: "Titular de la web",
      paragraphs: [
        "En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico, te informamos de que el titular de esta web es:",
      ],
      list: [
        { label: "Razón social:", text: COMPANY.legalName },
        { label: "NIF:", text: COMPANY.taxId },
        { label: "Domicilio:", text: COMPANY.address },
        { label: "Registro:", text: COMPANY.registry },
        { label: "Contacto:", text: LEGAL_CONTACT },
      ],
    },
    {
      id: "objeto",
      title: "Qué es Kiri",
      paragraphs: [
        "Kiri es una plataforma que ayuda a las familias a ahorrar e invertir a largo plazo para los menores, acompañándolo de una experiencia de educación financiera. Kiri no es una entidad financiera: no custodia dinero ni valores ni presta servicios de inversión.",
        "Las cuentas de inversión las abre y gestiona Indexa Capital A.V., S.A., agencia de valores autorizada y supervisada por la CNMV con el n.º 257, conforme a sus propias condiciones contractuales, que la familia acepta al abrir la cuenta. Las inversiones están cubiertas por el Fondo de Garantía de Inversiones (FOGAIN) en los términos que establece su normativa.",
      ],
    },
    {
      id: "informacion",
      title: "Información y riesgos",
      paragraphs: [
        "Los contenidos de esta web, incluidos la calculadora, los ejemplos de rentabilidad y el asistente de preguntas, son orientativos y tienen fines divulgativos. No constituyen asesoramiento financiero, fiscal ni legal ni una recomendación personalizada.",
        "Invertir conlleva riesgos, incluida la posible pérdida de parte del capital. Las rentabilidades pasadas no garantizan rentabilidades futuras. Antes de invertir, revisa la información precontractual de Indexa Capital y, si lo necesitas, consulta a un profesional.",
      ],
    },
    {
      id: "uso",
      title: "Uso de la web",
      paragraphs: ["Te comprometes a usar la web de forma lícita y, en particular, a no:"],
      list: [
        { label: "Facilitar datos falsos", text: "o de otras personas sin su autorización." },
        { label: "Dañar o sobrecargar", text: "la web o intentar acceder a zonas o sistemas no públicos." },
        { label: "Usar la web con fines ilícitos", text: "o que vulneren derechos de terceros." },
      ],
      note: "Los servicios de Kiri, como Regala Kiri, están pensados para personas mayores de 18 años. Los menores pueden consultar los contenidos educativos acompañados de un adulto.",
    },
    {
      id: "contratacion",
      title: "Servicios de pago",
      paragraphs: [
        "La contratación de Regala Kiri se rige por sus condiciones específicas, que debes aceptar antes de pagar. En lo no previsto en ellas se aplican estos términos.",
      ],
      links: [{ href: "/condiciones-regala-kiri", label: "Condiciones de Regala Kiri" }],
    },
    {
      id: "propiedad",
      title: "Propiedad intelectual",
      paragraphs: [
        "La marca Kiri, el logotipo, los textos, ilustraciones, diseños y el código de la web pertenecen a Kiri o a sus licenciantes. No puedes copiarlos, distribuirlos ni modificarlos sin nuestra autorización, salvo para uso personal y no comercial.",
        "Las marcas de terceros, como Indexa Capital o los medios de comunicación que aparecen en la web, pertenecen a sus respectivos titulares.",
      ],
    },
    {
      id: "responsabilidad",
      title: "Responsabilidad",
      paragraphs: [
        "Trabajamos para que la web esté disponible y la información sea correcta y esté actualizada, pero no podemos garantizar que no haya interrupciones o errores puntuales. Kiri no responde de los daños derivados de un uso indebido de la web ni del contenido de webs de terceros enlazadas desde ella.",
      ],
    },
    {
      id: "privacidad",
      title: "Privacidad y cookies",
      paragraphs: ["El tratamiento de tus datos y el uso de cookies se explican en sus políticas específicas."],
      links: [
        { href: "/politica-de-privacidad", label: "Política de privacidad" },
        { href: "/politica-de-cookies", label: "Política de cookies" },
      ],
    },
    {
      id: "ley",
      title: "Legislación aplicable y conflictos",
      paragraphs: [
        "Estos términos se rigen por la legislación española. Si eres consumidor, cualquier conflicto se resolverá en los juzgados de tu domicilio. También puedes acudir a las juntas arbitrales de consumo.",
        "Si tienes una queja, escríbenos primero a " + LEGAL_CONTACT + ": intentaremos resolverla de forma amistosa.",
      ],
    },
  ],
}
