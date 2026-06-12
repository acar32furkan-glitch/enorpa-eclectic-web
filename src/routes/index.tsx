import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent, trackCalculatorUse } from "@/lib/analytics";
import {
  Phone,
  Mail,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Gauge,
  Flame,
  Award,
  Factory,
  Calculator,
  Send,
  FileText,
  Download,
  Lock,
  MapPin,
  MessageCircle,
  Clock,
  Building2,
  Check,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enorpa Enerji — Endüstriyel Isıtmada Güvenilir Güç" },
      {
        name: "description",
        content:
          "Buhar, sıcak su ve sıcak hava kazanları. 25+ yıllık deneyimle endüstriyel ısıtma çözümleri. CE, TSE, ISO 9001 sertifikalı.",
      },
    ],
  }),
  component: Index,
});

type Lang = "TR" | "EN" | "RU";

type Dict = {
  nav: readonly string[];
  quote: string;
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
    nav: ["Anasayfa", "Ürünler", "Referanslar", "Belgeler", "İletişim"],
    quote: "Teklif Al",
    heroTitle: "Endüstriyel Isıtmada\nGüvenilir Güç",
    heroSub:
      "Buhar kazanları, sıcak su kazanları ve sıcak hava sistemleriyle tesislerinize özel, yüksek verimli çözümler.",
    ctaPrimary: "Ürünleri İncele",
    ctaSecondary: "Bize Ulaşın",
    yearsExp: "Yıl Deneyim",
    projects: "Tamamlanan Proje",
    countries: "Ülkeye İhracat",
    satisfaction: "Müşteri Memnuniyeti",
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
    nav: ["Home", "Products", "References", "Documents", "Contact"],
    quote: "Get Quote",
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
    nav: ["Главная", "Продукция", "Проекты", "Документы", "Контакты"],
    quote: "Запросить цену",
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

const PRODUCT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1581093458791-9d42e3c7f7e3?auto=format&fit=crop&w=900&q=80";

type DbProduct = {
  id: string;
  name: string;
  category: string;
  capacity: string | null;
  fuel_type: string | null;
  image_url: string | null;
  description: string | null;
  is_active: boolean;
};

const WHATSAPP = "905551112233";

function Index() {
  const [lang, setLang] = useState<Lang>("TR");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const L = t[lang];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      setProducts((data as DbProduct[]) ?? []);
      setProductsLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("enorpa_lang") : null;
    if (stored === "TR" || stored === "EN" || stored === "RU") {
      setLang(stored);
      return;
    }
    if (typeof navigator !== "undefined") {
      const code = (navigator.language || "tr").slice(0, 2).toLowerCase();
      if (code === "ru") setLang("RU");
      else if (code === "tr") setLang("TR");
      else setLang("EN");
    }
  }, []);

  // Persist as manual override whenever the user changes language
  const chooseLang = (l: Lang) => {
    setLang(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("enorpa_lang", l);
      localStorage.setItem("enorpa_lang_manual", "1");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 md:pb-0">
      {/* TOP BAR */}
      <div className="bg-navy-dark text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-6">
            <a href="tel:+908504712100" className="flex items-center gap-2 hover:text-orange transition-colors">
              <Phone className="h-4 w-4" strokeWidth={2.5} />
              <span className="font-medium tracking-wide">+90 850 471 2100</span>
            </a>
            <a href="mailto:turuncu@enorpa.com" className="hidden sm:flex items-center gap-2 hover:text-orange transition-colors">
              <Mail className="h-4 w-4" strokeWidth={2.5} />
              <span>turuncu@enorpa.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
            {(["TR", "EN", "RU"] as Lang[]).map((code, i) => (
              <span key={code} className="flex items-center">
                {i > 0 && <span className="text-white/30 mx-1">|</span>}
                <button
                  onClick={() => chooseLang(code)}
                  className={`px-1.5 py-0.5 transition-colors ${
                    lang === code ? "text-orange font-bold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {code}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`sticky top-0 z-50 bg-white border-b border-border transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl font-bold text-navy tracking-tight">
              ENORPA
            </span>
            <span className="h-2 w-2 rounded-full bg-orange mt-2" />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {L.nav.map((item, i) => (
              <a
                key={item}
                href={i === 0 ? "#" : `#${["products", "refs", "docs", "contact"][i - 1]}`}
                className="font-sans text-sm font-medium text-navy-dark hover:text-orange transition-colors uppercase tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-5 py-3 transition-colors"
            >
              {L.quote}
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              className="lg:hidden p-2 text-navy"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="px-4 py-4 flex flex-col gap-1">
              {L.nav.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="py-3 px-2 font-medium text-navy-dark hover:bg-steel border-b border-border last:border-0"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-3 bg-orange text-white text-center font-display font-semibold uppercase tracking-wider py-3"
                onClick={() => setMenuOpen(false)}
              >
                {L.quote}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10, 30, 61, 0.78)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36 lg:py-44">
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

      <TrustBar L={L} />

      {/* PRODUCTS */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsLoading ? (
              <div className="col-span-full py-12 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange" />
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                Henruz urun yok.
              </div>
            ) : (
              products.map((p) => (
                <ProductCard key={p.id} p={p} L={L} />
              ))
            )}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white font-display font-semibold uppercase tracking-wider px-7 py-4 transition-colors"
            >
              {L.viewAll}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* LEAD GEN: CALCULATOR + QUICK FORM */}
      <LeadGenSection />

      {/* DOCUMENT CENTER */}
      <DocumentCenter />

      {/* CONTACT (anchor for nav links) */}
      <ContactSection />

      {/* FOOTER */}
      <SiteFooter />

      {/* FLOATING WHATSAPP (desktop only) */}
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        onClick={() => trackEvent("whatsapp_click")}
        className="hidden md:flex fixed bottom-6 right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 bg-navy-dark text-white border-t-2 border-orange shadow-2xl">
        <a
          href="tel:+908504712100"
          onClick={() => trackEvent("phone_click")}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 active:bg-navy"
        >
          <Phone className="h-5 w-5" />
          <span className="text-[11px] font-display uppercase tracking-wider font-semibold">Ara</span>
        </a>
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click")}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 bg-[#25D366] active:bg-[#1ea952]"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-[11px] font-display uppercase tracking-wider font-semibold">WhatsApp</span>
        </a>
        <a href="#contact" className="flex flex-col items-center justify-center gap-0.5 py-2.5 bg-orange active:bg-orange-dark">
          <Mail className="h-5 w-5" />
          <span className="text-[11px] font-display uppercase tracking-wider font-semibold">Teklif</span>
        </a>
      </div>
    </div>
  );
}

function ProductCard({ p, L }: { p: DbProduct; L: Dict }) {
  return (
    <article className="group bg-white border border-border hover:border-orange transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="relative aspect-[4/3] bg-navy-dark overflow-hidden">
        <img
          src={p.image_url || PRODUCT_PLACEHOLDER}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-orange text-white text-xs font-display font-semibold uppercase tracking-wider px-2.5 py-1">
            {p.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-white text-2xl font-bold uppercase">{p.name}</h3>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <dl className="space-y-3 border-b border-border pb-4">
          <div className="flex items-start gap-3">
            <Gauge className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" strokeWidth={2.25} />
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                {L.capacity}
              </dt>
              <dd className="font-display text-navy text-base font-semibold">{p.capacity}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Flame className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" strokeWidth={2.25} />
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                {L.fuel}
              </dt>
              <dd className="font-display text-navy text-base font-semibold">{p.fuel_type || "—"}</dd>
            </div>
          </div>
        </dl>

        <a
          href="#"
          className="mt-5 inline-flex items-center justify-between font-display text-navy hover:text-orange font-semibold uppercase tracking-wider text-sm transition-colors"
        >
          {L.inspect}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function TrustBar({ L }: { L: Dict }) {
  return (
    <section className="bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mb-10 pb-10 border-b border-border">
          <Counter end={25} suffix="+" label={L.yearsExp} />
          <Counter end={500} suffix="+" label={L.projects} />
          <Counter end={15} suffix="+" label={L.countries} />
          <Counter end={98} suffix="%" label={L.satisfaction} />
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

type FacilityType = "textile" | "food" | "greenhouse" | "hotel" | "chemical";
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

  useEffect(() => {
    if (result) {
      trackCalculatorUse(`${result.kcal} kcal/h - ${result.recommended}`);
    }
  }, [result]);

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
    const leadData = {
      name: cleanName,
      phone: cleanPhone,
      source: "quick_callback",
      interest: "Hızlı Geri Arama",
    };
    const { error: dbError } = await supabase.from("leads").insert(leadData);
    if (dbError) {
      setError("Talebiniz gönderilemedi. Lütfen tekrar deneyin.");
      return;
    }
    trackEvent("quick_callback_submitted");
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    }).catch(() => {});
    setSubmitted(true);
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
   PHASE 2 — DOCUMENT CENTER
========================================================================= */

type Doc = {
  id: string;
  title: string;
  sub: string;
  size: string;
  gated: boolean;
};

const DOCS: Doc[] = [
  { id: "kuvars-spec", title: "Kuvars Serisi Teknik Föy", sub: "PDF · Buhar Kazanları", size: "1.2 MB", gated: false },
  { id: "oniks-spec", title: "Oniks Serisi Teknik Föy", sub: "PDF · Sıcak Su Kazanları", size: "1.8 MB", gated: false },
  { id: "has-spec", title: "HAS NG Teknik Föy", sub: "PDF · Sıcak Hava Sistemleri", size: "0.9 MB", gated: false },
  { id: "certificates", title: "Sertifikalar Paketi", sub: "CE · TSE · ISO 9001", size: "3.4 MB", gated: false },
  { id: "catalog-2026", title: "2026 Genel Katalog", sub: "Tüm Ürün Yelpazesi", size: "18 MB", gated: true },
  { id: "engineering-guide", title: "Mühendislik Tasarım Kılavuzu", sub: "Premium Rehber", size: "8.7 MB", gated: true },
];

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
    <a href="#" className={className} download>
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
    const leadData = {
      name: clean.split("@")[0],
      email: clean,
      source: "document_gate",
      interest: `Belge: ${doc.title}`,
    };
    await supabase.from("leads").insert(leadData);
    trackEvent("document_gate_submitted", doc.title);
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    }).catch(() => {});
    setDone(true);
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
              href="#"
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
          <ContactCard icon={<MapPin className="h-5 w-5" />} title="Fabrika" body="OSB · Bursa, Türkiye" />
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

function SiteFooter() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-display text-3xl font-bold tracking-tight">ENORPA</span>
            <span className="h-2 w-2 rounded-full bg-orange mt-2" />
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Endüstriyel buhar, sıcak su ve sıcak hava sistemlerinde 25+ yıllık üretim deneyimi.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">Sertifikalar</span>
            <span className="font-display font-bold text-white">CE</span>
            <span className="font-display font-bold text-white">TSE</span>
            <span className="font-display font-bold text-white">ISO</span>
          </div>
        </div>

        <FooterCol title="Ürünler" links={["Buhar Kazanları", "Sıcak Su Kazanları", "Sıcak Hava Kazanları", "Yedek Parça"]} />
        <FooterCol title="Kurumsal" links={["Hakkımızda", "Referanslar", "Belgeler", "İletişim"]} />

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-orange font-display font-bold mb-4">
            Fabrika & İletişim
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
              <span>OSB Mavi Cad. No: 12 · Bursa / Türkiye</span>
            </div>
            <a href="tel:+908504712100" className="flex items-start gap-2 hover:text-orange">
              <Phone className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
              +90 850 471 2100
            </a>
            <a href="mailto:turuncu@enorpa.com" className="flex items-start gap-2 hover:text-orange">
              <Mail className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
              turuncu@enorpa.com
            </a>
          </div>
          <div className="mt-5 aspect-[4/3] bg-navy border border-white/10 flex items-center justify-center text-white/40 text-xs uppercase tracking-wider">
            <MapPin className="h-5 w-5 mr-2" /> Google Maps
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Enorpa Enerji. Tüm hakları saklıdır.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">Gizlilik</a>
            <a href="#" className="hover:text-white">KVKK</a>
            <a href="#" className="hover:text-white">Çerezler</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] text-orange font-display font-bold mb-4">
        {title}
      </div>
      <ul className="space-y-2 text-sm text-white/80">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-orange transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
