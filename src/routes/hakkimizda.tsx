import { createFileRoute } from "@tanstack/react-router";
import { Award, Factory, BookOpen, Search, PenTool, Wrench, Users, Building2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { generateHreflangTags, SITE } from "@/lib/seo";

const HAKKIMIZDA_CONTENT = `<h1>İçimizdeki Ateş Toprağı Yeşertiyor</h1>
<h4>Buhar, sıcak su, sıcak hava, kızgın yağ sistemlerinin yanı sıra; akaryakıt tankları, yatay ve dikey basınçlı kaplar konusunda üretim, projelendirme ve taahhüt işleri yapmak amacıyla yola çıkan Enorpa bir çok farklı sektörün ısınma, depolama ve buhar ihtiyacını karşılamak üzere faaliyetlerini sürdürmektedir.</h4>
<p><strong>Dünya Standartlarında Üretim</strong></p>
<p>Enorpa Enerji, sıcak su, sıcak hava, buhar üretimi ve kurutma kazanları ile kat kaloriferleri konusunda geniş bir ürün yelpazesi sunmaktadır. Ürünlerimiz, müşterilerimize enerji verimliliği sağlayan modern teknolojilerle üretilmektedir. Firmanın ürünleri, uluslararası kabul görmüş standartlar olan TSE, CE, ASME ve EAC gibi sertifikalarla belgelenmektedir, bu da ürünlerimizin kalitesini ve güvenilirliğini garanti altına almaktadır. Enorpa Enerji, sektördeki uzmanlığı ve tecrübesiyle müşteri ihtiyaçlarına yönelik özelleştirilmiş çözümler sunarak güvenilir bir iş ortağı olmayı hedeflemektedir.</p>
<p><strong>Ar-Ge &amp; Ür-Ge</strong></p>
<p>Enorpa Enerji, AR-GE ve ÜR-GE çalışmalarına büyük önem veren bir firma olarak, sıcak su, sıcak hava, buhar üretimi ve kurutma kazanları ile kat kaloriferleri alanlarında sürekli yenilikçi çözümler geliştirmektedir. AR-GE departmanımız, mühendislik bilgisi ve endüstriyel deneyimiyle, enerji verimliliğini artırmak ve çevresel etkileri minimize etmek amacıyla yenilikçi tasarımlar ve çözümler üzerinde çalışmaktadır. ÜR-GE süreçlerimiz ise, müşteri ihtiyaçlarına yönelik özelleştirilmiş ürünler geliştirmek ve mevcut ürünlerimizin performansını sürekli olarak optimize etmek için stratejik bir yaklaşım benimsemektedir.</p>
<h2>Maksimum Verim</h2>
<p>Enorpa'nın ürün portföyünde bulunan buhar kazanları, sıcak su kazanları, sıcak hava kazanları (apareyleri), kızgın su kazanları, kızgın buhar kazanları, akaryakıt tankları, yatay ve dikey basınçlı kapların yanı sıra sadece sera ısıtmak için özel olarak dizayn edilmiş sektöre özgü sera ısıtma kazanları, sera ısıtma tesisat projelendirme hizmetleri bulunmaktadır. Seralarınız için en iyi projelendirme yapılarak; sizin için en stabil verimli uygulama hayata geçirilir.</p>
<h2>Kaliteli Ürünler, Mutlu Müşteriler</h2>
<p>Enorpa, halihazırda dünya coğrafyasının çeşitli lokasyonlarında bulunan ürünlerinin pazarlama aşamasından başlamak sureti ile arıza ve bakım kayıtlarına kadar günden güne artan bir veritabanına sahiptir. Enorpa bu veritabanının istatistiksel analizlerini yapmakta ve arıza faktörleri gibi müşteri memnuniyetsizliğine sebep olan durumları tespit edip minimize ederek "kaliteli ürünler, mutlu müşteriler" sloganına bağlı bir disiplin ile çalışmaktadır.</p>
<h2>Örnek Projelerimiz</h2>
<ul>
<li>Turkey/Isparta - Drying Forest Products</li>
<li>Uzbekistan/Tashkent - Greenhouse Heating</li>
<li>Kazakhstan/Almaty - Greenhouse Heating</li>
<li>Russia - Industrial Steam Boilers</li>
</ul>
<p>Enorpa, ısıtma kazanları, buhar kazanları, akaryakıt tankları ve sıcak hava kazanları gibi endüstriyel ısıtma ekipmanları üreten ve dünya genelinde müşterilerine çözüm sunan öncü bir firmadır. 25 yılı aşkın tecrübemizle, 26 ülkede 138+ projeyi hayata geçirdik.</p>`;

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
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hakkımızda | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji - 25+ yıllık tecrübe, TSE, CE, ASME sertifikalı üretim." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/hakkimizda" },
      ...generateHreflangTags("/hakkimizda"),
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
        </div>

        {/* WordPress İçeriği */}
        <div
          className="prose prose-lg max-w-none text-muted-foreground [&_h1]:text-navy [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:uppercase [&_h1]:mb-6 [&_h2]:text-navy [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:mt-8 [&_h2]:mb-4 [&_h4]:text-navy [&_h4]:font-semibold [&_h4]:text-lg [&_h4]:mb-4 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:text-navy [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2"
          dangerouslySetInnerHTML={{ __html: HAKKIMIZDA_CONTENT }}
        />

        {/* Sertifikalar */}
        <div className="mt-16">
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
