import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Sun, Glasses, MapPin, Loader2, Compass, X } from "lucide-react";
import { EclipseMap, type SeleccionMapa } from "@/components/EclipseMap";
import { Countdown } from "@/components/Countdown";
import { calcularEclipse, type Ciudad } from "@/lib/eclipse-data";
import { Button } from "@/components/ui/button";

interface SugerenciaNominatim {
  display_name: string;
  nombreCorto: string;
  detalle: string;
  lat: number;
  lon: number;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eclipse Solar Total 2026 España | Mapa Interactivo" },
      {
        name: "description",
        content:
          "Mapa interactivo del eclipse solar total del 12 de agosto de 2026 en España. Cuenta atrás en tiempo real, horarios, oscurecimiento y zonas de totalidad por ciudad.",
      },
    ],
  }),
  component: Index,
});

function AdBanner() {
  return (
    <div
      role="complementary"
      aria-label="Espacio publicitario"
      className="h-20 w-full rounded-2xl border border-dashed border-border/40 bg-transparent"
    />
  );
}

function AdBannerInferior() {
  const [cerrado, setCerrado] = useState(false);
  if (cerrado) return null;
  return (
    <div
      role="complementary"
      aria-label="Espacio publicitario inferior"
      className="fixed bottom-0 left-0 z-[900] flex h-[50px] w-full items-center justify-center bg-background/85 backdrop-blur sm:h-[60px] lg:h-[90px]"
    >
      <button
        type="button"
        onClick={() => setCerrado(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Cerrar anuncio"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function FilaDato({ etiqueta, valor, destacado }: { etiqueta: string; valor: string; destacado?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{etiqueta}</span>
      <strong className={destacado ? "text-primary" : "text-foreground"}>{valor}</strong>
    </div>
  );
}

function PanelDatos({ seleccion }: { seleccion: SeleccionMapa | null }) {
  const datos = useMemo(
    () => (seleccion ? calcularEclipse(seleccion.lat, seleccion.lon) : null),
    [seleccion],
  );

  if (!seleccion || !datos) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/30 p-5 text-center text-sm text-muted-foreground">
        <Compass className="mx-auto mb-2 h-6 w-6 text-primary" />
        Toca cualquier punto del mapa o busca tu ciudad para ver los datos del
        eclipse.
      </div>
    );
  }

  const esTotal = datos.tipo === "Total";
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="font-display min-w-0 truncate text-lg font-bold">
          {seleccion.titulo}
        </h2>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
            esTotal ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"
          }`}
        >
          {datos.tipo}
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        <FilaDato etiqueta="Inicio" valor={datos.inicio} />
        <FilaDato etiqueta="Máximo" valor={datos.maximo} />
        <FilaDato etiqueta="Oscurecimiento" valor={`${datos.oscurecimiento}%`} destacado />
        <FilaDato etiqueta="Orientación del Sol" valor={`${datos.sol.puntoCardinal} (${datos.sol.azimut}°)`} />
        <FilaDato etiqueta="Altura del Sol" valor={`${datos.sol.alturaTexto} (${datos.sol.elevacion}°)`} />
      </div>
    </div>
  );
}

function Index() {
  const [consulta, setConsulta] = useState("");
  const [destino, setDestino] = useState<Ciudad | null>(null);
  const [seleccion, setSeleccion] = useState<SeleccionMapa | null>(null);
  const [sugerencias, setSugerencias] = useState<SugerenciaNominatim[]>([]);
  const [cargando, setCargando] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const ignorarRef = useRef(false);

  // Buscar municipios reales con la API gratuita de Nominatim (OpenStreetMap).
  useEffect(() => {
    const q = consulta.trim();
    if (ignorarRef.current) {
      ignorarRef.current = false;
      return;
    }
    if (q.length < 3) {
      setSugerencias([]);
      setCargando(false);
      return;
    }

    const controlador = new AbortController();
    setCargando(true);
    const t = setTimeout(async () => {
      try {
        const url =
          "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=6&countrycodes=es&accept-language=es&q=" +
          encodeURIComponent(q);
        const res = await fetch(url, { signal: controlador.signal });
        const datos: Array<{
          display_name: string;
          name?: string;
          lat: string;
          lon: string;
          address?: Record<string, string>;
        }> = await res.json();

        const items: SugerenciaNominatim[] = datos.map((d) => {
          const a = d.address ?? {};
          const nombreCorto =
            d.name ||
            a.city ||
            a.town ||
            a.village ||
            a.municipality ||
            d.display_name.split(",")[0];
          const detalle = [a.province || a.county, a.state]
            .filter(Boolean)
            .join(", ");
          return {
            display_name: d.display_name,
            nombreCorto,
            detalle: detalle || "España",
            lat: parseFloat(d.lat),
            lon: parseFloat(d.lon),
          };
        });
        setSugerencias(items);
        setAbierto(true);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setSugerencias([]);
      } finally {
        setCargando(false);
      }
    }, 350);

    return () => {
      controlador.abort();
      clearTimeout(t);
    };
  }, [consulta]);

  const seleccionar = (s: SugerenciaNominatim) => {
    ignorarRef.current = true;
    setDestino({
      nombre: s.nombreCorto,
      region: s.detalle,
      lat: s.lat,
      lon: s.lon,
    });
    setConsulta(s.nombreCorto);
    setSugerencias([]);
    setAbierto(false);
  };

  // Contenido del panel de información (reutilizado en móvil y escritorio).
  const panel = (
    <>
      {/* Cabecera */}
      <header className="flex flex-col items-center text-center">
        <div
          className="mb-4 grid h-16 w-16 shrink-0 place-items-center rounded-full"
          style={{ background: "var(--gradient-sun)", boxShadow: "var(--shadow-glow)" }}
        >
          <Sun className="h-8 w-8 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          12 de agosto de 2026
        </p>
        <h1 className="font-display mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
          Eclipse Solar Total en España
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Explora el mapa o busca tu ciudad para ver los horarios y el
          porcentaje de oscurecimiento.
        </p>
      </header>

      {/* Cuenta atrás */}
      <Countdown />

      {/* Buscador */}
      <div className="relative">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-4 py-3.5 backdrop-blur">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            onFocus={() => sugerencias.length > 0 && setAbierto(true)}
            placeholder="Busca cualquier ciudad o pueblo..."
            className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
            aria-label="Buscar ciudad o pueblo"
          />
          {cargando && (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
          )}
        </div>

        {abierto && sugerencias.length > 0 && (
          <ul className="absolute z-[1000] mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
            {sugerencias.map((s) => (
              <li key={s.display_name}>
                <button
                  type="button"
                  onClick={() => seleccionar(s)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-secondary"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-popover-foreground">
                      {s.nombreCorto}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {s.detalle}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Datos del eclipse del punto seleccionado */}
      <PanelDatos seleccion={seleccion} />

      {/* Banner publicitario */}
      <AdBanner />

      {/* CTA */}
      <Button
        variant="eclipse"
        size="lg"
        className="font-display h-14 w-full rounded-2xl text-base font-bold"
        onClick={() =>
          window.open(
            "https://www.amazon.es/s?k=gafas+eclipse+solar+homologadas+iso&tag=eclipse202604-21",
            "_blank",
          )
        }
      >
        <Glasses className="mr-2 h-5 w-5" />
        Comprar Gafas de Eclipse Homologadas
      </Button>

      <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
        ⚠️ Nunca mires al sol directamente sin protección homologada (ISO
        12312-2). Datos del mapa simulados con fines informativos.
      </p>
    </>
  );

  return (
    <main className="starfield min-h-screen">
      <div
        className="min-h-screen w-full lg:h-screen lg:overflow-hidden"
        style={{ background: "var(--gradient-cosmic)", opacity: 0.96 }}
      >
        {/* === Escritorio/Tablet: split screen === */}
        <div className="hidden h-screen lg:grid lg:grid-cols-[minmax(360px,440px)_1fr]">
          {/* Panel de información (columna scrollable) */}
          <aside className="flex h-screen flex-col gap-5 overflow-y-auto border-r border-border px-6 pt-8 pb-28">
            {panel}
          </aside>
          {/* Mapa a pantalla completa */}
          <section className="h-screen p-4">
            <EclipseMap destino={destino} onSeleccion={setSeleccion} />
          </section>
        </div>

        {/* === Móvil: vertical === */}
        <div className="lg:hidden">
          <div className="mx-auto flex max-w-xl flex-col gap-5 px-4 pb-32 pt-8">
            {panel}
            <div className="h-[58vh] min-h-[360px]">
              <EclipseMap destino={destino} onSeleccion={setSeleccion} />
            </div>
            <p className="-mt-2 text-center text-xs text-muted-foreground">
              Toca cualquier punto del mapa para ver sus datos simulados.
            </p>
          </div>
        </div>
      </div>
      <AdBannerInferior />
    </main>
  );
}
