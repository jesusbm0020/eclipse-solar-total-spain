import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ArrowRight } from "lucide-react";

const articulos = [
  {
    slug: "gafas-homologadas-eclipse-2026",
    titulo: "Guía de Seguridad: Cómo usar gafas homologadas para ver el eclipse de 2026",
    resumen:
      "Todo lo que necesitas saber sobre las gafas ISO 12312-2: por qué son imprescindibles, cómo detectar falsificaciones y cómo usarlas correctamente.",
    categoria: "Seguridad",
  },
  {
    slug: "mejores-lugares-ver-eclipse-espana",
    titulo: "Los mejores lugares y miradores en España para ver la totalidad del eclipse",
    resumen:
      "Un recorrido por los mejores enclaves de Galicia, Asturias, Castilla y León, Aragón, Cataluña, la Comunidad Valenciana y Baleares para vivir la totalidad.",
    categoria: "Observación",
  },
  {
    slug: "como-fotografiar-eclipse-solar",
    titulo: "Cómo fotografiar un eclipse solar total con tu móvil o cámara",
    resumen:
      "Consejos prácticos, filtros, ajustes de exposición y trucos para conseguir fotos espectaculares del eclipse sin dañar tu equipo ni tu vista.",
    categoria: "Fotografía",
  },
] as const;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog y Guías del Eclipse Solar 2026 | Eclipse España 2026" },
      {
        name: "description",
        content:
          "Guías, consejos y artículos sobre el eclipse solar total del 12 de agosto de 2026 en España: seguridad, mejores lugares y fotografía.",
      },
      { property: "og:title", content: "Blog y Guías del Eclipse Solar 2026" },
      {
        property: "og:description",
        content:
          "Artículos prácticos para prepararte y disfrutar del eclipse solar total de 2026 en España.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-foreground">
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-4 grid h-14 w-14 place-items-center rounded-full"
          style={{ background: "var(--gradient-sun)" }}
        >
          <BookOpen className="h-6 w-6 text-primary-foreground" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Guías y artículos
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold sm:text-4xl">
          Blog del Eclipse Solar 2026
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Todo lo que necesitas saber para prepararte y disfrutar del eclipse solar
          total del 12 de agosto de 2026 en España: seguridad, mejores enclaves,
          fotografía y mucho más.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {articulos.map((a) => (
          <li key={a.slug}>
            <Link
              to={`/blog/${a.slug}` as "/blog"}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-colors hover:border-primary/60"
            >
              <span className="w-fit rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                {a.categoria}
              </span>
              <h2 className="font-display mt-3 text-lg font-bold leading-snug">
                {a.titulo}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.resumen}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Leer artículo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
