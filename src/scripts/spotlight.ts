/**
 * Hero spotlight. Moves the veil with requestAnimationFrame-throttled
 * transforms and handles lights-on (first scroll, a click in the hero or any key),
 * touch drag and the idle sweep on touch devices.
 */

const SWEEP_DELAY = 2000;
const SWEEP_PERIOD = 9000;

export function initSpotlight() {
  const hero = document.querySelector<HTMLElement>('.hero');
  const veil = hero?.querySelector<HTMLElement>('.hero-veil');
  const scene = hero?.querySelector<HTMLElement>('.hero-scene');
  if (!hero || !veil || !scene) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const isTouch = window.matchMedia('(hover: none)').matches;

  let lit = false;
  let scrolledOnce = false;
  let frame = 0;
  let pos = { x: 0, y: 0 };
  let touched = false;
  let sweepReady = false;
  let sweepFrame = 0;
  let sweepStart = 0;
  let visible = true;

  const apply = () => {
    frame = 0;
    veil.style.setProperty('--x', `${pos.x}px`);
    veil.style.setProperty('--y', `${pos.y}px`);
  };

  const moveTo = (x: number, y: number) => {
    pos = { x, y };
    if (!frame) frame = requestAnimationFrame(apply);
  };

  const fromClient = (clientX: number, clientY: number) => {
    const r = hero.getBoundingClientRect();
    moveTo(clientX - r.left, clientY - r.top);
  };

  /** Scene centre and size, in hero coordinates. */
  const sceneBox = () => {
    const h = hero.getBoundingClientRect();
    const s = scene.getBoundingClientRect();
    return { cx: s.left - h.left + s.width / 2, cy: s.top - h.top + s.height / 2, w: s.width, h: s.height };
  };

  // Start the light over the scene.
  const start = sceneBox();
  moveTo(start.cx + start.w * 0.12, start.cy - start.h * 0.1);

  const lightsOn = () => {
    if (lit) return;
    lit = true;
    hero.dataset.lit = 'true';
    stopSweep();
  };

  // A click anywhere in the hero, or any key (keyboard visitors), turns the lights on.
  hero.addEventListener('click', lightsOn);
  window.addEventListener('keydown', lightsOn, { once: true });

  // First scroll turns the lights on, once.
  const onScroll = () => {
    if (scrolledOnce || window.scrollY <= 0) return;
    scrolledOnce = true;
    window.removeEventListener('scroll', onScroll);
    lightsOn();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Desktop: follow the pointer, and feed the floating logos' parallax (-1 to 1).
  let parallaxFrame = 0;
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    if (!parallaxFrame) {
      const { clientX, clientY } = e;
      parallaxFrame = requestAnimationFrame(() => {
        parallaxFrame = 0;
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--mx', (((clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        hero.style.setProperty('--my', (((clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    }
    if (lit) return;
    fromClient(e.clientX, e.clientY);
  });

  // Touch: drag to move the light. Passive, so vertical drags still scroll the page.
  const onTouch = (e: TouchEvent) => {
    touched = true;
    stopSweep();
    if (lit) return;
    const t = e.touches[0];
    if (t) fromClient(t.clientX, t.clientY);
  };
  hero.addEventListener('touchstart', onTouch, { passive: true });
  hero.addEventListener('touchmove', onTouch, { passive: true });

  // Touch: if nobody touches within 2 seconds, sweep the light gently over the scene.

  const sweep = (now: number) => {
    if (!sweepStart) sweepStart = now;
    const t = ((now - sweepStart) / SWEEP_PERIOD) * Math.PI * 2;
    const box = sceneBox();
    moveTo(box.cx + Math.sin(t) * box.w * 0.32, box.cy + Math.sin(t * 2) * box.h * 0.22);
    sweepFrame = requestAnimationFrame(sweep);
  };

  const runSweep = () => {
    if (lit || touched || !visible || sweepFrame) return;
    sweepFrame = requestAnimationFrame(sweep);
  };

  function stopSweep() {
    if (sweepFrame) cancelAnimationFrame(sweepFrame);
    sweepFrame = 0;
  }

  if (isTouch) {
    window.setTimeout(() => {
      sweepReady = true;
      runSweep();
    }, SWEEP_DELAY);

    // Pause the sweep while the hero is off screen.
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stopSweep();
      else if (sweepReady) runSweep();
    }).observe(hero);
  }
}
