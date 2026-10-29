#!/usr/bin/env node
/**
 * Enorpa Enerji — yerel Supabase yaşam döngüsü
 *
 * Bulut projesi kapalı olduğu için site Supabase'siz de çalışır; ancak admin
 * paneli, lead kaydı ve içerik yönetimi için gerçek bir veritabanı gerekir.
 * Bu betik Supabase'i Docker üzerinde yerelde ayağa kaldırır, anahtarları
 * .env.local dosyasına yazar ve admin kullanıcısını hazırlar.
 *
 * Komutlar:
 *   node scripts/db.mjs up        # başlat + .env.local + admin kullanıcısı
 *   node scripts/db.mjs down      # durdur
 *   node scripts/db.mjs reset     # şemayı + seed'i sıfırdan uygula
 *   node scripts/db.mjs status    # servis durumu
 *   node scripts/db.mjs env       # sadece .env.local yaz
 *   node scripts/db.mjs keepalive # uzak (bulut) projeyi uyanık tut
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ENV_LOCAL = path.join(ROOT, ".env.local");
const ENV_FILE = path.join(ROOT, ".env");

const ADMIN_EMAIL = process.env.LOCAL_ADMIN_EMAIL ?? "admin@enorpa.local";
const ADMIN_PASSWORD = process.env.LOCAL_ADMIN_PASSWORD ?? "Enorpa123!";

const SERVICE_EXCLUDES = [
  "realtime",
  "imgproxy",
  "edge-runtime",
  "logflare",
  "vector",
].join(",");

/* ------------------------------------------------------------------ utils */

function run(cmd, args, { capture = false, allowFail = false } = {}) {
  const res = spawnSync(cmd, args, {
    cwd: ROOT,
    shell: true,
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
  });
  if (res.status !== 0 && !allowFail) {
    const detail = capture ? `${res.stdout ?? ""}${res.stderr ?? ""}`.trim() : "";
    throw new Error(`Komut başarısız: ${cmd} ${args.join(" ")}${detail ? `\n${detail}` : ""}`);
  }
  return res;
}

const supabase = (args, opts) => run("npx", ["--yes", "supabase@latest", ...args], opts);

function log(msg) {
  console.log(`\x1b[36m▸\x1b[0m ${msg}`);
}
function ok(msg) {
  console.log(`\x1b[32m✓\x1b[0m ${msg}`);
}
function warn(msg) {
  console.log(`\x1b[33m!\x1b[0m ${msg}`);
}
function fail(msg) {
  console.error(`\x1b[31m✗\x1b[0m ${msg}`);
}

/* ---------------------------------------------------------------- kontrol */

function checkDocker() {
  const res = run("docker", ["info"], { capture: true, allowFail: true });
  if (res.status !== 0) {
    fail(
      "Docker çalışmıyor. Docker Desktop'ı başlatıp tekrar deneyin.\n" +
        "  Yerel Supabase, Postgres/Auth/Storage servislerini konteyner olarak çalıştırır.",
    );
    process.exit(1);
  }
  ok("Docker hazır");
}

function checkSupabaseDir() {
  if (!existsSync(path.join(ROOT, "supabase", "config.toml"))) {
    fail("supabase/config.toml bulunamadı. Proje kökünde çalıştırdığınızdan emin olun.");
    process.exit(1);
  }
}

/* ------------------------------------------------------------ .env.local */

function parseStatusEnv() {
  const res = supabase(["status", "-o", "env"], { capture: true, allowFail: true });
  const text = `${res.stdout ?? ""}\n${res.stderr ?? ""}`;
  const map = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=["']?(.*?)["']?$/);
    if (m) map[m[1]] = m[2];
  }
  return map;
}

function writeEnvLocal() {
  const status = parseStatusEnv();
  const apiUrl = status.API_URL ?? status.SUPABASE_URL ?? "http://127.0.0.1:54321";
  const anon =
    status.ANON_KEY ??
    status.PUBLISHABLE_KEY ??
    status.SUPABASE_ANON_KEY ??
    status.SUPABASE_PUBLISHABLE_KEY;
  const service =
    status.SERVICE_ROLE_KEY ??
    status.SECRET_KEY ??
    status.SUPABASE_SERVICE_ROLE_KEY;

  if (!anon || !service) {
    fail("Anahtarlar okunamadı. `node scripts/db.mjs status` çıktısını kontrol edin.");
    process.exit(1);
  }

  if (existsSync(ENV_LOCAL)) copyFileSync(ENV_LOCAL, `${ENV_LOCAL}.bak`);

  const content = [
    "# Yerel Supabase (scripts/db.mjs tarafından üretildi — elle düzenlemeyin)",
    `VITE_SUPABASE_URL=${apiUrl}`,
    `VITE_SUPABASE_PUBLISHABLE_KEY=${anon}`,
    `SUPABASE_URL=${apiUrl}`,
    `SUPABASE_PUBLISHABLE_KEY=${anon}`,
    `SUPABASE_SERVICE_ROLE_KEY=${service}`,
    "",
  ].join("\n");

  writeFileSync(ENV_LOCAL, content, "utf8");
  ok(`.env.local yazıldı → ${apiUrl}`);
  if (existsSync(`${ENV_LOCAL}.bak`)) {
    warn(".env.local.bak olarak önceki sürüm yedeklendi");
  }
  return { apiUrl, anon, service };
}

