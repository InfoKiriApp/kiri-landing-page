import { COMPANY_LINE, LEGAL_CONTACT, type LegalDoc } from "./shared"

export const GIFT_DOC: LegalDoc = {
  href: "/condiciones-regala-kiri",
  navLabel: "Condiciones de Regala Kiri",
  eyebrow: "Regala Kiri",
  title: "Condiciones de Regala Kiri",
  intro:
    "Todo lo que necesitas saber antes de regalar Kiri: qué incluye, cómo llega a la familia y qué pasa si cambias de opinión.",
  description:
    "Condiciones de contratación de Regala Kiri: qué incluye el regalo de €29, cómo se envía el Welcome Pack, el código de alta para la familia, desistimiento, devoluciones y datos personales.",
  summary: [
    { term: "Precio", description: "€29, pago único con IVA incluido. Welcome Pack y envío incluidos." },
    { term: "Qué recibe la familia", description: "El Welcome Pack en casa con un código para abrir la cuenta del menor gratis." },
    { term: "Lo que no incluye", description: "Aportaciones a la inversión. El dinero lo decide e ingresa la familia." },
    { term: "Si cambias de opinión", description: "Tienes 14 días mientras no hayamos personalizado el Welcome Pack." },
  ],
  contactSubject: "Regala Kiri",
  back: { href: "/regala-kiri", label: "Volver a Regala Kiri" },
  sections: [
    {
      id: "vendedor",
      title: "Quién te vende",
      paragraphs: [
        `Regala Kiri lo ofrece ${COMPANY_LINE}. Puedes contactar con nosotros en ${LEGAL_CONTACT}.`,
        "Al completar el pago aceptas estas condiciones y los términos y condiciones generales de la web.",
      ],
      links: [{ href: "/terminos-y-condiciones", label: "Términos y condiciones" }],
    },
    {
      id: "incluye",
      title: "Qué incluye el regalo",
      list: [
        { label: "El alta de la cuenta Kiri", text: "para el niño o niña, mediante un código gratuito para su padre, madre o tutor." },
        { label: "El Welcome Pack,", text: "con la semilla de Kiri, las instrucciones para abrir la cuenta y las sorpresas de bienvenida." },
        { label: "Tu mensaje personal para su futuro,", text: "y la foto del menor si decides añadirla." },
        { label: "El envío", text: "a la dirección que indiques dentro de España." },
      ],
      note: "Regala Kiri no incluye aportaciones a la inversión. Tras abrir la cuenta, la familia decide si invierte, cuánto y cuándo. Abrir la cuenta es voluntario y está sujeto a las condiciones y verificaciones de Indexa Capital A.V., S.A.",
    },
    {
      id: "quien",
      title: "Quién puede regalar",
      paragraphs: [
        "Cualquier persona mayor de 18 años puede regalar Kiri a un menor de 18 años: padres, abuelos, tíos, padrinos o amigos de la familia.",
        "Al facilitarnos los datos del menor y de su padre, madre o tutor, nos garantizas que son correctos, que la familia está de acuerdo con el regalo y que tienes permiso para compartir la foto del menor si la incluyes.",
      ],
    },
    {
      id: "proceso",
      title: "Cómo funciona",
      list: [
        { label: "Rellenas el formulario", text: "con tus datos, los del menor, los de su familia y la dirección de envío." },
        { label: "Pagas €29", text: "en nuestra pasarela de pago segura. Te enviaremos la confirmación por email." },
        { label: "Preparamos el Welcome Pack", text: "personalizado y lo enviamos a la dirección indicada." },
        { label: "La familia recibe el código", text: "y, si quiere, abre la cuenta del menor siguiendo las instrucciones." },
      ],
      note: "Te informaremos del plazo estimado de entrega en la confirmación. Si el envío se retrasa por causas ajenas a nosotros, te avisaremos por email.",
    },
    {
      id: "precio",
      title: "Precio y pago",
      paragraphs: [
        "El precio es de €29 con IVA incluido e incluye el envío. El pago es único: no hay suscripciones ni cargos posteriores.",
        "El pago se procesa a través de un proveedor de pagos seguro. Kiri no tiene acceso a los datos completos de tu tarjeta.",
      ],
    },
    {
      id: "desistimiento",
      title: "Desistimiento y devoluciones",
      paragraphs: [
        `Si cambias de opinión, puedes desistir escribiendo a ${LEGAL_CONTACT} en los 14 días naturales siguientes al pago, siempre que todavía no hayamos personalizado el Welcome Pack con los datos, el mensaje o la foto que nos diste. Te devolveremos el importe íntegro por el mismo medio de pago en un máximo de 14 días.`,
        "Una vez personalizado, el Welcome Pack se considera un bien confeccionado conforme a tus especificaciones y no se aplica el derecho de desistimiento (artículo 103.c del Real Decreto Legislativo 1/2007).",
        "Si el Welcome Pack llega dañado, incompleto o con un error que sea nuestro, escríbenos con una foto y te lo reponemos sin coste.",
      ],
    },
    {
      id: "familia",
      title: "Si la familia no desea el regalo",
      paragraphs: [
        "La familia es libre de no abrir la cuenta. Si el padre, madre o tutor nos indica que no desea el regalo antes de que lo enviemos, cancelaremos el pedido, te devolveremos el importe y borraremos los datos del menor.",
      ],
    },
    {
      id: "datos",
      title: "Datos personales",
      paragraphs: [
        "Usamos tus datos, los del menor y los de su familia únicamente para preparar y entregar el regalo. La foto y el mensaje personal se borran una vez enviado el Welcome Pack.",
      ],
      links: [
        { href: "/politica-de-privacidad", label: "Política de privacidad" },
        { href: "/privacidad-menores-y-familias", label: "Privacidad de menores y familias" },
      ],
    },
  ],
}
