import Image from "next/image";

import { More } from "@/components/more";
import { Reveal } from "@/components/reveal";
import { SectionArt } from "@/components/section-art";
import { about, practice } from "@/lib/site";

function Listing({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-10">
      <h3 className="font-serif text-[1.45rem]">{title}</h3>
      <ul className="mt-3 border-t border-linie">
        {items.map((entry) => (
          <li key={entry} className="border-b border-linie py-3 leading-snug text-anthrazit">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Bild neben „Über mich“: das Praxisfoto aus Wien, sonst das Porträt (das schon im Einstieg steht). */
export function About({ practicePhoto, portrait }: { practicePhoto: string | null; portrait: string | null }) {
  const photo = practicePhoto ?? portrait;
  return (
    <section id="ueber-mich" className="bg-kalk py-24 md:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem_9rem_2rem_2rem] bg-sand-hell lg:max-w-none">
            {photo ? (
              <Image
                src={photo}
                alt={practicePhoto ? "Praxisraum in Wien, Heinrichsgasse 3" : `${practice.name}, ${practice.role} in Wien`}
                fill
                sizes="(min-width: 1024px) 36vw, (min-width: 640px) 448px, 100vw"
                className={practicePhoto ? "object-cover" : "object-cover object-[50%_18%]"}
              />
            ) : (
              <SectionArt variant="portrait" />
            )}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="h-section">Über mich</h2>
            <p className="mt-7 font-serif text-[1.7rem] leading-tight">{practice.name}</p>
            <p className="mt-1.5 text-[1.125rem] text-anthrazit">{practice.role}</p>
            <p className="mt-3 text-stein">{practice.registration}</p>
          </Reveal>

          <Reveal>
            <p className="prose-text mt-8 text-anthrazit">{about.intro}</p>

            <h3 className="mt-10 font-serif text-[1.45rem]">Meine Spezialisierungen</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {about.specializations.map((entry) => (
                <li key={entry.title} className="rounded-xl bg-papier p-5">
                  <p className="font-serif text-[1.2rem] leading-snug text-anthrazit">{entry.title}</p>
                  <p className="mt-1 text-[0.875rem] leading-snug text-stein">{entry.detail}</p>
                </li>
              ))}
            </ul>
            <More label="Ausbildung und Werdegang anzeigen" className="mt-4">
              <Listing title="Ausbildung und laufende Fortbildungen" items={about.education} />
              <Listing title="Berufserfahrung" items={about.experience} />
              <Listing title="Praktika" items={about.internships} />
              <Listing title="Mitgliedschaften" items={about.memberships} />
            </More>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
