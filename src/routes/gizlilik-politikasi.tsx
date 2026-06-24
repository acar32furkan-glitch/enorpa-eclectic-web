import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/gizlilik-politikasi")({
  head: () => ({
    meta: [
      { title: "Gizlilik Politikası | Enorpa Enerji" },
      { name: "description", content: "Enorpa Enerji gizlilik politikası." },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/gizlilik-politikasi" },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <h1 className="font-display text-navy text-4xl font-bold uppercase mb-8">
          Gizlilik Politikası
        </h1>
        <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
          <p>
            Bu site Enorpa Enerji tarafından işletilmektedir. Kişisel verileriniz, bu gizlilik
            politikası çerçevesinde işlenmektedir.
          </p>
          <p>
            Toplanan bilgiler yalnızca hizmet kalitesini artırmak, talep ve siparişleri işleme
            koymak ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır.
          </p>
          <p>
            Kişisel verileriniz üçüncü taraflarla yalnızca açık rızanız veya yasal zorunluluk
            halinde paylaşılır.
          </p>
          <p>
            Güvenliğiniz için SSL sertifikası ile korunan sitemizde, verileriniz şifrelenmiş olarak
            iletilir.
          </p>
          <p>
            Bu politika ile ilgili sorularınız için turuncu@enorpa.com adresinden bize
            ulaşabilirsiniz.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
