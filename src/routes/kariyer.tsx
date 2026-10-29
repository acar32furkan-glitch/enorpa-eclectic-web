import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, CheckCircle2, Factory, Globe2, GraduationCap, Loader2, Send } from "lucide-react";
import { submitLead } from "@/lib/backend";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/kariyer")({
  head: () => ({
    meta: [
      { title: "Kariyer | Enorpa Enerji" },
      {
        name: "description",
        content:
          "Enorpa Enerji'de kariyer: üretim, kaynak, montaj, proje mühendisliği ve satış alanlarında genel başvuru bırakın. Isparta ve Karaman fabrikalarında uzun vadeli istihdam.",
      },
      { property: "og:title", content: "Kariyer | Enorpa Enerji" },
      {
        property: "og:description",
        content:
          "Üretim, kaynak, montaj, proje mühendisliği ve satış alanlarında genel başvuru. Isparta ve Karaman fabrikaları.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kariyer | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji kariyer fırsatları ve genel başvuru formu." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/kariyer" }],
  }),
  component: KariyerPage,
});

/** Başvuru yapılabilecek alanlar (ilan edilmiş pozisyon listesi değil, uzmanlık alanı). */
const FIELDS = [
  "Üretim / Atölye",
  "Kaynak (Gazaltı / Elektrik)",
  "Montaj / Devreye Alma",
  "Proje ve Mühendislik",
  "Kalite ve Kontrol",
  "Satış ve Teklif",
  "Satın Alma / Lojistik",
  "Diğer",
];

const REASONS = [
  {
    icon: Factory,
    title: "Kendi üretimimiz",
    desc: "Isparta ve Karaman'daki üç fabrikamızda kazan, brülör ve otomasyon üretimini uçtan uca kendimiz yapıyoruz.",
  },
  {
    icon: GraduationCap,
    title: "Sahada öğrenme",
    desc: "Sera, gıda, tekstil ve kimya tesislerinde devreye alma süreçlerine doğrudan katılırsınız.",
  },
  {
    icon: Globe2,
    title: "İhracat deneyimi",
    desc: "26 ülkede 138'den fazla proje; Özbekistan, Kazakistan ve Türki cumhuriyetlerde saha tecrübesi.",
  },
  {
    icon: Briefcase,
    title: "Uzun vadeli istihdam",
    desc: "Üretim ekibimizin büyük bölümü 5 yılı aşkın süredir bizimle çalışıyor; teknik eğitimleri biz sağlıyoruz.",
  },
];

function KariyerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [field, setField] = useState(FIELDS[0]);
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Lütfen adınızı ve soyadınızı girin.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError("Size ulaşabilmemiz için telefon veya e-posta girin.");
      return;
    }
    if (!consent) {
      setError("Başvuru için KVKK aydınlatma metnini onaylamanız gerekiyor.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await submitLead({
        name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        message: note.trim() || undefined,
        interest: `Kariyer: ${field}`,
        source: "career_page",
      });
      if (!result.ok) {
        setError("Başvuru gönderilemedi, lütfen tekrar deneyin.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Başvuru gönderilemedi, lütfen tekrar deneyin.");
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
            Kariyer
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Ekibimize Katılın
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            2000'den bu yana endüstriyel ısıtma sistemleri üretiyoruz. Üretim, mühendislik ve satış
            ekiplerimize yeni çalışma arkadaşları arıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {REASONS.map((item) => (
            <div key={item.title} className="bg-steel border border-border p-6">
              <item.icon className="h-8 w-8 text-orange mb-4" />
              <h2 className="font-display text-navy text-lg font-bold uppercase mb-2">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Açık pozisyonlar */}
          <div>
            <h2 className="font-display text-navy text-2xl font-bold uppercase mb-4">
              Açık Pozisyonlar
            </h2>
            <div className="border border-border bg-white p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Şu anda sitemizde ilan edilmiş bir pozisyon bulunmuyor. Yine de ekibimize katılmayı
                düşünüyorsanız <strong>genel başvuru</strong> bırakabilirsiniz: başvurunuz ilgili
                birim yöneticisi tarafından değerlendirilir ve uygun bir pozisyon açıldığında sizinle
                iletişime geçilir.
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  "Başvurular 6 ay boyunca aday havuzunda tutulur.",
                  "Teknik pozisyonlarda saha deneyimi önceliklidir.",
                  "Vardiyalı üretim için Isparta ve Karaman lokasyonları esastır.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-orange mt-0.5 flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Başvuru formu */}
          <div>
            <h2 className="font-display text-navy text-2xl font-bold uppercase mb-4">
              Genel Başvuru
            </h2>
            <form onSubmit={onSubmit} className="bg-white border border-border p-6">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="h-16 w-16 mx-auto rounded-full bg-orange flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-navy text-xl font-bold uppercase mb-2">
                    Başvurunuz alındı
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Teşekkürler {name.split(" ")[0]}. Başvurunuz İnsan Kaynakları ekibimize iletildi.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="career-name" className="block text-sm font-medium text-navy mb-1">
                      Ad Soyad *
                    </label>
                    <input
                      id="career-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full border border-border px-3 py-2.5 text-sm focus:border-orange focus:outline-none"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="career-phone" className="block text-sm font-medium text-navy mb-1">
                        Telefon
                      </label>
                      <input
                        id="career-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-border px-3 py-2.5 text-sm focus:border-orange focus:outline-none"
                        placeholder="+90 5xx xxx xx xx"
                      />
                    </div>
                    <div>
                      <label htmlFor="career-email" className="block text-sm font-medium text-navy mb-1">
                        E-posta
                      </label>
                      <input
                        id="career-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-border px-3 py-2.5 text-sm focus:border-orange focus:outline-none"
                        placeholder="ornek@eposta.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="career-field" className="block text-sm font-medium text-navy mb-1">
                      İlgilendiğiniz alan
                    </label>
                    <select
                      id="career-field"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:border-orange focus:outline-none"
                    >
                      {FIELDS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="career-note" className="block text-sm font-medium text-navy mb-1">
                      Kısa ön yazı
                    </label>
                    <textarea
                      id="career-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      className="w-full border border-border px-3 py-2.5 text-sm focus:border-orange focus:outline-none"
                      placeholder="Deneyiminiz, kullandığınız makineler / programlar ve beklentileriniz."
                    />
                  </div>

                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-orange"
                    />
                    <span>
                      <Link to="/kvkk" className="text-orange underline">
                        KVKK aydınlatma metnini
                      </Link>{" "}
                      okudum; başvurumun değerlendirilmesi için verilerimin işlenmesini onaylıyorum.
                    </span>
                  </label>

                  {error && (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark disabled:opacity-60 text-white font-display font-semibold uppercase tracking-wider px-6 py-3 transition-colors"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {loading ? "Gönderiliyor" : "Başvuruyu Gönder"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
