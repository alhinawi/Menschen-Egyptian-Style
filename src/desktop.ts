// Desktop (offline) build: the Film-Stationen clips play from bundled copies
// instead of YouTube embeds. __MENSCHEN_DESKTOP__ is a build-time constant set
// by vite.config.js when MENSCHEN_DESKTOP=1 (scripts/build-desktop.mjs); the
// normal web build leaves it false and keeps the YouTube embeds exactly as
// they were. The bundled files live in dist/assets/clips/<youtube-id>.mp4,
// produced from desktop-cache/clips by the desktop build script.
declare const __MENSCHEN_DESKTOP__: boolean | undefined;
export const DESKTOP = typeof __MENSCHEN_DESKTOP__ !== 'undefined' && !!__MENSCHEN_DESKTOP__;

// Pull the video id out of a YouTube watch or embed URL; bare ids pass through.
export function youtubeId(urlOrId: string): string | undefined {
  const m = urlOrId.match(/(?:embed\/|watch\?v=|^)([A-Za-z0-9_-]{11})$/);
  return m ? m[1] : undefined;
}

export function localClipUrl(id: string): string {
  return '/assets/clips/' + id + '.mp4';
}
