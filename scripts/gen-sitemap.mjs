#!/usr/bin/env node
/**
 * Sitemap üretici — public/sitemap.xml
 *
 * Neden betik? Ürün / proje / blog sayfaları veriden geliyor; sitemap elle
 * güncellendiğinde kaçınılmaz olarak eskiyor. Bu betik slug listelerini
 * projedeki tek kaynaklardan okur:
 *   • src/lib/product-images.generated.ts → ürün ve proje slug'ları
 *   • src/data/blog.ts                    → blog yazısı slug'ları
 *
 * Her URL için TR/EN/RU + x-default alternatifleri yazılır; karşılığı olmayan
 * sayfalar (sss, kvkk, çerez/gizlilik politikaları) yalnızca TR olarak girer.
 *
 * Kullanım:
 *   node scripts/gen-sitemap.mjs
 *   node scripts/gen-sitemap.mjs --dry   (dosyayı yazmadan özet verir)
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ORIGIN = "https://enorpa.com";
const TODAY = new Date().toISOString().slice(0, 10);
const DRY = process.argv.includes("--dry");

/* ------------------------------------------------------------------ kaynaklar */

async function readSlugsFromGenerated() {
  const file = path.join(ROOT, "src", "lib", "product-images.generated.ts");
  const src = await readFile(file, "utf8");
  const collect = (segment) =>
    [...new Set([...src.matchAll(new RegExp(`"([a-z0-9-]+)":\\s*"/img/${segment}/`, "g"))].map((m) => m[1]))];
  return { products: collect("products"), projects: collect("projects") };
}

async function readBlogSlugs() {
  const file = path.join(ROOT, "src", "data", "blog.ts");
  try {
    const src = await readFile(file, "utf8");
    return [...new Set([...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]))];
  } catch {
    return [];
  }
}

/* --------------------------------------------------------------------- model */

/**
 * @typedef {{ tr: string; en?: string; ru?: string; priority: string; changefreq: string }} Entry
 */

/** @type {Entry[]} */
const entries = [];

function add(tr, { en, ru, priority = "0.7", changefreq = "monthly" } = {}) {
  entries.push({ tr, en, ru, priority, changefreq });
}

/* ------------------------------------------------------------------- üretim */

function url(prefix, tail) {
  return `${ORIGIN}${prefix === "/" ? "/" : prefix}${tail ? `/${tail}` : ""}`;
}

function renderEntry(entry, variant) {
  const loc = url(variant, null);

  // Aynı sayfanın dil karşılıkları (yalnızca var olanlar)
  const alternates = [];
  if (entry.tr) alternates.push(["tr", url(entry.tr, null)]);
  if (entry.en) alternates.push(["en", url(entry.en, null)]);
  if (entry.ru) alternates.push(["ru", url(entry.ru, null)]);
  if (entry.tr) alternates.push(["x-default", url(entry.tr, null)]);

  const links = alternates
    .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
    .join("\n");

  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    links,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  const { products, projects } = await readSlugsFromGenerated();
  const posts = await readBlogSlugs();

  // --- statik sayfalar
  add("/", { en: "/en", ru: "/ru", priority: "1.0", changefreq: "weekly" });
  add("/hakkimizda", { en: "/en/about", ru: "/ru/about", priority: "0.8" });
  add("/urunler", { en: "/en/products", ru: "/ru/products", priority: "0.9", changefreq: "weekly" });
  add("/projeler", { en: "/en/portfolio", ru: "/ru/portfolio", priority: "0.8" });
  add("/referanslar", { en: "/en/referanslar", ru: "/ru/referanslar", priority: "0.7" });
  add("/blog", { en: "/en/blog", ru: "/ru/blog", priority: "0.7", changefreq: "weekly" });
  add("/iletisim", { en: "/en/contact", ru: "/ru/contact", priority: "0.7" });

  // yalnızca TR
  add("/sss", { priority: "0.5" });
  add("/kariyer", { priority: "0.4" });
  add("/kvkk", { priority: "0.3", changefreq: "yearly" });
  add("/cerez-politikasi", { priority: "0.3", changefreq: "yearly" });
  add("/gizlilik-politikasi", { priority: "0.3", changefreq: "yearly" });

  // --- ürün detayları
  for (const slug of products) {
    add(`/urunler/${slug}`, {
      en: `/en/products/${slug}`,
      ru: `/ru/products/${slug}`,
      priority: "0.7",
    });
  }

  // --- proje detayları
  for (const slug of projects) {
    add(`/portfolio/${slug}`, {
      en: `/en/portfolio/${slug}`,
      ru: `/ru/portfolio/${slug}`,
      priority: "0.6",
    });
  }

  // --- blog yazıları
  for (const slug of posts) {
    add(`/blog/${slug}`, {
      en: `/en/blog/${slug}`,
      ru: `/ru/blog/${slug}`,
      priority: "0.6",
    });
  }

  // --- XML
  const blocks = [];
  for (const entry of entries) {
    if (entry.tr) blocks.push(renderEntry(entry, entry.tr));
    if (entry.en) blocks.push(renderEntry(entry, entry.en));
    if (entry.ru) blocks.push(renderEntry(entry, entry.ru));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Bu dosya scripts/gen-sitemap.mjs tarafından üretilir — elle düzenlemeyin. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join("\n")}
</urlset>
`;

  const total = blocks.length;
  console.log(
    `▸ ${entries.length} sayfa grubu → ${total} URL ` +
      `(${products.length} ürün, ${projects.length} proje, ${posts.length} blog)`,
  );

  if (DRY) {
    console.log("▸ --dry: dosya yazılmadı");
    return;
  }

  const target = path.join(ROOT, "public", "sitemap.xml");
  await writeFile(target, xml, "utf8");
  console.log(`✓ ${path.relative(ROOT, target)} yazıldı (lastmod: ${TODAY})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
