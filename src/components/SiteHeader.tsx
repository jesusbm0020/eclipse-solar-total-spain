import { Link } from "@tanstack/react-router";
import { Sun, Menu, X } from "lucide-react";
import { useState } from "react";

const enlaces = [
  { to: "/", label: "Mapa" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
  { to: "/privacidad", label: "Privacidad" },
] as const;

export function SiteHeader() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-[1100] w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setAbierto(false)}>
          <span
            className="grid h-8 w-8 place-items-center rounded-full"
            style={{ background: "var(--gradient-sun)" }}
          >
            <Sun className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
          </span>
          <span className="font-display text-sm font-extrabold tracking-tight sm:text-base">
            Eclipse España 2026
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {enlaces.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              activeOptions={{ exact: e.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {e.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {abierto && (
        <nav className="border-t border-border bg-background/95 backdrop-blur md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-2 py-2">
            {enlaces.map((e) => (
              <li key={e.to}>
                <Link
                  to={e.to}
                  activeOptions={{ exact: e.to === "/" }}
                  onClick={() => setAbierto(false)}
                  activeProps={{ className: "text-primary" }}
                  inactiveProps={{ className: "text-foreground" }}
                  className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary"
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
