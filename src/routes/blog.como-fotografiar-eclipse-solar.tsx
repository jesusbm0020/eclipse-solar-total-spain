import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Camera } from "lucide-react";

export const Route = createFileRoute("/blog/como-fotografiar-eclipse-solar")({
  head: () => ({
    meta: [
      {
        title:
          "Cómo fotografiar el eclipse solar total de 2026 con móvil o cámara | Eclipse España 2026",
      },
      {
        name: "description",
        content:
          "Guía práctica para fotografiar el eclipse solar total de 2026: filtros, ajustes, trípodes y trucos para móvil y cámaras réflex.",
      },
      {
        property: "og:title",
        content: "Cómo fotografiar un eclipse solar total con tu móvil o cámara",
      },
      {
        property: "og:description",
        content:
          "Filtros solares, ajustes de exposición y consejos prácticos para no dañar tu equipo ni tu vista.",
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
          <Camera className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          Fotografía
        </span>
      </div>

      <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
        Cómo fotografiar un eclipse solar total con tu móvil o cámara
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Lectura de 6 minutos · Actualizado en 2026
      </p>

      <article className="prose prose-invert mt-8 max-w-none space-y-5 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          Fotografiar un eclipse solar total es una tentación irresistible: el
          espectáculo es tan sobrecogedor que da rabia no llevárselo a casa en forma
          de imagen. Pero conviene tener claro un principio antes de empezar:
          <strong className="text-foreground"> disfruta primero, dispara después</strong>.
          Los minutos de totalidad pasan volando y es mucho más gratificante grabarlos
          en la memoria que quedar la mitad del tiempo peleando con los ajustes.
          Dicho esto, con una buena planificación es perfectamente posible hacer
          fotos memorables tanto con el móvil como con una cámara réflex o sin espejo.
        </p>

        <h2 className="text-xl font-bold text-foreground">Regla número uno: filtros solares</h2>
        <p>
          Durante todas las fases parciales,{" "}
          <strong className="text-foreground">tu cámara necesita un filtro solar
          específico</strong>, igual que tus ojos necesitan gafas ISO 12312-2.
          Apuntar al Sol sin filtro puede quemar el sensor en segundos y, si miras a
          través del visor óptico, dañar tu vista. Los filtros solares se colocan
          delante del objetivo (no detrás) y están hechos de lámina Baader AstroSolar
          o cristal ND 5.0 específico. No sirven los filtros ND fotográficos
          convencionales.
        </p>
        <p>
          Solo puedes retirar el filtro <strong className="text-foreground">durante
          la fase de totalidad</strong>, y siempre que te encuentres dentro de la
          franja donde el Sol quede oculto al 100%. En cuanto reaparezca el primer
          destello del disco solar, vuelve a colocar el filtro inmediatamente.
        </p>

        <h2 className="text-xl font-bold text-foreground">Fotografiar con el móvil</h2>
        <p>
          Los móviles modernos son perfectamente capaces de captar el ambiente del
          eclipse, aunque no son la mejor herramienta para retratar el disco solar
          en detalle. Estos son nuestros consejos:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Compra o consigue un <strong className="text-foreground">filtro solar
            adhesivo para móvil</strong>. También sirve sujetar unas gafas de
            eclipse homologadas delante de la cámara durante las fases parciales.
          </li>
          <li>
            Bloquea el enfoque y la exposición manteniendo pulsada la pantalla.
            Reduce la exposición al mínimo para evitar sobreexponer el Sol.
          </li>
          <li>
            Usa un pequeño <strong className="text-foreground">trípode con mando o
            temporizador</strong>: cualquier vibración se nota.
          </li>
          <li>
            Durante la totalidad, retira el filtro y prueba con la cámara ultra
            gran angular: capta el horizonte oscurecido, las siluetas del
            público y las estrellas visibles. Suele quedar espectacular.
          </li>
          <li>
            Activa el <strong className="text-foreground">modo Pro o RAW</strong> si
            tu móvil lo permite: te dará mucho más margen para editar la foto.
          </li>
          <li>
            No uses el zoom digital para el disco solar; el resultado será una
            mancha borrosa.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-foreground">Fotografiar con cámara réflex o sin espejo</h2>
        <p>
          Para captar el disco solar con detalle necesitarás una{" "}
          <strong className="text-foreground">focal de al menos 300 mm</strong> (mejor
          entre 400 y 800 mm) y, evidentemente, un filtro solar delante. Puntos clave:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong className="text-foreground">Trípode robusto</strong> y disparador remoto o temporizador de 2 segundos.</li>
          <li>Enfoque manual sobre el borde del Sol; el autofoco tiende a fallar con el filtro puesto.</li>
          <li>ISO 100-200, apertura f/8-f/11 y velocidad entre 1/125 s y 1/1000 s como punto de partida. Ajusta según histograma.</li>
          <li>Durante la totalidad, retira el filtro y haz una <strong className="text-foreground">horquilla de exposiciones</strong> entre 1/2000 s y 1 s para captar corona, cromosfera y protuberancias.</li>
          <li>Vuelve a poner el filtro en cuanto termine la totalidad. No lo olvides: el sensor puede dañarse en segundos.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground">Composición: piensa más allá del disco</h2>
        <p>
          Las fotos más impactantes de un eclipse no siempre son primeros planos del
          Sol. El <strong className="text-foreground">paisaje oscurecido</strong>, la
          gente mirando al cielo, la línea del horizonte con la luz crepuscular, las
          sombras extrañas... todo forma parte del fenómeno. Prepara con antelación
          dos o tres composiciones (una teleobjetivo, una gran angular, una del
          público) y practica el día anterior a la misma hora para saber exactamente
          dónde estará el Sol.
        </p>

        <h2 className="text-xl font-bold text-foreground">Checklist final</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Filtro solar verificado y sin arañazos.</li>
          <li>Baterías cargadas y tarjetas de memoria vacías.</li>
          <li>Trípode nivelado y encuadre ensayado.</li>
          <li>Reloj sincronizado y horarios del eclipse en tu ubicación (consúltalos en nuestro <a href="/" className="text-primary underline">mapa interactivo</a>).</li>
          <li>Un plan B por si aparecen nubes.</li>
          <li>Y sobre todo: unos minutos <em>sin cámara</em> para mirar al cielo con tus propios ojos.</li>
        </ul>
      </article>
    </main>
  );
}
