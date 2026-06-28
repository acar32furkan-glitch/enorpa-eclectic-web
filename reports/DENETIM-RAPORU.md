# 🔍 ENORPA ENERJİ — KAPSAMLI SİTE DENETİM RAPORU

**Tarih:** 14 Haziran 2026  
**Denetim Kapsamı:** Tüm route'lar, bileşenler, config, Supabase migrations, güvenlik, build  
**Toplam Sorun:** 28 (🔴 8 Kritik / 🟡 14 Orta / 🟢 6 Düşük)

---

## 🔴 KRİTİK SORUNLAR

### 1. Hardcoded Supabase Anahtarı
- **Dosya:** `src/data/products.ts` (satır ~121-125)
- **Açıklama:** Supabase URL ve anon key doğrudan kaynak koda yazılmış. Herkes tarayıcıdan görebilir.
- **Öneri:** `import.meta.env.VITE_SUPABASE_URL` ve `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY` kullanın.

### 2. Service Role Key .env Dosyasında Repo'da
- **Dosya:** `.env` (satır ~5)
- **Açıklama:** `SUPABASE_SERVICE_ROLE_KEY` `.env` dosyasında ve repo'da mevcut. `.gitignore`'da `.env` olsa da, dosya zaten commit edilmiş.
- **Öneri:** `.env` dosyasını repo'dan kaldırın, Vercel environment variables olarak ekleyin, key'i rotate edin.

### 3. site_settings Tablosunda RLS Politikası Yok
- **Dosya:** `supabase/migrations/20260612171148_ec7cc6c8-8467-4b0e-89d6-5c8a9204f0c4.sql`
- **Açıklama:** `site_settings` tablosunda `ENABLE ROW LEVEL SECURITY` ve policy tanımlanmamış. Herkes okuyabilir/yazabilir.
- **Öneri:** RLS ekleyin, sadece admin rolündekilerin yazmasına izin verin.

### 4. Footer Linkleri Hepsi #contact'a Gidiyor
- **Dosya:** `src/routes/index.tsx` (satır ~1604-1621)
- **Açıklama:** Footer'daki "Ürünler" ve "Kurumsal" sütunlarındaki tüm linkler `#contact` anchor'una yönlendiriyor.
- **Öneri:** Her linki doğru sayfaya yönlendirin (`/urunler`, `/hakkimizda`, `#refs`, `#docs`, `#contact`).

