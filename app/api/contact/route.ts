import { isEmail, mailConfigured, rateLimited, sendMail, singleLine } from "@/lib/mail";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Ausgefülltes Bot-Feld: stillschweigend annehmen, nichts senden.
  if (body.website) return Response.json({ ok: true });

  const name = singleLine(body.name, 120);
  const phone = singleLine(body.phone, 60);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name || !isEmail(body.email) || message.length < 10) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  if (!mailConfigured()) return Response.json({ error: "mail_not_configured" }, { status: 503 });
  if (rateLimited(request)) return Response.json({ error: "rate_limited" }, { status: 429 });

  try {
    await sendMail({
      subject: `Anfrage über die Website: ${name}`,
      replyTo: body.email,
      text: `Name: ${name}\nE-Mail: ${body.email}\nTelefon: ${phone || "nicht angegeben"}\n\n${message}`,
    });
    return Response.json({ ok: true });
  } catch {
    console.error("Kontaktformular: Versand fehlgeschlagen");
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
}
