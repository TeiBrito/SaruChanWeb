// Game catalogue shown in the "Elige tu juego / Select your game" section.
// Add one object per game. Put cover images in /public/games/ and reference them as '/games/name.png'.
// Texts that change per language use { es, en }.

import type { Lang } from '../i18n/ui';

/** A text in every site language. */
export type Localized = Record<Lang, string>;

export type GameStatus = 'en-desarrollo' | 'proximamente' | 'disponible';

export interface Game {
  title: string;
  status: GameStatus;
  blurb: Localized;
  /** Platforms such as 'PC', 'Web', 'Switch'. Leave empty to hide. */
  platforms?: string[];
  /** Cover image path inside /public. Without it, an ink placeholder is drawn. */
  cover?: string;
  /** Main call to action (store page, itch.io, trailer...). */
  link?: { label: Localized; href: string };
  /** Renders the card as a locked "???" slot. */
  locked?: boolean;
  /** Flagship project: full-width card with a "Proyecto estrella" badge. */
  featured?: boolean;
  /** Coded key art used instead of an image cover (see src/components/HikariArt.astro). */
  art?: 'hikari';
}

export const games: Game[] = [
  {
    title: 'Hikari',
    status: 'en-desarrollo',
    blurb: {
      es: 'Nuestro proyecto estrella. Muy pronto contaremos más.',
      en: 'Our flagship project. More news very soon.',
    },
    featured: true,
    // TODO: swap for the real key art (`cover: '/games/hikari.jpg'`) when it's ready.
    art: 'hikari',
  },
  {
    title: 'Ship Happens',
    status: 'proximamente',
    blurb: {
      es: 'Eres el farero de una costa rocosa en plena noche de niebla. Los barcos solo ven por donde pasa tu haz de luz: guíalos hasta el puerto antes de que acaben contra las rocas.',
      en: 'You’re the lighthouse keeper on a rocky coast on a foggy night. Ships can only see where your beam shines: guide them to the harbour before they crash into the rocks.',
    },
    platforms: ['Windows', 'macOS'],
    cover: '/games/ship-happens.jpg',
  },
  {
    title: 'Sweep Dreams',
    status: 'en-desarrollo',
    blurb: {
      es: 'Un juego cozy en 3D. Controlas a B.O.T., un robot aspirador con mucha personalidad que limpia la casa y descubre, recuerdo a recuerdo, la historia de la familia que vive en ella.',
      en: 'A cozy 3D game. You play B.O.T., a robot vacuum with loads of personality that cleans the house and uncovers, memory by memory, the story of the family who lives there.',
    },
    platforms: ['PC'],
    cover: '/games/sweep-dreams.jpg',
  },
];

/** Older games published on itch.io, shown in the "Clásicos de la casa / House classics" list. */
export interface ArchiveGame {
  title: string;
  href: string;
  /** Genre as listed on itch.io, if any. */
  genre?: Localized;
  /** Cover image path inside /public. */
  cover?: string;
}

const platformer: Localized = { es: 'Plataformas', en: 'Platformer' };

export const archive: ArchiveGame[] = [
  { title: 'SupaEzrio', href: 'https://saruchanvideogames.itch.io/supaezrio', genre: platformer },
  { title: 'ColorBreaker', href: 'https://saruchanvideogames.itch.io/colorbreaker' },
  { title: 'ZombieCalypsis', href: 'https://saruchanvideogames.itch.io/zombiecalipsis', genre: { es: 'Acción', en: 'Action' } },
  { title: 'Piggy eat apples', href: 'https://saruchanvideogames.itch.io/piggy-eat-apples' },
  { title: 'LightSplat', href: 'https://saruchanvideogames.itch.io/lightsplash', genre: platformer },
];
