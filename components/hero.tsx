"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

import { BreathingLines } from "@/components/breathing-lines";
import { SectionArt } from "@/components/section-art";
import { Button } from "@/components/ui/button";
import { locations, practice } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

export function Hero({
  video,
  poster,
  locationImages,
}: {
  video: string | null;
  poster: string | null;
  /** Fotos der beiden Standorte; ohne Foto steht eine Illustration. */
  locationImages: Record<string, string | null>;
}) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-kalk pb-12 pt-24 md:pb-20 md:pt-32 [@media(max-height:820px)]:lg:pb-10 [@media(max-height:820px)]:lg:pt-24">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {video ? (
          <>
            <video
              className="size-full object-cover"
              src={video}
              poster={poster ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--kalk)_8%,rgba(242,243,238,0.82)_42%,rgba(242,243,238,0.25)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-kalk to-transparent" />
          </>
        ) : poster ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt="" className="size-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--kalk)_8%,rgba(242,243,238,0.82)_42%,rgba(242,243,238,0.25)_100%)]" />
          </>
        ) : (
          <>
            <motion.svg
              viewBox="0 0 900 900"
              className="absolute -right-[22vw] -top-[26vw] w-[92vw] max-w-none text-sand-hell md:-right-[10vw] md:-top-[22vw] md:w-[68vw]"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                fill="currentColor"
                d="M455 62c118-14 246 34 318 132 74 100 92 238 52 356-38 112-132 206-246 250-110 42-240 34-340-28C142 712 74 606 62 492 50 372 96 244 188 162c74-66 172-90 267-100Z"
              />
            </motion.svg>
            <svg
              viewBox="0 0 600 600"
              className="absolute -bottom-[18vw] left-[38vw] w-[46vw] max-w-none text-salbei-hell/70 md:left-[46vw] md:w-[30vw]"
            >
              <path
                fill="currentColor"
                d="M312 44c84 6 168 52 208 126 42 78 38 178-6 254-42 72-122 122-206 128-88 6-180-34-232-106C26 376 14 280 46 200 78 120 150 62 232 46c26-4 54-4 80-2Z"
              />
            </svg>
            <BreathingLines className="absolute inset-0 size-full opacity-60 md:opacity-100 [mask-image:linear-gradient(90deg,transparent_18%,#000_78%)]" />
          </>
        )}
      </div>

      <motion.div
        className="wrap"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } } }}
      >
        <div className="grid items-end gap-x-14 gap-y-7 md:gap-y-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p variants={item} className="font-serif text-[1.25rem] italic text-moos md:text-[1.6rem]">
              Herzlich willkommen
            </motion.p>

            <motion.h1 variants={item} className="display mt-3 md:mt-4 text-anthrazit lg:text-[clamp(3.4rem,5.4vw,5rem)]">
              <span className="block text-[0.5em] font-normal leading-[1.3] tracking-normal text-stein">
                Mag. phil.
              </span>{" "}
              <span className="block max-w-[13ch]">Laudina Pongrácz</span>{" "}
              {/* Fachgebiet und Region gehören in die Hauptüberschrift, damit Suchmaschinen die Seite zuordnen. */}
              <span className="mt-4 block font-sans text-[clamp(1.05rem,1.5vw,1.25rem)] font-normal leading-snug tracking-normal text-stein md:mt-5">
                Psychotherapie &amp; Hypnose in Wien und Niederösterreich
              </span>
            </motion.h1>
          </div>

          <motion.div variants={item}>
            <h2 className="font-serif text-[1.2rem] font-normal tracking-normal text-anthrazit md:text-[1.4rem]">
              Praxis an zwei Standorten
            </h2>
            <ul className="mt-3 grid grid-cols-2 items-start gap-3.5 md:mt-4 md:max-w-xl md:gap-5 lg:max-w-none">
              {locations.map((location, index) => (
                <li key={location.id} className={index === 1 ? "lg:mt-12 [@media(max-height:820px)]:lg:mt-6" : undefined}>
                  <Link href="/#kontakt" className="group block rounded-xl">
                    <div
                      className={cn(
                        "relative overflow-hidden bg-sand-hell shadow-[0_30px_70px_-40px_rgba(47,61,53,0.7)] transition-transform duration-700 ease-out group-hover:scale-[1.02] aspect-[5/4] sm:aspect-[4/5] [@media(max-height:820px)]:lg:aspect-square",
                        index === 0
                          ? "rounded-[3.5rem_1rem_1rem_1rem] md:rounded-[7rem_1.5rem_1.5rem_1.5rem]"
                          : "rounded-[1rem_3.5rem_1rem_1rem] md:rounded-[1.5rem_7rem_1.5rem_1.5rem]",
                      )}
                    >
                      {locationImages[location.id] ? (
                        <Image
                          src={locationImages[location.id] as string}
                          alt={`${location.title}: ${location.short}`}
                          fill
                          priority
                          sizes="(min-width: 1024px) 20vw, 50vw"
                          className="object-cover"
                        />
                      ) : (
                        <SectionArt variant={location.art} />
                      )}
                    </div>
                    <p className="mt-2.5 flex items-center gap-1.5 font-serif text-[1.2rem] leading-tight text-anthrazit md:mt-3 md:text-[1.45rem]">
                      <MapPin className="size-[0.8em] shrink-0 text-moos" aria-hidden="true" />
                      {location.place}
                    </p>
                    <p className="mt-1 text-[0.875rem] leading-snug text-stein md:text-[0.9375rem]">{location.short}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.ul
          variants={item}
          className="mt-6 flex flex-col gap-1 text-[0.9375rem] text-anthrazit sm:text-[1.0625rem] md:mt-9 md:gap-2 lg:flex-row lg:gap-0 lg:whitespace-nowrap lg:text-[1.125rem] [@media(max-height:820px)]:lg:mt-6"
        >
          {practice.methods.map((method, index) => (
            <li key={method} className={index === 0 ? "lg:pr-6" : "lg:border-l lg:border-moos/30 lg:px-6"}>
              {method}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 md:mt-10 md:gap-y-4 [@media(max-height:820px)]:lg:mt-7">
          <Button asChild size="lg">
            <Link href="/#kontakt">Erstgespräch vereinbaren</Link>
          </Button>
          <a
            href={practice.phoneHref}
            className="inline-flex items-center gap-2.5 py-2 text-[1.0625rem] text-moos-tief underline decoration-salbei decoration-1 underline-offset-[0.3em] transition-colors hover:decoration-moos"
          >
            <Phone className="size-[1.05em]" aria-hidden="true" />
            {practice.phone}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
