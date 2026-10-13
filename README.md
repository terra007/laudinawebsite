# Website der psychotherapeutischen Praxis Mag. phil. Laudina Pongrácz

Next.js (App Router), Tailwind CSS 4, Framer Motion, shadcn/ui-Komponenten, Lucide.

## Starten

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Benötigt Node.js 20.9 oder neuer.

## Aufbau

| Ort | Inhalt |
| --- | --- |
| `lib/site.ts` | Alle Texte und Daten: Kontakt, Standorte, 18 Gründe, Schwerpunkte, Ausbildung, Honorar, Kostenzuschuss |
| `app/page.tsx` | Startseite, setzt die Bereiche zusammen |
| `app/stammdatenblatt` | Stammdatenblatt als Formular |
| `app/impressum` | Verschwiegenheit, Datenschutz, Impressum |
| `app/api` | Versand von Kontaktformular und Stammdatenblatt |
| `components` | `navbar`, `hero`, `psychotherapy`, `reasons-check`, `hypnosis`, `services-grid`, `about`, `pricing-cards`, `contact`, `contact-form`, `stammdaten-form`, `signature-pad`, `footer` |
| `components/ui` | shadcn/ui-Bausteine (Button, Input, Dialog …); weitere mit `npx shadcn@latest add <name>` |
| `app/globals.css` | Farben, Schriften, Typografie |

## Medien

Bilder und Videos liegen in `public/media`. Die Dateinamen stehen in
`public/media/LIESMICH.txt`. Ist eine Datei vorhanden, verwendet die Website sie
automatisch; fehlt sie, zeigt die Seite ihre gezeichnete Variante.

Hero-Video und Bereichsbilder erzeugt Higgsfield:

```bash
npm i -g @higgsfield/cli
higgsfield auth login
npm run media              # verbraucht Higgsfield-Credits
npm run media -- --dry-run # zeigt nur die Befehle und Prompts
```

Das Skript `scripts/generate-media.mjs` wurde ohne Zugang zu Higgsfield
geschrieben und ist ungetestet; Modellnamen und Parameter folgen der README der CLI.

Porträtfoto (`portrait.jpg`) und ORF-Beitrag (`orf-nikotinentzug.mp4`) stammen
von der bisherigen Website und müssen von Hand in den Ordner kopiert werden.

## Formulare

Kontaktformular und Stammdatenblatt senden per SMTP an die Praxis. Dazu
`.env.example` nach `.env.local` kopieren und ausfüllen. Ohne diese Angaben
weisen beide Formulare auf E-Mail, Telefon bzw. den PDF-Download hin.

Das Stammdatenblatt füllt im Browser das Original-PDF der Praxis
(`public/stammdatenblatt.pdf`) aus und setzt die Unterschrift ein. Der Server
leitet das PDF nur als E-Mail-Anhang weiter und speichert nichts.

## Suchmaschinen

Titel und Beschreibung für Google stehen in `lib/seo.ts`, ebenso die
strukturierten Daten (Therapeutin, beide Standorte, Honorar). Das Vorschaubild
für geteilte Links ist `app/opengraph-image.png`. `sitemap.xml` und
`robots.txt` entstehen automatisch.

## Vor dem Livegang

- Datenschutzerklärung prüfen lassen (Abschnitte mit `GEÄNDERT` in `app/impressum/page.tsx`)
- Zuschussbeträge der Krankenkassen prüfen (Quelle laut alter Website: Stand 2020)
- Notfallnummern im Bereich „18 Gründe“ mit der Praxis abstimmen (neu ergänzt)
- SMTP-Zugang eintragen und beide Formulare einmal durchsenden
- Website in der Google Search Console anmelden und `sitemap.xml` einreichen
- Google-Unternehmensprofil für beide Standorte anlegen oder prüfen (gleiche Schreibweise von Name, Adresse, Telefon)
