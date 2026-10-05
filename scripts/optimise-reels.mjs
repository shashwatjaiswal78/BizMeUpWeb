// Reels for the homepage card fan. Originals live in "Video Gallery/" (not deployed).
// Each reel becomes a 540x960 (or smaller, never upscaled) H.264 MP4 with no audio (the fan always plays muted),
// capped at 30fps with faststart so it starts playing while it downloads, plus a WebP poster frame.
// Run: npm install --no-save ffmpeg-static && node scripts/optimise-reels.mjs
// (ffmpeg-static is not a project dependency, so deploys don't download ffmpeg. Skips reels that are
// already encoded; pass --force to redo them.)

import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdir, stat, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'Video Gallery';
const VIDEO_OUT = 'public/reels';
const POSTER_OUT = 'src/assets/reels';
const force = process.argv.includes('--force');

// slug: output name; file: original in Video Gallery; posterAt: seconds to take the poster from (default 1).
export const reels = [
  { slug: 'hindi-reel', file: 'Hindi Reel 2m views.mp4' },
  { slug: 'code-wes-anderson', file: 'CODE x Wes Anderson.mp4' },
  { slug: 'christmas-campaign-1', file: 'Christmas Campaign 1.mp4' },
  { slug: 'mera-aksha', file: 'Mera Aksha E com.mp4' },
  { slug: 'artist-collaboration', file: 'Artist Collaboration Maneswita.mp4' },
  { slug: 'festive-campaign-1', file: 'Festive Campaigns.mp4' },
  { slug: 'podcast-teaser-1', file: 'Podcast Teaser 1.mp4' },
  { slug: 'money-magnet', file: 'Video Money Magnet.mov' },
  { slug: 'summer-beer', file: 'Summer Beer.mp4' },
  { slug: 'rapid-fire', file: 'Ep 1 Rapid Fire.mp4' },
  { slug: 'christmas-campaign-2', file: 'Christmas Campaign 2.mp4' },
  { slug: 'mark-your-dates', file: 'Mark your Dates.mp4' },
  { slug: 'festive-campaign-2', file: 'Festive Campaign 2.mp4' },
  { slug: 'podcast-teaser-2', file: 'Podcast Teaser 2.mp4', posterAt: 20 },
];

await mkdir(VIDEO_OUT, { recursive: true });
await mkdir(POSTER_OUT, { recursive: true });

const mb = async (p) => ((await stat(p)).size / 1024 / 1024).toFixed(2);
const run = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });

for (const { slug, file, posterAt = 1 } of reels) {
  const src = join(SRC, file);
  const video = join(VIDEO_OUT, `${slug}.mp4`);
  const poster = join(POSTER_OUT, `${slug}.webp`);
  const frame = join(POSTER_OUT, `${slug}.tmp.png`);

  if (force || !existsSync(video)) {
    run([
      '-i', src,
      // Fit inside 540x960 without upscaling and keep even dimensions; -fpsmax caps the frame rate at 30.
      '-vf', "scale='min(540,iw)':'min(960,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
      '-fpsmax', '30',
      // Quality-based (CRF 23) with a 1.2 Mbps ceiling so busy footage stays light on mobile data.
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-maxrate', '1200k', '-bufsize', '2400k',
      '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-an', '-movflags', '+faststart',
      video,
    ]);
    // Already-small sources can grow when re-encoded: keep their video stream as is and just drop the audio.
    if ((await stat(video)).size > (await stat(src)).size) {
      run(['-i', src, '-c:v', 'copy', '-an', '-movflags', '+faststart', video]);
    }
  }

  if (force || !existsSync(poster)) {
    // Most representative frame from the first few seconds (skips black intro frames).
    run(['-ss', String(posterAt), '-i', video, '-vf', 'thumbnail=60', '-frames:v', '1', frame]);
    await sharp(frame).webp({ quality: 82 }).toFile(poster);
    await rm(frame);
  }

  console.log(`${slug}: ${await mb(src)} MB -> ${await mb(video)} MB, poster ${Math.round((await stat(poster)).size / 1024)} KB`);
}
