import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { locations, practice } from "@/lib/site";

export function Contact() {
  return (
    <section id="kontakt" className="bg-kalk py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <h2 className="h-section">Kontakt</h2>
          <p className="lead mt-6 max-w-[40ch] text-anthrazit">
            Rufen Sie mich an oder schreiben Sie mir. Ich melde mich so bald wie möglich bei Ihnen.
          </p>

          <ul className="mt-9 space-y-1">
            <li>
              <a href={practice.phoneHref} className="group flex items-center gap-4 py-2 font-serif text-[1.6rem] text-anthrazit">
                <Phone className="size-5 text-moos" aria-hidden="true" />
                <span className="underline decoration-transparent decoration-1 underline-offset-[0.25em] transition-colors group-hover:decoration-moos">
                  {practice.phone}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${practice.email}`} className="group flex items-center gap-4 py-2 text-[1.0625rem] text-anthrazit">
                <Mail className="size-5 shrink-0 text-moos" aria-hidden="true" />
                <span className="break-all underline decoration-salbei decoration-1 underline-offset-[0.25em] transition-colors group-hover:decoration-moos">
                  {practice.email}
                </span>
              </a>
            </li>
            <li>
              <a
                href={practice.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 py-2 text-[1.0625rem] text-anthrazit"
              >
                <WhatsAppIcon className="size-5 shrink-0 text-moos" />
                <span className="underline decoration-salbei decoration-1 underline-offset-[0.25em] transition-colors group-hover:decoration-moos">
                  Nachricht über WhatsApp
                </span>
              </a>
            </li>
          </ul>

          <div className="mt-10 border-t border-linie">
            {locations.map((location) => (
              <address
                key={location.id}
                className="grid gap-x-8 gap-y-1 border-b border-linie py-6 not-italic sm:grid-cols-[11rem_1fr]"
              >
                <h3 className="font-serif text-[1.3rem] leading-snug">{location.title}</h3>
                <div>
                  <p className="leading-snug text-anthrazit">
                    {location.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] leading-snug text-stein">{location.note}</p>
                  <a
                    href={location.mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link mt-3 inline-flex items-center gap-1.5 text-[0.9375rem]"
                  >
                    <MapPin className="size-4" aria-hidden="true" /> Auf der Karte ansehen
                  </a>
                </div>
              </address>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl bg-papier p-7 shadow-[0_30px_80px_-50px_rgba(82,31,31,0.55)] md:p-10">
            <h3 className="font-serif text-[1.7rem] leading-tight">Ihre Nachricht an mich</h3>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
