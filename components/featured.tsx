import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Date de alta con nosotros",
    description:
      "Rellena tus datos como tutor (papá o mamá) y comienza la experiencia Kiri en esta misma página.",
  },
  {
    number: "02",
    title: "Abre su cuenta Kiri",
    description:
      "A través de nuestro banco colaborador MyInvestor, tu cuenta estará garantizada por el Fondo de Garantías de Depósitos español.",
  },
  {
    number: "03",
    title: "Comienza la experiencia",
    description:
      "El niño recibe un kit de bienvenida con semillas, un álbum de recuerdos y personajes Kiri que le enseñan educación financiera.",
  },
]

export default function Featured() {
  return (
    <section id="sobre" className="bg-background">
      {/* About section */}
      <div className="flex flex-col lg:flex-row lg:items-stretch min-h-screen">
        {/* Image side */}
        <div className="flex-1 h-[50vh] lg:h-auto relative">
          <Image
            src="/images/kiri-family.jpg"
            alt="Familia celebrando con una cuenta Kiri"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/20" />
        </div>

        {/* Content side */}
        <div className="flex-1 bg-muted flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">Sobre Kiri</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            Más que un producto financiero, una experiencia familiar
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg max-w-lg">
            Kiri es una cuenta de inversión para niños y adolescentes de 0 a 18 años que ayuda a las familias a
            construir un futuro financiero con propósito. Cada cuenta incluye un kit de bienvenida y seguimiento
            anual, fortaleciendo el lazo emocional con quienes aportan.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "🌱", label: "Invierte desde el nacimiento" },
              { icon: "🎁", label: "Regala en ocasiones especiales" },
              { icon: "📈", label: "Fondos garantizados" },
            ].map((feat) => (
              <div key={feat.label} className="bg-background rounded-xl p-4 border border-border flex flex-col gap-2">
                <span className="text-2xl" aria-hidden="true">{feat.icon}</span>
                <p className="text-sm font-semibold text-foreground">{feat.label}</p>
              </div>
            ))}
          </div>

          <a
            href="#como-funciona"
            className="w-fit bg-primary text-primary-foreground px-7 py-3 rounded-full text-sm font-semibold hover:bg-accent transition-colors duration-300"
          >
            Cómo funciona
          </a>
        </div>
      </div>

      {/* How it works */}
      <div id="como-funciona" className="px-8 md:px-12 lg:px-20 py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3 text-center">Pasos</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 text-center text-balance">
            Cómo funciona Kiri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-4">
                <span className="font-serif text-6xl font-bold text-secondary-foreground/20 leading-none">
                  {step.number}
                </span>
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="font-semibold text-xl text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
