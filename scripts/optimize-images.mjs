import sharp from "sharp";
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const INPUT_ROOT = resolve("C:/Users/admin/Desktop/enorpa/enorpa-images/enorpa-images/enorpa.com/wp-content/uploads");
const OUTPUT_ROOT = resolve("scripts/optimized");
const MAX_WIDTH = 1200;
const QUALITY = 80;

function isSupportedImage(filePath) {
  return /\.(jpe?g|png)$/i.test(filePath);
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return fullPath;
    }),
  );
  return nested.flat();
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  await mkdir(OUTPUT_ROOT, { recursive: true });
  await rm(OUTPUT_ROOT, { recursive: true, force: true });
  await mkdir(OUTPUT_ROOT, { recursive: true });

  const files = (await walk(INPUT_ROOT)).filter(isSupportedImage).sort();
  let totalOriginal = 0;
  let totalOutput = 0;

  for (const sourcePath of files) {
    const outputName = sourcePath.split(/[\\/]/).pop().replace(/\.(jpe?g|png)$/i, ".webp");
    const outputPath = join(OUTPUT_ROOT, outputName);

    const originalStat = await stat(sourcePath);
    totalOriginal += originalStat.size;

    await sharp(sourcePath)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputStat = await stat(outputPath);
    totalOutput += outputStat.size;
    console.log(`${outputName}: ${formatKb(originalStat.size)} → ${formatKb(outputStat.size)}`);
  }

  const averageOriginal = files.length ? totalOriginal / files.length : 0;
  const averageOutput = files.length ? totalOutput / files.length : 0;
  const reduction = files.length && totalOriginal > 0 ? ((totalOriginal - totalOutput) / totalOriginal) * 100 : 0;

  console.log(`\nOptimization summary: ${files.length} files processed.`);
  console.log(`Average size reduction: ${reduction.toFixed(1)}% (${formatKb(averageOriginal)} → ${formatKb(averageOutput)} avg/file).`);
}

main().catch((error) => {
  console.error("Optimization failed:", error?.message || error);
  process.exit(1);
});
