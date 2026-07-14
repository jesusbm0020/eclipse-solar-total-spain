import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/gafas-homologadas-eclipse-2026")({
  head: () => ({
    meta: [
      {
        title:
          "Guía de gafas homologadas ISO 12312-2 para el eclipse de 2026 | Eclipse España 2026",
      },
      {
        name: "description",
        content:
          "Cómo elegir y usar gafas homologadas ISO 12312-2 para ver el eclipse solar total del 12 de agosto de 2026 en España sin dañar tu vista.",
      },
      {
        property: "og:title",
        content: "Guía de gafas homologadas para el eclipse solar de 2026",
      },
      {
        property: "og:description",
        content:
          "Todo sobre las gafas ISO 12312-2: cómo detectarlas, cómo usarlas y por qué son imprescindibles.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Articulo,
});

function Articulo() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-foreground">
      <Link
        to="/blog"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al blog
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          Seguridad
        </span>
      </div>

      <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
        Guía de Seguridad: Cómo usar gafas homologadas para ver el eclipse de 2026
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Lectura de 6 minutos · Actualizado en 2026
      </p>

      <article className="prose prose-invert mt-8 max-w-none space-y-5 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          El <strong className="text-foreground">eclipse solar total del 12 de agosto
          de 2026</strong> será, sin duda, uno de los acontecimientos astronómicos más
          espectaculares que se podrán observar en España en las próximas décadas. Pero
          antes de mirar al cielo, hay una regla que no admite excepciones:{" "}
          <strong className="text-foreground">nunca observes el Sol directamente sin
          protección homologada</strong>. Ni siquiera durante las fases parciales, ni
          con gafas de sol convencionales, ni a través de radiografías, CDs o cristales
          ahumados. Todos esos métodos son un riesgo real para tu vista, capaces de
          provocar quemaduras irreversibles en la retina en cuestión de segundos.
        </p>

        <h2 className="text-xl font-bold text-foreground">
          Qué son las gafas homologadas ISO 12312-2
        </h2>
        <p>
          Las gafas de eclipse homologadas están fabricadas con un filtro solar
          especial que bloquea el <strong className="text-foreground">99,999% de la
          luz visible, el 100% de la radiación ultravioleta (UV) y prácticamente toda
          la radiación infrarroja (IR)</strong>. La certificación internacional que
          garantiza esta seguridad es la norma{" "}
          <strong className="text-foreground">ISO 12312-2:2015</strong>, y debe aparecer
          impresa de forma visible en la patilla o el cuerpo de las gafas.
        </p>
        <p>
          Si el modelo que estás considerando no menciona esta norma, no las utilices.
          En los últimos años han aparecido en el mercado numerosas imitaciones que
          copian el diseño de las gafas oficiales pero cuyos filtros no cumplen los
          requisitos de bloqueo de radiación. Comprarlas en tiendas y proveedores de
          confianza es la mejor forma de evitar sustos.
        </p>

        <h2 className="text-xl font-bold text-foreground">
          Cómo detectar gafas falsificadas
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Comprueba que aparece la referencia <strong className="text-foreground">ISO 12312-2</strong> en la patilla.</li>
          <li>Debe indicarse el fabricante, la dirección y el año de producción.</li>
          <li>El filtro debe ser <strong className="text-foreground">opaco casi por completo</strong>: al ponértelas dentro de casa apenas deberías ver una bombilla muy potente.</li>
          <li>Si ves objetos normales (ventanas, luces del salón, tu móvil) a través de ellas, son falsas o defectuosas.</li>
          <li>Revisa que la lámina no tenga arañazos, agujeros, arrugas ni pliegues antes de usarlas.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground">
          Cómo usarlas correctamente el día del eclipse
        </h2>
        <p>
          Colócate las gafas <strong className="text-foreground">antes de mirar hacia
          el Sol</strong>, nunca al revés. Una vez terminada la observación, apártate
          primero mirando al suelo y después quítatelas. Los niños deben usarlas
          siempre bajo supervisión de un adulto, ya que suelen bajarlas por curiosidad
          y unas décimas de segundo bastan para provocar daños oculares.
        </p>
        <p>
          Durante la <strong className="text-foreground">fase de totalidad</strong>{" "}
          (los pocos minutos en los que la Luna cubre por completo el disco solar),
          y <em>solo</em> si te encuentras dentro de la franja de totalidad, podrás
          quitarte las gafas para contemplar la corona solar a simple vista. En cuanto
          empiece a reaparecer el primer destello de sol —el famoso "anillo de
          diamante"—, vuelve a ponerte las gafas inmediatamente.
        </p>

        <h2 className="text-xl font-bold text-foreground">
          Alternativas seguras si no tienes gafas
        </h2>
        <p>
          Si el día del eclipse no dispones de gafas homologadas, existen métodos
          indirectos totalmente seguros: la <strong className="text-foreground">
          proyección estenopeica</strong> (un pequeño agujero en una cartulina que
          proyecta la imagen del Sol sobre otra), un colador de cocina, o incluso las
          sombras de las hojas de los árboles, que actúan como cientos de pequeñas
          cámaras oscuras. Nunca uses prismáticos, telescopios ni cámaras réflex
          apuntando al Sol sin un filtro solar específico: la concentración de luz
          puede provocar ceguera al instante.
        </p>

        <h2 className="text-xl font-bold text-foreground">Cuándo comprarlas</h2>
        <p>
          Cada vez que se acerca un eclipse importante las existencias se agotan
          semanas antes del evento. Te recomendamos comprarlas{" "}
          <strong className="text-foreground">con al menos dos o tres meses de
          antelación</strong>, comprobar que llegan en perfecto estado y hacer una
          prueba de opacidad como la que hemos descrito. Compra una unidad extra para
          familiares o amigos: es un regalo estupendo y una forma de asegurar que
          nadie se quede sin ver el eclipse.
        </p>

        <p className="rounded-xl border border-border bg-card/40 p-4 text-sm text-foreground">
          ⚠️ Recuerda: la vista humana no duele cuando se daña. Muchas lesiones
          retinianas por observación solar se descubren horas después, cuando ya no
          hay solución. La prevención es la única forma real de proteger tus ojos.
        </p>
      </article>

      <div className="mt-10">
        <Button
          variant="eclipse"
          size="lg"
          className="w-full rounded-2xl"
          onClick={() =>
            window.open(
              "https://www.amazon.es/s?k=gafas+eclipse+solar+homologadas+iso&tag=eclipse202604-21",
              "_blank",
            )
          }
        >
          Comprar Gafas de Eclipse Homologadas (ISO 12312-2)
        </Button>
      </div>
    </main>
  );
}
