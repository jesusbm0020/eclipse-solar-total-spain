// Datos simulados para el eclipse solar total del 12 de agosto de 2026 en España.
// NOTA: Los valores son simulados con fines de demostración y no deben usarse
// para observación real.

export interface Ciudad {
  nombre: string;
  region: string;
  lat: number;
  lon: number;
}

export interface DatosEclipse {
  inicio: string;
  maximo: string;
  oscurecimiento: number; // 0 - 100
  tipo: "Total" | "Parcial";
}

// Selección de ciudades y pueblos de España (península y Baleares).
export const CIUDADES: Ciudad[] = [
  { nombre: "A Coruña", region: "Galicia", lat: 43.362, lon: -8.412 },
  { nombre: "Oviedo", region: "Asturias", lat: 43.362, lon: -5.844 },
  { nombre: "Santander", region: "Cantabria", lat: 43.463, lon: -3.805 },
  { nombre: "Bilbao", region: "País Vasco", lat: 43.263, lon: -2.935 },
  { nombre: "San Sebastián", region: "País Vasco", lat: 43.318, lon: -1.981 },
  { nombre: "Pamplona", region: "Navarra", lat: 42.812, lon: -1.645 },
  { nombre: "León", region: "Castilla y León", lat: 42.598, lon: -5.567 },
  { nombre: "Burgos", region: "Castilla y León", lat: 42.341, lon: -3.704 },
  { nombre: "Logroño", region: "La Rioja", lat: 42.466, lon: -2.448 },
  { nombre: "Valladolid", region: "Castilla y León", lat: 41.652, lon: -4.724 },
  { nombre: "Zaragoza", region: "Aragón", lat: 41.649, lon: -0.889 },
  { nombre: "Salamanca", region: "Castilla y León", lat: 40.97, lon: -5.664 },
  { nombre: "Barcelona", region: "Cataluña", lat: 41.385, lon: 2.173 },
  { nombre: "Tarragona", region: "Cataluña", lat: 41.119, lon: 1.245 },
  { nombre: "Madrid", region: "Comunidad de Madrid", lat: 40.417, lon: -3.703 },
  { nombre: "Toledo", region: "Castilla-La Mancha", lat: 39.862, lon: -4.027 },
  { nombre: "Valencia", region: "Comunidad Valenciana", lat: 39.47, lon: -0.376 },
  { nombre: "Palma", region: "Islas Baleares", lat: 39.57, lon: 2.65 },
  { nombre: "Cáceres", region: "Extremadura", lat: 39.476, lon: -6.371 },
  { nombre: "Albacete", region: "Castilla-La Mancha", lat: 38.994, lon: -1.858 },
  { nombre: "Alicante", region: "Comunidad Valenciana", lat: 38.345, lon: -0.481 },
  { nombre: "Badajoz", region: "Extremadura", lat: 38.879, lon: -6.97 },
  { nombre: "Murcia", region: "Región de Murcia", lat: 37.992, lon: -1.13 },
  { nombre: "Córdoba", region: "Andalucía", lat: 37.889, lon: -4.779 },
  { nombre: "Jaén", region: "Andalucía", lat: 37.766, lon: -3.79 },
  { nombre: "Sevilla", region: "Andalucía", lat: 37.389, lon: -5.984 },
  { nombre: "Granada", region: "Andalucía", lat: 37.177, lon: -3.598 },
  { nombre: "Almería", region: "Andalucía", lat: 36.834, lon: -2.464 },
  { nombre: "Málaga", region: "Andalucía", lat: 36.721, lon: -4.421 },
  { nombre: "Cádiz", region: "Andalucía", lat: 36.527, lon: -6.288 },
];

// Latitud aproximada de la línea central de la totalidad para una longitud dada.
// La franja de totalidad cruza el norte de la península de NO a E.
function latLineaCentral(lon: number): number {
  return 42.05 - 0.33 * (lon + 8);
}

// Convierte minutos desde medianoche a "HH:MM".
function aHora(minutos: number): string {
  const m = Math.round(minutos);
  const h = Math.floor(m / 60) % 24;
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

// Genera datos simulados deterministas según las coordenadas.
export function calcularEclipse(lat: number, lon: number): DatosEclipse {
  const latLinea = latLineaCentral(lon);
  const distGrados = Math.abs(lat - latLinea);
  const distKm = distGrados * 111;

  // Oscurecimiento: máximo en la línea central, decrece con la distancia.
  let oscurecimiento = 100 - distKm * 0.16;
  oscurecimiento = Math.max(72, Math.min(100, oscurecimiento));

  const esTotal = distKm <= 55;
  const tipo: DatosEclipse["tipo"] = esTotal ? "Total" : "Parcial";

  // El eclipse avanza de oeste a este: ocurre más tarde cuanto más al este.
  const baseInicio = 1170 + (lon + 8) * 4.2; // ~19:30 en el oeste
  const maximo = baseInicio + 68 + (lon + 8) * 0.6;

  return {
    inicio: aHora(baseInicio),
    maximo: aHora(maximo),
    oscurecimiento: Math.round(oscurecimiento * 10) / 10,
    tipo,
  };
}
