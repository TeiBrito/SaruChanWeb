// Client-side "arcade" layer: HUD score, monkey interaction, scroll reveals and the Konami easter egg.
// Everything here is progressive enhancement: the site works without it.

/** True when the visitor prefers less motion; heavy effects are skipped. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** localStorage key where the best score is kept. */
const HI_KEY = 'saruchan-hi';

/* ------------------------------------------------------------------ */
/* HUD                                                                 */
/* ------------------------------------------------------------------ */

const scoreEl = document.getElementById('hud-score');
const hiEl = document.getElementById('hud-hi');
const creditEl = document.getElementById('hud-credit');

/** Points earned from bonuses (coins, sections reached, secrets). */
let bonus = 0;
/** Deepest scroll position reached, in pixels. */
let maxScroll = 0;
/** Coins inserted by clicking the monkey. */
let credits = 0;
/** Number currently painted in the HUD (animates towards the real score). */
let shownScore = 0;
/** Best score ever on this device. */
let hiScore = readHi();

function readHi(): number {
  try {
    return Number(localStorage.getItem(HI_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveHi(value: number) {
  try {
    localStorage.setItem(HI_KEY, String(value));
  } catch {
    /* Storage can be blocked (private mode); the hi-score just won't persist. */
  }
}

const pad = (n: number, len = 6) => String(Math.min(n, 10 ** len - 1)).padStart(len, '0');

function currentScore() {
  return Math.round(maxScroll / 4 / 10) * 10 + bonus;
}

/** Smoothly counts the HUD number up to the real score. */
function tickScore() {
  const target = currentScore();
  if (shownScore !== target) {
    const step = Math.max(10, Math.round((target - shownScore) / 8 / 10) * 10);
    shownScore = Math.min(target, shownScore + step);
    if (scoreEl) scoreEl.textContent = pad(shownScore);
    if (shownScore > hiScore) {
      hiScore = shownScore;
      if (hiEl) hiEl.textContent = pad(hiScore);
    }
  }
  requestAnimationFrame(tickScore);
}

if (hiEl) hiEl.textContent = pad(hiScore);
window.addEventListener(
  'scroll',
  () => {
    maxScroll = Math.max(maxScroll, window.scrollY);
  },
  { passive: true },
);
window.addEventListener('pagehide', () => saveHi(hiScore));
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveHi(hiScore);
});
requestAnimationFrame(tickScore);

/* ------------------------------------------------------------------ */
/* Toast                                                               */
/* ------------------------------------------------------------------ */

const toastEl = document.getElementById('toast');
let toastTimer: number | undefined;

function toast(text: string, ms = 2200) {
  if (!toastEl) return;
  toastEl.textContent = text;
  toastEl.classList.add('is-on');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove('is-on'), ms);
}

/* ------------------------------------------------------------------ */
/* Monkey: follows the pointer, clicking inserts coins                 */
/* ------------------------------------------------------------------ */

const mono = document.getElementById('mono');
const tilt = document.getElementById('mono-tilt');

if (mono && tilt && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  /** Target and current rotation, eased every frame for a soft follow. */
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };

  window.addEventListener('pointermove', (e) => {
    const r = mono.getBoundingClientRect();
    if (r.bottom < 0) return; // Hero scrolled away: stop tracking.
    const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
    const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    target.y = Math.max(-1, Math.min(1, dx * 2)) * 22;
    target.x = Math.max(-1, Math.min(1, dy * 2)) * -14;
  });
  document.documentElement.addEventListener('pointerleave', () => {
    target.x = 0;
    target.y = 0;
  });

  const loop = () => {
    cur.x += (target.x - cur.x) * 0.08;
    cur.y += (target.y - cur.y) * 0.08;
    tilt.style.transform = `rotateX(${cur.x.toFixed(2)}deg) rotateY(${cur.y.toFixed(2)}deg) translateX(${(cur.y * 0.6).toFixed(1)}px)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/** Taps in a short window; ten quick taps unlock the secret on touch screens. */
let tapStreak = 0;
let tapTimer: number | undefined;

mono?.addEventListener('click', (e) => {
  credits = Math.min(99, credits + 1);
  bonus += 100;
  if (creditEl) creditEl.textContent = pad(credits, 2);

  mono.classList.remove('is-hit');
  void mono.offsetWidth; // Restart the bounce animation.
  mono.classList.add('is-hit');

  // Floating "+100" at the click position (or centre for keyboard clicks).
  const r = mono.getBoundingClientRect();
  const x = e.clientX || r.left + r.width / 2;
  const y = e.clientY || r.top + r.height / 3;
  const pop = document.createElement('span');
  pop.className = 'coin-pop';
  pop.textContent = '+100';
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;
  document.body.appendChild(pop);
  pop.addEventListener('animationend', () => pop.remove());

  tapStreak += 1;
  window.clearTimeout(tapTimer);
  tapTimer = window.setTimeout(() => (tapStreak = 0), 1500);
  if (tapStreak >= 10) {
    tapStreak = 0;
    secret();
  }
});

/* ------------------------------------------------------------------ */
/* Scroll reveals (brush strokes, character card) + stage bonuses      */
/* ------------------------------------------------------------------ */

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.35 },
);
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

/** Each section gives a one-time "stage reached" bonus. */
const stageObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        bonus += 500;
        stageObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.4 },
);
document.querySelectorAll('main section[id]:not(#inicio)').forEach((el) => stageObserver.observe(el));

/* ------------------------------------------------------------------ */
/* Konami code: ↑ ↑ ↓ ↓ ← → ← → B A                                    */
/* ------------------------------------------------------------------ */

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
let konamiPos = 0;

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  konamiPos = key === KONAMI[konamiPos] ? konamiPos + 1 : key === KONAMI[0] ? 1 : 0;
  if (konamiPos === KONAMI.length) {
    konamiPos = 0;
    secret();
  }
});

/** Whether the secret animation is currently playing. */
let secretOn = false;

function secret() {
  if (secretOn) return;
  secretOn = true;
  bonus += 30000;
  // No "¡": the pixel font lacks that glyph.
  toast('+30 vidas · Modo mono activado', 3200);
  document.documentElement.classList.add('konami');

  if (!reducedMotion) {
    // Rain of 猿 seals.
    const rain = document.createElement('div');
    rain.className = 'seal-rain';
    rain.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 36; i++) {
      const s = document.createElement('span');
      s.textContent = '猿';
      s.style.left = `${Math.random() * 100}%`;
      s.style.animationDelay = `${Math.random() * 1.6}s`;
      s.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
      s.style.setProperty('--r', `${Math.round(Math.random() * 60 - 30)}deg`);
      s.style.setProperty('--s', (0.6 + Math.random() * 0.9).toFixed(2));
      rain.appendChild(s);
    }
    document.body.appendChild(rain);
    window.setTimeout(() => rain.remove(), 4600);
  }

  window.setTimeout(() => {
    document.documentElement.classList.remove('konami');
    secretOn = false;
  }, 4600);
}
