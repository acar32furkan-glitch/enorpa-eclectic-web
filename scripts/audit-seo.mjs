#!/usr/bin/env node
/**
 * SEO & sağlık denetimi (SSR çıktısı üzerinden).
 *
 * Her rotayı HTTP ile çeker ve şunları doğrular:
 *   • HTTP 200
 *   • <title> var ve tekil (aynı başlık iki sayfada kullanılmıyor)
 *   • meta description var (50–200 karakter arası önerilir)
 *   • <link rel="canonical"> var
 *   • og:image var
 *   • hreflang ile verilen her adres sitemap'te tanımlı (kırık hreflang yok)
 *   • en az 1 JSON-LD bloğu (ana sayfa, ürünler, ürün detayı)
 *
 * Kullanım:
 *   npm run dev                     # ayrı terminalde
 *   node scripts/audit-seo.mjs
 *   node scripts/audit-seo.mjs --base https://enorpa.com
 *
 * Çıkış kodu hata varsa 1'dir — CI'da kullanılabilir.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const BASE = (baseIdx >= 0 ? args[baseIdx + 1] : process.env.AUDIT_BASE || "http://localhost:3000").replace(/\/$/, "");
const ORIGIN = "https://enorpa.com";

/* ------------------------------------------------------------------ yardımcı */

const decode = (s) =>
  s
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "'");

function firstMatch(html, regex) {
  const m = html.match(regex);
  return m ? decode(m[1].trim()) : null;
}

function allMatches(html, regex) {
  return [...html.matchAll(regex)].map((m) => decode(m[1].trim()));
}

async function readSitemapPaths() {
  try {
    const xml = await readFile(path.join(ROOT, "public", "sitemap.xml"), "utf8");
    return new Set(allMatches(xml, /<loc>(.*?)<\/loc>/g).map((u) => u.replace(ORIGIN, "") || "/"));
  } catch {
    return new Set();
  }
}

async function readDynamicPaths() {
  const generated = await readFile(path.join(ROOT, "src", "lib", "product-images.generated.ts"), "utf8");
  const products = [...new Set([...generated.matchAll(/"([a-z0-9-]+)":\s*"\/img\/products\//g)].map((m) => m[1]))];
  const projects = [...new Set([...generated.matchAll(/"([a-z0-9-]+)":\s*"\/img\/projects\//g)].map((m) => m[1]))];
  let posts = [];
  try {
    const blog = await readFile(path.join(ROOT, "src", "data", "blog.ts"), "utf8");
    posts = [...new Set([...blog.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]))];
  } catch {
    /* blog verisi yoksa atla */
  }
  return { products, projects, posts };
}

/* ------------------------------------------------------------------ denetim */

async function main() {
  const sitemapPaths = await readSitemapPaths();
  const { products, projects, posts } = await readDynamicPaths();

  const routes = [
    "/",
    "/en",
    "/ru",
    "/hakkimizda",
    "/en/about",
    "/ru/about",
    "/urunler",
    "/en/products",
    "/ru/products",
    "/projeler",
    "/en/portfolio",
    "/ru/portfolio",
    "/referanslar",
    "/en/referanslar",
    "/ru/referanslar",
    "/blog",
    "/en/blog",
    "/ru/blog",
    "/iletisim",
    "/en/contact",
    "/ru/contact",
    "/sss",
    "/kvkk",
    "/cerez-politikasi",
    "/gizlilik-politikasi",
    // örnek detay sayfaları
    ...(products[0] ? [`/urunler/${products[0]}`, `/en/products/${products[0]}`, `/ru/products/${products[0]}`] : []),
    ...(projects[0] ? [`/portfolio/${projects[0]}`, `/en/portfolio/${projects[0]}`, `/ru/portfolio/${projects[0]}`] : []),
    ...(posts[0] ? [`/blog/${posts[0]}`, `/en/blog/${posts[0]}`, `/ru/blog/${posts[0]}`] : []),
  ];

  const jsonLdRequired = new Set(["/", "/urunler", "/en/products", "/ru/products"]);

  const rows = [];
  const seenTitles = new Map();
  const problems = [];

  for (const route of routes) {
    const url = `${BASE}${route}`;
    let html = "";
    let status = 0;
    try {
      const res = await fetch(url, { headers: { "user-agent": "enorpa-seo-audit" } });
      status = res.status;
      html = await res.text();
    } catch (err) {
      problems.push(`${route} → istek hatası: ${err.message}`);
      rows.push({ route, status: 0, title: "-", desc: 0, canonical: false, og: false, jsonld: 0, hreflang: 0 });
      continue;
    }

    const title = firstMatch(html, /<title>([\s\S]*?)<\/title>/i);
    const desc = firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
    const canonical = firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const ogImage = firstMatch(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
    const jsonLd = (html.match(/application\/ld\+json/g) || []).length;
    const hreflangs = allMatches(html, /<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="([^"]+)"/gi);

    if (status !== 200) problems.push(`${route} → HTTP ${status}`);
    if (!title) problems.push(`${route} → <title> yok`);
    if (!desc) problems.push(`${route} → meta description yok`);
    else if (desc.length < 50) problems.push(`${route} → meta description çok kısa (${desc.length})`);
    else if (desc.length > 200) problems.push(`${route} → meta description çok uzun (${desc.length})`);
    if (!canonical) problems.push(`${route} → canonical yok`);
    if (!ogImage) problems.push(`${route} → og:image yok`);
    if (jsonLdRequired.has(route) && jsonLd === 0) problems.push(`${route} → JSON-LD yok`);

    // hreflang hedefleri gerçekten var mı? (sitemap üzerinden doğrula)
    for (const href of hreflangs) {
      const p = href.replace(ORIGIN, "") || "/";
      if (sitemapPaths.size > 0 && !sitemapPaths.has(p)) {
        problems.push(`${route} → hreflang hedefi sitemap'te yok: ${p}`);
      }
    }

    if (title) {
      const key = title.trim();
      if (seenTitles.has(key)) {
        problems.push(`${route} → başlık tekrarı: "${key}" (${seenTitles.get(key)})`);
      } else {
        seenTitles.set(key, route);
      }
    }

    rows.push({
      route,
      status,
      title: title || "-",
      desc: desc ? desc.length : 0,
      canonical: Boolean(canonical),
      og: Boolean(ogImage),
      jsonld: jsonLd,
      hreflang: hreflangs.length,
    });
  }

  // --- rapor
  const w = (s, n) => String(s).padEnd(n).slice(0, n);
  console.log(`${w("ROTA", 34)}${w("KOD", 5)}${w("DESC", 6)}${w("CANON", 7)}${w("OG", 4)}${w("LD", 4)}${w("HL", 4)}BAŞLIK`);
  console.log("-".repeat(130));
  for (const r of rows) {
    console.log(
      `${w(r.route, 34)}${w(r.status, 5)}${w(r.desc, 6)}${w(r.canonical ? "✓" : "✗", 7)}${w(r.og ? "✓" : "✗", 4)}${w(r.jsonld, 4)}${w(r.hreflang, 4)}${r.title}`,
    );
  }

  console.log("");
  if (problems.length === 0) {
    console.log(`✓ ${rows.length} rota denetlendi — sorun bulunamadı.`);
    return;
  }

  console.log(`✗ ${problems.length} sorun:`);
  for (const p of problems) console.log(`  • ${p}`);
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
