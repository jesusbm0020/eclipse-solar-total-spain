import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
      { title: "Eclipse Solar Total 2026 España | Mapa Interactivo" },
      {
        name: "description",
        content:
          "Mapa interactivo del eclipse solar total del 12 de agosto de 2026 en España. Consulta horarios, porcentaje de oscurecimiento y zonas de totalidad.",
      },
      { name: "author", content: "Eclipse España 2026" },
      { property: "og:title", content: "Eclipse Solar Total 2026 España | Mapa Interactivo" },
      {
        property: "og:description",
        content: "Mapa interactivo del eclipse solar total del 12 de agosto de 2026 en España.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Eclipse Solar Total 2026 España | Mapa Interactivo" },
      { name: "description", content: "\"Mapa interactivo para consultar los horarios y la visibilidad del eclipse solar total del 12 de agosto de 2026 en España" },
      { property: "og:description", content: "\"Mapa interactivo para consultar los horarios y la visibilidad del eclipse solar total del 12 de agosto de 2026 en España" },
      { name: "twitter:description", content: "\"Mapa interactivo para consultar los horarios y la visibilidad del eclipse solar total del 12 de agosto de 2026 en España" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5a98facf-ca16-4cd2-8b68-2240d49fb272" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5a98facf-ca16-4cd2-8b68-2240d49fb272" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        {/* Verificación de Google Search Console */}
        <meta name="google-site-verification" content="Urm2eyYDRlzrxcitwGv03Y427MJmw838q41hzETvpI4" />
        
        {/* SEO Básico */}
        <title>Eclipse Solar Total España 2026 | Mapa Interactivo y Horarios</title>
        <meta name="description" content="Explora el mapa interactivo del eclipse solar total del 12 de agosto de 2026 en España. Consulta los horarios exactos, el porcentaje de oscurecimiento y la cuenta atrás en vivo por ciudades." />
        <meta name="keywords" content="eclipse solar 2026, eclipse solar total españa, mapa eclipse 2026, horarios eclipse españa, ver eclipse galicia asturias leon cantabria" />
        
        {/* Open Graph (Para que quede brutal cuando lo compartas por WhatsApp, Twitter o LinkedIn) */}
        <meta property="og:title" content="Eclipse Solar Total España 2026 | Mapa Interactivo" />
        <meta property="og:description" content="Consulta los horarios exactos y el porcentaje de oscurecimiento en tu ciudad con nuestro mapa interactivo en vivo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mapaeclipse2026.es" />

        {/* Script de Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6998824963198534" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <div className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </div>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
