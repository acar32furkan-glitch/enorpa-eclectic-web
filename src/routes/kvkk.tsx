import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/kvkk")({
  head: () => ({
    meta: [
      { title: "KVKK Aydınlatma Metni | Enorpa Enerji" },
      { name: "description", content: "Enorpa Enerji KVKK aydınlatma metni." },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/kvkk" },
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
          KVKK Aydınlatma Metni
        </h1>
        <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Enorpa Enerji olarak
            kişisel verilerinizin işlenmesine ilişkin sizleri bilgilendirmek isteriz.
          </p>
          <p>
            <strong>Veri Sorumlusu:</strong> Enorpa Enerji, Sanayi Mah. 3231 Sk. No:12, Merkez /
            ISPARTA
          </p>
          <p>
            <strong>Veri İşleme Amacı:</strong> Kişisel verileriniz; ürün ve hizmetlerimizin
            sunulması, müşteri memnuniyetinin artırılması, talep ve şikayetlerin takibi, pazarlama
            faaliyetleri ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.
          </p>
          <p>
            <strong>Verilerin Aktarılması:</strong> Kişisel verileriniz, yukarıda belirtilen amaçlar
            doğrultusunda, iş ortaklarımıza, tedarikçilerimize ve kanunen yetkili kamu kurumlarına
            aktarılabilir.
          </p>
          <p>
            <strong>Haklarınız:</strong> KVKK'nın 11. maddesi uyarınca, veri sorumlusuna başvurarak
            kişisel verileriniz hakkında bilgi talep etme, düzeltme, silme, itiraz etme ve kanuna
            aykırı işlenmesi halinde zararın giderilmesini talep etme haklarına sahipsiniz.
          </p>
          <p>Detaylı bilgi için turuncu@enorpa.com adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
