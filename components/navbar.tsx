"use client";

import * as React from "react";
import Link from "next/link";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Menu, MessageSquareText, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SignalIcon } from "@/components/signal-icon";
import { navigation, practice } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filled = solid || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        filled ? "bg-kalk/88 shadow-[0_1px_0_var(--linie)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="group flex flex-col leading-none" aria-label={`${practice.name}, Startseite`}>
          <span className="font-serif text-[1.35rem] tracking-[-0.01em] text-anthrazit">{practice.shortName}</span>
          <span className="mt-1 text-[0.8125rem] text-stein">Psychotherapie in Wien</span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-2 text-[0.9375rem] text-anthrazit/85 transition-colors after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-moos after:transition-transform after:duration-300 hover:text-moos-tief hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#kontakt">Erstgespräch vereinbaren</Link>
          </Button>
          {/* Am Handy: Signal, SMS und Anruf direkt in der Kopfzeile. */}
          <div className="flex items-center sm:hidden">
            <Button asChild variant="ghost" size="icon" className="size-10">
              <a href={practice.signalHref} target="_blank" rel="noreferrer" aria-label="Nachricht über Signal">
                <SignalIcon className="size-[1.15rem]" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="size-10">
              <a href={practice.smsHref} aria-label="SMS schreiben">
                <MessageSquareText />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="size-10">
              <a href={practice.phoneHref} aria-label={`Anrufen: ${practice.phone}`}>
                <Phone />
              </a>
            </Button>
          </div>

          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menü öffnen">
                <Menu />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-moos-tief/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
              <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,100vw)] flex-col bg-kalk p-6 shadow-2xl duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
                <div className="flex items-center justify-between">
                  <DialogPrimitive.Title className="font-serif text-[1.35rem]">Menü</DialogPrimitive.Title>
                  <DialogPrimitive.Close asChild>
                    <Button variant="ghost" size="icon" aria-label="Menü schließen">
                      <X />
                    </Button>
                  </DialogPrimitive.Close>
                </div>
                <DialogPrimitive.Description className="sr-only">
                  Bereiche der Website und Kontaktmöglichkeiten
                </DialogPrimitive.Description>
                <nav aria-label="Mobile Navigation" className="mt-8 flex flex-col">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-linie py-4 font-serif text-[1.6rem] leading-tight text-anthrazit"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/stammdatenblatt"
                    onClick={() => setOpen(false)}
                    className="border-b border-linie py-4 font-serif text-[1.6rem] leading-tight text-anthrazit"
                  >
                    Stammdatenblatt
                  </Link>
                </nav>
                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link href="/#kontakt">Erstgespräch vereinbaren</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={practice.phoneHref}>
                      <Phone /> {practice.phone}
                    </a>
                  </Button>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
