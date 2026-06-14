import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Menu,
  X,
  ArrowRight,
  MessageCircle,
  MapPin,
} from "lucide-react";

export type Lang = "TR" | "EN" | "RU";

type NavDict = {
  nav: readonly string[];
  quote: string;
};

const t: Record<Lang, NavDict> = {
  TR: { nav: ["Anasayfa", "Ürünler", "Hakkımızda", "Referanslar", "Belgeler", "İletişim"], quote: "Teklif Al" },
  EN: { nav: ["Home", "Products", "About", "References", "Documents", "Contact"], quote: "Get Quote" },
  RU: { nav: ["Главная", "Продукция", "О компании", "Проекты", "Документы", "Контакты"], quote: "Запросить цену" },
};

const WHATSAPP = "908504712100";

export function SiteHeader() {
  const [lang, setLang] = useState<Lang>("TR");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const L = t[lang];

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("enorpa_lang") : null;
    if (stored === "TR" || stored === "EN" || stored === "RU") {
      setLang(stored);
    }
  }, []);

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

  const getHref = (isIndex: number) => {
    if (isIndex === 0) return "/";
    if (isIndex === 1) return "/urunler";
    if (isIndex === 2) return "/hakkimizda";
    if (isIndex === 3) return "/#refs";
    if (isIndex === 4) return "/#docs";
    if (isIndex === 5) return "/#contact";
    return "#";
  };

  return (
    <>
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
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl font-bold text-navy tracking-tight">
              ENORPA
            </span>
            <span className="h-2 w-2 rounded-full bg-orange mt-2" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {L.nav.map((item, i) => (
              <a
                key={item}
                href={getHref(i)}
                className="font-sans text-sm font-medium text-navy-dark hover:text-orange transition-colors uppercase tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={getHref(5)}
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
              {L.nav.map((item, i) => (
                <a
                  key={item}
                  href={getHref(i)}
                  className="py-3 px-2 font-medium text-navy-dark hover:bg-steel border-b border-border last:border-0"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href={getHref(5)}
                className="mt-3 bg-orange text-white text-center font-display font-semibold uppercase tracking-wider py-3"
                onClick={() => setMenuOpen(false)}
              >
                {L.quote}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
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

        <FooterCol title="Ürünler" links={[{ label: "Ürünlerimiz", href: "/urunler" }]} />
        <FooterCol title="Kurumsal" links={[
          { label: "Hakkımızda", href: "/hakkimizda" },
          { label: "Referanslar", href: "/#refs" },
          { label: "Dokümanlar", href: "/#docs" },
          { label: "İletişim", href: "/#contact" },
        ]} />

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-orange font-display font-bold mb-4">
            Fabrika & İletişim
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
              <span>Sanayi Mah. 3231 Sk. No:12 · Merkez / ISPARTA</span>
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
            <a href="/gizlilik-politikasi" className="hover:text-white">Gizlilik</a>
            <a href="/kvkk" className="hover:text-white">KVKK</a>
            <a href="/cerez-politikasi" className="hover:text-white">Çerezler</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] text-orange font-display font-bold mb-4">
        {title}
      </div>
      <ul className="space-y-2 text-sm text-white/80">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="hover:text-orange transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}