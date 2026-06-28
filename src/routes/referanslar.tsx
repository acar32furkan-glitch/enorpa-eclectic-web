import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/referanslar")({
  head: () => ({
    meta: [
      { title: "Referanslar | Enorpa Enerji" },
      {
        name: "description",
        content: "Enorpa Enerji referansları. 26 ülkede 138+ proje, 347+ müşteri.",
      },
      { property: "og:title", content: "Referanslar | Enorpa Enerji" },
      {
        property: "og:description",
        content: "Enorpa Enerji referansları. 26 ülkede 138+ proje, 347+ müşteri.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/logo.png" },
      { property: "og:url", content: "https://enorpa.com/referanslar" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Referanslar | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji referansları. 26 ülkede 138+ proje." },
      { name: "twitter:image", content: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/referanslar" },
    ],
  }),
  component: ReferanslarPage,
});

function ReferanslarPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Referanslar" }]} />
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Referanslar
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Referanslarımız
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-border p-6 text-center">
            <div className="text-4xl font-display font-bold text-orange mb-2">26</div>
            <div className="text-sm text-muted-foreground">Ülke</div>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <div className="text-4xl font-display font-bold text-orange mb-2">138+</div>
            <div className="text-sm text-muted-foreground">Proje</div>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <div className="text-4xl font-display font-bold text-orange mb-2">347+</div>
            <div className="text-sm text-muted-foreground">Müşteri</div>
          </div>
        </div>

        <div className="mt-12 bg-white border border-border p-8">
          <h2 className="font-display text-navy text-2xl font-bold uppercase mb-6">
            Global Faaliyetlerimiz
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Enorpa Enerji, 26 ülkede 138+ proje ve 347+ müşteriye hizmet vermektedir.
            Endüstriyel buhar, sıcak su, sıcak hava ve kızgın su kazanları ile
            sera ısıtma sistemleri konusunda dünya genelinde güvenilir bir iş ortağı olarak
            faaliyetlerimizi sürdürmekteyiz.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
