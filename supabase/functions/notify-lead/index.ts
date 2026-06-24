// Supabase Edge Function — leads tablosuna INSERT olunca admin'e email bildirimi gönderir
// Deploy: supabase functions deploy notify-lead --no-verify-jwt

// TODO: Gerçek admin email adresiyle değiştirin
const ADMIN_EMAIL = "admin@enorpa-test.com";

interface Lead {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  interest: string | null;
  message: string | null;
  source: string;
  status: string;
  created_at: string;
}

interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: Lead;
  schema: "public";
}

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

Deno.serve(async (req: Request) => {
  const payload: WebhookPayload = await req.json();
  const lead = payload.record;

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set");
    return new Response("Missing RESEND_API_KEY", { status: 500 });
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;padding:20px;max-width:600px;margin:auto;">
  <h2 style="color:#e05c1a;">Yeni Talep Geldi</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:16px;">
    <tr><td style="padding:8px 12px;background:#f4f6f9;font-weight:600;border:1px solid #dde3eb;">Ad Soyad</td><td style="padding:8px 12px;border:1px solid #dde3eb;">${escapeHtml(lead.name)}</td></tr>
    ${lead.phone ? `<tr><td style="padding:8px 12px;background:#f4f6f9;font-weight:600;border:1px solid #dde3eb;">Telefon</td><td style="padding:8px 12px;border:1px solid #dde3eb;">${escapeHtml(lead.phone)}</td></tr>` : ""}
    ${lead.email ? `<tr><td style="padding:8px 12px;background:#f4f6f9;font-weight:600;border:1px solid #dde3eb;">E-posta</td><td style="padding:8px 12px;border:1px solid #dde3eb;">${escapeHtml(lead.email)}</td></tr>` : ""}
    ${lead.interest ? `<tr><td style="padding:8px 12px;background:#f4f6f9;font-weight:600;border:1px solid #dde3eb;">İlgi Alanı</td><td style="padding:8px 12px;border:1px solid #dde3eb;">${escapeHtml(lead.interest)}</td></tr>` : ""}
    ${lead.message ? `<tr><td style="padding:8px 12px;background:#f4f6f9;font-weight:600;border:1px solid #dde3eb;">Mesaj</td><td style="padding:8px 12px;border:1px solid #dde3eb;">${escapeHtml(lead.message)}</td></tr>` : ""}
    <tr><td style="padding:8px 12px;background:#f4f6f9;font-weight:600;border:1px solid #dde3eb;">Kaynak</td><td style="padding:8px 12px;border:1px solid #dde3eb;">${escapeHtml(lead.source)}</td></tr>
    <tr><td style="padding:8px 12px;background:#f4f6f9;font-weight:600;border:1px solid #dde3eb;">Tarih</td><td style="padding:8px 12px;border:1px solid #dde3eb;">${new Date(lead.created_at).toLocaleString("tr-TR")}</td></tr>
  </table>
  <p style="margin-top:20px;font-size:12px;color:#6b7a8d;">Bu e-posta Enorpa Enerji talep bildirim sistemi tarafından gönderilmiştir.</p>
</body>
</html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Enorpa Enerji <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `Yeni Talep: ${escapeHtml(lead.name)}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return new Response(err, { status: 500 });
  }

  return new Response("OK", { status: 200 });
});