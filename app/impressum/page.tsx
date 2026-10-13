import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { practice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum, Datenschutz, Verschwiegenheit",
  description:
    "Verschwiegenheitspflicht, Datenschutzerklärung und Impressum der psychotherapeutischen Praxis Mag. phil. Laudina Pongrácz in Wien.",
  alternates: { canonical: "/impressum" },
};

/*
 * Texte von der bisherigen Website übernommen. Abweichungen gegenüber dem
 * alten Stand sind mit GEÄNDERT markiert und sollten vor dem Livegang
 * rechtlich geprüft werden.
 */

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-linie py-12 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-[clamp(1.7rem,2.8vw,2.3rem)] leading-tight">{title}</h2>
      <div className="mt-5 space-y-4 text-anthrazit [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-[1.3rem]">{children}</div>
    </section>
  );
}

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
                Die Verschwiegenheitspflicht ist ein zentrales Element der Psychotherapie. § 15 des
                Psychotherapiegesetzes verpflichtet PsychotherapeutInnen sowie deren Hilfspersonen zur
                Verschwiegenheit über alle ihnen in Ausübung ihres Berufes anvertrauten oder bekannt gewordenen
                Geheimnisse. Die Verschwiegenheitspflicht besteht allgemein, somit grundsätzlich uneingeschränkt
                gegenüber jedweder Person oder Einrichtung außerhalb der KlientInnen/PatientInnen, also z. B.
                gegenüber Ehepartnern, sonstigen Familienangehörigen, staatlichen Dienststellen oder anderen
                Sozialeinrichtungen.
              </p>
              <p>
                Die Verschwiegenheitspflicht der PsychotherapeutInnen ist somit wesentlich strenger gefasst als
                beispielsweise jene der ÄrztInnen.
              </p>
              <p>
                Wünschen KlientInnen/PatientInnen ausdrücklich eine Datenweitergabe an z. B. Versicherungen, ist
                eine wirksame Entbindung von der Verschwiegenheitspflicht unerlässlich.
              </p>
              <p>
                Über die konkrete Handhabung im Anlassfall informieren wir Sie gerne im ÖBVP-Büro. Beschlossenes
                Gewaltschutzpaket bringt auch Änderung bei der psychotherapeutischen Verschwiegenheit. Nach einem
                eingebrachten Abänderungsantrag wurde das Gewaltschutzpaket am 25.09.2019 im Parlament beschlossen.
                Das Psychotherapiegesetz ist davon im § 15 zur Verschwiegenheit betroffen.
              </p>
              <p>
                Lesen Sie dazu den ÖBVP-Newsflash. Das Gesundheitsministerium hat dazu eine ausführliche
                Information für PsychotherapeutInnen publiziert.
              </p>
              <p className="text-[0.9375rem] text-stein">
                Quelle: 19.9.2020,{" "}
                <a
                  href="https://www.psychotherapie.at/psychotherapeutinnen/rechtsinformationen"
                  target="_blank"
                  rel="noreferrer"
                  className="text-link break-all"
                >
                  psychotherapie.at/psychotherapeutinnen/rechtsinformationen
                </a>
              </p>
            </Block>

            <Block id="datenschutz" title="Datenschutzerklärung">
              <p>
                Der Schutz Ihrer persönlichen Daten ist mir ein besonderes Anliegen. Ich verarbeite Ihre Daten
                daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO). Nachfolgend informiere
                ich Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen meiner Website.
              </p>

              <h3>Kontakt mit mir</h3>
              <p>
                Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit mir aufnehmen, werden Ihre
                angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei mir
                gespeichert. Diese Daten gebe ich nicht aus der Hand.
              </p>

              {/* GEÄNDERT: neuer Abschnitt, beschreibt das Online-Stammdatenblatt dieser Website. */}
              <h3>Stammdatenblatt online</h3>
              <p>
                Wenn Sie das Stammdatenblatt auf dieser Website ausfüllen, wird aus Ihren Angaben und Ihrer
                Unterschrift in Ihrem Browser ein PDF erstellt. Beim Senden wird dieses PDF per E-Mail an die
                Praxis übermittelt. Auf dem Webserver wird es nicht gespeichert.
              </p>

              <h3>Datenspeicherung</h3>
              <p>
                Zum Zweck der Vertragsabwicklung werden folgende Daten bei mir gespeichert: Vor- und Zuname,
                Wohnadresse, Telefonnummer, E-Mail-Adresse. Die von Ihnen bereitgestellten Daten sind zur
                Vertragserfüllung bzw. zur Durchführung vorvertraglicher Maßnahmen erforderlich. Eine
                Datenübermittlung an Dritte erfolgt nicht.
              </p>

              {/* GEÄNDERT: Die alte Website nannte Cookies und Google Analytics. Diese Website setzt beides nicht ein. */}
              <h3>Cookies</h3>
              <p>
                Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Schriften
                und Skripte werden vom eigenen Server geladen.
              </p>

              <h3>Ihre Rechte</h3>
              <p>
                Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung,
                Datenübertragbarkeit, Widerruf und Widerspruch zu.
              </p>

              <h3>Datenschutz</h3>
              <p>
                Die Nutzung meiner Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf
                meinen Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben
                werden, erfolgt dies stets auf freiwilliger Basis. Diese Daten werden ohne ausdrückliche Zustimmung
                nicht an Dritte weitergegeben.
              </p>
              <p>
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
                Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit
                ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte
                im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
              </p>
            </Block>

            <Block id="impressum" title="Impressum">
              <p>Für den Inhalt verantwortlich:</p>
              <address className="not-italic">
                {practice.name}
                <br />
                Heinrichsgasse 3/18b
                <br />
                1010 Wien
                <br />
                T:{" "}
                <a href={practice.phoneHref} className="text-link">
                  {practice.phone}
                </a>
                <br />
                {/* GEÄNDERT: Die alte Seite nannte praxis@psychotherapie.com, vermutlich ein Tippfehler. */}
                M:{" "}
                <a href={`mailto:${practice.email}`} className="text-link break-all">
                  {practice.email}
                </a>
              </address>

              <h3>AGB</h3>
              <p>Es gelten die AGB der österreichischen Psychotherapeuten.</p>

              <h3>Haftungsausschluss</h3>
              <p>
                <strong className="font-medium">Texte und Haftung für Inhalte.</strong> Die Inhalte dieser Seiten
                wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
                Inhalte wird keine Gewähr übernommen.
              </p>
              <p>
                <strong className="font-medium">Haftung für Links.</strong> Bitte um Kenntnisnahme, dass ich keinen
                Einfluss auf die Inhalte fremder Webseiten habe. Für die Inhalte der verlinkten Seiten ist stets
                der jeweilige Anbieter oder Betreiber selbst verantwortlich.
              </p>

              <h3>Urheberrecht</h3>
              <p>
                Die Inhalte und Werke dieser Seiten unterliegen dem österreichischen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
                Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet
                – außer mit ausdrücklicher und schriftlicher Zustimmung.
              </p>
              <p>
                Der Inhalt dieser Website ist urheberrechtlich geschützt. Jede Bearbeitung, Vervielfältigung,
                Verbreitung und/oder öffentliche Wiedergabe unabhängig vom verwendeten Medium stellt einen
                Urheberrechtsverstoß dar.
              </p>
            </Block>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
