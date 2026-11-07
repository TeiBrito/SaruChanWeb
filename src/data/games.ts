// Game catalogue shown in the "Elige tu juego" section.
// Add one object per game. Put cover images in /public/games/ and reference them as '/games/name.png'.

export type GameStatus = 'en-desarrollo' | 'proximamente' | 'disponible';

export interface Game {
  title: string;
  status: GameStatus;
  blurb: string;
  /** Platforms such as 'PC', 'Web', 'Switch'. Leave empty to hide. */
  platforms?: string[];
  /** Cover image path inside /public. Without it, an ink placeholder is drawn. */
  cover?: string;
  /** Main call to action (store page, itch.io, trailer...). */
  link?: { label: string; href: string };
  /** Renders the card as a locked "???" slot. */
  locked?: boolean;
  /** Flagship project: full-width card with a "Proyecto estrella" badge. */
  featured?: boolean;
  /** Coded key art used instead of an image cover (see src/components/HikariArt.astro). */
  art?: 'hikari';
}

export const statusLabel: Record<GameStatus, string> = {
  'en-desarrollo': 'En desarrollo',
  proximamente: 'Próximamente',
  disponible: 'Disponible',
};

// TODO: write the real blurbs, statuses, platforms and covers for each game.
export const games: Game[] = [
  {
    title: 'Hikari',
    status: 'en-desarrollo',
    blurb: 'Nuestro proyecto estrella. Muy pronto contaremos más.',
    featured: true,
    // TODO: swap for the real key art (`cover: '/games/hikari.jpg'`) when it's ready.
    art: 'hikari',
  },
  {
    title: 'Ship Happens',
    status: 'proximamente',
    blurb:
      'Eres el farero de una costa rocosa en plena noche de niebla. Los barcos solo ven por donde pasa tu haz de luz: guíalos hasta el puerto antes de que acaben contra las rocas.',
    platforms: ['Windows', 'macOS'],
    cover: '/games/ship-happens.jpg',
  },
  {
    title: 'Sweep Dreams',
    status: 'en-desarrollo',
    blurb:
      'Un juego cozy en 3D. Controlas a B.O.T., un robot aspirador con mucha personalidad que limpia la casa y descubre, recuerdo a recuerdo, la historia de la familia que vive en ella.',
    platforms: ['PC'],
    cover: '/games/sweep-dreams.jpg',
  },
];

/** Older games published on itch.io, shown in the "Archivo" section. */
export interface ArchiveGame {
  title: string;
  href: string;
  /** Genre as listed on itch.io, if any. */
  genre?: string;
  /** Cover image path inside /public. */
  cover?: string;
}

export const archive: ArchiveGame[] = [
  { title: 'SupaEzrio', href: 'https://saruchanvideogames.itch.io/supaezrio', genre: 'Plataformas' },
  { title: 'ColorBreaker', href: 'https://saruchanvideogames.itch.io/colorbreaker' },
  { title: 'ZombieCalypsis', href: 'https://saruchanvideogames.itch.io/zombiecalipsis', genre: 'Acción' },
  { title: 'Piggy eat apples', href: 'https://saruchanvideogames.itch.io/piggy-eat-apples' },
  { title: 'LightSplat', href: 'https://saruchanvideogames.itch.io/lightsplash', genre: 'Plataformas' },
];
