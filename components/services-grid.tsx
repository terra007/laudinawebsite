"use client";

import * as React from "react";
import Link from "next/link";
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
  Minus,
  Orbit,
  Plus,
  Ribbon,
  Sprout,
  type LucideIcon,
} from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { focusAreas, type Focus } from "@/lib/site";
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

/**
 * Schwerpunkt mit ausführlichem Text. Der ganze Text steht im HTML der Seite
 * (wichtig für Suchmaschinen) und wird erst auf Wunsch aufgeklappt.
 */
function FocusCard({ area, featured }: { area: Focus; featured: boolean }) {
  const [open, setOpen] = React.useState(false);
  const Icon = icons[area.icon];
  const textId = `schwerpunkt-${area.id}-text`;

  return (
    <article
      id={`schwerpunkt-${area.id}`}
      className={cn(
        "group flex h-full flex-col rounded-xl bg-papier p-7 transition-[transform,box-shadow] duration-500 ease-out hover:scale-[1.012] hover:shadow-[0_0_0_1px_var(--salbei),0_26px_60px_-24px_rgba(110,39,39,0.55)] md:p-8",
        featured ? "lg:flex-row lg:items-start lg:gap-8" : "sm:min-h-[17rem]",
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-salbei-hell text-moos transition-colors duration-500 group-hover:bg-moos group-hover:text-papier">
        <Icon className="size-[1.35rem]" strokeWidth={1.6} aria-hidden="true" />
      </span>

      <div className={cn("flex min-w-0 flex-1 flex-col", featured ? "mt-6 lg:mt-0" : "mt-6")}>
        <h3 className="h-card max-w-[30ch] text-anthrazit">{area.title}</h3>

        <div
          id={textId}
          className={cn(
            "mt-3 max-w-[70ch] space-y-3 hyphens-auto text-[0.9875rem] leading-relaxed",
            open ? "text-anthrazit" : "line-clamp-2 text-stein",
          )}
        >
          {area.body?.map((block) => (
            <React.Fragment key={block.text}>
              {block.heading ? <h4 className="pt-2 font-serif text-[1.2rem] text-anthrazit">{block.heading}</h4> : null}
              <p>{block.text}</p>
            </React.Fragment>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-5">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={textId}
            onClick={() => setOpen((current) => !current)}
            className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-[0.9375rem] font-medium text-moos transition-colors hover:text-moos-tief"
          >
            {open ? <Minus className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
            {open ? "Weniger anzeigen" : "Mehr lesen"}
            <span className="sr-only">: {area.title}</span>
          </button>
          {open ? (
            <Link href="/#kontakt" className="text-link text-[0.9375rem]">
              Erstgespräch vereinbaren
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ServicesGrid({ hasOrfVideo }: { hasOrfVideo: boolean }) {
  const detailed = focusAreas.filter((area) => area.body);
  const compact = focusAreas.filter((area) => !area.body);

  return (
    <section id="schwerpunkte" className="bg-sand-hell py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <h2 className="h-section">Schwerpunkte meiner Arbeit</h2>
        </Reveal>

        <RevealGroup className="mt-12 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {detailed.map((area, index) => (
            <RevealItem key={area.id} className={cn(index === 0 && "sm:col-span-2 lg:col-span-3")}>
              <FocusCard area={area} featured={index === 0} />
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {compact.map((area) => {
            const Icon = icons[area.icon];
            return (
              <RevealItem key={area.id}>
                <div className="flex h-full items-start gap-4 rounded-xl border border-sand bg-kalk/60 p-5 transition-[transform,box-shadow,background-color] duration-500 ease-out hover:scale-[1.015] hover:bg-papier hover:shadow-[0_0_0_1px_var(--salbei),0_20px_44px_-24px_rgba(110,39,39,0.5)]">
                  <Icon className="mt-0.5 size-[1.35rem] shrink-0 text-moos" strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <h3 className="hyphens-auto font-serif text-[1.2rem] leading-snug text-anthrazit">{area.title}</h3>
                    {area.id === "nikotin" && hasOrfVideo ? (
                      <Link href="/#medien" className="text-link mt-1.5 inline-block text-[0.9375rem]">
                        ORF-Beitrag aus meiner Praxis ansehen
                      </Link>
                    ) : area.note ? (
                      <p className="mt-1.5 text-[0.9375rem] leading-snug text-stein">{area.note}</p>
                    ) : null}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
