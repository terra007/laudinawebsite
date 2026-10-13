"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { practice } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [mailto, setMailto] = React.useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Bitte geben Sie Ihren Namen an.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if ((data.message ?? "").trim().length < 10) next.message = "Bitte schreiben Sie ein paar Worte zu Ihrem Anliegen.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setMailto(
      `mailto:${practice.email}?subject=${encodeURIComponent("Anfrage über die Website")}&body=${encodeURIComponent(
        `${data.message}\n\n${data.name}\n${data.phone ?? ""}`,
      )}`,
    );
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else if (response.status === 503) {
        setStatus("unavailable");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 flex items-start gap-4 rounded-lg bg-salbei-hell/70 p-6" role="status">
        <CircleCheck className="mt-0.5 size-6 shrink-0 text-moos" aria-hidden="true" />
        <div>
          <p className="font-serif text-[1.35rem] leading-snug text-moos-tief">Ihre Nachricht wurde gesendet.</p>
          <p className="mt-1 text-anthrazit">Ich melde mich so bald wie möglich bei Ihnen.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="kontakt-name">Name</Label>
        <Input
          id="kontakt-name"
          name="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "kontakt-name-fehler" : undefined}
        />
        {errors.name ? (
          <p id="kontakt-name-fehler" className="text-[0.9375rem] text-fehler">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="kontakt-email">E-Mail-Adresse</Label>
          <Input
            id="kontakt-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "kontakt-email-fehler" : undefined}
          />
          {errors.email ? (
            <p id="kontakt-email-fehler" className="text-[0.9375rem] text-fehler">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="kontakt-telefon">
            Telefon <span className="font-normal text-stein">(optional)</span>
          </Label>
          <Input id="kontakt-telefon" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="kontakt-nachricht">Nachricht</Label>
        <Textarea
          id="kontakt-nachricht"
          name="message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "kontakt-nachricht-fehler" : undefined}
        />
        {errors.message ? (
          <p id="kontakt-nachricht-fehler" className="text-[0.9375rem] text-fehler">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Feld für Spam-Bots, für Menschen unsichtbar */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="text-[0.9375rem] leading-snug text-stein">
        Ihre Angaben verwende ich nur, um Ihre Anfrage zu beantworten. Mehr dazu unter{" "}
        <Link href="/impressum#datenschutz" className="text-link">
          Datenschutz
        </Link>
        .
      </p>

      {status === "error" || status === "unavailable" ? (
        <div className="rounded-lg border border-fehler/30 bg-fehler/5 p-4 text-[0.9875rem] text-anthrazit" role="alert">
          {status === "unavailable"
            ? "Das Formular kann gerade keine Nachrichten senden."
            : "Die Nachricht konnte nicht gesendet werden."}{" "}
          Schreiben Sie mir bitte direkt:{" "}
          <a href={mailto} className="text-link font-medium">
            Nachricht im E-Mail-Programm öffnen
          </a>{" "}
          oder rufen Sie an unter{" "}
          <a href={practice.phoneHref} className="text-link font-medium">
            {practice.phone}
          </a>
          .
        </div>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {status === "sending" ? "Nachricht wird gesendet" : "Nachricht senden"}
        </Button>
      </div>
    </form>
  );
}
