// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Final domain: used for canonical URLs and absolute link previews.
  // Vercel redirects the apex domain to www, so www is the canonical host.
  site: 'https://www.saruchanvideogames.com',
});
