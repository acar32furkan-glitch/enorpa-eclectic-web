import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Globe, Calendar } from "lucide-react";
import { generateHreflangTags, SITE } from "@/lib/seo";

const PROJELER_CONTENT = `<h1>Öne Çıkan Projelerimiz</h1>
<p>Enorpa Enerji, 26 ülkede 138+ projeyi hayata geçirmiştir. İşte öne çıkan projelerimiz:</p>
<ul>
<li><strong>Turkey/Isparta</strong> - Drying Forest Products</li>
<li><strong>Turkey/Izmir</strong> - Greenhouse Heating System</li>
<li><strong>Turkey/Manisa</strong> - Industrial Steam Boiler</li>
<li><strong>Uzbekistan/Tashkent</strong> - Greenhouse Heating (2020)</li>
<li><strong>Uzbekistan/Harezm</strong> - Greenhouse Heating (2020)</li>
<li><strong>Kazakhstan/Almaty</strong> - Greenhouse Heating (2022)</li>
<li><strong>Russia</strong> - Industrial Steam Boilers</li>
</ul>
<p>Her proje, müşterimizin özel ihtiyaçlarına göre tasarlanmış ve Enorpa kalitesiyle hayata geçirilmiştir.</p>`;

const projects = [
  {
    slug: "ozbekistan-taskent",
    title: "Özbekistan/Taşkent",
    subtitle: "Sera Isıtma Tesisatı Kurulumu",
    description: "Taşkent'te sera ısıtma tesisatı kurulumu gerçekleştirdik. Enorpa HAS Serisi kazanlar ile donatılan tesis, yüksek verimlilik sağlamaktadır.",
    location: "Özbekistan, Taşkent",
    year: "2020",
    icon: Globe,
  },
  {
    slug: "ozbekistan-harezm",
    title: "Özbekistan/Harezm",
    subtitle: "Sera Isıtma Tesisatı Kurulumu",
    description: "Harezm'de sera ısıtma tesisatı kurulumu. Sıcak iklim koşullarına uygun özel tasarım.",
    location: "Özbekistan, Harezm",
    year: "2020",
    icon: Globe,
  },
  {
    slug: "turkiye-manisa",
    title: "Türkiye/Manisa",
    subtitle: "Buhar Kazanı Kurulumu",
    description: "Manisa'da buhar kazanı kurulumu. Sanayi tesisine özel buhar kazanı devreye alındı.",
    location: "Türkiye, Manisa",
    year: "2019",
    icon: MapPin,
  },
  {
    slug: "turkiye-izmir",
    title: "Türkiye/İzmir",
    subtitle: "Sera Isıtma Tesisatı Kurulumu",
    description: "İzmir'de sera ısıtma tesisatı kurulumu. Seracılık sektörüne özel çözümler.",
    location: "Türkiye, İzmir",
    year: "2021",
    icon: MapPin,
  },
  {
    slug: "turkiye-isparta",
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
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/projeler" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Projeler | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji projeleri. 26 ülkede 138+ proje." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/projeler" },
      ...generateHreflangTags("/projeler"),
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

        <div
          className="prose prose-lg max-w-none text-muted-foreground mb-16 [&_h1]:text-navy [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:uppercase [&_h1]:mb-6 [&_h2]:text-navy [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:text-navy [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2"
          dangerouslySetInnerHTML={{ __html: PROJELER_CONTENT }}
        />

        <div className="space-y-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <Link key={i} to="/portfolio/$slug" params={{ slug: project.slug }} className="block">
                <div className="bg-white border border-border p-6 hover:border-orange transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-orange/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-orange" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display text-navy font-bold uppercase group-hover:text-orange transition-colors">{project.title}</h3>
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
              </Link>
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
