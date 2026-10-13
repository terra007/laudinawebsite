import fs from "node:fs";
import path from "node:path";

/**
 * Medienplätze der Website. Liegt die Datei in /public/media, wird sie
 * automatisch verwendet; sonst zeigt die Seite ihre gezeichnete Variante.
 * Die Dateien entstehen über `npm run media` (Higgsfield) oder werden
 * von Hand in den Ordner gelegt.
 */
export const mediaFiles = {
  heroVideo: "hero.mp4",
  heroPoster: "hero-poster.jpg",
  therapie: "therapie.jpg",
  hypnose: "hypnose.jpg",
  portrait: "portrait.jpg",
  standortWien: "standort-wien.webp",
  standortNoe: "standort-noe.webp",
  orfVideo: "orf-nikotinentzug.mp4",
  orfPoster: "orf-nikotinentzug.jpg",
} as const;

export type MediaKey = keyof typeof mediaFiles;

/** Gibt den öffentlichen Pfad zurück, wenn die Datei vorhanden ist. */
export function media(key: MediaKey): string | null {
  const file = mediaFiles[key];
  const onDisk = path.join(process.cwd(), "public", "media", file);
  return fs.existsSync(onDisk) ? `/media/${file}` : null;
}
