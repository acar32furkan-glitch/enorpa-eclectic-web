import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  interest?: string;
  source: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

  if (!RESEND_API_KEY) {
    console.error("[notify-lead] RESEND_API_KEY not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let payload: LeadPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON payload" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const { name, phone, email, interest, source } = payload;

  if (!name || !source) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: name, source" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const subject = source === "quick_callback"
    ? `Enorpa: Hizli Geri Arama Talebi - ${name}`
    : `Enorpa: Yeni Lead - ${name}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: #0f2d5c; color: #ffffff; padding: 24px; }
        .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
        .header .subtitle { color: #e05c1a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }
        .content { padding: 24px; }
        .field { margin-bottom: 16px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7a8d; font-weight: 600; }
        .value { font-size: 16px; color: #0f1923; margin-top: 4px; }
        .footer { background: #f4f6f9; padding: 16px 24px; font-size: 12px; color: #6b7a8d; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="subtitle">Enorpa Enerji</div>
          <h1>Yeni Lead Talebi</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Ad Soyad</div>
            <div class="value">${name}</div>
          </div>
          ${phone ? `<div class="field"><div class="label">Telefon</div><div class="value"><a href="tel:${phone}">${phone}</a></div></div>` : ''}
          ${email ? `<div class="field"><div class="label">E-posta</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>` : ''}
          ${interest ? `<div class="field"><div class="label">Ilgi Alani</div><div class="value">${interest}</div></div>` : ''}
          <div class="field">
            <div class="label">Kaynak</div>
            <div class="value">${source}</div>
          </div>
          <div class="field">
            <div class="label">Tarih</div>
            <div class="value">${new Date().toLocaleString('tr-TR', { dateStyle: 'full', timeStyle: 'short' })}</div>
          </div>
        </div>
        <div class="footer">
          Bu e-posta otomatik olarak Enorpa web sitesinden gonderilmistir.
        </div>
      </div>
    </body>
    </html>
  `;

  const textBody = `
Enorpa Enerji - Yeni Lead Talebi

Ad Soyad: ${name}
${phone ? `Telefon: ${phone}\n` : ''}${email ? `E-posta: ${email}\n` : ''}${interest ? `Ilgi Alani: ${interest}\n` : ''}
Kaynak: ${source}
Tarih: ${new Date().toLocaleString('tr-TR', { dateStyle: 'full', timeStyle: 'short' })}
  `.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Enorpa Leads <leads@enorpa.com>",
        to: "turuncu@enorpa.com",
        subject,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[notify-lead] Resend API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = await response.json();
    console.log("[notify-lead] Email sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, message: "Email notification sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[notify-lead] Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
