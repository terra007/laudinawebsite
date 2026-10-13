import Image from "next/image";

import { ReasonsCheck } from "@/components/reasons-check";
import { Reveal } from "@/components/reveal";
import { SectionArt } from "@/components/section-art";
import { psychotherapy, reasons } from "@/lib/site";

export function Psychotherapy({ image }: { image: string | null }) {
  return (
    <section id="psychotherapie" className="bg-kalk py-24 md:py-36">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <h2 className="h-section">Psychotherapie</h2>
            <p className="lead prose-text mt-7 text-anthrazit">{psychotherapy.paragraphs[0]}</p>
            <p className="prose-text mt-5 text-stein">{psychotherapy.paragraphs[1]}</p>
          </Reveal>
          <Reveal delay={0.12} className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem_1.5rem_1.5rem_5rem] sm:aspect-[4/5] sm:rounded-[2rem_2rem_2rem_9rem]">
              {image ? (
                <Image src={image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              ) : (
                <SectionArt variant="therapie" />
              )}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <h3 className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight">{reasons.title}</h3>
              <p className="mt-3 max-w-[52ch] text-stein">{reasons.intro}</p>
            </div>
            <p className="text-[0.875rem] text-stein">{reasons.source}</p>
          </div>
          <div className="mt-8 border-t border-linie">
            <ReasonsCheck />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
