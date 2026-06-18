import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { calcularEclipse, type Ciudad } from "@/lib/eclipse-data";

interface EclipseMapProps {
  // Cuando cambia, el mapa vuela a esta ciudad y abre su popup.
  destino: Ciudad | null;
}

function popupHtml(titulo: string, lat: number, lon: number): string {
  const d = calcularEclipse(lat, lon);
  const esTotal = d.tipo === "Total";
  const colorTipo = esTotal ? "#ffd27a" : "#c4b5fd";
  return `
    <div style="font-family: 'Space Grotesk', sans-serif; padding: 14px 16px; min-width: 210px;">
      <div style="font-family:'Sora',sans-serif; font-weight:700; font-size:15px; margin-bottom:2px;">${titulo}</div>
      <span style="display:inline-block; font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:${colorTipo}; background:${esTotal ? "rgba(255,210,122,.12)" : "rgba(196,181,253,.12)"}; padding:3px 8px; border-radius:999px; margin-bottom:10px;">Eclipse ${d.tipo}</span>
      <div style="display:flex; flex-direction:column; gap:6px; font-size:13px;">
        <div style="display:flex; justify-content:space-between; gap:12px;">
          <span style="opacity:.7;">Inicio</span><strong>${d.inicio}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; gap:12px;">
          <span style="opacity:.7;">Máximo</span><strong>${d.maximo}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; gap:12px;">
          <span style="opacity:.7;">Oscurecimiento</span>
          <strong style="color:${colorTipo};">${d.oscurecimiento}%</strong>
        </div>
      </div>
      <div style="margin-top:10px; font-size:10px; opacity:.55;">Datos simulados · 12 ago 2026</div>
    </div>`;
}

export function EclipseMap({ destino }: EclipseMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    let cancelado = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelado || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [40.2, -3.7],
        zoom: 6,
        minZoom: 5,
        maxZoom: 12,
        zoomControl: true,
      });
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      map.on("click", (e: import("leaflet").LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        L.popup({ closeButton: true })
          .setLatLng([lat, lng])
          .setContent(popupHtml("Ubicación seleccionada", lat, lng))
          .openOn(map);
      });

      // Forzar recalculo de tamaño tras montar.
      setTimeout(() => map.invalidateSize(), 200);
    })();

    return () => {
      cancelado = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Volar a la ciudad buscada.
  useEffect(() => {
    if (!destino || !mapRef.current) return;
    (async () => {
      const L = await import("leaflet");
      const map = mapRef.current!;
      map.flyTo([destino.lat, destino.lon], 8, { duration: 1.1 });
      markerRef.current?.remove();
      const marker = L.marker([destino.lat, destino.lon]).addTo(map);
      marker
        .bindPopup(popupHtml(destino.nombre, destino.lat, destino.lon))
        .openPopup();
      markerRef.current = marker;
    })();
  }, [destino]);

  return (
    <div
      ref={containerRef}
      className="h-[58vh] min-h-[360px] w-full rounded-2xl border border-border"
      style={{ boxShadow: "var(--shadow-glow)" }}
    />
  );
}
