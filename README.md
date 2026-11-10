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
| Interface texts (both languages) | `src/i18n/ui.ts` |
| Email and social links | `src/data/site.ts` |
| Games and itch.io archive (`{ es, en }` texts) | `src/data/games.ts` (covers in `public/games/`) |
| Devlog posts | `src/content/devlog/es/*.md` and `src/content/devlog/en/*.md` |
| Studio stat values | `src/components/Studio.astro` |
| Colours and fonts | `src/styles/global.css` (`:root`) |
| Arcade effects (score, monkey, Konami) | `src/scripts/arcade.ts` |

## Languages

Spanish lives at `/` and English at `/en/`. The ES / EN switch in the HUD links each page to its translation.

## New devlog post

Create a `.md` file in `src/content/devlog/es/` (Spanish, `/devlog/<file-name>/`) and, if you want it in English too, one **with the same file name** in `src/content/devlog/en/` (`/en/devlog/<file-name>/`). A post without translation only appears in its own language. Header:

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
