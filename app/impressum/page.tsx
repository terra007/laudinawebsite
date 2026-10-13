import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { about, practice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum, Datenschutz, Verschwiegenheit",
  description:
    "Verschwiegenheitspflicht, Datenschutzerklärung und Impressum der psychotherapeutischen Praxis Mag. phil. Laudina Pongrácz in Wien.",
  alternates: { canonical: "/impressum" },
};

/*
 * Überarbeitet im Oktober 2026 auf Grundlage des Psychotherapiegesetzes 2024
 * und der DSGVO. Keine Rechtsberatung: vor dem Livegang von einer Fachstelle
 * (z. B. Rechtsberatung des ÖBVP) bestätigen lassen.
 */

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-linie py-12 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-[clamp(1.7rem,2.8vw,2.3rem)] leading-tight">{title}</h2>
      <div className="mt-5 space-y-4 text-anthrazit [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-[1.3rem]">{children}</div>
    </section>
  );
}

const mail = (
  <a href={`mailto:${practice.email}`} className="text-link break-all">
    {practice.email}
  </a>
);

export default function ImpressumPage() {
  return (
    <>
      <Navbar solid />
      <main id="inhalt" className="bg-kalk pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="wrap">
          <h1 className="max-w-[18ch] font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-light leading-[1.05] tracking-[-0.02em]">
            Verschwiegenheit, Datenschutz, Impressum
          </h1>

          <div className="mt-14 max-w-[68ch]">
            <Block id="verschwiegenheit" title="Verschwiegenheit">
              <p>
                Als Psychotherapeutin bin ich gesetzlich zur Verschwiegenheit über alles verpflichtet, was mir in
                Ausübung meines Berufes anvertraut oder bekannt wird (§ 45 Psychotherapiegesetz 2024). Das gilt
                gegenüber allen Personen und Einrichtungen, also auch gegenüber Angehörigen, Behörden oder
                Versicherungen. Die psychotherapeutische Verschwiegenheit ist damit strenger gefasst als etwa die
                ärztliche.
              </p>
              <p>
                Möchten Sie, dass ich Informationen weitergebe, zum Beispiel an eine Versicherung, brauche ich dafür
                Ihre ausdrückliche Entbindung von der Verschwiegenheitspflicht.
              </p>
            </Block>

            <Block id="datenschutz" title="Datenschutzerklärung">
              <p>
                Der Schutz Ihrer persönlichen Daten ist mir ein besonderes Anliegen. Ich verarbeite Ihre Daten
                ausschließlich auf Grundlage der Datenschutz-Grundverordnung (DSGVO) und des österreichischen
                Datenschutzgesetzes.
              </p>

              <h3>Verantwortliche</h3>
              <p>
                {practice.name}, Heinrichsgasse 3/18b, 1010 Wien, {mail}
              </p>

              <h3>Kontakt mit mir</h3>
              <p>
                Wenn Sie mir über das Formular, per E-Mail, telefonisch, per SMS oder über Signal schreiben, verarbeite ich
                Ihre Angaben, um Ihre Anfrage zu beantworten und einen Termin zu vereinbaren (Art. 6 Abs. 1 lit. b
                DSGVO). Angaben zu Ihrer Gesundheit verarbeite ich nur, soweit Sie sie mir mitteilen und sie für die
                Behandlung nötig sind (Art. 9 Abs. 2 lit. h DSGVO). Für Signal gelten zusätzlich die
                Datenschutzbestimmungen von Signal; SMS werden unverschlüsselt übertragen, vertrauliche Inhalte
                besprechen Sie daher bitte telefonisch oder in der Praxis.
              </p>

              <h3>Stammdatenblatt online</h3>
              <p>
                Wenn Sie das Stammdatenblatt auf dieser Website ausfüllen, wird aus Ihren Angaben und Ihrer
                Unterschrift in Ihrem Browser ein PDF erstellt. Beim Senden wird dieses PDF per E-Mail an die Praxis
                übermittelt. Auf dem Webserver wird es nicht gespeichert.
              </p>

              <h3>Datenspeicherung</h3>
              <p>
                Für Behandlung und Abrechnung speichere ich Vor- und Zuname, Adresse, Geburtsdatum, Telefonnummer,
                E-Mail-Adresse und gegebenenfalls Ihre Sozialversicherungsdaten. Ich bewahre sie so lange auf, wie es
                die gesetzlichen Dokumentations- und Aufbewahrungspflichten verlangen. Eine Weitergabe an Dritte
                erfolgt nur mit Ihrer Zustimmung oder wenn ein Gesetz sie vorschreibt.
              </p>

              <h3>Hosting und Server-Protokolle</h3>
              <p>
                Diese Website wird bei Vercel Inc. (USA) betrieben. Beim Aufruf der Seiten verarbeitet der Server
                technisch notwendige Daten wie IP-Adresse, Zeitpunkt und aufgerufene Seite, um die Website sicher
                auszuliefern (Art. 6 Abs. 1 lit. f DSGVO). Vercel ist nach dem EU-US Data Privacy Framework
                zertifiziert.
              </p>

              <h3>Cookies und Analyse</h3>
              <p>
                Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Schriften und
                Skripte werden vom eigenen Server geladen. Google Maps und Signal öffnen sich erst, wenn Sie den
                jeweiligen Link anklicken.
              </p>

              <h3>Ihre Rechte</h3>
              <p>
                Ihnen stehen die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit und Widerspruch zu. Eine Einwilligung können Sie jederzeit widerrufen. Wenn Sie
                meinen, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei
                der{" "}
                <a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer" className="text-link">
                  Österreichischen Datenschutzbehörde
                </a>{" "}
                beschweren.
              </p>
            </Block>

            <Block id="impressum" title="Impressum">
              <p>Angaben gemäß § 5 E-Commerce-Gesetz und Offenlegung gemäß § 25 Mediengesetz</p>
              <address className="not-italic">
                {practice.name}
                <br />
                Heinrichsgasse 3/18b, 1010 Wien
                <br />
                Außer Ort 70, 2031 Eggendorf im Thale
                <br />
                T:{" "}
                <a href={practice.phoneHref} className="text-link">
                  {practice.phone}
                </a>
                <br />
                M: {mail}
              </address>

              <p>
                Berufsbezeichnung: Psychotherapeutin (Hypnosepsychotherapie), verliehen in Österreich.{" "}
                {practice.registration}.
              </p>
              <p>
                Aufsichtsbehörde: Bundesministerium für Arbeit, Soziales, Gesundheit, Pflege und Konsumentenschutz.
              </p>
              <p>
                Berufsrechtliche Vorschriften: Psychotherapiegesetz 2024, abrufbar im{" "}
                <a href="https://www.ris.bka.gv.at" target="_blank" rel="noreferrer" className="text-link">
                  Rechtsinformationssystem des Bundes
                </a>
                .
              </p>
              <p>Mitgliedschaften: {about.memberships.join(", ")}.</p>
              <p>Grundlegende Richtung: Information über die psychotherapeutische Praxis und ihr Angebot.</p>

              <h3>Haftungsausschluss</h3>
              <p>
                Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und
                Aktualität wird keine Gewähr übernommen. Für die Inhalte verlinkter fremder Seiten ist stets der
                jeweilige Anbieter verantwortlich.
              </p>

              <h3>Urheberrecht</h3>
              <p>
                Die Inhalte dieser Website unterliegen dem österreichischen Urheberrecht. Vervielfältigung,
                Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
                Zustimmung. Stimmungsbilder: Artem Beliaikin und Daniel Sessler auf Unsplash.
              </p>
            </Block>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
