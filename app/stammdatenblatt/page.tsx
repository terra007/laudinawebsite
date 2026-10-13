import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, LockKeyhole } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StammdatenForm } from "@/components/stammdaten-form";
import { practice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stammdatenblatt",
  description:
    "Stammdatenblatt der psychotherapeutischen Praxis online ausfüllen, unterschreiben und an die Praxis senden.",
  alternates: { canonical: "/stammdatenblatt" },
  robots: { index: false, follow: true },
};

export default function StammdatenblattPage() {
  return (
    <>
      <Navbar solid />
      <main id="inhalt" className="relative overflow-hidden bg-sand-hell pb-24 pt-32 md:pb-32 md:pt-40">
        <svg
          viewBox="0 0 900 900"
          aria-hidden="true"
          className="pointer-events-none absolute -right-[30vw] -top-[20vw] w-[80vw] max-w-none text-sand/70 md:-right-[14vw] md:-top-[16vw] md:w-[52vw]"
        >
          <path
            fill="currentColor"
            d="M455 62c118-14 246 34 318 132 74 100 92 238 52 356-38 112-132 206-246 250-110 42-240 34-340-28C142 712 74 606 62 492 50 372 96 244 188 162c74-66 172-90 267-100Z"
          />
        </svg>

        <div className="wrap relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Link href="/#setting" className="text-link inline-flex items-center gap-2 text-[0.9375rem]">
              <ArrowLeft className="size-4" aria-hidden="true" /> Zurück zu Setting und Kosten
            </Link>
            <h1 className="mt-8 font-serif text-[clamp(2.6rem,5vw,4rem)] font-light leading-[1.04] tracking-[-0.02em]">
              Stammdatenblatt
            </h1>
            <p className="mt-2 font-serif text-[1.45rem] text-moos">Psychotherapeutische Praxis</p>
            <p className="mt-7 max-w-[44ch] text-anthrazit">
              Bitte füllen Sie das Stammdatenblatt vor Ihrem ersten Besuch aus. Sie brauchen dafür etwa drei
              Minuten.
            </p>

            <p className="mt-7 flex max-w-[44ch] gap-3 text-[0.9375rem] leading-snug text-stein">
              <LockKeyhole className="mt-0.5 size-[1.1rem] shrink-0 text-moos" aria-hidden="true" />
              Aus Ihren Angaben entsteht in Ihrem Browser ein PDF. Beim Senden geht es per E-Mail an die Praxis,
              auf dem Webserver wird nichts gespeichert.
            </p>

            <p className="mt-7 text-[0.9375rem] text-stein">
              Lieber auf Papier?{" "}
              <a href="/stammdatenblatt.pdf" download className="text-link inline-flex items-center gap-1.5">
                <Download className="size-4" aria-hidden="true" /> Leeres Formular als PDF
              </a>
            </p>
            <p className="mt-2 text-[0.9375rem] text-stein">
              Fragen dazu?{" "}
              <a href={practice.phoneHref} className="text-link">
                {practice.phone}
              </a>
            </p>
          </div>

          <div className="rounded-xl bg-papier p-6 shadow-[0_30px_80px_-50px_rgba(43,70,73,0.55)] sm:p-9 md:p-12">
            <StammdatenForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
