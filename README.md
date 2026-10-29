# Enorpa Enerji — Kurumsal Web Sitesi

Endüstriyel ısıtma sistemleri üreticisi **Enorpa Enerji** için geliştirilmiş, çok dilli (TR/EN/RU), SEO odaklı kurumsal web sitesi ve içerik yönetim paneli.

> Eski WordPress altyapısından modern SSR mimarisine taşınmıştır. Mevcut SEO otoritesini korumak için 301 yönlendirme altyapısı, dinamik meta etiketleri ve yapısal veri (JSON-LD) desteği içerir.

---

## 🚀 Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| **Framework** | [TanStack Start](https://tanstack.com/start) (SSR) + React 19 |
| **Routing** | [TanStack Router](https://tanstack.com/router) (file-based, type-safe) |
| **Styling** | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| **Backend / DB** | [Supabase](https://supabase.com) (PostgreSQL + Auth + Storage + Realtime) |
| **State / Data** | TanStack Query |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Deployment** | Vercel |
| **Package Manager** | Bun |
| **Language** | TypeScript |

---

## ✨ Özellikler

### Genel Site
- **Çok dilli yapı** — Türkçe (`/`), İngilizce (`/en`), Rusça (`/ru`) + `hreflang` etiketleri
- **SEO optimizasyonu** — Dinamik title/description, canonical URL, OpenGraph, Twitter Card, JSON-LD (Organization, Product, FAQ, Breadcrumb)
- **301 yönlendirme altyapısı** — Eski WordPress URL'lerinden yeni sayfalara otomatik yönlendirme
- **Dinamik sitemap** — Ürün ve blog sayfalarını otomatik içerir
- **Responsive tasarım** — Mobil öncelikli, tüm ekran boyutlarında test edilmiş
- **Çerez onayı** — KVKK uyumlu, GA4 consent-gated yükleme
- **Erişilebilirlik** — Semantik HTML, ARIA etiketleri, klavye navigasyonu

### İçerik Bölümleri
- Ürün kataloğu (kategoriler, detay sayfaları, teknik özellikler, PDF indirme)
- Blog (Supabase entegre, TR/EN/RU)
- Portföy / Projeler (detay sayfaları)
- Referanslar
- Hakkımızda (misyon, vizyon, AR-GE, sertifikalar, üretim tesisleri)
- SSS (FAQ schema ile)
- İletişim (form + 3 fabrika lokasyonu + harita)

### Lead Generation
- Kapasite hesaplayıcı (4 adımlı, tesis tipi + alan + yakıt)
- Yakıt tasarruf / ROI hesaplayıcı
- Hızlı geri arama formu
- Belge indirme kapısı (document gate)
- WhatsApp entegrasyonu

### Yönetim Paneli (`/admin`)
- **Dashboard** — Ziyaretçi analitiği, lead istatistikleri, dönüşüm oranı, trafik kaynakları
- **Ürün Yönetimi** — Tam CRUD, görsel yükleme (otomatik WebP sıkıştırma), slug yönetimi, SEO meta alanları
- **Lead Yönetimi** — Arama, filtreleme, durum güncelleme, realtime bildirim
- **Site Ayarları** — Bölüm görünürlük anahtarları
- **Kimlik Doğrulama** — Supabase Auth + rol bazlı erişim (`admin` / `user`)

---

## 📁 Proje Yapısı

```
src/
├── components/          # Paylaşılan bileşenler (SiteHeader, SeoHead, Breadcrumbs)
│   └── ui/              # shadcn/ui bileşenleri
├── data/                # Statik veri + Supabase fetch fonksiyonları
├── hooks/               # Custom React hooks
├── integrations/
│   └── supabase/        # Supabase client (client + server + auth middleware)
├── lib/                 # Yardımcılar (seo, i18n, cleanContent, error handling)
├── routes/              # TanStack Router dosya tabanlı rotalar
│   ├── __root.tsx       # Root layout (head, cookie banner, WhatsApp)
│   ├── index.tsx        # Anasayfa
│   ├── urunler.*        # Ürün katalog + detay
│   ├── blog.*           # Blog liste + detay
│   ├── portfolio.*      # Portföy
│   ├── admin.*          # Yönetim paneli (protected)
│   ├── en/              # İngilizce rotalar
│   └── ru/              # Rusça rotalar
├── router.tsx           # Router yapılandırması
├── server.ts            # SSR entry + hata yakalama
└── styles.css           # Tailwind + tema değişkenleri

supabase/
├── functions/           # Edge Functions (lead bildirim)
└── migrations/          # Veritabanı şemaları + RLS politikaları

public/
├── docs/                # PDF teknik föyler
├── robots.txt
└── sitemap.xml
```

---

## 🛠️ Kurulum

### Gereksinimler
- Node.js 20+ veya Bun 1.1+
- Supabase hesabı (veya self-hosted instance)

### 1. Bağımlılıkları yükle
```bash
bun install
```

### 2. Ortam değişkenlerini ayarla
`.env.example` dosyasını `.env` olarak kopyala ve doldur:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://<proje-id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>
SUPABASE_URL=https://<proje-id>.supabase.co
SUPABASE_PUBLISHABLE_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # Sadece sunucu tarafı — asla client'a sızdırmayın
```

> ⚠️ **Güvenlik:** `SUPABASE_SERVICE_ROLE_KEY` RLS'i bypass eder. Yalnızca sunucu tarafında (`.server.ts` modülleri) kullanılmalı, asla client bundle'a girmemelidir.

### 3. Veritabanını hazırla
```bash
supabase db push
```

### 4. Geliştirme sunucusunu başlat
```bash
bun run dev
```

Site `http://localhost:3000` adresinde açılır.

---

## 📜 Kullanılabilir Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu (HMR) |
| `npm run build` | Sitemap üretimi + production build |
| `npm run preview` | Build çıktısını önizle |
| `npm run lint` | ESLint kontrolü |
| `npm run format` | Prettier ile kod formatla |
| `npm run images` | Orijinal site görsellerini içe aktar (ürün/proje/hero/kart) |
| `npm run assets` | SVG yedek görselleri üret |
| `npm run seo:sitemap` | `public/sitemap.xml` üret |
| `npm run audit` | 34 rotada SEO + sağlık denetimi |
| `npm run db:up` / `db:down` / `db:reset` / `db:status` | Yerel Supabase yönetimi |

---

## 🔐 Güvenlik

- **RLS (Row Level Security)** — Tüm Supabase tablolarında aktif
- **Rol bazlı erişim** — `user_roles` tablosu + `has_role()` SECURITY DEFINER fonksiyonu
- **Storage politikaları** — Ürün görselleri yalnızca admin tarafından yüklenebilir
- **CSP + güvenlik header'ları** — `vercel.json` üzerinden HSTS, X-Frame-Options, nosniff.
  `frame-src` yalnızca `youtube-nocookie.com` / `youtube.com` için açıktır (tanıtım videosu).
- **Input validasyonu** — Zod şemaları + HTML sanitizasyonu
- **Ortam değişkenleri** — `.env` git'ten hariç tutulmuş, secret'lar asla commit edilmez

### Bağımlılık güvenliği (kritik CVE kapatıldı)

TanStack Start'taki **kritik** uyarı (GHSA-qx66-fv34-fjm8 — server-function
yanıtlarında reflected XSS, `<1.168.60`) kapatıldı. Kritik nokta: `1.169.x`
sürümleri **Vite 8** istiyor, `1.168.60` ise hâlâ Vite 7 ile çalışıyor ve düzeltmeyi
içeren ilk sürüm. Bu yüzden Vite 8'e çıkmadan çözüldü.

Sürümler **tam pinlendi** (kaza ile kopmasın diye `^` yok) ve birbirine hizalı:

| Paket | Sürüm | Neden bu sürüm |
|---|---|---|
| `@tanstack/react-start` | `1.168.60` | CVE düzeltmesini içeren ilk sürüm, Vite 7 uyumlu |
| `@tanstack/react-router` | `1.170.41` | react-start'ın birebir bağımlılığı (tek kopya kalsın) |
| `@tanstack/router-plugin` | `1.168.42` | `start-plugin-core@1.171.49` ile aynı sürüm |
| `vite` | `7.3.7` | launch-editor / fs.deny uyarılarını kapatan 7.x patch'i |

Sonuç: `bun audit` → **77 uyarıden 28'e**, **4 kritik → 0 kritik**.
(`23 high / 5 moderate / 1 low` kalanların tamamı **geliştirme zinciri**:
babel→browserslist, esbuild, js-yaml, router-generator içindeki `zod`. Üretim
çıktısını etkilemez.)

Doğrulama adımları (bu turda çalıştırıldı, hepsi geçti):

```bash
rm -rf node_modules bun.lock && bun install   # 476 paket, tek kopya doğrulandı
node node_modules/typescript/bin/tsc --noEmit  # 0 hata
npm run build                                  # client + ssr + nitro başarılı
npm run audit                                  # 35 rota, 0 sorun
```

> **Dikkat:** `bun audit fix` **kullanılmamalı**. `@tanstack/*` paketlerini
> öngörülemeyen şekilde kaydırıp SSR'ı kırıyor (`defaultSerovalPlugins` export
> hatası + `handleServerRoutes` çökmesi). Denendi, geri alındı. Yükseltme
> bilinçli olarak yukarıdaki tablo ile elle yapılır.

