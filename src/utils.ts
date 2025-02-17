// src/utils/links.ts

/** The site’s `base` URL with any trailing slash removed. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a local link with the currently configured `base` URL. */
export function withBase(href: string | URL | undefined | null): string {
  return href ? BASE + href : BASE;
}
