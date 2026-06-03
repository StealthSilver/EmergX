/**
 * Generates static SEO image assets in /public from public/icon.svg.
 * Run: node scripts/generate-seo-assets.mjs
 */

import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const iconSvgPath = join(publicDir, "icon.svg");
const ogSvgPath = join(publicDir, "og-image.svg");

async function getIconSvgBuffer() {
  return readFile(iconSvgPath);
}

async function getOgSvgBuffer() {
  return readFile(ogSvgPath);
}

async function writePngFromSvg(svg, outputPath, width, height) {
  await sharp(svg).resize(width, height).png().toFile(outputPath);
  console.log(`Created ${outputPath}`);
}

async function writeIco(iconSvg, outputPath) {
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) => sharp(iconSvg).resize(size, size).png().toBuffer()),
  );

  const imageCount = pngBuffers.length;
  const headerSize = 6 + imageCount * 16;
  let offset = headerSize;
  const entries = [];

  for (let i = 0; i < pngBuffers.length; i++) {
    const size = sizes[i];
    entries.push({ size, offset, buffer: pngBuffers[i] });
    offset += pngBuffers[i].length;
  }

  const totalSize = offset;
  const buffer = Buffer.alloc(totalSize);

  buffer.writeUInt16LE(0, 0);
  buffer.writeUInt16LE(1, 2);
  buffer.writeUInt16LE(imageCount, 4);

  let entryOffset = 6;
  for (const entry of entries) {
    buffer.writeUInt8(entry.size === 256 ? 0 : entry.size, entryOffset);
    buffer.writeUInt8(entry.size === 256 ? 0 : entry.size, entryOffset + 1);
    buffer.writeUInt8(0, entryOffset + 2);
    buffer.writeUInt8(0, entryOffset + 3);
    buffer.writeUInt16LE(1, entryOffset + 4);
    buffer.writeUInt16LE(32, entryOffset + 6);
    buffer.writeUInt32LE(entry.buffer.length, entryOffset + 8);
    buffer.writeUInt32LE(entry.offset, entryOffset + 12);
    entryOffset += 16;
  }

  for (const entry of entries) {
    entry.buffer.copy(buffer, entry.offset);
  }

  await writeFile(outputPath, buffer);
  console.log(`Created ${outputPath}`);
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  const iconSvg = await getIconSvgBuffer();
  const ogSvg = await getOgSvgBuffer();

  await writePngFromSvg(iconSvg, join(publicDir, "favicon-96x96.png"), 96, 96);
  await writePngFromSvg(iconSvg, join(publicDir, "apple-touch-icon.png"), 180, 180);
  await writePngFromSvg(ogSvg, join(publicDir, "og-image.png"), 1200, 630);
  await writeIco(iconSvg, join(publicDir, "favicon.ico"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
