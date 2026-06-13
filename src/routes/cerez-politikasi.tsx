import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cerez-politikasi")({
  head: () => ({
    meta: [
      { title: "Çerez Politikası | Enorpa Enerji" },
      { name: "description", content: "Enorpa Enerji çerez politikası." },
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
        <h1 className="font-display text-navy text-4xl font-bold uppercase mb-8">Çerez Politikası</h1>
        <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
          <p>Bu site, deneyiminizi iyileştirmek için çerezler kullanır. Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır.</p>
          <p><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gerekli olan çerezlerdir. Bu çerezler kapatılamaz.</p>
          <p><strong>Analitik Çerezler:</strong> Ziyaretçi trafiğini analiz etmek ve site performansını ölçmek için kullanılır.</p>
          <p><strong>İşlevsel Çerezler:</strong> Dil tercihleriniz gibi ayarlarınızı hatırlamak için kullanılır.</p>
          <p>Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilir veya çerezleri tamamen devre dışı bırakabilirsiniz. Ancak, çerezlerin devre dışı bırakılması sitenin bazı özelliklerinin çalışmamasına neden olabilir.</p>
          <p>Detaylı bilgi için turuncu@enorpa.com adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}
