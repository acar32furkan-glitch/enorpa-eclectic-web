import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  ShieldCheck,
  Gauge,
  Flame,
  Award,
  Factory,
  Calculator,
  ArrowRight,
  MapPin,
  Info,
  X,
  Check,
  Phone,
  Mail,
  Clock,
  Download,
  FileText,
  Lock,
  Send,
  Building2,
} from "lucide-react";
import { productCategories as fallbackCategories, getFeaturedProducts, fetchProductsFromSupabase, type Product, type ProductCategory, toSlug } from "@/data/products";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enorpa Enerji | Endüstriyel Su Kazanı, Hava Kazanı ve Buhar Kazanı" },
      { name: "description", content: "Enorpa Enerji - sıcak su, sıcak hava, buhar ve kızgın su kazanları üretimi. Sera ısıtma, endüstriyel buhar ve mahal ısıtma çözümleri. 26 ülkede 138+ proje." },
      { property: "og:title", content: "Enorpa Enerji | Endüstriyel Su Kazanı, Hava Kazanı ve Buhar Kazanı" },
      { property: "og:description", content: "Enorpa Enerji - sıcak su, sıcak hava, buhar ve kızgın su kazanları üretimi. Sera ısıtma, endüstriyel buhar ve mahal ısıtma çözümleri." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
    ],
  }),
  component: Index,
});

type Lang = "TR" | "EN" | "RU";

type Dict = {
  heroTitle: string;
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  yearsExp: string;
  projects: string;
  countries: string;
  satisfaction: string;
  certified: string;
  productsTitle: string;
  productsSub: string;
  capacity: string;
  fuel: string;
  inspect: string;
  viewAll: string;
};

const t: Record<Lang, Dict> = {
  TR: {
    heroTitle: "Endüstriyel Isıtmada\nGüvenilir Güç",
    heroSub:
      "Buhar kazanları, sıcak su kazanları ve sıcak hava sistemleriyle tesislerinize özel, yüksek verimli çözümler.",
    ctaPrimary: "Ürünleri İncele",
    ctaSecondary: "Bize Ulaşın",
    yearsExp: "Yıl Deneyim",
    projects: "Tamamlanan Proje",
    countries: "Ülkeye İhracat",
    satisfaction: "Mutlu Müşteri",
    certified: "Sertifikalı Üretim:",
    productsTitle: "Ürün Kategorilerimiz",
    productsSub:
      "Her tesis için özel mühendislik. Tüm modellerimiz TSE, CE ve ISO 9001 standartlarında üretilir.",
    capacity: "Kapasite",
    fuel: "Yakıt",
    inspect: "İncele",
    viewAll: "Tüm Ürünleri Gör",
  },
  EN: {
    heroTitle: "Reliable Power\nin Industrial Heating",
    heroSub:
      "High-efficiency, custom-engineered solutions with steam, hot water and hot air boiler systems for your facility.",
    ctaPrimary: "Explore Products",
    ctaSecondary: "Contact Us",
    yearsExp: "Years Experience",
    projects: "Completed Projects",
    countries: "Export Countries",
    satisfaction: "Customer Satisfaction",
    certified: "Certified Manufacturing:",
    productsTitle: "Our Product Categories",
    productsSub:
      "Custom engineering for every facility. All our models are manufactured to TSE, CE and ISO 9001 standards.",
    capacity: "Capacity",
    fuel: "Fuel",
    inspect: "View",
    viewAll: "View All Products",
  },
  RU: {
    heroTitle: "Надежная мощность\nпромышленного отопления",
    heroSub:
      "Высокоэффективные индивидуальные решения с паровыми, водогрейными и воздухонагревательными котлами.",
    ctaPrimary: "Смотреть продукцию",
    ctaSecondary: "Связаться",
    yearsExp: "лет опыта",
    projects: "Завершенных проектов",
    countries: "Стран экспорта",
    satisfaction: "Удовлетворенность",
    certified: "Сертифицированное производство:",
    productsTitle: "Категории продукции",
    productsSub: "Индивидуальная инженерия. TSE, CE, ISO 9001.",
    capacity: "Мощность",
    fuel: "Топливо",
    inspect: "Подробнее",
    viewAll: "Вся продукция",
  },
};

const WHATSAPP = "908504712100";

