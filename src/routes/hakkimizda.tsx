import { createFileRoute } from "@tanstack/react-router";
import { Award, Factory, BookOpen, Search, PenTool, Wrench, Users, Building2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/hakkimizda")({
  head: () => ({
    meta: [
      { title: "Hakkımızda | Enorpa Enerji" },
      {
        name: "description",
        content:
          "Enorpa Enerji - TSE, CE, ASME, EAC standartlarında endüstriyel ısıtma ekipmanları üreticisi. AR-GE odaklı, dünya çapında 347+ müşteriye hizmet.",
      },
      { property: "og:title", content: "Hakkımızda | Enorpa Enerji" },
      {
        property: "og:description",
        content:
          "Enorpa Enerji - TSE, CE, ASME, EAC standartlarında endüstriyel ısıtma ekipmanları üreticisi.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/hakkimizda" },
    ],
  }),
  component: HakkimizdaPage,
});

const CERTIFICATIONS = [
  {
    label: "TSE",
    sub: "Türk Standartları",
    image_url:
      "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/tse.png",
  },
  {
    label: "CE",
    sub: "European Conformity",
    image_url:
      "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/ce.png",
  },
  {
    label: "ASME",
    sub: "American Society",
    image_url:
      "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/asme.png",
  },
  {
    label: "EAC",
    sub: "Eurasian Conformity",
    image_url:
      "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/eac.png",
  },
  { label: "GOST", sub: "Rusya Standardı" },
];

const STEPS = [
  {
    icon: Search,
    title: "Keşif",
    desc: "Müşteri ihtiyaçlarının yerinde analizi, kapasite ve yakıt tipi belirleme.",
  },
  {
    icon: PenTool,
    title: "Projelendirme",
    desc: "3D modelleme ve mühendislik hesaplarıyla tesise özel kazan tasarımı.",
  },
  {
    icon: Wrench,
    title: "Montaj / Kurulum",
    desc: "Saha ekibimiz tarafından profesyonel montaj, devreye alma ve test süreci.",
  },
  {
    icon: Users,
    title: "Eğitim / Bakım",
    desc: "Operatör eğitimi, periyodik bakım ve ömür boyu yedek parça desteği.",
  },
];

function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Enorpa Enerji
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mt-2">
            Hakkımızda
          </h1>
          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            Enorpa, ısıtma kazanları, buhar kazanları, akaryakıt tankları ve sıcak hava kazanları
            gibi endüstriyel ısıtma ekipmanları üreten ve dünya genelinde müşterilerine çözüm sunan
            öncü bir firmadır.
          </p>
        </div>

        {/* Misyon & Vizyon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-steel border border-border p-8">
            <div className="h-10 w-10 bg-orange text-white flex items-center justify-center mb-4">
              <Award className="h-5 w-5" />
            </div>
            <h2 className="font-display text-navy text-2xl font-bold uppercase mb-3">Misyon</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sürdürülebilir enerji çözümleri sunarak endüstriyel süreçleri daha verimli hale
              getirmek ve müşterilere yenilikçi, güvenilir ve çevre dostu teknolojiler sağlamak.
            </p>
          </div>
          <div className="bg-steel border border-border p-8">
            <div className="h-10 w-10 bg-orange text-white flex items-center justify-center mb-4">
              <Factory className="h-5 w-5" />
            </div>
            <h2 className="font-display text-navy text-2xl font-bold uppercase mb-3">Vizyon</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dünya çapında enerji alanında dönüşüme liderlik ederek ileri teknoloji ve
              sürdürülebilir çözümlerle müşterilere değer katmak.
            </p>
          </div>
        </div>

        {/* AR-GE & ÜR-GE */}
        <div className="bg-navy text-white p-8 md:p-10 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-orange flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="font-display text-white text-2xl font-bold uppercase">AR-GE & ÜR-GE</h2>
          </div>
          <p className="text-white/80 text-sm leading-relaxed max-w-4xl">
            AR-GE departmanımız enerji verimliliğini artırmak ve çevresel etkiyi azaltmak için
            yenilikçi tasarımlar geliştirir. ÜR-GE süreçlerimiz müşteri ihtiyaçlarına özel ürünler
            ve sürekli performans optimizasyonu sağlar.
          </p>
        </div>

        {/* Sertifikalar */}
        <div className="mb-16">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Standartlar & Sertifikalar
          </div>
          <p className="text-muted-foreground text-sm mt-4 mb-6">
            Ürünlerimiz TSE, CE, ASME, EAC ve GOST standartlarına uygun üretilmektedir. Rusya, BDT
            ülkeleri ve Amerika pazarları için gerekli tüm sertifikasyonlara sahibiz.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c.label} className="bg-steel border border-border p-6 text-center">
                {c.image_url ? (
                  <img
                    src={c.image_url}
                    alt={c.label}
                    width="96"
                    height="96"
                    loading="lazy"
                    className="h-12 w-12 object-contain mx-auto mb-3"
                  />
                ) : (
                  <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center bg-navy text-white font-display font-bold text-lg">
                    {c.label}
                  </div>
                )}
                <div className="font-display text-navy text-lg font-bold uppercase">{c.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Süreç Adımları */}
        <div>
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Çalışma Sürecimiz
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="bg-white border border-border p-6 relative">
                <div className="absolute -top-3 -left-3 h-8 w-8 bg-orange text-white flex items-center justify-center font-display font-bold text-sm">
                  {i + 1}
                </div>
                <div className="h-10 w-10 bg-steel text-navy flex items-center justify-center mb-3 mt-1">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-navy text-lg font-bold uppercase mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Üretim Tesisi */}
        <div className="mt-16">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            3 Üretim Tesisi
          </div>
          <p className="text-muted-foreground text-sm mt-4 mb-6 max-w-4xl">
            Isparta'daki iki fabrikamız ve Karaman'daki modern üretim tesisimizle toplam 3 üretim
            merkezinde kesintisiz üretim kapasitesine sahibiz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FactoryCard
              title="Fabrika 1 — Merkez Ofis"
              address="Sanayi Mah. 3231 Sk. No:12 Merkez / ISPARTA"
            />
            <FactoryCard
              title="Fabrika 2 — Isparta OSB"
              address="Vatan OSB Mah. 304. Cad. No:12 Merkez / ISPARTA"
            />
            <FactoryCard
              title="Fabrika 3 — Karaman OSB"
              address="OSB Mah. 17. Cad. No:49 Merkez / KARAMAN (2024'te açıldı)"
            />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function FactoryCard({ title, address }: { title: string; address: string }) {
  return (
    <div className="bg-white border border-border p-5">
      <div className="flex items-start gap-3 mb-3">
        <Building2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
        <h4 className="font-display text-navy font-bold uppercase">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{address}</p>
      <span className="inline-block mt-3 bg-orange text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1">
        Aktif Üretim
      </span>
    </div>
  );
}
