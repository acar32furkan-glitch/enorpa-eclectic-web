import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/kvkk")({
  head: () => ({
    meta: [
      { title: "KVKK Aydınlatma Metni | Enorpa Enerji" },
      { name: "description", content: "Enorpa Enerji KVKK aydınlatma metni." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-navy-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight">ENORPA</span>
            <span className="h-2 w-2 rounded-full bg-orange" />
          </Link>
          <Link to="/" className="text-xs uppercase tracking-wider text-white/70 hover:text-orange font-display">← Anasayfa</Link>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <h1 className="font-display text-navy text-4xl font-bold uppercase mb-8">KVKK Aydınlatma Metni</h1>
        <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
          <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Enorpa Enerji olarak kişisel verilerinizin işlenmesine ilişkin sizleri bilgilendirmek isteriz.</p>
          <p><strong>Veri Sorumlusu:</strong> Enorpa Enerji, Sanayi Mah. 3231 Sk. No:12, Merkez / ISPARTA</p>
          <p><strong>Veri İşleme Amacı:</strong> Kişisel verileriniz; ürün ve hizmetlerimizin sunulması, müşteri memnuniyetinin artırılması, talep ve şikayetlerin takibi, pazarlama faaliyetleri ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.</p>
          <p><strong>Verilerin Aktarılması:</strong> Kişisel verileriniz, yukarıda belirtilen amaçlar doğrultusunda, iş ortaklarımıza, tedarikçilerimize ve kanunen yetkili kamu kurumlarına aktarılabilir.</p>
          <p><strong>Haklarınız:</strong> KVKK'nın 11. maddesi uyarınca, veri sorumlusuna başvurarak kişisel verileriniz hakkında bilgi talep etme, düzeltme, silme, itiraz etme ve kanuna aykırı işlenmesi halinde zararın giderilmesini talep etme haklarına sahipsiniz.</p>
          <p>Detaylı bilgi için turuncu@enorpa.com adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}
