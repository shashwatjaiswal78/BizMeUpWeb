/**
 * Shared motion setup: GSAP + ScrollTrigger, and Lenis smooth scroll on
 * desktop only (fine pointer, no reduced-motion preference).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (lenis) return lenis;
  const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!desktop || prefersReducedMotion()) return null;

  lenis = new Lenis({ anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/** ScrollTrigger start that centres a pinned block in the space below the fixed header. */
export function pinStart(block: HTMLElement) {
  return () => {
    const header = document.getElementById('site-header')?.offsetHeight ?? 0;
    const free = window.innerHeight - header - block.offsetHeight;
    return `top ${header + Math.max(0, free / 2)}`;
  };
}

/** Pause or resume smooth scrolling, e.g. while a modal is open. Returns false when smooth scrolling is off. */
export function setSmoothScrollPaused(paused: boolean) {
  if (!lenis) return false;
  if (paused) lenis.stop();
  else lenis.start();
  return true;
}
