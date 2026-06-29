# WordPress vs Yeni Site Karşılaştırma Raporu
> Tarih: 2026-06-29

## Özet

| Metrik | WordPress (Eski) | Yeni Site | Durum |
|--------|------------------|-----------|-------|
| Toplam Sayfa | 81 | ~35 route | ⚠️ Eksik |
| Blog Yazısı | 19 | 8 (SQL'de) | ⚠️ Eksik |
| Ürün Sayfası | ~24 | 24 (products.ts) | ✅ |
| Dil Desteği | TR/EN/RU | TR/EN/RU | ✅ |

---

## 1. EKSİK SAYFALAR

### WordPress'te Olup Yeni Site Olmayan Sayfalar

| WordPress URL | Title | Yeni Site Durumu |
|---------------|-------|-----------------|
| `/tr/` | Anasayfa | ✅ `/` - Çalışıyor |
| `/tr/hakkimizda/` | Hakkımızda | ✅ `/hakkimizda` - Çalışıyor |
| `/tr/iletisim/` | İletişim | ✅ `/iletisim` - Çalışıyor |
| `/tr/urunler/` | Ürünler | ✅ `/urunler` - Çalışıyor |
| `/tr/projeler/` | Projeler | ✅ `/projeler` - Çalışıyor |
| `/tr/referanslarimiz/` | Referanslarımız | ✅ `/referanslar` - Çalışıyor |
| `/tr/blog-2/` | Blog | ✅ `/blog` - Çalışıyor |
| `/tr/oniks-serisi/` | Oniks Serisi | ✅ `/urunler/oniks-serisi` - Çalışıyor |
| `/tr/obsidyen-serisi/` | Obsidyen Serisi | ✅ `/urunler/obsidyen-serisi` |
| `/tr/akuamarin-serisi/` | Akuamarin Serisi | ✅ `/urunler/akuamarin-serisi` |
| `/tr/ametist-serisi/` | Ametist Serisi | ✅ `/urunler/ametist-serisi` |
| `/tr/turkuaz-serisi/` | Turkuaz Serisi | ✅ `/urunler/turkuaz-serisi` |
| `/tr/kalsedon-serisi/` | Kalsedon Serisi | ✅ `/urunler/kalsedon-serisi` |
| `/tr/has-serisi/` | HAS Serisi | ✅ `/urunler/has-serisi` |
| `/tr/has-ng-serisi/` | HAS NG Serisi | ✅ `/urunler/has-ng-serisi` |
| `/tr/has-turbo-serisi/` | HAS Turbo Serisi | ✅ `/urunler/has-turbo-serisi` |
| `/tr/kuvars-serisi-tek-kulhanli/` | Kuvars Serisi (Tek) | ✅ `/urunler/kuvars-serisi-tek-kulhanli` |
| `/tr/kuvars-serisi-cift-kulhanli/` | Kuvars Serisi (Çift) | ✅ `/urunler/kuvars-serisi-cift-kulhanli` |
| `/tr/kuvars-ng-serisi/` | Kuvars NG Serisi | ✅ `/urunler/kuvars-ng-serisi` |
| `/tr/turmalin-serisi/` | Turmalin Serisi | ✅ `/urunler/turmalin-serisi` |
| `/tr/kizgin-su-kazanlari/` | Kızgın Su Kazanları | ⚠️ `/urunler` redirect |
| `/tr/sicak-su-kazanlari/` | Sıcak Su Kazanları | ✅ Kategori sayfası |
| `/tr/sicak-hava-kazanlari/` | Sıcak Hava Kazanları | ✅ Kategori sayfası |
| `/tr/buhar-kazanlari/` | Buhar Kazanları | ✅ Kategori sayfası |
| `/tr/brulorler/` | Brülörler | ✅ `/urunler/brulorler` |
| `/tr/baca/` | Baca | ✅ `/urunler/baca` |
| `/tr/yedek-parca/` | Yedek Parça | ⚠️ `/urunler/yedek-parca` - Boş |
| `/tr/ekonomizer/` | Ekonomizer | ✅ `/urunler/ekonomizer` |
| `/tr/kondenser/` | Kondenser | ✅ `/urunler/kondenser` |
| `/tr/kazan-kontrol-panosu/` | Kazan Kontrol Panosu | ⚠️ `/urunler/kazan-kontrol-panosu` - Boş |
| `/tr/kazan-otomasyon-sistemi/` | Kazan Otomasyon Sistemi | ⚠️ `/urunler/kazan-otomasyon-sistemi` - Boş |
| `/tr/anahtar-teslim-sera-isitma-sistemi/` | Anahtar Teslim Sera Isıtma Sistemi | ✅ |
| `/tr/kat-kaloriferi/` | Kat Kaloriferi | ⚠️ `/urunler/kat-kaloriferi` - Boş |
| `/tr/riello/` | Riello | ⚠️ `/urunler/riello` - Boş |
| `/tr/ecostar/` | Ecostar | ⚠️ `/urunler/ecostar` - Boş |
| `/tr/ecoflam/` | Ecoflam | ⚠️ `/urunler/ecoflam` - Boş |
| `/tr/cift-cidarli-baca/` | Çift Çidarlı Baca | ⚠️ `/urunler/cift-cidarli-baca` - Boş |
| `/tr/tek-cidarli-baca/` | Tek Çidarlı Baca | ⚠️ `/urunler/tek-cidarli-baca` - Boş |
| `/en/` | Home (EN) | ✅ `/en` - Çalışıyor |
| `/en/about-us/` | About Us (EN) | ✅ `/en/about` - Çalışıyor |
| `/en/contact/` | Contact (EN) | ✅ `/en/contact` - Çalışıyor |
| `/en/products/` | Products (EN) | ✅ `/en/products` - Çalışıyor |
| `/en/projects/` | Projects (EN) | ✅ `/en/portfolio` - Çalışıyor |
| `/en/blog/` | Blog (EN) | ✅ `/en/blog` - Çalışıyor |
| `/en/references/` | References (EN) | ✅ `/en/referanslar` redirect |
| `/ru/` | Главная (RU) | ✅ `/ru` - Çalışıyor |
| `/en/steam-boilers/` | Steam Boilers (EN) | ❌ EKSİK |
| `/en/hot-water-boilers/` | Hot Water Boilers (EN) | ❌ EKSİK |
| `/en/hot-air-boilers/` | Hot Air Boilers (EN) | ❌ EKSİK |
| `/en/central-heating/` | Central Heating (EN) | ❌ EKSİK |
| `/en/superheated-water-boilers/` | Superheated Water Boilers (EN) | ❌ EKSİK |
| `/en/burners/` | Burners (EN) | ❌ EKSİK |
| `/en/chimneys/` | Chimneys (EN) | ❌ EKSİK |
| `/en/condenser/` | Condenser (EN) | ❌ EKSİK |
| `/en/economizer/` | Economizer (EN) | ❌ EKSİK |
| `/en/spare-parts/` | Spare Parts (EN) | ❌ EKSİK |
| `/en/boiler-control-panel/` | Boiler Control Panel (EN) | ❌ EKSİK |
| `/en/boiler-automation-system/` | Boiler Automation System (EN) | ❌ EKSİK |
| `/en/turnkey-greenhouse-heating-system/` | Turnkey Greenhouse (EN) | ❌ EKSİK |

## 2. İÇERİK KARŞILAŞTIRMASI

### Hakkımızda Sayfası

**WordPress (ID: 6619):**
- Title: Hakkımızda
- Content: Uzun metin, şirket tanıtımı, tarihçe, vizyon, misyon, sertifikalar, ekip bilgisi

**Yeni Site (`/hakkimizda`):**
- Title: Hakkımızda | Enorpa Enerji
- Content: Kısa placeholder metin

**Durum:** ⚠️ İÇERİK EKSİK - WordPress içeriği migrate edilmedi

### İletişim Sayfası

**WordPress (ID: 25):**
- Title: İletişim
- Content: Adres, telefon, e-posta, harita, form

**Yeni Site (`/iletisim`):**
- Title: İletişim | Enorpa Enerji
- Content: Form var, adres bilgisi var

**Durum:** ✅ Yeterli

### Projeler Sayfası

**WordPress (ID: 21):**
- Title: Projeler
- Content: Proje listesi, görsel galeri, proje detayları

**Yeni Site (`/projeler`):**
- Title: Projeler | Enorpa Enerji
- Content: galeri var, Content: kısa

**Durum:** ⚠️ PROJE DETAYLARI EKSİK

### Referanslar Sayfası

**WordPress (ID: 7008):**
- Title: Referanslarımız
- Content: Referans şirketleri, müşteri yorumları, istatistikler

**Yeni Site (`/referanslar`):**
- Title: Referanslar | Enorpa Enerji
- Content: Placeholder isimler, placeholder yorumlar

**Durum:** ⚠️ İÇERİK EKSİK - Gerçek referans ve yorum bilgisi yok

---

## 3. BLOG YAZILARI KARŞILAŞTIRMASI

### WordPress Blog Yazıları (19 yazı)

| Slug | Title | EN/RU Var mı? |
|------|-------|---------------|
| `/tr/blog-2/kondenser-nedir-calisma-prensibi-verim-ve-uygulamalar-2` | Kondenser Nedir? | ❌ SQL'de var, içerik yok |
| `/tr/blog-2/has-serisi-sicak-hava-kazanlari` | HAS SERİSİ Sıcak Hava Kazanları | ❌ SQL'de var, içerik yok |
| `/tr/blog-2/turmalin-serisi-buhar-kazani-endustriyel-isitmanin-yeni-yuzu` | Turmalin Serisi Buhar Kazanı | ❌ SQL'de var, içerik yok |
| `/tr/blog-2/growtech-2023-antalya` | Growtech 2023, Antalya | ❌ SQL'de EKSİK |
| `/tr/blog-2/neden-enorpa` | Neden Enorpa Enerji Kazanları... | ❌ SQL'de var |
| `/tr/blog-2/domat-expo-antalya-2019` | Domat Expo, Antalya (2019) | ❌ SQL'de EKSİK |
| `/tr/blog-2/greenhouse-almati-kazakistan` | GreenHouses, Almatı/Kazakistan | ❌ SQL'de EKSİK |
| `/tr/blog-2/growtech-antalya-23` | Growtech 2023, Antalya | ❌ SQL'de EKSİK |
| `/tr/blog-2/agroworld-ozbekistan` | Agroworld 2020, Taşkent/Özbekistan | ❌ SQL'de EKSİK |

**Durum:** ⚠️ Blog yazıları SQL'de tanımlı ama içerik yok, feature image yok, bazı yazılar SQL'de bile yok

---

## 4. ÜRÜN KARŞILAŞTIRMASI

### products.ts vs WordPress Ürünleri

WordPress'te 24 ürün sayfası var. `products.ts`'de 24 ürün tanımlı.

Tüm ürünler products.ts'de mevcut.

---

## 5. ÖZET AKSIYON LİSTESİ

### Kritik (Yapılmalı)
1. **Hakkımızda içeriği** - WordPress'ten içeriği çekip `/hakkimizda.tsx`'e ekle
2. **Referanslar içeriği** - Gerçek referans şirketleri ve müşteri yorumları (placeholder'ları kaldır)
3. **Blog yazıları içeriği** - SQL'deki slug'lara karşılık gelen içerikleri Supabase'e ekle
4. **Projeler içeriği** - Proje detaylarını ekle
5. **EN/RU kategori sayfaları** - `/en/steam-boilers`, `/en/burners` vb. sayfaları ekle veya redirect

### Önemli (Yapılması Önerilir)
6. **Yedek Parça, Kazan Kontrol Panosu, Kazan Otomasyon, Kat Kaloriferi, Riello, Ecostar, Ecoflam, Çift Çidarlı Baca, Tek Çidarlı Baca** - Ürün detay sayfaları boş, içerik eklenmeli
7. **İstatistikler (26/138/347)** - Gerçek veriye güncellenmeli veya kaldırılmalı
8. **SSs sayfası** - İçerik kontrolü

### Opsiyonel
9. **Blog featured image** - Supabase'de image_url alanı doldurulmalı
10. **SEO verification** - Google Schema Validator, hreflang test
