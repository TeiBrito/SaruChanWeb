// Devlog helpers. Posts live in one folder per language:
//   src/content/devlog/es/<slug>.md  →  /devlog/<slug>/
//   src/content/devlog/en/<slug>.md  →  /en/devlog/<slug>/
// Use the same file name in both folders so the language switch links the two versions.

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './ui';

/** A published post plus its language-free slug. */
export interface LocalizedPost {
  post: CollectionEntry<'devlog'>;
  slug: string;
}

/** Published posts for a language, newest first. */
export async function getPosts(lang: Lang): Promise<LocalizedPost[]> {
  const prefix = `${lang}/`;
  const posts = await getCollection('devlog', ({ id, data }) => id.startsWith(prefix) && !data.draft);
  return posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => ({ post, slug: post.id.slice(prefix.length) }));
}

/** Slugs that exist (published) in a language, to know whether a translation is available. */
export async function getSlugs(lang: Lang): Promise<Set<string>> {
  return new Set((await getPosts(lang)).map((p) => p.slug));
}
