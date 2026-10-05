// Poster styling per service, matching homepage-design-reference.html.
// Copy (label, headline, description, price) lives in src/content/services.

import type { PosterProps } from '../components/ui/Poster.astro';
import robotThinking from '../assets/illustrations/robot-thinking.webp';
import phoneScroll from '../assets/illustrations/phone-scroll.webp';
import moneyStack from '../assets/illustrations/money-stack.webp';

export type PosterStyle = Omit<PosterProps, 'id' | 'label' | 'headline' | 'description' | 'href' | 'sticker'>;

export const posterStyles: Record<string, PosterStyle> = {
  websites: {
    showLink: true,
    large: true,
    rotate: -1,
    bg: 'orange',
    text: 'white',
    labelColor: 'espresso',
    headlineColor: 'white',
    descriptionColor: 'espresso',
    linkColor: 'espresso',
    minHeight: 640,
    shadow: 'lg',
    tape: { color: 'rgba(253,246,236,0.75)', width: 120, height: 30, rotate: -3, style: 'top:-14px;left:50%;margin-left:-60px' },
    class: 'min-[900px]:col-span-2 min-[900px]:row-span-2',
  },
  'social-media': {
    collapsible: true,
    rotate: 1.5,
    bg: 'mustard',
    text: 'espresso',
    minHeight: 300,
    illustration: { src: phoneScroll, height: '56%', textGap: '30%', right: '10px' },
    tape: { color: 'rgba(255,255,255,0.6)', rotate: 4, style: 'top:-12px;left:34px' },
  },
  'content-strategy': {
    collapsible: true,
    rotate: -2,
    bg: 'blue',
    text: 'white',
    minHeight: 300,
    tape: { color: 'rgba(253,246,236,0.7)', rotate: -5, style: 'top:-12px;right:40px' },
  },
  'performance-marketing': {
    showLink: true,
    collapsible: true,
    rotate: 1.5,
    bg: 'white',
    text: 'espresso',
    linkColor: 'orange-deep',
    peel: true,
    minHeight: 320,
    // Sits just left of the permanent peeled corner.
    illustration: { src: moneyStack, height: '32%', textGap: '50%', right: '58px', bottom: '10px' },
    tape: { color: 'rgba(231,111,81,0.25)', rotate: -2, style: 'top:-12px;left:50%;margin-left:-45px' },
  },
  'seo-and-blogs': {
    collapsible: true,
    rotate: -1.5,
    bg: 'espresso',
    text: 'cream',
    labelColor: 'mustard',
    headlineColor: 'cream',
    minHeight: 320,
    shadow: 'dark',
    tape: { color: 'rgba(253,246,236,0.75)', rotate: 3, style: 'top:-12px;left:40px' },
  },
  automations: {
    collapsible: true,
    rotate: 1.5,
    bg: 'white',
    text: 'espresso',
    headlineColor: 'orange-deep',
    minHeight: 320,
    illustration: { src: robotThinking, height: '56%', textGap: '27%' },
    tape: { color: 'rgba(244,185,66,0.55)', rotate: -4, style: 'top:-12px;right:36px' },
  },
};
