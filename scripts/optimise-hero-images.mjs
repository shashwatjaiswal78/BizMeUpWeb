// Small images for the decorative hero scene and poster illustrations: eight social posts for the phone grid and
// three product photos (cropped from the Kutsu best sellers capture) for the website mockup.
// Originals live in "Websites Case Study/" (not deployed). Run: node scripts/optimise-hero-images.mjs

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = 'Websites Case Study';
const OUT = 'src/assets/hero';
await mkdir(OUT, { recursive: true });

const posts = [
  'vina-did-you-know.webp',
  'vina-grand-launch.webp',
  'vina-bombay-sapphire.webp',
  'sugar-island-cbd-high.webp',
  'sugar-island-pricedrop.webp',
  'iaf-unplugged.webp',
  'acacia-best-deal.webp',
  'ahllya-what-is-numerology.png',
];

// Product tiles in the Kutsu full-page capture: { name, left, top } with a square-ish crop.
const KUTSU = join(SRC, 'Kutsu Full Page.png');
const products = [
  { name: 'product-brown-slipper', left: 185, top: 2161 },
  { name: 'product-pink-heels', left: 1294, top: 2161 },
  { name: 'product-cross-sandal', left: 1849, top: 3013 },
];

const kb = async (p) => Math.round((await stat(p)).size / 1024);

for (const file of posts) {
  const out = join(OUT, `post-${file.replace(/\.\w+$/, '')}.webp`);
  await sharp(join(SRC, 'Hero mockup', file)).resize({ width: 480, height: 480, fit: 'cover' }).webp({ quality: 80 }).toFile(out);
  console.log(out, await kb(out), 'KB');
}

for (const p of products) {
  const out = join(OUT, `${p.name}.webp`);
  await sharp(KUTSU, { limitInputPixels: false })
    .extract({ left: p.left, top: p.top, width: 526, height: 660 })
    .resize({ width: 480 })
    .webp({ quality: 80 })
    .toFile(out);
  console.log(out, await kb(out), 'KB');
}

// Poster illustrations (transparent PNGs), kept with alpha.
// lead-form.png is made by scripts/remove-checkerboard.mjs from lead-form-original.webp.
const illustrations = [
  { file: 'robot-thinking.png', out: 'src/assets/illustrations/robot-thinking.webp' },
  { file: 'phone-scroll.webp', out: 'src/assets/illustrations/phone-scroll.webp', width: 640 },
  { file: 'money-stack.webp', out: 'src/assets/illustrations/money-stack.webp', width: 720 },
  { file: 'lead-form.png', out: 'src/assets/illustrations/lead-form.webp', width: 720 },
];
await mkdir('src/assets/illustrations', { recursive: true });
for (const ill of illustrations) {
  let img = sharp(join(SRC, 'Illustrations', ill.file));
  if (ill.width) img = img.resize({ width: ill.width, withoutEnlargement: true });
  await img.webp({ quality: 86, alphaQuality: 100 }).toFile(ill.out);
  console.log(ill.out, await kb(ill.out), 'KB');
}
