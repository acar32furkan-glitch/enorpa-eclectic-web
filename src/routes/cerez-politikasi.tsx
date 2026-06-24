import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/cerez-politikasi")({
  head: () => ({
    meta: [
      { title: "Çerez Politikası | Enorpa Enerji" },
      { name: "description", content: "Enorpa Enerji çerez politikası." },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/cerez-politikasi" },
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
          Çerez Politikası
        </h1>
        <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
          <p>
            Bu site, deneyiminizi iyileştirmek için çerezler kullanır. Çerezler, web sitemizi
            ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır.
          </p>
          <p>
            <strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gerekli olan
            çerezlerdir. Bu çerezler kapatılamaz.
          </p>
          <p>
            <strong>Analitik Çerezler:</strong> Ziyaretçi trafiğini analiz etmek ve site
            performansını ölçmek için kullanılır.
          </p>
          <p>
            <strong>İşlevsel Çerezler:</strong> Dil tercihleriniz gibi ayarlarınızı hatırlamak için
            kullanılır.
          </p>
          <p>
            Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilir veya çerezleri tamamen devre
            dışı bırakabilirsiniz. Ancak, çerezlerin devre dışı bırakılması sitenin bazı
            özelliklerinin çalışmamasına neden olabilir.
          </p>
          <p>Detaylı bilgi için turuncu@enorpa.com adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
