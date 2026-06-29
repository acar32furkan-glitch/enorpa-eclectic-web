import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { fetchProductsFromSupabase, toSlug, type Product } from "@/data/products";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SITE, generateHreflangTags } from "@/lib/seo";

export const Route = createFileRoute("/ru/products")({
  head: () => ({
    meta: [
      { title: "Продукция | Enorpa Energy" },
      { name: "description", content: "Каталог продукции Enorpa Energy. Паровые котлы, водогрейные котлы, воздухонагреватели." },
      { property: "og:title", content: "Продукция | Enorpa Energy" },
      { property: "og:description", content: "Каталог промышленных котлов. Высокая эффективность, надежность." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/ru/products" },
      { property: "og:locale", content: "ru_RU" },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/ru/products" },
      ...generateHreflangTags("/ru/products"),
    ],
  }),
  component: RuProductsPage,
  loader: async () => {
    const categories = await fetchProductsFromSupabase();
    return categories;
  },
});

function RuProductsPage() {
  const categories = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Продукция
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Наша продукция
          </h1>
        </div>

        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h2 className="font-display text-navy text-2xl font-bold uppercase mb-6">{cat.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.products.map((product) => {
                  const slug = product.slug || toSlug(product.name);
                  return (
                    <Link
                      key={slug}
                      to="/ru/products/$slug"
                      params={{ slug }}
                      className="bg-white border border-border p-6 hover:border-orange transition-colors"
                    >
                      <h3 className="font-display text-navy font-bold uppercase mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.type}</p>
                      {product.capacity && (
                        <p className="text-xs text-orange font-medium">{product.capacity}</p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
