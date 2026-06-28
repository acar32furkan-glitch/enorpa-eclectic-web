import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/ru/contact")({
  head: () => ({
    meta: [
      { title: "Контакты | Enorpa Energy" },
      { name: "description", content: "Свяжитесь с Enorpa Energy. Телефон, email, адрес." },
      { property: "og:title", content: "Контакты | Enorpa Energy" },
      { property: "og:description", content: "Свяжитесь с нами. Мы готовы помочь." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/ru/contact" },
      { property: "og:locale", content: "ru_RU" },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/ru/contact" }],
  }),
  component: RuContactPage,
});

function RuContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mb-8">Контакты</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-border p-6 text-center">
            <Phone className="h-8 w-8 text-orange mx-auto mb-3" />
            <h3 className="font-display text-navy font-bold uppercase mb-2">Телефон</h3>
            <a href="tel:+908504712100" className="text-sm text-muted-foreground hover:text-orange">+90 850 471 2100</a>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <Mail className="h-8 w-8 text-orange mx-auto mb-3" />
            <h3 className="font-display text-navy font-bold uppercase mb-2">Email</h3>
            <a href="mailto:turuncu@enorpa.com" className="text-sm text-muted-foreground hover:text-orange">turuncu@enorpa.com</a>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <MapPin className="h-8 w-8 text-orange mx-auto mb-3" />
            <h3 className="font-display text-navy font-bold uppercase mb-2">Адрес</h3>
            <p className="text-sm text-muted-foreground">Sanayi Mah. 3231 Sk. No:12 Merkez / ISPARTA</p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
