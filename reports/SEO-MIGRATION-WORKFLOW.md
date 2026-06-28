# ENORPA.COM SEO MİGRASYON: SİSTEMATİK İŞ AKIŞ REHBERİ

**Versiyon**: 2.0  
**Tarih**: 28 Haziran 2026  
**Amaç**: Eski enorpa.com (WordPress) → Yeni TanStack Start site geçişini **sıfır trafik kaybı** ile gerçekleştirmek  
**Yöntim**: Modüler, paralel çalışabilir, her bağımsız olarak test edilebilir fazlar

---

## MİGRASYON FELSEFESİ

```
1. Önce İçerik → Sonra Yönlendirme → Sonra SEO → Sonra Canlı
2. Her modül bağımsız test edilebilir
3. Her adım geri alınabilir
4. Hiçbir anda "kırılma" olmaz
```

---

## PROJE YAPISI

```
enorpa-eclectic-web/
├── src/
│   ├── routes/                    # Sayfa route'ları
│   │   ├── __root.tsx            # Root layout (tüm SEO burada)
│   │   ├── index.tsx             # Anasayfa
│   │   ├── urunler/              # Ürün route'ları
│   │   ├── blog/                 # Blog route'ları
│   │   ├── iletisim.tsx          # İletişim
│   │   ├── hakkimizda.tsx        # Hakkımızda
│   │   ├── projeler.tsx          # ★ YENİ - Projeler
│   │   ├── referanslar.tsx       # ★ YENİ - Referanslar
│   │   ├── kvkk.tsx              # KVKK
│   │   ├── gizlilik-politikasi.tsx
│   │   └── cerez-politikasi.tsx
│   ├── components/
│   │   ├── SiteHeader.tsx        # Navigasyon (Blog linki geri eklenecek)
│   │   ├── SeoHead.tsx           # ★ YENİ - Reusable SEO bileşeni
│   │   └── Breadcrumbs.tsx       # ★ YENİ - Breadcrumb + schema
│   ├── lib/
│   │   ├── seo.ts                # ★ YENİ - SEO utility fonksiyonları
│   │   └── cleanContent.ts       # ★ YENİ - Merkezi içerik temizleme
│   └── data/
│       └── products.ts           # Ürün verileri (Jasper eklenecek)
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── vercel.json                    # ★ YENİ - Redirect + headers
└── reports/
    └── SEO-MIGRATION-GUIDE.md     # Analiz rehberi
```

---

## MODÜL 1: TEMEL SEO ALTYAPISI

### 1.1 — `src/lib/seo.ts` (Yeni Dosya)

Merkezi SEO utility fonksiyonları. Tüm sayfalar bu fonksiyonları kullanır.

```typescript
// src/lib/seo.ts

export const SITE = {
  name: "Enorpa Enerji",
  url: "https://enorpa.com",
  logo: "https://enorpa.com/favicon.ico",
  phone: "+908504712100",
  email: "turuncu@enorpa.com",
  instagram: "https://instagram.com/enorpaenerji",
  defaultOgImage: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/logo.png",
};

export interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  ogLocale?: string;
  twitterCard?: string;
  noIndex?: boolean;
  structuredData?: object[];
}

export function generateHeadTags(config: SeoConfig) {
  const meta: any[] = [
    { title: config.title },
    { name: "description", content: config.description },
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "og:type", content: config.ogType || "website" },
    { property: "og:image", content: config.ogImage || SITE.defaultOgImage },
    { property: "og:url", content: config.canonical },
    { property: "og:locale", content: config.ogLocale || "tr_TR" },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: config.twitterCard || "summary_large_image" },
    { name: "twitter:title", content: config.title },
    { name: "twitter:description", content: config.description },
    { name: "twitter:image", content: config.ogImage || SITE.defaultOgImage },
    { name: "twitter:site", content: "@enorpaenerji" },
  ];

  if (config.noIndex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  const links = [
    { rel: "canonical", href: config.canonical },
  ];

  const scripts = config.structuredData?.map((data) => ({
    type: "application/ld+json",
    children: JSON.stringify(data),
  })) || [];

  return { meta, links, scripts };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${SITE.url}/urunler/${product.slug}`,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@type": "Organization", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/urunler/${product.slug}`,
    },
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sanayi Mah. 3231 Sk. No:12",
      addressLocality: "Isparta",
      addressCountry: "TR",
    },
    openingHours: "Mo-Fr 08:00-18:00",
    sameAs: [SITE.instagram],
  };
}
```

**Test**: `src/lib/seo.ts` oluşturulduktan sonra bir route'da import edilip kullanılmalı.

---

### 1.2 — `src/lib/cleanContent.ts` (Yeni Dosya)

Tüm içerik temizleme fonksiyonları merkezi bir yerde. Blog ve ürün sayfaları bunu kullanır.

```typescript
// src/lib/cleanContent.ts

