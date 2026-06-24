import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { MapPin, Phone, Mail, Send, Clock, MessageCircle, Building2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim | Enorpa Enerji" },
      {
        name: "description",
        content:
          "Enorpa Enerji iletişim bilgileri. Isparta ve Karaman fabrikalarımız için telefon, e-posta ve teklif formu ile ulaşın.",
      },
      { property: "og:title", content: "İletişim | Enorpa Enerji" },
      {
        property: "og:description",
        content:
          "Enorpa Enerji iletişim bilgileri. Isparta ve Karaman fabrikalarımız için telefon, e-posta ve teklif formu ile ulaşın.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/iletisim" },
    ],
  }),
  component: IletisimPage,
});

const INTEREST_OPTIONS = [
  "Sıcak Su Kazanı",
  "Buhar Kazanı",
  "Sıcak Hava Kazanı",
  "Kızgın Su Kazanı",
  "Sera Isıtma Sistemi",
  "Diğer",
];

function IletisimPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [interest, setInterest] = useState(INTEREST_OPTIONS[0]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (cleanName.length < 2) {
      setError("Lütfen adınızı girin.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await supabase.from("leads").insert({
        name: cleanName,
        phone: cleanPhone || undefined,
        email: email.trim() || undefined,
        message: message.trim() || undefined,
        interest,
        source: "contact_page",
        status: "new",
      });
      console.error("Supabase response:", response);
      if (response.error) {
        console.error("Form error:", response.error);
        console.error("Error details:", response.error.message, response.error.details, response.error.hint);
        setError(`Hata: ${response.error.message || "Lütfen tekrar deneyin."}`);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Form error:", err);
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="max-w-2xl mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            İletişim
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            İletişim
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Sorularınız ve teklif talepleriniz için bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form onSubmit={onSubmit} className="bg-white border border-border p-6">
              <h3 className="font-display text-navy text-lg font-bold uppercase mb-4">
                Teklif Formu
              </h3>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 mx-auto rounded-full bg-orange flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-muted-foreground">
                    Mesajınız alındı, en kısa sürede size döneceğiz.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
                      placeholder="Ahmet Yılmaz"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      maxLength={20}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
                      placeholder="+90 555 111 22 33"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      maxLength={255}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
                      placeholder="ornek@mail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
                      Mesaj
                    </label>
                    <textarea
                      rows={4}
                      maxLength={500}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none resize-none"
                      placeholder="Mesajınız..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
                      Ürün İlgisi
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none bg-white"
                    >
                      {INTEREST_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
{error && <div className="text-orange text-sm">{error}</div>}
                   <button
                     type="submit"
                     disabled={loading}
                     className="w-full inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider py-3 transition-colors disabled:opacity-50"
                   >
                     {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                     {submitted ? "Gönderildi" : loading ? "Gönderiliyor..." : "Gönder"}
                   </button>
                 </div>
               )}
             </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <LocationCard
              title="Merkez Ofis & Fabrika 1"
              address="Sanayi Mah. 3231 Sk. No:12 Merkez / ISPARTA"
              phone="+90 850 471 2100"
              email="turuncu@enorpa.com"
              mapLink="https://maps.google.com/?q=Enorpa+Enerji+Isparta+Sanayi+Mahallesi"
            />
            <LocationCard
              title="Fabrika 2 (Isparta OSB)"
              address="Vatan OSB Mah. 304. Cad. No:12 Merkez / ISPARTA"
              mapLink="https://maps.google.com/?q=Isparta+Organize+Sanayi+Bolgesi"
            />
            <LocationCard
              title="Fabrika 3 (Karaman OSB)"
              address="OSB Mah. 17. Cad. No:49 Merkez / KARAMAN"
              mapLink="https://maps.google.com/?q=Karaman+Organize+Sanayi+Bolgesi"
            />
          </div>
        </div>

        <div className="mt-12 bg-navy-dark text-white p-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <a
            href="https://wa.me/908504712100"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-orange"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp: +90 850 471 2100
          </a>
          <a
            href="mailto:turuncu@enorpa.com"
            className="inline-flex items-center gap-2 hover:text-orange"
          >
            <Mail className="h-4 w-4" />
            turuncu@enorpa.com
          </a>
          <a
            href="https://instagram.com/enorpaenerji"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-orange"
          >
            <Building2 className="h-4 w-4" />
            Instagram: @enorpaenerji
          </a>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pazartesi - Cuma: 08:00 - 18:00
          </span>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function LocationCard({
  title,
  address,
  phone,
  email,
  mapLink,
}: {
  title: string;
  address: string;
  phone?: string;
  email?: string;
  mapLink: string;
}) {
  return (
    <div className="bg-white border border-border p-5">
      <div className="flex items-start gap-3 mb-3">
        <MapPin className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-display text-navy font-bold uppercase">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{address}</p>
        </div>
      </div>
      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-sm text-navy hover:text-orange mb-2"
        >
          <Phone className="h-4 w-4" />
          {phone}
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-sm text-navy hover:text-orange mb-3"
        >
          <Mail className="h-4 w-4" />
          {email}
        </a>
      )}
      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-orange font-display font-semibold uppercase tracking-wider text-xs hover:underline"
      >
        Haritada Gör →
      </a>
    </div>
  );
}
