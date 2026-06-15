import { createClient } from "@supabase/supabase-js";
import { readFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SUPABASE_REF = "hmhkrrbvkafwcbyyvezl";
const BUCKET = "product-images";
const UPLOAD_ROOT = resolve(
  "C:/Users/admin/Desktop/enorpa/enorpa-images/enorpa-images/enorpa.com/wp-content/uploads",
);

const IMAGE_MAPPINGS = [
  ["2024/07/OBS3-RND-2021.03.16.135-1024x753.png", "products/obsidyen.png"],
  ["2025/06/Akuamarin-1-scaled.png", "products/akuamarin.png"],
  ["2024/07/Ametist-2500-Render.1-1024x768.png", "products/ametist.png"],
  ["2024/07/Turkuaz-render-1024x683.png", "products/turkuaz.png"],
  ["2024/07/KALS30-Render-2.86-1024x665.png", "products/kalsedon.png"],
  ["2024/07/Kuvars60-1024x724.png", "products/kuvars.png"],
  ["2024/07/NX6-R3-Render-01.89-1024x683.png", "products/kuvars-ng.png"],
  ["2024/07/TRM30-Render-OBS-icin1.119-1024x576.png", "products/turmalin.png"],
  ["2024/07/HAS-Serisi-Kazan-Render-01-1024x640.png", "products/has.png"],
  ["2024/07/HAS-Mobil-50-2-3-1024x937.png", "products/has-ng.png"],
  ["2024/07/HT6-Render-1.93-1024x589.png", "products/has-turbo.png"],
  ["2024/07/AKM-R3.Cutaway-Izometrik-1024x598.png", "products/akuamarin-ks.png"],
  ["2024/07/Turkuaz-Serisi-Render-1.99-1024x658.png", "products/turkuaz-ks.png"],
  ["2024/08/kat-kaloriferleri-1-liste-1024x683.png", "products/kat-kaloriferi.png"],
  ["2024/07/Sera-Isitma.jpg", "products/sera-isitma.jpg"],
  ["2024/07/Riello-Brulor.png", "products/brulorler.png"],
  ["2024/07/Cift-Cidarli-Baca-1024x768.jpg", "products/baca.jpg"],
  ["2024/07/Kondenser.png", "products/kondenser.png"],
  ["2024/08/Ekonomizer-2-1024x560.png", "products/ekonomizer.png"],
  ["2024/07/eco-30-g-c-2a-gecici-2-1024x683.png", "products/kazan-otomasyon.png"],
  ["2024/07/Standart-Kazan-Panosu.jpg", "products/kazan-kontrol-panosu.jpg"],
  ["2024/07/tashkent-slider-1196x900.jpg", "gallery/taskent.jpg"],
  ["2024/08/ozbekistan-slider-5-1.jpg", "gallery/harezm.jpg"],
  ["2025/05/end-buhar-sistem-min.jpg", "gallery/manisa.jpg"],
  ["2024/08/izmir-slider1-duzenli.jpg", "gallery/izmir.jpg"],
  ["2024/08/enorpa-logo.png", "brand/logo.png"],
  ["2024/04/Enorpa-White-Logo.png", "brand/logo-white.png"],
  ["2024/04/cropped-Enorpa-Origin-1-192x192.png", "brand/favicon-192.png"],
  ["2024/07/tse.png", "brand/tse.png"],
  ["2024/07/ce.png", "brand/ce.png"],
  ["2024/07/asme.png", "brand/asme.png"],
  ["2024/08/eac.png", "brand/eac.png"],
];

function loadEnv() {
  const envPath = resolve(".env");
  const result = {};
  const text = readFile(envPath, "utf8");
  return text.then((content) => {
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const match = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
      if (!match) continue;
      let value = match[2];
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      result[match[1]] = value;
    }
    return result;
  });
}

function contentTypeFor(filePath) {
  const ext = filePath.split(".").pop()?.toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  if (ext === "svg") return "image/svg+xml";
  return "application/octet-stream";
}

async function main() {
  const env = await loadEnv();
  const supabaseUrl = env.SUPABASE_URL || `https://${SUPABASE_REF}.supabase.co`;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  let successCount = 0;
  let failureCount = 0;

  for (const [relativeSource, targetPath] of IMAGE_MAPPINGS) {
    const sourcePath = join(UPLOAD_ROOT, relativeSource);
    try {
      const sourceStat = await stat(sourcePath);
      if (!sourceStat.isFile()) throw new Error("source is not a file");

      const buffer = await readFile(sourcePath);
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(targetPath, buffer, {
          cacheControl: "315360000",
          contentType: contentTypeFor(targetPath),
          upsert: true,
        });

      if (error) throw error;
      successCount += 1;
      console.log(`✅ ${targetPath} <- ${relativeSource}`);
      if (data?.path) console.log(`   Stored path: ${data.path}`);
    } catch (error) {
      failureCount += 1;
      console.error(`❌ ${targetPath} <- ${relativeSource}`);
      console.error(`   ${error?.message || error}`);
    }
  }

  console.log(`\nUpload summary: ${successCount} succeeded, ${failureCount} failed.`);
  if (failureCount > 0) process.exit(1);
}

main().catch((error) => {
  console.error("Upload script failed:", error?.message || error);
  process.exit(1);
});
