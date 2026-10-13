import { isEmail, mailConfigured, rateLimited, sendMail, singleLine } from "@/lib/mail";

const MAX_BYTES = 3 * 1024 * 1024;

/**
 * Nimmt das im Browser erzeugte Stammdatenblatt entgegen und leitet es als
 * E-Mail-Anhang an die Praxis weiter. Auf dem Server wird nichts gespeichert
 * und nichts protokolliert.
 */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  if (form.get("website")) return Response.json({ ok: true });

  const file = form.get("pdf");
  const name = singleLine(form.get("name"), 120);
  const email = form.get("email");

  if (!(file instanceof File) || !name || !isEmail(email) || file.size === 0 || file.size > MAX_BYTES) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const content = Buffer.from(await file.arrayBuffer());
  if (content.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  if (!mailConfigured()) return Response.json({ error: "mail_not_configured" }, { status: 503 });
  if (rateLimited(request)) return Response.json({ error: "rate_limited" }, { status: 429 });

  try {
    await sendMail({
      subject: `Stammdatenblatt: ${name}`,
      replyTo: email,
      text: `Das ausgefüllte Stammdatenblatt von ${name} liegt als PDF bei.\n\nGesendet über das Formular auf der Website.`,
      attachments: [
        {
          filename: `Stammdatenblatt ${name.replace(/[^\p{L}\p{N} .-]/gu, "")}.pdf`,
          content,
          contentType: "application/pdf",
        },
      ],
    });
    return Response.json({ ok: true });
  } catch {
    console.error("Stammdatenblatt: Versand fehlgeschlagen");
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
}