function Index() {
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const [showHero, setShowHero] = useState(true);

  // Simple language detection for homepage - reads from localStorage only
  const getLang = (): Lang => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("enorpa_lang") as Lang | null) : null;
    if (stored === "TR" || stored === "EN" || stored === "RU") return stored;
    return "TR";
  };
  const lang = getLang();
  const L = t[lang];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from("site_settings").select("key, value");
        const map: Record<string, boolean> = {};
        if (data) {
          for (const row of data) {
            map[row.key] = row.value ?? true;
          }
        }
        setSettings(map);
      } catch {
        setSettings({});
      }
    })();
  }, []);

  const show = (key: string): boolean => settings[key] !== false;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
{showHero && (
        <>
          {/* HERO */}
          <section className="relative">
            <img
              src="https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/gallery/taskent.webp"
              alt="Enorpa Enerji Hero"
              fetchPriority="high"
              width="1920"
              height="800"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(10, 30, 61, 0.78)" }} />
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-36 lg:py-44">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 border-l-4 border-orange pl-3 mb-6">
                  <span className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold">
                    Enorpa Enerji · Since 2000
                  </span>
                </div>
                <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] whitespace-pre-line uppercase">
                  {L.heroTitle}
                </h1>
                <p className="mt-6 text-white/85 text-lg md:text-xl max-w-2xl leading-relaxed">
                  {L.heroSub}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider px-7 py-4 transition-colors"
                  >
                    {L.ctaPrimary}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-navy font-display font-semibold uppercase tracking-wider px-7 py-4 transition-colors"
                  >
                    {L.ctaSecondary}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {show("show_stats") && <TrustBar L={L} />}
{show("show_sectors") && <SectorsSection />}
        <FuelSavingsCalculator />
        <ProductsSection L={L} />
      {show("show_references") && <ReferencesSection />}
      <LeadGenSection />
      {show("show_documents") && <DocumentCenter />}
      {show("show_gallery") && <ProjectGallery />}
      {show("show_testimonials") && <TestimonialsSection />}
      <ContactSection />
      <SiteFooter />
    </div>
  );
}

/* =========================================================================
   PRODUCTS SECTION — featured products grid + CTA to full catalog
========================================================================= */

function ProductsSection({ L }: { L: Dict }) {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>(fallbackCategories);
  const [featured, setFeatured] = useState(getFeaturedProducts());

  useEffect(() => {
    (async () => {
      const cats = await fetchProductsFromSupabase();
      setCategories(cats);
      // Recalculate featured from fetched data
      const feat: (Product & { categoryTitle: string })[] = [];
      for (const cat of cats) {
        for (const p of cat.products) {
          if (p.featured) feat.push({ ...p, categoryTitle: cat.title });
        }
      }
      setFeatured(feat.length > 0 ? feat : getFeaturedProducts());
    })();
  }, []);

  return (
    <section id="products" className="bg-steel py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Ürün Kataloğu
          </div>
          <h2 className="font-display text-navy text-3xl md:text-5xl font-bold uppercase">
            {L.productsTitle}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{L.productsSub}</p>
        </div>

        {/* Featured Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.name} product={p} categoryTitle={p.categoryTitle} L={L} onDetail={() => setModalProduct(p)} />
          ))}
        </div>

        {/* CTA to full catalog */}
        <div className="mt-12 flex justify-center">
          <a
            href="/urunler"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider px-8 py-4 transition-colors text-base"
          >
            Tüm Ürün Kataloğunu İncele
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      {modalProduct && <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />}
    </section>
  );
}