export function cleanContent(html: string): string {
  if (!html) return "";
  
  let result = html;
  
  // WordPress shortcode'ları temizle
  result = result
    .replace(/\[vc_[^\]]*\]?/g, '')
    .replace(/\[\/vc_[^\]]*\]?/g, '')
    .replace(/\[[^\]]*\]?/g, '');
  
  // HTML entity'leri decode et
  result = result
    .replace(/&#8221;|&#8220;/g, '"')
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8230;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#[0-9]+;/g, '')
    .replace(/&[a-z]+;/g, '');
  
  // Data attribute'ları temizle
  result = result
    .replace(/\s*data-\w+="[^"]*"/g, '')
    .replace(/\s*data-\w+='[^']*'/g, '');
  
  // Boş HTML tag'leri temizle
  result = result
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<h[1-6]>\s*<\/h[1-6]>/g, '')
    .replace(/<div>\s*<\/div>/g, '');
  
  // Lorem ipsum temizle
  result = result.replace(/Lorem ipsum[\s\S]*?(?=<|$)/g, '');
  
  // Fazla boşlukları temizle
  result = result
    .replace(/\n{3,}/g, '\n\n')
    .replace(/  +/g, ' ')
    .trim();
  
  return result;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
  const cleaned = cleanContent(content);
  const text = stripHtml(cleaned);
  
  if (text.length <= maxLength) return text;
  
  // Kelime ortasında kesme
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';
}
```

**Test**: Blog ve ürün sayfalarında `cleanContent` import edilip kullanılmalı.

---

### 1.3 — `src/components/SeoHead.tsx` (Yeni Bileşen)

Reusable SEO head bileşeni. Her sayfada kullanılabilir.

```tsx
// src/components/SeoHead.tsx
import { generateHeadTags } from "@/lib/seo";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
  structuredData?: object[];
}

export function SeoHead(props: SeoHeadProps) {
  const { meta, links, scripts } = generateHeadTags(props);
  
  return (
    <>
      {meta.map((tag, i) => (
        <meta key={i} {...tag} />
      ))}
      {links.map((link, i) => (
        <link key={i} {...link} />
      ))}
      {scripts.map((script, i) => (
        <script key={i} type={script.type}>
          {script.children}
        </script>
      ))}
    </>
  );
}
```

---

### 1.4 — `src/components/Breadcrumbs.tsx` (Yeni Bileşen)

Breadcrumb navigation + JSON-LD schema.

```tsx
// src/components/Breadcrumbs.tsx
import { Link } from "@tanstack/react-router";
import { generateBreadcrumbSchema, SITE } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { name: "Anasayfa", href: "/" },
    ...items,
  ];

  const schema = generateBreadcrumbSchema(
    allItems.map((item) => ({
      name: item.name,
      url: item.href ? `${SITE.url}${item.href}` : SITE.url,
    }))
  );

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-2">
          {allItems.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {item.href ? (
                <Link to={item.href} className="hover:text-orange transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-navy font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

---

## MODÜL 1.5: DİL YAPISI VE HREFLANG (Kritik)

### 1.5.1 — Eski Sitenin Dil Yapısı

| Dil | Eski Prefix | Indexable Sayfa | Inlink |
|-----|------------|-----------------|--------|
| TR | `/tr/` | ~80 | 80 |
| EN | `/en/` | ~30 | 133 |
| RU | `/ru/` | ~20 | 133 |

Eski sitede her dil için ayrı URL yapısı var:
- `https://enorpa.com/tr/hakkimizda/`
- `https://enorpa.com/en/about/`
- `https://enorpa.com/ru/o-kompanii/`

### 1.5.2 — Yeni Site İçin Dil Stratejisi

**3 seçenek var:**

| Seçenek | Yöntem | SEO Etkisi | Efor | Öneri |
|---------|--------|-----------|------|-------|
| **A: TR-only + redirect** | Tüm `/en/*` ve `/ru/*` → `/` | 🟡 EN/RU trafik kaybı | Düşük | Kısa vadede |
| **B: i18n alt dizin** | `/en/`, `/ru/` ayrı sayfalar | ✅ hreflang ile korunur | Orta | **Önerilen** |
| **C: i18n + çeviri** | Supabase'de çeviri içerik | ✅ En iyi SEO | Yüksek | Uzun vadede |

**Önerilen: Seçenek B** — i18n alt dizin yapısı

### 1.5.3 — i18n Alt Dizin Yapısı

```
src/routes/
├── index.tsx          # TR anasayfa (mevcut)
├── en/
│   ├── index.tsx      # EN anasayfa
│   ├── products.tsx   # EN ürünler
│   ├── contact.tsx    # EN iletişim
│   └── about.tsx      # EN hakkımızda
├── ru/
│   ├── index.tsx      # RU anasayfa
│   ├── products.tsx   # RU ürünler
│   ├── contact.tsx    # RU iletişim
│   └── about.tsx      # RU hakkımızda
├── urunler/            # TR ürünler (mevcut)
├── blog/              # TR blog (mevcut)
└── iletisim.tsx       # TR iletişim (mevcut)
```

### 1.5.4 — Hreflang Yapılandırması

Her sayfada `<head>` içinde hreflang etiketleri:

```typescript
// src/lib/seo.ts'a ekle:
export function generateHreflangTags(currentLang: string, currentPath: string) {
  const languages = [
    { code: "tr", url: `https://enorpa.com${currentPath}` },
    { code: "en", url: `https://enorpa.com/en${currentPath}` },
    { code: "ru", url: `https://enorpa.com/ru${currentPath}` },
    { code: "x-default", url: `https://enorpa.com${currentPath}` },
  ];

  return languages.map((lang) => ({
    rel: "alternate",
    hrefLang: lang.code,
    href: lang.url,
  }));
}
```

### 1.5.5 — Dil Anahtarı (Language Switcher)

SiteHeader'da dil değiştirme:

```typescript
// src/components/SiteHeader.tsx'te:
const languageNames = {
  TR: "Türkçe",
  EN: "English",
  RU: "Русский",
};

const languageFlags = {
  TR: "🇹🇷",
  EN: "🇬🇧",
  RU: "🇷🇺",
};

// Mevcut dil değiştirme butonunu güncelle:
{(["TR", "EN", "RU"] as Lang[]).map((code, i) => (
  <button
    key={code}
    onClick={() => changeLanguage(code)}
    className={`px-1.5 py-0.5 transition-colors ${
      lang === code ? "text-orange font-bold" : "text-white/70 hover:text-white"
    }`}
  >
    {languageFlags[code]}
  </button>
))}
```

### 1.5.6 — Dil Değiştirme Mantığı

```typescript
// src/lib/i18n.ts (Yeni dosya)
export type SupportedLang = "tr" | "en" | "ru";

export const defaultLang: SupportedLang = "tr";

export function getLangFromPath(pathname: string): SupportedLang {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ru")) return "ru";
  return "tr";
}

export function getPathForLang(pathname: string, targetLang: SupportedLang): string {
  // Mevcut prefix'i kaldır
  let cleanPath = pathname.replace(/^\/en/, "").replace(/^\/ru/, "");
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
  
  // Yeni prefix ekle
  if (targetLang === "tr") return cleanPath;
  return `/${targetLang}${cleanPath}`;
}

export function changeLanguage(lang: SupportedLang) {
  const currentPath = window.location.pathname;
  const newPath = getPathForLang(currentPath, lang);
  localStorage.setItem("enorpa_lang", lang);
  window.location.href = newPath;
}
```

### 1.5.7 — Redirect Kuralları (Dil için)

`vercel.json`'a ekle:

```json
{
  "redirects": [
    { "source": "/en/", "destination": "/en", "statusCode": 301 },
    { "source": "/ru/", "destination": "/ru", "statusCode": 301 },
    { "source": "/tr/", "destination": "/", "statusCode": 301 },
    { "source": "/tr/(.*)", "destination": "/$1", "statusCode": 301 },
    { "source": "/en/(.*)", "destination": "/en/$1", "statusCode": 301 },
    { "source": "/ru/(.*)", "destination": "/ru/$1", "statusCode": 301 }
  ]
}
```

### 1.5.8 — Hreflang Test

```bash
# TR sayfası
curl -s https://enorpa.com/ | grep -i "hreflang"

# EN sayfası
curl -s https://enorpa.com/en | grep -i "hreflang"

# RU sayfası
curl -s https://enorpa.com/ru | grep -i "hreflang"
```

Beklenen çıktı:
```html
<link rel="alternate" hreflang="tr" href="https://enorpa.com/">
<link rel="alternate" hreflang="en" href="https://enorpa.com/en">
<link rel="alternate" hreflang="ru" href="https://enorpa.com/ru">
<link rel="alternate" hreflang="x-default" href="https://enorpa.com/">
```

---

## MODÜL 2: İÇERİK TAMAMLAMA

### 2.1 — Jasper Serisi Ürünü Ekleme

**Dosya**: `src/data/products.ts`

`productCategories` dizisinin "sicak-su" kategorisine ekle:

```typescript
{
  id: "sicak-su",
  title: "Sıcak Su Kazanları",
  products: [
    // ... mevcut ürünler ...
    {
      name: "Jasper Serisi",
      type: "Sıvı-Gaz Yakıtlı Buhar Jeneratörü",
      capacity: "349 kW – 2.093 kW",
      detail: "Sıvı – Gaz Yakıtlı, Su Borulu Serpantinli, 3 Geçişli, CE Belgeli, TS – 12952 ve 2014/68/EU Basınçlı Kaplar Direktifine Uygun. Buhar seperatörü sayesinde %96 kurulukta buhar üretir. 2 ila 5 dakika arasında buhar üreterek prosese iletir.",
      specs: {
        yakit: "Sıvı-Gaz Yakıtlar",
        standart: "CE Belgeli; TS – 12952 ve 2014/68/EU",
        cikisSicakligi: "%91'e Varan Termal Verim",
      },
      featured: true,
    },
  ],
},
```

**Supabase'e SQL ile ekleme** (products tablosuna):

```sql
INSERT INTO products (name, type, category, capacity, detail, specs, featured, sort_order, slug)
VALUES (
  'Jasper Serisi',
  'Sıvı-Gaz Yakıtlı Buhar Jeneratörü',
  'sicak-su',
  '349 kW – 2.093 kW',
  'Sıvı – Gaz Yakıtlı, Su Borulu Serpantinli, 3 Geçişli, CE Belgeli. Buhar seperatörü sayesinde %96 kurulukta buhar üretir.',
  '{"yakit":"Sıvı-Gaz Yakıtlar","standart":"CE Belgeli; TS – 12952 ve 2014/68/EU"}',
  true,
  100,
  'jasper-serisi'
);
```

---

### 2.2 — Projeler Sayfası

**Yeni dosya**: `src/routes/projeler.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SeoHead } from "@/components/SeoHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin } from "lucide-react";

