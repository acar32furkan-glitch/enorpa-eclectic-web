import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SITE, generateHreflangTags } from "@/lib/seo";

export const Route = createFileRoute("/en/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Enorpa Energy" },
      { name: "description", content: "Contact Enorpa Energy for industrial heating solutions. Phone, email, and address." },
      { property: "og:title", content: "Contact | Enorpa Energy" },
      { property: "og:description", content: "Get in touch with Enorpa Energy. We're here to help." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/en/contact" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact | Enorpa Energy" },
      { name: "twitter:description", content: "Get in touch with Enorpa Energy. We're here to help." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/en/contact" },
      ...generateHreflangTags("/en/contact"),
    ],
  }),
  component: EnContactPage,
});

function EnContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-border p-6 text-center">
            <Phone className="h-8 w-8 text-orange mx-auto mb-3" />
            <h3 className="font-display text-navy font-bold uppercase mb-2">Phone</h3>
            <a href="tel:+908504712100" className="text-sm text-muted-foreground hover:text-orange">+90 850 471 2100</a>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <Mail className="h-8 w-8 text-orange mx-auto mb-3" />
            <h3 className="font-display text-navy font-bold uppercase mb-2">Email</h3>
            <a href="mailto:turuncu@enorpa.com" className="text-sm text-muted-foreground hover:text-orange">turuncu@enorpa.com</a>
          </div>
          <div className="bg-white border border-border p-6 text-center">
            <MapPin className="h-8 w-8 text-orange mx-auto mb-3" />
            <h3 className="font-display text-navy font-bold uppercase mb-2">Address</h3>
            <p className="text-sm text-muted-foreground">Sanayi Mah. 3231 Sk. No:12 Merkez / ISPARTA</p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
