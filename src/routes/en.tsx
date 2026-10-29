import { Outlet, createFileRoute, Link, useChildMatches } from "@tanstack/react-router";
import { ArrowRight, Factory, Globe, Users } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { generateHreflangTags, generateWebSiteSchema } from "@/lib/seo";
import { ASSETS, productImage } from "@/lib/assets";

export const Route = createFileRoute("/en")({
  head: () => ({
    meta: [
      { title: "Enorpa Energy - Heating Systems and Steam Boilers" },
      { name: "description", content: "Enorpa Energy - Industrial steam, hot water, hot air boilers and greenhouse heating systems. 26 countries, 138+ projects, 347+ customers." },
      { property: "og:title", content: "Enorpa Energy - Heating Systems and Steam Boilers" },
      { property: "og:description", content: "Industrial steam, hot water, hot air boilers. 26 countries, 138+ projects." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://enorpa.com/en" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Enorpa Energy - Heating Systems" },
      { name: "twitter:description", content: "Industrial boilers. 26 countries, 138+ projects." },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/en" },
      ...generateHreflangTags("/en"),
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(generateWebSiteSchema()) },
    ],
  }),
  component: EnLayout,
});

function EnLayout() {
  const children = useChildMatches();
  return children.length > 0 ? <Outlet /> : <EnHomePage />;
}

function EnHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative">
        <img
          src={ASSETS.hero}
          alt="Enorpa Energy production facility"
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
              Your Greenhouse
              <br />
              <span className="text-orange">A Warm Step Forward</span>
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-2xl mb-8">
              Enorpa Energy has been carrying out production, project design and contracting works on steam,
              hot water, hot air and hot oil systems as well as fuel tanks, horizontal and vertical pressure vessels.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/en/products" className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-6 py-3 hover:bg-orange-dark transition-colors">
                Our Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/en/contact" className="inline-flex items-center gap-2 border-2 border-white text-white font-display uppercase tracking-wider text-sm px-6 py-3 hover:bg-white hover:text-navy transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Ürün görselleri */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { src: productImage("kalsedon-serisi", "sicak-su"), label: "Hot Water Boilers" },
            { src: productImage("kuvars-serisi-tek-kulhanli", "buhar"), label: "Steam Boilers" },
            { src: productImage("has-turbo-serisi", "sicak-hava"), label: "Hot Air Boilers" },
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
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <Factory className="h-10 w-10 text-orange mx-auto mb-3" />
            <div className="text-3xl font-display font-bold text-orange mb-1">138+</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <Users className="h-10 w-10 text-orange mx-auto mb-3" />
            <div className="text-3xl font-display font-bold text-orange mb-1">347+</div>
            <div className="text-sm text-muted-foreground">Customers</div>
          </div>
        </div>

        <div className="bg-navy-dark text-white p-8 text-center">
          <h2 className="font-display text-2xl font-bold uppercase mb-4">Quality Products, Happy Customers</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Enorpa Energy sets the standards of quality and innovation in the heating sector.
          </p>
          <a href="/en/contact" className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
