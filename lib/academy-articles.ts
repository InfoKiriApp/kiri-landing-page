export type KiriCategory = "raices" | "tronco" | "frutos" | "bosque"

export type AgeRange = "3-5" | "6-8" | "9-11" | "12-14" | "15-18" | "19-22"

export const AGE_RANGES: AgeRange[] = ["3-5", "6-8", "9-11", "12-14", "15-18", "19-22"]

export const ADRIANA = {
  name: "Adriana Jaureguizar",
  role: "Directora de Kiri Academy",
  avatar: "/images/adriana-jaureguizar.png",
  bio: "Especialista en educación financiera infantil y juvenil. Adriana lidera el proyecto pedagógico de Kiri Academy, combinando evidencia científica sobre el desarrollo cognitivo con estrategias prácticas para que las familias hablen de dinero de forma natural.",
}

export type Article = {
  slug: string
  icon: string
  category: string
  kiriCategory: KiriCategory
  ageRange: AgeRange
  title: string
  excerpt: string
  readTime: string
  coverUrl: string
  thumbUrl: string
  body: ArticleSection[]
}

export type ArticleSection = {
  type: "paragraph" | "heading" | "subheading" | "callout" | "list"
  content?: string
  items?: string[]
}

export const ARTICLES: Article[] = [
  // ─── Las Raíces ───────────────────────────────────────────────────────────
  {
    slug: "necesidades-vs-deseos",
    icon: "Scale",
    category: "Fundamentos",
    kiriCategory: "raices",
    ageRange: "6-8" as AgeRange,
    title: "Necesidades vs. Deseos: La Brújula Financiera de Nuestros Hijos",
    excerpt:
      "¿Alguna vez has visto esa mirada de tu peque frente a un juguete nuevo, acompañada de un «¡Lo quiero!»? Una oportunidad de oro para enseñarles a diferenciar lo que necesitamos para vivir de lo que queremos.",
    readTime: "5 min",
    coverUrl: "/images/academy/necesidades-vs-deseos.png",
    thumbUrl: "/images/academy/thumbs/necesidades-vs-deseos.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Cada vez que salimos al supermercado con nuestros hijos o navegamos juntos por internet, nos encontramos con el mismo escenario: el deseo inmediato de tenerlo todo. No es un defecto de carácter. Es, simplemente, cómo funciona el cerebro humano cuando aún no ha aprendido a distinguir entre lo que necesita y lo que quiere.",
      },
      {
        type: "heading",
        content: "¿Por qué es tan difícil para los niños?",
      },
      {
        type: "paragraph",
        content:
          "El córtex prefrontal, la parte del cerebro responsable de la toma de decisiones y el autocontrol, no termina de madurar hasta los 25 años. Esto significa que los niños no tienen la misma capacidad neurológica que los adultos para decir «no» a una gratificación inmediata. No es terquedad, es biología.",
      },
      {
        type: "paragraph",
        content:
          "Sin embargo, eso no significa que debamos esperar a que crezcan para enseñarles. Al contrario: cuanto antes introduzcamos el concepto de necesidad versus deseo, más tiempo tiene el cerebro para practicarlo y convertirlo en un hábito.",
      },
      {
        type: "heading",
        content: "La regla de los tres trozos",
      },
      {
        type: "paragraph",
        content:
          "Una estrategia sencilla que funciona muy bien con niños de 5 a 12 años es dividir visualmente su dinero en tres partes: gastar, ahorrar y compartir. Cuando quieren algo, primero deben identificar de qué «trozo» saldrá.",
      },
      {
        type: "list",
        items: [
          "Gastar: para caprichos del momento, golosinas, un juguete pequeño.",
          "Ahorrar: para algo que cuesta más y requiere esperar.",
          "Compartir: para donar, regalar o ayudar a alguien.",
        ],
      },
      {
        type: "callout",
        content:
          "Truco Kiri: La próxima vez que tu hijo pida algo en la tienda, hazle esta pregunta: «¿Lo necesitas para vivir o lo quieres porque te gusta?» No juzgues la respuesta, escúchala. El objetivo no es decirle que no, sino que piense antes de decidir.",
      },
      {
        type: "heading",
        content: "Ejemplos cotidianos que abren conversaciones",
      },
      {
        type: "paragraph",
        content:
          "La compra de la semana es una de las mejores aulas para esta lección. Antes de ir al supermercado, haz con tu hijo una lista de necesidades (comida, productos de limpieza) y otra de deseos (ese yogur de colores, las patatas fritas). Analiza juntos qué acaba en el carrito y por qué.",
      },
      {
        type: "paragraph",
        content:
          "Con niños más mayores, de 10 a 16 años, puedes subir la complejidad: habla de cómo los anuncios están diseñados para convertir deseos en «necesidades urgentes». La publicidad es una clase magistral de psicología del consumidor, y entenderla es una habilidad financiera imprescindible.",
      },
      {
        type: "heading",
        content: "La paciencia como superpoder",
      },
      {
        type: "paragraph",
        content:
          "Investigaciones sobre el famoso «test del malvavisco» de Stanford muestran que los niños que aprenden a esperar una recompensa tienden a tener mejores resultados académicos y financieros en la vida adulta. No se trata de privar a los hijos de cosas, sino de enseñarles que la espera puede hacer que el disfrute sea mayor.",
      },
      {
        type: "callout",
        content:
          "Recuerda: el objetivo no es criar a un niño que nunca gaste, sino a un adulto que sepa elegir en qué merece la pena gastar.",
      },
    ],
  },
  {
    slug: "introduccion-educacion-financiera-en-casa",
    icon: "Sprout",
    category: "Inicio",
    kiriCategory: "raices",
    ageRange: "3-5" as AgeRange,
    title: "Introducción a la Educación Financiera en Casa",
    excerpt:
      "¿Cuál es el mejor momento para empezar a hablar de dinero con tus hijos? La respuesta es más sencilla de lo que imaginas: ahora mismo. Recursos y estrategias adaptados por edades.",
    readTime: "8 min",
    coverUrl: "/images/academy/introduccion-educacion-financiera-en-casa.png",
    thumbUrl: "/images/academy/thumbs/introduccion-educacion-financiera-en-casa.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Hablar de dinero en casa sigue siendo un tabú en muchas familias españolas. Nos parece un tema de adultos, incómodo, o simplemente no sabemos cómo empezar. Sin embargo, los estudios demuestran que los hábitos financieros se forman antes de los 7 años. Si esperamos a que sean mayores, ya habremos perdido la ventana más receptiva.",
      },
      {
        type: "heading",
        content: "Por edades: ¿qué puede entender tu hijo?",
      },
      {
        type: "subheading",
        content: "De 3 a 6 años: el dinero existe y tiene un propósito",
      },
      {
        type: "paragraph",
        content:
          "A esta edad los niños entienden perfectamente que el dinero se intercambia por cosas. Puedes usar monedas reales para jugar a la tienda en casa, enseñarles a contar y mostrarles que cuando pagas algo, ese dinero se va. La hucha es una herramienta poderosa a esta edad: ver crecer el contenido es tangible y emocionante.",
      },
      {
        type: "subheading",
        content: "De 7 a 10 años: el ahorro y la espera",
      },
      {
        type: "paragraph",
        content:
          "Aquí entra la paga semanal o mensual. No como un derecho, sino como una herramienta de aprendizaje. Deja que se equivoquen: si gastan todo el primer día y no pueden comprarse lo que querían al final de la semana, esa es la mejor lección que recibirán. Tu papel es acompañar, no rescatar.",
      },
      {
        type: "subheading",
        content: "De 11 a 14 años: presupuestos y metas",
      },
      {
        type: "paragraph",
        content:
          "A esta edad pueden entender el concepto de presupuesto. Dales una cantidad para gestionar gastos concretos (meriendas del mes, salidas con amigos) y que aprendan a priorizar. También es el momento de hablar de trabajo y de cómo el dinero se gana.",
      },
      {
        type: "subheading",
        content: "De 15 a 18 años: inversión y futuro",
      },
      {
        type: "paragraph",
        content:
          "Aquí ya pueden comprender el interés compuesto, los fondos de inversión y la planificación a largo plazo. Si tienen una cuenta Kiri, es el momento perfecto para que revisen juntos cómo ha crecido su inversión y qué podrían hacer con ella a los 18.",
      },
      {
        type: "callout",
        content:
          "Punto de partida Kiri: Empieza con una sola conversación en la próxima comida familiar. Pregunta: «¿Sabéis de dónde viene el dinero que usamos en casa?» Las respuestas te sorprenderán.",
      },
      {
        type: "heading",
        content: "Los tres pilares de la educación financiera en casa",
      },
      {
        type: "list",
        items: [
          "Vocabulario: nombra las cosas por su nombre. Hipoteca, ahorro, inversión, presupuesto. No son palabras de adultos, son palabras de personas preparadas.",
          "Experiencia: el aprendizaje real viene de gestionar dinero real, aunque sea pequeño.",
          "Ejemplo: tus hijos aprenden más de lo que ven que de lo que les dices. Habla en voz alta de tus decisiones financieras cotidianas.",
        ],
      },
    ],
  },
  {
    slug: "modelado-comportamiento-financiero",
    icon: "Users",
    category: "Comportamiento",
    kiriCategory: "raices",
    ageRange: "3-5" as AgeRange,
    title: "Modelado de Comportamiento Financiero: Sé un Buen Ejemplo",
    excerpt:
      "Nuestros hijos son esponjas brillantes que absorben todo lo que ven. La tierra más fértil para que los conceptos financieros crezcan en la mente de tu hijo eres tú.",
    readTime: "6 min",
    coverUrl: "/images/academy/modelado-comportamiento-financiero.png",
    thumbUrl: "/images/academy/thumbs/modelado-comportamiento-financiero.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Podemos darles todos los libros de finanzas personales del mundo, apuntarles a cursos y contarles historias sobre el ahorro. Pero si nos ven gastar de forma impulsiva, preocuparnos constantemente por el dinero o evitar hablar del tema, eso es lo que aprenderán.",
      },
      {
        type: "heading",
        content: "El efecto espejo",
      },
      {
        type: "paragraph",
        content:
          "Los psicólogos llaman «modelado» al proceso por el cual los niños aprenden observando e imitando a los adultos de referencia. Es la forma de aprendizaje más poderosa que existe, y funciona con todo: el lenguaje, los valores, los hábitos de alimentación, y también con el dinero.",
      },
      {
        type: "paragraph",
        content:
          "Un estudio de la Universidad de Cambridge concluyó que los niños de 7 años ya tienen hábitos financieros formados. No porque alguien se los haya enseñado explícitamente, sino porque los han observado en casa.",
      },
      {
        type: "heading",
        content: "Comportamientos que tus hijos están observando ahora mismo",
      },
      {
        type: "list",
        items: [
          "Cómo reaccionas cuando llega una factura inesperada.",
          "Si consultas el saldo antes de una compra grande o actúas por impulso.",
          "Si habláis en familia de dinero con calma o con tensión.",
          "Cómo decides cuándo algo «vale la pena» gastarlo.",
          "Si ahorras regularmente o solo cuando sobra algo al final del mes.",
        ],
      },
      {
        type: "heading",
        content: "Habla en voz alta de tus decisiones",
      },
      {
        type: "paragraph",
        content:
          "Una de las estrategias más poderosas es narrar en voz alta tu proceso de decisión financiera. No para presumir ni para angustiarles, sino para que entiendan que detrás de cada decisión económica hay un razonamiento.",
      },
      {
        type: "callout",
        content:
          "Ejemplo real: «Voy a esperar al Black Friday para comprar esa lavadora porque así ahorramos unos 150 euros que podemos usar para el viaje de verano.» Una frase, tres conceptos: comparar precios, ahorrar y asignar el ahorro a un objetivo.",
      },
      {
        type: "heading",
        content: "¿Y si yo tampoco tengo buenos hábitos financieros?",
      },
      {
        type: "paragraph",
        content:
          "Perfecto. Aprended juntos. De hecho, hay pocas cosas tan poderosas para un hijo como ver a sus padres reconocer que están aprendiendo y mejorando. El mensaje que transmites entonces es doble: que siempre se puede mejorar y que el dinero no es un tema tabú sino una habilidad que se puede cultivar a cualquier edad.",
      },
    ],
  },
  {
    slug: "a-que-edad-hablar-de-dinero",
    icon: "BookOpen",
    category: "Fundamentos",
    kiriCategory: "raices",
    ageRange: "3-5" as AgeRange,
    title: "¿A qué edad hablar de dinero con tus hijos?",
    excerpt:
      "Muchos padres esperan «el momento adecuado» para hablar de finanzas. La neurociencia nos dice que ese momento es mucho antes de lo que creemos.",
    readTime: "5 min",
    coverUrl: "/images/academy/a-que-edad-hablar-de-dinero.png",
    thumbUrl: "/images/academy/thumbs/a-que-edad-hablar-de-dinero.webp",
    body: [
      {
        type: "paragraph",
        content:
          "La pregunta que más nos hacen las familias que llegan a Kiri es: «¿Es demasiado pronto para hablar de dinero con mi hijo de 4 años?» La respuesta, respaldada por la neurociencia del desarrollo, es siempre la misma: no existe el demasiado pronto.",
      },
      {
        type: "heading",
        content: "Lo que dice la ciencia",
      },
      {
        type: "paragraph",
        content:
          "Investigadores del Money Advice Service del Reino Unido concluyeron en 2013 que los hábitos financieros de los adultos quedan fijados en gran medida antes de los 7 años. El cerebro infantil en esa etapa es extraordinariamente plástico: absorbe, conecta y consolida patrones de comportamiento que perdurarán décadas.",
      },
      {
        type: "paragraph",
        content:
          "Esto no significa que a los 4 años debamos explicar la diferencia entre un bono y una acción. Significa que las conversaciones cotidianas sobre el valor de las cosas, el origen del dinero y la diferencia entre querer y necesitar son semillas que ya están germinando.",
      },
      {
        type: "heading",
        content: "Señales de que tu hijo ya está listo",
      },
      {
        type: "list",
        items: [
          "Pregunta dónde «sacas» el dinero cuando pagas con tarjeta.",
          "Quiere «pagar» él mismo en la caja del supermercado.",
          "Distingue monedas y billetes por su valor.",
          "Entiende que algunas cosas «cuestan más» que otras.",
        ],
      },
      {
        type: "callout",
        content:
          "Kiri te propone: la próxima vez que vayas al cajero automático, llévate a tu hijo y explícale, con palabras sencillas, qué está pasando. «Este es el banco. Aquí guardamos nuestro dinero para cuando lo necesitamos.» Así de sencillo es empezar.",
      },
      {
        type: "heading",
        content: "Lo que nunca es demasiado tarde",
      },
      {
        type: "paragraph",
        content:
          "Si tu hijo ya tiene 12 o 15 años y nunca has hablado de dinero con él, no te preocupes. El cerebro adolescente también es muy plástico y está especialmente motivado por todo lo que tenga que ver con autonomía y futuro. Habla con ellos de tú a tú: sin lecciones magistrales, con conversaciones reales.",
      },
    ],
  },

  // ─── El Tronco y las Ramas ────────────────────────────────────────────────
  {
    slug: "el-arte-de-ahorrar-la-hucha-magica",
    icon: "PiggyBank",
    category: "Ahorro",
    kiriCategory: "tronco",
    ageRange: "6-8" as AgeRange,
    title: "El Arte de Ahorrar: La Hucha Mágica",
    excerpt:
      "El impulso de gastar y obtener una recompensa inmediata es fuerte en niños y adultos. Descubre cómo convertir el ahorro en un hábito natural y emocionante desde edades tempranas.",
    readTime: "6 min",
    coverUrl: "/images/academy/el-arte-de-ahorrar-la-hucha-magica.png",
    thumbUrl: "/images/academy/thumbs/el-arte-de-ahorrar-la-hucha-magica.webp",
    body: [
      {
        type: "paragraph",
        content:
          "El ahorro es el músculo más importante de la salud financiera, y como todo músculo, se entrena. Cuanto antes empiece el entrenamiento, más fuerte se vuelve. El problema es que la gratificación inmediata siempre gana a la recompensa futura, salvo que hagamos que el proceso de ahorro sea en sí mismo emocionante.",
      },
      {
        type: "heading",
        content: "Por qué la hucha funciona",
      },
      {
        type: "paragraph",
        content:
          "La hucha física tiene una ventaja que ninguna app bancaria puede replicar con niños pequeños: es tangible. Ven y sienten el dinero. Escuchan el sonido de la moneda al caer. Pueden sacudir la hucha y notar cómo pesa más cada semana. Ese feedback sensorial es fundamental para que el concepto de «acumulación» sea real para ellos.",
      },
      {
        type: "heading",
        content: "El sistema de tres huchas",
      },
      {
        type: "paragraph",
        content:
          "Una variante del método clásico que funciona muy bien a partir de los 6 años es tener tres huchas con nombres y objetivos distintos:",
      },
      {
        type: "list",
        items: [
          "Hucha de Gastar: para caprichos a corto plazo. Aquí no hay restricciones.",
          "Hucha de Crecer: para un objetivo a medio plazo que ellos mismos han elegido.",
          "Hucha de Dar: para compartir con otros. Una pequeña donación mensual a algo que les importe.",
        ],
      },
      {
        type: "callout",
        content:
          "Truco Kiri: Haz que los propios niños decoren sus huchas con el objetivo que quieren conseguir. Una foto del juguete que quieren, del viaje que sueñan o del regalo que van a hacer. La visualización del objetivo multiplica la motivación.",
      },
      {
        type: "heading",
        content: "La paga como laboratorio de aprendizaje",
      },
      {
        type: "paragraph",
        content:
          "Dar una paga regular no es malcriar: es dar a los hijos un laboratorio para experimentar con decisiones reales. La clave está en no rescatarles cuando se equivocan. Si se gastan todo el lunes y el viernes no pueden ir al cine con sus amigos, esa frustración es la mejor maestra que existe.",
      },
      {
        type: "paragraph",
        content:
          "Una guía orientativa: entre 1 y 2 euros por año de edad y semana. Un niño de 8 años podría recibir entre 8 y 16 euros al mes. Suficiente para aprender, no tanto como para que no importe perderlo.",
      },
      {
        type: "heading",
        content: "Del ahorro físico al digital",
      },
      {
        type: "paragraph",
        content:
          "A partir de los 10-12 años es el momento perfecto de dar el salto a un ahorro más sofisticado: una cuenta de inversión como Kiri, donde el dinero no solo se acumula sino que crece. Ver un gráfico de rentabilidad subir, aunque sea lentamente, es una experiencia transformadora para un adolescente.",
      },
    ],
  },
  {
    slug: "magia-interes-compuesto",
    icon: "TrendingUp",
    category: "Inversión",
    kiriCategory: "tronco",
    ageRange: "12-14" as AgeRange,
    title: "La Magia del Interés Compuesto: El Árbol que da Más Frutos",
    excerpt:
      "Imagina un árbol que no solo crece, sino que produce semillas que se siembran solas, creando nuevos árboles sin que tú hagas nada. Esa es exactamente la magia del interés compuesto.",
    readTime: "7 min",
    coverUrl: "/images/academy/magia-interes-compuesto.png",
    thumbUrl: "/images/academy/thumbs/magia-interes-compuesto.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Albert Einstein, según la leyenda, llamó al interés compuesto «la octava maravilla del mundo». Si lo entendías, lo ganabas. Si no lo entendías, lo pagabas. Pocas frases resumen mejor por qué la educación financiera temprana puede cambiar el destino económico de una persona.",
      },
      {
        type: "heading",
        content: "La diferencia entre interés simple y compuesto",
      },
      {
        type: "paragraph",
        content:
          "Con el interés simple, ganas siempre sobre la misma base. Si tienes 1.000 euros al 5% anual, cada año ganas 50 euros. Punto. Con el interés compuesto, los intereses que ganas se suman al capital, y el año siguiente ganas intereses también sobre esos intereses. Es como si los frutos del árbol se convirtieran automáticamente en nuevos árboles.",
      },
      {
        type: "callout",
        content:
          "Ejemplo concreto: 100 euros al 10% anual. Con interés simple: 200 euros en 10 años. Con interés compuesto: 259 euros en 10 años. Después de 30 años, la diferencia es abismal: 400 euros vs. 1.745 euros. El tiempo es el ingrediente secreto.",
      },
      {
        type: "heading",
        content: "Por qué empezar desde el nacimiento importa tanto",
      },
      {
        type: "paragraph",
        content:
          "Si inviertes 50 euros al mes desde el nacimiento de tu hijo hasta que cumple 18 años, con una rentabilidad histórica del 11,56% anual (la de la Cartera Kiri Ambiciosa), habrás aportado 10.800 euros. Pero el valor acumulado supera los 35.000 euros. Los 25.000 euros de diferencia no los has puesto tú: los ha puesto el tiempo.",
      },
      {
        type: "paragraph",
        content:
          "Si esperas a que tu hijo tenga 10 años para empezar, tendrás 8 años en lugar de 18 para que el interés compuesto actúe. El resultado final es radicalmente inferior, no a la mitad, sino mucho menos, porque los primeros años son los que más «poder de compuesto» tienen.",
      },
      {
        type: "heading",
        content: "Cómo explicárselo a un niño",
      },
      {
        type: "paragraph",
        content:
          "La metáfora del árbol Kiri funciona perfectamente. Plantamos una semilla (la inversión inicial). El árbol crece (los intereses). Pero las ramas también producen semillas que se plantan solas (el interés sobre el interés). Con el tiempo, tienes un bosque entero de un solo árbol.",
      },
      {
        type: "list",
        items: [
          "Para niños de 6-9 años: usa el juego de doblar un papel. Si lo doblas 10 veces, ¿cuánto mide? 1.024 capas. Lo mismo pasa con el dinero que «se dobla» con los intereses.",
          "Para niños de 10-13 años: muéstrales una calculadora de interés compuesto online y que experimenten ellos mismos cambiando los parámetros.",
          "Para adolescentes: muéstrales el simulador de la calculadora Kiri y la diferencia que supone empezar a los 0 versus a los 10 años.",
        ],
      },
    ],
  },
  {
    slug: "diferencia-activos-pasivos",
    icon: "BookOpen",
    category: "Inversión",
    kiriCategory: "tronco",
    ageRange: "12-14" as AgeRange,
    title: "La Diferencia entre Activos y Pasivos",
    excerpt:
      "En el mundo de las finanzas, hay una distinción crucial entre lo que pone dinero en tu bolsillo y lo que lo saca. Enseña a tus hijos esta diferencia desde pequeños.",
    readTime: "5 min",
    coverUrl: "/images/academy/diferencia-activos-pasivos.png",
    thumbUrl: "/images/academy/thumbs/diferencia-activos-pasivos.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Robert Kiyosaki popularizó en «Padre Rico, Padre Pobre» una definición que cambió la forma en que millones de personas piensan sobre el dinero: un activo es algo que mete dinero en tu bolsillo. Un pasivo es algo que lo saca. Simple, poderosa y perfecta para enseñar a niños.",
      },
      {
        type: "heading",
        content: "Activos: el dinero trabaja para ti",
      },
      {
        type: "paragraph",
        content:
          "Un activo genera ingresos o se revaloriza con el tiempo. Ejemplos que un niño puede entender: una cuenta de inversión que crece, un libro que compras y luego vendes más caro, un negocio pequeño (como vender limonada) que genera más dinero del que cuesta montarlo.",
      },
      {
        type: "heading",
        content: "Pasivos: tú trabajas para el dinero",
      },
      {
        type: "paragraph",
        content:
          "Un pasivo te cuesta dinero de forma recurrente sin generar ingresos. El ejemplo más claro para adolescentes es la suscripción a un servicio de streaming que nunca usan: pagas todos los meses sin recibir nada a cambio.",
      },
      {
        type: "callout",
        content:
          "Ejercicio Kiri: Pide a tu hijo que haga un inventario de 5 cosas que tiene. Para cada una, que identifique: ¿esto me da dinero o me lo quita? Verás que la mayoría de «cosas» son pasivos, y eso abre una conversación fascinante.",
      },
      {
        type: "heading",
        content: "La gran lección: construye activos antes que pasivos",
      },
      {
        type: "paragraph",
        content:
          "La trampa en la que caen muchos adultos es comprar pasivos creyendo que son activos (el coche de lujo, la televisión enorme) antes de haber construido suficientes activos que generen ingresos. Enseñar esto a los hijos desde pequeños es darles una ventaja financiera que muy pocos adultos tienen.",
      },
      {
        type: "paragraph",
        content:
          "Una cuenta de inversión Kiri es, en esencia, el primer activo real de tu hijo: un capital que trabaja para él mientras duerme, mientras juega y mientras crece.",
      },
    ],
  },
  {
    slug: "fondos-de-inversion-indexados",
    icon: "TrendingUp",
    category: "Inversión",
    kiriCategory: "tronco",
    ageRange: "15-18" as AgeRange,
    title: "¿Qué es un Fondo de Inversión Indexado y por qué es ideal para niños?",
    excerpt:
      "Los fondos indexados son la herramienta de inversión más recomendada por los expertos para el largo plazo. Te explicamos cómo funcionan con palabras que hasta un niño puede entender.",
    readTime: "6 min",
    coverUrl: "/images/academy/fondos-de-inversion-indexados.png",
    thumbUrl: "/images/academy/thumbs/fondos-de-inversion-indexados.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Cuando la mayoría de la gente piensa en inversión, imagina a alguien mirando gráficos en varios monitores y comprando y vendiendo acciones frenéticamente. La realidad de la inversión inteligente a largo plazo es exactamente lo contrario: invertir en un fondo indexado y no tocarlo durante años.",
      },
      {
        type: "heading",
        content: "La metáfora de la cesta de fruta",
      },
      {
        type: "paragraph",
        content:
          "Imagina que en lugar de apostar todo tu dinero a que una única empresa va a tener éxito (una sola fruta), compras una cesta con cientos de frutas distintas: manzanas, naranjas, plátanos... Si una fruta se estropea, tienes muchas más. Si el mercado de la fruta en general sube, toda tu cesta sube. Eso es un fondo indexado.",
      },
      {
        type: "heading",
        content: "¿Por qué «indexado»?",
      },
      {
        type: "paragraph",
        content:
          "Un fondo indexado replica un índice bursátil como el S&P 500 (las 500 empresas más grandes de Estados Unidos) o el MSCI World (las mayores empresas del mundo). No hay un gestor tomando decisiones activas: el fondo simplemente sigue el índice. Esto tiene dos ventajas enormes para el inversor a largo plazo.",
      },
      {
        type: "list",
        items: [
          "Comisiones muy bajas: al no haber gestión activa, los costes son mínimos. En 20 años, la diferencia en comisiones puede suponer miles de euros.",
          "Consistencia: la historia demuestra que la mayoría de fondos de gestión activa no baten a los índices a largo plazo. El índice, por definición, siempre rinde igual que el mercado.",
        ],
      },
      {
        type: "callout",
        content:
          "La Cartera Kiri Ambiciosa, gestionada por MyInvestor, utiliza fondos indexados globales para maximizar el crecimiento a largo plazo con un coste mínimo. Su rentabilidad anualizada desde 2022 ha sido del 11,56%.",
      },
      {
        type: "heading",
        content: "La importancia del horizonte temporal",
      },
      {
        type: "paragraph",
        content:
          "El mayor riesgo de los fondos indexados es vender en el momento equivocado, cuando el mercado cae. La clave para eliminar ese riesgo es el tiempo. Con 18 años de horizonte, los altibajos del mercado se convierten en ruido irrelevante frente a la tendencia general de crecimiento. Esa es exactamente la ventaja de empezar a invertir para un recién nacido.",
      },
    ],
  },

  // ─── Los Frutos ───────────────────────────────────────────────────────────
  {
    slug: "sembrando-suenos-ahorro-por-objetivos",
    icon: "Target",
    category: "Objetivos",
    kiriCategory: "frutos",
    ageRange: "9-11" as AgeRange,
    title: "Sembrando Sueños: Ahorro por Objetivos",
    excerpt:
      "¿Tu hijo sueña con el último videojuego, un viaje a Eurodisney o una bicicleta especial? Cuando los niños tienen un objetivo claro, descubren la motivación perfecta para ahorrar con propósito.",
    readTime: "6 min",
    coverUrl: "/images/academy/sembrando-suenos-ahorro-por-objetivos.png",
    thumbUrl: "/images/academy/thumbs/sembrando-suenos-ahorro-por-objetivos.webp",
    body: [
      {
        type: "paragraph",
        content:
          "El ahorro sin objetivo es el ahorro que no dura. Pregúntale a cualquier adulto que haya intentado «ahorrar en general» sin un destino concreto: el dinero siempre encuentra la forma de gastarse. Lo mismo ocurre con los niños, pero al revés: cuando tienen un objetivo que les emociona, su capacidad de resist ir la tentación de gastar se multiplica.",
      },
      {
        type: "heading",
        content: "El poder del objetivo visible",
      },
      {
        type: "paragraph",
        content:
          "La psicología del ahorro orientado a metas está bien documentada. Cuando asociamos una cantidad de dinero a un objetivo concreto y visualizable, el dinero deja de ser abstracto y se convierte en «el viaje a la playa» o «la bicicleta azul». Este proceso de concretización hace que el cerebro lo proteja instintivamente.",
      },
      {
        type: "callout",
        content:
          "Actividad Kiri: Haz con tu hijo un «termómetro del ahorro». Dibuja un termómetro en papel, ponle el objetivo arriba (por ejemplo, 60 euros para unos auriculares) y que cada semana coloree cuánto ha ahorrado. Ver el progreso visual es uno de los mayores motivadores que existen.",
      },
      {
        type: "heading",
        content: "Cómo elegir el objetivo correcto",
      },
      {
        type: "paragraph",
        content:
          "El objetivo debe cumplir tres condiciones para que el ejercicio sea pedagógicamente valioso:",
      },
      {
        type: "list",
        items: [
          "Que sea alcanzable: ni tan fácil que no suponga esfuerzo, ni tan difícil que desmoralice. Un mes o dos de ahorro es un buen rango para empezar.",
          "Que sea elegido por el niño: si el objetivo lo fija el padre, la motivación es del padre. Si lo elige el niño, la motivación es suya.",
          "Que requiera cierto sacrificio: algún capricho que no se comprará para llegar antes a la meta. El sacrificio voluntario es el corazón del aprendizaje.",
        ],
      },
      {
        type: "heading",
        content: "Objetivos a largo plazo: la dimensión Kiri",
      },
      {
        type: "paragraph",
        content:
          "Junto a los objetivos a corto plazo (la hucha de los auriculares), es valioso introducir desde pequeños la idea de un objetivo a muy largo plazo: el dinero que se está construyendo en su cuenta Kiri. No para cuando terminen las vacaciones, sino para cuando cumplan 18 años y puedan decidir qué hacer con él.",
      },
      {
        type: "paragraph",
        content:
          "Habla con tu hijo sobre ese dinero. Ponle nombre. «Este es tu fondo universidad, o tu fondo para viajar un año, o el inicio de tu primer negocio.» Cuanto más concreto y personal sea ese objetivo, más significativo será el proceso de ahorro.",
      },
    ],
  },
  {
    slug: "metafora-arbol-y-dinero",
    icon: "TreePine",
    category: "Metáforas",
    kiriCategory: "frutos",
    ageRange: "6-8" as AgeRange,
    title: "La Metáfora del Árbol y el Dinero",
    excerpt:
      "Imagínate una semilla diminuta con un potencial inmenso. Con tiempo y cuidado, esa semilla se convierte en un árbol majestuoso. Lo mismo ocurre con el dinero cuando se planta pronto.",
    readTime: "4 min",
    coverUrl: "/images/academy/metafora-arbol-y-dinero.png",
    thumbUrl: "/images/academy/thumbs/metafora-arbol-y-dinero.webp",
    body: [
      {
        type: "paragraph",
        content:
          "El árbol Kiri es el árbol de crecimiento más rápido del planeta. Puede crecer hasta 30 metros de altura, y lo hace con una velocidad asombrosa si tiene las condiciones adecuadas: tierra fértil, agua suficiente y luz. Por eso elegimos este árbol para representar cómo queremos que crezcan los ahorros e inversiones de los niños.",
      },
      {
        type: "heading",
        content: "La semilla: el primer euro",
      },
      {
        type: "paragraph",
        content:
          "Toda inversión, por grande que sea, empezó siendo una semilla. El primer euro ahorrado, el primer regalo de cumpleaños destinado a crecer, la primera contribución de los abuelos en lugar de un juguete que se olvidará en semanas. La semilla en sí no es impresionante. Lo que importa es plantarla.",
      },
      {
        type: "heading",
        content: "Las raíces: los hábitos y el conocimiento",
      },
      {
        type: "paragraph",
        content:
          "Un árbol sin raíces profundas cae con el primer viento fuerte. Lo mismo ocurre con una persona que tiene dinero pero no tiene los hábitos y el conocimiento para gestionarlo. Las raíces son la educación financiera: entender el valor del ahorro, la diferencia entre necesidades y deseos, el funcionamiento básico del interés compuesto.",
      },
      {
        type: "heading",
        content: "El tronco: la constancia",
      },
      {
        type: "paragraph",
        content:
          "La constancia es el tronco. No los grandes gestos ni las inversiones perfectas, sino la regularidad: ahorrar cada mes aunque sea poco, no tocar la inversión cuando el mercado baja, seguir plantando aunque no se vean los resultados de inmediato. El tronco es lo que da estructura y fuerza a todo lo demás.",
      },
      {
        type: "heading",
        content: "Los frutos: la recompensa a largo plazo",
      },
      {
        type: "paragraph",
        content:
          "Los frutos llegan. No en una semana ni en un mes, sino después de años de crecimiento sostenido. Para un niño que empieza con Kiri, los frutos son los 35.000 euros o más que le esperarán a los 18 años si sus padres y familiares contribuyen regularmente. Pero los frutos más importantes no son económicos: son la confianza, la autonomía y la cultura financiera que habrán cultivado durante toda su infancia.",
      },
      {
        type: "callout",
        content:
          "Para reflexionar con tus hijos: ¿qué tipo de árbol quieres ser? ¿Uno que crece deprisa y se cae al primer viento, o uno que crece despacio, con raíces profundas, y que aguanta cualquier tormenta?",
      },
    ],
  },
  {
    slug: "como-establecer-metas-de-ahorro",
    icon: "Target",
    category: "Objetivos",
    kiriCategory: "frutos",
    ageRange: "9-11" as AgeRange,
    title: "Cómo Establecer Metas de Ahorro con tus Hijos en 5 Pasos",
    excerpt:
      "Las metas de ahorro no se imponen, se construyen juntos. Una guía práctica para que el proceso sea motivador, realista y educativo a la vez.",
    readTime: "5 min",
    coverUrl: "/images/academy/como-establecer-metas-de-ahorro.png",
    thumbUrl: "/images/academy/thumbs/como-establecer-metas-de-ahorro.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Establecer una meta de ahorro con un hijo no es sentarse y decirle «a partir de ahora ahorras el 20% de tu paga». Es un proceso de exploración, negociación y co-creación que, cuando se hace bien, transforma por completo la relación del niño con el dinero.",
      },
      {
        type: "heading",
        content: "Paso 1: Escucha primero, propone después",
      },
      {
        type: "paragraph",
        content:
          "Antes de lanzar cualquier propuesta, pregunta: «¿Hay algo que desees mucho y que no tengas todavía?» Escucha sin juzgar. A veces el objetivo que mencionen te sorprenderá: no siempre es un juguete. Puede ser una experiencia, un viaje, un curso. Ese deseo genuino es el combustible de todo lo que viene después.",
      },
      {
        type: "heading",
        content: "Paso 2: Pon un precio real",
      },
      {
        type: "paragraph",
        content:
          "Juntos, investigad cuánto cuesta realmente lo que quieren. Entra con ellos en la tienda online, compara precios, suma los gastos asociados. Este ejercicio de investigación ya es educación financiera: aprender que todo tiene un precio concreto y que ese precio se puede conocer.",
      },
      {
        type: "heading",
        content: "Paso 3: Calculad el tiempo necesario",
      },
      {
        type: "paragraph",
        content:
          "Con el precio y la cantidad que pueden ahorrar por semana o mes, haced juntos la división. Si el objetivo cuesta 80 euros y ahorran 10 euros a la semana, llegarán en 8 semanas. Mark ese día en el calendario. Tener una fecha concreta cambia completamente la sensación de control sobre el proceso.",
      },
      {
        type: "heading",
        content: "Paso 4: Crea el sistema de seguimiento",
      },
      {
        type: "paragraph",
        content:
          "El termómetro del ahorro, un gráfico de barras, una app, una hucha con ventana transparente... Elige el sistema de seguimiento que más le emocione a tu hijo. Lo importante es que el progreso sea visible y que lo revisen juntos regularmente.",
      },
      {
        type: "heading",
        content: "Paso 5: Celebra el proceso, no solo el resultado",
      },
      {
        type: "callout",
        content:
          "Cuando lleguen a la mitad del objetivo, celébralo. Un pequeño reconocimiento a mitad de camino (no económico: puede ser una actividad especial juntos) recarga la motivación para el tramo final. El mensaje que transmites: el esfuerzo sostenido merece ser reconocido.",
      },
    ],
  },

  // ─── El Bosque ────────────────────────────────────────────────────────────
  {
    slug: "ser-generoso-el-dinero-para-ayudar",
    icon: "Heart",
    category: "Valores",
    kiriCategory: "bosque",
    ageRange: "6-8" as AgeRange,
    title: "Ser Generoso: Entender que el Dinero También Sirve para Ayudar",
    excerpt:
      "La semilla de la generosidad: cuando pensamos en dinero, a veces olvidamos que es también una herramienta para crear impacto positivo en el mundo.",
    readTime: "5 min",
    coverUrl: "/images/academy/ser-generoso-el-dinero-para-ayudar.png",
    thumbUrl: "/images/academy/thumbs/ser-generoso-el-dinero-para-ayudar.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Una de las paradojas más hermosas de la educación financiera es que enseñar a los niños a ser generosos con el dinero no les hace peores gestores del mismo, sino mejores. Los estudios sobre psicología del bienestar muestran consistentemente que gastar en otros produce más felicidad que gastar en uno mismo.",
      },
      {
        type: "heading",
        content: "Por qué la generosidad es una habilidad financiera",
      },
      {
        type: "paragraph",
        content:
          "La generosidad enseña varias cosas a la vez: que el dinero es una herramienta, no un fin en sí mismo. Que tiene valor relativo: lo que para ti es pequeño puede ser enorme para otra persona. Y que la abundancia no se pierde al compartirla, sino que a menudo se multiplica en forma de relaciones, gratitud y propósito.",
      },
      {
        type: "heading",
        content: "Cómo introducir la generosidad en el sistema de ahorro",
      },
      {
        type: "paragraph",
        content:
          "La forma más sencilla es la tercera hucha: la del «compartir». Desde pequeños, si un porcentaje del dinero siempre va a esa hucha, la generosidad deja de ser un esfuerzo excepcional y se convierte en un hábito automático. No se trata de grandes cantidades: con 1 euro al mes un niño puede contribuir a algo que le importe.",
      },
      {
        type: "list",
        items: [
          "Elegid juntos a dónde va ese dinero. La implicación en la elección multiplica el significado.",
          "Investigad la causa que quieren apoyar: ver el impacto real de su contribución es transformador.",
          "Si es posible, participad también de forma no monetaria: tiempo, esfuerzo, creatividad.",
        ],
      },
      {
        type: "callout",
        content:
          "Reflexión para compartir en familia: ¿Qué mundo queremos dejar a los niños de hoy? Y, más importante aún, ¿qué tipo de personas queremos que sean esos niños cuando ese mundo sea suyo?",
      },
    ],
  },
  {
    slug: "errores-comunes-educacion-financiera-infantil",
    icon: "Scale",
    category: "Errores",
    kiriCategory: "bosque",
    ageRange: "19-22" as AgeRange,
    title: "Errores Comunes en la Educación Financiera Infantil y Cómo Evitarlos",
    excerpt:
      "Como jardineros de Kiri, es fundamental identificar las malas hierbas que pueden sabotear el crecimiento financiero de nuestros hijos. Conocerlos nos ayuda a garantizar que el jardín florezca.",
    readTime: "7 min",
    coverUrl: "/images/academy/errores-comunes-educacion-financiera-infantil.png",
    thumbUrl: "/images/academy/thumbs/errores-comunes-educacion-financiera-infantil.webp",
    body: [
      {
        type: "paragraph",
        content:
          "No existe el padre perfecto en educación financiera, igual que no existe el inversor perfecto. Todos cometemos errores. La diferencia entre los que crían hijos financieramente sanos y los que no está en la capacidad de identificar y corregir esos errores.",
      },
      {
        type: "heading",
        content: "Error 1: No hablar de dinero",
      },
      {
        type: "paragraph",
        content:
          "El silencio sobre el dinero transmite un mensaje muy claro: el dinero es un tema peligroso, tabú, fuente de conflicto. Los niños que crecen en hogares donde nunca se habla de dinero llegan a la vida adulta sin herramientas para gestionarlo y con una relación emocional compleja con él.",
      },
      {
        type: "heading",
        content: "Error 2: Usar el dinero como premio o castigo",
      },
      {
        type: "paragraph",
        content:
          "«Si sacas buenas notas te doy dinero» o «como te has portado mal no hay paga esta semana» confunde el valor del dinero con el valor del comportamiento. El dinero no debe ser una herramienta de control emocional: debe ser una herramienta de aprendizaje.",
      },
      {
        type: "heading",
        content: "Error 3: Rescatar económicamente siempre",
      },
      {
        type: "paragraph",
        content:
          "Cuando un niño se gasta toda su paga en el primer día y los padres le dan más dinero para que no se quede sin nada, están eliminando la consecuencia natural del aprendizaje. La frustración de quedarse sin dinero antes de tiempo es una de las mejores lecciones que puede recibir un niño.",
      },
      {
        type: "heading",
        content: "Error 4: Hablar de escasez constantemente",
      },
      {
        type: "paragraph",
        content:
          "«No tenemos dinero para eso», «eso es muy caro para nosotros», «el dinero no crece en los árboles»... Estas frases, repetidas constantemente, generan una mentalidad de escasez que persiste en la edad adulta y lleva a decisiones financieras impulsadas por el miedo.",
      },
      {
        type: "callout",
        content:
          "Alternativa Kiri: en lugar de «no tenemos dinero», prueba «ahora mismo hemos decidido gastar nuestro dinero en otras cosas que son más importantes para nosotros». Pequeño cambio de palabras, gran diferencia de mentalidad.",
      },
      {
        type: "heading",
        content: "Error 5: Esperar a que sean mayores",
      },
      {
        type: "paragraph",
        content:
          "Ya lo hemos visto: los hábitos financieros se forman antes de los 7 años. Esperar a que «entiendan mejor» es perder los años de mayor plasticidad cerebral. La conversación no tiene que ser perfecta para ser valiosa.",
      },
    ],
  },
  {
    slug: "cultura-del-ahorro-en-familia",
    icon: "TreePine",
    category: "Valores",
    kiriCategory: "bosque",
    ageRange: "12-14" as AgeRange,
    title: "La Cultura del Ahorro en Familia: Cómo Crear un Proyecto Común",
    excerpt:
      "El ahorro no es una obligación individual: puede ser el proyecto más ilusionante que una familia comparta. Te explicamos cómo construir esa cultura desde cero.",
    readTime: "6 min",
    coverUrl: "/images/academy/cultura-del-ahorro-en-familia.png",
    thumbUrl: "/images/academy/thumbs/cultura-del-ahorro-en-familia.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Cuando el ahorro deja de ser una norma impuesta por los padres y se convierte en un proyecto compartido por toda la familia, algo cambia radicalmente. Los niños pasan de sentirse controlados a sentirse partícipes. Y esa diferencia lo cambia todo.",
      },
      {
        type: "heading",
        content: "El proyecto de ahorro familiar",
      },
      {
        type: "paragraph",
        content:
          "Propón a tu familia un objetivo colectivo de ahorro: un viaje a algún lugar que todos deseen, la renovación de algo que necesita la casa, o simplemente un «fondo de aventuras» para experiencias inesperadas. Que cada miembro de la familia, incluidos los niños, contribuya de alguna forma y pueda ver el progreso.",
      },
      {
        type: "heading",
        content: "Las reuniones de dinero",
      },
      {
        type: "paragraph",
        content:
          "Una práctica muy poderosa, aunque infrecuente en las familias españolas, es tener una «reunión de dinero» mensual de 20 minutos. Sin dramatismo ni tensión: simplemente revisar juntos cómo va el proyecto de ahorro familiar, qué gastos ha habido y qué metas están más cerca.",
      },
      {
        type: "list",
        items: [
          "Haz que los niños tengan un papel activo: que registren los gastos, que calculen cuánto falta para el objetivo.",
          "Celebra los pequeños hitos: llegar al 25%, al 50%, al 75% del objetivo merecen reconocimiento.",
          "Si han surgido gastos imprevistos, explica qué pasó y qué decisión tomasteis. La transparencia es educación.",
        ],
      },
      {
        type: "heading",
        content: "Involucrar a los abuelos y familiares",
      },
      {
        type: "paragraph",
        content:
          "Una de las características más únicas de Kiri es que permite a toda la familia contribuir al crecimiento financiero de un niño. Los abuelos, tíos y padrinos pueden hacer aportaciones en lugar de regalos materiales, construyendo algo que tendrá valor real cuando el niño llegue a la edad adulta.",
      },
      {
        type: "callout",
        content:
          "Propuesta Kiri: En la próxima reunión familiar, propón el concepto. No como «en lugar de regalos», sino como «además de los regalos, construimos juntos algo que le durará toda la vida». La conversación que abre es, en sí misma, un regalo.",
      },
    ],
  },

  // ─── Gestión de Activos ──────────────���────────────────────────────────────
  {
    slug: "que-es-la-gestion-de-activos",
    icon: "BarChart2",
    category: "Inversión",
    kiriCategory: "tronco",
    ageRange: "15-18" as AgeRange,
    title: "Gestión de Activos: Quién Cuida Tu Dinero Cuando Inviertes",
    excerpt:
      "Cuando alguien invierte en un fondo, hay un equipo de profesionales detrás tomando decisiones cada día. Conocer cómo funciona la gestión de activos te da perspectiva sobre lo que ocurre con tu dinero.",
    readTime: "7 min",
    coverUrl: "/images/academy/que-es-la-gestion-de-activos.png",
    thumbUrl: "/images/academy/thumbs/que-es-la-gestion-de-activos.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Imagina que tienes dinero ahorrado y quieres que crezca, pero no tienes ni el tiempo ni los conocimientos para analizar cientos de empresas cada semana. Ahí es donde entra en juego la gestión de activos: profesionales especializados que toman esas decisiones por ti, a cambio de una comisión.",
      },
      {
        type: "heading",
        content: "¿Qué es exactamente un gestor de activos?",
      },
      {
        type: "paragraph",
        content:
          "Una gestora de activos (o asset manager, en inglés) es una empresa o profesional que administra dinero de terceros con el objetivo de hacerlo crecer. Pueden gestionar fondos de inversión, planes de pensiones, carteras privadas para grandes fortunas o incluso el capital de otras empresas.",
      },
      {
        type: "paragraph",
        content:
          "Las gestoras más grandes del mundo —como BlackRock, Vanguard o Fidelity— manejan decenas de billones de euros. Son actores tan relevantes que sus decisiones pueden mover mercados enteros.",
      },
      {
        type: "heading",
        content: "Gestión activa vs. gestión pasiva",
      },
      {
        type: "paragraph",
        content:
          "Esta es una de las grandes divisiones del mundo de la inversión. En la gestión activa, el gestor analiza el mercado, selecciona valores y cambia la composición de la cartera buscando batir a un índice de referencia. En la gestión pasiva, el objetivo es simplemente replicar ese índice, comprando las mismas empresas en la misma proporción.",
      },
      {
        type: "list",
        items: [
          "Gestión activa: mayor coste en comisiones, busca superar al mercado, requiere talento y análisis continuo.",
          "Gestión pasiva: comisiones muy bajas, replica un índice como el S&P 500 o el MSCI World, estadísticamente bate a la mayoría de gestores activos a largo plazo.",
          "La evidencia histórica muestra que más del 80% de los fondos activos no superan a su índice de referencia en un horizonte de 10 años.",
        ],
      },
      {
        type: "heading",
        content: "Las comisiones: el enemigo silencioso",
      },
      {
        type: "paragraph",
        content:
          "En la gestión de activos, las comisiones se expresan como porcentaje anual del patrimonio gestionado. Pueden parecer pequeñas —un 1% o un 2%— pero sobre plazos largos tienen un impacto devastador gracias (o más bien, en contra de) al interés compuesto.",
      },
      {
        type: "callout",
        content:
          "Ejemplo real: Si inviertes 10.000€ durante 30 años con una rentabilidad del 7% anual, obtendrás aproximadamente 76.000€ sin comisiones. Con una comisión del 2% anual, terminarías con unos 43.000€. La diferencia de 33.000€ se la ha llevado el gestor.",
      },
      {
        type: "heading",
        content: "¿Cómo se relaciona esto con Kiri?",
      },
      {
        type: "paragraph",
        content:
          "Kiri actúa a través de MyInvestor, que ofrece acceso a fondos indexados de bajo coste. Cuando los padres ahorran para sus hijos a través de Kiri, su dinero se invierte de forma eficiente, minimizando comisiones y maximizando el efecto del interés compuesto a lo largo de los años. Entender gestión de activos ayuda a valorar por qué la elección del vehículo de inversión importa tanto como la cantidad que se ahorra.",
      },
    ],
  },

  // ─── Private Equity ───────────────────────────────────────────────────────
  {
    slug: "private-equity-inversion-en-empresas-privadas",
    icon: "Building2",
    category: "Inversión",
    kiriCategory: "frutos",
    ageRange: "19-22" as AgeRange,
    title: "Private Equity: Invertir en Empresas que No Cotizan en Bolsa",
    excerpt:
      "La mayoría de la gente conoce la bolsa. Pero existe un mundo paralelo donde se mueve tanto o más dinero: el private equity. Empresas privadas, operaciones millonarias y rentabilidades que los mercados públicos rara vez ofrecen.",
    readTime: "8 min",
    coverUrl: "/images/academy/private-equity-inversion-en-empresas-privadas.png",
    thumbUrl: "/images/academy/thumbs/private-equity-inversion-en-empresas-privadas.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Cuando una empresa cotiza en bolsa, cualquiera puede comprar una fracción de ella. Pero la inmensa mayoría de las empresas del mundo no cotizan en bolsa. Son privadas. Y hay inversores especializados que ponen capital en ellas con la esperanza de hacerlas crecer y vender su participación con beneficio. A eso se le llama private equity.",
      },
      {
        type: "heading",
        content: "¿Cómo funciona un fondo de private equity?",
      },
      {
        type: "paragraph",
        content:
          "Un fondo de private equity capta capital de grandes inversores institucionales —fondos de pensiones, family offices, aseguradoras— y lo invierte en empresas privadas. El ciclo típico dura entre 7 y 10 años: los primeros 3-4 años se invierten, los siguientes se gestionan las participadas, y al final se venden para repartir los beneficios.",
      },
      {
        type: "list",
        items: [
          "Buyout: adquisición de una empresa madura, a menudo con deuda (LBO o leveraged buyout), para mejorarla y revenderla.",
          "Growth equity: inversión en empresas ya rentables que necesitan capital para escalar.",
          "Venture capital: inversión en startups en fases tempranas (esto merece su propio artículo).",
          "Distressed: compra de empresas en dificultades financieras a precio de saldo para reestructurarlas.",
        ],
      },
      {
        type: "heading",
        content: "La lógica del apalancamiento",
      },
      {
        type: "paragraph",
        content:
          "Una de las estrategias más usadas en private equity es el LBO (Leveraged Buyout). La firma compra una empresa poniendo solo una parte del precio en capital propio y financiando el resto con deuda. Si la empresa genera caja suficiente para pagar esa deuda, la rentabilidad sobre el capital invertido se amplifica enormemente.",
      },
      {
        type: "callout",
        content:
          "Analogía: Es como comprar un piso de 200.000€ poniendo solo 40.000€ propios y financiando el resto con hipoteca. Si el piso sube a 260.000€, has ganado 60.000€ sobre una inversión de 40.000€: una rentabilidad del 150% sobre tu capital, aunque el activo solo haya subido un 30%.",
      },
      {
        type: "heading",
        content: "¿Por qué no está al alcance de todos?",
      },
      {
        type: "paragraph",
        content:
          "Los fondos de private equity suelen requerir inversiones mínimas de varios millones de euros y están orientados a inversores institucionales o de muy alto patrimonio. Son inversiones ilíquidas —no puedes salirte cuando quieras— y de largo plazo. La regulación europea (ELTIF) está abriendo poco a poco el acceso a inversores minoristas, pero sigue siendo un activo de difícil acceso para el público general.",
      },
      {
        type: "heading",
        content: "La conexión con la educación financiera",
      },
      {
        type: "paragraph",
        content:
          "Entender el private equity no es solo para los que quieran trabajar en finanzas. Es comprender que el capital puede desplegarse de muchas formas, que el riesgo y la iliquidez tienen precio, y que las empresas que usamos cada día (desde supermercados hasta clínicas dentales) a menudo tienen detrás fondos que las han comprado, optimizado y vendido. La economía real y las finanzas están mucho más conectadas de lo que parece.",
      },
    ],
  },

  // ─── Banca de Inversión ───────────────────────────────────────────────────
  {
    slug: "banca-de-inversion-el-motor-de-las-grandes-operaciones",
    icon: "Landmark",
    category: "Mercados",
    kiriCategory: "tronco",
    ageRange: "19-22" as AgeRange,
    title: "Banca de Inversión: El Motor Detrás de las Grandes Operaciones",
    excerpt:
      "Las fusiones multimillonarias, las salidas a bolsa de grandes empresas y las emisiones de deuda corporativa tienen un denominador común: un banco de inversión que las estructura. ¿Qué hacen exactamente y por qué importa entenderlos?",
    readTime: "8 min",
    coverUrl: "/images/academy/banca-de-inversion-el-motor-de-las-grandes-operaciones.png",
    thumbUrl: "/images/academy/thumbs/banca-de-inversion-el-motor-de-las-grandes-operaciones.webp",
    body: [
      {
        type: "paragraph",
        content:
          "Un banco de inversión no es el banco donde tienes tu cuenta corriente. No capta depósitos de particulares ni te da una hipoteca. Su negocio es otro: asesorar a empresas, gobiernos e instituciones en sus operaciones financieras más complejas y conectar a quienes necesitan capital con quienes tienen capital para invertir.",
      },
      {
        type: "heading",
        content: "Los tres pilares del negocio",
      },
      {
        type: "subheading",
        content: "1. Mercado de capitales (ECM y DCM)",
      },
      {
        type: "paragraph",
        content:
          "Cuando una empresa quiere salir a bolsa (IPO) o emitir acciones adicionales, el banco de inversión coordina todo el proceso: valoración, documentación legal, road show con inversores y fijación del precio. Esto se llama Equity Capital Markets (ECM). De forma similar, cuando una empresa emite bonos para financiarse, el banco estructura y coloca esa deuda entre inversores institucionales: es el Debt Capital Markets (DCM).",
      },
      {
        type: "subheading",
        content: "2. Fusiones y adquisiciones (M&A)",
      },
      {
        type: "paragraph",
        content:
          "El equipo de M&A asesora a empresas que quieren comprar a otra empresa, vender su negocio o fusionarse. El banco elabora valoraciones, identifica compradores o targets, negocia las condiciones y gestiona el proceso de due diligence. Es un trabajo intensivo, con presión enorme y comisiones que pueden ascender a decenas de millones en grandes operaciones.",
      },
      {
        type: "subheading",
        content: "3. Sales & Trading",
      },
      {
        type: "paragraph",
        content:
          "Los traders del banco compran y venden activos financieros —acciones, bonos, derivados, divisas— en los mercados. Una parte lo hacen en nombre de clientes institucionales (brokerage); otra, con capital propio del banco (prop trading, aunque muy reducido tras la crisis de 2008).",
      },
      {
        type: "heading",
        content: "La jerarquía interna",
      },
      {
        type: "list",
        items: [
          "Analyst (años 1-2): el escalón de entrada tras la universidad. Modelos financieros, presentaciones y muchas horas.",
          "Associate (años 3-5): normalmente llegan con un MBA. Más responsabilidad en la relación con clientes.",
          "VP y Director: lideran proyectos y empiezan a gestionar relaciones.",
          "Managing Director (MD): generan negocio. Su valor es su red de contactos y su capacidad de cerrar operaciones.",
        ],
      },
      {
        type: "heading",
        content: "¿Por qué los salarios son tan altos?",
      },
      {
        type: "paragraph",
        content:
          "Los bancos de inversión pagan salarios y bonus muy superiores a la media del sector financiero. La razón es la combinación de alta demanda de talento, trabajo extremadamente exigente (80-100 horas semanales en los primeros años), y el enorme valor económico de las operaciones que facilitan. Un MD que cierra una fusión de 2.000 millones genera para el banco una comisión de entre 15 y 40 millones de euros.",
      },
      {
        type: "callout",
        content:
          "Para reflexionar: Entender la banca de inversión no es solo útil si quieres trabajar en ella. Es comprender cómo se asigna el capital en la economía: qué empresas consiguen financiación para crecer, qué sectores se consolidan, y quién toma las decisiones que moldean la estructura productiva de un país.",
      },
    ],
  },

  // ─── Venture Capital ──────────────────────────────────────────────────────
  {
    slug: "venture-capital-apostar-por-el-futuro",
    icon: "Rocket",
    category: "Inversión",
    kiriCategory: "frutos",
    ageRange: "19-22" as AgeRange,
    title: "Venture Capital: Apostar por el Futuro de las Startups",
    excerpt:
      "Google, Airbnb, Spotify, Cabify. Todas tienen algo en común: en sus primeros años, alguien apostó por ellas cuando eran solo una idea. Eso es el venture capital: capital de riesgo para empresas que aún no existen del todo.",
    readTime: "9 min",
    coverUrl: "/images/academy/venture-capital-apostar-por-el-futuro.png",
    thumbUrl: "/images/academy/thumbs/venture-capital-apostar-por-el-futuro.webp",
    body: [
      {
        type: "paragraph",
        content:
          "El venture capital (VC) es una forma de inversión en empresas en fases muy tempranas —a veces cuando solo existe una idea y un equipo fundador— a cambio de un porcentaje del capital. El inversor asume que la mayoría de las apuestas fracasarán, pero que una sola gran historia de éxito puede compensar todas las pérdidas y generar una rentabilidad extraordinaria.",
      },
      {
        type: "heading",
        content: "Las etapas de inversión en una startup",
      },
      {
        type: "list",
        items: [
          "Pre-seed: primeros cheques, a menudo de business angels (inversores individuales). La empresa aún no tiene producto.",
          "Seed: hay un MVP (producto mínimo viable) y primeros usuarios. Fondos de entre 500.000€ y 2 millones.",
          "Serie A: el modelo de negocio funciona y hay que escalar. Tickets de 5 a 15 millones.",
          "Serie B, C y siguientes: expansión internacional, contratación masiva, dominio de mercado. Pueden superar los 100 millones.",
          "Exit: salida a bolsa (IPO) o venta a una gran corporación. El momento en que los inversores realizan su retorno.",
        ],
      },
      {
        type: "heading",
        content: "La lógica del power law",
      },
      {
        type: "paragraph",
        content:
          "En venture capital no se aplica una distribución normal de retornos. Se aplica la ley de potencia (power law): de 10 inversiones, 6 pueden fracasar, 3 devolver lo invertido y 1 generar un retorno de 50x o 100x. Ese unicornio —empresa valorada en más de 1.000 millones— paga toda la cartera. Por eso los VCs invierten en carteras amplias y buscan fundadores con ambición de construir categorías enteras, no solo negocios rentables.",
      },
      {
        type: "callout",
        content:
          "Dato: Sequoia Capital invirtió 60.000 dólares en Google en 1999. Esa posición valía más de 12.000 millones cuando Google salió a bolsa en 2004. Un retorno de 200.000x.",
      },
      {
        type: "heading",
        content: "¿Qué busca un inversor de VC?",
      },
      {
        type: "paragraph",
        content:
          "Los inversores de venture capital no evalúan principalmente el producto: evalúan el equipo. La pregunta clave es: ¿tiene este equipo la capacidad, la resiliencia y la visión para construir una empresa que lidere su mercado en 10 años? Después vienen el mercado potencial (tiene que ser muy grande), la ventaja competitiva sostenible y la tracción temprana.",
      },
      {
        type: "subheading",
        content: "El término sheet y la dilución",
      },
      {
        type: "paragraph",
        content:
          "Cuando un VC quiere invertir, emite un term sheet: un documento con las condiciones de la inversión. Una de las más importantes es la valoración pre-money, que determina qué porcentaje del capital se cede a cambio del dinero. Cada ronda de financiación diluye a los fundadores, por lo que la negociación de valoraciones y condiciones es crítica para mantener el control y el incentivo de seguir construyendo.",
      },
      {
        type: "heading",
        content: "El ecosistema en España",
      },
      {
        type: "paragraph",
        content:
          "España ha experimentado un crecimiento notable en su ecosistema de startups. Fondos como Lanzadera, Kibo Ventures, Seaya o K Fund han invertido en empresas que hoy son referentes europeos. Barcelona y Madrid compiten por posicionarse como hubs de innovación, y cada vez más talento que antes emigraba a Silicon Valley elige quedarse a construir aquí.",
      },
      {
        type: "heading",
        content: "La conexión con Kiri",
      },
      {
        type: "paragraph",
        content:
          "Kiri es, en sí misma, una startup financiada con capital riesgo. Comprender el venture capital no es una abstracción: es entender el modelo que permite que proyectos como Kiri existan. Y para los jóvenes que hoy ahorran con Kiri, entender este ecosistema puede ser la semilla de una carrera en tecnología, en finanzas o incluso como fundadores ellos mismos.",
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getArticlesByKiriCategory(kiriCategory: KiriCategory): Article[] {
  return ARTICLES.filter((a) => a.kiriCategory === kiriCategory)
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug)
}
