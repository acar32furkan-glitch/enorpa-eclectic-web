import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Gauge, FileDown } from "lucide-react";
import { fetchProductBySlug, type Product, productCategories } from "@/data/products";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/urunler/$slug")({
  head: ({ params }) => {
    const title = params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      meta: [
        { title: `${title} | Enorpa Enerji` },
        { name: "description", content: `${title} - Enorpa Enerji ürün kataloğu` },
        { property: "og:title", content: `${title} | Enorpa Enerji` },
      { 
        property: "og:description", 
        content: `${params.slug.replace(/-/g, " ")} - Enorpa Enerji ürün kataloğu`,
      },
      { property: "og:type", content: "product" },
      { property: "og:locale", content: "tr_TR" },
      ],
      links: [
        { rel: "canonical", href: `https://enorpa.com/urunler/${params.slug}` },
      ],
    };
  },
  component: ProductDetailPage,
  loader: async ({ params }) => {
    const product = await fetchProductBySlug(params.slug);
    return product;
  },
});

function ProductDetailPage() {
  const loaderData = Route.useLoaderData() as Product | null;
  const [category, setCategory] = useState<string>("Diğer Ürün ve Hizmetler");

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
            <h1 className="font-display text-3xl font-bold text-navy mb-4">Ürün Bulunamadı</h1>
            <p className="text-muted-foreground mb-6">Aradığınız ürün sistemde kayıtlı değil.</p>
            <Link
              to="/urunler"
              className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-5 py-2.5 hover:bg-orange-dark transition-colors"
            >
              Ürün listesine dön
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const product = loaderData;
  const hasSpecs = product.specs && Object.values(product.specs).some((v) => v);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="max-w-3xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Ürün Detayı
          </div>
        </div>

        {/* Product Image Hero - Edge to edge dark bg */}
        <div className="bg-navy-dark mb-12">
          <div className="max-w-4xl mx-auto relative h-64 md:h-80">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                fetchpriority="high"
                className="w-full h-64 md:h-80 object-cover object-center rounded-lg"
              />
            ) : (
              <div className="w-full h-64 md:h-80 flex items-center justify-center bg-navy-dark">
                <Gauge className="h-20 w-20 text-white/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/50 to-transparent rounded-lg" />
            <div className="absolute top-6 left-6">
              <span className="bg-orange text-white text-xs font-display font-semibold uppercase tracking-wider px-3 py-1.5">
                {category}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="font-display text-white text-4xl md:text-5xl font-bold uppercase">
                {product.name}
              </h1>
              <p className="text-white/70 text-lg font-medium mt-2 uppercase tracking-wide">
                {product.type}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Description */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-navy text-2xl font-bold uppercase mb-4">
              Ürün Açıklaması
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              {product.long_description || product.detail || product.type}
            </p>
          </div>

          {/* Right: Specs Card */}
          <div className="bg-white border border-border p-6">
            <h3 className="font-display text-navy text-lg font-bold uppercase mb-4 border-b border-border pb-2">
              Teknik Özellikler
            </h3>
            <dl className="space-y-3">
              {product.capacity && (
                <div className="flex justify-between gap-2">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Kapasite
                  </dt>
                  <dd className="font-display text-navy font-semibold text-right text-sm">
                    {product.capacity}
                  </dd>
                </div>
              )}
              {hasSpecs && product.specs?.yakit && (
                <div className="flex justify-between gap-2">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Yakıt
                  </dt>
                  <dd className="font-display text-navy font-semibold text-right text-sm">
                    {product.specs.yakit}
                  </dd>
                </div>
              )}
              {hasSpecs && product.specs?.basinc && (
                <div className="flex justify-between gap-2">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Basınç
                  </dt>
                  <dd className="font-display text-navy font-semibold text-right text-sm">
                    {product.specs.basinc}
                  </dd>
                </div>
              )}
              {hasSpecs && product.specs?.cikisSicakligi && (
                <div className="flex justify-between gap-2">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Çıkış Sıcaklığı
                  </dt>
                  <dd className="font-display text-navy font-semibold text-right text-sm">
                    {product.specs.cikisSicakligi}
                  </dd>
                </div>
              )}
              {hasSpecs && product.specs?.standart && (
                <div className="flex justify-between gap-2">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Standart
                  </dt>
                  <dd className="font-display text-navy font-semibold text-right text-sm">
                    {product.specs.standart}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="/#contact"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-8 py-3 hover:bg-orange-dark transition-colors"
          >
            Teklif Al
          </a>
          {product.pdf_url && (
            <a
              href={product.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-navy text-white font-display uppercase tracking-wider text-sm px-8 py-3 hover:bg-navy-dark transition-colors"
            >
              <FileDown className="h-4 w-4" />
              PDF İndir
            </a>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