`react-start` 1.169+ yükseltmesi (Vite 8 gerektirir) ayrı iş olarak duruyor:
Vite 8 + `@vitejs/plugin-react` + `@tailwindcss/vite` + `@lovable.dev/vite-tanstack-config`
birlikte yükseltilmeli.

---

## 🌍 SEO Stratejisi

| Öğe | Uygulama |
|-----|----------|
| Canonical URL | Her sayfada tekil, gerçek adresle birebir (`⚠️ /en/references` gibi yanlış canonical'lar düzeltildi) |
| hreflang | [`generateHreflangTags()`](src/lib/seo.ts:187) eşleme tablosu — TR/EN/RU adresleri farklı olduğu için (`/urunler` → `/en/products`, `/projeler` → `/en/portfolio`, `/iletisim` → `/en/contact`) doğru karşılıklar üretilir; karşılığı olmayan sayfalarda alternatif **yazılmaz** |
| OpenGraph / Twitter | Dinamik title, description, 1200×630 `og-cover.png` + `og:image:width/height/alt` |
| JSON-LD | Organization (kök), ProductCollection + VideoObject (`/urunler`), Product, Article, BreadcrumbList, WebSite |
| Sitemap | [`scripts/gen-sitemap.mjs`](scripts/gen-sitemap.mjs:1) ile **üretilir** (127 URL: 24 ürün × 3 dil, 6 proje, 4 blog, statik sayfalar + hreflang alternatifleri). `prebuild` kancası sayesinde her build'de tazelenir |
| robots.txt | `/admin`, `/api/`, `/login` hariç; `Sitemap:` satırı tanımlı |
| 301 Redirects | Eski WordPress URL → yeni sayfa eşleştirmeleri (`vercel.json`) |
| Core Web Vitals | Hero slider'da yalnızca aktif slayt metni render edilir, görseller WebP, `fetchPriority` ilk slaytta yüksek, YouTube gömme tıklamaya kadar yüklenmez |

### SEO komutları

```bash
npm run seo:sitemap   # public/sitemap.xml üret
npm run seo:check     # sitemap'i yazmadan özet ver (URL sayısı)
npm run audit         # 34 rotayı gezer: 200 / title / description / canonical / og / JSON-LD / hreflang
```

`npm run audit` çıktısı örnek:

```text
ROTA                              KOD  DESC  CANON  OG  LD  HL  BAŞLIK
/urunler                          200  149   ✓      ✓   3   4   Ürünlerimiz | Enorpa Enerji
/en/products/oniks-serisi         200  128   ✓      ✓   2   12  Oniks Serisi | Enorpa Energy Products
✓ 34 rota denetlendi — sorun bulunamadı.
```

Denetim şunları yakalar: eksik/tekrarlanan `<title>`, 50 karakterden kısa veya
200'den uzun `description`, canonical/og:image eksikliği, JSON-LD'si olmayan kritik
sayfa ve **sitemap'te bulunmayan hreflang hedefi**. CI'da `npm run audit` çalıştırıldığında
sorun varsa çıkış kodu `1` olur.

---

## 🎨 Görsel Varlıkları

Site hiçbir harici görsel sunucusuna bağımlı değildir. İki katman vardır:

**1. Orijinal site görselleri (birincil):** Eski WordPress sitesinden indirilen
gerçek ürün render'ları ve proje fotoğrafları WebP'ye çevrilerek `public/img/`
altına aktarılır.

```bash
npm run images          # = node scripts/import-original-images.mjs
# farklı bir kaynak klasör için:
node scripts/import-original-images.mjs --source "D:\yol\uploads"
```

Betik 24 ürün render'ı, 6 proje fotoğrafı, **3 hero slider fotoğrafı** (1920×900),
**3 ana sayfa tanıtım kartı** (entegre / ürünler / projeler), OG kapak görseli,
4 sertifika rozeti ve logoyu eşleştirir; ardından
`src/lib/product-images.generated.ts` dosyasını yazar (slug → görsel yolu).
Kaynak: `Desktop\enorpa\enorpa-images`.

Hero slider'ı oluşturan kaynak kareler (hepsi orijinal siteden):

| Slayt | Kaynak dosya | Çözünürlük | İçerik |
|---|---|---|---|
| slide-1 | `Ozbekistan.jpg` | 1600×800 | Sahada kurulu turuncu Enorpa kazanları (güneşli) |
| slide-2 | `enorpa-foto-4-scaled.jpg` | 2560×1514 | Kazan dairesi, kırmızı/mavi hatlar |
| slide-3 | `izmir-slider-5-duzenli.jpg` | 2000×1500 | Sera ısıtma sahası, pompa/pano hattı |

Slaytlar `public/img/hero/slide-{1,2,3}.webp` olarak üretilir (1920×900, cover,
koyu iç mekân kareleri için hafif brightness/saturation artışı). Slayt sırasını
veya kaynağı değiştirmek için [`scripts/import-original-images.mjs`](scripts/import-original-images.mjs:110)
içindeki `HERO_SLIDES` dizisini düzenleyip `npm run images` çalıştırın.

**2. Üretilen yedekler (fallback):** Orijinali bulunmayan görseller için marka
paletinde SVG'ler üretilir:

```bash
npm run assets          # = node scripts/gen-assets.mjs
```

Görsel yolu her zaman [`src/lib/assets.ts`](src/lib/assets.ts:1) üzerinden çözülür
(`HERO_SLIDES`, `promoImage`, `productImage`, `projectImage`, `resolveImageUrl`,
`resolveProjectImage`): orijinal WebP varsa o, yoksa SVG yedeği kullanılır.

Ana sayfa hero'su artık **3 slaytlı otomatik slider**'dır
([`HeroSlider`](src/routes/index.tsx:255)): 6,5 sn'de bir otomatik geçiş, nokta +
ok kontrolleri, hover'da duraklama ve düz lacivert örtü yerine soldan sağa açılan
gradient overlay kullanır. Slayt başlıkları orijinal sitedeki üç başlıktır
(TR/EN/RU ayrı). Hero'nun hemen altında orijinal sitedeki üçlü kart bloğu
(**Entegre Sistemler / Ürünlerimizi Keşfedin / Projelerimiz**) yer alır.

Betik SVG kaynaklarını yazar, `sharp` ile WebP (hero, ürün kartları) ve PNG
(OG kapağı, favicon, apple-touch-icon) türevlerini oluşturur.

Görsel kullanımı: ana sayfa hero + ürün kartları + proje galerisi, `/urunler`
katalog kartları, `/projeler` proje kartları, blog kartları (TR/EN/RU), EN/RU
ana sayfa hero'su, `hakkimizda` sertifika rozetleri ve admin ürün listesi.
Tüm `<img>` etiketleri `loading="eager"` + `decoding="async"` kullanır; böylece
sayfa kaydırılmadan da görseller yüklenir (SVG dosyaları ~5 KB).

---

## 🗄️ Yerel Supabase (Önerilen Geliştirme Ortamı)

Bulut projesi kapalı olduğu için admin paneli, lead kaydı ve içerik yönetimi
varsayılan olarak devre dışıdır. Yerel Supabase'i tek komutla ayağa kaldırabilirsiniz
(Docker Desktop açık olmalı):

```bash
npm run db:up
```

Bu komut:

1. `supabase start` ile Postgres + Auth + Storage + Studio'yu başlatır,
2. anahtarları **`.env.local`** dosyasına yazar (Vite `.env`'den önce okur),
3. `admin@enorpa.local` / `Enorpa123!` yönetici hesabını oluşturur
   (e-posta doğrulaması yerelde kapalıdır).

Sonrasında `npm run dev` ile siteyi yeniden başlatın.

| Komut | Açıklama |
|-------|----------|
| `npm run db:up` | Yerel Supabase'i başlat + `.env.local` + admin kullanıcısı |
| `npm run db:down` | Durdur (veriler korunur) |
| `npm run db:reset` | Şemayı + seed verisini sıfırdan uygula |
| `npm run db:status` | Servis durumu ve anahtarlar |
| `npm run db:env` | Sadece `.env.local` dosyasını yenile |
| `npm run db:keepalive` | Uzak (bulut) projeye ping atarak duraklamasını engelle |

Yerel adresler: API `http://127.0.0.1:54321` · Studio `http://127.0.0.1:54323` ·
E-posta kutusu (Mailpit) `http://127.0.0.1:54324`.

> Yerel anahtarlar ve JWT secret paylaşılan varsayılanlardır — production'da
> kullanılmaz. `.env.local` git'e girmez.

### Şema

`supabase/migrations` altındaki migration'lar sırayla uygulanır. Uygulama kodunun
ihtiyaç duyduğu tabloların tamamı (`products`, `leads`, `site_settings`,
`page_views`, `blog_posts`, `projects`, `user_roles`, `analytics_events`) ve
`product-images` storage bucket'ı `20261028120000_local_schema_completion.sql`
ile tamamlanır; ürün kataloğu, proje vitrini ve bölüm anahtarları da burada seed
edilir.

---

## 🧩 Veritabanı Kapalıyken (Tanıtım Modu)

Site, Supabase erişilemediğinde de tam olarak gezilebilir kalır:

| Katman | Davranış |
|--------|----------|
| Ürünler | `src/data/products.ts` içindeki statik katalog + yerel görseller |
| Blog | `src/data/blog.ts` içindeki yerel yazılar |
| Projeler | `ProjectsList` bileşenindeki statik proje listesi (TR/EN/RU) |
| Site ayarları | Tüm bölümler açık kabul edilir |
| Formlar | Talep, tarayıcıda kuyruğa alınır (`localStorage: enorpa_pending_leads`), ziyaretçiye hata gösterilmez |

Bağlantı durumu `src/lib/backend.ts` içinde tek noktadan yönetilir; ilk başarısız
istekten sonra tekrar deneme yapılmaz. `src/lib/assets.ts` görsel yollarının tek
kaynağıdır.

> Yönetim paneli (`/admin`) gerçek Supabase bağlantısı gerektirir; erişim yoksa
> giriş ekranında bilgilendirme gösterilir.

---

## 🚢 Deployment

Proje Vercel'e deploy edilmek üzere yapılandırılmıştır.

```bash
vercel --prod
```

**Ortam değişkenleri** Vercel Dashboard → Settings → Environment Variables üzerinden eklenmelidir.

---

## 📄 Lisans

Bu proje özel mülkiyettir. Detaylar için [`LICENSE`](LICENSE) dosyasına bakın.

---

## 👤 Geliştirici

**Furkan Acar**
- GitHub: [@acar32furkan-glitch](https://github.com/acar32furkan-glitch)
