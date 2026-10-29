#!/usr/bin/env node
/**
 * Orijinal siteden indirilen görselleri siteye aktarır.
 *
 * Kaynak: enorpa.com WordPress `wp-content/uploads` klasörünün yerel kopyası
 * (varsayılan: ../../enorpa-images/enorpa-images/enorpa.com/wp-content/uploads)
 *
 * Yaptıkları:
 *   1. Ürün render'larını eşleştirip WebP'ye çevirir → public/img/products/<slug>.webp
 *   2. Proje fotoğraflarını → public/img/projects/<slug>.webp
 *   3. Hero + OG kapak görselini üretir
 *   4. Sertifika rozetlerini ve logoyu kopyalar
 *   5. `src/lib/product-images.generated.ts` dosyasını yazar (slug → görsel yolu)
 *
 * Kullanım:
 *   node scripts/import-original-images.mjs
 *   node scripts/import-original-images.mjs --source "D:\baska\uploads"
 */
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMG = path.join(ROOT, "public", "img");

const args = process.argv.slice(2);
const sourceArgIdx = args.indexOf("--source");
const DEFAULT_SOURCE = path.resolve(
  ROOT,
  "..",
  "..",
  "enorpa-images",
  "enorpa-images",
  "enorpa.com",
  "wp-content",
  "uploads",
);
const SOURCE = sourceArgIdx >= 0 ? path.resolve(args[sourceArgIdx + 1]) : DEFAULT_SOURCE;

/* --------------------------------------------------------------- eşleşmeler */

// Ürün slug → kaynak dosya adı desenleri (ilk eşleşen kullanılır)
const PRODUCT_PATTERNS = {
  "oniks-serisi": [/^NX6-R3-Render-01\.89\.png$/i, /oniks/i, /^Kuvars60\.png$/i],
  "obsidyen-serisi": [/^OBS3-RND-2021/i, /obsidyen/i],
  "akuamarin-serisi": [
    /^Akuamarin-Urun-LIste-1\.png$/i,
    /^AKM-R3\.On-Izometrik\.png$/i,
    /^Akuamarin-11-1024x1024\.png$/i,
    /^Akuamarin-1-scaled\.png$/i,
    /akuamarin/i,
  ],
  "ametist-serisi": [/^Ametist-2500-Render\.1\.png$/i, /ametist/i],
  "turkuaz-serisi": [
    /^Turkuaz-Urun-Gorseli\.png$/i,
    /^Turkuaz-render\.png$/i,
    /^Turkuaz-Serisi-Render-1\.99\.png$/i,
    /turkuaz/i,
  ],
  "kalsedon-serisi": [
    /^Kalsedon1500-Kazan-Render-Arka\.png$/i,
    /^KALS30-Render-2\.86-1024x665\.png$/i,
    /^KALS30-Render-2\.png$/i,
    /kalsedon/i,
  ],
  "kuvars-serisi-tek-kulhanli": [
    /^Kuvars-2000\.jpg$/i,
    /^Kuvars60-1024x724\.png$/i,
    /^Kuvars60\.png$/i,
    /kuvars/i,
  ],
  "kuvars-serisi-cift-kulhanli": [/^kuvars-slider-2\.jpg$/i, /^kuvars-slider\.jpg$/i],
  "kuvars-ng-serisi": [/^kuvars-slider-3\.jpg$/i, /^kuvars-slider-4\.jpg$/i],
  "turmalin-serisi": [/^TRM-1\.png$/i, /^TRM30-Render/i, /^TRM-2\.png$/i, /turmalin/i],
  "has-serisi": [
    /^HAS-Serisi-Kazan-Render-01\.png$/i,
    /^HAS-Serisi-Kazan-Render-01-1024x640\.png$/i,
    /^HAS-Mobil-50-2-1\.png$/i,
    /^HAS-Mobil-50-2-3\.png$/i,
  ],
  "has-ng-serisi": [/^eco-30-g-c-2a/i, /^a1-gecici-1/i, /^HAS-Mobil-50-2-3/i],
  "has-turbo-serisi": [/^HT6-Render-1\.91\.png$/i, /^HT6-Render-1\.94\.png$/i],
  "akuamarin-ks-serisi": [/^Akuamarin-11-1024x1024\.png$/i, /^Akuamarin-1-scaled\.png$/i],
  "turkuaz-ks-serisi": [/^Turkuaz-Serisi-Render-1\.100\.png$/i, /^Turkuaz-Serisi-Render-1\.99\.png$/i],
  "kat-kaloriferi": [/^kat-kaloriferleri-1-liste/i, /^kat-kaloriferleri-2-liste/i, /kat-kalorifer/i],
  "anahtar-teslim-sera-isitma-sistemi": [
    /^Sera-Isitma-2-1024x576\.jpg$/i,
    /^Sera-Isitma\.jpg$/i,
    /^Sera-Isitma-3\.jpg$/i,
  ],
  brulorler: [/^Riello-Brulor\.png$/i, /brulor/i],
  baca: [/^Cift-Cidarli-Baca-1024x768\.jpg$/i, /^Tek-Cidarli-Baca-768x1024\.jpg$/i, /baca/i],
  kondenser: [/^Kondenser\.png$/i, /^kazan-kondensor\.png$/i, /kondens/i],
  ekonomizer: [/^Ekonomizer\.png$/i, /^Ekonomizer-2\.png$/i, /ekonomizer/i],
  "kazan-otomasyon-sistemi": [/^Obsidyen-Otomasyon\.jpg$/i, /otomasyon/i],
  "kazan-kontrol-panosu": [/^Standart-Kazan-Panosu\.jpg$/i, /panosu/i],
  "yedek-parca": [/^a1-gecici-1-1024x683\.png$/i, /^eco-30-g-c-2a/i, /yedek/i],
};