const projects = [
  {
    title: "Özbekistan/Taşkent — Sera Isıtma Tesisatı",
    description: "Taşkent'te sera ısıtma tesisatı kurulumu.",
    location: "Özbekistan, Taşkent",
  },
  {
    title: "Özbekistan/Harezm — Sera Isıtma Tesisatı",
    description: "Harezm'de sera ısıtma tesisatı kurulumu.",
    location: "Özbekistan, Harezm",
  },
  {
    title: "Türkiye/Manisa — Buhar Kazanı Kurulumu",
    description: "Manisa'da buhar kazanı kurulumu.",
    location: "Türkiye, Manisa",
  },
  {
    title: "Türkiye/İzmir — Sera Isıtma Tesisatı",
    description: "İzmir'de sera ısıtma tesisatı kurulumu.",
    location: "Türkiye, İzmir",
  },
  {
    title: "Türkiye/Isparta — Orman Ürünlerinin Kurutulması",
    description: "Isparta'da orman ürünleri kurutma sistemi.",
    location: "Türkiye, Isparta",
  },
];

export const Route = createFileRoute("/projeler")({
  head: () => ({
    ...SeoHead({
      title: "Projeler | Enorpa Enerji",
      description: "Enorpa Enerji projeleri. Özbekistan, Türkiye ve dünya genelinde sera ısıtma, buhar kazanı ve kurutma projeleri.",
      canonical: "https://enorpa.com/projeler",
      ogType: "website",
    }),
    links: [{ rel: "canonical", href: "https://enorpa.com/projeler" }],
  }),
  component: ProjelerPage,
});

function ProjelerPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Projeler" }]} />
        <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mb-12">
          Projelerimiz
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="bg-white border border-border p-6">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-navy font-bold uppercase">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
```

---

### 2.3 — Referanslar Sayfası

**Yeni dosya**: `src/routes/referanslar.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SeoHead } from "@/components/SeoHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/referanslar")({
  head: () => ({
    ...SeoHead({
      title: "Referanslar | Enorpa Enerji",
      description: "Enorpa Enerji referansları. 26 ülkede 138+ proje, 347+ müşteri.",
      canonical: "https://enorpa.com/referanslar",
      ogType: "website",
    }),
    links: [{ rel: "canonical", href: "https://enorpa.com/referanslar" }],
  }),
  component: ReferanslarPage,
});

function ReferanslarPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Referanslar" }]} />
        <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mb-12">
          Referanslarımız
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
      <SiteFooter />
    </div>
  );
}
```

---

### 2.4 — Blog Nav Linkini Geri Ekleme

**Dosya**: `src/components/SiteHeader.tsx`

`getHref` fonksiyonunu güncelle:

```typescript
const getHref = (isIndex: number) => {
  if (isIndex === 0) return "/";
  if (isIndex === 1) return "/urunler";
  if (isIndex === 2) return "/hakkimizda";
  if (isIndex === 3) return "/blog";
  if (isIndex === 4) return "/projeler";
  if (isIndex === 5) return "/referanslar";
  if (isIndex === 6) return "/iletisim";
  return "#";
};
```

TR nav array'ine "Blog" ekle:

```typescript
TR: { nav: ["Anasayfa", "Ürünler", "Hakkımızda", "Blog", "Projeler", "Referanslar", "İletişim"], quote: "Teklif Al" },
EN: { nav: ["Home", "Products", "About", "Blog", "Projects", "References", "Contact"], quote: "Get Quote" },
RU: { nav: ["Главная", "Продукция", "О компании", "Блог", "Проекты", "Проекты", "Контакты"], quote: "Запросить цену" },
```

---

## MODÜL 3: 301 YÖNLENDİRME

### 3.1 — `vercel.json` (Yeni Dosya)

```json
{
  "redirects": [
    { "source": "/tr/", "destination": "/", "statusCode": 301 },
    { "source": "/en/", "destination": "/", "statusCode": 301 },
    { "source": "/ru/", "destination": "/", "statusCode": 301 },
    { "source": "/tr/hakkimizda/", "destination": "/hakkimizda", "statusCode": 301 },
    { "source": "/tr/iletisim/", "destination": "/iletisim", "statusCode": 301 },
    { "source": "/tr/urunler/", "destination": "/urunler", "statusCode": 301 },
    { "source": "/tr/projeler/", "destination": "/projeler", "statusCode": 301 },
    { "source": "/tr/referanslarimiz/", "destination": "/referanslar", "statusCode": 301 },
    { "source": "/tr/jasper-serisi/", "destination": "/urunler/jasper-serisi", "statusCode": 301 },
    { "source": "/tr/sicak-hava-kazanlari/", "destination": "/urunler", "statusCode": 301 },
    { "source": "/tr/sicak-su-kazanlari/", "destination": "/urunler", "statusCode": 301 },
    { "source": "/tr/buhar-kazanlari/", "destination": "/urunler", "statusCode": 301 },
    { "source": "/tr/kizgin-su-kazanlari/", "destination": "/urunler", "statusCode": 301 },
    { "source": "/tr/blog-2/", "destination": "/blog", "statusCode": 301 },
    { "source": "/tr/blog-2/(.*)", "destination": "/blog/$1", "statusCode": 301 },
    { "source": "/tr/neden-enorpa/", "destination": "/blog/neden-enorpa", "statusCode": 301 },
    { "source": "/tr/has-serisi/", "destination": "/urunler/has-serisi", "statusCode": 301 },
    { "source": "/tr/has-ng-serisi/", "destination": "/urunler/has-ng-serisi", "statusCode": 301 },
    { "source": "/tr/has-turbo-serisi/", "destination": "/urunler/has-turbo-serisi", "statusCode": 301 },
    { "source": "/tr/akuamarin-serisi/", "destination": "/urunler/akuamarin-serisi", "statusCode": 301 },
    { "source": "/tr/ametist-serisi/", "destination": "/urunler/ametist-serisi", "statusCode": 301 },
    { "source": "/tr/turkuaz-serisi/", "destination": "/urunler/turkuaz-serisi", "statusCode": 301 },
    { "source": "/tr/kalsedon-serisi/", "destination": "/urunler/kalsedon-serisi", "statusCode": 301 },
    { "source": "/tr/obsidyen-serisi/", "destination": "/urunler/obsidyen-serisi", "statusCode": 301 },
    { "source": "/tr/kuvars-serisi-tek-kulhanli/", "destination": "/urunler/kuvars-serisi-tek-kulhanli", "statusCode": 301 },
    { "source": "/tr/kuvars-serisi-cift-kulhanli/", "destination": "/urunler/kuvars-serisi-cift-kulhanli", "statusCode": 301 },
    { "source": "/tr/kuvars-ng-serisi/", "destination": "/urunler/kuvars-ng-serisi", "statusCode": 301 },
    { "source": "/tr/turmalin-serisi/", "destination": "/urunler/turmalin-serisi", "statusCode": 301 },
    { "source": "/tr/akuamarin-ks-serisi/", "destination": "/urunler/akuamarin-ks-serisi", "statusCode": 301 },
    { "source": "/tr/turkuaz-ks-serisi/", "destination": "/urunler/turkuaz-ks-serisi", "statusCode": 301 },
    { "source": "/tr/oniks-serisi/", "destination": "/urunler/oniks-serisi", "statusCode": 301 },
    { "source": "/tr/kat-kaloriferi/", "destination": "/urunler/kat-kaloriferi", "statusCode": 301 },
    { "source": "/tr/anahtar-teslim-sera-isitma-sistemi/", "destination": "/urunler/anahtar-teslim-sera-isitma-sistemi", "statusCode": 301 },
    { "source": "/tr/brulorler/", "destination": "/urunler/brulorler", "statusCode": 301 },
    { "source": "/tr/baca/", "destination": "/urunler/baca", "statusCode": 301 },
    { "source": "/tr/kondenser/", "destination": "/urunler/kondenser", "statusCode": 301 },
    { "source": "/tr/ekonomizer/", "destination": "/urunler/ekonomizer", "statusCode": 301 },
    { "source": "/tr/kazan-otomasyon-sistemi/", "destination": "/urunler/kazan-otomasyon-sistemi", "statusCode": 301 },
    { "source": "/tr/kazan-kontrol-panosu/", "destination": "/urunler/kazan-kontrol-panosu", "statusCode": 301 },
    { "source": "/tr/yedek-parca/", "destination": "/urunler/yedek-parca", "statusCode": 301 },
    { "source": "/en/(.*)", "destination": "/", "statusCode": 301 },
    { "source": "/ru/(.*)", "destination": "/", "statusCode": 301 }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

## MODÜL 4: SAYFA SEO GÜNCELLEMELERİ

### 4.1 — Blog Detay Sayfası

**Dosya**: `src/routes/blog.$slug.tsx`

`head` fonksiyonunu güncelle:

```typescript
head: ({ params }) => {
  const post = Route.useLoaderData() as BlogPost | null;
  return {
    meta: [
      { title: `${post?.title || params.slug} | Enorpa Blog` },
      { name: "description", content: post?.excerpt?.slice(0, 155) || "Blog yazısı" },
      { property: "og:title", content: `${post?.title || params.slug} | Enorpa Blog` },
      { property: "og:description", content: post?.excerpt?.slice(0, 155) || "Blog yazısı" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: post?.featured_image_url || SITE.defaultOgImage },
      { property: "og:url", content: `https://enorpa.com/blog/${params.slug}` },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${post?.title || params.slug} | Enorpa Blog` },
      { name: "twitter:description", content: post?.excerpt?.slice(0, 155) || "Blog yazısı" },
      { name: "twitter:image", content: post?.featured_image_url || SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: `https://enorpa.com/blog/${params.slug}` },
    ],
    scripts: post ? [generateBlogPostSchema({
      title: post.title,
      excerpt: post.excerpt,
      image: post.featured_image_url,
      slug: params.slug,
      publishedAt: post.published_at,
    })] : [],
  };
}
```

---

### 4.2 — Ürün Detay Sayfası

**Dosya**: `src/routes/urunler.$slug.tsx`

`head` fonksiyonunu güncelle:

```typescript
head: ({ params }) => {
  const product = Route.useLoaderData() as Product | null;
  return {
    meta: [
      { title: `${product?.name || params.slug} | Enorpa Enerji` },
      { name: "description", content: product?.detail?.slice(0, 155) || `${product?.name} - Enorpa Enerji ürün kataloğu` },
      { property: "og:title", content: `${product?.name || params.slug} | Enorpa Enerji` },
      { property: "og:description", content: product?.detail?.slice(0, 155) || `${product?.name} - Enorpa Enerji ürün kataloğu` },
      { property: "og:type", content: "product" },
      { property: "og:image", content: product?.image_url || SITE.defaultOgImage },
      { property: "og:url", content: `https://enorpa.com/urunler/${params.slug}` },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${product?.name || params.slug} | Enorpa Enerji` },
      { name: "twitter:description", content: product?.detail?.slice(0, 155) || "" },
      { name: "twitter:image", content: product?.image_url || SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: `https://enorpa.com/urunler/${params.slug}` },
    ],
    scripts: product ? [generateProductSchema({
      name: product.name,
      description: product.detail || product.type,
      image: product.image_url,
      slug: params.slug,
    })] : [],
  };
}
```

---

### 4.3 — İletişim Sayfasına LocalBusiness Schema

**Dosya**: `src/routes/iletisim.tsx`

`head` fonksiyonuna ekle:

```typescript
scripts: [generateLocalBusinessSchema()]
```

---

## MODÜL 5: SITEMAP, ROBOTS VE HREFLANG

### 5.1 — `public/sitemap.xml`

Tüm URL'leri güncelle. Her ürün, blog post, yeni sayfalar dahil.

**Örnek sitemap yapısı** (i18n ile):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- TR Sayfaları -->
  <url>
    <loc>https://enorpa.com/</loc>
    <lastmod>2026-06-28</lastmod>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
    <xhtml:link rel="alternate" hreflang="tr" href="https://enorpa.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://enorpa.com/en"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://enorpa.com/ru"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://enorpa.com/"/>
  </url>
  <url>
    <loc>https://enorpa.com/urunler</loc>
    <lastmod>2026-06-28</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
    <xhtml:link rel="alternate" hreflang="tr" href="https://enorpa.com/urunler"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://enorpa.com/en/products"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://enorpa.com/ru/products"/>
  </url>
  <!-- EN Sayfaları -->
  <url>
    <loc>https://enorpa.com/en</loc>
    <lastmod>2026-06-28</lastmod>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
    <xhtml:link rel="alternate" hreflang="tr" href="https://enorpa.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://enorpa.com/en"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://enorpa.com/ru"/>
  </url>
  <!-- RU Sayfaları -->
  <url>
    <loc>https://enorpa.com/ru</loc>
    <lastmod>2026-06-28</lastmod>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
    <xhtml:link rel="alternate" hreflang="tr" href="https://enorpa.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://enorpa.com/en"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://enorpa.com/ru"/>
  </url>
  <!-- Ürün Detayları -->
  <url>
    <loc>https://enorpa.com/urunler/has-serisi</loc>
    <lastmod>2026-06-28</lastmod>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
    <xhtml:link rel="alternate" hreflang="tr" href="https://enorpa.com/urunler/has-serisi"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://enorpa.com/en/products/has-series"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://enorpa.com/ru/products/has-series"/>
  </url>
  <!-- ... diğer ürünler ... -->
</urlset>
```

