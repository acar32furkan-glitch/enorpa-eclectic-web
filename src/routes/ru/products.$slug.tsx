import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Gauge, FileDown, ArrowLeft } from "lucide-react";
import { fetchProductBySlug, productCategories, type Product } from "@/data/products";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { generateProductSchema, SITE } from "@/lib/seo";

export const Route = createFileRoute("/ru/products/$slug")({
  head: ({ params }) => {
    const title = params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      meta: [
        { title: `${title} | Enorpa Energy` },
        { name: "description", content: `${title} - Каталог продукции Enorpa Energy.` },
        { property: "og:title", content: `${title} | Enorpa Energy` },
        { property: "og:description", content: `${title} - Промышленный котел Enorpa Energy.` },
        { property: "og:type", content: "product" },
        { property: "og:image", content: SITE.defaultOgImage },
        { property: "og:url", content: `https://enorpa.com/ru/products/${params.slug}` },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${title} | Enorpa Energy` },
        { name: "twitter:description", content: `${title} - Enorpa Energy.` },
        { name: "twitter:image", content: SITE.defaultOgImage },
      ],
      links: [{ rel: "canonical", href: `https://enorpa.com/ru/products/${params.slug}` }],
      scripts: loaderData ? [{ type: "application/ld+json", children: JSON.stringify(generateProductSchema({
        name: loaderData.name,
        description: loaderData.detail || loaderData.type,
        image: loaderData.image_url,
        slug: params.slug,
      })) }] : [],
    };
  },
  component: RuProductDetailPage,
  loader: async ({ params }) => {
    const product = await fetchProductBySlug(params.slug);
    return product;
  },
});

function RuProductDetailPage() {
  const loaderData = Route.useLoaderData() as Product | null;
  const [category, setCategory] = useState<string>("Другая продукция");

  useEffect(() => {
    if (loaderData && loaderData.category) {
      const cat = productCategories.find((c) => c.id === loaderData.category);
      if (cat) setCategory(cat.title);
    }
  }, [loaderData]);

  if (!loaderData) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-bold text-navy mb-4">Продукт не найден</h1>
            <Link to="/ru/products" className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-5 py-2.5 hover:bg-orange-dark transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Назад к продукции
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema({
        name: loaderData.name,
        description: loaderData.detail || loaderData.type,
        image: loaderData.image_url,
        slug: params.slug,
      })) }} />
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Link to="/ru/products" className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-navy-dark hover:text-orange mb-6">
          <ArrowLeft className="h-4 w-4" />
          Продукция
        </Link>

        <article>
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            {category}
          </div>
          <h1 className="font-display text-navy text-3xl md:text-4xl font-bold uppercase mb-4">
            {loaderData.name}
          </h1>
          <p className="text-muted-foreground mb-4">{loaderData.type}</p>

          {loaderData.capacity && (
            <div className="flex items-center gap-2 text-sm text-orange font-medium mb-6">
              <Gauge className="h-4 w-4" />
              {loaderData.capacity}
            </div>
          )}

          {loaderData.detail && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed">{loaderData.detail}</p>
            </div>
          )}

          {loaderData.specs && (
            <div className="bg-white border border-border p-6 mb-8">
              <h2 className="font-display text-navy text-lg font-bold uppercase mb-4">Технические характеристики</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {loaderData.specs.yakit && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Топливо</span>
                    <p className="text-navy font-medium mt-1">{loaderData.specs.yakit}</p>
                  </div>
                )}
                {loaderData.specs.basinc && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Давление</span>
                    <p className="text-navy font-medium mt-1">{loaderData.specs.basinc}</p>
                  </div>
                )}
                {loaderData.specs.standart && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Стандарт</span>
                    <p className="text-navy font-medium mt-1">{loaderData.specs.standart}</p>
                  </div>
                )}
                {loaderData.specs.cikisSicakligi && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Температура выхода</span>
                    <p className="text-navy font-medium mt-1">{loaderData.specs.cikisSicakligi}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-navy-dark text-white p-6 text-center">
            <h2 className="font-display text-lg font-bold uppercase mb-2">Заинтересованы в этом продукте?</h2>
            <p className="text-white/80 text-sm mb-4">Свяжитесь с нами для получения индивидуального предложения.</p>
            <a href="/ru/contact" className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-5 py-2.5 transition-colors">
              Запросить цену
            </a>
          </div>
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
