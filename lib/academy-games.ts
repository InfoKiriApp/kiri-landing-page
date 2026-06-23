import type { AgeRange } from "./academy-articles"

export type GameStage = AgeRange

export type FAQ = {
  q: string
  a: string
}

export type GameTheme = {
  /** soft background tint, e.g. bg-rose-50 */
  bg: string
  /** soft surface used on hub cards */
  cardBg: string
  /** text accent, e.g. text-rose-600 */
  text: string
  /** solid accent background, e.g. bg-rose-500 */
  solid: string
  /** solid accent hover */
  solidHover: string
  /** border tint */
  border: string
  /** active ring */
  ring: string
}

export type Game = {
  stage: GameStage
  /** route segment, e.g. "3-5" */
  slug: string
  /** "3–5 años" */
  ageLabel: string
  /** "Preescolar" */
  stageName: string
  /** internal game name, e.g. "El Juego de las Monedas" */
  title: string
  /** short hook shown on cards */
  tagline: string
  /** lucide icon name */
  icon: string
  /** the financial skill the child practises */
  skill: string
  /** what the child learns, 1-2 sentences */
  kidLearns: string
  /** the lesson for the parent */
  parentLesson: {
    title: string
    body: string
  }
  /** how to play, short steps shown to the kid */
  howToPlay: string[]
  /** parent-focused FAQ on how to teach this lesson */
  faqs: FAQ[]
  theme: GameTheme
}

