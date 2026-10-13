import fontkit from "@pdf-lib/fontkit";
import { PDFDict, PDFDocument, PDFName, rgb } from "pdf-lib";

export type Stammdaten = {
  titel: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  svnr: string;
  krankenkasse: string;
  adresse: string;
  plzOrt: string;
  telefon: string;
  email: string;
  ortDatum: string;
};

/** Zuordnung der Formularfelder zu den Feldnamen im Original-PDF der Praxis. */
const fieldNames: Record<keyof Stammdaten, string> = {
  titel: "Titel",
  vorname: "Vorname",
  nachname: "Nachname",
  geburtsdatum: "Geburtsdatum",
  svnr: "Sozialversicherungsnummer",
  krankenkasse: "Krankenkasse",
  adresse: "Adresse",
  plzOrt: "PLZ/Ort",
  telefon: "Telefonnummer",
  email: "E-Mail",
  ortDatum: "Ort, Datum",
};

/**
 * Füllt das Stammdatenblatt der Praxis (public/stammdatenblatt.pdf) aus,
 * setzt die Unterschrift ein und gibt ein nicht mehr editierbares PDF zurück.
 * Läuft vollständig im Browser.
 */
export async function fillStammdatenblatt(
  template: ArrayBuffer | Uint8Array,
  fontBytes: ArrayBuffer | Uint8Array,
  data: Stammdaten,
  signaturePng: Uint8Array | null,
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(template);
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(fontBytes);
  const form = pdf.getForm();
  const page = pdf.getPage(0);
  const ink = rgb(0.18, 0.21, 0.2);

  // Texte direkt auf die Seite setzen: so passt sich die Schriftgröße an
  // lange Eingaben an und alle Sonderzeichen (č, ő, ş …) bleiben erhalten.
  for (const key of Object.keys(fieldNames) as (keyof Stammdaten)[]) {
    const value = (data[key] ?? "").trim();
    if (!value) continue;
    const box = form.getTextField(fieldNames[key]).acroField.getWidgets()[0].getRectangle();
    const available = box.width - 12;
    let size = 11.5;
    const width = font.widthOfTextAtSize(value, size);
    if (width > available) size = Math.max(6.5, (size * available) / width);
    const baseline = key === "ortDatum" ? box.y + 8 : box.y + (box.height - size * 0.72) / 2;
    page.drawText(value, { x: box.x + 6, y: baseline, size, font, color: ink });
  }

  if (signaturePng) {
    const box = form.getTextField("Unterschrift").acroField.getWidgets()[0].getRectangle();
    const image = await pdf.embedPng(signaturePng);
    const maxHeight = box.height + 22;
    const scale = Math.min(box.width / image.width, maxHeight / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    page.drawImage(image, { x: box.x + (box.width - width) / 2, y: box.y + 2, width, height });
  }

  // Formularfelder entfernen: das Ergebnis ist ein festes Dokument.
  // Die Links in der Fußzeile (Telefon, E-Mail, Web) bleiben erhalten.
  const annotations = page.node.Annots();
  if (annotations) {
    for (let index = annotations.size() - 1; index >= 0; index--) {
      const annotation = annotations.lookup(index, PDFDict);
      if (annotation.get(PDFName.of("Subtype")) === PDFName.of("Widget")) annotations.remove(index);
    }
  }
  pdf.catalog.delete(PDFName.of("AcroForm"));

  pdf.setTitle(`Stammdatenblatt ${data.vorname} ${data.nachname}`.trim());
  pdf.setSubject("Psychotherapeutische Praxis Mag. phil. Laudina Pongrácz");
  return pdf.save();
}

/** 1990-05-31 → 31.05.1990 */
export function formatDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : iso;
}
