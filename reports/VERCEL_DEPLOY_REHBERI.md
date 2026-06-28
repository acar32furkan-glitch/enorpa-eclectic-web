# Vercel Deploy Rehberi — enorpa-eclectic-web

Bu proje **TanStack Start** (SSR — Sunucu Taraflı Render) ile çalışmaktadır. Vercel'e deploy etmek için iki seçenek vardır.

---

## 📋 Ön Koşullar

- [Vercel CLI](https://vercel.com/docs/cli) yüklü olmalı: `npm i -g vercel`
- Bir [Vercel hesabınız](https://vercel.com) olmalı (GitHub ile bağlanabilirsiniz)
- Proje bir Git reposuna bağlı olmalı (zaten klonlandı)

---

## 🚀 Seçenek 1: Vercel CLI ile (Hızlı)

```bash
# 1. Proje dizininde olduğunuzdan emin olun
cd c:/Users/admin/Desktop/enorpa/enorpa_websitesi/enorpa-eclectic-web

# 2. Vercel'e giriş yapın (tarayıcı açılacak)
vercel login

# 3. Projeyi Vercel'e deploy edin
vercel --prod
```

CLI sizden şu bilgileri isteyecek:

| Soru | Cevap |
|------|-------|
| Set up and deploy? | `Y` (yes) |
| Which scope? | Hesabınızı seçin |
| Link to existing project? | `N` (no) |
| Project name? | `enorpa-eclectic-web` (enter) |
| Directory? | `.` (enter — mevcut dizin) |
| Override settings? | `N` (no) |

---

## 🚀 Seçenek 2: Vercel Dashboard ile (GitHub Entegrasyonu)

1. **GitHub'a push edin:**
   ```bash
   git add .
   git commit -m "Vercel deploy için hazırlık"
   git push origin main
   ```

2. **Vercel Dashboard'a gidin:** https://vercel.com

3. **"Add New → Project"** butonuna tıklayın.

4. GitHub reposu olarak `acar32furkan-glitch/enorpa-eclectic-web` seçin.

5. **Framework Preset:** Vercel otomatik olarak **Vite** algılayacaktır. Manuel ayar gerekmez.

6. **Build & Output Settings** (Varsayılan bırakın):
   | Ayar | Değer |
   |------|-------|
   | Build Command | `npm run build` |
   | Output Directory | `.vercel/output/static` (TanStack Start için) |
   | Install Command | `npm install` |

7. **Environment Variables:** (gerekirse ekleyin)
   - `VITE_SUPABASE_URL` — Supabase proje URL'iniz
   - `VITE_SUPABASE_ANON_KEY` — Supabase anon key'iniz

8. **"Deploy"** butonuna tıklayın.

---

## ⚙️ Proje Yapılandırması (Önemli Notlar)

### `vercel.json` (zaten oluşturuldu ✅)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Bu dosya, doğrudan URL girildiğinde veya sayfa yenilendiğinde oluşan **404 hatalarını** önler.

### TanStack Start (SSR) Desteği

Proje [`@lovable.dev/vite-tanstack-config`](package.json:2) kullanıyor. Bu, Vercel'de SSR olarak çalışır. Eğer **statik SPA** olarak deploy etmek isterseniz, aşağıdaki değişiklikler gerekir:

1. [`vite.config.ts`](vite.config.ts) dosyasında `tanstackStart` konfigürasyonunu kaldırın
2. `npm uninstall @lovable.dev/vite-tanstack-config` çalıştırın
3. Standart Vite React config kullanın

---

## 🔍 Deploy Sonrası Kontrol

```bash
# Deploy durumunu görüntüle
vercel list

# Deploy loglarını görüntüle
vercel logs <deploy-url>
```

---

## 🛠 Sık Karşılaşılan Sorunlar

| Sorun | Çözüm |
|-------|-------|
| **404 on refresh** | [`vercel.json`](vercel.json) dosyasının doğru olduğundan emin olun |
| **Build hatası** | `npm run build` ile lokal test edin |
| **Environment variable eksik** | Vercel Dashboard → Project Settings → Environment Variables |
| **Domain bağlama** | Vercel Dashboard → Project → Domains |
| **SSL sertifikası** | Vercel otomatik olarak SSL sağlar |

---

## 🔗 Faydalı Linkler

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [TanStack Start Deployment](https://tanstack.com/router/latest/docs/framework/react/start/hosting/vercel)
