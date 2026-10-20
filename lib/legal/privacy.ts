import { COMPANY_LINE, LEGAL_CONTACT, RIGHTS_LIST, RIGHTS_NOTE, type LegalDoc } from "./shared"

export const PRIVACY_DOC: LegalDoc = {
  href: "/politica-de-privacidad",
  navLabel: "Política de privacidad",
  eyebrow: "Tus datos",
  title: "Política de privacidad",
  intro:
    "Kiri ayuda a las familias a invertir en el futuro de sus hijos. Esa confianza empieza por tus datos: aquí te contamos cuáles usamos, para qué y cómo puedes controlarlos.",
  description:
    "Qué datos personales trata Kiri cuando usas su web, Regala Kiri o te pones en contacto con nosotros, para qué los usamos, cuánto tiempo los guardamos y cuáles son tus derechos.",
  summary: [
    { term: "Quién trata tus datos", description: "Kiri, la plataforma de ahorro e inversión para niños y niñas." },
    { term: "Qué datos", description: "Los que nos das en nuestros formularios y los mínimos técnicos para que la web funcione." },
    { term: "Lo que nunca hacemos", description: "Vender tus datos ni usarlos para mostrar publicidad a menores." },
    { term: "Tus derechos", description: `Acceder, corregir o borrar tus datos cuando quieras escribiendo a ${LEGAL_CONTACT}.` },
  ],
  contactSubject: "Privacidad",
  sections: [
    {
      id: "responsable",
      title: "Responsable del tratamiento",
      paragraphs: [
        `El responsable de tus datos es ${COMPANY_LINE}. Para cualquier cuestión sobre privacidad puedes escribirnos a ${LEGAL_CONTACT}.`,
        "Kiri colabora con Indexa Capital A.V., S.A., agencia de valores supervisada por la CNMV con el n.º 257, que es quien abre y gestiona las cuentas de inversión. Los datos que facilitas al abrir una cuenta los trata Indexa Capital como responsable, conforme a su propia política de privacidad.",
      ],
    },
    {
      id: "datos",
      title: "Qué datos tratamos",
      list: [
        {
          label: "Si regalas Kiri:",
          text: "tu nombre, apellidos, email y relación con el niño o niña; los datos del menor y de su padre, madre o tutor; la dirección de envío y, si lo añades, un mensaje y una foto.",
        },
        { label: "Si nos escribes:", text: "tu email y lo que nos cuentes en el mensaje." },
        { label: "Si te presentas a una oferta:", text: "los datos de tu candidatura, explicados en su política específica." },
        {
          label: "Si navegas por la web:",
          text: "datos técnicos básicos (tipo de dispositivo, páginas visitadas) de forma agregada, y tus preferencias de cookies.",
        },
      ],
      note: "El asistente de preguntas frecuentes de la web funciona en tu navegador: no guardamos lo que escribes en él.",
      links: [
        { href: "/privacidad-menores-y-familias", label: "Cómo protegemos los datos de los menores" },
        { href: "/privacidad-candidatos", label: "Privacidad para candidatos" },
      ],
    },
    {
      id: "finalidad",
      title: "Para qué los usamos y con qué base legal",
      list: [
        {
          label: "Gestionar Regala Kiri",
          text: "(preparar y enviar el Welcome Pack y el código de alta a la familia). Base legal: ejecución del contrato que celebras con nosotros.",
        },
        { label: "Responder a tus consultas.", text: "Base legal: tu consentimiento al escribirnos." },
        {
          label: "Mejorar la web",
          text: "con estadísticas agregadas y anónimas. Base legal: nuestro interés legítimo en ofrecer un servicio que funcione bien.",
        },
        {
          label: "Cumplir obligaciones legales,",
          text: "como las contables y fiscales de los pagos. Base legal: obligación legal.",
        },
        {
          label: "Enviarte novedades de Kiri,",
          text: "solo si nos lo has pedido expresamente. Puedes darte de baja en cualquier correo.",
        },
      ],
      note: "No tomamos decisiones que te afecten basadas únicamente en tratamientos automatizados ni elaboramos perfiles comerciales.",
    },
    {
      id: "conservacion",
      title: "Cuánto tiempo los conservamos",
      paragraphs: [
        "Conservamos los datos de Regala Kiri mientras sean necesarios para entregar el regalo y, después, durante los plazos que exige la ley para pagos y facturas (hasta 6 años). La foto y el mensaje personal se borran una vez enviado el Welcome Pack.",
        "Las consultas por email se conservan hasta que se resuelven y un máximo de 12 meses después. Pasados los plazos, eliminamos o anonimizamos los datos de forma segura.",
      ],
    },
    {
      id: "destinatarios",
      title: "Con quién los compartimos",
      paragraphs: [
        "No vendemos ni cedemos tus datos. Solo los compartimos con:",
      ],
      list: [
        { label: "Indexa Capital,", text: "cuando la familia decide abrir la cuenta de inversión del menor." },
        {
          label: "Proveedores que nos ayudan a funcionar:",
          text: "alojamiento web, pasarela de pago, mensajería para el envío del Welcome Pack, correo electrónico y herramientas de ofimática en la nube. Solo tratan los datos siguiendo nuestras instrucciones y con contratos que garantizan su protección.",
        },
        { label: "Administraciones públicas,", text: "cuando una ley nos obligue." },
      ],
      note: "Algunos proveedores pueden estar fuera del Espacio Económico Europeo. En ese caso, las transferencias se amparan en las cláusulas contractuales tipo de la Comisión Europea o en el Marco de Privacidad de Datos UE-EE. UU.",
    },
    {
      id: "derechos",
      title: "Tus derechos",
      paragraphs: [`Puedes ejercerlos en cualquier momento escribiendo a ${LEGAL_CONTACT}:`],
      list: RIGHTS_LIST,
      note: RIGHTS_NOTE,
    },
    {
      id: "seguridad",
      title: "Seguridad",
      paragraphs: [
        "Aplicamos medidas técnicas y organizativas para proteger tus datos: conexiones cifradas, acceso restringido a las personas del equipo que los necesitan y proveedores que cumplen la normativa europea de protección de datos.",
      ],
    },
    {
      id: "cambios",
      title: "Cambios en esta política",
      paragraphs: [
        "Si actualizamos esta política lo indicaremos con una nueva fecha al principio de la página. Si el cambio es importante, te avisaremos por email.",
      ],
    },
  ],
}
