import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Globe, Calendar } from "lucide-react";

const projects = [
  {
    title: "Özbekistan/Taşkent",
    subtitle: "Sera Isıtma Tesisatı Kurulumu",
    description: "Taşkent'te sera ısıtma tesisatı kurulumu gerçekleştirdik. Enorpa HAS Serisi kazanlar ile donatılan tesis, yüksek verimlilik sağlamaktadır.",
    location: "Özbekistan, Taşkent",
    year: "2020",
    icon: Globe,
  },
  {
    title: "Özbekistan/Harezm",
    subtitle: "Sera Isıtma Tesisatı Kurulumu",
    description: "Harezm'de sera ısıtma tesisatı kurulumu. Sıcak iklim koşullarına uygun özel tasarım.",
    location: "Özbekistan, Harezm",
    year: "2020",
    icon: Globe,
  },
  {
    title: "Türkiye/Manisa",
    subtitle: "Buhar Kazanı Kurulumu",
    description: "Manisa'da buhar kazanı kurulumu. Sanayi tesisine özel buhar kazanı devreye alındı.",
    location: "Türkiye, Manisa",
    year: "2019",
    icon: MapPin,
  },
  {
    title: "Türkiye/İzmir",
    subtitle: "Sera Isıtma Tesisatı Kurulumu",
    description: "İzmir'de sera ısıtma tesisatı kurulumu. Seracılık sektörüne özel çözümler.",
    location: "Türkiye, İzmir",
    year: "2021",
    icon: MapPin,
  },
  {
    title: "Türkiye/Isparta",
    subtitle: "Orman Ürünlerinin Kurutulması",
    description: "Isparta'da orman ürünleri kurutma sistemi kurulumu. Enerji verimliliği odaklı tasarım.",
    location: "Türkiye, Isparta",
    year: "2022",
    icon: MapPin,
  },
];

export const Route = createFileRoute("/projeler")({
  head: () => ({
    meta: [
      { title: "Projeler | Enorpa Enerji" },
      {
        name: "description",
        content: "Enorpa Enerji projeleri. Özbekistan, Türkiye ve dünya genelinde sera ısıtma, buhar kazanı ve kurutma projeleri. 26 ülkede 138+ proje.",
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
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl">
            26 ülkede 138+ proje ve 347+ müşteriye hizmet vermekteyiz.
            Endüstriyel buhar, sıcak su, sıcak hava ve kızgın su kazanları ile
            sera ısıtma sistemleri konusunda dünya genelinde güvenilir bir iş ortağıyız.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <div key={i} className="bg-white border border-border p-6 hover:border-orange transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-orange/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-orange" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-navy font-bold uppercase">{project.title}</h3>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </span>
                    </div>
                    <div className="text-sm text-orange font-medium mb-2">{project.subtitle}</div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
