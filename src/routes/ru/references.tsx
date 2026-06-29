import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Star, Quote } from "lucide-react";
import { generateHreflangTags, SITE } from "@/lib/seo";

const testimonials = [
  {
    name: "Хасан Йылмаз",
    company: "Акташ Тарым Ltd.Şti",
    location: "Конья, Турция",
    text: "С котлом серии HAS от Enorpa наше потребление топлива снизилось на 30%. Спасибо профессиональной команде и качественному продукту.",
    rating: 5,
  },
  {
    name: "Мехмет Демир",
    company: "Демир Сера Ишлетмелери",
    location: "Анталья, Турция",
    text: "Мы увеличили производство на 20% с парогенератором серии Jasper. Команда Enorpa очень внимательна и профессиональна.",
    rating: 5,
  },
  {
    name: "Али Кая",
    company: "Кая Гыда A.Ş.",
    location: "Измир, Турция",
    text: "Мы достигли экономии энергии с помощью конденсатора. Быстрая установка, отличный сервис.",
    rating: 5,
  },
  {
    name: "Фатма Озтюрк",
    company: "Озтюрк Тарым",
    location: "Бурса, Турция",
    text: "Мы сэкономили время с системой отопления теплиц под ключ. Рекомендую.",
    rating: 5,
  },
];

export const Route = createFileRoute("/ru/references")({
  head: () => ({
    meta: [
      { title: "Референции | Enorpa Energy" },
      {
        name: "description",
        content: "Референции Enorpa Energy. 138+ проектов, 347+ клиентов в 26 странах. Отзывы клиентов и истории успеха.",
      },
      { property: "og:title", content: "Референции | Enorpa Energy" },
      {
        property: "og:description",
        content: "Референции Enorpa Energy. 138+ проектов, 347+ клиентов в 26 странах.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/ru/references" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "Enorpa Energy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Референции | Enorpa Energy" },
      { name: "twitter:description", content: "Референции Enorpa Energy. 138+ проектов в 26 странах." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/ru/references" },
      ...generateHreflangTags("/ru/references"),
    ],
  }),
  component: RuReferencesPage,
});

function RuReferencesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Референции" }]} />
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Референции
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Наши референции
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl">
            Мы обслуживаем 347+ клиентов в 138+ проектах в 26 странах.
            Опыт и истории успеха наших клиентов.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="font-display text-navy text-2xl font-bold uppercase mb-8">
            Отзывы клиентов
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
            Готовы к вашему следующему проекту
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Имея 25+ лет опыта и 138+ успешных проектов,
            мы предложим наиболее подходящее решение для отопления вашего объекта.
          </p>
          <a
            href="/ru/contact"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
          >
            Запросить цену
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
