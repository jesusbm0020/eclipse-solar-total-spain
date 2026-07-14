import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const anio = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-background/80 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="font-display text-sm font-bold text-foreground">Eclipse España 2026</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Portal informativo dedicado al eclipse solar total del 12 de agosto de 2026 en España.
            Mapa interactivo, horarios y guías para disfrutar del evento con seguridad.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-primary">Navegación</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground">Mapa Interactivo</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog y Guías</Link></li>
            <li><Link to="/contacto" className="text-muted-foreground hover:text-foreground">Contacto</Link></li>
            <li><Link to="/privacidad" className="text-muted-foreground hover:text-foreground">Política de Privacidad</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-primary">Guías</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/blog/gafas-homologadas-eclipse-2026" className="text-muted-foreground hover:text-foreground">Gafas homologadas</Link></li>
            <li><Link to="/blog/mejores-lugares-ver-eclipse-espana" className="text-muted-foreground hover:text-foreground">Mejores lugares</Link></li>
            <li><Link to="/blog/como-fotografiar-eclipse-solar" className="text-muted-foreground hover:text-foreground">Cómo fotografiarlo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-primary">Aviso</h4>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Nunca mires al sol directamente sin gafas homologadas ISO 12312-2.
            Los datos del mapa son simulados con fines informativos.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {anio} Eclipse España 2026. Todos los derechos reservados.</p>
          <p>Hecho con pasión por la astronomía 🔭</p>
        </div>
      </div>
    </footer>
  );
}
