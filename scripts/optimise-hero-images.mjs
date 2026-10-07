// Small images for the decorative hero scene and poster illustrations: eight social posts for the phone grid and
// three product photos (a stone bracelet and two apparel shots) for the website mockup.
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

// Product tiles for the website mockup, cropped to the tiles' 3:2 shape: a natural stone bracelet
// (from the Meraaksha amethyst post, below its text) and two apparel shots from Unsplash (free
// Unsplash Licence: fxBkM2xXoRY by TuanAnh Blue, S4f4apZd-hA by tian dayong).
const products = [
  { name: 'product-amethyst-bracelet', file: 'amethyst-bracelet-post.png', crop: { left: 180, top: 540, width: 720, height: 480 } },
  { name: 'product-folded-tees', file: 'apparel-folded-tees.jpg', crop: { left: 0, top: 0, width: 1200, height: 800 } },
  { name: 'product-linen-shirt', file: 'apparel-linen-shirt.jpg', crop: { left: 0, top: 380, width: 1200, height: 800 } },
];

const kb = async (p) => Math.round((await stat(p)).size / 1024);

for (const file of posts) {
  const out = join(OUT, `post-${file.replace(/\.\w+$/, '')}.webp`);
  await sharp(join(SRC, 'Hero mockup', file)).resize({ width: 480, height: 480, fit: 'cover' }).webp({ quality: 80 }).toFile(out);
  console.log(out, await kb(out), 'KB');
}

for (const p of products) {
  const out = join(OUT, `${p.name}.webp`);
  await sharp(join(SRC, 'Hero mockup', p.file))
    .extract(p.crop)
    .resize({ width: 480, height: 320, fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(out, await kb(out), 'KB');
}

// Poster illustrations (transparent PNGs), kept with alpha.
// lead-form.png is made by scripts/remove-checkerboard.mjs from lead-form-original.webp.
const illustrations = [
  { file: 'robot-thinking.png', out: 'src/assets/illustrations/robot-thinking.webp' },
  { file: 'phone-scroll.webp', out: 'src/assets/illustrations/phone-scroll.webp', width: 640 },
  { file: 'rupee-coin.png', out: 'src/assets/illustrations/rupee-coin.webp', width: 480, trim: true },
  { file: 'lead-form.png', out: 'src/assets/illustrations/lead-form.webp', width: 720 },
];
await mkdir('src/assets/illustrations', { recursive: true });
for (const ill of illustrations) {
  let img = sharp(join(SRC, 'Illustrations', ill.file));
  if (ill.trim) img = img.trim();
  if (ill.width) img = img.resize({ width: ill.width, withoutEnlargement: true });
  await img.webp({ quality: 86, alphaQuality: 100 }).toFile(ill.out);
  console.log(ill.out, await kb(ill.out), 'KB');
}