### 5. Test WhatsApp Numarası
- **Dosya:** `src/routes/index.tsx` (satır ~134)
- **Açıklama:** `const WHATSAPP = "905551112233"` — Mobil bar ve desktop WhatsApp butonu bu test numarasını kullanıyor.
- **Öneri:** Gerçek numarayı kullanın: `908504712100` (`__root.tsx`'deki gibi).

### 6. Test Email Adresi
- **Dosya:** `supabase/functions/notify-lead/index.ts` (satır ~6)
- **Açıklama:** `const ADMIN_EMAIL = "admin@enorpa-test.com"` — Bildirimler bu adrese gidiyor.
- **Öneri:** Gerçek admin email adresiyle değiştirin.

### 7. OG Image URL'si Lovable Preview CDN
- **Dosya:** `src/routes/__root.tsx` (satır ~89-90)
- **Açıklama:** OG image URL'si Lovable preview CDN'den geliyor (`https://preview.lovable.dev/...`).
- **Öneri:** Kendi domain'inize ait bir OG image kullanın.

### 8. Hata Sayfaları İngilizce
- **Dosya:** `src/routes/__root.tsx` (satır ~48-52) ve `src/lib/error-page.ts` (satır ~21-22)
- **Açıklama:** 404 ve hata sayfaları İngilizce metinler içeriyor.
- **Öneri:** Türkçe hata sayfaları oluşturun.

---

## 🟡 ORTA SORUNLAR

### 9. Alt Sayfalarda Footer Yok
- **Dosyalar:** `src/routes/urunler.tsx`, `src/routes/hakkimizda.tsx`, `src/routes/gizlilik-politikasi.tsx`, `src/routes/kvkk.tsx`, `src/routes/cerez-politikasi.tsx`
- **Açıklama:** Alt sayfalarda `SiteFooter` bileşeni render edilmiyor. Sadece anasayfada var.
- **Öneri:** Footer'ı `__root.tsx`'e taşıyın veya tüm sayfalara ekleyin.

### 10. Alt Sayfalarda Ana Navigasyon Eksik
- **Dosyalar:** `/urunler`, `/hakkimizda`, `/gizlilik-politikasi`, `/kvkk`, `/cerez-politikasi`
- **Açıklama:** Alt sayfalarda ana navigasyon (Ürünler, Hakkımızda, İletişim vb.) yok. Sadece logo + "← Anasayfa" var.
- **Öneri:** Ortak bir `PageHeader` bileşeni oluşturun ve tüm sayfalarda kullanın.

### 11. Admin Sayfalarında head() Tanımlanmamış
- **Dosyalar:** `src/routes/admin._protected.dashboard.tsx`, `src/routes/admin._protected.leads.tsx`, `src/routes/admin._protected.products.tsx`, `src/routes/admin._protected.settings.tsx`
- **Açıklama:** Admin sayfalarında `head()` fonksiyonu yok, SEO meta tag'leri eksik.
- **Öneri:** Her admin sayfasına `head()` ekleyin (en azından title için).

### 12. Admin Dashboard/Leads/Products Hata Durumu Ele Alınmamış
- **Dosyalar:** `src/routes/admin._protected.dashboard.tsx` (satır ~37-48), `src/routes/admin._protected.leads.tsx` (satır ~42-50), `src/routes/admin._protected.products.tsx` (satır ~42-47)
- **Açıklama:** Supabase sorgularında hata durumu ele alınmamış. Loading state var ama error handling yok.
- **Öneri:** Her sorguda error kontrolü ve kullanıcıya hata mesajı gösterin.

### 13. Cookie Banner ve Mobil Bar Çakışması
- **Dosyalar:** `src/routes/__root.tsx` (satır ~171-192) ve `src/routes/index.tsx` (satır ~390-408)
- **Açıklama:** Cookie banner (`fixed bottom-0`) ve mobil sticky bar (`fixed bottom-0`) üst üste binebilir.
- **Öneri:** Cookie banner'ı mobil bar'ın üstüne taşıyın veya mobil bar olduğunda gizleyin.

### 14. Tüm Ürünlerde Aynı Görsel
- **Dosyalar:** `src/routes/index.tsx` (satır ~131-132), `src/routes/urunler.tsx` (satır ~119)
- **Açıklama:** Tüm ürünlerde aynı Unsplash fotoğrafı kullanılıyor.
- **Öneri:** Her ürün için özel görsel ekleyin veya en azından kategori bazlı farklı görseller kullanın.

### 15. Proje Galerisi Placeholder
- **Dosya:** `src/routes/index.tsx` (satır ~1201-1210)
- **Açıklama:** Proje galerisinde gerçek fotoğraf yok, "Fotoğraf" placeholder'ı var.
- **Öneri:** Gerçek proje fotoğrafları ekleyin.

### 16. Google Maps Placeholder
- **Dosya:** `src/routes/index.tsx` (satır ~1584-1586)
- **Açıklama:** Footer'da Google Maps entegrasyonu yapılmamış, placeholder var.
- **Öneri:** Google Maps iframe veya harita entegrasyonu ekleyin.

### 17. Sitemap Eksik Sayfalar
- **Dosya:** `public/sitemap.xml`
- **Açıklama:** Sadece anasayfa, ürünler ve hakkımızda var. KVKK, çerez politikası, gizlilik eksik.
- **Öneri:** Tüm public sayfaları sitemap'e ekleyin.

### 18. Placeholder Müşteri Yorumları
- **Dosya:** `src/routes/index.tsx` (satır ~1203-1208)
- **Açıklama:** "Ahmet Yılmaz", "+90 555 111 22 33" gibi placeholder yorumlar var.
- **Öneri:** Gerçek yorumlar ekleyin veya bölümü kaldırın.

### 19. Dil Seçimi Alt Sayfalarda Yok
- **Dosya:** `src/routes/index.tsx` (satır ~66-128)
- **Açıklama:** TR/EN/RU dil seçeneği var ama alt sayfalarda yok.
- **Öneri:** Dil seçimini tüm sayfalarda tutarlı yapın.

### 20. Admin Sidebar'da Ayarlar İkonu Yanlış
- **Dosya:** `src/routes/admin._protected.tsx` (satır ~80)
- **Açıklama:** "Ayarlar" için `LayoutDashboard` ikonu kullanılmış (dashboard ile aynı ikon).
- **Öneri:** `Settings` veya `Cog` ikonu kullanın.

### 21. WhatsApp Test Numarası (Mobil Bar)
- **Dosya:** `src/routes/index.tsx` (satır ~146)
- **Açıklama:** Mobil bottom bar'da da test numarası kullanılıyor.
- **Öneri:** `__root.tsx`'deki gerçek numarayla (`908504712100`) değiştirin.

### 22. Hardcoded Supabase Bilgileri (Ürün Verileri)
- **Dosya:** `src/data/products.ts` (satır ~121-125)
- **Açıklama:** `src/data/products.ts` içinde Supabase client'ı hardcoded URL/key ile oluşturulmuş.
- **Öneri:** Merkezi Supabase client'ı (`src/integrations/supabase/client.ts`) kullanın.

---

## 🟢 DÜŞÜK — İYİLEŞTİRME ÖNERİLERİ

### 23. Package Manager Tutarsızlığı
- **Dosya:** `package.json`, `bun.lock`, `package-lock.json`
- **Açıklama:** Hem `package-lock.json` hem `bun.lock` birlikte var. Tutarsız package manager kullanımı.
- **Öneri:** Tek package manager kullanın (bun önerilir — `bunfig.toml` mevcut).

### 24. Kullanılmayan UI Bileşenleri
- **Dosya:** `src/components/ui/`
- **Açıklama:** 40+ shadcn/ui bileşeni var, çoğu kullanılmıyor (aspect-ratio, avatar, badge, breadcrumb, calendar, context-menu, drawer, hover-card, input-otp, menubar, pagination, progress, radio-group, resizable vb.).
- **Öneri:** Kullanılmayan bileşenleri kaldırın.

### 25. @supabase/supabase-js Güncel Değil
- **Dosya:** `package.json`
- **Açıklama:** `@supabase/supabase-js` v2.108.1 — Güncel sürümden eski.
- **Öneri:** En güncel sürüme yükseltin.

### 26. React v19 Uyum Riski
- **Dosya:** `package.json`
- **Açıklama:** `react` v19.2.0 — Çok yeni, bazı kütüphanelerle uyum sorunu olabilir.
- **Öneri:** Tüm bağımlılıkların React 19 uyumlu olduğundan emin olun.

### 27. noUnusedLocals/Parameters Kapalı
- **Dosya:** `tsconfig.json` (satır ~19-20)
- **Açıklama:** `noUnusedLocals: false`, `noUnusedParameters: false` — Kullanılmayan değişkenler kalabilir.
- **Öneri:** Bu ayarları açın ve kullanılmayan değişkenleri temizleyin.

### 28. Admin Sidebar Sabit Genişlik
- **Dosya:** `src/routes/admin._protected.tsx` (satır ~90)
- **Açıklama:** `w-64` sabit genişlik — Küçük ekranlarda taşma riski.
- **Öneri:** Responsive sidebar yapın (drawer veya collapsible).

---

## ROUTE/SAYFA ENVANTERİ

| Sayfa | Header/Navbar | Footer | Cookie Banner | WhatsApp | SEO Meta | JSON-LD |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|
| `/` (index.tsx) | ✅ | ✅ | ✅ (__root) | ✅ | ✅ | ✅ (__root) |
| `/urunler` | ⚠️ Sadece logo | ❌ | ✅ (__root) | ✅ (__root) | ✅ | ❌ |
| `/hakkimizda` | ⚠️ Sadece logo | ❌ | ✅ (__root) | ✅ (__root) | ✅ | ❌ |
| `/gizlilik-politikasi` | ⚠️ Sadece logo | ❌ | ✅ (__root) | ✅ (__root) | ✅ | ❌ |
| `/kvkk` | ⚠️ Sadece logo | ❌ | ✅ (__root) | ✅ (__root) | ✅ | ❌ |
| `/cerez-politikasi` | ⚠️ Sadece logo | ❌ | ✅ (__root) | ✅ (__root) | ✅ | ❌ |
| `/admin/login` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `/admin/dashboard` | ✅ (sidebar) | ❌ | ❌ | ❌ | ❌ | ❌ |
| `/admin/leads` | ✅ (sidebar) | ❌ | ❌ | ❌ | ❌ | ❌ |
| `/admin/products` | ✅ (sidebar) | ❌ | ❌ | ❌ | ❌ | ❌ |
| `/admin/settings` | ✅ (sidebar) | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## ÖNCELİK SIRALAMASI (Önerilen)

| Öncelik | Sorun | Kategori |
|:---:|---|---|
| 1 | Hardcoded Supabase Anahtarı | 🔴 Güvenlik |
| 2 | Service Role Key repo'da | 🔴 Güvenlik |
| 3 | site_settings RLS eksik | 🔴 Güvenlik |
| 4 | Footer linkleri yanlış | 🔴 Navigasyon |
| 5 | Test WhatsApp numarası | 🔴 Navigasyon |
| 6 | Test email adresi | 🔴 Navigasyon |
| 7 | OG Image Lovable CDN | 🔴 Marka |
| 8 | Hata sayfaları İngilizce | 🔴 UX |
| 9 | Alt sayfalarda Footer yok | 🟡 UX |
| 10 | Alt sayfalarda Navigasyon yok | 🟡 UX |
| 11 | Admin head() eksik | 🟡 SEO |
| 12 | Admin hata yönetimi eksik | 🟡 Güvenilirlik |
| 13 | Cookie banner + mobil bar çakışması | 🟡 UX |
| 14 | Ürün görselleri aynı | 🟡 İçerik |
| 15 | Proje galerisi placeholder | 🟡 İçerik |
| 16 | Google Maps placeholder | 🟡 İçerik |
| 17 | Sitemap eksik sayfalar | 🟡 SEO |
| 18 | Placeholder yorumlar | 🟡 İçerik |
| 19 | Dil seçimi alt sayfalarda yok | 🟡 UX |
| 20 | Admin Ayarlar ikonu yanlış | 🟡 UI |
| 21 | Mobil bar test numarası | 🟡 Navigasyon |
| 22 | Hardcoded Supabase (products.ts) | 🟡 Güvenlik |
| 23 | Package manager tutarsızlığı | 🟢 Temizlik |
| 24 | Kullanılmayan UI bileşenleri | 🟢 Temizlik |
| 25 | @supabase/supabase-js eski | 🟢 Güncelleme |
| 26 | React v19 uyum riski | 🟢 Güncelleme |
| 27 | noUnusedLocals kapalı | 🟢 Kalite |
| 28 | Admin sidebar sabit genişlik | 🟢 Responsive |

---

*Bu rapor FAZ 14 kapsamında, architect modunda kapsamlı denetim sonucu oluşturulmuştur. Hiçbir kod değişikliği yapılmamıştır.*
