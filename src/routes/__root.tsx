import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const BRAND_LOGO_URL = "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/gallery/taskent.webp";
const FAVICON_URL = "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/favicon-192.png";

const getSessionId = () => {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem("enorpa_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("enorpa_session_id", sid);
  }
  return sid;
};

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
          Sayfa Yüklenemedi
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bir şeyler ters gitti. Yenileyebilir veya anasayfaya dönebilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Yenile
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Anasayfaya Dön
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
        { property: "og:image", content: BRAND_LOGO_URL },
        { name: "twitter:image", content: BRAND_LOGO_URL },
        { property: "og:url", content: "https://enorpa.com/" },
        { property: "og:locale", content: "tr_TR" },
        { property: "og:site_name", content: "Enorpa Enerji" },
{
          name: "Content-Security-Policy",
          content: "default-src 'self'; img-src 'self' https://hmhkrrbvkafwcbyyvezl.supabase.co data: https:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://hmhkrrbvkafwcbyyvezl.supabase.co https://connect.facebook.net https://www.facebook.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self' https://hmhkrrbvkafwcbyyvezl.supabase.co https://www.google-analytics.com https://connect.facebook.net https://www.facebook.com; frame-src 'none'; object-src 'none';",
        },
     ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://hmhkrrbvkafwcbyyvezl.supabase.co", crossOrigin: "anonymous" },
      { rel: "preload", href: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/gallery/taskent.webp", as: "image", fetchPriority: "high" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap", media: "print", onLoad: (e: any) => { e.currentTarget.media = "all"; } },
      { rel: "icon", href: FAVICON_URL },
    ],
scripts: [
        {
          type: "application/ld+json",
           children: JSON.stringify({
             "@context": "https://schema.org",
             "@type": "Organization",
             name: "Enorpa Enerji",
             url: "https://enorpa.com",
             logo: "https://enorpa.com/favicon.ico",
             telephone: "+908504712100",
             sameAs: ["https://instagram.com/enorpaenerji"],
            location: [
              { "@type": "Place", "name": "Merkez Ofis", "address": { "@type": "PostalAddress", "streetAddress": "Sanayi Mah. 3231 Sk. No:12", "addressLocality": "Isparta", "addressCountry": "TR" }},
              { "@type": "Place", "name": "Fabrika 2 Isparta OSB", "address": { "@type": "PostalAddress", "streetAddress": "Vatan OSB Mah. 304. Cad. No:12", "addressLocality": "Isparta", "addressCountry": "TR" }},
              { "@type": "Place", "name": "Fabrika 3 Karaman OSB", "address": { "@type": "PostalAddress", "streetAddress": "OSB Mah. 17. Cad. No:49", "addressLocality": "Karaman", "addressCountry": "TR" }}
            ]
          }),
        },
       {
         type: "text/javascript",
         children: `!function(f,b,e,v,n,t,s){
if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'PIXEL_ID_GIRILECEK');
fbq('track', 'PageView');`,
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
  const location = useLocation();
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const router = useRouter();
  const showPublicWidgets = !location.pathname.startsWith("/admin");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("cookie_consent") : null;
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
      if (stored === "accepted") injectGA();
    }
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    const handleRouteChange = () => {
      try {
        const path = window.location.pathname;
        const referrer = document.referrer || "";
        const session_id = getSessionId();
        supabase.from("page_views").insert({ path, referrer, session_id }).then(({ error }) => {
          if (error) console.error("page_views insert error:", error);
        });
      } catch {}
    };
    (router as any).subscribe?.((ev: any) => {
      if (ev?.location?.pathname !== undefined) handleRouteChange();
    });
    handleRouteChange();
  }, [consent, router]);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setConsent("accepted");
    injectGA();
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setConsent("rejected");
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <main><Outlet /></main>

      {/* Cookie Consent Banner */}
      {showPublicWidgets && consent === null && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-navy-dark text-white p-4 md:py-3 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm shadow-2xl">
          <p className="text-white/80 text-xs md:text-sm leading-relaxed">
            Bu site, deneyiminizi geliştirmek ve site trafiğini analiz etmek için çerezler kullanır.
            Detaylar için <a href="/cerez-politikasi" className="text-orange underline hover:no-underline">Çerez Politikamızı</a> inceleyebilirsiniz.
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={reject}
              className="px-4 py-2 border border-white/30 text-white/80 hover:bg-white/10 font-display uppercase tracking-wider text-xs transition-colors"
            >
              Reddet
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 bg-orange hover:bg-orange-dark text-white font-display uppercase tracking-wider text-xs transition-colors"
            >
              Kabul Et
            </button>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      {showPublicWidgets && (
        <a
          href="https://wa.me/908504712100"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </a>
      )}
    </QueryClientProvider>
  );
}

function injectGA() {
  if (typeof window === "undefined" || (window as any).__gaInjected) return;
  (window as any).__gaInjected = true;

  const s1 = document.createElement("script");
  s1.async = true;
  s1.src = "https://www.googletagmanager.com/gtag/js?id=G-DXP4FYVTDG";
  document.head.appendChild(s1);

  const s2 = document.createElement("script");
  s2.textContent = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-DXP4FYVTDG');`;
  document.head.appendChild(s2);
}
