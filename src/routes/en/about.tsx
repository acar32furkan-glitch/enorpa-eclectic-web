import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SITE, generateHreflangTags } from "@/lib/seo";

export const Route = createFileRoute("/en/about")({
  head: () => ({
    meta: [
      { title: "About Us | Enorpa Energy" },
      { name: "description", content: "Learn about Enorpa Energy. 25+ years of experience in industrial heating systems." },
      { property: "og:title", content: "About Us | Enorpa Energy" },
      { property: "og:description", content: "25+ years of experience in industrial heating. TSE, CE, ASME certified." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/en/about" },
      { property: "og:locale", content: "en_US" },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/en/about" },
      ...generateHreflangTags("/en/about"),
    ],
  }),
  component: EnAboutPage,
});

function EnAboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mb-8">About Us</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-6">
            Enorpa Energy has been carrying out production, project design and contracting works on steam,
            hot water, hot air and hot oil systems as well as fuel tanks, horizontal and vertical pressure vessels.
            We continue our activities to meet the heating, storage and steam needs of many different sectors.
          </p>

          <h2 className="font-display text-navy text-2xl font-bold uppercase mt-8 mb-4">Certifications</h2>
          <ul className="text-muted-foreground space-y-2">
            <li>TSE (Turkish Standards Institute)</li>
            <li>CE (European Conformity)</li>
            <li>ASME (American Society of Mechanical Engineers)</li>
            <li>EAC (Eurasian Conformity)</li>
          </ul>

          <h2 className="font-display text-navy text-2xl font-bold uppercase mt-8 mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            As Enorpa Energy, our mission is to make industrial processes more efficient by offering sustainable
            energy solutions and to provide our customers with innovative, reliable and environmentally friendly technologies.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