### 5.2 — `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*

Sitemap: https://enorpa.com/sitemap.xml
```

---

## MODÜL 6: CANLI ÖNCESİ TEST

### 6.1 — Redirect Test Script'i

```bash
#!/bin/bash
# test-redirects.sh

URLS=(
  "/tr/"
  "/en/"
  "/ru/"
  "/tr/hakkimizda/"
  "/tr/iletisim/"
  "/tr/urunler/"
  "/tr/projeler/"
  "/tr/referanslarimiz/"
  "/tr/jasper-serisi/"
  "/tr/blog-2/"
  "/tr/has-serisi/"
  "/en/products/"
  "/en/has-series-hot-air-boilers/"
)

for url in "${URLS[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" -L "https://enorpa.com${url}")
  location=$(curl -s -I -L "https://enorpa.com${url}" | grep -i "location:" | head -1)
  echo "$url → $status | $location"
done
```

### 6.2 — SEO Test Checklist

| Test | Araç | Beklenen Sonuç |
|------|------|---------------|
| Redirect'ler | `curl -I` | 301 + doğru Location |
| Canonical | Sayfa kaynağı | Her sayfada self-referencing |
| og:image | Facebook Debugger | Image URL görünüyor |
| Schema | Google Rich Results Test | Hata yok |
| Mobile | Mobile-Friendly Test | Mobile friendly |
| Hız | PageSpeed Insights | 90+ puan |
| Sitemap | `https://enorpa.com/sitemap.xml` | Tüm URL'ler var |
| Robots | `https://enorpa.com/robots.txt` | Admin blocked |