/* ------------------------------------------------------- admin kullanıcısı */

async function ensureAdmin({ apiUrl, anon, service }) {
  const headers = {
    apikey: anon,
    Authorization: `Bearer ${anon}`,
    "Content-Type": "application/json",
  };

  // Kullanıcı zaten var mı? (admin listesi service role ile okunur)
  const listRes = await fetch(`${apiUrl}/auth/v1/admin/users?page=1&per_page=50`, {
    headers: { apikey: service, Authorization: `Bearer ${service}` },
  });
  if (listRes.ok) {
    const body = await listRes.json();
    const users = body.users ?? body ?? [];
    if (Array.isArray(users) && users.some((u) => u.email === ADMIN_EMAIL)) {
      ok(`Admin kullanıcısı hazır: ${ADMIN_EMAIL}`);
      return;
    }
  }

  const signupRes = await fetch(`${apiUrl}/auth/v1/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (signupRes.ok) {
    ok(`Admin kullanıcısı oluşturuldu: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    return;
  }

  const detail = await signupRes.text();
  warn(`Admin kullanıcısı oluşturulamadı (${signupRes.status}): ${detail.slice(0, 200)}`);
  warn("Panelde manuel kayıt olabilirsiniz; ilk kullanıcı otomatik admin olur.");
}

/* ---------------------------------------------------------------- komutlar */

async function up() {
  checkSupabaseDir();
  checkDocker();
  log("Supabase servisleri başlatılıyor (ilk seferde imaj indirmesi uzun sürebilir)…");
  supabase(["start", "-x", SERVICE_EXCLUDES]);
  const keys = writeEnvLocal();
  await ensureAdmin(keys);
  ok("Yerel Supabase hazır — http://127.0.0.1:54323 (Studio)");
  log("Siteyi yeniden başlatın: npm run dev");
}

function down() {
  checkSupabaseDir();
  log("Supabase durduruluyor…");
  supabase(["stop", "--no-backup"]);
  ok("Durduruldu. .env.local silinmedi; site yerel yedek içeriğe döner.");
}

async function reset() {
  checkSupabaseDir();
  checkDocker();
  log("Veritabanı sıfırlanıyor (migration + seed)…");
  supabase(["db", "reset"]);
  const keys = writeEnvLocal();
  await ensureAdmin(keys);
  ok("Şema ve örnek veriler yeniden uygulandı");
}

function status() {
  checkSupabaseDir();
  supabase(["status"]);
}

function envOnly() {
  writeEnvLocal();
}

async function keepalive() {
  // Bulut (ücretsiz plan) projeleri 7 gün kullanılmazsa duraklatılır.
  // .env (veya ortam değişkeni) içindeki uzak projeye hafif bir istek atar.
  const readEnv = (file) => {
    if (!existsSync(file)) return {};
    const out = {};
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
    return out;
  };

  const merged = { ...readEnv(ENV_FILE), ...readEnv(ENV_LOCAL), ...process.env };
  const url = merged.SUPABASE_URL ?? merged.VITE_SUPABASE_URL;
  const key = merged.SUPABASE_PUBLISHABLE_KEY ?? merged.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    fail("SUPABASE_URL / anahtar bulunamadı. .env dosyasını kontrol edin.");
    process.exit(1);
  }
  if (url.includes("127.0.0.1") || url.includes("localhost")) {
    warn("Yerel Supabase zaten makinenizde çalışıyor; keepalive gerekmez.");
    return;
  }

  try {
    const res = await fetch(`${url}/rest/v1/`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    ok(`Keepalive: ${url} → HTTP ${res.status}`);
  } catch (err) {
    fail(`Keepalive başarısız: ${err.message}`);
    process.exit(1);
  }
}

/* ------------------------------------------------------------------- main */

const command = (process.argv[2] ?? "up").toLowerCase();

try {
  switch (command) {
    case "up":
      await up();
      break;
    case "down":
      down();
      break;
    case "reset":
      await reset();
      break;
    case "status":
      status();
      break;
    case "env":
      envOnly();
      break;
    case "keepalive":
      await keepalive();
      break;
    default:
      console.log(
        [
          "Kullanım: node scripts/db.mjs <komut>",
          "",
          "  up         Yerel Supabase'i başlat, .env.local yaz, admin kullanıcısı oluştur",
          "  down       Yerel Supabase'i durdur",
          "  reset      Veritabanını sıfırla (migration + seed)",
          "  status     Servis durumunu göster",
          "  env        Sadece .env.local dosyasını yenile",
          "  keepalive  Uzak projeye ping at (ücretsiz planın uyumasını engeller)",
        ].join("\n"),
      );
  }
} catch (err) {
  fail(err.message ?? String(err));
  process.exit(1);
}
