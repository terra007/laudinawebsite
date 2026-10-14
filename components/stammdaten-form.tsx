"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheck, Download, LoaderCircle, Send, Share2 } from "lucide-react";

import { SignaturePad, type SignatureHandle } from "@/components/signature-pad";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { appointmentTerms, insurers, practice } from "@/lib/site";
import { fillStammdatenblatt, formatDate, type Stammdaten } from "@/lib/stammdaten-pdf";
import { cn } from "@/lib/utils";

type Values = {
  titel: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  svnr: string;
  krankenkasse: string;
  adresse: string;
  plzOrt: string;
  telefon: string;
  email: string;
  ort: string;
};

type Errors = Partial<Record<keyof Values | "zustimmung" | "unterschrift", string>>;
type Status = "idle" | "working" | "sent" | "downloaded" | "fallback" | "failed";

const empty: Values = {
  titel: "",
  vorname: "",
  nachname: "",
  geburtsdatum: "",
  svnr: "",
  krankenkasse: "",
  adresse: "",
  plzOrt: "",
  telefon: "",
  email: "",
  ort: "Wien",
};

function validate(values: Values, agreed: boolean, signed: boolean): Errors {
  const errors: Errors = {};
  if (!values.vorname.trim()) errors.vorname = "Bitte geben Sie Ihren Vornamen an.";
  if (!values.nachname.trim()) errors.nachname = "Bitte geben Sie Ihren Nachnamen an.";
  if (!values.geburtsdatum) errors.geburtsdatum = "Bitte geben Sie Ihr Geburtsdatum an.";
  else if (new Date(values.geburtsdatum) > new Date()) errors.geburtsdatum = "Das Geburtsdatum liegt in der Zukunft.";
  if (values.svnr.trim() && values.svnr.replace(/\D/g, "").length !== 10)
    errors.svnr = "Die Sozialversicherungsnummer hat 10 Ziffern.";
  if (!values.adresse.trim()) errors.adresse = "Bitte geben Sie Straße und Hausnummer an.";
  if (!values.plzOrt.trim()) errors.plzOrt = "Bitte geben Sie Postleitzahl und Ort an.";
  if (values.telefon.replace(/\D/g, "").length < 6) errors.telefon = "Bitte geben Sie eine Telefonnummer an.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (!values.ort.trim()) errors.ort = "Bitte geben Sie den Ort an.";
  if (!agreed) errors.zustimmung = "Bitte bestätigen Sie die Honorar- und Terminvereinbarung.";
  if (!signed) errors.unterschrift = "Bitte unterschreiben Sie das Stammdatenblatt.";
  return errors;
}

