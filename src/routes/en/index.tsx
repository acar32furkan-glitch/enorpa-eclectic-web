import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Factory, Globe, Users } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      { title: "Enorpa Energy - Heating Systems and Steam Boilers" },
      { name: "description", content: "Enorpa Energy - Industrial steam, hot water, hot air boilers and greenhouse heating systems. 26 countries, 138+ projects, 347+ customers." },
      { property: "og:title", content: "Enorpa Energy - Heating Systems and Steam Boilers" },
      { property: "og:description", content: "Industrial steam, hot water, hot air boilers. 26 countries, 138+ projects." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/en" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Enorpa Energy - Heating Systems" },
      { name: "twitter:description", content: "Industrial boilers. 26 countries, 138+ projects." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/en" },
    ],
  }),
  component: EnHomePage,
});

function EnHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-display text-navy text-4xl md:text-6xl font-bold uppercase mb-6">
            Your Greenhouse<br />
            <span className="text-orange">A Warm Step Forward</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Enorpa Energy has been carrying out production, project design and contracting works on steam,
            hot water, hot air and hot oil systems as well as fuel tanks, horizontal and vertical pressure vessels.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/en/products"
              className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-6 py-3 hover:bg-orange-dark transition-colors"
            >
              Our Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/en/contact"
              className="inline-flex items-center gap-2 border-2 border-navy text-navy font-display uppercase tracking-wider text-sm px-6 py-3 hover:bg-navy hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
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
            We aim to provide excellent products to our customers by ensuring efficiency and sustainability in production.
          </p>
          <a
            href="/en/contact"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