---

## İŞ AKIŞ SIRASI

```
┌─────────────────────────────────────────────────────────────┐
│  FAZ 1: ALTYAPI (Paralel çalışabilir)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 1.1   │  │ Modül 1.2    │  │ Modül 1.3        │   │
│  │ seo.ts      │  │ cleanContent │  │ SeoHead.tsx      │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 1.4   │  │ Modül 1.5    │  │ Modül 1.6        │   │
│  │ Breadcrumbs │  │ Dil/i18n     │  │ Blog nav         │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FAZ 2: İÇERİK (Paralel çalışabilir)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 2.1   │  │ Modül 2.2    │  │ Modül 2.3        │   │
│  │ Jasper      │  │ Projeler     │  │ Referanslar      │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FAZ 3: SEO GÜNCELLEME                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 4.1   │  │ Modül 4.2    │  │ Modül 4.3        │   │
│  │ Blog head   │  │ Ürün head    │  │ İletişim schema  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FAZ 4: YÖNLENDİRME                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 3.1   │  │ Modül 5.1    │  │ Modül 5.2        │   │
│  │ vercel.json │  │ sitemap.xml  │  │ robots.txt       │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FAZ 5: TEST VE CANLI                                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 6.1   │  │ Modül 6.2    │  │ GSC Migrasyonu   │   │
│  │ Redirect    │  │ SEO test     │  │                  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## MODÜL 1.7: BLOG SLUG EŞLEŞTİRME (Kritik)

### Blog Post Slug Tablosu

Eski site blog URL'leri ile yeni site blog slug'ları **birebir eşleşiyor**.

| # | Eski URL | Yeni URL | Slug Eşleşmesi |
|---|---------|---------|----------------|
| 1 | `/tr/kondenser-nedir-calisma-prensibi-verim-ve-uygulamalar-2/` | `/blog/kondenser-nedir-calisma-prensibi-verim-ve-uygulamalar-2` | ✅ Aynı |
| 2 | `/tr/has-serisi-sicak-hava-kazanlari/` | `/blog/has-serisi-sicak-hava-kazanlari` | ✅ Aynı |
| 3 | `/tr/turmalin-serisi-buhar-kazani-endustriyel-isitmanin-yeni-yuzu/` | `/blog/turmalin-serisi-buhar-kazani-endustriyel-isitmanin-yeni-yuzu` | ✅ Aynı |
| 4 | `/tr/neden-enorpa/` | `/blog/neden-enorpa` | ✅ Aynı |
| 5 | `/tr/growtech-antalya-23/` | `/blog/growtech-antalya-23` | ✅ Aynı |
| 6 | `/tr/domat-expo-antalya-2019/` | `/blog/domat-expo-antalya-2019` | ✅ Aynı |
| 7 | `/tr/greenhouse-almati-kazakistan/` | `/blog/greenhouse-almati-kazakistan` | ✅ Aynı |
| 8 | `/tr/agroworld-ozbekistan/` | `/blog/agroworld-ozbekistan` | ✅ Aynı |
| 9 | `/tr/enorpa-at-greentech-amsterdam-2025/` | `/blog/enorpa-at-greentech-amsterdam-2025` | ✅ Aynı |

**Sonuç**: Blog post URL'leri için **ekstra redirect'e gerek yok**. Sadece `/tr/blog-2/` → `/blog/` prefix redirect'i yeterli.

### Kategori Sayfaları Redirect

| Eski URL | Yeni Hedef | Tip |
|---------|-----------|-----|
| `/tr/sicak-hava-kazanlari/` | `/urunler` | 301 |
| `/tr/sicak-su-kazanlari/` | `/urunler` | 301 |
| `/tr/buhar-kazanlari/` | `/urunler` | 301 |
| `/tr/kizgin-su-kazanlari/` | `/urunler` | 301 |

**Neden?** Bu kategorilerdeki ürünler zaten `/urunler` sayfasında listeleniyor. Ayrı kategori route'u oluşturmak SEO için gerekli değil.

---

## MODÜL 1.8: İÇERİK EKLERİ (Eksik Sayfalar)

### 1.8.1 — Jasper Serisi Ürünü

**Eski URL**: `/tr/jasper-serisi/`  
**Yeni URL**: `/urunler/jasper-serisi` (otomatik oluşur)

**Supabase SQL**:
```sql
INSERT INTO products (name, type, category, capacity, detail, specs, featured, sort_order, slug)
VALUES (
  'Jasper Serisi',
  'Sıvı-Gaz Yakıtlı Buhar Jeneratörü',
  'sicak-su',
  '349 kW – 2.093 kW',
  'Sıvı – Gaz Yakıtlı, Su Borulu Serpantinli, 3 Geçişli, CE Belgeli, TS – 12952 ve 2014/68/EU Basınçlı Kaplar Direktifine Uygun. Buhar seperatörü sayesinde %96 kurulukta buhar üretir.',
  '{"yakit":"Sıvı-Gaz Yakıtlar","standart":"CE Belgeli; TS – 12952 ve 2014/68/EU"}',
  true,
  100,
  'jasper-serisi'
);
```

### 1.8.2 — Projeler Sayfası

**Eski URL**: `/tr/projeler/` (76 inlink)  
**Yeni URL**: `/projeler`

**İçerik**:
- Özbekistan/Taşkent — Sera Isıtma Tesisatı Kurulumu
- Özbekistan/Harezm — Sera Isıtma Tesisatı Kurulumu
- Türkiye/Manisa — Buhar Kazanı Kurulumu
- Türkiye/İzmir — Sera Isıtma Tesisatı Kurulumu
- Türkiye/Isparta — Orman Ürünlerinin Kurutulması

### 1.8.3 — Referanslar Sayfası

**Eski URL**: `/tr/referanslarimiz/` (76 inlink)  
**Yeni URL**: `/referanslar`

**İçerik**:
- 26 Ülke
- 138+ Proje
- 347+ Müşteri
- Müşteri yorumları (en az 5 adet)

### 1.8.4 — Blog Nav Linki

**Dosya**: `src/components/SiteHeader.tsx`

TR nav array'ine "Blog" ekle:
```typescript
TR: { nav: ["Anasayfa", "Ürünler", "Hakkımızda", "Blog", "Projeler", "Referanslar", "İletişim"], quote: "Teklif Al" },
```

`getHref` fonksiyonunu güncelle:
```typescript
const getHref = (isIndex: number) => {
  if (isIndex === 0) return "/";
  if (isIndex === 1) return "/urunler";
  if (isIndex === 2) return "/hakkimizda";
  if (isIndex === 3) return "/blog";
  if (isIndex === 4) return "/projeler";
  if (isIndex === 5) return "/referanslar";
  if (isIndex === 6) return "/iletisim";
  return "#";
};
```

---

## MODÜL 1.9: MARKA GÜÇLENDİRME (İleri Seviye)

### 1.9.1 — Müşteri Yorumları (E-E-A-T)

```tsx
// src/components/Testimonials.tsx
const testimonials = [
  {
    name: "Hasan Yılmaz",
    company: "Aktaş Tarım Ltd.Şti",
    text: "Enorpa HAS Serisi kazan ile yakıt tüketimimiz %30 azaldı. Tavsiye ederim.",
    rating: 5,
    location: "Konya, Türkiye",
    product: "HAS Serisi",
  },
  {
    name: "Mehmet Demir",
    company: "Demir Sera İşletmeleri",
    text: "Jasper Serisi buhar jeneratörü ile üretimimizi %20 artırdık.",
    rating: 5,
    location: "Antalya, Türkiye",
    product: "Jasper Serisi",
  },
  {
    name: "Ali Kaya",
    company: "Kaya Gıda A.Ş.",
    text: "Kondenser sayesinde enerji tasarrufu sağladık. Enorpa ekibi çok ilgili.",
    rating: 5,
    location: "İzmir, Türkiye",
    product: "Kondenser",
  },
  {
    name: "Ayşe Çelik",
    company: "Çelik Isıtma Sistemleri",
    text: "Kuvars NG Serisi ile sorunsuz çalışıyor. Bakımı da kolay.",
    rating: 5,
    location: "Istanbul, Türkiye",
    product: "Kuvars NG Serisi",
  },
  {
    name: "Fatma Öztürk",
    company: "Öztürk Tarım",
    text: "Anahtar teslim sera ısıtma sistemi ile zaman tasarrufu sağladık.",
    rating: 5,
    location: "Bursa, Türkiye",
    product: "Anahtar Teslim Sera",
  },
];
```

**Schema.org Review markup**:
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  reviewRating: { "@type": "Rating", ratingValue: "5" },
  author: { "@type": "Person", name: "Hasan Yılmaz" },
  reviewBody: "Enorpa HAS Serisi kazan ile yakıt tüketimimiz %30 azaldı.",
  itemReviewed: { "@type": "Product", name: "HAS Serisi" }
}
```

