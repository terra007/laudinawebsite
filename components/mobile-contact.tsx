"use client";

import * as React from "react";
import { MessageSquareText, Phone } from "lucide-react";

import { SignalIcon } from "@/components/signal-icon";
import { practice } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Feste Kontaktknöpfe am Handy: Signal, SMS und Anruf mit einem Tipp. Sie erscheinen erst
 * nach dem Einstieg, weil dort dieselben Knöpfe schon in der Kopfzeile stehen.
 */
export function MobileContact() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "flex size-12 items-center justify-center rounded-full shadow-[0_12px_30px_-10px_rgba(43,70,73,0.6)] transition-transform active:scale-95";
  const tabIndex = visible ? undefined : -1;

  return (
    <div
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex flex-col gap-3 transition-all duration-500 lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <a
        href={practice.signalHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Nachricht über Signal"
        tabIndex={tabIndex}
        className={`${base} bg-papier text-moos ring-1 ring-linie`}
      >
        <SignalIcon className="size-[1.4rem]" />
      </a>
      <a href={practice.smsHref} aria-label="SMS schreiben" tabIndex={tabIndex} className={`${base} bg-papier text-moos ring-1 ring-linie`}>
        <MessageSquareText className="size-[1.4rem]" aria-hidden="true" />
      </a>
      <a href={practice.phoneHref} aria-label={`Anrufen: ${practice.phone}`} tabIndex={tabIndex} className={`${base} bg-moos text-papier`}>
        <Phone className="size-[1.4rem]" aria-hidden="true" />
      </a>
    </div>
  );
}
