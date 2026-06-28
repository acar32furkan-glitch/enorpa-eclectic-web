import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { fetchProductsFromSupabase, toSlug, type Product } from "@/data/products";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/en/products")({
  head: () => ({
    meta: [
      { title: "Products | Enorpa Energy" },
      { name: "description", content: "Enorpa Energy product catalog. Steam boilers, hot water boilers, hot air boilers, and more." },
      { property: "og:title", content: "Products | Enorpa Energy" },
      { property: "og:description", content: "Industrial boiler catalog. High efficiency, reliable, and eco-friendly." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/en/products" },
      { property: "og:locale", content: "en_US" },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/en/products" }],
  }),
  component: EnProductsPage,
  loader: async () => {
    const categories = await fetchProductsFromSupabase();
    return categories;
  },
});

function EnProductsPage() {
  const categories = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Products
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Our Products
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
                      to="/en/products/$slug"
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
