#!/usr/bin/env node
/**
 * Erzeugt die Medien der Website mit der Higgsfield-CLI und legt sie in
 * public/media ab. Die Website verwendet sie danach automatisch.
 *
 * Voraussetzung (einmalig, im eigenen Terminal):
 *   npm i -g @higgsfield/cli
 *   higgsfield auth login
 *
 * Aufruf:
 *   npm run media                 alle fehlenden Medien erzeugen
 *   npm run media -- --force      auch vorhandene neu erzeugen
 *   npm run media -- --dry-run    nur die Befehle anzeigen
 *   npm run media -- hero-poster  nur ein bestimmtes Medium
 *
 * Jeder Lauf verbraucht Higgsfield-Credits. Modellnamen und Parameter
 * folgen der README der CLI; `higgsfield model list` zeigt den aktuellen Stand.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mediaDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "media");
const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");
const only = args.filter((arg) => !arg.startsWith("--"));

const look =
  "muted sage green, warm sand beige and soft off-white, soft diffused daylight, calm and minimal, fine film grain, no people, no text, no logos";

const jobs = [
  {
    id: "hero-poster",
    file: "hero-poster.jpg",
    model: "nano_banana_2",
    flags: ["--aspect_ratio", "16:9", "--resolution", "2k"],
    prompt: `Abstract, very soft flowing waves of fine linen fabric and thin morning mist, ${look}. The left third of the frame is almost empty pale off-white so that dark text stays readable on top. Photographic, shallow depth of field.`,
  },
  {
    id: "hero",
    file: "hero.mp4",
    model: "kling3_0",
    startImage: "hero-poster.jpg",
    flags: ["--duration", "5", "--mode", "pro", "--sound", "off"],
    prompt:
      "Extremely slow, gentle undulating motion, like calm breathing. The fabric and the mist drift very slightly from right to left. Locked-off camera, no cuts, no zoom, the last frame resembles the first.",
  },
  {
    id: "therapie",
    file: "therapie.jpg",
    model: "nano_banana_2",
    flags: ["--aspect_ratio", "3:4", "--resolution", "2k"],
    prompt: `Quiet psychotherapy practice room in an old Viennese apartment building: two upholstered armchairs facing each other at a slight angle, a small side table with a glass of water, a sheer linen curtain, herringbone parquet, ${look}. Editorial interior photography.`,
  },
  {
    id: "hypnose",
    file: "hypnose.jpg",
    model: "nano_banana_2",
    flags: ["--aspect_ratio", "3:4", "--resolution", "2k"],
    prompt:
      "Close-up of still dark water with one slow concentric ripple spreading from the centre, deep moss green and sage tones, soft low light, meditative and minimal, no people, no text, no logos.",
  },
];

function findUrl(output) {
  try {
    const stack = [JSON.parse(output)];
    while (stack.length) {
      const value = stack.pop();
      if (typeof value === "string" && /^https?:\/\//.test(value)) return value;
      if (value && typeof value === "object") stack.push(...Object.values(value).reverse());
    }
  } catch {
    /* keine JSON-Ausgabe, unten per Muster suchen */
  }
  return output.match(/https?:\/\/[^\s"']+/)?.[0] ?? null;
}

fs.mkdirSync(mediaDir, { recursive: true });
let failed = false;

for (const job of jobs) {
  if (only.length && !only.includes(job.id)) continue;
  const target = path.join(mediaDir, job.file);
  if (fs.existsSync(target) && !force) {
    console.log(`– ${job.file} ist vorhanden, übersprungen (--force erzeugt neu)`);
    continue;
  }

  const command = ["generate", "create", job.model, "--prompt", job.prompt, ...job.flags];
  if (job.startImage) {
    const start = path.join(mediaDir, job.startImage);
    if (!fs.existsSync(start) && !dryRun) {
      console.error(`✗ ${job.file}: ${job.startImage} fehlt, bitte zuerst erzeugen`);
      failed = true;
      continue;
    }
    command.push("--start-image", start);
  }
  command.push("--wait", "--json");

  if (dryRun) {
    console.log(`higgsfield ${command.map((part) => (/\s/.test(part) ? JSON.stringify(part) : part)).join(" ")}\n`);
    continue;
  }

  console.log(`… ${job.file} wird erzeugt (${job.model})`);
  const result = spawnSync("higgsfield", command, { encoding: "utf8", shell: process.platform === "win32" });
  if (result.error || result.status !== 0) {
    console.error(`✗ ${job.file}: ${result.error?.message ?? result.stderr?.trim() ?? "Fehler"}`);
    console.error("  Ist die CLI installiert und angemeldet? (higgsfield auth login)");
    failed = true;
    continue;
  }

  const url = findUrl(result.stdout);
  if (!url) {
    console.error(`✗ ${job.file}: keine Ergebnis-URL in der Ausgabe gefunden:\n${result.stdout}`);
    failed = true;
    continue;
  }

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`✗ ${job.file}: Download fehlgeschlagen (${response.status}) von ${url}`);
    failed = true;
    continue;
  }
  fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
  console.log(`✓ ${job.file}`);
}

process.exit(failed ? 1 : 0);
