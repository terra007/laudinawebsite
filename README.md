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
| `lib/site.ts` | Alle Texte und Daten: Kontakt, Standorte, Schwerpunkte, Spezialisierungen, Ausbildung, Honorar, Kostenzuschuss |
| `app/page.tsx` | Startseite, setzt die Bereiche zusammen |
| `app/stammdatenblatt` | Stammdatenblatt als Formular |
| `app/impressum` | Verschwiegenheit, Datenschutz, Impressum |
| `app/api` | Versand von Kontaktformular und Stammdatenblatt |
| `components` | `navbar`, `hero`, `psychotherapy`, `hypnosis`, `services-grid`, `about`, `pricing-cards`, `contact`, `contact-form`, `stammdaten-form`, `signature-pad`, `mobile-contact`, `footer` |
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

## Hosting

Die Seite läuft auf Vercel (`vercel.json` legt Next.js als Framework fest). Die
Domain pongracz-psychotherapie.com liegt bei IONOS; dort zeigen die A-Einträge für
`@` und `www` auf Vercel, die E-Mail-Einträge bleiben bei IONOS. Die SMTP-Daten
stehen in Vercel unter Environment Variables.

`public/runtime-service-worker.js` löst den Service Worker der alten
IONOS-Website ab und kann entfernt werden, wenn die alte Seite lange genug
offline ist (einige Monate).

## Offene Punkte

- Impressum und Datenschutz von einer Fachstelle bestätigen lassen (`app/impressum/page.tsx`)
- Zuschussbetrag der KFA prüfen (Quelle laut alter Website: Stand 2020)
- Beide Formulare nach dem Eintragen der SMTP-Daten einmal durchsenden
- Website in der Google Search Console anmelden und `sitemap.xml` einreichen
- Google-Unternehmensprofil für beide Standorte anlegen oder prüfen (gleiche Schreibweise von Name, Adresse, Telefon)
