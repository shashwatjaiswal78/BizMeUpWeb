// Build-time Open Graph images (CLAUDE.md section 11): 1200x630 PNG, cream or orange
// background, espresso type and the BizMeUp wordmark. Kept well under 300 KB.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export interface OgCard {
  tone: 'orange' | 'cream';
  kicker?: string;
  headline: string;
}

const C = {
  cream: '#FDF6EC',
  espresso: '#191919',
  orange: '#E76F51',
  orangeDeep: '#B4472C',
};

// Resolved from the project root: this module is bundled elsewhere at build time.
const font = (path: string) => readFile(join(process.cwd(), 'node_modules', path));

let fonts: Awaited<ReturnType<typeof loadFonts>> | null = null;
async function loadFonts() {
  const [display, displayExt, body, bodyExt] = await Promise.all([
    font('@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff'),
    font('@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-ext-800-normal.woff'),
    font('@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff'),
    font('@fontsource/instrument-sans/files/instrument-sans-latin-ext-600-normal.woff'),
  ]);
  // Latin-ext files are separate families (satori keeps one font per name and weight); they supply ₹.
  return [
    { name: 'Bricolage', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'BricolageExt', data: displayExt, weight: 800 as const, style: 'normal' as const },
    { name: 'Instrument', data: body, weight: 600 as const, style: 'normal' as const },
    { name: 'InstrumentExt', data: bodyExt, weight: 600 as const, style: 'normal' as const },
  ];
}

type Node = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({ type, props: { style, children } });

export async function renderOg({ tone, kicker, headline }: OgCard) {
  fonts ??= await loadFonts();
  const size = headline.length <= 28 ? 104 : headline.length <= 56 ? 80 : 62;
  const bg = tone === 'orange' ? C.orange : C.cream;
  const dot = tone === 'orange' ? C.cream : C.orange;

  const tree = el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px',
      background: bg,
      color: C.espresso,
    },
    [
      el('div', { display: 'flex', flexDirection: 'column', gap: '28px' }, [
        ...(kicker
          ? [el('div', { fontFamily: 'Instrument, InstrumentExt', fontSize: 32, color: tone === 'orange' ? C.espresso : C.orangeDeep }, kicker)]
          : []),
        el(
          'div',
          { fontFamily: 'Bricolage, BricolageExt', fontSize: size, lineHeight: 0.95, letterSpacing: `${-0.04 * size}px`, maxWidth: '1000px' },
          headline,
        ),
      ]),
      el('div', { display: 'flex', fontFamily: 'Bricolage', fontSize: 52, letterSpacing: '-1.5px' }, [
        el('span', {}, 'BizMeUp'),
        el('span', { color: dot }, '.'),
      ]),
    ],
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return sharp(Buffer.from(svg)).png({ palette: true, quality: 90, compressionLevel: 9 }).toBuffer();
}
