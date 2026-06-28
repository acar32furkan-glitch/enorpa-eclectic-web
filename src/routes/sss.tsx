import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { generateFaqSchema, SITE } from "@/lib/seo";

const faqs = [
  {
    question: "What types of boilers does Enorpa Energy manufacture?",
    answer: "Enorpa Energy manufactures steam boilers, hot water boilers, hot air boilers, superheated water boilers, and fuel tanks. Our products are designed for industrial and commercial heating applications.",
  },
  {
    question: "What certifications do your products have?",
    answer: "Our products are certified by TSE (Turkish Standards Institute), CE (European Conformity), ASME (American Society of Mechanical Engineers), and EAC (Eurasian Conformity).",
  },
  {
    question: "Do you provide installation services?",
    answer: "Yes, we provide turnkey installation services including project design, assembly, piping, electrical connections, and commissioning.",
  },
  {
    question: "What is a condenser and how does it work?",
    answer: "A condenser is a heat exchanger that recovers waste heat from flue gases. It can improve boiler efficiency by 5-15% depending on the system.",
  },
  {
    question: "Do you provide spare parts support?",
    answer: "Yes, we provide lifetime spare parts support for all our products. Our team ensures uninterrupted operation with quick delivery.",
  },
  {
    question: "How can I get a quote?",
    answer: "You can contact us via phone at +90 850 471 2100, email at turuncu@enorpa.com, or through our contact form on the website.",
  },
  {
    question: "What is the warranty period for Enorpa products?",
    answer: "All Enorpa products come with a 2-year warranty covering manufacturing defects. Extended warranty options are available upon request.",
  },
  {
    question: "Which countries do you export to?",
    answer: "Enorpa Energy exports to 26 countries worldwide including Uzbekistan, Kazakhstan, Russia, Turkey, and many European and Middle Eastern countries.",
  },
];

export const Route = createFileRoute("/sss")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Enorpa Energy" },
      { name: "description", content: "Frequently asked questions about Enorpa Energy products and services." },
      { property: "og:title", content: "FAQ | Enorpa Energy" },
      { property: "og:description", content: "Frequently asked questions about boilers, installation, and service." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/sss" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(generateFaqSchema(faqs)) }],
  }),
  component: SssPage,
});

function SssPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            FAQ
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-border">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-navy font-bold uppercase text-sm pr-4">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-orange flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
