import Link from "next/link";
import { Clock, FileText } from "lucide-react";

import { More } from "@/components/more";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { pricing, subsidy } from "@/lib/site";

export function PricingCards() {
  return (
    <section id="setting" className="bg-sand-hell py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <h2 className="h-section">Setting und Kosten</h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2">
          {pricing.map((offer) => (
            <RevealItem key={offer.id}>
              <article className="flex h-full flex-col justify-between rounded-xl bg-papier p-8 md:p-10">
                <div>
                  <h3 className="font-serif text-[1.9rem] leading-tight">{offer.title}</h3>
                  <p className="mt-3 flex items-center gap-2 text-stein">
                    <Clock className="size-[1.05em]" aria-hidden="true" />
                    {offer.duration} pro Einheit
                  </p>
                </div>
                <p className="mt-12 font-serif text-[clamp(2.8rem,5vw,4rem)] font-light leading-none tracking-[-0.02em] text-moos-tief">
                  {offer.price}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl bg-moos p-8 text-papier md:p-10">
            <div className="max-w-[52ch]">
              <h3 className="font-serif text-[1.6rem] leading-tight">Vor Ihrem ersten Besuch</h3>
              <p className="mt-2 text-papier/85">
                Bitte füllen Sie das Stammdatenblatt aus. Das geht direkt hier auf der Website, in wenigen
                Minuten.
              </p>
            </div>
            <Button asChild variant="light" size="lg">
              <Link href="/stammdatenblatt">
                <FileText aria-hidden="true" /> Stammdatenblatt ausfüllen
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h3 className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight">
              Kostenzuschuss der Krankenkasse
            </h3>
            <p className="prose-text mt-5 text-anthrazit">{subsidy.intro}</p>
            <More label="So beantragen Sie den Zuschuss" className="mt-5">
              <ol className="mt-4 space-y-5">
                {subsidy.steps.map((step, index) => (
                  <li key={step} className="flex gap-5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-moos/40 font-serif text-[1.05rem] text-moos">
                      {index + 1}
                    </span>
                    <p className="max-w-[54ch] pt-1 text-anthrazit">{step}</p>
                  </li>
                ))}
              </ol>
            </More>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl bg-papier p-7 md:p-9">
              <h4 className="font-serif text-[1.3rem]">Zuschuss pro Einheit (50 Minuten)</h4>
              <dl className="mt-4 border-t border-linie">
                {subsidy.funds.map((fund) => (
                  <div key={fund.short} className="flex items-baseline justify-between gap-6 border-b border-linie py-4">
                    <dt>
                      <span className="font-medium text-anthrazit">{fund.short}</span>
                      <span className="block text-[0.9375rem] leading-snug text-stein">{fund.name}</span>
                    </dt>
                    <dd className="whitespace-nowrap font-serif text-[1.5rem] tabular-nums text-moos-tief">
                      {fund.amount}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.875rem] text-stein">
                <a href={subsidy.source.href} target="_blank" rel="noreferrer" className="text-link">
                  {subsidy.source.label}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
