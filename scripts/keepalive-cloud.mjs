#!/usr/bin/env node
/**
 * Bulut Supabase projesine "uyanık kal" isteği atar.
 *
 * Neden var? Supabase **ücretsiz plan** bir projeyi 7 gün boyunca hiç API
 * isteği almazsa duraklatır ve "projeniz duraklatılacak" e-postası gelir.
 * Bu betik auth + rest uçlarına gerçek istek atarak sayacı sıfırlar.
 *
 * Otomatik çalışması için: .github/workflows/supabase-keepalive.yml (2 günde bir)
 * Elle çalıştırmak için:  npm run keepalive:cloud
 *
 * Ortam değişkenleri (.env.local veya .env içinden okunur):
 *   VITE_SUPABASE_URL / SUPABASE_URL
 *   VITE_SUPABASE_PUBLISHABLE_KEY / SUPABASE_PUBLISHABLE_KEY / SUPABASE_ANON_KEY
 *
 * Yerel geliştirme adresleri (127.0.0.1 / localhost) atlanır — onlar zaten
 * duraklatılmaz.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const ENV_FILES = [".env.local", ".env"];

/* --------------------------------------------------------------------- env */

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

async function loadEnv() {
  const merged = {};
  // .env önce, .env.local sonra (yerel üzerine yazar)
  for (const file of [...ENV_FILES].reverse()) {
    try {
      Object.assign(merged, parseEnv(await readFile(path.join(ROOT, file), "utf8")));
    } catch {
      /* dosya yoksa atla */
    }
  }
  return { ...merged, ...process.env };
}

function resolveConfig(env) {
  const url =
    env.SUPABASE_URL ||
    env.VITE_SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL ||
    "";
  const key =
    env.SUPABASE_PUBLISHABLE_KEY ||
    env.SUPABASE_ANON_KEY ||
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    env.VITE_SUPABASE_ANON_KEY ||
    env.SUPABASE_SERVICE_ROLE_KEY ||
    "";
  return { url: String(url).trim().replace(/\/$/, ""), key: String(key).trim() };
}

function isLocalUrl(url) {
  return /^https?:\/\/(127\.0\.0\.1|localhost|0\.0\.0\.0|\[::1\])(:\d+)?/i.test(url);
}

/* --------------------------------------------------------------------- ping */

async function ping(url, key) {
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const targets = [
    { name: "auth/v1/health", path: "/auth/v1/health" },
    { name: "rest/v1/products", path: "/rest/v1/products?select=id&limit=1" },
  ];

  const results = [];
  for (const target of targets) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30_000);
    const started = Date.now();
    try {
      const res = await fetch(url + target.path, { headers, signal: controller.signal });
      const body = await res.text().catch(() => "");
      results.push({
        name: target.name,
        status: res.status,
        ms: Date.now() - started,
        // 401/403 = proje ayakta, sadece yetki/RLS; 540 = duraklatılmış
        ok: res.ok || res.status === 401 || res.status === 403,
        preview: body.slice(0, 120).replace(/\s+/g, " "),
      });
    } catch (err) {
      results.push({
        name: target.name,
        status: 0,
        ms: Date.now() - started,
        ok: false,
        preview: err?.name === "AbortError" ? "zaman aşımı (30 sn)" : String(err?.message ?? err),
      });
    } finally {
      clearTimeout(timer);
    }
  }
  return results;
}

/* --------------------------------------------------------------------- main */

const attempts = 3;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const env = await loadEnv();
  const { url, key } = resolveConfig(env);

  if (!url || !key) {
    console.error(
      "✗ SUPABASE_URL ve anahtar bulunamadı.\n" +
        "  .env.local içine VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY yazın\n" +
        "  veya ortam değişkeni olarak verin.",
    );
    process.exit(1);
  }

  if (isLocalUrl(url)) {
    console.log(`▸ ${url} yerel Supabase — duraklatma yok, işlem atlandı.`);
    return;
  }

  console.log(`▸ Hedef: ${url}`);
  console.log(`▸ Anahtar: ${key.slice(0, 8)}… (${key.length} karakter)`);

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    console.log(`\n— Deneme ${attempt}/${attempts} —`);
    const results = await ping(url, key);
    for (const r of results) {
      const mark = r.ok ? "✓" : "✗";
      console.log(`${mark} ${r.name.padEnd(18)} HTTP ${String(r.status).padEnd(4)} ${r.ms} ms  ${r.preview}`);
    }

    if (results.every((r) => r.ok)) {
      console.log("\n✓ Proje aktif — duraklatma sayacı sıfırlandı.");
      return;
    }

    if (attempt < attempts) {
      console.log("… proje uyanıyor olabilir, 30 sn sonra tekrar denenecek.");
      await wait(30_000);
    }
  }

  console.error(
    "\n✗ Projeye ulaşılamadı. Proje duraklatılmışsa Supabase panelinden\n" +
      "  'Restore project' ile geri açın; ardından bu betiği tekrar çalıştırın.",
  );
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
