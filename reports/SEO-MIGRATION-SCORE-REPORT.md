# ENORPA.COM SEO MİGRASON: KAPSAMLI DURUM RAPORU

**Versiyon**: 3.0  
**Tarih**: 28 Haziran 2026  
**Amaç**: Mevcut migration durumunun objektif değerlendirmesi + ileri seviye stratejiler

---

## 1. MEVCUT DURUM PUANLAMA

### Genel Puan: **62/100**

| Kategori | Maksimum | Mevcut | Açıklama |
|----------|----------|--------|----------|
| **URL Yapısı** | 20 | 16 | 24/24 ürün ✅, blog ✅, 3 sayfa eksik (Jasper/Projeler/Referanslar) |
| **Yönlendirme** | 15 | 0 | vercel.json YOK — en kritik eksiklik |
| **Meta Tags** | 10 | 7 | title/description var ama og:image/og:url eksik |
| **Structured Data** | 15 | 3 | Organization var, Product/Breadcrumb/BlogPosting YOK |
| **İçerik** | 15 | 10 | 8/8 blog var, Jasper eksik, PDF linkleri yok |
| **Teknik SEO** | 10 | 6 | CSP var, HSTS/X-Frame yok, sitemap güncel değil |
| **Dil/hreflang** | 10 | 3 | TR-only, hreflang yok, EN/RU redirect yok |
| **Performans** | 5 | 5 | Sayfa hızı iyi (1-2s) |
| **Toplam** | **100** | **62** | |

### Kritik Eksiklikler (Öncelik Sırasına Göre)

| # | Eksiklik | Etki | Puan Kaybı | Süre |
|---|---------|------|-----------|------|
| 1 | 301 redirect'ler | 🔴 Trafik kaybı %70-90 | -15 | 1-2 gün |
| 2 | Product + BlogPosting schema | 🔴 Rich snippet kaybı | -8 | 1-2 gün |
| 3 | Jasper Serisi + Projeler + Referanslar | 🔴 İçerik eksikliği | -5 | 2-3 gün |
| 4 | Vercel header'ları (HSTS/X-Frame) | 🟠 Güvenlik | -3 | 30 dk |
| 5 | hreflang (geçici TR-only) | 🟡 EN/RU trafik | -5 | 1-2 hafta |
| 6 | og:image / og:url | 🟠 Social CTR | -3 | 1 gün |
| 7 | Sitemap güncelleme | 🟡 Index | -1 | 30 dk |

---

## 2. TAMAMLAMA SONRASI PUAN TAHMİNÜ

### 62/100 → 85/100 (Temel migration)

Tüm kritik eksiklikleri giderirsen:
- 301 redirect ✅
- Schema'lar ✅
- İçerik tamamlama ✅
- Header'lar ✅
- Sitemap ✅

### 85/100 → 95/100 (İleri seviye)

Ekstra iyileştirmelerle:
- Core Web Vitals optimize ✅
- E-E-A-T sinyalleri ✅
- İçerik stratejisi ✅
- Sosyal kanıt ✅

### 95/100 → 100/100 (Mükemmel)

- Multilingual içerik (EN/RU çeviri) ✅
- Video içerik ✅
- FAQ schema ✅
- Backlink kazanım kampanyası ✅

---

## 3. DİL YAPI VE HREFLANG STRATEJİSİ

### 3.1 — Eski Sitenin Dil Yapısı

| Dil | Prefix | Indexable | Inlink | Önemi |
|-----|--------|-----------|--------|-------|
| TR | `/tr/` | ~80 | 80 | 🔴 Korunacak |
| EN | `/en/` | ~30 | 133 | 🔴 Yüksek inlink |
| RU | `/ru/` | ~20 | 133 | 🔴 Yüksek inlink |

### 3.2 — İki Aşamalı Strateji

| Aşama | Zaman | Yöntem | Etki |
|-------|-------|--------|------|
| **Aşama 1** | Canlıya çıkarken | `/en/*` ve `/ru/*` → `/` 301 redirect | TR trafik korunur, EN/RU başlangıçta kaybolur |
| **Aşama 2** | 1-3 ay sonra | `/en/` ve `/ru/` alt dizinleri + hreflang | EN/RU trafik geri kazanılır |

**Neden iki aşamalı?**
- Aşama 1: Hemen canlıya çıkabilirsin, TR trafik korunur
- Aşama 2: EN/RU içerik hazırlandığında hreflang ile trafik geri kazanılır

### 3.3 — Hreflang Etiketleri

Her sayfada `<head>` içinde:

```typescript
// src/lib/seo.ts'a ekle:
export function generateHreflangTags(path: string) {
  return [
    { rel: "alternate", hrefLang: "tr", href: `https://enorpa.com${path}` },
    { rel: "alternate", hrefLang: "en", href: `https://enorpa.com/en${path}` },
    { rel: "alternate", hrefLang: "ru", href: `https://enorpa.com/ru${path}` },
    { rel: "alternate", hrefLang: "x-default", href: `https://enorpa.com${path}` },
  ];
}
```

### 3.4 — Dil Değiştirme Mantığı

```typescript
// src/lib/i18n.ts (Yeni dosya)
export type SupportedLang = "tr" | "en" | "ru";

export function getLangFromPath(pathname: string): SupportedLang {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ru")) return "ru";
  return "tr";
}