function ProductCard({
  product,
  categoryTitle,
  L,
  onDetail,
}: {
  product: Product;
  categoryTitle: string;
  L: Dict;
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
             sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        <div className="space-y-3 border-b border-border pb-4">
          {product.capacity && (
            <div className="flex items-start gap-3">
              <Gauge className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" strokeWidth={2.25} />
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{L.capacity}</div>
                <div className="font-display text-navy text-base font-semibold">{product.capacity}</div>
              </div>
            </div>
          )}
        </div>

<div className="mt-5 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <button
               onClick={onDetail}
               className="inline-flex items-center gap-1.5 font-display text-navy hover:text-orange font-semibold uppercase tracking-wider text-sm transition-colors"
             >
               {hasDetail ? "Detay" : L.inspect}
               <ArrowRight className="h-4 w-4" />
             </button>
             <Link
               to="/urunler/$slug"
               params={{ slug: product.slug || toSlug(product.name) }}
               className="inline-flex items-center gap-1.5 font-display text-navy hover:text-orange font-semibold uppercase tracking-wider text-sm transition-colors"
             >
               Tam Sayfa
               <ArrowRight className="h-4 w-4" />
             </Link>
           </div>
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

function TrustBar({ L }: { L: Dict }) {
  return (
    <section className="bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mb-10 pb-10 border-b border-border">
          <Counter end={25} suffix="+" label={L.yearsExp} />
          <Counter end={138} suffix="+" label={L.projects} />
          <Counter end={26} suffix="+" label={L.countries} />
          <Counter end={347} suffix="+" label={L.satisfaction} />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-display font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {L.certified}
          </div>
          <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center">
            <CertBadge icon={<ShieldCheck className="h-6 w-6" />} label="CE" sub="European Conformity" />
            <CertBadge icon={<Award className="h-6 w-6" />} label="TSE" sub="Türk Standartları" />
            <CertBadge icon={<Factory className="h-6 w-6" />} label="ISO 9001" sub="Quality Management" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CertBadge({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 border-l-2 border-orange pl-3">
      <div className="text-navy">{icon}</div>
      <div>
        <div className="font-display font-bold text-navy text-lg leading-none uppercase">
          {label}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
          {sub}
        </div>
      </div>
    </div>
  );
}

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end]);

  return (
    <div className="text-center md:text-left">
      <div className="font-display text-navy text-4xl md:text-5xl font-bold leading-none">
        {val}
        <span className="text-orange">{suffix}</span>
      </div>
      <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </div>
    </div>
  );
}

/* =========================================================================
   PHASE 2 — LEAD GEN: CAPACITY CALCULATOR + QUICK CALLBACK
========================================================================= */

type FacilityType = "textile" | "food" | "greenhouse" | "hotel" | "chemical" | "other";
type FuelType = "natural_gas" | "solid" | "diesel" | "lpg";

const FACILITIES: { id: FacilityType; label: string; factor: number; icon: string }[] = [
  { id: "textile", label: "Tekstil", factor: 0.45, icon: "🧵" },
  { id: "food", label: "Gıda", factor: 0.55, icon: "🥫" },
  { id: "greenhouse", label: "Sera", factor: 0.35, icon: "🌱" },
  { id: "hotel", label: "Otel / Hastane", factor: 0.25, icon: "🏨" },
  { id: "chemical", label: "Kimya", factor: 0.6, icon: "⚗️" },
];

const FUELS: { id: FuelType; label: string }[] = [
  { id: "natural_gas", label: "Doğalgaz" },
  { id: "solid", label: "Katı Yakıt" },
  { id: "diesel", label: "Motorin" },
  { id: "lpg", label: "LPG" },
];

function LeadGenSection() {
  return (
    <section id="quote" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Hızlı Teklif
          </div>
          <h2 className="font-display text-navy text-3xl md:text-5xl font-bold uppercase">
            İhtiyacınızı 30 Saniyede Belirleyin
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Tesisinize uygun kazan kapasitesini hesaplayın veya size hemen ulaşmamız için kısa formu doldurun.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <CapacityCalculator />
          </div>
          <div className="lg:col-span-2">
            <QuickCallbackForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function CapacityCalculator() {
  const [step, setStep] = useState(0);
  const [facility, setFacility] = useState<FacilityType | null>(null);
  const [area, setArea] = useState<number>(1000);
  const [fuel, setFuel] = useState<FuelType | null>(null);

  const result = useMemo(() => {
    if (facility == null || fuel == null) return null;
    const f = FACILITIES.find((x) => x.id === facility)!;
    // kcal/h estimate
    const kcal = Math.round(area * f.factor * 1000);
    const kw = Math.round(kcal / 860);
    let recommended = "Akuamarin Serisi";
    if (kcal > 2_000_000) recommended = "Oniks Serisi";
    else if (fuel === "solid") recommended = "Kuvars Serisi";
    else if (facility === "greenhouse") recommended = "HAS NG Serisi";
    return { kcal, kw, recommended };
  }, [facility, area, fuel]);

  const reset = () => {
    setStep(0);
    setFacility(null);
    setFuel(null);
    setArea(1000);
  };

  const StepDot = ({ i }: { i: number }) => (
    <div className="flex items-center gap-2">
      <div
        className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-display font-bold ${
          i <= step ? "bg-orange text-white" : "bg-steel text-muted-foreground border border-border"
        }`}
      >
        {i < step ? <Check className="h-4 w-4" /> : i + 1}
      </div>
      {i < 3 && <div className={`h-0.5 w-8 ${i < step ? "bg-orange" : "bg-border"}`} />}
    </div>
  );

  return (
    <div className="bg-steel border border-border h-full p-6 md:p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-navy text-white flex items-center justify-center">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-navy text-xl md:text-2xl font-bold uppercase leading-none">
            Kapasite Hesaplayıcı
          </h3>
          <p className="text-xs text-muted-foreground mt-1">4 adımda tahmini kapasite</p>
        </div>
      </div>

      <div className="flex items-center mb-8">
        {[0, 1, 2, 3].map((i) => (
          <StepDot key={i} i={i} />
        ))}
      </div>

      <div className="flex-1">
        {step === 0 && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-4">
              1. Tesis Tipiniz
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FACILITIES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFacility(f.id);
                    setStep(1);
                  }}
                  className={`p-4 border-2 text-left transition-colors bg-white ${
                    facility === f.id ? "border-orange" : "border-border hover:border-navy"
                  }`}
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="font-display font-semibold text-navy text-sm uppercase">
                    {f.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-4">
              2. Isıtılacak Alan (m²)
            </label>
            <div className="bg-white border-2 border-border p-6">
              <div className="font-display text-navy text-4xl md:text-5xl font-bold text-center mb-4">
                {area.toLocaleString("tr-TR")} <span className="text-orange text-xl">m²</span>
              </div>
              <input
                type="range"
                min={100}
                max={20000}
                step={100}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-orange"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>100 m²</span>
                <span>20.000 m²</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-4">
              3. Yakıt Tercihi
            </label>
            <div className="grid grid-cols-2 gap-3">
              {FUELS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFuel(f.id);
                    setStep(3);
                  }}
                  className={`p-4 border-2 text-left bg-white transition-colors ${
                    fuel === f.id ? "border-orange" : "border-border hover:border-navy"
                  }`}
                >
                  <Flame className="h-5 w-5 text-orange mb-2" />
                  <div className="font-display font-semibold text-navy uppercase">{f.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div className="bg-navy text-white p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-orange font-display font-semibold mb-4">
              Tahmini Sonuç
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Kapasite</div>
                <div className="font-display text-3xl md:text-4xl font-bold">
                  {result.kcal.toLocaleString("tr-TR")}
                  <span className="text-orange text-base ml-1">kcal/h</span>
                </div>
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Güç</div>
                <div className="font-display text-3xl md:text-4xl font-bold">
                  {result.kw.toLocaleString("tr-TR")}
                  <span className="text-orange text-base ml-1">kW</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 pt-4">
              <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Önerilen Model</div>
              <div className="font-display text-xl font-bold">{result.recommended}</div>
            </div>
            <div className="mt-6 text-[11px] text-white/60 italic">
              * Bu sonuç ön bilgilendirme amaçlıdır. Net hesap için mühendislerimizle görüşün.
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-sm font-display uppercase tracking-wider text-muted-foreground disabled:opacity-30 hover:text-navy"
        >
          ← Geri
        </button>
        {step === 3 ? (
          <button
            onClick={reset}
            className="text-sm font-display uppercase tracking-wider text-orange hover:text-orange-dark font-semibold"
          >
            Yeniden Hesapla
          </button>
        ) : (
          <button
            onClick={() => setStep(Math.min(3, step + 1))}
            disabled={(step === 0 && !facility) || (step === 2 && !fuel)}
            className="inline-flex items-center gap-2 bg-orange text-white px-5 py-2.5 font-display uppercase tracking-wider text-sm font-semibold disabled:opacity-40 hover:bg-orange-dark"
          >
            İleri <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function QuickCallbackForm() {
   const [submitted, setSubmitted] = useState(false);
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [error, setError] = useState<string | null>(null);

   const onSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     const cleanName = name.trim();
     const cleanPhone = phone.trim();
     if (cleanName.length < 2 || cleanName.length > 80) {
       setError("Lütfen geçerli bir ad girin.");
       return;
     }
     if (!/^[0-9 +()-]{7,20}$/.test(cleanPhone)) {
       setError("Lütfen geçerli bir telefon numarası girin.");
       return;
     }
     setError(null);
     const { error: dbError } = await supabase.from("leads").insert({
       name: cleanName,
       phone: cleanPhone,
       source: "quick_callback",
       interest: "Hızlı Geri Arama",
     });
     if (dbError) {
       setError("Talebiniz gönderilemedi. Lütfen tekrar deneyin.");
       return;
     }
     setSubmitted(true);
     if (typeof window !== "undefined") {
       if (window.fbq) window.fbq('track', 'Lead');
       if (window.gtag) window.gtag('event', 'generate_lead', { event_category: 'Quick Callback' });
     }
   };

  return (
    <div className="bg-navy text-white h-full p-6 md:p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-orange text-white flex items-center justify-center">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-white text-xl md:text-2xl font-bold uppercase leading-none">
            Vaktiniz Yok mu?
          </h3>
          <p className="text-xs text-white/70 mt-1">Sizi 1 saat içinde arayalım</p>
        </div>
      </div>

      {submitted ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div className="h-16 w-16 rounded-full bg-orange flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <div className="font-display text-2xl font-bold uppercase mb-2">Talebiniz Alındı</div>
          <p className="text-white/70 text-sm">Mesai saatleri içinde sizi arayacağız.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-display font-semibold text-white/70 mb-2">
              Adınız Soyadınız
            </label>
            <input
              type="text"
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-navy-dark border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-orange focus:outline-none"
              placeholder="Ahmet Yılmaz"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-display font-semibold text-white/70 mb-2">
              Telefon
            </label>
            <input
              type="tel"
              required
              maxLength={20}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-navy-dark border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:border-orange focus:outline-none"
              placeholder="+90 555 111 22 33"
            />
          </div>

          {error && <div className="text-orange text-sm">{error}</div>}

          <button
            type="submit"
            className="mt-auto inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider px-5 py-4 transition-colors"
          >
            <Send className="h-4 w-4" />
            Beni Arayın
          </button>

          <div className="flex items-center gap-2 text-xs text-white/50 justify-center">
            <Clock className="h-3.5 w-3.5" />
            Pzt – Cum · 08:30 – 18:00
          </div>
        </form>
      )}
    </div>
  );
}

/* =========================================================================
   PHASE 2 — REFERENCES
========================================================================= */

const REFERENCES = [
  { name: "Bursa Tekstil A.Ş.", sector: "Tekstil", year: "2023", desc: "2 adet Kuvars Serisi buhar kazanı, 8.000 kg/h kapasite" },
  { name: "Ege Gıda Sanayi", sector: "Gıda", year: "2024", desc: "Akuamarin Serisi sıcak su kazanı, 12.000 kW" },
  { name: "Anadolu Sera İşletmesi", sector: "Sera", year: "2023", desc: "HAS NG Serisi sıcak hava sistemi, 800.000 kcal/h" },
  { name: "Marmara Kimya Tesisleri", sector: "Kimya", year: "2024", desc: "Turmalin Serisi buhar kazanı, 5.000 kg/h" },
];

/* =========================================================================
   SECTORS
========================================================================= */

const SECTORS = [
  { icon: "🌱", title: "Sera Isıtma Sistemleri", desc: "Sera ısıtma tesisatı proje ve kurulumu" },
  { icon: "🏭", title: "Endüstriyel Buhar Sistemleri", desc: "Endüstriyel tesislerde kullanılan yüksek verimli ısıtma sistemleri" },
  { icon: "💨", title: "Kurutma Sistemleri", desc: "Nemin azaltılması için kullanılan teknolojik çözümler" },
  { icon: "🏢", title: "Mahal Isıtma Sistemleri", desc: "Yapı içindeki sıcaklık düzenlemesi için kullanılan sistemler" },
];

function SectorsSection() {
  return (
    <section className="bg-white py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Sektörler
          </div>
          <h2 className="font-display text-navy text-3xl md:text-5xl font-bold uppercase">
            Sektörler
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Kazan, ısıtma ve buhar sistemleri çözümlerimizle dünyanın birçok noktasında farklı sektörlerdeki müşterilerimize profesyonel çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTORS.map((s) => (
            <div key={s.title} className="bg-steel border border-border p-6 text-center hover:border-orange transition-colors">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-display text-navy text-lg font-bold uppercase mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FuelSavingsCalculator() {
  const [fuelType, setFuelType] = useState<FuelType>("natural_gas");
  const [consumption, setConsumption] = useState(1000);
  const [unitPrice, setUnitPrice] = useState(5);
  const [facilityType, setFacilityType] = useState<FacilityType>("greenhouse");

  const EFFICIENCY_RATES: Record<FuelType, number> = {
    natural_gas: 0.12,
    solid: 0.32,
    diesel: 0.28,
    lpg: 0.18,
  };

  const SYSTEM_COSTS: Record<FacilityType, number> = {
    greenhouse: 1250000,
    hotel: 2250000,
    industrial: 3000000,
    other: 1250000,
  };

  const monthlyFuelCost = consumption * unitPrice;
  const yearlyFuelCost = monthlyFuelCost * 12;
  const savingsRate = EFFICIENCY_RATES[fuelType] + 0.10;
  const yearlySavings = yearlyFuelCost * savingsRate;
  const monthlySavings = yearlySavings / 12;
  const roiYears = SYSTEM_COSTS[facilityType] / yearlySavings;

  const unitLabel = fuelType === "natural_gas" ? "m³/ay" : "ton/ay";

  return (
    <section id="roi-calculator" className="bg-navy text-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Yakıt Tasarruf Hesaplayıcısı
          </div>
          <h2 className="font-display text-white text-3xl md:text-5xl font-bold uppercase">
            Yakıt Tasarruf Hesaplayıcısı
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            Enorpa sistemiyle ne kadar tasarruf edebileceğinizi hesaplayın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-display font-semibold text-white/70 mb-2">
                Mevcut Yakıt Tipi
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as FuelType)}
                className="w-full bg-navy-dark border border-white/20 px-4 py-3 text-white focus:border-orange"
              >
                <option value="natural_gas">Doğalgaz</option>
                <option value="diesel">Fuel-Oil</option>
                <option value="solid">Kömür</option>
                <option value="lpg">Pelet</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-display font-semibold text-white/70 mb-2">
                Aylık Yakıt Tüketimi ({unitLabel})
              </label>
              <input
                type="number"
                min={0}
                value={consumption}
                onChange={(e) => setConsumption(Number(e.target.value))}
                className="w-full bg-navy-dark border border-white/20 px-4 py-3 text-white focus:border-orange"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-display font-semibold text-white/70 mb-2">
                Mevcut Yakıt Birim Fiyatı (TL)
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full bg-navy-dark border border-white/20 px-4 py-3 text-white focus:border-orange"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-display font-semibold text-white/70 mb-2">
                Tesis Tipi
              </label>
              <select
                value={facilityType}
                onChange={(e) => setFacilityType(e.target.value as FacilityType)}
                className="w-full bg-navy-dark border border-white/20 px-4 py-3 text-white focus:border-orange"
              >
                <option value="greenhouse">Sera</option>
                <option value="hotel">Otel</option>
                <option value="industrial">Endüstriyel Tesis</option>
                <option value="other">Diğer</option>
              </select>
            </div>
          </div>

          <div className="bg-navy-dark border border-orange/30 p-6 flex flex-col justify-center">
            <div className="space-y-4">
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Aylık Mevcut Maliyet</div>
                <div className="font-display text-2xl font-bold text-white">{monthlyFuelCost.toLocaleString("tr-TR")} TL</div>
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Tahmini Yıllık Tasarruf</div>
                <div className="font-display text-3xl font-bold text-orange">{yearlySavings.toLocaleString("tr-TR")} TL</div>
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Tahmini Amortisman Süresi</div>
                <div className="font-display text-2xl font-bold text-white">{roiYears.toFixed(1)} yıl</div>
              </div>
              <p className="text-[11px] text-white/50 italic mt-2">
                *Hesaplama tahmini olup gerçek değerler sistem büyüklüğüne göre değişir.
              </p>
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider px-6 py-3 mt-4"
              >
                Ücretsiz Tasarruf Analizi İste →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   REFERENCES
========================================================================= */

function ReferencesSection() {
  return (
    <section id="refs" className="bg-white py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Referanslar
          </div>
          <h2 className="font-display text-navy text-3xl md:text-5xl font-bold uppercase">
            Tamamlanan Projeler
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            25+ yılda 500'ün üzerinde projeyi başarıyla tamamladık.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REFERENCES.map((r) => (
            <div key={r.name} className="border border-border bg-steel p-6 hover:border-orange transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-orange font-display font-semibold">
                    {r.sector}
                  </div>
                  <h3 className="font-display text-navy text-xl font-bold uppercase mt-1">{r.name}</h3>
                </div>
                <span className="text-xs text-muted-foreground font-display uppercase tracking-wider">{r.year}</span>
              </div>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   PHASE 2 — DOCUMENT CENTER
========================================================================= */

type Doc = {
  id: string;
  title: string;
  sub: string;
  size: string;
  gated: boolean;
  url: string;
};

const DOCS: Doc[] = [
  { id: "kuvars-spec", title: "Kuvars Serisi Teknik Föy", sub: "PDF · Buhar Kazanları", size: "1.2 MB", gated: false, url: "/docs/kuvars-spec.pdf" },
  { id: "oniks-spec", title: "Oniks Serisi Teknik Föy", sub: "PDF · Sıcak Su Kazanları", size: "1.8 MB", gated: false, url: "/docs/oniks-spec.pdf" },
  { id: "has-spec", title: "HAS NG Teknik Föy", sub: "PDF · Sıcak Hava Sistemleri", size: "0.9 MB", gated: false, url: "/docs/has-spec.pdf" },
  { id: "certificates", title: "Sertifikalar Paketi", sub: "CE · TSE · ISO 9001", size: "3.4 MB", gated: false, url: "/docs/certificates.pdf" },
  { id: "catalog-2026", title: "2026 Genel Katalog", sub: "Tüm Ürün Yelpazesi", size: "18 MB", gated: true, url: "/docs/catalog-2026.pdf" },
  { id: "engineering-guide", title: "Mühendislik Tasarım Kılavuzu", sub: "Premium Rehber", size: "8.7 MB", gated: true, url: "/docs/engineering-guide.pdf" },
];

/* =========================================================================
   PROJECT GALLERY
========================================================================= */

const PROJECTS = [
  { title: "Özbekistan / Taşkent", sub: "Sera Isıtma Tesisatı Kurulumu", image_url: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/gallery/taskent.webp" },
  { title: "Özbekistan / Harezm", sub: "Sera Isıtma Tesisatı Kurulumu", image_url: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/gallery/harezm.webp" },
  { title: "Türkiye / Manisa", sub: "Buhar Kazanı Kurulumu", image_url: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/gallery/manisa.webp" },
  { title: "Türkiye / İzmir", sub: "Sera Isıtma Tesisatı Kurulumu", image_url: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/gallery/izmir.webp" },
];

function ProjectGallery() {
  return (
    <section className="bg-steel py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Projelerimiz
          </div>
          <h2 className="font-display text-navy text-3xl md:text-5xl font-bold uppercase">
            Projelerimizden Görüntüler
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((p) => (
            <div key={p.title} className="group bg-white border border-border hover:border-orange transition-all overflow-hidden">
              <div className="relative aspect-[4/3] bg-navy-dark overflow-hidden">
                <img
                  src={p.image_url}
                  alt={p.title}
                  width="600"
                  height="450"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-navy text-base font-bold uppercase">{p.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   DOCUMENT CENTER
========================================================================= */

/* =========================================================================
   TESTIMONIALS
========================================================================= */

const TESTIMONIALS = [
  {
    quote: "Müşterilerimize sağladığımız kaliteli ve zamanında teknik destek, işlerini kesintisiz sürdürmelerini sağlıyor. Saha ekiplerimiz her projede profesyonel yaklaşımları ve yenilikçi çözümleriyle fark yaratıyor.",
    name: "Mevlüt A.",
    title: "Servis & Saha Sorumlusu",
  },
  {
    quote: "Yenilikçi stratejiler ve sektörel uzmanlıkla enerji çözümlerinde öncü konumdayız. Müşteri odaklı yaklaşımımızla sürdürülebilirlik ve verimlilik alanlarında öncü projelere imza atıyoruz.",
    name: "Onur K.",
    title: "Proje & Pazarlama Müdürü",
  },
  {
    quote: "Enerji sektöründe sağlam bir iz bırakmanın gururunu yaşıyoruz. Yenilikçi projelerimiz ve müşteri odaklı yaklaşımımızla sektördeki değişimi liderlik ederek yönlendiriyoruz.",
    name: "İbrahim Ç.",
    title: "Yönetim Kurulu Üyesi",
  },
  {
    quote: "Isıtma sektöründe kalite ve yenilik standartlarını belirlemekteyiz. Yaratıcı çözümlerimizle üretimde verimlilik ve sürdürülebilirlik sağlayarak müşterilerimize mükemmel ürünler sunmayı hedefliyoruz.",
    name: "Aykut M.",
    title: "Yönetim Kurulu Üyesi",
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-navy-dark text-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Görüşler
          </div>
          <h2 className="font-display text-white text-3xl md:text-5xl font-bold uppercase">
            Yüksek Teknoloji & Mühendislik
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="border border-white/10 p-6 md:p-8">
              <svg className="h-6 w-6 text-orange mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <div className="font-display text-white font-bold uppercase text-sm">{t.name}</div>
                <div className="text-xs text-white/50 mt-0.5">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   DOCUMENT CENTER
========================================================================= */

function DocumentCenter() {
  const [gatedDoc, setGatedDoc] = useState<Doc | null>(null);

  return (
    <section id="docs" className="bg-steel py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Doküman Merkezi
          </div>
          <h2 className="font-display text-navy text-3xl md:text-5xl font-bold uppercase">
            Teknik Belgeler & Kataloglar
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Teknik föyler doğrudan indirilebilir. Premium kılavuzlarımız için kısa bir form doldurmanız yeterlidir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOCS.map((d) => (
            <DocCard key={d.id} d={d} onGated={() => setGatedDoc(d)} />
          ))}
        </div>
      </div>

      {gatedDoc && <GateModal doc={gatedDoc} onClose={() => setGatedDoc(null)} />}
    </section>
  );
}

function DocCard({ d, onGated }: { d: Doc; onGated: () => void }) {
  const content = (
    <>
      <div className="flex items-start gap-4">
        <div
          className={`h-12 w-12 flex items-center justify-center flex-shrink-0 ${
            d.gated ? "bg-orange text-white" : "bg-navy text-white"
          }`}
        >
          {d.gated ? <Lock className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          {d.gated && (
            <div className="text-[10px] uppercase tracking-[0.2em] text-orange font-display font-bold mb-1">
              Premium
            </div>
          )}
          <h3 className="font-display text-navy text-base md:text-lg font-bold uppercase leading-tight">
            {d.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{d.sub}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{d.size}</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-display font-semibold uppercase tracking-wider text-navy group-hover:text-orange">
              {d.gated ? "Talep Et" : "İndir"}
              <Download className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const className =
    "group bg-white border border-border hover:border-orange transition-all p-5 text-left w-full hover:-translate-y-0.5 hover:shadow-lg";

  if (d.gated) {
    return (
      <button onClick={onGated} className={className}>
        {content}
      </button>
    );
  }
  return (
    <a href={d.url} download className={className}>
      {content}
    </a>
  );
}

function GateModal({ doc, onClose }: { doc: Doc; onClose: () => void }) {
   const [email, setEmail] = useState("");
   const [done, setDone] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const submit = async (e: React.FormEvent) => {
     e.preventDefault();
     const clean = email.trim();
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean) || clean.length > 255) {
       setError("Lütfen geçerli bir e-posta girin.");
       return;
     }
     setError(null);
     await supabase.from("leads").insert({
       name: clean.split("@")[0],
       email: clean,
       source: "document_gate",
       interest: `Belge: ${doc.title}`,
     });
     setDone(true);
     if (typeof window !== "undefined") {
       if (window.fbq) window.fbq('track', 'Lead', { content_name: doc.title });
       if (window.gtag) window.gtag('event', 'generate_lead', { event_category: 'Document Gate' });
     }
   };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-md w-full p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-muted-foreground hover:text-navy"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="text-center py-6">
            <div className="h-14 w-14 mx-auto rounded-full bg-orange flex items-center justify-center mb-4">
              <Check className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display text-navy text-2xl font-bold uppercase mb-2">
              İndirme Hazır
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              "{doc.title}" e-postanıza gönderildi.
            </p>
            <a
              href={doc.url}
              download
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider px-6 py-3"
            >
              <Download className="h-4 w-4" /> Şimdi İndir
            </a>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 bg-orange text-white flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-orange font-display font-bold">
                  Premium Belge
                </div>
                <h3 className="font-display text-navy text-lg font-bold uppercase leading-tight">
                  {doc.title}
                </h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Belgeyi e-posta adresinize göndermek için aşağıdaki alanı doldurun.
            </p>
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
                  E-posta Adresiniz
                </label>
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-border px-4 py-3 focus:border-orange focus:outline-none"
                  placeholder="ad@firma.com"
                />
              </div>
              {error && <div className="text-orange text-sm">{error}</div>}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider px-5 py-3.5"
              >
                <Download className="h-4 w-4" /> Belgeyi Al
              </button>
              <p className="text-[11px] text-muted-foreground text-center">
                E-posta adresiniz yalnızca bu belge ve ilgili teknik güncellemeler için kullanılır.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   CONTACT + FOOTER
========================================================================= */

function ContactSection() {
  return (
    <section id="contact" className="bg-white py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            İletişim
          </div>
          <h2 className="font-display text-navy text-3xl md:text-4xl font-bold uppercase">
            Mühendislerimize Ulaşın
          </h2>
          <p className="mt-4 text-muted-foreground">
            Projeniz için doğru kazanı birlikte belirleyelim. Saha ekibimiz Türkiye genelinde hizmet verir.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ContactCard icon={<Phone className="h-5 w-5" />} title="Telefon" body="+90 850 471 2100" href="tel:+908504712100" />
          <ContactCard icon={<Mail className="h-5 w-5" />} title="E-posta" body="turuncu@enorpa.com" href="mailto:turuncu@enorpa.com" />
          <ContactCard icon={<MapPin className="h-5 w-5" />} title="Fabrika" body="Sanayi Mah. 3231 Sk. No:12 · Merkez / ISPARTA" />
          <ContactCard icon={<Building2 className="h-5 w-5" />} title="Mesai" body="Pzt – Cum · 08:30 – 18:00" />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  body,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="h-10 w-10 bg-steel text-navy flex items-center justify-center mb-3 group-hover:bg-orange group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
        {title}
      </div>
      <div className="font-display text-navy text-lg font-semibold">{body}</div>
    </>
  );
  const cls = "group block p-5 border border-border hover:border-orange transition-colors bg-white";
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
