import nodemailer from "nodemailer";

/**
 * Versand über das SMTP-Postfach der Praxis. Die Zugangsdaten stehen in
 * .env.local (siehe .env.example). Ohne sie antworten die Formulare mit
 * einem Hinweis und bieten E-Mail, Telefon bzw. den PDF-Download an.
 */
export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.MAIL_TO);
}

type Attachment = { filename: string; content: Buffer; contentType: string };

export async function sendMail(message: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}) {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transport.sendMail({
    // `||` statt `??`: ein leeres MAIL_FROM aus .env.example soll auf SMTP_USER zurückfallen.
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    ...message,
  });
}

/** Einfache Bremse gegen Massenversand: höchstens 5 Sendungen pro 10 Minuten und Adresse. */
const hits = new Map<string, number[]>();

export function rateLimited(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unbekannt";
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > 5;
}

export const isEmail = (value: unknown): value is string =>
  typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** Entfernt Zeilenumbrüche, damit Eingaben keine Mail-Header verändern. */
export const singleLine = (value: unknown, max = 200) =>
  String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
