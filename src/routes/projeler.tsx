import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Factory, Globe } from "lucide-react";

const projects = [
  {
    title: "Özbekistan/Taşkent — Sera Isıtma Tesisatı",
    description: "Taşkent'te sera ısıtma tesisatı kurulumu.",
    location: "Özbekistan, Taşkent",
    year: "2020",
  },
  {
    title: "Özbekistan/Harezm — Sera Isıtma Tesisatı",
    description: "Harezm'de sera ısıtma tesisatı kurulumu.",
    location: "Özbekistan, Harezm",
    year: "2020",
  },
  {
    title: "Türkiye/Manisa — Buhar Kazanı Kurulumu",
    description: "Manisa'da buhar kazanı kurulumu.",
    location: "Türkiye, Manisa",
    year: "2019",
  },
  {
    title: "Türkiye/İzmir — Sera Isıtma Tesisatı",
    description: "İzmir'de sera ısıtma tesisatı kurulumu.",
    location: "Türkiye, İzmir",
    year: "2021",
  },
  {
    title: "Türkiye/Isparta — Orman Ürünlerinin Kurutulması",
    description: "Isparta'da orman ürünleri kurutma sistemi.",
    location: "Türkiye, Isparta",
    year: "2022",
  },
];

export const Route = createFileRoute("/projeler")({
  head: () => ({
    meta: [
      { title: "Projeler | Enorpa Enerji" },
      {
        name: "description",
        content: "Enorpa Enerji projeleri. Özbekistan, Türkiye ve dünya genelinde sera ısıtma, buhar kazanı ve kurutma projeleri.",
      },
      { property: "og:title", content: "Projeler | Enorpa Enerji" },
      {
        property: "og:description",
        content: "Enorpa Enerji projeleri. Özbekistan, Türkiye ve dünya genelinde sera ısıtma, buhar kazanı ve kurutma projeleri.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/logo.png" },
      { property: "og:url", content: "https://enorpa.com/projeler" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Projeler | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji projeleri. 26 ülkede 138+ proje." },
      { name: "twitter:image", content: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/projeler" },
    ],
  }),
  component: ProjelerPage,
});

function ProjelerPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Projeler" }]} />
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Projeler
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Projelerimiz
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="bg-white border border-border p-6 hover:border-orange transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-navy font-bold uppercase">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {project.location}
                </span>
                <span>{project.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
      <SiteFooter />
    </div>
  );
}
