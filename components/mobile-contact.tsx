import { MessageSquareText, Phone } from "lucide-react";

import { SignalIcon } from "@/components/signal-icon";
import { practice } from "@/lib/site";

/** Feste Kontaktknöpfe am Handy: Signal, SMS und Anruf mit einem Tipp, auf jeder Höhe der Seite. */
export function MobileContact() {
  const base =
    "flex size-12 items-center justify-center rounded-full shadow-[0_12px_30px_-10px_rgba(82,31,31,0.6)] transition-transform active:scale-95";

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex flex-col gap-3 lg:hidden">
      <a href={practice.signalHref} target="_blank" rel="noreferrer" aria-label="Nachricht über Signal" className={`${base} bg-papier text-moos ring-1 ring-linie`}>
        <SignalIcon className="size-[1.4rem]" />
      </a>
      <a href={practice.smsHref} aria-label="SMS schreiben" className={`${base} bg-papier text-moos ring-1 ring-linie`}>
        <MessageSquareText className="size-[1.4rem]" aria-hidden="true" />
      </a>
      <a href={practice.phoneHref} aria-label={`Anrufen: ${practice.phone}`} className={`${base} bg-moos text-papier`}>
        <Phone className="size-[1.4rem]" aria-hidden="true" />
      </a>
    </div>
  );
}
