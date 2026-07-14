import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad | Eclipse España 2026" },
      {
        name: "description",
        content:
          "Política de privacidad, cookies y uso de Google AdSense en Eclipse España 2026.",
      },
      { property: "og:title", content: "Política de Privacidad | Eclipse España 2026" },
      {
        property: "og:description",
        content:
          "Información sobre el tratamiento de datos, cookies y publicidad en nuestra web.",
      },
    ],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-foreground">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        Política de Privacidad
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Última actualización: 1 de enero de 2026
      </p>

      <section className="prose prose-invert mt-8 max-w-none space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          En <strong className="text-foreground">Eclipse España 2026</strong> (en adelante,
          "la Web") respetamos tu privacidad y nos comprometemos a proteger los datos
          personales que compartas con nosotros. Esta política explica qué información
          recopilamos, cómo la utilizamos y qué derechos tienes al respecto, de acuerdo
          con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección
          de Datos Personales y garantía de los derechos digitales (LOPDGDD).
        </p>

        <h2 className="text-lg font-bold text-foreground">1. Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento de los datos es el titular de esta Web. Para
          cualquier consulta relacionada con la privacidad, puedes contactar a través de
          la página de <a href="/contacto" className="text-primary underline">contacto</a>.
        </p>

        <h2 className="text-lg font-bold text-foreground">2. Datos que recopilamos</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Datos de navegación:</strong> dirección
            IP, tipo de navegador, sistema operativo, páginas visitadas y tiempo de
            permanencia. Se recogen mediante cookies y tecnologías similares.
          </li>
          <li>
            <strong className="text-foreground">Datos de contacto:</strong> nombre y
            correo electrónico que nos proporcionas voluntariamente al usar el
            formulario de contacto.
          </li>
        </ul>

        <h2 className="text-lg font-bold text-foreground">3. Cookies</h2>
        <p>
          Esta Web utiliza cookies propias y de terceros para mejorar la experiencia de
          navegación, analizar el uso del sitio y mostrar publicidad personalizada. Al
          continuar navegando, aceptas el uso de cookies conforme a esta política. Puedes
          configurar tu navegador para bloquearlas o eliminarlas en cualquier momento.
        </p>
        <p>Tipos de cookies utilizadas:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Técnicas:</strong> imprescindibles para
            el funcionamiento del sitio.
          </li>
          <li>
            <strong className="text-foreground">Analíticas:</strong> nos permiten medir
            el tráfico y mejorar los contenidos.
          </li>
          <li>
            <strong className="text-foreground">Publicitarias:</strong> utilizadas por
            terceros como Google AdSense para mostrar anuncios relevantes.
          </li>
        </ul>

        <h2 className="text-lg font-bold text-foreground">4. Google AdSense</h2>
        <p>
          Esta Web muestra anuncios publicitarios a través de{" "}
          <strong className="text-foreground">Google AdSense</strong>, un servicio de
          publicidad de Google LLC. Google, como proveedor tercero, utiliza cookies
          (incluida la cookie DoubleClick DART) para publicar anuncios basados en las
          visitas anteriores del usuario a este sitio y a otros de Internet.
        </p>
        <p>
          Puedes inhabilitar el uso de la cookie DART accediendo a la{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            política de privacidad y publicidad de Google
          </a>
          , o configurar las preferencias personalizadas de anuncios en{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            adssettings.google.com
          </a>
          .
        </p>

        <h2 className="text-lg font-bold text-foreground">5. Enlaces de afiliados</h2>
        <p>
          Algunos enlaces de esta Web (por ejemplo, hacia Amazon España) forman parte del
          programa de afiliados de Amazon. Si realizas una compra a través de estos
          enlaces, podemos recibir una pequeña comisión sin coste adicional para ti. Esto
          nos ayuda a mantener el proyecto activo y gratuito para todos los usuarios.
        </p>

        <h2 className="text-lg font-bold text-foreground">6. Finalidad del tratamiento</h2>
        <p>
          Utilizamos los datos recopilados para: (i) responder consultas enviadas desde
          el formulario de contacto, (ii) analizar el uso de la Web para mejorar su
          contenido, (iii) mostrar publicidad relevante a través de terceros autorizados.
        </p>

        <h2 className="text-lg font-bold text-foreground">7. Conservación de los datos</h2>
        <p>
          Los datos personales facilitados a través del formulario de contacto se
          conservarán durante el tiempo estrictamente necesario para atender la consulta
          y, posteriormente, se eliminarán salvo obligación legal de conservación.
        </p>

        <h2 className="text-lg font-bold text-foreground">8. Derechos del usuario</h2>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso, rectificación,
          supresión, oposición, limitación y portabilidad de tus datos, escribiéndonos a
          través de la página de contacto. También puedes presentar una reclamación ante
          la Agencia Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            www.aepd.es
          </a>
          ) si consideras que el tratamiento no se ajusta a la normativa vigente.
        </p>

        <h2 className="text-lg font-bold text-foreground">9. Cambios en la política</h2>
        <p>
          Esta política puede actualizarse para reflejar cambios legales o mejoras en la
          Web. Te recomendamos revisarla periódicamente. Cualquier cambio significativo
          se publicará en esta misma página con su fecha de actualización.
        </p>
      </section>
    </main>
  );
}