### 1.9.2 — FAQ Sayfası

**Yeni dosya**: `src/routes/sss.tsx`

```tsx
const faqs = [
  {
    question: "Buhar kazanı fiyatları ne kadar?",
    answer: "Buhar kazanı fiyatları kapasiteye, basınca ve özeliklere göre değişir. Detaylı teklif için iletişime geçin.",
  },
  {
    question: "Hangi yakıtı tüketir?",
    answer: "HAS Serisi katı yakıt (kömür/pelet/prina), Kuvars NG sıvı/gaz yakıt kullanır.",
  },
  {
    question: "Kondenser nedir?",
    answer: "Kondenser, baca gazındaki atık ısıyı geri kazanan ısı eşanjörüdür. Yakıt tasarrufu sağlar.",
  },
  {
    question: "Kazan bakımı nasıl yapılır?",
    answer: "Periyodik bakım, su seviyesi kontrolü ve temizlik önemlidir. Detaylı bakım rehberimiz mevcuttur.",
  },
  {
    question: "Garanti süresi nedir?",
    answer: "Tüm ürünlerimizde 2 yıl garanti bulunmaktadır.",
  },
  {
    question: "Montaj yapıyor musunuz?",
    answer: "Evet, Türkiye genelinde montaj hizmeti sunuyoruz.",
  },
  {
    question: "Teklif almak için ne yapmalıyım?",
    answer: "İletişim formunu doldurarak veya +90 850 471 2100 numarasını arayarak teklif alabilirsiniz.",
  },
  {
    question: "Hangi ödeme yöntemleri var?",
    answer: "Kredi karti, havale ve taksit seçeneklerimiz mevcuttur.",
  },
  {
    question: "Sera ısıtma sistemleri var mı?",
    answer: "Evet, anahtar teslim sera ısıtma sistemleri sunuyoruz.",
  },
  {
    question: "Yedek parça bulabilir miyim?",
    answer: "Evet, ömür boyu yedek parça desteği sağlıyoruz.",
  },
];
```

