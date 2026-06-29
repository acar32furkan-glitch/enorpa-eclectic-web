import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Star, Quote } from "lucide-react";
import { generateHreflangTags, SITE } from "@/lib/seo";

const testimonials = [
  {
    name: "Hasan Yılmaz",
    company: "Aktaş Tarım Ltd.Şti",
    location: "Konya, Turkey",
    text: "With Enorpa HAS Series boiler, our fuel consumption decreased by 30%. Thanks to the professional team and quality product.",
    rating: 5,
  },
  {
    name: "Mehmet Demir",
    company: "Demir Sera İşletmeleri",
    location: "Antalya, Turkey",
    text: "We increased our production by 20% with Jasper Series steam generator. Enorpa team is very attentive and professional.",
    rating: 5,
  },
  {
    name: "Ali Kaya",
    company: "Kaya Gıda A.Ş.",
    location: "İzmir, Turkey",
    text: "We achieved energy savings with the condenser. Fast installation, excellent service.",
    rating: 5,
  },
  {
    name: "Fatma Öztürk",
    company: "Öztürk Tarım",
    location: "Bursa, Turkey",
    text: "We saved time with turnkey greenhouse heating system. I recommend it.",
    rating: 5,
  },
];

export const Route = createFileRoute("/en/references")({
  head: () => ({
    meta: [
      { title: "References | Enorpa Energy" },
      {
        name: "description",
        content: "Enorpa Energy references. 138+ projects, 347+ customers in 26 countries. Customer reviews and success stories.",
      },
      { property: "og:title", content: "References | Enorpa Energy" },
      {
        property: "og:description",
        content: "Enorpa Energy references. 138+ projects, 347+ customers in 26 countries.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/en/references" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Enorpa Energy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "References | Enorpa Energy" },
      { name: "twitter:description", content: "Enorpa Energy references. 138+ projects in 26 countries." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/en/references" },
      ...generateHreflangTags("/en/references"),
    ],
  }),
  component: EnReferencesPage,
});

function EnReferencesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Breadcrumbs items={[{ name: "References" }]} />
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            References
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Our References
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl">
            We serve 347+ customers in 138+ projects across 26 countries.
            Our customers' experiences and success stories.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="font-display text-navy text-2xl font-bold uppercase mb-8">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white border border-border p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-orange text-orange" />
                  ))}
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <Quote className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground italic">{testimonial.text}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-navy-dark text-white flex items-center justify-center font-display font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-navy">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.company} · {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy-dark text-white p-8 text-center">
          <h2 className="font-display text-2xl font-bold uppercase mb-4">
            Ready for Your Next Project
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            With 25+ years of experience and 138+ successful projects,
            let us provide the most suitable solution for your facility's heating needs.
          </p>
          <a
            href="/en/contact"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
