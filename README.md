# SaruChan Videogames — web

Static site built with [Astro](https://astro.build). Concept: "ink arcade" with emakimono brush strokes.

## Commands

```bash
npm install      # first time only
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Where to edit

| What | File |
| --- | --- |
| Email and social links | `src/data/site.ts` |
| Games and itch.io archive | `src/data/games.ts` (covers in `public/games/`) |
| Devlog posts | `src/content/devlog/*.md` |
| Studio copy and stats | `src/components/Studio.astro` |
| Colours and fonts | `src/styles/global.css` (`:root`) |
| Arcade effects (score, monkey, Konami) | `src/scripts/arcade.ts` |

## New devlog post

Create a `.md` file in `src/content/devlog/` (the file name becomes the URL) with this header:

```md
---
title: 'Post title'
date: 2026-11-07
summary: 'One sentence shown in the devlog list.'
draft: true   # optional: hides the post until you remove it
---
```

Write the body in Markdown below it.

## Secrets

- Click the monkey to insert coins.
- Konami code (↑ ↑ ↓ ↓ ← → ← → B A), or tap the monkey 10 times quickly on mobile.
- Any unknown URL shows a GAME OVER screen.
