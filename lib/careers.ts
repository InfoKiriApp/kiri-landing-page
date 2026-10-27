export type JobArea = "tech" | "operaciones" | "marketing"

export const FOUNDER_LINKS = {
  linkedin: "https://www.linkedin.com/in/marta-echarri/",
  tedx: "https://www.youtube.com/watch?v=dcTR5Dc7_a0",
}

export type Job = {
  area: JobArea
  filterLabel: string
  emoji: string
  title: string
  summary: string
  tasks: string[]
  fit: string
  bonus?: string
}

export const JOBS: Job[] = [
  {
    area: "tech",
    filterLabel: "Tech",
    emoji: "💻",
    title: "Tech & Product Intern",
    summary:
      "Hazte cargo de una parte real del producto en una fintech en fase de lanzamiento.",
    tasks: [
      "Llevar la landing (v0/Vercel, GitHub, Cloudflare) y el flujo de Regala Kiri.",
      "Trabajar con nuestro equipo técnico en el dashboard, la integración con Indexa, los QR únicos y los pagos.",
      "Convertir el feedback de beta testers en mejoras de producto.",
      "Construir y mejorar nuestros agentes de IA en Claude.",
      "Sacar adelante una iniciativa propia en tu primer mes.",
    ],
    fit: "Programas (JS/TS, web, APIs), prefieres lanzar e iterar, te interesan la fintech y el producto, usas IA a diario y escribes con claridad en español e inglés.",
    bonus:
      "Next.js, Vercel o pagos; experiencia con datos sensibles; proyectos propios.",
  },
  {
    area: "operaciones",
    filterLabel: "Operaciones",
    emoji: "📊",
    title: "Operaciones y Desarrollo de Negocio",
    summary:
      "A medio camino entre chief of staff y business developer, mano derecha operativa de la fundadora.",
    tasks: [
      "Coordinar el lanzamiento de Regala Kiri: Welcome Packs, proveedores y logística.",
      "Hacer seguimiento a beta testers y detectar dónde se atascan.",
      "Identificar oportunidades de negocio: alianzas, canales y empresas.",
      "Preparar propuestas y presentaciones para partners e inversores.",
      "Llevar el ritmo del equipo: Weekly, action points y documentación.",
    ],
    fit: "Tienes experiencia (prácticas incluidas) en operaciones, desarrollo de negocio o como asistente/chief of staff; eres muy organizado/a; te manejas con Google Workspace y tienes un nivel alto de español e inglés.",
  },
  {
    area: "marketing",
    filterLabel: "Marketing",
    emoji: "📣",
    title: "Marketing y Contenido",
    summary:
      "Cuenta la historia de Kiri y explica la inversión a las familias de forma cercana y sin jerga.",
    tasks: [
      "Diseñar campañas de Regala Kiri (nacimientos, cumpleaños, Navidad, bautizos).",
      "Crear contenido para Instagram, newsletter y Kiri Academy.",
      "Producir vídeos, incluidos vídeos con avatar de IA.",
      "Trabajar el SEO y medir qué funciona.",
    ],
    fit: "Escribes bien y adaptas el tono a cada canal, tienes criterio visual, te interesa la educación financiera, te gusta medir y mejorar, y tienes un nivel alto de español e inglés.",
    bonus: "Portfolio o cuentas propias; Mailchimp, WordPress o Semrush.",
  },
]
