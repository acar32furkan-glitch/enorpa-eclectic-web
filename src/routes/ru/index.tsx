import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Factory, Globe, Users } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/ru/")({
  head: () => ({
    meta: [
      { title: "Enorpa Energy - Системы отопления и паровые котлы" },
      { name: "description", content: "Enorpa Energy - Промышленные паровые, водогрейные и воздухонагревательные котлы. 26 стран, 138+ проектов, 347+ клиентов." },
      { property: "og:title", content: "Enorpa Energy - Системы отопления и паровые котлы" },
      { property: "og:description", content: "Промышленные котлы. 26 стран, 138+ проектов." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://enorpa.com/ru" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Enorpa Energy - Системы отопления" },
      { name: "twitter:description", content: "Промышленные котлы. 26 стран, 138+ проектов." },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/ru" }],
  }),
  component: RuHomePage,
});

function RuHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-display text-navy text-4xl md:text-6xl font-bold uppercase mb-6">
            Ваша теплица<br />
            <span className="text-orange">Тёплый шаг вперёд</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Enorpa Energy осуществляет производство, проектирование и монтаж систем пара,
            горячей воды, горячего воздуха, а также топливных баков и сосудов под давлением.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/ru/products" className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-6 py-3 hover:bg-orange-dark transition-colors">
              Наша продукция <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ru/contact" className="inline-flex items-center gap-2 border-2 border-navy text-navy font-display uppercase tracking-wider text-sm px-6 py-3 hover:bg-navy hover:text-white transition-colors">
              Связаться с нами
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-border p-6 text-center">
            <Globe className="h-10 w-10 text-orange mx-auto mb-3" />
            <div className="text-3xl font-display font-bold text-orange mb-1">26</div>
            <div className="text-sm text-muted-foreground">Стран</div>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <Factory className="h-10 w-10 text-orange mx-auto mb-3" />
            <div className="text-3xl font-display font-bold text-orange mb-1">138+</div>
            <div className="text-sm text-muted-foreground">Проектов</div>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <Users className="h-10 w-10 text-orange mx-auto mb-3" />
            <div className="text-3xl font-display font-bold text-orange mb-1">347+</div>
            <div className="text-sm text-muted-foreground">Клиентов</div>
          </div>
        </div>

        <div className="bg-navy-dark text-white p-8 text-center">
          <h2 className="font-display text-2xl font-bold uppercase mb-4">Качественная продукция, довольные клиенты</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Enorpa Energy устанавливает стандарты качества и инноваций в сфере отопления.
          </p>
          <a href="/ru/contact" className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors">
            Запросить цену <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
