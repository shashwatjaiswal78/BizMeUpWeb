// Removes a checkerboard "fake transparency" background baked into an image.
// Flood-fills from the edges through neutral (grey/white, unsaturated) light pixels,
// so warm-toned artwork (cream cards, skin, orange) is kept. Then feathers the edge.
// Usage: node scripts/remove-checkerboard.mjs <input> <output.png>

import sharp from 'sharp';

const [input, output] = process.argv.slice(2);
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;

// Checker squares sit in two neutral brightness bands (~128-144 and ~192-208); the artwork's
// cream card and fields are brighter (224+) and warm, its outlines much darker.
const isBackground = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const light = (r + g + b) / 3;
  return max - min <= 10 && light >= 100 && light <= 214;
};

const removed = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
while (stack.length) {
  const p = stack.pop();
  if (removed[p] || !isBackground(p * 4)) continue;
  removed[p] = 1;
  const x = p % w, y = (p / w) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < w - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - w);
  if (y < h - 1) stack.push(p + w);
}

// Pass 2: checker patches enclosed by the artwork (e.g. inside a looped line) are not reachable
// from the edges; remove any remaining background-like region bigger than a speck.
const seen = new Uint8Array(w * h);
for (let start = 0; start < w * h; start++) {
  if (removed[start] || seen[start] || !isBackground(start * 4)) continue;
  const region = [];
  const queue = [start];
  seen[start] = 1;
  while (queue.length) {
    const p = queue.pop();
    region.push(p);
    const x = p % w, y = (p / w) | 0;
    for (const [q, ok] of [[p - 1, x > 0], [p + 1, x < w - 1], [p - w, y > 0], [p + w, y < h - 1]]) {
      if (ok && !seen[q] && !removed[q] && isBackground(q * 4)) { seen[q] = 1; queue.push(q); }
    }
  }
  if (region.length > 1500) for (const p of region) removed[p] = 1;
}

// Pass 3: clean the fringe. Near-neutral pixels within 2px of removed background go too.
const fringe = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const light = (r + g + b) / 3;
  return Math.max(r, g, b) - Math.min(r, g, b) <= 16 && light >= 90 && light <= 224;
};
for (let pass = 0; pass < 2; pass++) {
  const next = [];
  for (let p = 0; p < w * h; p++) {
    if (removed[p] || !fringe(p * 4)) continue;
    const x = p % w;
    if ((x > 0 && removed[p - 1]) || (x < w - 1 && removed[p + 1]) || removed[p - w] || removed[p + w]) next.push(p);
  }
  for (const p of next) removed[p] = 1;
}

// Alpha: 0 for removed pixels; partial for pixels touching the background (soft edge).
let count = 0;
for (let p = 0; p < w * h; p++) {
  if (removed[p]) { data[p * 4 + 3] = 0; count++; continue; }
  const x = p % w, y = (p / w) | 0;
  let n = 0;
  for (const q of [p - 1, p + 1, p - w, p + w]) {
    const qx = q % w, qy = (q / w) | 0;
    if (q >= 0 && q < w * h && Math.abs(qx - x) <= 1 && Math.abs(qy - y) <= 1 && removed[q]) n++;
  }
  if (n) data[p * 4 + 3] = Math.round(255 * (1 - n / 5));
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } }).trim().png().toFile(output);
console.log(`removed ${Math.round((count / (w * h)) * 100)}% of pixels -> ${output}`);
