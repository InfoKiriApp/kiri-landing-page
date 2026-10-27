import { COMPANY_LINE, LEGAL_CONTACT, RIGHTS_LIST, RIGHTS_NOTE, type LegalDoc } from "./shared"

export const CANDIDATES_DOC: LegalDoc = {
  href: "/privacidad-candidatos",
  navLabel: "Privacidad para candidatos",
  eyebrow: "Procesos de selección",
  title: "Política de privacidad para candidatos",
  intro:
    "Cuando te presentas a una oferta de Kiri nos confías tus datos. Aquí te explicamos, sin letra pequeña, qué hacemos con ellos.",
  description:
    "Cómo trata Kiri los datos personales de las personas que se presentan a sus procesos de selección: qué datos recogemos, para qué, cuánto tiempo y cuáles son tus derechos.",
  summary: [
    { term: "Quién trata tus datos", description: "Kiri, la plataforma de ahorro e inversión para niños y niñas." },
    { term: "Para qué", description: "Únicamente para valorar tu candidatura y gestionar el proceso de selección." },
    { term: "Cuánto tiempo", description: "Hasta 12 meses desde que termina el proceso, salvo que nos pidas borrarlos antes." },
    { term: "Tus derechos", description: `Puedes acceder, corregir o borrar tus datos escribiendo a ${LEGAL_CONTACT}.` },
  ],
  contactSubject: "Privacidad - proceso de selección",
  back: { href: "/trabaja-con-nosotros", label: "Volver a Trabaja con nosotros" },
  sections: [
    {
      id: "responsable",
      title: "Responsable del tratamiento",
      paragraphs: [
        `El responsable de tus datos es ${COMPANY_LINE}. Para cualquier cuestión relacionada con esta política o con tus datos puedes escribirnos a ${LEGAL_CONTACT}.`,
        "Kiri colabora con Indexa Capital A.V., S.A. para ofrecer sus productos de inversión, pero Indexa Capital no participa en nuestros procesos de selección ni recibe los datos de los candidatos.",
      ],
    },
    {
      id: "datos",
      title: "Qué datos recogemos",
      paragraphs: ["Solo los que nos facilitas a través del formulario de candidatura:"],
      list: [
        { label: "Datos de contacto:", text: "nombre y apellidos, email y número de móvil." },
        { label: "Formación y disponibilidad:", text: "curso, universidad, disponibilidad para incorporarte y nivel de inglés." },
        { label: "Perfil profesional:", text: "tu perfil de LinkedIn y tu CV en PDF." },
        {
          label: "Respuestas sobre el puesto:",
          text: "enlaces a tu portfolio o GitHub, herramientas y tecnologías que manejas, y los textos que escribas en las preguntas abiertas.",
        },
      ],
      note: "Te pedimos que no incluyas en tu CV ni en tus respuestas datos especialmente sensibles (salud, religión, ideología, etc.), porque no los necesitamos para valorar tu candidatura.",
    },
    {
      id: "finalidad",
      title: "Para qué los usamos",
      list: [
        { label: "Valorar tu candidatura", text: "y comprobar que encajas con el puesto al que te presentas." },
        { label: "Contactarte", text: "para informarte del estado del proceso y, si avanzas, organizar las entrevistas." },
        {
          label: "Considerarte para otros puestos",
          text: "de prácticas en Kiri que surjan durante el plazo de conservación, siempre que encajen con tu perfil.",
        },
      ],
      note: "No tomamos decisiones basadas únicamente en tratamientos automatizados: todas las candidaturas las revisa una persona del equipo.",
    },
    {
      id: "legitimacion",
      title: "Base legal",
      paragraphs: [
        "Tratamos tus datos porque nos das tu consentimiento al marcar la casilla del formulario (artículo 6.1.a del Reglamento General de Protección de Datos) y porque son necesarios para aplicar medidas precontractuales a petición tuya, como valorar tu incorporación a Kiri (artículo 6.1.b).",
        "Puedes retirar tu consentimiento cuando quieras. Hacerlo no afecta a los tratamientos que ya se hayan realizado, pero sí implica que dejaremos de considerar tu candidatura.",
      ],
    },
    {
      id: "conservacion",
      title: "Cuánto tiempo los conservamos",
      paragraphs: [
        "Guardamos tus datos mientras dure el proceso de selección y hasta 12 meses después de que termine, para poder contar contigo en futuras vacantes. Pasado ese plazo los eliminamos de forma segura.",
        "Si te incorporas a Kiri, los datos necesarios pasarán a formar parte de tu expediente y se regirán por la información que te daremos entonces.",
      ],
    },
    {
      id: "destinatarios",
      title: "Con quién los compartimos",
      paragraphs: [
        "No vendemos ni cedemos tus datos a terceros. Solo acceden a ellos las personas del equipo de Kiri que participan en el proceso de selección.",
        "Para funcionar utilizamos proveedores tecnológicos (alojamiento web, correo electrónico y herramientas de ofimática en la nube) que tratan los datos únicamente siguiendo nuestras instrucciones y con contratos que garantizan su protección. Algunos de estos proveedores pueden estar fuera del Espacio Económico Europeo; en ese caso las transferencias se amparan en las cláusulas contractuales tipo aprobadas por la Comisión Europea o en el Marco de Privacidad de Datos UE-EE. UU.",
      ],
    },
    {
      id: "derechos",
      title: "Tus derechos",
      paragraphs: [`Puedes ejercer en cualquier momento los siguientes derechos escribiendo a ${LEGAL_CONTACT}:`],
      list: RIGHTS_LIST,
      note: RIGHTS_NOTE,
    },
    {
      id: "seguridad",
      title: "Seguridad",
      paragraphs: [
        "Aplicamos medidas técnicas y organizativas para proteger tus datos frente a accesos no autorizados, pérdidas o alteraciones: conexiones cifradas, acceso restringido al equipo de selección y proveedores que cumplen la normativa europea de protección de datos.",
      ],
    },
    {
      id: "cambios",
      title: "Cambios en esta política",
      paragraphs: [
        "Si actualizamos esta política lo indicaremos con una nueva fecha al principio de la página. Si el cambio es importante y tu candidatura sigue activa, te avisaremos por email.",
      ],
    },
  ],
}
