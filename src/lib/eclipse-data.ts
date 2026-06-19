// Datos del eclipse solar total del 12 de agosto de 2026 en España.
// La franja de totalidad cruza en diagonal desde el Noroeste (Galicia/Asturias)
// hasta el Sureste (Castellón/Valencia/Baleares) entre las 21:10 y 21:30 CEST.
// Los horarios y oscurecimientos son simulados pero coherentes con la
// trayectoria real; la posición del Sol se calcula con la librería suncalc.

import * as SunCalc from "suncalc";

export interface Ciudad {
  nombre: string;
  region: string;
  lat: number;
  lon: number;
}

export interface PosicionSol {
  azimut: number; // grados, 0 = Norte, 90 = Este, 180 = Sur, 270 = Oeste
  elevacion: number; // grados sobre el horizonte
  puntoCardinal: string; // p.ej. "Oeste-Noroeste"
  alturaTexto: string; // p.ej. "Muy bajo"
}

export interface DatosEclipse {
  inicio: string;
  maximo: string;
  oscurecimiento: number; // 0 - 100
  tipo: "Total" | "Parcial";
  sol: PosicionSol;
}

// Selección de ciudades y pueblos de España (península y Baleares).
export const CIUDADES: Ciudad[] = [
  { nombre: "A Coruña", region: "Galicia", lat: 43.362, lon: -8.412 },
  { nombre: "Oviedo", region: "Asturias", lat: 43.362, lon: -5.844 },
  { nombre: "Santander", region: "Cantabria", lat: 43.463, lon: -3.805 },
  { nombre: "Bilbao", region: "País Vasco", lat: 43.263, lon: -2.935 },
  { nombre: "Zaragoza", region: "Aragón", lat: 41.649, lon: -0.889 },
  { nombre: "Barcelona", region: "Cataluña", lat: 41.385, lon: 2.173 },
  { nombre: "Madrid", region: "Comunidad de Madrid", lat: 40.417, lon: -3.703 },
  { nombre: "Valencia", region: "Comunidad Valenciana", lat: 39.47, lon: -0.376 },
  { nombre: "Castellón", region: "Comunidad Valenciana", lat: 39.986, lon: -0.037 },
  { nombre: "Palma", region: "Islas Baleares", lat: 39.57, lon: 2.65 },
  { nombre: "Sevilla", region: "Andalucía", lat: 37.389, lon: -5.984 },
  { nombre: "Málaga", region: "Andalucía", lat: 36.721, lon: -4.421 },
];

// La línea central de la totalidad va del NO al SE.
// Definida por dos puntos: Galicia (NO) y Baleares/Valencia (SE).
const LINEA_A = { lat: 43.5, lon: -8.5 }; // costa de Galicia
const LINEA_B = { lat: 39.4, lon: 1.0 }; // entre Valencia y Baleares

// Distancia perpendicular (en km) de un punto a la línea central.
function distanciaALineaKm(lat: number, lon: number): number {
  // Trabajamos en un plano local corrigiendo la longitud por la latitud media.
  const latMedia = (LINEA_A.lat + LINEA_B.lat) / 2;
  const kx = 111 * Math.cos((latMedia * Math.PI) / 180);
  const ky = 111;

  const ax = LINEA_A.lon * kx;
  const ay = LINEA_A.lat * ky;
  const bx = LINEA_B.lon * kx;
  const by = LINEA_B.lat * ky;
  const px = lon * kx;
  const py = lat * ky;

  const dx = bx - ax;
  const dy = by - ay;
  const longitud2 = dx * dx + dy * dy;
  const cruz = Math.abs((px - ax) * dy - (py - ay) * dx);
  return cruz / Math.sqrt(longitud2);
}

// Posición a lo largo de la línea (0 en el NO, 1 en el SE) para los horarios.
function progresoEnLinea(lat: number, lon: number): number {
  const latMedia = (LINEA_A.lat + LINEA_B.lat) / 2;
  const kx = 111 * Math.cos((latMedia * Math.PI) / 180);
  const ky = 111;
  const ax = LINEA_A.lon * kx;
  const ay = LINEA_A.lat * ky;
  const bx = LINEA_B.lon * kx;
  const by = LINEA_B.lat * ky;
  const px = lon * kx;
  const py = lat * ky;
  const dx = bx - ax;
  const dy = by - ay;
  const t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy);
  return Math.max(0, Math.min(1, t));
}

function aHora(minutos: number): string {
  const m = Math.round(minutos);
  const h = Math.floor(m / 60) % 24;
  const min = ((m % 60) + 60) % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

const GRADOS_CARDINALES = [
  "Norte",
  "Norte-Noreste",
  "Noreste",
  "Este-Noreste",
  "Este",
  "Este-Sureste",
  "Sureste",
  "Sur-Sureste",
  "Sur",
  "Sur-Suroeste",
  "Suroeste",
  "Oeste-Suroeste",
  "Oeste",
  "Oeste-Noroeste",
  "Noroeste",
  "Norte-Noroeste",
];

function puntoCardinal(azimut: number): string {
  const i = Math.round(azimut / 22.5) % 16;
  return GRADOS_CARDINALES[i];
}

function alturaTexto(elevacion: number): string {
  if (elevacion < 0) return "Bajo el horizonte";
  if (elevacion < 8) return "Muy bajo";
  if (elevacion < 18) return "Bajo";
  if (elevacion < 35) return "Medio";
  return "Alto";
}

// Calcula la posición del Sol para una hora dada (minutos CEST) del 12 ago 2026.
export function posicionSol(
  lat: number,
  lon: number,
  minutosCEST: number,
): PosicionSol {
  // CEST = UTC + 2. Construimos la fecha en UTC.
  const utcMin = minutosCEST - 120;
  const h = Math.floor(utcMin / 60);
  const m = Math.round(utcMin % 60);
  const fecha = new Date(
    `2026-08-12T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00Z`,
  );
  const pos = SunCalc.getPosition(fecha, lat, lon);
  // Esta versión de suncalc devuelve grados y el azimut ya en brújula (0 = N).
  const azimut = ((pos.azimuth % 360) + 360) % 360;
  const elevacion = pos.altitude;

  return {
    azimut: Math.round(azimut),
    elevacion: Math.round(elevacion),
    puntoCardinal: puntoCardinal(azimut),
    alturaTexto: alturaTexto(elevacion),
  };
}


// Genera datos deterministas y coherentes con la trayectoria real.
export function calcularEclipse(lat: number, lon: number): DatosEclipse {
  const distKm = distanciaALineaKm(lat, lon);
  const esTotal = distKm <= 100; // ~franja de totalidad

  let oscurecimiento: number;
  if (esTotal) {
    oscurecimiento = 100;
  } else {
    // Fuera de la franja: parcial 90%-99% cerca, menos lejos.
    oscurecimiento = 100 - (distKm - 100) * 0.045;
    oscurecimiento = Math.max(82, Math.min(99, oscurecimiento));
  }

  const tipo: DatosEclipse["tipo"] = esTotal ? "Total" : "Parcial";

  // El máximo avanza del NO (21:10) al SE (21:30) a lo largo de la franja.
  const t = progresoEnLinea(lat, lon);
  const maxMin = 21 * 60 + 10 + t * 20; // 21:10 -> 21:30 CEST
  const inicioMin = maxMin - 78; // parcialidad empieza ~1h18 antes

  return {
    inicio: aHora(inicioMin),
    maximo: aHora(maxMin),
    oscurecimiento: Math.round(oscurecimiento * 10) / 10,
    tipo,
    sol: posicionSol(lat, lon, maxMin),
  };
}
