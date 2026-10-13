"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

import { SectionArt } from "@/components/section-art";
import { practice } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/** Ruhiger Einstieg: Porträt, Name, Methoden und der Weg zum Erstgespräch. */
export function Hero({ portrait }: { portrait: string | null }) {
  return (
    <section className="relative isolate overflow-hidden bg-kalk pb-14 pt-24 md:pb-20 md:pt-32 lg:flex lg:min-h-[100svh] lg:items-center">
      <svg
        viewBox="0 0 900 900"
        aria-hidden="true"
        className="absolute -right-[30vw] -top-[30vw] -z-10 w-[95vw] max-w-none text-sand-hell md:-right-[12vw] md:-top-[20vw] md:w-[62vw]"
      >
        <path
          fill="currentColor"
          d="M455 62c118-14 246 34 318 132 74 100 92 238 52 356-38 112-132 206-246 250-110 42-240 34-340-28C142 712 74 606 62 492 50 372 96 244 188 162c74-66 172-90 267-100Z"
        />
      </svg>

      <motion.div
        className="wrap grid w-full items-center gap-x-16 gap-y-8 lg:grid-cols-[1.1fr_0.9fr]"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      >
        <motion.div variants={item} className="lg:order-2">
          <div className="relative aspect-[4/5] w-[min(16rem,62vw)] overflow-hidden rounded-[1.5rem_6rem_1.5rem_1.5rem] bg-sand-hell shadow-[0_40px_80px_-50px_rgba(43,70,73,0.6)] md:w-[20rem] lg:ml-auto lg:w-full lg:max-w-[28rem] lg:rounded-[2rem_10rem_2rem_2rem]">
            {portrait ? (
              <Image
                src={portrait}
                alt={`${practice.name}, ${practice.role}`}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, (min-width: 768px) 20rem, 62vw"
                className="object-cover object-[50%_18%]"
              />
            ) : (
              <SectionArt variant="portrait" />
            )}
          </div>
        </motion.div>

        <div className="lg:order-1">
          {/* Der Name steht als Home-Button in der Navigation; für Suchmaschinen bleibt er Teil der Überschrift. */}
          <motion.h1 variants={item} className="display text-anthrazit lg:text-[clamp(3.4rem,5.2vw,4.8rem)]">
            Herzlich willkommen<span className="sr-only"> bei {practice.name}, Psychotherapie in Wien</span>
          </motion.h1>

          <motion.ul variants={item} className="mt-6 space-y-1.5 text-[1rem] text-anthrazit md:mt-8 md:text-[1.125rem]">
            {practice.methods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </motion.ul>

          <motion.p variants={item} className="mt-5 flex items-start gap-2 text-[0.9375rem] text-stein md:text-[1rem]">
            <MapPin className="mt-[0.2em] size-[1em] shrink-0 text-moos" aria-hidden="true" />
            <Link href="/#kontakt" className="hover:text-moos-tief">
              Praxen in Wien 1010 und Eggendorf im Thale
            </Link>
          </motion.p>

          <motion.a
            variants={item}
            href={practice.phoneHref}
            className="mt-6 inline-flex items-center gap-2.5 py-2 text-[1.0625rem] text-moos-tief underline decoration-salbei decoration-1 underline-offset-[0.3em] transition-colors hover:decoration-moos md:mt-8"
          >
            <Phone className="size-[1.05em]" aria-hidden="true" />
            {practice.phone}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
