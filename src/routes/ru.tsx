import { Outlet, createFileRoute, Link, useChildMatches } from "@tanstack/react-router";
import { ArrowRight, Factory, Globe, Users } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { generateHreflangTags, generateWebSiteSchema } from "@/lib/seo";
import { ASSETS, productImage } from "@/lib/assets";

export const Route = createFileRoute("/ru")({
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
    links: [{ rel: "canonical", href: "https://enorpa.com/ru" },
      ...generateHreflangTags("/ru"),
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(generateWebSiteSchema()) },
    ],
  }),
  component: RuLayout,
});

function RuLayout() {
  const children = useChildMatches();
  return children.length > 0 ? <Outlet /> : <RuHomePage />;
}

function RuHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative">
        <img
          src={ASSETS.hero}
          alt="Производственная площадка Enorpa Energy"
          width="1920"
          height="900"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Okunabilirlik gradyanı (düz lacivert örtü yerine) */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,20,38,0.95)_0%,rgba(6,20,38,0.88)_34%,rgba(6,20,38,0.52)_62%,rgba(6,20,38,0.14)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[440px] max-w-7xl flex-col justify-center px-4 py-20 md:min-h-[540px] md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border-l-4 border-orange pl-3 mb-6">
              <span className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold">
                Enorpa Energy · Since 2000
              </span>
            </div>
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
              Ваша теплица
              <br />
              <span className="text-orange">Тёплый шаг вперёд</span>
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-2xl mb-8">
              Enorpa Energy осуществляет производство, проектирование и монтаж систем пара,
              горячей воды, горячего воздуха, а также топливных баков и сосудов под давлением.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/ru/products" className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-6 py-3 hover:bg-orange-dark transition-colors">
                Наша продукция <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/ru/contact" className="inline-flex items-center gap-2 border-2 border-white text-white font-display uppercase tracking-wider text-sm px-6 py-3 hover:bg-white hover:text-navy transition-colors">
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Изображения продукции */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { src: productImage("kalsedon-serisi", "sicak-su"), label: "Водогрейные котлы" },
            { src: productImage("kuvars-serisi-tek-kulhanli", "buhar"), label: "Паровые котлы" },
            { src: productImage("has-turbo-serisi", "sicak-hava"), label: "Воздухонагреватели" },
          ].map((item) => (
            <div key={item.src} className="relative aspect-[4/3] bg-navy-dark overflow-hidden group">
              <img
                src={item.src}
                alt={item.label}
                width="600"
                height="450"
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 to-transparent" />
              <span className="absolute bottom-3 left-4 font-display text-white text-sm font-semibold uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
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
