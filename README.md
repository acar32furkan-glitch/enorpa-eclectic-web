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
| `bun run dev` | Geliştirme sunucusu (HMR) |
| `bun run build` | Production build |
| `bun run preview` | Build çıktısını önizle |
| `bun run lint` | ESLint kontrolü |
| `bun run format` | Prettier ile kod formatla |

---

## 🔐 Güvenlik

- **RLS (Row Level Security)** — Tüm Supabase tablolarında aktif
- **Rol bazlı erişim** — `user_roles` tablosu + `has_role()` SECURITY DEFINER fonksiyonu
- **Storage politikaları** — Ürün görselleri yalnızca admin tarafından yüklenebilir
- **CSP + güvenlik header'ları** — `vercel.json` üzerinden HSTS, X-Frame-Options, nosniff
- **Input validasyonu** — Zod şemaları + HTML sanitizasyonu
- **Ortam değişkenleri** — `.env` git'ten hariç tutulmuş, secret'lar asla commit edilmez

---

## 🌍 SEO Stratejisi

| Öğe | Uygulama |
|-----|----------|
| Canonical URL | Her sayfada dinamik |
| hreflang | TR / EN / RU karşılıklı referanslar |
| OpenGraph | Dinamik title, description, image |
| JSON-LD | Organization, Product, FAQ, Breadcrumb |
| Sitemap | Dinamik üretim (ürün + blog dahil) |
| robots.txt | Admin dizini hariç tutulmuş |
| 301 Redirects | Eski WordPress URL → yeni sayfa eşleştirmeleri |
| Core Web Vitals | Lazy loading, WebP, preconnect, font optimizasyonu |

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
