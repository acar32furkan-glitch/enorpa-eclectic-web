import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/ru/about")({
  head: () => ({
    meta: [
      { title: "О компании | Enorpa Energy" },
      { name: "description", content: "Узнайте о Enorpa Energy. Более 25 лет опыта в промышленном отоплении." },
      { property: "og:title", content: "О компании | Enorpa Energy" },
      { property: "og:description", content: "Опыт в промышленном отоплении. Сертификаты TSE, CE, ASME." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/ru/about" },
      { property: "og:locale", content: "ru_RU" },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/ru/about" }],
  }),
  component: RuAboutPage,
});

function RuAboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mb-8">О компании</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-6">
            Enorpa Energy осуществляет производство, проектирование и монтаж систем пара,
            горячей воды, горячего воздуха, а также топливных баков и сосудов под давлением.
          </p>
          <h2 className="font-display text-navy text-2xl font-bold uppercase mt-8 mb-4">Сертификаты</h2>
          <ul className="text-muted-foreground space-y-2">
            <li>TSE (Турецкий институт стандартов)</li>
            <li>CE (Европейское соответствие)</li>
            <li>ASME (Американское общество инженеров-механиков)</li>
            <li>EAC (Евразийское соответствие)</li>
          </ul>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