function Field({
  id,
  label,
  optional,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <Label htmlFor={id}>
        {label} {optional ? <span className="font-normal text-stein">(optional)</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-fehler`} className="text-[0.9375rem] leading-snug text-fehler">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[0.875rem] leading-snug text-stein">{hint}</p>
      ) : null}
    </div>
  );
}

export function StammdatenForm() {
  const [values, setValues] = React.useState<Values>(empty);
  const [agreed, setAgreed] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [today, setToday] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [canShare, setCanShare] = React.useState(false);
  const [otherInsurer, setOtherInsurer] = React.useState(false);
  // Höchstwert für das Datumsfeld; begrenzt nebenbei das Jahr auf vier Stellen.
  const [maxDate, setMaxDate] = React.useState("9999-12-31");
  const signature = React.useRef<SignatureHandle>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setToday(new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date()));
    setMaxDate(new Date().toISOString().slice(0, 10));
  }, []);

  const bind = (name: keyof Values) => ({
    id: `sd-${name}`,
    name,
    value: values[name],
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `sd-${name}-fehler` : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [name]: event.target.value }));
      if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    },
  });

  async function buildPdf(): Promise<File> {
    const [template, font, png] = await Promise.all([
      fetch("/stammdatenblatt.pdf").then((response) => response.arrayBuffer()),
      fetch("/fonts/Geist-Regular.ttf").then((response) => response.arrayBuffer()),
      signature.current?.toPng() ?? Promise.resolve(null),
    ]);
    const data: Stammdaten = {
      titel: values.titel,
      vorname: values.vorname,
      nachname: values.nachname,
      geburtsdatum: formatDate(values.geburtsdatum),
      svnr: values.svnr,
      krankenkasse: values.krankenkasse,
      adresse: values.adresse,
      plzOrt: values.plzOrt,
      telefon: values.telefon,
      email: values.email,
      ortDatum: `${values.ort.trim()}, ${today}`,
    };
    const bytes = await fillStammdatenblatt(template, font, data, png);
    const name = `Stammdatenblatt ${values.vorname} ${values.nachname}`.replace(/[^\p{L}\p{N} .-]/gu, "").trim();
    return new File([bytes as BlobPart], `${name}.pdf`, { type: "application/pdf" });
  }

  function download(pdf: File) {
    const url = URL.createObjectURL(pdf);
    const link = document.createElement("a");
    link.href = url;
    link.download = pdf.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }

  async function run(action: "send" | "download") {
    const found = validate(values, agreed, signed);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      const target =
        first === "zustimmung" ? "#sd-zustimmung" : first === "unterschrift" ? "#sd-unterschrift" : `#sd-${first}`;
      const element = formRef.current?.querySelector<HTMLElement>(target);
      element?.scrollIntoView({ block: "center", behavior: "smooth" });
      element?.focus({ preventScroll: true });
      return;
    }

    setStatus("working");
    let pdf: File;
    try {
      pdf = await buildPdf();
    } catch {
      setStatus("failed");
      return;
    }
    setFile(pdf);
    setCanShare(typeof navigator.canShare === "function" && navigator.canShare({ files: [pdf] }));

    if (action === "download") {
      download(pdf);
      setStatus("downloaded");
    } else {
      try {
        const body = new FormData();
        body.set("pdf", pdf);
        body.set("name", `${values.vorname} ${values.nachname}`.trim());
        body.set("email", values.email);
        body.set("website", (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "");
        const response = await fetch("/api/stammdatenblatt", { method: "POST", body });
        setStatus(response.ok ? "sent" : "fallback");
      } catch {
        setStatus("fallback");
      }
    }
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: "center", behavior: "smooth" }));
  }

  async function share() {
    if (!file) return;
    try {
      await navigator.share({ files: [file], title: "Stammdatenblatt" });
    } catch {
      /* Teilen abgebrochen */
    }
  }

  const done = status === "sent" || status === "downloaded" || status === "fallback";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void run("send");
      }}
      className="grid gap-12"
    >
      <fieldset className="grid gap-5">
        <legend className="mb-5 font-serif text-[1.6rem] leading-tight">Ihre Daten</legend>

        <Field id="sd-titel" label="Titel" optional className="sm:max-w-[14rem]">
          <Input {...bind("titel")} autoComplete="honorific-prefix" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="sd-vorname" label="Vorname" error={errors.vorname}>
            <Input {...bind("vorname")} autoComplete="given-name" />
          </Field>
          <Field id="sd-nachname" label="Nachname" error={errors.nachname}>
            <Input {...bind("nachname")} autoComplete="family-name" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="sd-geburtsdatum" label="Geburtsdatum" error={errors.geburtsdatum}>
            <Input {...bind("geburtsdatum")} type="date" min="1900-01-01" max={maxDate} autoComplete="bday" />
          </Field>
          <Field id="sd-svnr" label="SV-Nr." optional hint="10 Ziffern, zum Beispiel 1234 010190" error={errors.svnr}>
            <Input {...bind("svnr")} inputMode="numeric" autoComplete="off" />
          </Field>
        </div>

        <Field id="sd-krankenkasse" label="Krankenkasse" optional>
          <div role="radiogroup" aria-label="Krankenkasse" className="flex flex-wrap gap-2">
            {[...insurers, "Andere"].map((option) => {
              const other = option === "Andere";
              const active = other ? otherInsurer : !otherInsurer && values.krankenkasse === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setOtherInsurer(other);
                    setValues((current) => ({
                      ...current,
                      krankenkasse: other ? "" : current.krankenkasse === option ? "" : option,
                    }));
                  }}
                  className={cn(
                    "min-h-11 rounded-full border px-4 text-[0.9375rem] transition-colors",
                    active
                      ? "border-moos bg-moos text-papier"
                      : "border-input bg-papier text-anthrazit hover:border-salbei",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {otherInsurer ? (
            <Input {...bind("krankenkasse")} placeholder="Name der Krankenkasse" autoComplete="off" className="mt-1" />
          ) : null}
        </Field>

        <Field id="sd-adresse" label="Adresse" error={errors.adresse}>
          <Input {...bind("adresse")} autoComplete="street-address" />
        </Field>

        <Field id="sd-plzOrt" label="PLZ / Ort" error={errors.plzOrt}>
          <Input {...bind("plzOrt")} autoComplete="off" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="sd-telefon" label="Tel.-Nr." error={errors.telefon}>
            <Input {...bind("telefon")} type="tel" autoComplete="tel" />
          </Field>
          <Field id="sd-email" label="E-Mail" error={errors.email}>
            <Input {...bind("email")} type="email" autoComplete="email" />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 font-serif text-[1.6rem] leading-tight">{appointmentTerms.title}</legend>
        <p className="max-w-[62ch] text-anthrazit">{appointmentTerms.intro}</p>
        <ul className="mt-4 max-w-[62ch] space-y-2 text-anthrazit">
          {appointmentTerms.rules.map((rule) => (
            <li key={rule} className="flex gap-3">
              <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-salbei" aria-hidden="true" />
              {rule}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.9375rem] text-stein">
          Nachlesen:{" "}
          <Link href="/#setting" target="_blank" className="text-link">
            Honorar
          </Link>
          ,{" "}
          <Link href="/impressum#verschwiegenheit" target="_blank" className="text-link">
            Verschwiegenheit
          </Link>{" "}
          und{" "}
          <Link href="/impressum#datenschutz" target="_blank" className="text-link">
            Datenschutz
          </Link>
          .
        </p>

        <div
          className={cn(
            "mt-6 flex items-start gap-4 rounded-lg p-5 transition-colors",
            errors.zustimmung ? "bg-fehler/5 ring-1 ring-fehler/40" : "bg-salbei-hell/60",
          )}
        >
          <Checkbox
            id="sd-zustimmung"
            checked={agreed}
            aria-invalid={Boolean(errors.zustimmung)}
            onCheckedChange={(checked) => {
              setAgreed(checked === true);
              setErrors((current) => ({ ...current, zustimmung: undefined }));
            }}
          />
          <Label htmlFor="sd-zustimmung" className="text-[1rem] font-normal leading-snug">
            Ich habe die Informationen und die Terminregelungen zur Kenntnis genommen und akzeptiere sie.
          </Label>
        </div>
        {errors.zustimmung ? <p className="mt-2 text-[0.9375rem] text-fehler">{errors.zustimmung}</p> : null}
      </fieldset>

      <fieldset>
        <legend className="mb-5 font-serif text-[1.6rem] leading-tight">Unterschrift</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="sd-ort" label="Ort" error={errors.ort}>
            <Input {...bind("ort")} autoComplete="off" />
          </Field>
          <div className="grid content-start gap-2">
            <span className="text-[0.9375rem] font-medium text-anthrazit">Datum</span>
            <p className="flex h-12 items-center rounded-md bg-sand-hell px-3.5 tabular-nums text-anthrazit">{today}</p>
          </div>
        </div>
        <div id="sd-unterschrift" tabIndex={-1} className="mt-5 outline-none">
          <p className="mb-2 text-[0.9375rem] font-medium text-anthrazit">Ihre Unterschrift</p>
          <SignaturePad
            ref={signature}
            invalid={Boolean(errors.unterschrift)}
            onChange={(has) => {
              setSigned(has);
              if (has) setErrors((current) => ({ ...current, unterschrift: undefined }));
            }}
          />
          {errors.unterschrift ? <p className="mt-2 text-[0.9375rem] text-fehler">{errors.unterschrift}</p> : null}
        </div>
      </fieldset>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div ref={resultRef} aria-live="polite" className="empty:hidden">
        {status === "sent" ? (
          <div className="flex items-start gap-4 rounded-lg bg-salbei-hell/70 p-6">
            <CircleCheck className="mt-0.5 size-6 shrink-0 text-moos" aria-hidden="true" />
            <div>
              <p className="font-serif text-[1.45rem] leading-snug text-moos-tief">Ihr Stammdatenblatt wurde gesendet.</p>
              <p className="mt-1 text-anthrazit">Vielen Dank. Sie müssen nichts weiter tun.</p>
              {file ? (
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => download(file)}>
                  <Download aria-hidden="true" /> Kopie als PDF herunterladen
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}

        {status === "downloaded" || status === "fallback" ? (
          <div className="rounded-lg bg-salbei-hell/70 p-6">
            <p className="font-serif text-[1.45rem] leading-snug text-moos-tief">
              {status === "fallback"
                ? "Der Online-Versand ist gerade nicht möglich. Ihr Stammdatenblatt ist als PDF fertig."
                : "Ihr Stammdatenblatt ist als PDF fertig."}
            </p>
            <p className="mt-2 max-w-[58ch] text-anthrazit">
              Bitte senden Sie die Datei per E-Mail an{" "}
              <a href={`mailto:${practice.email}?subject=Stammdatenblatt`} className="text-link">
                {practice.email}
              </a>{" "}
              oder per{" "}
              <a href={practice.signalHref} target="_blank" rel="noreferrer" className="text-link">
                Signal
              </a>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {file ? (
                <Button type="button" onClick={() => download(file)}>
                  <Download aria-hidden="true" /> PDF herunterladen
                </Button>
              ) : null}
              {canShare ? (
                <Button type="button" variant="outline" onClick={share}>
                  <Share2 aria-hidden="true" /> PDF teilen
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}

        {status === "failed" ? (
          <p className="rounded-lg border border-fehler/30 bg-fehler/5 p-5 text-anthrazit" role="alert">
            Das PDF konnte nicht erstellt werden. Laden Sie die Seite neu und versuchen Sie es noch einmal, oder nutzen
            Sie das{" "}
            <a href="/stammdatenblatt.pdf" download className="text-link">
              leere Formular als PDF
            </a>
            .
          </p>
        ) : null}
      </div>

      {!done ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" disabled={status === "working"}>
            {status === "working" ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
            {status === "working" ? "Stammdatenblatt wird erstellt" : "Stammdatenblatt senden"}
          </Button>
          <Button type="button" variant="outline" size="lg" disabled={status === "working"} onClick={() => void run("download")}>
            <Download aria-hidden="true" /> Als PDF herunterladen
          </Button>
        </div>
      ) : null}
    </form>
  );
}
