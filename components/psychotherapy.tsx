import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionArt } from "@/components/section-art";
import { psychotherapy } from "@/lib/site";

export function Psychotherapy({ image }: { image: string | null }) {
  return (
    <section id="psychotherapie" className="bg-kalk py-24 md:py-36">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <h2 className="h-section">Psychotherapie</h2>
            <p className="lead prose-text mt-7 text-anthrazit">{psychotherapy.lead}</p>
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
      </div>
    </section>
  );
}
