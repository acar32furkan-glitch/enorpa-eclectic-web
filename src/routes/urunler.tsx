import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Gauge, Flame, Factory, ArrowRight, X, Info, ShieldCheck } from "lucide-react";
import { productCategories as fallbackCategories, fetchProductsFromSupabase, type Product, type ProductCategory } from "@/data/products";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/urunler")({
  head: () => ({
    meta: [
      { title: "Ürünlerimiz | Enorpa Enerji" },
      { name: "description", content: "Kalsedon, Obsidyen, Akuamarin, Kuvars, Turmalin ve HAS Turbo serisi endüstriyel kazanlar - sıcak su, buhar, sıcak hava ve kızgın su kazanı çözümleri." },
      { property: "og:title", content: "Ürünlerimiz | Enorpa Enerji" },
      { property: "og:description", content: "Kalsedon, Obsidyen, Akuamarin, Kuvars, Turmalin ve HAS Turbo serisi endüstriyel kazanlar." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
    ],
  }),
  component: UrunlerPage,
});

function UrunlerPage() {
  const [categories, setCategories] = useState<ProductCategory[]>(fallbackCategories);
  const [activeTab, setActiveTab] = useState(fallbackCategories[0].id);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const activeCategory = categories.find((c) => c.id === activeTab) ?? categories[0];

  useEffect(() => {
    (async () => {
      const cats = await fetchProductsFromSupabase();
      setCategories(cats);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Page header */}
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Ürün Kataloğu
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Ürünlerimiz
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Her tesis için özel mühendislik. Tüm modellerimiz TSE, CE ve ISO 9001 standartlarında üretilir.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`font-display uppercase tracking-wider text-sm font-semibold px-5 py-2.5 transition-colors ${
                activeTab === cat.id
                  ? "bg-orange text-white"
                  : "bg-white text-navy border border-border hover:border-orange"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.products.map((p) => (
            <ProductCard
              key={p.name}
              product={p}
              categoryTitle={activeCategory.title}
              onDetail={() => setModalProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {modalProduct && <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />}
      <SiteFooter />
    </div>
  );
}

function ProductCard({
  product,
  categoryTitle,
  onDetail,
}: {
  product: Product;
  categoryTitle: string;
  onDetail: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const hasDetail = !!product.detail;
  return (
    <article className="group bg-white border border-border hover:border-orange transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="relative aspect-[4/3] bg-navy-dark overflow-hidden">
        {product.image_url && !imgError ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            width="600"
            height="450"
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-dark">
            <Factory className="h-16 w-16 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-orange text-white text-xs font-display font-semibold uppercase tracking-wider px-2.5 py-1">
            {categoryTitle}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-white/70 text-xs uppercase tracking-wider font-medium mb-1">
            {product.type}
          </div>
          <h3 className="font-display text-white text-2xl font-bold uppercase">{product.name}</h3>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <dl className="space-y-3 border-b border-border pb-4">
          {product.capacity && (
            <div className="flex items-start gap-3">
              <Gauge className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" strokeWidth={2.25} />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Kapasite</dt>
                <dd className="font-display text-navy text-base font-semibold">{product.capacity}</dd>
              </div>
            </div>
          )}
        </dl>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={onDetail}
            className="inline-flex items-center gap-1.5 font-display text-navy hover:text-orange font-semibold uppercase tracking-wider text-sm transition-colors"
          >
            {hasDetail ? "Detay" : "İncele"}
            <ArrowRight className="h-4 w-4" />
          </button>
          {hasDetail && (
            <span className="text-[10px] uppercase tracking-wider text-orange font-display font-semibold flex items-center gap-1">
              <Info className="h-3 w-3" /> Detaylı Bilgi
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white max-w-lg w-full p-6 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-navy" aria-label="Kapat">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 bg-orange text-white flex items-center justify-center">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-orange font-display font-bold">
              {product.type}
            </div>
            <h3 className="font-display text-navy text-xl font-bold uppercase leading-tight">{product.name}</h3>
          </div>
        </div>

        {product.capacity && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Gauge className="h-4 w-4 text-orange" />
            <span className="font-display font-semibold text-navy">{product.capacity}</span>
          </div>
        )}

        {product.detail && (
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{product.detail}</p>
        )}

        {product.specs && (
          <div className="bg-steel border border-border p-4 space-y-2">
            {product.specs.yakit && (
              <div className="flex items-start gap-2 text-sm">
                <Flame className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Yakıt</span>
                  <p className="font-display text-navy font-semibold">{product.specs.yakit}</p>
                </div>
              </div>
            )}
            {product.specs.basinc && (
              <div className="flex items-start gap-2 text-sm">
                <Gauge className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Basınç</span>
                  <p className="font-display text-navy font-semibold">{product.specs.basinc}</p>
                </div>
              </div>
            )}
            {product.specs.cikisSicakligi && (
              <div className="flex items-start gap-2 text-sm">
                <Flame className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Çıkış Sıcaklığı</span>
                  <p className="font-display text-navy font-semibold">{product.specs.cikisSicakligi}</p>
                </div>
              </div>
            )}
            {product.specs.standart && (
              <div className="flex items-start gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Standart</span>
                  <p className="font-display text-navy font-semibold">{product.specs.standart}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full bg-navy text-white font-display uppercase tracking-wider text-sm font-semibold py-3 hover:bg-navy-dark transition-colors"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
