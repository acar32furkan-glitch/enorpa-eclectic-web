import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
} as const;

const PRODUCTS = [
  { cat: "Buhar Kazanları", name: "Kuvars Serisi", sub: "Tek Külhanlı", capacity: "500 – 5.000 kg/h", fuel: "Katı Yakıtlı" },
  { cat: "Buhar Kazanları", name: "Kuvars NG Serisi", sub: "Yüksek Verim", capacity: "500 – 10.000 kg/h", fuel: "Sıvı/Gaz Yakıtlı" },
  { cat: "Buhar Kazanları", name: "Turmalin Serisi", sub: "Endüstriyel", capacity: "2.000 – 5.000 kg/h", fuel: "Multi Yakıtlı" },
  { cat: "Sıcak Su Kazanları", name: "Oniks Serisi", sub: "Yüksek Kapasite", capacity: "3.000.000 – 6.000.000 kcal/h", fuel: "Katı Yakıtlı" },
  { cat: "Sıcak Su Kazanları", name: "Akuamarin Serisi", sub: "Modüler Tasarım", capacity: "75 – 20.000 kW", fuel: "Sıvı/Gaz Yakıtlı" },
  { cat: "Sıcak Hava Kazanları", name: "HAS NG Serisi", sub: "Sera & Sanayi", capacity: "100.000 – 1.000.000 kcal/h", fuel: "Sıvı/Gaz Yakıtlı" },
];

function Index() {
  const [lang, setLang] = useState<Lang>("TR");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const L = t[lang];

  // Auto-detect browser language on first load
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

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("enorpa_lang", lang);
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                  onClick={() => setLang(code)}
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

      {/* TRUST BAR */}
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
            {PRODUCTS.map((p) => (
              <ProductCard key={p.name} p={p} L={L} />
            ))}
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
    </div>
  );
}

function ProductCard({ p, L }: { p: (typeof PRODUCTS)[number]; L: typeof t.TR }) {
  return (
    <article className="group bg-white border border-border hover:border-orange transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="relative h-48 bg-navy-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-75 transition-opacity"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581093458791-9d42e3c7f7e3?auto=format&fit=crop&w=800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-orange text-white text-xs font-display font-semibold uppercase tracking-wider px-2.5 py-1">
            {p.cat}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-white/70 text-xs uppercase tracking-wider font-medium mb-1">
            {p.sub}
          </div>
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
              <dd className="font-display text-navy text-base font-semibold">{p.fuel}</dd>
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

function TrustBar({ L }: { L: typeof t.TR }) {
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
