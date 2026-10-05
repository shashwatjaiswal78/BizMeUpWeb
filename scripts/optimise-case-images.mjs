// Turns the original case study screenshots (large PNGs in "Websites Case Study/",
// kept out of the deployed site) into light WebP source images inside each case's
// content folder. Astro then serves AVIF/WebP at the right size for each screen.
//
// Run after adding or replacing screenshots:  node scripts/optimise-case-images.mjs

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = 'Websites Case Study';
const OUT = 'src/content/case-studies';

// Mobile shots are single phone screens, used in the phone mockup.
// Hero shots are trimmed 32px each side to remove a scrollbar handle captured on the left edge.
// Nevoxel's hero has a browser tooltip over the logo, so its hero is taken from the top of the
// clean full-page capture at the same framing.
const cases = [
  {
    slug: 'rudra-imperial-resort',
    hero: { file: 'Rudra Hero.png', trim: 32 },
    full: 'Rudra Imperial Full Page.png',
    mobile: { file: 'Rudra Mobile.jpeg' },
  },
  {
    slug: 'nevoxel-marine-recruitment',
    hero: { file: 'Nevoxel Recruitment Full Page.png', top: 1362, trim: 32 },
    full: 'Nevoxel Recruitment Full Page.png',
    mobile: { file: 'Nevoxel Mobile.jpeg' },
  },
  { slug: 'kutsu-shoes', hero: { file: 'Kutsu Hero.png', trim: 32 }, full: 'Kutsu Full Page.png', mobile: { file: 'Kutsu Mobile.jpeg' } },
  {
    slug: 'elemento',
    hero: { file: 'The Elemento Hero.png', trim: 32 },
    full: 'The Elemento .png',
    // The capture includes the phone browser's address bar at the bottom; trim it off.
    mobile: { file: 'Elemento Mobile.jpeg', cropBottom: 108 },
  },
];

const HERO_WIDTH = 1920;
const MOBILE_WIDTH = 600; // shown at up to ~190px wide, so this covers 3x screens
const FULL_WIDTH = 1440; // keeps every page well under WebP's 16,383px height limit

const kb = async (path) => Math.round((await stat(path)).size / 1024);

for (const c of cases) {
  const dir = join(OUT, c.slug);
  await mkdir(dir, { recursive: true });

  const heroSrc = join(SRC, c.hero.file);
  const meta = await sharp(heroSrc).metadata();
  const height = c.hero.top ?? meta.height;
  const heroOut = join(dir, 'hero.webp');
  await sharp(heroSrc)
    .extract({ left: c.hero.trim, top: 0, width: meta.width - c.hero.trim * 2, height })
    .resize({ width: HERO_WIDTH })
    .webp({ quality: 82, effort: 6 })
    .toFile(heroOut);

  const fullOut = join(dir, 'full.webp');
  await sharp(join(SRC, c.full), { limitInputPixels: false })
    .resize({ width: FULL_WIDTH })
    .webp({ quality: 78, effort: 6 })
    .toFile(fullOut);

  let mobileNote = '';
  if (c.mobile) {
    const mobileSrc = join(SRC, c.mobile.file);
    const m = await sharp(mobileSrc).metadata();
    const mobileOut = join(dir, 'mobile.webp');
    await sharp(mobileSrc)
      .extract({ left: 0, top: 0, width: m.width, height: m.height - (c.mobile.cropBottom ?? 0) })
      .resize({ width: MOBILE_WIDTH })
      .webp({ quality: 82, effort: 6 })
      .toFile(mobileOut);
    mobileNote = `, mobile ${await kb(mobileOut)} KB`;
  }

  const fullMeta = await sharp(fullOut).metadata();
  console.log(
    `${c.slug}: hero ${await kb(heroOut)} KB, full ${await kb(fullOut)} KB (${fullMeta.width}x${fullMeta.height})${mobileNote}`,
  );
}
