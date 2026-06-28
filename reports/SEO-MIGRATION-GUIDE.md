# ENORPA.COM → YENİ TANSTACK SİTE: KUSURSUZ SEO GEÇİŞ REHBERİ

**Versiyon**: 1.0  
**Tarih**: 28 Haziran 2026  
**Kaynak Veri**: Screaming Frog crawl (440 URL, 373 indexable, 137 HTML sayfa)  
**Hedef Platform**: TanStack Start + Vercel/Nitro

---

## İÇİNDEKİLER

1. [Özet ve Kritik Başarı Koşulları](#1-özet-ve-kritik-başarı-koşulları)
2. [Eski Site URL Haritası](#2-eski-site-url-haritası)
3. [Yeni Site Mevcut Durum](#3-yeni-site-mevcut-durum)
4. [URL Eşleştirme ve 301 Yönlendirmeler](#4-url-eşleştirme-ve-301-yönlendirmeler)
5. [İçerik Eksikleri ve Eksik Sayfalar](#5-içerik-eksikleri-ve-eksik-sayfalar)
6. [Faz 1: İçerik Tamamlama](#6-faz-1-içerik-tamamlama)
7. [Faz 2: 301 Yönlendirme Kuralları](#7-faz-2-301-yönlendirme-kuralları)
8. [Faz 3: Sayfa Başına SEO](#8-faz-3-sayfa-başına-seo)
9. [Faz 4: Teknik SEO Altyapısı](#9-faz-4-teknik-seo-altyapısı)
10. [Faz 5: Google Search Console Migrasyonu](#10-faz-5-google-search-console-migrasyonu)
11. [Faz 6: Canlı Öncesi Kontrol Listesi](#11-faz-6-canlı-öncesi-kontrol-listesi)
12. [Faz 7: Canlı Sonrası İzleme](#12-faz-7-canlı-sonrası-izleme)
13. [Ekler](#13-ekler)

---

## 1. ÖZET VE KRİTİK BAŞARI KOŞULLARI

### Geçişin Başarılı Olması İçin Mutlaka Yapılması Gerekenler

| # | Koşul | Etki | Risk |
|---|-------|------|------|
| 1 | **Tüm eski URL'lere 301 redirect** | Backlink değeri ve index korunur | 🔴 Trafik kaybı %70-90 |
| 2 | **Projeler + Referanslar + Jasper Serisi sayfaları** | 76+ inlink'li sayfalar korunur | 🔴 Backlink kaybı |
| 3 | **og:image her sayfada** | Sosyal paylaşım CTR artar | 🔴 Düşük social CTR |
| 4 | **Product + BlogPosting schema** | Rich snippets | 🔴 Düşük CTR |
| 5 | **Blog title/description düzeltme** | SEO + CTR | 🔴 Düşük CTR |
| 6 | **Google SC migrasyonu** | Index kaybı önlenir | 🔴 Index düşüşü |
| 7 | **Blog nav linki** | Kullanıcı deneyimi | 🟡 Düşük navigasyon |

### Eski Site SEO Problemleri (Screaming Frog Verisi)

Eski sitenin SEO'su zayıf → Yeni site ile fırsat:

| Problem | Eski Site | Yeni Site Hedef |
|---------|-----------|-----------------|
| Meta Description Missing | 110/137 (%80) | 0/100 |
| H1 Missing | 28/137 (%20) | 0 |
| Images Missing Alt | 69/80 (%86) | 0 |
| Structured Data | 0/137 | Tüm kritik sayfalar |
| hreflang X-Default | 110/137 (%80) | TR-only, gerekli değil |
| Title Over 60 Chars | 60/137 (%44) | <60 chars |

---

## 2. ESKİ SİTE URL HARİTASI

### Genel İstatistikler (Screaming Frog)

| Metrik | Değer |
|--------|-------|
| Toplam URL | 440 |
| İç URL | 421 |
| Dış URL | 19 |
| Indexable HTML | 137 sayfa |
| 2xx (Başarılı) | 393 |
| 3xx (Yönlendirme) | 44 |
| 4xx (Hata) | 2 |
| PDF | 8 |

### Dil Dağılımı

| Dil | Prefix | Tahmini Indexable | En Çok Inlink |
|-----|--------|-------------------|---------------|
| TR | `/tr/` | ~80 | `/tr/` (80) |
| EN | `/en/` | ~30 | `/en/` (133) |
| RU | `/ru/` | ~20 | `/ru/` (133) |

### En Çok Inlink Alan Sayfalar (Top 10)

| URL | Inlink Sayısı | Önemi |
|-----|--------------|-------|
| `/ru/` | 133 | 🔴 Yönlendirme şart |
| `/en/` | 133 | 🔴 Yönlendirme şart |
| `/tr/` | 80 | 🔴 Yönlendirme şart |
| `/tr/iletisim/` | 76 | 🔴 Yeni sayfa var |
| `/tr/projeler/` | 76 | 🔴 Yeni sitede YOK |
| `/tr/urunler/` | 76 | ✅ Yeni sayfa var |
| `/tr/kondenser/` | 67 | ✅ Yeni sayfa var |
| `/tr/hakkimizda/` | 66 | ✅ Yeni sayfa var |
| `/tr/sicak-su-kazanlari/` | 65 | 🔴 Yeni sitede YOK |
| `/tr/referanslarimiz/` | 65 | 🔴 Yeni sitede YOK |

---

## 3. YENİ SİTE MEVCUT DURUM

### Mevcut Sayfalar

| Sayfa | Route | SEO Durumu |
|-------|-------|-----------|
| Anasayfa | `/` | ✅ iyi |
| Hakkımızda | `/hakkimizda` | ✅ iyi |
| Ürünler | `/urunler` | ✅ iyi (schema var) |
| Ürün Detay | `/urunler/$slug` | ⚠️ og:image, schema eksik |
| Blog Listesi | `/blog` | ⚠️ OG/Twitter yok |
| Blog Detay | `/blog/$slug` | ⚠️ title, description, schema eksik |
| İletişim | `/iletisim` | ✅ iyi |
| KVKK | `/kvkk` | ⚠️ OG yok |
| Gizlilik | `/gizlilik-politikasi` | ⚠️ OG yok |
| Çerez | `/cerez-politikasi` | ⚠️ OG yok |
| Admin Login | `/admin/login` | ✅ robots'ta blocked |
| Admin Dashboard | `/admin/dashboard` | ✅ |

### Mevcut Ürünler (24 adet)

HAS Serisi, HAS NG, HAS Turbo, Akuamarin, Ametist, Turkuaz, Kalsedon, Obsidyen, Kuvars Tek Külhanlı, Kuvars Çift Külhanlı, Kuvars NG, Turmalin, Akuamarin KS, Turkuaz KS, Oniks, Kat Kaloriferi, Anahtar Teslim Sera, Brülörler, Baca, Kondenser, Ekonomizer, Kazan Otomasyon, Kazan Kontrol Panosu, Yedek Parça

---

## 4. URL EŞLEŞTİRME VE 301 YÖNLENDİRMELER

### 🔴 KRİTİK: Eski sitede var, yeni sitede YOK

| # | Eski URL | Yeni URL | İşlem |
|---|---------|---------|------|
| 1 | `/tr/projeler/` | ❌ YOK | Yeni route oluştur + redirect |
| 2 | `/tr/referanslarimiz/` | ❌ YOK | Yeni route oluştur + redirect |
| 3 | `/tr/jasper-serisi/` | ❌ YOK | Ürün ekle + yeni route + redirect |
| 4 | `/tr/sicak-hava-kazanlari/` | ❌ YOK | Kategori route veya redirect |
| 5 | `/tr/sicak-su-kazanlari/` | ❌ YOK | Kategori route veya redirect |
| 6 | `/tr/buhar-kazanlari/` | ❌ YOK | Kategori route veya redirect |
| 7 | `/tr/kizgin-su-kazanlari/` | ❌ YOK | Kategori route veya redirect |
| 8 | `/en/` | ❌ YOK | i18n veya redirect |
| 9 | `/en/products/` | ❌ YOK | i18n veya redirect |
| 10 | `/en/has-series-hot-air-boilers/` | ❌ YOK | i18n veya redirect |
| 11 | `/en/kuvars-ng-series/` | ❌ YOK | i18n veya redirect |
| 12 | `/en/condenser/` | ❌ YOK | i18n veya redirect |
| 13 | `/en/superheated-water-boilers/` | ❌ YOK | i18n veya redirect |
| 14 | `/en/hot-air-boilers/` | ❌ YOK | i18n veya redirect |
| 15 | `/en/enorpa-at-greentech-amsterdam-2025-2/` | ❌ YOK | i18n veya redirect |
| 16 | `/en/turmalin-series-steam-boiler.../` | ❌ YOK | i18n veya redirect |
| 17 | `/ru/` | ❌ YOK | i18n veya redirect |
| 18 | `/tr/blog-2/` | `/blog` | Redirect |

### ✅ Eski sitede var, yeni sitede de var

| Eski URL | Yeni URL | Redirect |
|---------|---------|----------|
| `/tr/` | `/` | 301 |
| `/tr/hakkimizda/` | `/hakkimizda` | 301 |
| `/tr/iletisim/` | `/iletisim` | 301 |
| `/tr/urunler/` | `/urunler` | 301 |
| `/tr/neden-enorpa/` | `/blog/neden-enorpa` | 301 |
| `/tr/has-serisi/` | `/urunler/has-serisi` | 301 |
| `/tr/has-ng-serisi/` | `/urunler/has-ng-serisi` | 301 |
| `/tr/has-turbo-serisi/` | `/urunler/has-turbo-serisi` | 301 |
| `/tr/akuamarin-serisi/` | `/urunler/akuamarin-serisi` | 301 |
| `/tr/ametist-serisi/` | `/urunler/ametist-serisi` | 301 |
| `/tr/turkuaz-serisi/` | `/urunler/turkuaz-serisi` | 301 |
| `/tr/kalsedon-serisi/` | `/urunler/kalsedon-serisi` | 301 |
| `/tr/obsidyen-serisi/` | `/urunler/obsidyen-serisi` | 301 |
| `/tr/kuvars-serisi-tek-kulhanli/` | `/urunler/kuvars-serisi-tek-kulhanli` | 301 |
| `/tr/kuvars-serisi-cift-kulhanli/` | `/urunler/kuvars-serisi-cift-kulhanli` | 301 |
| `/tr/kuvars-ng-serisi/` | `/urunler/kuvars-ng-serisi` | 301 |
| `/tr/turmalin-serisi/` | `/urunler/turmalin-serisi` | 301 |
| `/tr/akuamarin-ks-serisi/` | `/urunler/akuamarin-ks-serisi` | 301 |
| `/tr/turkuaz-ks-serisi/` | `/urunler/turkuaz-ks-serisi` | 301 |
| `/tr/oniks-serisi/` | `/urunler/oniks-serisi` | 301 |
| `/tr/kat-kaloriferi/` | `/urunler/kat-kaloriferi` | 301 |
| `/tr/anahtar-teslim-sera-isitma-sistemi/` | `/urunler/anahtar-teslim-sera-isitma-sistemi` | 301 |
| `/tr/brulorler/` | `/urunler/brulorler` | 301 |
| `/tr/baca/` | `/urunler/baca` | 301 |
| `/tr/kondenser/` | `/urunler/kondenser` | 301 |
| `/tr/ekonomizer/` | `/urunler/ekonomizer` | 301 |
| `/tr/kazan-otomasyon-sistemi/` | `/urunler/kazan-otomasyon-sistemi` | 301 |
| `/tr/kazan-kontrol-panosu/` | `/urunler/kazan-kontrol-panosu` | 301 |
| `/tr/yedek-parca/` | `/urunler/yedek-parca` | 301 |

---

## 5. İÇERİK EKSİKLERİ VE EKSİK SAYFALAR

### Tamamen Eksik Sayfalar

| Sayfa | Eski URL | İçerik Özeti | Öncelik |
|-------|---------|-------------|---------|
| **Projeler** | `/tr/projeler/` | Özbekistan Taşkent, Harezm sera ısıtma; Türkiye Manisa buhar kazanı; İzmir sera ısıtma; Isparta kurutma | 🔴 |
| **Referanslar** | `/tr/referanslarimiz/` | Müşteri referansları, projeler | 🔴 |
| **Jasper Serisi** | `/tr/jasper-serisi/` | Sıvı-Gaz Yakıtlı Buhar Jeneratörü, 349 kW – 2.093 kW, Serpantinli, %96 kurulukta buhar, video | 🔴 |
| **Sıcak Hava Kazanları** | `/tr/sicak-hava-kazanlari/` | HAS Serisi, HAS NG, HAS Turbo kategori grup | 🟠 |
| **Sıcak Su Kazanları** | `/tr/sicak-su-kazanlari/` | Akuamarin, Ametist, Kalsedon, Obsidyen kategori grup | 🟠 |
| **Buhar Kazanları** | `/tr/buhar-kazanlari/` | Kuvars Serisi, Turmalin kategori grup | 🟠 |
| **Kızgın Su Kazanları** | `/tr/kizgin-su-kazanlari/` | Akuamarin KS, Turkuaz KS kategori grup | 🟠 |

### Eksik İçerikler

| Sayfa | Eksik | Detay |
|-------|-------|-------|
| **İletişim** | Kariyer formu | Eski sitede "Ekibimize katılmak ister misiniz?" formu var |
| **İletişim** | Çalışma saatleri | "Pazartesi-Cuma: 08:00-18:00" footer'da var, iletişim sayfasında yok |
| **Ürün Detay** | PDF indirme | Eski sitede "Ürün Bilgisi (PDF)" butonu var |
| **Ürün Detay** | Video | Jasper serisinde ürün demosu video var |
| **Blog** | Pagination | 8+ post tek sayfada |
| **KVKK/Gizlilik** | FAQ bölümü | Eski sitede daha detaylı içerik |

### Eksik Dil Versiyonları

| Dil | Eski Site | Yeni Site | Durum |
|-----|-----------|-----------|-------|
| **EN** | 30+ sayfa (ana sayfa, ürünler, ürün detaylar, blog) | 0 | 🔴 Tamamen eksik |
| **RU** | 20+ sayfa (ana sayfa, ürünler) | 0 | 🔴 Tamamen eksik |

---

## 6. FAZ 1: İÇERİK TAMAMLAMA

### 6.1 Projeler Sayfası

**Yeni route**: `src/routes/projeler.tsx`

**İçerik** (eski siteden):
- Özbekistan/Taşkent — Sera Isıtma Tesisatı Kurulumu
- Özbekistan/Harezm — Sera Isıtma Tesisatı Kurulumu
- Türkiye/Manisa — Buhar Kazanı Kurulumu
- Türkiye/İzmir — Sera Isıtma Tesisatı Kurulumu
- Türkiye/Isparta — Orman Ürünlerinin Kurutulması

**SEO**:
- Title: "Projeler | Enorpa Enerji"
- Description: "Enorpa Enerji projeleri. Özbekistan, Türkiye ve dünya genelinde sera ısıtma, buhar kazanı ve kurutma projeleri."
- Canonical: `https://enorpa.com/projeler`
- OG image: Proje görseli

### 6.2 Referanslar Sayfası

**Yeni route**: `src/routes/referanslar.tsx`

**İçerik**: Müşteri referansları, tamamlanan projeler listesi

**SEO**:
- Title: "Referanslar | Enorpa Enerji"
- Description: "Enorpa Enerji referansları. 26 ülkede 138+ proje, 347+ müşteri."
- Canonical: `https://enorpa.com/referanslar`

### 6.3 Jasper Serisi Ürün Detay

**Yeni route**: `src/routes/urunler.jasper-serisi.tsx` (veya Supabase'e ekle)

**Ürün Bilgileri**:
- İsim: Jasper Serisi – Sıvı-Gaz Yakıtlı Buhar Jeneratörü
- Kapasite: 349 kW – 2.093 kW
- Yakıt: Sıvı-Gaz Yakıtlar
- Kazan Tipi: 3 Geçişli, Serpantinli
- Boru Kalitesi: SRM Boru
- Tasarım Standartları: CE Belgeli; TS – 12952 ve 2014/68/EU
- Verim: %91'e Varan Termal Verim
- Kurulukta Buhar: %96
- İzolasyon: 100mm Cam Yünü

**SEO**:
- Title: "Jasper Serisi | Enorpa Enerji"
- Description: "Jasper Serisi Sıvı-Gaz Yakıtlı Buhar Jeneratörü. 349 kW – 2.093 kW, 3 Geçişli serpantinli, %96 kurulukta buhar üretimi."
- Canonical: `https://enorpa.com/urunler/jasper-serisi`
- Product schema ekle

### 6.4 Kategori Sayfaları (Opsiyonel)

Eski sitede ürünler kategoriye göre gruplanmış. Yeni sitede `/urunler` sayfasında filtre olabilir veya ayrı kategori route'ları:

| Kategori | Eski URL | Yeni URL (öneri) |
|---------|---------|-----------------|
| Sıcak Hava Kazanları | `/tr/sicak-hava-kazanlari/` | `/urunler?kategori=sicak-hava` |
| Sıcak Su Kazanları | `/tr/sicak-su-kazanlari/` | `/urunler?kategori=sicak-su` |
| Buhar Kazanları | `/tr/buhar-kazanlari/` | `/urunler?kategori=buhar` |
| Kızgın Su Kazanları | `/tr/kizgin-su-kazanlari/` | `/urunler?kategori=kizgin-su` |

**Not**: Kategori sayfaları yerine `/urunler` sayfasına filtre ekleme daha mantıklı. Bu durumda eski kategori URL'leri `/urunler` sayfasına redirect edilebilir.

---

## 7. FAZ 2: 301 YÖNLENDİRME KURALLARI

### Vercel.json Yapılandırması

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
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ]
}
```

### Redirect Kuralları Özeti

| Kural | Sayı | Açıklama |
|-------|------|----------|
| TR ana sayfa | 1 | `/tr/` → `/` |
| EN/RU ana sayfa | 2 | `/en/`, `/ru/` → `/` |
| TR statik sayfalar | 3 | hakkimizda, iletisim, urunler |
| TR kategori sayfaları | 4 | `/urunler` → redirect |
| TR blog | 2 | `/blog-2/` ve postlar |
| TR ürün detay | 24 | Tüm ürün slugları |
| TR projeler/referanslar | 2 | Yeni route'lara |
| TR jasper | 1 | Ürün detay'a |
| EN/RU tüm | 2 | Catch-all → `/` |
| **Toplam** | **~40+** | |

---

## 8. FAZ 3: SAYFA BAŞINA SEO

### 8.1 Ürün Detay Sayfaları

**Şuanki durum**: Title slug'dan türetiliyor, og:image yok, schema yok

**Yapılacaklar**:

```typescript
// Her ürün detay sayfasında:
head: ({ params }) => {
  const product = await fetchProductBySlug(params.slug);
  return {
    meta: [
      { title: `${product.name} | Enorpa Enerji` },
      { name: "description", content: product.description.slice(0, 155) },
      { property: "og:title", content: `${product.name} | Enorpa Enerji` },
      { property: "og:description", content: product.description.slice(0, 155) },
      { property: "og:type", content: "product" },
      { property: "og:image", content: product.image_url || BRAND_LOGO_URL },
      { property: "og:url", content: `https://enorpa.com/urunler/${params.slug}` },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${product.name} | Enorpa Enerji` },
      { name: "twitter:description", content: product.description.slice(0, 155) },
      { name: "twitter:image", content: product.image_url || BRAND_LOGO_URL },
    ],
    links: [
      { rel: "canonical", href: `https://enorpa.com/urunler/${params.slug}` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.image_url,
          description: product.description,
          brand: { "@type": "Brand", name: "Enorpa Enerji" },
          sku: product.slug,
          offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock"
          }
        })
      }
    ]
  }
}
```

### 8.2 Blog Detay Sayfaları

**Şuanki durum**: Title slug'dan, description hardcoded "Blog yazısı"

**Yapılacaklar**:

```typescript
// Blog detay sayfasında:
head: ({ params }) => {
  const post = await fetchPost(params.slug);
  return {
    meta: [
      { title: `${post.title} | Enorpa Blog` },
      { name: "description", content: post.excerpt.slice(0, 155) },
      { property: "og:title", content: `${post.title} | Enorpa Blog` },
      { property: "og:description", content: post.excerpt.slice(0, 155) },
      { property: "og:type", content: "article" },
      { property: "og:image", content: post.featured_image_url || BRAND_LOGO_URL },
      { property: "og:url", content: `https://enorpa.com/blog/${params.slug}` },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${post.title} | Enorpa Blog` },
      { name: "twitter:description", content: post.excerpt.slice(0, 155) },
      { name: "twitter:image", content: post.featured_image_url || BRAND_LOGO_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          image: post.featured_image_url,
          author: { "@type": "Organization", name: "Enorpa Enerji" },
          datePublished: post.published_at,
          publisher: {
            "@type": "Organization",
            name: "Enorpa Enerji",
            logo: { "@type": "ImageObject", url: BRAND_LOGO_URL }
          },
          description: post.excerpt
        })
      }
    ]
  }
}
```

### 8.3 Tüm Sayfalara BreadcrumbList Schema

```typescript
// Her sayfaya eklenecek:
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://enorpa.com" },
    { "@type": "ListItem", position: 2, name: "Ürünler", item: "https://enorpa.com/urunler" },
    { "@type": "ListItem", position: 3, name: productName, item: `https://enorpa.com/urunler/${slug}` }
  ]
}
```

### 8.4 Anasayfaya WebSite Schema

```typescript
// Index.tsx'e ekle:
{
  type: "application/ld+json",
  children: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Enorpa Enerji",
    url: "https://enorpa.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://enorpa.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  })
}
```

### 8.5 İletişim Sayfasına LocalBusiness Schema

```typescript
{
  type: "application/ld+json",
  children: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Enorpa Enerji",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sanayi Mah. 3231 Sk. No:12",
      addressLocality: "Isparta",
      addressCountry: "TR"
    },
    telephone: "+908504712100",
    openingHours: "Mo-Fr 08:00-18:00"
  })
}
```

---

## 9. FAZ 4: TEKNİK SEO ALTYAPISI

### 9.1 Sitemap.xml Güncelleme

Yeni sitemap.xml'e eklenmesi gerekenler:
- Tüm ürün detay URL'leri
- Blog listesi ve blog post URL'leri
- Projeler, Referanslar URL'leri
- lastmod: 2026-06-28

### 9.2 Robots.txt

Mevcut durum iyi. `/admin` path'i blocked. Ek olarak:

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*

Sitemap: https://enorpa.com/sitemap.xml
```

### 9.3 Meta Tags Kontrol Listesi

| Tag | Root | Ürün | Blog | Diğer |
|-----|------|------|------|-------|
| `<html lang="tr">` | ✅ | ✅ | ✅ | ✅ |
| `<meta charset="utf-8">` | ✅ | ✅ | ✅ | ✅ |
| `<meta name="viewport">` | ✅ | ✅ | ✅ | ✅ |
| `<title>` | ✅ | ✅ (düzelt) | ✅ (düzelt) | ✅ |
| `<meta name="description">` | ✅ | ✅ (düzelt) | ✅ (düzelt) | ✅ |
| `og:title` | ✅ | ✅ | ✅ | ✅ |
| `og:description` | ✅ | ✅ | ✅ | ✅ |
| `og:type` | ✅ | ✅ | ✅ | ✅ |
| `og:image` | ✅ | ❌ → EKLE | ❌ → EKLE | ✅ |
| `og:url` | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE |
| `og:locale` | ❌ → EKLE | ✅ | ✅ | ✅ |
| `og:site_name` | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE |
| `twitter:card` | ✅ | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE |
| `twitter:title` | ✅ | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE |
| `twitter:description` | ✅ | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE |
| `twitter:image` | ✅ | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE |
| `twitter:site` | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE | ❌ → EKLE |
| `canonical` | ✅ | ✅ | ✅ | ✅ |
| JSON-LD | ✅ Org | ❌ → Product | ❌ → BlogPosting | ❌ → BreadcrumbList |

### 9.4 HTTP Security Headers

Vercel.json'da:

```json
{
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

## 10. FAZ 5: GOOGLE SEARCH CONSOLE MİGRASYONU

### Adım 1: Yeni Siteyi GSC'a Kaydet
1. https://search.google.com/search-console
2. "Add property" → `https://enorpa.com`
3. DNS doğrulama (Vercel otomatik yapar)

### Adım 2: Adres Değişikliği Aracı
1. Eski GSC property'sine git
2. "Settings" → "Address Change"
3. Yeni URL'yi seç: `https://enorpa.com`
4. Tüm 301 redirect'lerin çalıştığından emin ol

### Adım 3: Sitemap Gönder
1. Yeni GSC property'sine git
2. "Sitemaps" → "Add a sitemap"
3. `https://enorpa.com/sitemap.xml` ekle

### Adım 4: URL Denetleme
1. Kritik sayfaları tek tek index iste:
   - `https://enorpa.com/`
   - `https://enorpa.com/urunler`
   - `https://enorpa.com/blog`
   - `https://enorpa.com/iletisim`
   - `https://enorpa.com/urunler/has-serisi`
2. "Request indexing" butonuna tıkla

### Adım 5: İzleme (2-4 hafta)
- "Performance" raporunda tıklanma ve impression'ları karşılaştır
- "Coverage" raporunda hatalı sayfaları kontrol et
- 404 hatalarını "Errors" bölümünden izle

---

## 11. FAZ 6: CANLI ÖNCESİ KONTROL LİSTESİ

### SEO Kontrolleri

- [ ] Tüm eski URL'lere 301 redirect çalışıyor mu? (curl -I ile test)
- [ ] Yeni sitemap.xml tüm URL'leri içeriyor mu?
- [ ] robots.txt doğru yapılandırılmış mı?
- [ ] Her sayfada canonical URL var mı?
- [ ] Her sayfada og:image var mı?
- [ ] Her sayfada og:url var mı?
- [ ] Ürün detay sayfalarında Product schema var mı?
- [ ] Blog detay sayfalarında BlogPosting schema var mı?
- [ ] Tüm sayfalarda BreadcrumbList schema var mı?
- [ ] Blog title'ı gerçek post title'ını kullanıyor mu?
- [ ] Blog description'ı excerpt kullanıyor mu?
- [ ] `<html lang="tr">` var mı?
- [ ] HTTP security headers var mı?
- [ ] X-Frame-Options: DENY var mı?
- [ ] HSTS header var mı?

### İçerik Kontrolleri

- [ ] Projeler sayfası var mı?
- [ ] Referanslar sayfası var mı?
- [ ] Jasper Serisi ürün detay var mı?
- [ ] Blog nav linki geri eklendi mi?
- [ ] Tüm ürün görselleri yüklenmiş mi?
- [ ] İletişim sayfasında 3 fabrika adresi var mı?

### Teknik Kontrolleri

- [ ] Tüm sayfalar HTTPS üzerinden açılıyor mu?
- [ ] Mixed content yok mu?
- [ ] Sayfa hızı <3 saniye mi? (Lighthouse)
- [ ] Mobile-friendly mi? (Mobile-Friendly Test)
- [ ] Tüm formlar çalışıyor mu?
- [ ] 404 sayfası özelleştirilmiş mi?

### Sosyal Medya Kontrolleri

- [ ] Facebook Sharing Debugger ile test: https://developers.facebook.com/tools/debug/
- [ ] Twitter Card Validator ile test: https://cards-dev.twitter.com/validator
- [ ] LinkedIn Sharing ile test
- [ ] WhatsApp'ta link paylaşımı test

---

## 12. FAZ 7: CANLI SONRASI İZLEME

### Hafta 1
- [ ] Google Search Console'da "Coverage" raporunu kontrol et
- [ ] 404 hatalarını listele ve düzelt
- [ ] Index edilen sayfa sayısını takip et
- [ ] Analytics trafik karşılaştırması (eski vs yeni)

### Hafta 2
- [ ] Performance raporunda CTR değişimlerini izle
- [ ] En çok aranan anahtar kelimeleri karşılaştır
- [ ] Backlink'leri kontrol et (Ahrefs veya GSC Links)

### Hafta 3-4
- [ ] Organik trafik düşüşü var mı? (%10 normal)
- [ ] Hangi sayfalar düşüş yaşıyor? Analiz et
- [ ] Rich snippet'lar görünüyor mu? (Google'da ara)

### Ay 2-3
- [ ] Tam stabilizasyon
- [ ] İçerik güncellemeleri
- [ ] Yeni backlink kazanımı

---

## 13. EKLER

### Ek A: Screaming Frog Çıktısı Özeti

| Kategori | Değer |
|----------|-------|
| Toplam URL | 440 |
| İç HTML Sayfa | 178 |
| İç PDF | 8 |
| İç Image | 80 |
| İç CSS | 116 |
| İç JavaScript | 39 |
| Dış URL | 19 |
| 2xx | 393 |
| 3xx | 44 |
| 4xx | 2 |
| Meta Desc Missing | 110/137 |
| H1 Missing | 28/137 |
| H1 Duplicate | 34/137 |
| Images Missing Alt | 69/80 |
| Structured Data | 0/137 |
| Canonical Missing | 8/145 |
| hreflang Missing X-Default | 110/137 |

### Ek B: Redirect Test Komutları

```bash
# TR ana sayfa
curl -I https://enorpa.com/tr/

# EN ana sayfa
curl -I https://enorpa.com/en/

# RU ana sayfa
curl -I https://enorpa.com/ru/

# TR ürün detay
curl -I https://enorpa.com/tr/has-serisi/

# EN ürün detay
curl -I https://enorpa.com/en/has-series-hot-air-boilers/

# TR projeler (yeni sayfa)
curl -I https://enorpa.com/projeler/

# TR referanslar (yeni sayfa)
curl -I https://enorpa.com/referanslar/

# TR jasper (yeni ürün)
curl -I https://enorpa.com/urunler/jasper-serisi/

# Blog redirect
curl -I https://enorpa.com/tr/blog-2/

# Her 301 redirect "Location:" header'ı göstermeli
```

### Ek C: Önemli Araçlar

| Araç | URL | Kullanım |
|------|-----|---------|
| Google Search Console | https://search.google.com/search-console | Index izleme |
| Google Analytics 4 | https://analytics.google.com | Trafik izleme |
| Google Rich Results Test | https://search.google.com/test/rich-results | Schema test |
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ | OG test |
| Twitter Card Validator | https://cards-dev.twitter.com/validator | Twitter card test |
| Google Mobile-Friendly Test | https://search.google.com/test/mobile-friendly | Mobile test |
| Google PageSpeed Insights | https://pagespeed.web.dev/ | Hız test |
| Screaming Frog | https://www.screamingfrog.co.uk/seo-spider/ | Site crawl |
| Ahrefs | https://ahrefs.com | Backlink analizi |

### Ek D: İletişim Bilgileri (Eski Site)

| Bilgi | Değer |
|-------|-------|
| Telefon | +90 850 471 2100 |
| E-posta | turuncu@enorpa.com |
| Instagram | @enorpaenerji |
| Adres 1 | Sanayi Mah. 3231 Sk. No:12 Merkez/ISPARTA |
| Adres 2 | Vatan OSB Mah. 304. Cad. No:12 Merkez/ISPARTA |
| Adres 3 | OSB Mah. 17. Cad. No:49 Merkez/KARAMAN |
| Çalışma Saatleri | Pazartesi-Cuma: 08:00-18:00 |

---

**Rehber Sonu**

Bu rehber, enorpa.com sitesinden yeni TanStack Start sitesine kusursuz SEO geçişi için kapsamlı bir iş akışı sunmaktadır. Her faz, önceki fazın tamamlanmasına bağlı olarak ilerlemelidir. 301 redirect'ler ve içerik tamamlama en kritik adımlardır - bunlar olmadan canlıya çıkmak ciddi trafik kaybına yol açacaktır.
