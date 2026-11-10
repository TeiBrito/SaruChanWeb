// UI strings for every language. Spanish is the default and lives at "/", English at "/en/".
// To change a text, edit it here in both languages.

/** Languages the site is published in, with their native names. */
export const languages = { es: 'Español', en: 'English' } as const;

/** Language code ('es' | 'en'). */
export type Lang = keyof typeof languages;

/** Default language: served without a URL prefix. */
export const defaultLang: Lang = 'es';

/** Builds a path for a language: localePath('en', '/devlog/') → '/en/devlog/'. */
export function localePath(lang: Lang, path = '/'): string {
  return lang === defaultLang ? path : `/${lang}${path}`;
}

/** Infers the language from a URL pathname. */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

const es = {
  meta: {
    tagline: 'Estudio indie de videojuegos',
    description: 'SaruChan Videogames es un estudio independiente de videojuegos. Juegos, devlog y contacto.',
    ogLocale: 'es_ES',
  },
  skipLink: 'Saltar al contenido',
  nav: { games: 'Juegos', devlog: 'Devlog', studio: 'Estudio', contact: 'Contacto', label: 'Principal' },
  langSwitch: { label: 'Idioma', other: 'Read in English' },
  hud: { home: 'SaruChan Videogames, inicio' },
  hero: {
    monoLabel: 'Dale al mono para insertar una moneda',
    hintTouch: 'Toca al mono. Mucho.',
  },
  games: {
    title: 'Elige tu juego',
    lead: 'Juegos pequeños con mucho cariño, dibujados a tinta y programados a base de café.',
    featured: 'Proyecto estrella',
    secret: 'Juego secreto',
    status: { 'en-desarrollo': 'En desarrollo', proximamente: 'Próximamente', disponible: 'Disponible' },
    archiveTitle: 'Clásicos de la casa',
    archiveLead: 'Nuestros primeros juegos. Se pueden jugar gratis en itch.io.',
    play: 'Jugar',
    opensItch: '(abre itch.io)',
  },
  devlog: {
    title: 'Devlog',
    lead: 'Partidas guardadas: bocetos, bugs y decisiones de diseño contadas desde dentro.',
    empty: 'No hay partidas guardadas todavía. Vuelve pronto.',
    back: 'Devlog',
  },
  studio: {
    title: 'El estudio',
    portraitAlt: 'Retrato ilustrado de Tei Brito, con gorro, barba y camisa roja',
    class: 'Clase: Estudio de una sola persona',
    buddy: 'Compañero: Saru',
    stats: ['Café', 'Multiclase', 'Paciencia con los bugs'],
    statOf: 'de 100',
    // Paragraphs may contain simple inline HTML.
    body: [
      '<strong>SaruChan Videogames</strong> es un estudio independiente de una sola persona: Tei Brito. Diseño, código, arte y alguna que otra noche sin dormir salen de las mismas manos. Juegos con personalidad, trazo a mano y detalles que te sacan una sonrisa.',
      'Saru, el mono con gafas, es la mascota del estudio y el encargado oficial de probarlo todo y, de vez en cuando, romper algo. Así es como se aprende.',
    ],
    kanji: 'saru: «mono» en japonés, y la forma cariñosa en la que Tei Brito llama a su hijo',
  },
  contact: {
    title: '¿Jugamos?',
    lead: 'Prensa, colaboraciones, creadores de contenido o simplemente ganas de saludar: escríbenos.',
    socials: 'Redes sociales',
  },
  footer: { note: 'Hecho con tinta, café y algún plátano' },
  arcade: { konami: '+30 vidas · Modo mono activado' },
};

/** Shape every language must follow (inferred from Spanish). */
export type UI = typeof es;

const en: UI = {
  meta: {
    tagline: 'Indie game studio',
    description: 'SaruChan Videogames is an independent game studio. Games, devlog and contact.',
    ogLocale: 'en_US',
  },
  skipLink: 'Skip to content',
  nav: { games: 'Games', devlog: 'Devlog', studio: 'Studio', contact: 'Contact', label: 'Main' },
  langSwitch: { label: 'Language', other: 'Leer en español' },
  hud: { home: 'SaruChan Videogames, home' },
  hero: {
    monoLabel: 'Poke the monkey to insert a coin',
    hintTouch: 'Tap the monkey. A lot.',
  },
  games: {
    title: 'Select your game',
    lead: 'Small games made with lots of love, drawn in ink and powered by coffee.',
    featured: 'Flagship project',
    secret: 'Secret game',
    status: { 'en-desarrollo': 'In development', proximamente: 'Coming soon', disponible: 'Out now' },
    archiveTitle: 'House classics',
    archiveLead: 'Our first games. Free to play on itch.io.',
    play: 'Play',
    opensItch: '(opens itch.io)',
  },
  devlog: {
    title: 'Devlog',
    lead: 'Saved games: sketches, bugs and design decisions, told from the inside.',
    empty: 'No saved games yet. Check back soon.',
    back: 'Devlog',
  },
  studio: {
    title: 'The studio',
    portraitAlt: 'Illustrated portrait of Tei Brito, with a beanie, a beard and a red shirt',
    class: 'Class: One-person studio',
    buddy: 'Sidekick: Saru',
    stats: ['Coffee', 'Multiclass', 'Patience with bugs'],
    statOf: 'out of 100',
    body: [
      '<strong>SaruChan Videogames</strong> is a one-person independent game studio: Tei Brito. Design, code, art and the occasional sleepless night all come from the same pair of hands. Games with personality, a hand-drawn touch and little details that make you smile.',
      'Saru, the monkey with glasses, is the studio mascot and official tester of everything, who now and then breaks something. That’s how you learn.',
    ],
    kanji: 'saru: “monkey” in Japanese, and the affectionate nickname of Tei Brito’s son',
  },
  contact: {
    title: 'Wanna play?',
    lead: 'Press, collaborations, content creators or just saying hi: drop us a line.',
    socials: 'Social media',
  },
  footer: { note: 'Made with ink, coffee and the odd banana' },
  arcade: { konami: '+30 lives · Monkey mode on' },
};

/** All UI strings, indexed by language. */
export const ui: Record<Lang, UI> = { es, en };

/** Returns the UI strings for a language. */
export const useT = (lang: Lang): UI => ui[lang];