export function changeLanguage(lang: SupportedLang) {
  const currentPath = window.location.pathname;
  let cleanPath = currentPath.replace(/^\/en/, "").replace(/^\/ru/, "");
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
  const newPath = lang === "tr" ? cleanPath : `/${lang}${cleanPath}`;
  localStorage.setItem("enorpa_lang", lang);
  window.location.href = newPath;
}
```

### 3.5 — Redirect Kuralları (Dil için)

`vercel.json`'a ekle:

```json
{
  "redirects": [
    { "source": "/tr/(.*)", "destination": "/$1", "statusCode": 301 },
    { "source": "/en/(.*)", "destination": "/en/$1", "statusCode": 301 },
    { "source": "/ru/(.*)", "destination": "/ru/$1", "statusCode": 301 }
  ]
}
```

### 3.6 — Sitemap.xml (Dil Desteği)

```xml
<url>
  <loc>https://enorpa.com/</loc>
  <xhtml:link rel="alternate" hreflang="tr" href="https://enorpa.com/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://enorpa.com/en"/>
  <xhtml:link rel="alternate" hreflang="ru" href="https://enorpa.com/ru"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://enorpa.com/"/>
</url>
<url>
  <loc>https://enorpa.com/en</loc>
  <xhtml:link rel="alternate" hreflang="tr" href="https://enorpa.com/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://enorpa.com/en"/>
  <xhtml:link rel="alternate" hreflang="ru" href="https://enorpa.com/ru"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://enorpa.com/"/>
</url>
```

---

## 4. BAŞARI KRİTERLERİ VE TAKVİM

### 62/100 → 85/100 (4 hafta)

| Hafta | Görev | Puan Artışı |
|-------|-------|-----------|
| **Hafta 1** | 301 redirect + schema'lar + içerik tamamlama | +18 |
| **Hafta 2** | Meta tags + sitemap + header'lar | +5 |
| **Hafta 3** | İçerik kalitesi (blog + ürün detay) | +3 |
| **Hafta 4** | Core Web Vitals + test | +2 |
| **Toplam** | | **62 → 85** |

### 85/100 → 95/100 (8 hafta)

| Ay | Görev | Puan Artışı |
|----|-------|-----------|
| **Ay 3** | E-E-A-T + müşteri yorumları + video | +5 |
| **Ay 4** | FAQ sayfa + hesaplama aracı + backlink | +5 |
| **Toplam** | | **85 → 95** |

### 95/100 → 100/100 (12 hafta)

| Ay | Görev | Puan Artışı |
|----|-------|-----------|
| **Ay 5** | İçerik takvimi (12 hafta) | +3 |
| **Ay 6** | Multilingual (EN/RU) | +2 |
| **Toplam** | | **95 → 100** |

---

## 5. SONUÇ: YAPILACAKLAR LİSTESİ

### Canlı Öncesi (Mutlaka)
1. ✅ `vercel.json` oluştur (redirect + headers)
2. ✅ Jasper Serisi + Projeler + Referanslar sayfaları
3. ✅ Schema.org: Product + BlogPosting + BreadcrumbList
4. ✅ Blog title/description güncelle
5. ✅ Sitemap.xml güncelle
6. ✅ `og:image` / `og:url` her sayfaya ekle
7. ✅ Hreflang etiketleri ekle (Aşama 1'de olabilir)

### Canlı Sonrası (İlk Ay)
8. ✅ Google Search Console migrasyonu
9. ✅ Google Analytics doğrulama

---

## 6. TAVSİYE (CANLI SONRASI İLERİ SEVİYE)

Aşağıdaki maddeler migration'ı tamamladıktan sonra marka güçlüğü için önerilen ileri seviye stratejilerdir. Acil değil, uzun vadeli büyüme için planlanmalı.

| # | Tavsiye | Etki | Zaman |
|---|---------|------|-------|
| 1 | YouTube kanalı + ürün tanıtım videoları | Trafik + marka bilinirliği | Ay 1-3 |
| 2 | Müşteri yorumları sistemi (E-E-A-T) | SEO güvenilirliği | Ay 1-2 |
| 3 | FAQ sayfası + FAQPage schema | Rich snippet | Ay 1-2 |
| 4 | İçerik takvimi (12 hafta blog) | Organik trafik artışı | Ay 2-6 |
| 5 | Newsletter sistemi | Lead generation | Ay 2-3 |
| 6 | Sosyal medya entegrasyonu | Marka bilinirliği | Ay 2-4 |
| 7 | Google Business Profile | Yerel SEO | Ay 1 |
| 8 | Backlink kazanım kampanyası | Domain authority | Ay 3-6 |
| 9 | EN/RU dil desteği (Aşama 2) | Uluslararası trafik | Ay 3-6 |
| 10 | İnteraktif hesaplama aracı | SEO magnet (backlink) | Ay 4-6 |
| 11 | Podcast başlatma | Sektörel otorite | Ay 5-8 |
| 12 | Google News içerikleri | Marka görünürlüğü | Ay 3-6 |

---

**Rapor Sonu**

Bu rapor, enorpa.com sitesinin 2026 yılında TanStack Start sitesine kusursuz geçişi için kapsamlı bir yol haritasıdır. Her bir madde, önceki maddenin tamamlanmasına bağlı olarak ilerlemelidir. Öncelikle kritik olan 301 redirect'ler ve schema'ların tamamlanması, ardından içerik ve deneyim iyileştirmeleri ile 62/100 puanı 100/100'e çıkarılabilir.
