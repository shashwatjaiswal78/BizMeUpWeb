/**
 * Reels shown in the card fan on the homepage (ReelsFan section), in fan order.
 * The fourth reel starts in the centre.
 * To add a reel: put the original in "Video Gallery/", add it to scripts/optimise-reels.mjs,
 * run `node scripts/optimise-reels.mjs`, then add an entry here with the same slug.
 */
import type { ImageMetadata } from 'astro';

export interface Reel {
  title: string;
  /** Matches public/reels/<slug>.mp4 and src/assets/reels/<slug>.webp */
  slug: string;
  views?: string;
  /** Optional link, e.g. the reel on Instagram. */
  linkUrl?: string;
}

export interface ResolvedReel extends Reel {
  poster: ImageMetadata;
  video: string;
}

export const reels: Reel[] = [
  { title: 'Christmas campaign', slug: 'christmas-campaign-1' },
  { title: 'CODE x Wes Anderson', slug: 'code-wes-anderson' },
  { title: 'Mera Aksha', slug: 'mera-aksha' },
  { title: 'Artist collaboration', slug: 'artist-collaboration' },
  { title: 'Hindi reel', slug: 'hindi-reel', views: '2M views' },
  { title: 'Festive campaign', slug: 'festive-campaign-1' },
  { title: 'Rapid fire, Ep 1', slug: 'rapid-fire' },
  { title: 'Money Magnet', slug: 'money-magnet' },
  { title: 'Summer beer', slug: 'summer-beer' },
  { title: 'Christmas campaign', slug: 'christmas-campaign-2' },
  { title: 'Mark your dates', slug: 'mark-your-dates' },
  { title: 'Podcast teaser', slug: 'podcast-teaser-1' },
  { title: 'Festive campaign', slug: 'festive-campaign-2' },
  { title: 'Podcast teaser', slug: 'podcast-teaser-2' },
];

const posters = import.meta.glob<{ default: ImageMetadata }>('../assets/reels/*.webp', { eager: true });

/** Reels with their poster image and video path attached. Fails the build if a poster is missing. */
export const resolvedReels: ResolvedReel[] = reels.map((reel) => {
  const poster = posters[`../assets/reels/${reel.slug}.webp`]?.default;
  if (!poster) throw new Error(`Missing poster for reel "${reel.slug}". Run node scripts/optimise-reels.mjs`);
  return { ...reel, poster, video: `/reels/${reel.slug}.mp4` };
});