**Schema.org FAQPage markup**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer }
  }))
}
```

### 1.9.3 — İletişim Sayfasına Kariyer Formu

**Dosya**: `src/routes/iletisim.tsx`

Mevcut formun altına kariyer bölümü ekle:
```tsx
<div className="mt-8 bg-white border border-border p-6">
  <h3 className="font-display text-navy text-lg font-bold uppercase mb-4">
    Kariyer
  </h3>
  <p className="text-sm text-muted-foreground mb-4">
    Ekibimize katılmak ister misiniz? CV'nizi [email protected] adresine gönderin.
  </p>
</div>
```

### 1.9.4 — PDF İndirme Linkleri

**Dosya**: `src/routes/urunler.$slug.tsx`

Ürün detay sayfasına PDF butonu ekle:
```tsx
{product?.pdf_url && (
  <a
    href={product.pdf_url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-orange font-display uppercase tracking-wider text-sm hover:underline"
  >
    <FileDown className="h-4 w-4" />
    Ürün Bilgisi (PDF)
  </a>
)}
```

---

## İŞ AKIŞ SIRASI (Güncellenmiş)

```
┌─────────────────────────────────────────────────────────────┐
│  FAZ 1: ALTYAPI (Paralel çalışabilir)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 1.1   │  │ Modül 1.2    │  │ Modül 1.3        │   │
│  │ seo.ts      │  │ cleanContent │  │ SeoHead.tsx      │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 1.4   │  │ Modül 1.5    │  │ Modül 1.6        │   │
│  │ Breadcrumbs │  │ Dil/i18n     │  │ Blog nav         │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 1.7   │  │ Modül 1.8    │  │ Modül 1.9        │   │
│  │ Blog slug   │  │ İçerik       │  │ Marka güçlendir  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FAZ 2: SEO GÜNCELLEME                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 4.1   │  │ Modül 4.2    │  │ Modül 4.3        │   │
│  │ Blog head   │  │ Ürün head    │  │ İletişim schema  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FAZ 3: YÖNLENDİRME                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 3.1   │  │ Modül 5.1    │  │ Modül 5.2        │   │
│  │ vercel.json │  │ sitemap.xml  │  │ robots.txt       │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FAZ 4: TEST VE CANLI                                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Modül 6.1   │  │ Modül 6.2    │  │ GSC Migrasyonu   │   │
│  │ Redirect    │  │ SEO test     │  │                  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## BAŞARI KRİTERLERİ

| Kriter | Hedef | Test |
|--------|-------|------|
| 301 Redirect | Tüm eski URL'ler → yeni URL | curl -I |
| Trafik kaybı | <%10 (ilk 2 hafta) | Google Analytics |
| Index kaybı | <%5 | Google Search Console |
| Rich Snippets | Tüm ürün/blog sayfaları | Rich Results Test |
| Sayfa hızı | <3s | PageSpeed Insights |
| Mobile | Mobile-friendly | Mobile-Friendly Test |
| OG paylaşımı | Doğru görsel + başlık | Facebook Debugger |
| E-E-A-T | Müşteri yorumları + uzman byline | Manuel kontrol |
| FAQ | FAQPage schema | Rich Results Test |

---

**Rehber Sonu**

Bu rehber modüler yapıda her bir bağımsız olarak geliştirilebilir ve test edilebilir. Her modül tamamlandığında build edilip test edilir. Bir sonraki modüle geçmeden önce önceki modülün çalığından emin olun.
