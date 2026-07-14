import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";

export const Route = createFileRoute("/blog/mejores-lugares-ver-eclipse-espana")({
  head: () => ({
    meta: [
      {
        title:
          "Los mejores lugares en España para ver el eclipse solar total de 2026 | Eclipse España 2026",
      },
      {
        name: "description",
        content:
          "Recorrido por los mejores miradores y enclaves de España para vivir la totalidad del eclipse solar del 12 de agosto de 2026.",
      },
      {
        property: "og:title",
        content: "Mejores lugares en España para ver el eclipse total de 2026",
      },
      {
        property: "og:description",
        content:
          "De Galicia a Baleares: los enclaves imprescindibles para disfrutar de la totalidad.",
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
          <MapPin className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          Observación
        </span>
      </div>

      <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
        Los mejores lugares y miradores en España para ver la totalidad del eclipse
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Lectura de 7 minutos · Actualizado en 2026
      </p>

      <article className="prose prose-invert mt-8 max-w-none space-y-5 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          El <strong className="text-foreground">12 de agosto de 2026</strong> la
          sombra de la Luna cruzará el norte de la Península Ibérica de noroeste a
          sureste, dibujando una franja de unos 290 km de anchura en la que el Sol
          quedará oculto al 100%. Elegir bien el lugar de observación marcará la
          diferencia entre vivir un fenómeno impresionante o quedarse a las puertas.
          El eclipse tendrá lugar con el Sol muy bajo en el horizonte, cerca del
          ocaso, así que necesitarás un punto elevado y con vistas despejadas hacia
          el <strong className="text-foreground">oeste-noroeste</strong>.
        </p>

        <h2 className="text-xl font-bold text-foreground">Galicia y Asturias: primera llamada</h2>
        <p>
          La franja de totalidad entra por Galicia poco después de las 20:30 h locales.
          La <strong className="text-foreground">costa de A Coruña y las Rías Baixas</strong>{" "}
          ofrecen miradores privilegiados como el Monte de San Pedro, el Faro de Fisterra
          o el Monte Facho. En Asturias, los <strong className="text-foreground">
          Picos de Europa</strong> y miradores como el de El Fitu regalan un horizonte
          amplio y despejado, siempre que las nubes bajas del Cantábrico den tregua.
        </p>

        <h2 className="text-xl font-bold text-foreground">Castilla y León: la gran diagonal</h2>
        <p>
          Provincias como <strong className="text-foreground">León, Palencia, Burgos y
          Valladolid</strong> quedarán en pleno eje central. Las llanuras castellanas y
          páramos elevados como el <strong className="text-foreground">Cerro de San
          Cristóbal (Burgos)</strong>, el <strong className="text-foreground">Alto del
          Portillo</strong> o los miradores del Cañón del Duratón permiten una vista de
          360° sobre el horizonte. Ciudades como Burgos y Palencia se están preparando
          con eventos y jornadas divulgativas.
        </p>

        <h2 className="text-xl font-bold text-foreground">
          La Rioja, Navarra y Aragón: el corazón de la totalidad
        </h2>
        <p>
          El eje central del eclipse pasa por localidades como{" "}
          <strong className="text-foreground">Logroño, Pamplona, Tudela, Zaragoza y
          Huesca</strong>. Los miradores del Moncayo, la Sierra de Alcubierre y el
          Pirineo aragonés ofrecen puntos altos con horizonte occidental limpio. En
          Aragón se espera una gran afluencia de aficionados y astrofotógrafos, así
          que conviene reservar alojamiento con muchos meses de antelación.
        </p>

        <h2 className="text-xl font-bold text-foreground">Cataluña y Comunidad Valenciana</h2>
        <p>
          El eclipse atraviesa después el interior de <strong className="text-foreground">
          Tarragona y Castellón</strong>, con la <strong className="text-foreground">
          Sierra de Espadán, Peñagolosa y el Delta del Ebro</strong> como enclaves
          destacados. La costa mediterránea entre Vinaròs y Peñíscola ofrecerá vistas
          sobre el mar, aunque hay que tener en cuenta que el Sol estará muy cerca del
          horizonte. Un promontorio elevado o un mirador de acantilado será
          fundamental.
        </p>

        <h2 className="text-xl font-bold text-foreground">Islas Baleares: broche final</h2>
        <p>
          <strong className="text-foreground">Mallorca e Ibiza</strong> serán el último
          territorio español bajo la sombra total antes de que el eclipse continúe sobre
          el Mediterráneo. Miradores como <strong className="text-foreground">Sa Foradada
          </strong>, el <strong className="text-foreground">Cap de Formentor</strong> o
          <strong className="text-foreground"> Es Vedrà (Ibiza)</strong> son escenarios
          idílicos, con horizonte marino hacia el oeste. Precisamente por eso, se prevé
          una gran presión turística: reserva con muchísima antelación.
        </p>

        <h2 className="text-xl font-bold text-foreground">Consejos generales para elegir tu punto</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Busca <strong className="text-foreground">horizonte despejado hacia el oeste-noroeste</strong>: el Sol estará a unos 10-15° de altura.</li>
          <li>Evita zonas con montañas altas cerca del punto donde se pondrá el Sol.</li>
          <li>Consulta con antelación la previsión meteorológica y ten un <strong className="text-foreground">plan B a menos de 100 km</strong>.</li>
          <li>Llega con varias horas de antelación: se esperan atascos y aparcamientos saturados.</li>
          <li>Lleva agua, algo de comer, ropa de abrigo (aunque sea agosto, cae rápido) y una linterna roja para después del eclipse.</li>
          <li>Consulta nuestro <a href="/" className="text-primary underline">mapa interactivo</a> para saber la hora y el porcentaje de oscurecimiento exacto de tu ubicación.</li>
        </ul>

        <p>
          Escojas el lugar que escojas, prepárate para vivir un momento inolvidable.
          Un eclipse solar total es una experiencia que trasciende la astronomía:
          cambia la luz, cambia la temperatura, se oye el silencio repentino de los
          pájaros. Y sí, muchos aseguran que se les escapa una lágrima.
        </p>
      </article>
    </main>
  );
}
