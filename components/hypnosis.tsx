import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionArt } from "@/components/section-art";
import { hypnosis } from "@/lib/site";

export function Hypnosis({ image }: { image: string | null }) {
  return (
    <section id="hypnose" className="bg-moos-tief py-24 text-kalk md:py-36">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[5rem_1.5rem_1.5rem_1.5rem] sm:aspect-[4/5] sm:rounded-[9rem_2rem_2rem_2rem]">
            {image ? (
              <Image src={image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            ) : (
              <SectionArt variant="hypnose" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="h-section text-papier">Hypnose</h2>
          <p className="lead prose-text mt-7 text-kalk">{hypnosis.lead}</p>
          <ul className="mt-9 grid max-w-2xl gap-x-8 border-t border-kalk/20 sm:grid-cols-3">
            {hypnosis.effects.map((effect) => (
              <li key={effect} className="border-b border-kalk/20 py-4 font-serif text-[1.2rem] leading-snug sm:border-b-0">
                {effect}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
