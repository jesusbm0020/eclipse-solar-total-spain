import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Send, Telescope, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y Quiénes Somos | Eclipse España 2026" },
      {
        name: "description",
        content:
          "Somos entusiastas de la astronomía apasionados por divulgar el eclipse solar total del 12 de agosto de 2026 en España. Escríbenos.",
      },
      { property: "og:title", content: "Contacto y Quiénes Somos | Eclipse España 2026" },
      {
        property: "og:description",
        content:
          "Conoce al equipo detrás del portal del eclipse solar total de 2026 y ponte en contacto con nosotros.",
      },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-foreground">
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-4 grid h-14 w-14 place-items-center rounded-full"
          style={{ background: "var(--gradient-sun)" }}
        >
          <Telescope className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          Contacto y Quiénes Somos
        </h1>
      </div>

      <section className="mt-8 space-y-4 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
        <h2 className="font-display text-xl font-bold">Quiénes somos</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Somos un pequeño grupo de <strong className="text-foreground">entusiastas
          de la astronomía</strong> con una pasión compartida: divulgar los eventos
          celestes de forma clara, práctica y accesible para todo el mundo. Llevamos
          años observando eclipses, tránsitos planetarios y lluvias de meteoros, y
          creemos que el eclipse solar total del <strong className="text-foreground">
          12 de agosto de 2026</strong> es una oportunidad histórica para acercar la
          astronomía a miles de personas en España.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Este portal nace con un objetivo sencillo: que cualquier persona, esté donde
          esté de la península o las islas, pueda saber en un solo clic{" "}
          <strong className="text-foreground">a qué hora empezará el eclipse en su
          pueblo, cuánto durará y cómo verlo con seguridad</strong>. Toda la
          información se ofrece de forma gratuita gracias al apoyo de la publicidad y
          los enlaces de afiliados.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
        <div className="mb-5 flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-bold">Formulario de contacto</h2>
        </div>

        {enviado ? (
          <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">¡Gracias por escribirnos!</p>
              <p className="mt-1 text-muted-foreground">
                Hemos recibido tu mensaje y te responderemos lo antes posible.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={enviar} className="flex flex-col gap-4">
            <div>
              <label htmlFor="nombre" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label htmlFor="mensaje" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                required
                rows={5}
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                className="w-full resize-y rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="Cuéntanos en qué podemos ayudarte..."
              />
            </div>
            <Button type="submit" variant="eclipse" size="lg" className="rounded-xl">
              <Send className="mr-2 h-4 w-4" />
              Enviar mensaje
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Al enviar aceptas nuestra{" "}
              <a href="/privacidad" className="text-primary underline">
                Política de Privacidad
              </a>
              .
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
