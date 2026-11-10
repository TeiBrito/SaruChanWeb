// Global studio info shared by every language. Translatable texts live in src/i18n/ui.ts.

import { localePath, useT, type Lang } from '../i18n/ui';

export const site = {
  name: 'SaruChan Videogames',
  email: 'info@saruchanvideogames.com',
  socials: [
    { label: 'itch.io', href: 'https://saruchanvideogames.itch.io' },
    { label: 'Bluesky', href: 'https://bsky.app/profile/saruchanvideogames.bsky.social' },
    { label: 'Instagram', href: 'https://www.instagram.com/saruchan_videogames' },
  ],
};

/** Main navigation for a language. Section anchors are shared across languages. */
export function getNav(lang: Lang) {
  const t = useT(lang).nav;
  const home = localePath(lang, '/');
  return [
    { label: t.games, href: `${home}#juegos` },
    { label: t.devlog, href: `${home}#devlog` },
    { label: t.studio, href: `${home}#estudio` },
    { label: t.contact, href: `${home}#contacto` },
  ];
}
