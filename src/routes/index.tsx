import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, Sun, Glasses, MapPin, Loader2 } from "lucide-react";
import { EclipseMap } from "@/components/EclipseMap";
import { type Ciudad } from "@/lib/eclipse-data";
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
          "Mapa interactivo del eclipse solar total del 12 de agosto de 2026 en España. Consulta horarios, oscurecimiento y zonas de totalidad por ciudad.",
      },
    ],
  }),
  component: Index,
});

function AdBanner({ etiqueta }: { etiqueta: string }) {
  return (
    <div
      role="complementary"
      aria-label="Espacio publicitario"
      className="flex h-20 w-full items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 text-xs font-medium uppercase tracking-widest text-muted-foreground"
    >
      <span className="opacity-70">{etiqueta}</span>
    </div>
  );
}

function Index() {
  const [consulta, setConsulta] = useState("");
  const [destino, setDestino] = useState<Ciudad | null>(null);
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

  return (
    <main className="starfield min-h-screen">
      <div
        className="min-h-screen w-full"
        style={{ background: "var(--gradient-cosmic)", opacity: 0.96 }}
      >
        <div className="mx-auto flex max-w-xl flex-col gap-5 px-4 pb-12 pt-8">
          {/* Cabecera */}
          <header className="flex flex-col items-center text-center">
            <div
              className="mb-4 grid h-16 w-16 place-items-center rounded-full"
              style={{ background: "var(--gradient-sun)", boxShadow: "var(--shadow-glow)" }}
            >
              <Sun className="h-8 w-8 text-primary-foreground" strokeWidth={2.2} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              12 de agosto de 2026
            </p>
            <h1 className="font-display mt-2 text-3xl font-extrabold leading-tight">
              Eclipse Solar Total en España
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Explora el mapa o busca tu ciudad para ver los horarios y el
              porcentaje de oscurecimiento.
            </p>
          </header>

          {/* Banner publicitario superior */}
          <AdBanner etiqueta="Espacio para Google AdSense" />

          {/* Buscador */}
          <div className="relative">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-4 py-3 backdrop-blur">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                onFocus={() => sugerencias.length > 0 && setAbierto(true)}
                placeholder="Busca cualquier ciudad o pueblo de España..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
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

          {/* Mapa */}
          <EclipseMap destino={destino} />
          <p className="-mt-2 text-center text-xs text-muted-foreground">
            Toca cualquier punto del mapa para ver sus datos simulados.
          </p>

          {/* Banner publicitario inferior */}
          <AdBanner etiqueta="Espacio para Google AdSense" />

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
        </div>
      </div>
    </main>
  );
}
