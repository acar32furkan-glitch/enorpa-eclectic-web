import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { generateHreflangTags, SITE } from "@/lib/seo";
import { useState } from "react";

const URUNLER_CONTENT = `<div class="iwithtext">
<div class="iwt-icon"><img src="https://enorpa.com/wp-content/uploads/2024/07/enorpa-icon-1.png" alt="" /></div>
<div class="iwt-text"><h4><span style="color: #ffffff;">Anahtar Teslim Sera Isıtma Sistemleri</span></h4></div>
</div>
<p><strong>Verimli Sera Isıtma Çözümleri</strong></p>
<p>Enorpa sera ısıtma kazanları ile donatılan tesisler, yüksek verimlilik sağlar.</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Sıcak Hava Kazanları</span></h4></div>
</div>
<p><strong>HAS Serisi</strong></p>
<p>Katı Yakıtlı Sıcak Hava Kazanı<br />Kapasite Aralığı: 75.000 kcal/h – 200.000 kcal/h</p>
<p><strong>HAS NG Serisi</strong></p>
<p>Sıvı/Gaz Yakıtlı Sıcak Hava Kazanı<br />Kapasite Aralığı: 100.000 kcal/h – 1.000.000 kcal/h</p>
<p><strong>HAS Turbo Serisi</strong></p>
<p>Katı Yakıtlı Sıcak Hava Kazanı<br />Kapasite Aralığı: 300.000 kcal/h – 600.000 kcal/h</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Sıcak Su Kazanları</span></h4></div>
</div>
<p><strong>Turmalin Serisi</strong></p>
<p>Çok Yakıtlı Sıcak Su Kazanı<br />Kapasite Aralığı: 2.000 kg/h – 5.000 kg/h</p>
<p><strong>Oniks Serisi</strong></p>
<p>Katı Yakıtlı Sıcak Su Kazanı<br />Kapasite Aralığı: 2.000 kg/h – 5.000 kg/h</p>
<p><strong>Akuamarin Serisi</strong></p>
<p>Sıvı/Gaz Yakıtlı Sıcak Su Kazanı<br />Kapasite Aralığı: 349 kW – 2.093 kW</p>
<p><strong>Kuvars Serisi</strong></p>
<p>Multi Yakıtlı Sıcak Su Kazanı<br />Kapasite Aralığı: 1.000 kg/h – 5.000 kg/h</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Buhar Kazanları</span></h4></div>
</div>
<p><strong>Jasper Serisi</strong></p>
<p>Sıvı/Gaz Yakıtlı Buhar Kazanı<br />Kapasite Aralığı: 349 kW – 2.093 kW</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Kızgın Su Kazanları</span></h4></div>
</div>
<p><strong>Akuamarin KS Serisi</strong></p>
<p>Sıvı/Gaz Yakıtlı Kızgın Su Kazanı<br />Kapasite Aralığı: 349 kW – 2.093 kW</p>
<p><strong>Turkuaz KS Serisi</strong></p>
<p>Sıvı/Gaz Yakıtlı Kızgın Su Kazanı<br />Kapasite Aralığı: 349 kW – 2.093 kW</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Kat Kaloriferleri</span></h4></div>
</div>
<p><strong>Kat Kaloriferi</strong></p>
<p>Kat kaloriferleri, kapalı mahallerin ısıtması için özel olarak tasarlanmıştır.</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Brülörler</span></h4></div>
</div>
<p><strong>Riello, Ecostar, Ecoflam</strong></p>
<p>Brülörler, kazan sistemlerinin parçası olarak kullanılır.</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Baca Sistemleri</span></h4></div>
</div>
<p><strong>Tek Çidarlı ve Çift Çidarlı Baca</strong></p>
<p>Baca sistemleri, kazan sistemlerinin güvenli çalışması için gereklidir.</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Ekonomizer</span></h4></div>
</div>
<p>Ekonomizer, atık ısıyı geri kazanarak verimliliği artırır.</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Kondenser</span></h4></div>
</div>
<p>Kondenser, buharı suya dönüştürerek enerji tasarrufu sağlar.</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Kazan Otomasyon Sistemleri</span></h4></div>
</div>
<p>Kazan otomasyon sistemleri, tesisin otomatik kontrolünü sağlar.</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Kazan Kontrol Panosu</span></h4></div>
</div>
<p>Kazan kontrol panosu, kazanın güvenli çalışmasını sağlar.</p>
<div class="iwithtext">
<div class="iwt-text"><h4><span style="color: #ffffff;">Yedek Parça</span></h4></div>
</div>
<p>Enorpa, tüm ürünleri için yedek parça desteği sunmaktadır.</p>`;

export const Route = createFileRoute("/urunler")({
  head: () => ({
    meta: [
      { title: "Ürünler | Enorpa Enerji" },
      {
        name: "description",
        content:
          "Enorpa Enerji ürün kataloğu. Sıcak su kazanları, buhar kazanları, sıcak hava kazanları, kızgın su kazanları, kat kaloriferleri, brülörler, baca sistemleri.",
      },
      { property: "og:title", content: "Ürünler | Enorpa Enerji" },
      {
        property: "og:description",
        content:
          "Enorpa Enerji ürün kataloğu. 24+ ürün, 26 ülkede 138+ proje.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/urunler" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ürünler | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji ürün kataloğu. 24+ ürün." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/urunler" },
      ...generateHreflangTags("/urunler"),
    ],
  }),
  component: UrunlerPage,
  loader: async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("category", { ascending: true });
    return data || [];
  },
});

function UrunlerPage() {
  const products = Route.useLoaderData() as any[];
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tümü" },
    { id: "sicak-su", label: "Sıcak Su Kazanları" },
    { id: "buhar", label: "Buhar Kazanları" },
    { id: "sicak-hava", label: "Sıcak Hava Kazanları" },
    { id: "kizgin-su", label: "Kızgın Su Kazanları" },
    { id: "sera", label: "Sera Isıtma Sistemleri" },
    { id: "kat-kaloriferi", label: "Kat Kaloriferleri" },
    { id: "brulor", label: "Brülörler" },
    { id: "baca", label: "Baca Sistemleri" },
    { id: "ekonomizer", label: "Ekonomizer" },
    { id: "kondenser", label: "Kondenser" },
    { id: "yedek-parca", label: "Yedek Parça" },
  ];

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p: any) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Ürünler
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Ürünlerimiz
          </h1>
        </div>

        <div
          className="prose prose-lg max-w-none text-muted-foreground mb-16 [&_h1]:text-navy [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:uppercase [&_h1]:mb-6 [&_h2]:text-navy [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:mt-8 [&_h2]:mb-4 [&_h4]:text-navy [&_h4]:font-semibold [&_h4]:text-lg [&_h4]:mb-2 [&_p]:mb-3 [&_p]:leading-relaxed [&_strong]:text-navy"
          dangerouslySetInnerHTML={{ __html: URUNLER_CONTENT }}
        />

        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-orange text-white"
                  : "bg-white border border-border text-muted-foreground hover:border-orange"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Ürün Listesi */}
        {filteredProducts.length === 0 ? (
          <p className="text-muted-foreground">Bu kategoride henüz ürün eklenmemiş.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: any) => (
              <Link
                key={product.slug}
                to="/urunler/$slug"
                params={{ slug: product.slug }}
                className="bg-white border border-border hover:border-orange transition-colors p-6"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-40 object-cover mb-4"
                  />
                )}
                <h3 className="font-display text-navy font-bold uppercase text-sm mb-2">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
