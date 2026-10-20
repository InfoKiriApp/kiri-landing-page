import { COMPANY_LINE, LEGAL_CONTACT, type LegalDoc } from "./shared"

export const MINORS_DOC: LegalDoc = {
  href: "/privacidad-menores-y-familias",
  navLabel: "Privacidad de menores y familias",
  eyebrow: "Para familias",
  title: "Privacidad de menores y familias",
  intro:
    "Kiri existe para los niños y niñas, pero son siempre los adultos de su familia quienes deciden. Así protegemos sus datos.",
  description:
    "Cómo trata Kiri los datos de los menores y de sus familias: quién puede facilitarlos, qué datos usamos, cuánto tiempo los guardamos y cómo pueden ejercer sus derechos padres, madres y tutores.",
  summary: [
    { term: "Quién decide", description: "Siempre el padre, la madre o el tutor legal del menor." },
    { term: "Qué datos del menor", description: "Solo los imprescindibles: nombre, apellidos y fecha de nacimiento." },
    { term: "Lo que nunca hacemos", description: "Mostrar publicidad a menores, perfilarlos ni vender sus datos." },
    { term: "Control total", description: "La familia puede pedir que borremos los datos del menor en cualquier momento." },
  ],
  contactSubject: "Privacidad - menores y familias",
  sections: [
    {
      id: "principios",
      title: "Nuestros compromisos",
      list: [
        { label: "Mínimos datos:", text: "pedimos solo lo necesario para cada servicio." },
        { label: "Los adultos deciden:", text: "los menores no se registran ni nos facilitan datos por su cuenta." },
        { label: "Sin publicidad ni perfiles:", text: "no usamos los datos de menores con fines comerciales ni para mostrarles anuncios." },
        { label: "Transparencia:", text: "avisamos a la familia cuando un tercero, por ejemplo un abuelo, nos facilita datos del menor." },
      ],
    },
    {
      id: "responsable",
      title: "Quién es responsable",
      paragraphs: [
        `Los datos que recoge Kiri en su web los trata ${COMPANY_LINE}.`,
        "La cuenta de ahorro e inversión del menor la abre y gestiona Indexa Capital A.V., S.A., que trata los datos necesarios para ello (por ejemplo, el DNI o NIF del menor y el libro de familia) como responsable independiente y bajo la normativa financiera aplicable. Kiri no accede a esa documentación.",
      ],
    },
    {
      id: "datos",
      title: "Qué datos del menor tratamos",
      list: [
        { label: "Identificación:", text: "nombre y apellidos, para personalizar el Welcome Pack." },
        { label: "Fecha de nacimiento:", text: "para adaptar la experiencia a su edad y comprobar que es menor de 18 años." },
        { label: "Foto (opcional):", text: "solo si quien regala decide incluirla para personalizar el regalo." },
        { label: "Mensaje personal (opcional):", text: "el texto que un familiar escribe para el futuro del menor." },
      ],
      note: "Nunca pedimos datos especialmente sensibles de los menores, como su salud o su colegio.",
    },
    {
      id: "terceros",
      title: "Cuando un familiar regala Kiri",
      paragraphs: [
        "En Regala Kiri, una persona distinta a los padres (por ejemplo, un abuelo o una tía) puede facilitarnos los datos del menor y de su padre, madre o tutor. Quien regala nos garantiza que la familia está de acuerdo y que tiene permiso para compartir la foto del menor, si la incluye.",
        "Cuando contactamos con el padre, madre o tutor para enviarle el código de alta, le informamos de quién ha hecho el regalo y de esta política. Si no desea el regalo o prefiere que borremos los datos, basta con que nos lo diga y lo haremos sin coste.",
      ],
      links: [{ href: "/condiciones-regala-kiri", label: "Condiciones de Regala Kiri" }],
    },
    {
      id: "base-legal",
      title: "Base legal y consentimiento",
      paragraphs: [
        "En España, los menores de 14 años necesitan el consentimiento de quien ejerce su patria potestad o tutela para que se traten sus datos (artículo 7 de la Ley Orgánica 3/2018). Por eso los datos de los menores siempre nos llegan a través de un adulto y es la familia quien decide si continúa.",
        "A partir de los 14 años el menor puede ejercer por sí mismo sus derechos de protección de datos, y lo tendremos en cuenta si se pone en contacto con nosotros.",
      ],
    },
    {
      id: "conservacion",
      title: "Cuánto tiempo los guardamos",
      paragraphs: [
        "La foto y el mensaje personal se borran en cuanto enviamos el Welcome Pack. El resto de datos del menor se conservan mientras sean necesarios para entregar el regalo y, después, solo durante los plazos que exige la ley. Si la familia no activa la cuenta, los eliminamos.",
      ],
    },
    {
      id: "derechos",
      title: "Cómo ejercer los derechos del menor",
      paragraphs: [
        `El padre, la madre o el tutor legal puede pedir en cualquier momento acceder, corregir u oponerse al uso de los datos del menor, o que los borremos, escribiendo a ${LEGAL_CONTACT}. Para proteger al menor, podemos pedir que acreditéis vuestra relación con él.`,
        "Si creéis que no hemos tratado bien sus datos, podéis presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).",
      ],
    },
    {
      id: "educacion",
      title: "Contenidos educativos",
      paragraphs: [
        "Los contenidos de educación financiera de Kiri, como Kiri Academy, se pueden consultar sin registrarse ni facilitar datos personales. Te animamos a que los descubráis en familia.",
      ],
    },
  ],
}
