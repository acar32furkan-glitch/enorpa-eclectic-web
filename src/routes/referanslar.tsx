import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Star, Quote, MapPin, Globe, Factory } from "lucide-react";
import { generateHreflangTags, SITE } from "@/lib/seo";

const REFERENCES = [
  {
    name: "Özbekistan / Taşkent",
    sector: "Sera Isıtma",
    year: "2020",
    desc: "Taşkent'te sera ısıtma tesisatı kurulumu. Enorpa HAS Serisi kazanlar ile donatılan tesis, yüksek verimlilik sağlamaktadır.",
    icon: Globe,
  },
  {
    name: "Özbekistan / Harezm",
    sector: "Sera Isıtma",
    year: "2020",
    desc: "Harezm'de sera ısıtma tesisatı kurulumu. Sıcak iklim koşullarına uygun özel tasarım.",
    icon: Globe,
  },
  {
    name: "Türkiye / Manisa",
    sector: "Sanayi Buhar",
    year: "2019",
    desc: "Manisa'da buhar kazanı kurulumu. Sanayi tesisine özel buhar kazanı devreye alındı.",
    icon: Factory,
  },
  {
    name: "Türkiye / İzmir",
    sector: "Sera Isıtma",
    year: "2021",
    desc: "İzmir'de sera ısıtma tesisatı kurulumu. Seracılık sektörüne özel çözümler.",
    icon: MapPin,
  },
  {
    name: "Türkiye / Isparta",
    sector: "Orman Ürünleri Kurutma",
    year: "2022",
    desc: "Isparta'da orman ürünleri kurutma sistemi kurulumu. Enerji verimliliği odaklı tasarım.",
    icon: Factory,
  },
  {
    name: "Kazakistan / Almatı",
    sector: "Sera Isıtma",
    year: "2022",
    desc: "Almatı'da sera ısıtma tesisatı. Soğuk iklim koşullarına uygun özel çözümler.",
    icon: Globe,
  },
  {
    name: "Türkiye / Konya",
    sector: "Sera Isıtma",
    year: "2023",
    desc: "Konya'da sera ısıtma sistemi. HAS Serisi kazan ile yakıt tüketimi %30 azaltıldı.",
    icon: MapPin,
  },
  {
    name: "Türkiye / Antalya",
    sector: "Sera Isıtma",
    year: "2023",
    desc: "Antalya'da sera ısıtma sistemi. Jasper Serisi buhar jeneratörü ile üretim %20 artırıldı.",
    icon: MapPin,
  },
];

const testimonials = [
  {
    name: "Hasan Yılmaz",
    company: "Aktaş Tarım Ltd.Şti",
    location: "Konya, Türkiye",
    text: "Enorpa HAS Serisi kazan ile yakıt tüketimimiz %30 azaldı. Profesyonel ekip ve kaliteli ürün için teşekkürler.",
    rating: 5,
  },
  {
    name: "Mehmet Demir",
    company: "Demir Sera İşletmeleri",
    location: "Antalya, Türkiye",
    text: "Jasper Serisi buhar jeneratörü ile üretimimizi %20 artırdık. Enorpa ekibi çok ilgili ve profesyonel.",
    rating: 5,
  },
  {
    name: "Ali Kaya",
    company: "Kaya Gıda A.Ş.",
    location: "İzmir, Türkiye",
    text: "Kondenser sayesinde enerji tasarrufu sağladık. Kurulum hızlı, servis mükemmel.",
    rating: 5,
  },
  {
    name: "Fatma Öztürk",
    company: "Öztürk Tarım",
    location: "Bursa, Türkiye",
    text: "Anahtar teslim sera ısıtma sistemi ile zaman tasarrufu sağladık. Tavsiye ederim.",
    rating: 5,
  },
];

export const Route = createFileRoute("/referanslar")({
  head: () => ({
    meta: [
      { title: "Referanslar | Enorpa Enerji" },
      {
        name: "description",
        content: "Enorpa Enerji referansları. 26 ülkede 138+ proje, 347+ müşteri. Müşteri yorumları ve başarı hikayeleri.",
      },
      { property: "og:title", content: "Referanslar | Enorpa Enerji" },
      {
        property: "og:description",
        content: "Enorpa Enerji referansları. 26 ülkede 138+ proje, 347+ müşteri.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/referanslar" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Referanslar | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji referansları. 26 ülkede 138+ proje." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/referanslar" },
      ...generateHreflangTags("/referanslar"),
    ],
  }),
  component: ReferanslarPage,
});

function ReferanslarPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Referanslar" }]} />
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Referanslar
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Referanslarımız
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl">
            26 ülkede 138+ proje ve 347+ müşteriye hizmet vermekteyiz.
            İşte gerçekleştirdiğimiz referans projeler ve müşterilerimizin deneyimleri.
          </p>
        </div>

        {/* Referans Projeleri */}
        <div className="mb-16">
          <h2 className="font-display text-navy text-2xl font-bold uppercase mb-8">
            Referans Projelerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REFERENCES.map((ref, i) => {
              const Icon = ref.icon;
              return (
                <div key={i} className="bg-white border border-border p-6 hover:border-orange transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-orange/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-orange" />
                    </div>
                    <span className="text-xs text-muted-foreground">{ref.year}</span>
                  </div>
                  <h3 className="font-display text-navy font-bold uppercase text-sm mb-1">{ref.name}</h3>
                  <div className="text-xs text-orange font-medium mb-2">{ref.sector}</div>
                  <p className="text-sm text-muted-foreground">{ref.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-border p-6 text-center">
            <div className="text-4xl font-display font-bold text-orange mb-2">26</div>
            <div className="text-sm text-muted-foreground">Ülke</div>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <div className="text-4xl font-display font-bold text-orange mb-2">138+</div>
            <div className="text-sm text-muted-foreground">Proje</div>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <div className="text-4xl font-display font-bold text-orange mb-2">347+</div>
            <div className="text-sm text-muted-foreground">Müşteri</div>
          </div>
        </div>

        {/* Müşteri Yorumları */}
        <div className="mb-12">
          <h2 className="font-display text-navy text-2xl font-bold uppercase mb-8">
            Müşteri Yorumları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white border border-border p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-orange text-orange" />
                  ))}
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <Quote className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground italic">{testimonial.text}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-navy-dark text-white flex items-center justify-center font-display font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-navy">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.company} · {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy-dark text-white p-8 text-center">
          <h2 className="font-display text-2xl font-bold uppercase mb-4">
            Sıradaki Projeniz İçin Hazırız
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            25+ yıllık tecrübemiz ve 138+ başarılı projemizle
            tesisinizin ısıtma ihtiyacına en uygun çözümü sunalım.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
          >
            Teklif Alın
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
