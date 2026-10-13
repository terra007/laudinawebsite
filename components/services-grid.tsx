import {
  Activity,
  Baby,
  BatteryLow,
  CigaretteOff,
  CloudSun,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  Layers,
  Medal,
  MessagesSquare,
  Orbit,
  Ribbon,
  Sprout,
  type LucideIcon,
} from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { about, focusAreas, type Focus } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Activity,
  Baby,
  BatteryLow,
  CigaretteOff,
  CloudSun,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  Layers,
  Medal,
  MessagesSquare,
  Orbit,
  Ribbon,
  Sprout,
};

/** Ein Schwerpunkt mit kurzem, immer sichtbarem Text. `wide` belegt die ganze Zeile. */
function FocusCard({ area, wide, children }: { area: Focus; wide?: boolean; children?: React.ReactNode }) {
  const Icon = icons[area.icon];

  return (
    <article
      id={`schwerpunkt-${area.id}`}
      className={cn(
        "group flex h-full flex-col rounded-xl bg-papier p-7 transition-shadow duration-500 hover:shadow-[0_0_0_1px_var(--salbei),0_26px_60px_-24px_rgba(61,98,102,0.45)] md:p-8",
        wide && "lg:flex-row lg:items-start lg:gap-8",
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-salbei-hell text-moos transition-colors duration-500 group-hover:bg-moos group-hover:text-papier">
        <Icon className="size-[1.35rem]" strokeWidth={1.6} aria-hidden="true" />
      </span>

      <div className={cn("min-w-0 flex-1", wide ? "mt-6 lg:mt-0" : "mt-6")}>
        <h3 className="h-card hyphens-auto text-anthrazit">{area.title}</h3>
        {area.subtitle ? <p className="mt-1 text-[0.9375rem] text-stein">{area.subtitle}</p> : null}
        <p className="mt-3 max-w-[70ch] hyphens-auto text-[0.9875rem] leading-relaxed text-anthrazit/85">{area.text}</p>
        {area.extra ? (
          <p className="mt-3 max-w-[70ch] hyphens-auto text-[0.9875rem] leading-relaxed text-anthrazit/85">{area.extra}</p>
        ) : null}
        {children}
      </div>
    </article>
  );
}

export function ServicesGrid({ orfVideo, orfPoster }: { orfVideo: string | null; orfPoster: string | null }) {
  const [first, ...rest] = focusAreas;
  const nikotin = rest.find((area) => area.id === "nikotin");
  const others = rest.filter((area) => area.id !== "nikotin");

  return (
    <section id="schwerpunkte" className="bg-sand-hell py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <h2 className="h-section">Schwerpunkte meiner Arbeit</h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          <RevealItem className="sm:col-span-2 lg:col-span-3">
            <FocusCard area={first} wide />
          </RevealItem>
          {others.map((area) => (
            <RevealItem key={area.id}>
              <FocusCard area={area} />
            </RevealItem>
          ))}
          {nikotin ? (
            <RevealItem className="sm:col-span-2">
              <FocusCard area={nikotin}>
                {orfVideo ? (
                  <figure id="medien" className="mt-6">
                    <video
                      className="aspect-video w-full max-w-3xl rounded-xl bg-moos-tief"
                      src={orfVideo}
                      poster={orfPoster ?? undefined}
                      controls
                      playsInline
                      preload="none"
                    />
                    <figcaption className="mt-2 text-[0.875rem] text-stein">{about.mediaTitle}</figcaption>
                  </figure>
                ) : null}
              </FocusCard>
            </RevealItem>
          ) : null}
        </RevealGroup>
      </div>
    </section>
  );
}