// Proje slug → kaynak dosya desenleri
const PROJECT_PATTERNS = {
  taskent: [/^tashkent-slider-1196x900\.jpg$/i, /^Tashkent\.jpg$/i, /tashkent/i],
  harezm: [/^ozbekistan-slider-3\.jpg$/i, /^Ozbekistan\.jpg$/i, /ozbekistan-slider/i],
  manisa: [/^mahal-isitma-sistemleri\.jpg$/i, /^Endustriyel-Buhar-Sistemleri\.jpg$/i],
  izmir: [/^izmir-slider-5-duzenli\.jpg$/i, /^izmir-slider1-duzenli\.jpg$/i, /izmir-slider/i],
  isparta: [/^end-buhar-sistem\.jpg$/i, /^Endustriyel-Buhar-Sistemleri\.jpg$/i],
  almaty: [/^Enorpa-Seracilik-1\.jpg$/i, /^Sera-Isitma\.jpg$/i],
};

// Hero slider görselleri (orijinal sitedeki slider fotoğrafları)
// Yatay, yüksek çözünürlüklü ve marka görünürlüğü olan kareler seçilir.
const HERO_SLIDES = [
  // Açık saha projesi — güneşli havada sahada kurulu turuncu Enorpa kazanları (1600x800)
  { file: "slide-1", patterns: [/^Ozbekistan\.jpg$/i, /^ozbekistan-slider-6\.jpg$/i] },
  // Kazan dairesi — turuncu Enorpa kazanları + kırmızı/mavi hatlar (2560x1514)
  { file: "slide-2", patterns: [/^enorpa-foto-4-scaled\.jpg$/i, /^enorpa-foto-4\.jpg$/i] },
  // Sera ısıtma sahası — pompa/pano hattı (2000x1500)
  { file: "slide-3", patterns: [/^izmir-slider-5-duzenli\.jpg$/i, /^izmir-slider-4-duzenlenmis\.jpg$/i] },
];

// OG kapağı için aday (slayt yoksa)
const HERO_FALLBACK_PATTERNS = [/^nature-ANA-SAYFA-min\.png$/i, /^Enorpa-Enerji-1-min\.jpg$/i, /slider/i];

