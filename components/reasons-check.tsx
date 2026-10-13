"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { crisis, reasons } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Die 18 Sätze zum Antippen. Die Auswahl bleibt im Browser. */
export function ReasonsCheck() {
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  // Zuerst nur die ersten Sätze zeigen, damit der Abschnitt nicht erschlägt.
  const [showAll, setShowAll] = React.useState(false);
  const visible = showAll ? reasons.items : reasons.items.slice(0, 6);
  const count = selected.size;

  const toggle = (index: number) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div>
      <ul className="grid gap-x-10 md:grid-cols-2">
        {visible.map((reason, index) => {
          const active = selected.has(index);
          return (
            <li key={reason} className="border-b border-linie">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => toggle(index)}
                className={cn(
                  "group flex w-full items-start gap-4 py-4 text-left transition-colors duration-300",
                  active ? "text-moos-tief" : "text-anthrazit hover:text-moos-tief",
                )}
              >
                <span
                  className={cn(
                    "mt-[0.2em] flex size-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    active
                      ? "border-moos bg-moos text-papier"
                      : "border-salbei bg-transparent text-transparent group-hover:border-moos group-hover:bg-salbei-hell",
                  )}
                >
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className={cn("leading-snug", active && "font-medium")}>{reason}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {showAll ? null : (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="-ml-2 mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-[0.9375rem] font-medium text-moos transition-colors hover:text-moos-tief"
        >
          <Plus className="size-4" aria-hidden="true" />
          Alle {reasons.items.length} Sätze anzeigen
        </button>
      )}

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex min-h-[9.5rem] flex-col justify-center rounded-xl bg-salbei-hell/70 p-6 md:p-8" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {count === 0 ? (
              <motion.p
                key="leer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-[46ch] text-moos-tief"
              >
                Tippen Sie an, was auf Sie zutrifft. Ihre Auswahl bleibt auf Ihrem Gerät und wird nicht
                gespeichert.
              </motion.p>
            ) : (
              <motion.div
                key="treffer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap items-center justify-between gap-5"
              >
                <p className="max-w-[34ch] font-serif text-[1.45rem] leading-snug text-moos-tief">
                  {count === 1 ? "Ein Satz trifft auf Sie zu." : `${count} Sätze treffen auf Sie zu.`} Schon
                  einer ist Grund genug für ein Erstgespräch.
                </p>
                <Button asChild>
                  <Link href="/#kontakt">Erstgespräch vereinbaren</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="rounded-xl border border-linie bg-papier p-6 md:p-8">
          <p className="font-medium text-anthrazit">In einer akuten Krise erreichen Sie sofort Hilfe</p>
          <ul className="mt-3 space-y-1.5 text-[0.9875rem] text-stein">
            {crisis.map((entry) => (
              <li key={entry.number} className="flex flex-wrap items-baseline gap-x-2">
                <a href={entry.href} className="text-link font-medium tabular-nums">
                  {entry.number}
                </a>
                <span>
                  {entry.label}, {entry.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
