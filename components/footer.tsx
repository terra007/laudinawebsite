import Link from "next/link";

import { locations, navigation, practice } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-moos-tief py-16 text-kalk/85">
      <div className="wrap grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-serif text-[1.7rem] leading-tight text-papier">{practice.name}</p>
          <ul className="mt-3 space-y-0.5 text-[0.9875rem]">
            {practice.methods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
          <p className="mt-6">
            <a
              href={practice.phoneHref}
              className="inline-block py-1.5 underline decoration-kalk/30 underline-offset-4 hover:decoration-kalk"
            >
              {practice.phone}
            </a>
            <br />
            <a
              href={`mailto:${practice.email}`}
              className="inline-block break-all py-1.5 underline decoration-kalk/30 underline-offset-4 hover:decoration-kalk"
            >
              {practice.email}
            </a>
          </p>
        </div>

        <div className="space-y-6 text-[0.9875rem]">
          {locations.map((location) => (
            <address key={location.id} className="not-italic">
              <p className="font-medium text-papier">{location.title}</p>
              {location.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          ))}
        </div>

        <nav aria-label="Fußzeile" className="text-[0.9875rem]">
          <ul className="grid grid-cols-2 gap-x-6 md:block">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-2 hover:text-papier md:py-1">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/stammdatenblatt" className="inline-block py-2 hover:text-papier md:py-1">
                Stammdatenblatt
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="wrap mt-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-kalk/15 pt-6 text-[0.9375rem]">
          <p>© {practice.name}. Alle Rechte vorbehalten.</p>
          <Link href="/impressum" className="underline decoration-kalk/30 underline-offset-4 hover:decoration-kalk">
            Verschwiegenheit, Datenschutz, Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
}