// Ana sayfa 3'lü tanıtım kartları (orijinal sitedeki "Entegre Sistemler / Ürünler / Projeler")
const PROMO_CARD_PATTERNS = {
  entegre: [/^Enorpa-Entegre-1-1\.png$/i, /entegre/i],
  urunler: [/^Enorpa-Urunler-1\.png$/i],
  projeler: [/^Enorpa-Katalog-1\.png$/i],
};

const CERT_FILES = ["tse", "ce", "asme", "eac"];
const LOGO_PATTERNS = [/^enorpa-logo\.png$/i, /^Enorpa-White-Logo\.png$/i];

/* ------------------------------------------------------------------ yardımcı */

async function collectSources(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // plugin/theme klasörlerini atla
      if (["plugins", "themes"].includes(entry.name)) continue;
      await collectSources(full, out);
    } else if (/\.(png|jpe?g|webp|avif)$/i.test(entry.name)) {
      try {
        const info = await stat(full);
        out.push({ path: full, name: entry.name, size: info.size });
      } catch {
        /* yoksay */
      }
    }
  }
  return out;
}

/** Desen listesine göre en iyi kaynağı seçer (ilk desen, en büyük dosya). */
function pick(sources, patterns) {
  for (const pattern of patterns) {
    const matches = sources.filter((s) => pattern.test(s.name)).sort((a, b) => b.size - a.size);
    if (matches.length > 0) return matches[0];
  }
  return null;
}

