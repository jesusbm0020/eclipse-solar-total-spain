import { useEffect, useState } from "react";

// Inicio del eclipse (parcialidad) la tarde del 12 de agosto de 2026.
// Sobre las 19:30 CEST (UTC+2) comienza la fase parcial en la península.
const OBJETIVO = new Date("2026-08-12T19:30:00+02:00").getTime();

interface Restante {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  terminado: boolean;
}

function calcularRestante(): Restante {
  const diff = OBJETIVO - Date.now();
  if (diff <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: true };
  }
  const segTotal = Math.floor(diff / 1000);
  return {
    dias: Math.floor(segTotal / 86400),
    horas: Math.floor((segTotal % 86400) / 3600),
    minutos: Math.floor((segTotal % 3600) / 60),
    segundos: segTotal % 60,
    terminado: false,
  };
}

function Casilla({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-xl border border-border bg-card/60 px-1 py-2 backdrop-blur">
      <span className="font-display text-2xl font-extrabold tabular-nums text-primary sm:text-3xl">
        {String(valor).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {etiqueta}
      </span>
    </div>
  );
}

export function Countdown() {
  const [r, setR] = useState<Restante>(calcularRestante);

  useEffect(() => {
    const id = setInterval(() => setR(calcularRestante()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-4 backdrop-blur">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {r.terminado ? "¡El eclipse ha comenzado!" : "Cuenta atrás para el eclipse"}
      </p>
      <div className="flex items-stretch gap-2">
        <Casilla valor={r.dias} etiqueta="Días" />
        <Casilla valor={r.horas} etiqueta="Horas" />
        <Casilla valor={r.minutos} etiqueta="Min" />
        <Casilla valor={r.segundos} etiqueta="Seg" />
      </div>
    </div>
  );
}
