import { COMPANY_LINE, type LegalDoc } from "./shared"

export const COOKIES_DOC: LegalDoc = {
  href: "/politica-de-cookies",
  navLabel: "Política de cookies",
  eyebrow: "Tu navegación",
  title: "Política de cookies",
  intro:
    "Usamos lo mínimo para que la web funcione y para entender, de forma anónima, cómo se usa. Tú decides el resto.",
  description:
    "Qué cookies y tecnologías similares usa la web de Kiri, para qué sirven, cuánto duran y cómo puedes cambiar tus preferencias en cualquier momento.",
  summary: [
    { term: "Necesarias", description: "Solo guardamos tu elección sobre las cookies. Siempre activas." },
    { term: "Analíticas", description: "Estadísticas agregadas y anónimas, sin cookies que te identifiquen." },
    { term: "Marketing", description: "Ahora mismo no usamos ninguna. Si lo hacemos, solo con tu permiso." },
    { term: "Tu control", description: "Puedes cambiar tus preferencias cuando quieras desde esta página." },
  ],
  contactSubject: "Cookies",
  sections: [
    {
      id: "que-son",
      title: "Qué son las cookies",
      paragraphs: [
        "Las cookies son pequeños archivos que una web guarda en tu navegador. Algunas tecnologías parecidas, como el almacenamiento local, funcionan igual. Las usamos para recordar tus preferencias y para saber qué partes de la web son útiles.",
        `El responsable de las cookies propias es ${COMPANY_LINE}.`,
      ],
    },
    {
      id: "cuales",
      title: "Qué cookies usamos",
      table: {
        caption: "Cookies y tecnologías similares de kiriapp.com",
        headers: ["Nombre", "Tipo", "Para qué sirve", "Duración"],
        rows: [
          [
            "kiri-cookie-consent",
            "Necesaria (propia, almacenamiento local)",
            "Recordar qué categorías de cookies has aceptado para no volver a preguntarte.",
            "Hasta que la borres o cambies tus preferencias",
          ],
          [
            "Vercel Web Analytics",
            "Analítica (tercero: Vercel Inc.)",
            "Contar visitas y páginas vistas de forma agregada. No usa cookies ni identifica a las personas.",
            "No se guarda en tu navegador",
          ],
          [
            "Pasarela de pago",
            "Necesaria (tercero)",
            "Procesar el pago de Regala Kiri de forma segura y prevenir fraudes. Solo se activa en la página de pago.",
            "La sesión de pago",
          ],
        ],
      },
      note: "Si en el futuro añadimos cookies analíticas o de marketing que te identifiquen, las incluiremos en esta tabla y solo se activarán si las aceptas.",
    },
    {
      id: "gestionar",
      title: "Cómo cambiar tus preferencias",
      paragraphs: [
        "Puedes cambiar tu elección en cualquier momento con el botón «Configurar cookies» de esta página o del pie de la web. También puedes borrar o bloquear las cookies desde la configuración de tu navegador; si bloqueas las necesarias, puede que algunas partes de la web no funcionen bien.",
      ],
      list: [
        { label: "Chrome:", text: "Configuración › Privacidad y seguridad › Cookies de terceros." },
        { label: "Safari:", text: "Ajustes › Privacidad › Gestionar datos de sitios web." },
        { label: "Firefox:", text: "Ajustes › Privacidad y seguridad › Cookies y datos del sitio." },
        { label: "Edge:", text: "Configuración › Cookies y permisos del sitio." },
      ],
    },
    {
      id: "mas",
      title: "Más información",
      paragraphs: [
        "Para saber cómo tratamos el resto de tus datos, consulta nuestra política de privacidad. Si actualizamos esta política lo indicaremos con una nueva fecha al principio de la página.",
      ],
      links: [{ href: "/politica-de-privacidad", label: "Política de privacidad" }],
    },
  ],
}
