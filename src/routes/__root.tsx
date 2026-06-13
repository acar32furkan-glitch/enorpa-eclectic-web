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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3">Enorpa Enerji</div>
        <h1 className="font-display text-8xl font-bold text-navy">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold uppercase text-navy">Sayfa Bulunamadı</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider px-6 py-3 transition-colors"
          >
            Anasayfaya Dön
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Enorpa Enerji — Endüstriyel Isıtmada Güvenilir Güç" },
      { name: "description", content: "Buhar kazanları, sıcak su kazanları ve sıcak hava sistemleriyle tesislerinize özel yüksek verimli endüstriyel ısıtma çözümleri." },
      { property: "og:title", content: "Enorpa Enerji — Endüstriyel Isıtmada Güvenilir Güç" },
      { property: "og:description", content: "Buhar kazanları, sıcak su kazanları ve sıcak hava sistemleriyle tesislerinize özel yüksek verimli endüstriyel ısıtma çözümleri." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Enorpa Enerji — Endüstriyel Isıtmada Güvenilir Güç" },
      { name: "twitter:description", content: "Buhar kazanları, sıcak su kazanları ve sıcak hava sistemleriyle tesislerinize özel yüksek verimli endüstriyel ısıtma çözümleri." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fad3ca1f-39bc-48fb-8b51-de98845632bd/id-preview-ac897e7b--f5f0040a-22ba-4a23-b7f3-4f183c983042.lovable.app-1781280810402.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fad3ca1f-39bc-48fb-8b51-de98845632bd/id-preview-ac897e7b--f5f0040a-22ba-4a23-b7f3-4f183c983042.lovable.app-1781280810402.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" },
      { rel: "icon", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='4' fill='%23e05c1a'/><text x='16' y='22' font-size='18' font-family='Arial' font-weight='bold' fill='white' text-anchor='middle'>E</text></svg>" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Enorpa Enerji",
          url: "https://enorpa-eclectic-web.vercel.app",
          logo: "https://enorpa-eclectic-web.vercel.app/favicon.ico",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sanayi Mah. 3231 Sk. No:12",
            addressLocality: "Merkez",
            addressRegion: "Isparta",
            addressCountry: "TR",
          },
          telephone: "+908504712100",
          sameAs: ["https://instagram.com/enorpaenerji"],
        }),
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
    <html lang="tr">
      <head>
        <HeadContent />
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/908504712100"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </a>
    </QueryClientProvider>
  );
}