export const GAMES: Game[] = [
  {
    stage: "3-5",
    slug: "3-5",
    ageLabel: "3–5 años",
    stageName: "Preescolar",
    title: "El Juego de las Monedas",
    tagline: "Combina monedas hasta sumar 1 euro y haz crecer tu árbol Kiri.",
    icon: "Coins",
    skill: "Reconocer y contar dinero",
    kidLearns:
      "Que las monedas valen cosas distintas y que varias monedas pequeñas pueden sumar una grande. Cada euro que consigue hace crecer su árbol Kiri.",
    parentLesson: {
      title: "El ritual supera a la explicación",
      body: "A esta edad los niños aprenden por el tacto, la repetición y el juego, no por la lógica. Manipular monedas reales y contarlas en voz alta acelera el reconocimiento mucho más que cualquier ficha. Acompaña el juego con un pequeño ritual constante —las mismas palabras, el mismo gesto— y el hábito se forma antes de que puedan explicar por qué.",
    },
    howToPlay: [
      "Toca las monedas para añadirlas a la bandeja.",
      "Intenta sumar exactamente 1 euro.",
      "Cuando lo consigas, tu árbol Kiri crecerá un poco más.",
    ],
    faqs: [
      {
        q: "¿Cómo enseño a un niño de 3 años el valor del dinero?",
        a: "Haciéndolo físico y tangible: monedas reales en sus manos, pagar en la panadería, depositar el cambio en la hucha al llegar a casa. A esta edad el ritual supera a la explicación. Repite las mismas palabras y el mismo gesto cada vez.",
      },
      {
        q: "¿Por dónde empiezo con las monedas?",
        a: "Empieza solo con los nombres antes de introducir valores: la curiosidad va primero. En sesiones cortas y frecuentes, cuenta las monedas en voz alta mientras las comparáis. Después progresa a los valores: ¿cuántas necesitas para hacer un euro?",
      },
      {
        q: "¿Cuándo debo comprar la primera hucha?",
        a: "En cuanto el niño pregunte qué son las monedas o quiera algo en una tienda, normalmente entre los 3 y los 4 años. Deja que elija su propia hucha: la propiedad genera una motivación que ninguna explicación puede crear.",
      },
      {
        q: "¿Está bien dar dinero como premio?",
        a: "Solo para tareas especiales —lavar el coche, plantar flores—, no para las obligaciones cotidianas. Recoger los juguetes o poner la mesa son contribuciones familiares, no trabajos. Establecer esta distinción pronto evita confusiones más adelante.",
      },
    ],
    theme: {
      bg: "bg-rose-50",
      cardBg: "bg-rose-50",
      text: "text-rose-600",
      solid: "bg-rose-500",
      solidHover: "hover:bg-rose-600",
      border: "border-rose-200",
      ring: "ring-rose-300",
    },
  },
  {
    stage: "6-8",
    slug: "6-8",
    ageLabel: "6–8 años",
    stageName: "Primera infancia",
    title: "Los Tres Tarros",
    tagline: "Reparte tu paga entre Gastar, Ahorrar y Compartir, y alcanza tu meta.",
    icon: "PiggyBank",
    skill: "Repartir el dinero con propósito",
    kidLearns:
      "Que con el dinero siempre hay que elegir: gastar para disfrutar ahora, ahorrar para algo mayor o compartir con los demás. Equilibrar los tres tarros mantiene su árbol sano.",
    parentLesson: {
      title: "La consistencia importa más que el importe",
      body: "El valor de la paga es casi irrelevante; lo que importa es que sea predecible y venga acompañada de una conversación. Los tres tarros convierten cada semana en una decisión real entre gastar, ahorrar y compartir. Y si el tarro de gastar se vacía antes de tiempo, no lo repongas: la incomodidad de «ya no me queda» es exactamente la lección.",
    },
    howToPlay: [
      "Recibes una paga semanal en monedas.",
      "Arrastra o toca para repartir cada euro entre los tres tarros.",
      "Alcanza tu objetivo de ahorro sin descuidar el equilibrio.",
    ],
    faqs: [
      {
        q: "¿Cuánta paga debo dar a mi hijo de 6 años?",
        a: "Una referencia habitual es 1 euro por año de edad a la semana: 6 euros a los 6 años. Lo más importante no es la cantidad sino la consistencia: siempre el mismo día y siempre con una pequeña conversación sobre cómo va a repartirla.",
      },
      {
        q: "¿Cómo funciona el método de los tres tarros?",
        a: "Divide la paga en tres partes: Gastar (50%), Ahorrar (25%) y Compartir (25%). Cada semana el niño decide en voz alta cómo reparte el dinero. Ese ritual semanal construye el músculo de la toma de decisiones más que cualquier explicación.",
      },
      {
        q: "¿Debo ligar la paga a las tareas del hogar?",
        a: "No directamente. Vincular la paga a las tareas puede generar dinámicas negativas: el niño puede decidir no hacerlas si no quiere el dinero. Mantén las tareas como contribución familiar y reserva los trabajos especiales como fuente de ingresos extra.",
      },
      {
        q: "¿Qué hago si se gasta todo el primer día?",
        a: "Resiste la tentación de reponer el dinero. Que no llegue al fin de semana es la mejor lección de planificación que existe. Puedes ofrecerle ganar algo extra con una tarea especial, pero nunca elimines la consecuencia.",
      },
    ],
    theme: {
      bg: "bg-amber-50",
      cardBg: "bg-amber-50",
      text: "text-amber-600",
      solid: "bg-amber-500",
      solidHover: "hover:bg-amber-600",
      border: "border-amber-200",
      ring: "ring-amber-300",
    },
  },
  {
    stage: "9-11",
    slug: "9-11",
    ageLabel: "9–11 años",
    stageName: "Infancia media",
    title: "El Balance de mi Árbol",
    tagline: "Cubre tus necesidades, distingue deseos y haz crecer tu árbol.",
    icon: "Scale",
    skill: "Hacer un presupuesto",
    kidLearns:
      "Que el dinero es limitado: primero se cubren las necesidades obligatorias y luego se decide cuánto ahorrar e invertir frente a cuánto gastar en caprichos. Su árbol reacciona en tiempo real.",
    parentLesson: {
      title: "Pico de curiosidad: aprovéchalo",
      body: "Los 9–11 años son la etapa de mayor apertura al input adulto antes de la adolescencia. Es el mejor momento para hablar de dinero con profundidad, antes de que el teléfono compita contigo. Cuando el dinero no alcance para todo, habla de prioridades, no de dar más: distinguir gastos fijos de caprichos es la base de toda planificación.",
    },
    howToPlay: [
      "Recibes una paga semanal de 25 €.",
      "Clasifica cada gasto: ¿necesidad obligatoria o deseo prescindible?",
      "Reparte lo que sobre entre ahorrar y caprichos, y observa tu árbol.",
    ],
    faqs: [
      {
        q: "¿A qué edad se puede abrir una cuenta bancaria a un niño?",
        a: "En España se puede abrir una cuenta para menores desde el nacimiento, aunque la edad práctica más habitual es entre los 9 y los 11 años, cuando el niño ya entiende el concepto de interés y puede gestionar su propio saldo de forma significativa.",
      },
      {
        q: "¿Cómo explico el interés compuesto a un niño de 10 años?",
        a: "Con una calculadora: muéstrale cuánto tendría si invierte 100 € hoy al 7% anual durante 30 años. El resultado —más de 760 € sin hacer nada más— siempre impacta. Compáralo con lo que podría comprar con esos 100 € hoy.",
      },
      {
        q: "¿Cómo respondo si pregunta «¿somos ricos?»",
        a: "Una respuesta que funciona: «Tenemos suficiente para vivir bien, viajar y disfrutar juntos. Y por eso mamá y papá trabajamos con cuidado.» No hace falta revelar cifras. Luego pregunta: «¿Por qué lo preguntas?» La respuesta te dirá mucho más.",
      },
      {
        q: "¿Cómo le enseño a presupuestar?",
        a: "Ayúdale a distinguir gastos fijos (el plan del móvil) de caprichos puntuales (el cine). Cuando el dinero no alcance para todo, habla de prioridades en lugar de dar más. Ver los números escritos en una hoja o app cambia por completo su percepción.",
      },
    ],
    theme: {
      bg: "bg-emerald-50",
      cardBg: "bg-emerald-50",
      text: "text-emerald-600",
      solid: "bg-emerald-600",
      solidHover: "hover:bg-emerald-700",
      border: "border-emerald-200",
      ring: "ring-emerald-300",
    },
  },
  {
    stage: "12-14",
    slug: "12-14",
    ageLabel: "12–14 años",
    stageName: "Preadolescencia",
    title: "Simulador de Bolsa Flash",
    tagline: "Invierte 1.000 €, lee las noticias y aprende a gestionar el riesgo.",
    icon: "TrendingUp",
    skill: "Entender la inversión y el riesgo",
    kidLearns:
      "Cómo funciona la bolsa de forma visual: las noticias hacen subir y bajar el precio de una acción. Aprende a gestionar el riesgo y a no dejarse llevar por las emociones antes de invertir dinero real.",
    parentLesson: {
      title: "El interés compuesto necesita tiempo, y este es el momento",
      body: "Aunque parezca que solo piensan en sus amigos, el cerebro adolescente sigue muy receptivo. Las mejores conversaciones de dinero a esta edad son las que no parecen lecciones. Mostrar con una calculadora lo que suponen 50 €/mes durante 30 años al 7% suele impactar a cualquier adolescente: la visualización lo cambia todo.",
    },
    howToPlay: [
      "Empiezas con 1.000 € simulados.",
      "Sigue el precio de la acción y lee los titulares que aparecen.",
      "Compra barato, vende antes de que caiga y haz crecer tu capital.",
    ],
    faqs: [
      {
        q: "¿Es demasiado pronto para que invierta con 13 años?",
        a: "No lo es: en España se pueden abrir cuentas de menores para fondos indexados desde el nacimiento. Lo importante es que la cantidad sea pequeña, que entienda que el dinero puede bajar y que el horizonte sea largo. La educación vale más que la rentabilidad.",
      },
      {
        q: "¿Qué es el préstamo familiar con interés y para qué sirve?",
        a: "Cuando quiera algo que no puede pagar con su paga, ofrécele un préstamo formal por escrito con un interés simbólico (1–2%). Experimenta el coste real de pedir prestado sin las consecuencias del sistema financiero real. Al terminar, comparad qué costaría en un banco.",
      },
      {
        q: "¿Cómo introduzco los fondos indexados?",
        a: "Empieza con el concepto: si compras una pequeña parte de 500 empresas a la vez, diversificas el riesgo. Usa la calculadora de interés compuesto y, si tiene dinero ahorrado, considerad comprar juntos un ETF indexado real y seguirlo cada mes sin dramatismo.",
      },
      {
        q: "¿Cómo hablo de dinero con un adolescente que no quiere escuchar?",
        a: "No lo llames «lección» ni «charla de finanzas». Usa situaciones cotidianas: cuando pague algo, cuando vea publicidad, cuando pida un préstamo. Las conversaciones cortas y naturales, repetidas en el tiempo, funcionan mejor que las charlas formales.",
      },
    ],
    theme: {
      bg: "bg-violet-50",
      cardBg: "bg-violet-50",
      text: "text-violet-600",
      solid: "bg-violet-600",
      solidHover: "hover:bg-violet-700",
      border: "border-violet-200",
      ring: "ring-violet-300",
    },
  },
  {
    stage: "15-18",
    slug: "15-18",
    ageLabel: "15–18 años",
    stageName: "Adolescencia",
    title: "El Escudo Digital",
    tagline: "Detecta phishing y fraudes antes de que comprometan tu dinero.",
    icon: "ShieldCheck",
    skill: "Proteger tu identidad y tu dinero",
    kidLearns:
      "Que proteger la identidad digital es tan importante como proteger la cartera. Aprende a identificar phishing, fraudes y sobreexposición que pueden afectar a su patrimonio y al de toda la familia.",
    parentLesson: {
      title: "Dar contexto, no prohibir",
      body: "Las redes muestran a gente «haciéndose rica» con trading y criptos, y ocultan las pérdidas: el 80% de los traders minoristas pierde dinero. Tu misión no es prohibir, sino dar contexto con datos reales y comparar con la inversión indexada. La identidad digital ya tiene valor económico: una foto comprometida hoy puede costar una entrevista de trabajo dentro de diez años.",
    },
    howToPlay: [
      "Llegan notificaciones a tu móvil, una a una.",
      "Decide si cada mensaje es seguro o una amenaza (phishing/fraude).",
      "Acierta para mantener tu escudo al 100%.",
    ],
    faqs: [
      {
        q: "¿Cómo protejo la identidad digital de mi hijo?",
        a: "Activad la verificación en dos pasos en todas las cuentas, usad contraseñas únicas por servicio (un gestor de contraseñas lo facilita) y revisad juntos qué información personal aparece en Google. Habla del impacto a largo plazo de las publicaciones como gestión de reputación, no como amenaza.",
      },
      {
        q: "¿Cómo hablo de criptomonedas sin que parezca que las prohíbo?",
        a: "No las rechaces: pregunta qué sabe y de dónde lo aprendió. Comparte los datos —el 80% de los traders minoristas pierde— y sugiere empezar con un simulador. Comparar 1.000 € en cripto frente a un índice global a 10 años suele hablar por sí solo.",
      },
      {
        q: "¿Cuándo debe tener su primera cuenta bancaria propia?",
        a: "En España, desde los 14 años con DNI propio. Es el momento ideal: tiene su primera fuente de ingresos (trabajo, paga) y puede gestionar su primer presupuesto real de forma autónoma pero supervisada.",
      },
      {
        q: "¿Cómo le ayudo con su primer trabajo?",
        a: "Acompáñale a preparar un CV básico y a ensayar la entrevista: el proceso es la lección. Cuando cobre el primer sueldo, celebra el hito antes de hablar de en qué gastarlo, y aprovecha para explicar la diferencia entre el bruto y el neto.",
      },
    ],
    theme: {
      bg: "bg-sky-50",
      cardBg: "bg-sky-50",
      text: "text-sky-600",
      solid: "bg-sky-600",
      solidHover: "hover:bg-sky-700",
      border: "border-sky-200",
      ring: "ring-sky-300",
    },
  },
  {
    stage: "19-22",
    slug: "19-22",
    ageLabel: "19–22 años",
    stageName: "Joven adulto",
    title: "El Balanceador de Vida",
    tagline: "Gestiona 12 meses de presupuesto real y alcanza tu gran meta.",
    icon: "Wallet",
    skill: "Planificar tu vida financiera",
    kidLearns:
      "A simular el presupuesto real de un adulto independiente: cómo ingresos, vivienda, deudas y gastos interactúan mes a mes, y cómo las decisiones de ahorro e inversión construyen (o destruyen) la libertad financiera.",
    parentLesson: {
      title: "Ahora eres mentor, no profesor",
      body: "Ofrecer consejo no pedido a un joven adulto cierra la conversación. La estrategia más eficaz es estar disponible, compartir tu experiencia cuando te la piden y hacer preguntas en lugar de dar respuestas. El dato más influyente que puedes compartir, sin presionar: retrasar cinco años el inicio de la inversión puede suponer más de 100.000 € menos al jubilarse.",
    },
    howToPlay: [
      "Configura tus ingresos, gastos, deudas y tu gran meta.",
      "Cada mes, reparte tu presupuesto entre vivienda, inversión, ocio y donaciones.",
      "Llega al mes 12 alcanzando tu meta sin quedarte en quiebra.",
    ],
    faqs: [
      {
        q: "¿Cómo le ayudo a organizar sus finanzas sin que lo viva como una intrusión?",
        a: "No te ofrezcas a ayudar: espera a que te lo pida y, cuando lo haga, escucha antes de aconsejar. Para abrir la conversación, comparte tu propia experiencia de forma vulnerable: «¿Quieres que te cuente cuál fue mi mayor error financiero a tu edad?»",
      },
      {
        q: "¿Es normal que un joven de 21 años no ahorre nada?",
        a: "Es muy habitual, sobre todo con ingresos bajos o irregulares. Lo importante no es la cantidad sino el hábito: incluso 20 €/mes automatizados construyen más que 200 € de forma irregular. La regla 50/30/20 es un buen punto de partida.",
      },
      {
        q: "¿Cuándo tiene sentido ayudarle económicamente?",
        a: "La ayuda estructurada como inversión (la fianza del primer piso, formación con retorno claro) suele tener sentido. La ayuda recurrente para cubrir déficit de gasto corriente puede crear dependencia. Si ayudas, documéntalo, aunque sea como préstamo informal.",
      },
      {
        q: "¿Cómo le explico la herencia sin que cambie su relación con el trabajo?",
        a: "La herencia debería ser el complemento de un plan propio, no el plan principal. Comparte que existe, pero sin cifras concretas hasta que sea necesario. Lo que más le protege es tener sus propias bases financieras sólidas, independientemente de lo que herede.",
      },
    ],
    theme: {
      bg: "bg-teal-50",
      cardBg: "bg-teal-50",
      text: "text-teal-600",
      solid: "bg-teal-600",
      solidHover: "hover:bg-teal-700",
      border: "border-teal-200",
      ring: "ring-teal-300",
    },
  },
]

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug)
}

export function getAllGameSlugs(): string[] {
  return GAMES.map((g) => g.slug)
}