async function writeWebp(
  source,
  target,
  { width, height, fit, upscale = false, brightness = 1, saturation = 1 },
) {
  await mkdir(path.dirname(target), { recursive: true });
  let pipeline = sharp(source).resize({
    width,
    height,
    fit,
    withoutEnlargement: !upscale,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (brightness !== 1 || saturation !== 1) {
    pipeline = pipeline.modulate({ brightness, saturation });
  }
  await pipeline.webp({ quality: upscale ? 90 : 86 }).toFile(target);
  return target;
}

async function writePng(source, target, size) {
  await mkdir(path.dirname(target), { recursive: true });
  await sharp(source)
    .resize({ width: size, height: size, fit: "contain", withoutEnlargement: true, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(target);
  return target;
}

/* --------------------------------------------------------------------- main */

async function main() {
  console.log(`▸ Kaynak: ${SOURCE}`);
  const sources = await collectSources(SOURCE);
  if (sources.length === 0) {
    console.error("✗ Kaynak klasörde görsel bulunamadı. --source ile yolu belirtin.");
    process.exit(1);
  }
  console.log(`▸ ${sources.length} kaynak görsel bulundu`);

  const generated = {};
  const report = [];

  // --- ürünler
  for (const [slug, patterns] of Object.entries(PRODUCT_PATTERNS)) {
    const src = pick(sources, patterns);
    if (!src) {
      report.push(`! ürün  ${slug} → kaynak yok (SVG yedeği kalacak)`);
      continue;
    }
    const target = path.join(IMG, "products", `${slug}.webp`);
    await writeWebp(src.path, target, { width: 1200, height: 900, fit: "inside" });
    generated[slug] = `/img/products/${slug}.webp`;
    report.push(`✓ ürün  ${slug} ← ${src.name}`);
  }

  // --- projeler
  const projectImages = {};
  for (const [slug, patterns] of Object.entries(PROJECT_PATTERNS)) {
    const src = pick(sources, patterns);
    if (!src) {
      report.push(`! proje ${slug} → kaynak yok`);
      continue;
    }
    await writeWebp(src.path, path.join(IMG, "projects", `${slug}.webp`), {
      width: 1600,
      height: 1000,
      fit: "cover",
    });
    projectImages[slug] = `/img/projects/${slug}.webp`;
    report.push(`✓ proje ${slug} ← ${src.name}`);
  }

  // --- hero slider (orijinal sitedeki slider fotoğrafları)
  const heroSlides = [];
  let firstHero = null;
  for (const slide of HERO_SLIDES) {
    const src = pick(sources, slide.patterns);
    if (!src) {
      report.push(`! slider ${slide.file} → kaynak yok`);
      continue;
    }
    const target = path.join(IMG, "hero", `${slide.file}.webp`);
    await writeWebp(src.path, target, {
      width: 1920,
      height: 900,
      fit: "cover",
      upscale: true,
      // Hero'da koyu iç mekân kareleri biraz açılsın
      brightness: 1.08,
      saturation: 1.14,
    });
    heroSlides.push(`/img/hero/${slide.file}.webp`);
    if (!firstHero) firstHero = src;
    report.push(`✓ slider ${slide.file} ← ${src.name}`);
  }

  // Slayt bulunamazsa eski genel görsele düş
  if (!firstHero) firstHero = pick(sources, HERO_FALLBACK_PATTERNS);
  if (firstHero) {
    // Geriye dönük uyumluluk: ASSETS.hero hâlâ bu yolu kullanıyor
    await writeWebp(firstHero.path, path.join(IMG, "hero", "plant-original.webp"), {
      width: 1920,
      height: 900,
      fit: "cover",
      upscale: true,
    });

    // OG kapağı: sosyal platformlar için PNG (webp desteği değişken)
    await mkdir(path.join(IMG, "brand"), { recursive: true });
    await sharp(firstHero.path)
      .resize({ width: 1200, height: 630, fit: "cover", withoutEnlargement: false })
      .png({ compressionLevel: 9 })
      .toFile(path.join(IMG, "brand", "og-cover.png"));
    report.push(`✓ hero  ← ${firstHero.name}`);
  } else {
    report.push("! hero  → kaynak yok");
  }

  if (heroSlides.length === 0) {
    heroSlides.push("/img/hero/plant-original.webp");
  }

  // --- ana sayfa tanıtım kartları
  const promoImages = {};
  for (const [key, patterns] of Object.entries(PROMO_CARD_PATTERNS)) {
    const src = pick(sources, patterns);
    if (!src) {
      report.push(`! kart ${key} → kaynak yok`);
      continue;
    }
    await writeWebp(src.path, path.join(IMG, "promo", `${key}.webp`), {
      width: 900,
      height: 700,
      fit: "cover",
      brightness: 1.04,
      saturation: 1.06,
    });
    promoImages[key] = `/img/promo/${key}.webp`;
    report.push(`✓ kart  ${key} ← ${src.name}`);
  }

  // --- sertifikalar
  for (const cert of CERT_FILES) {
    const src = pick(sources, [new RegExp(`^${cert}\\.png$`, "i")]);
    if (!src) {
      report.push(`! sertifika ${cert} → kaynak yok`);
      continue;
    }
    await writePng(src.path, path.join(IMG, "brand", `${cert}-original.png`), 240);
    report.push(`✓ sertifika ${cert} ← ${src.name}`);
  }

  // --- logo
  const logo = pick(sources, LOGO_PATTERNS);
  if (logo) {
    await sharp(logo.path)
      .resize({ width: 640, withoutEnlargement: true })
      .png()
      .toFile(path.join(IMG, "brand", "logo-original.png"));
    report.push(`✓ logo  ← ${logo.name}`);
  }

  // --- generated TS haritası
  const tsFile = path.join(ROOT, "src", "lib", "product-images.generated.ts");
  const body = `// Bu dosya scripts/import-original-images.mjs tarafından üretilir — elle düzenlemeyin.
// Orijinal siteden aktarılan ürün görselleri (slug → public yolu).

export const ORIGINAL_PRODUCT_IMAGES: Record<string, string> = ${JSON.stringify(generated, null, 2)};

export const ORIGINAL_PROJECT_IMAGES: Record<string, string> = ${JSON.stringify(projectImages, null, 2)};

export const ORIGINAL_HERO_SLIDES: string[] = ${JSON.stringify(heroSlides, null, 2)};

export const ORIGINAL_PROMO_IMAGES: Record<string, string> = ${JSON.stringify(promoImages, null, 2)};
`;
  await writeFile(tsFile, body, "utf8");
  report.push(`✓ ${Object.keys(generated).length} ürün görseli, ${Object.keys(projectImages).length} proje görseli eşlendi`);

  console.log(report.join("\n"));
  console.log(`\n✓ product-images.generated.ts yazıldı (${tsFile})`);
  console.log("→ Şimdi: npm run assets (SVG yedekleri) ve siteyi yenileyin.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
