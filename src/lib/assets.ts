/**
 * Görsel varlık çözümleyici.
 *
 * İki kaynak var:
 *  1. Orijinal siteden aktarılan gerçek fotoğraf/render'lar
 *     (scripts/import-original-images.mjs → public/img/**.webp)
 *  2. Yoksa üretilen marka görselleri (scripts/gen-assets.mjs → SVG)
 *
 * Uygulama kodunda görsel yolu asla doğrudan yazılmaz; buradan çözülür.
 */
import {
  ORIGINAL_HERO_SLIDES,
  ORIGINAL_PRODUCT_IMAGES,
  ORIGINAL_PROJECT_IMAGES,
  ORIGINAL_PROMO_IMAGES,
} from "@/lib/product-images.generated";

export const SITE_ORIGIN = "https://enorpa.com";

/**
 * Ana sayfa hero slider görselleri (orijinal sitedeki slider fotoğrafları).
 * Üretim yoksa tek slayta düşer.
 */
export const HERO_SLIDES: string[] =
  ORIGINAL_HERO_SLIDES.length > 0 ? ORIGINAL_HERO_SLIDES : ["/img/hero/plant-original.webp"];

/** Ana sayfa 3'lü tanıtım kartı görseli (entegre / urunler / projeler). */
export function promoImage(key: "entegre" | "urunler" | "projeler"): string | undefined {
  return ORIGINAL_PROMO_IMAGES[key];
}

export const ASSETS = {
  /** Hero arka planı — orijinal site slider fotoğrafı (WebP) */
  hero: HERO_SLIDES[0],
  /** Hero yedeği (orijinal yoksa üretilen SVG) */
  heroSvg: "/img/hero/plant.svg",
  /** Sosyal medya paylaşım görseli */
  ogImage: `${SITE_ORIGIN}/img/brand/og-cover.png`,
  logo: "/img/brand/logo-original.png",
  faviconSvg: "/img/brand/favicon.svg",
  faviconPng: "/img/brand/favicon-192.png",
  appleTouchIcon: "/img/brand/apple-touch-icon.png",
} as const;

const CATEGORY_ART: Record<string, [string, string]> = {
  "sicak-su": ["sicak-su-a", "sicak-su-b"],
  buhar: ["buhar-a", "buhar-b"],
  "sicak-hava": ["sicak-hava-a", "sicak-hava-b"],
  "kizgin-su": ["kizgin-su-a", "kizgin-su-b"],
  diger: ["diger-a", "diger-b"],
};

/** Kategori bazlı üretilen (SVG) yedek görsel. */
export function productArt(categoryId?: string, index = 0): string {
  const variants = CATEGORY_ART[categoryId ?? ""] ?? CATEGORY_ART.diger;
  return `/img/products/${variants[index % variants.length]}.svg`;
}

/** Slug'dan ürün görseli: önce orijinal WebP, yoksa SVG yedeği. */
export function productImage(slug: string | undefined, categoryId?: string, index = 0): string {
  if (slug && ORIGINAL_PRODUCT_IMAGES[slug]) return ORIGINAL_PRODUCT_IMAGES[slug];
  return productArt(categoryId, index);
}

/** Veritabanı proje slug'ı (ozbekistan-taskent) → görsel anahtarı (taskent). */
function projectImageKey(slug: string): string {
  const last = (slug.split("/").pop() ?? slug).toLowerCase();
  const known = ["taskent", "harezm", "manisa", "izmir", "isparta", "almaty"];
  const hit = known.find((k) => last.includes(k));
  return hit ?? last;
}

/** Proje görseli: önce orijinal WebP, yoksa üretilen SVG. */
export function projectImage(slug: string): string {
  const key = projectImageKey(slug);
  return ORIGINAL_PROJECT_IMAGES[key] ?? `/img/projects/${key}.svg`;
}

/** Orijinal siteden aktarılabilen sertifika rozetleri. */
const ORIGINAL_CERTS = new Set(["tse", "ce", "asme", "eac"]);

/** Sertifika rozeti: aktarılan PNG varsa onu, yoksa üretilen SVG'yi kullanır. */
export function certificateBadge(key: string): string {
  return ORIGINAL_CERTS.has(key) ? `/img/brand/${key}-original.png` : `/img/brand/${key}.svg`;
}

/** URL'den ürün slug'ı çıkarır (/img/products/oniks-serisi.svg → oniks-serisi). */
function slugFromUrl(url: string): string | undefined {
  const match = url.match(/\/img\/products\/([a-z0-9-]+?)(?:-[ab])?\.(?:svg|webp|png|jpe?g)$/i);
  return match?.[1];
}

/**
 * Veritabanından gelen görsel adresini kullanılabilir bir yola çözer.
 * - Boşsa veya ölü bir host'a işaret ediyorsa → slug/kategori bazlı yerel görsel
 * - Yerel bir yola işaret ediyorsa → orijinali varsa WebP'ye yükseltir
 */
export function resolveImageUrl(
  url: string | null | undefined,
  options: { slug?: string; categoryId?: string; index?: number } = {},
): string {
  const { slug, categoryId, index = 0 } = options;

  // Slug biliniyorsa orijinal render her zaman önceliklidir.
  if (slug && ORIGINAL_PRODUCT_IMAGES[slug]) return ORIGINAL_PRODUCT_IMAGES[slug];

  if (!url) return productImage(slug, categoryId, index);

  const unusable =
    url.includes("supabase.co/storage") ||
    url.includes("enorpa.com/wp-content") ||
    url.startsWith("http://");

  if (unusable) return productImage(slug, categoryId, index);

  // Yerel ürün görseli → orijinal render varsa onu kullan
  if (url.startsWith("/img/products/")) {
    const fromUrl = slugFromUrl(url) ?? slug;
    if (fromUrl && ORIGINAL_PRODUCT_IMAGES[fromUrl]) return ORIGINAL_PRODUCT_IMAGES[fromUrl];
  }

  return url;
}

/** Proje detay sayfaları için DB görselini çözer. */
export function resolveProjectImage(url: string | null | undefined, slug: string): string {
  if (!url) return projectImage(slug);
  if (url.includes("supabase.co/storage") || url.includes("enorpa.com/wp-content")) {
    return projectImage(slug);
  }
  if (url.startsWith("/img/projects/")) return projectImage(slug);
  return url;
}
