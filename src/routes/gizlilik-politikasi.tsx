import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/gizlilik-politikasi")({
  head: () => ({
    meta: [
      { title: "Gizlilik Politikası | Enorpa Enerji" },
      { name: "description", content: "Enorpa Enerji gizlilik politikası." },
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
        <h1 className="font-display text-navy text-4xl font-bold uppercase mb-8">Gizlilik Politikası</h1>
        <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
          <p>Bu site Enorpa Enerji tarafından işletilmektedir. Kişisel verileriniz, bu gizlilik politikası çerçevesinde işlenmektedir.</p>
          <p>Toplanan bilgiler yalnızca hizmet kalitesini artırmak, talep ve siparişleri işleme koymak ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır.</p>
          <p>Kişisel verileriniz üçüncü taraflarla yalnızca açık rızanız veya yasal zorunluluk halinde paylaşılır.</p>
          <p>Güvenliğiniz için SSL sertifikası ile korunan sitemizde, verileriniz şifrelenmiş olarak iletilir.</p>
          <p>Bu politika ile ilgili sorularınız için turuncu@enorpa.com adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}
