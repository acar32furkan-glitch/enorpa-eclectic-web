import { createFileRoute } from "@tanstack/react-router";
import { generateHreflangTags, SITE } from "@/lib/seo";

export const Route = createFileRoute("/ru/portfolio")({
  head: () => ({
    meta: [
      { title: "Проекты | Enorpa Energy" },
      { name: "description", content: "Проекты Enorpa Energy. Системы отопления теплиц, паровые котлы." },
      { property: "og:title", content: "Проекты | Enorpa Energy" },
      { property: "og:description", content: "Портфолио проектов Enorpa Energy." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/ru/portfolio" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Проекты | Enorpa Energy" },
      { name: "twitter:description", content: "Проекты Enorpa Energy." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/ru/portfolio" },
      ...generateHreflangTags("/ru/portfolio"),
    ],
  }),
  component: () => null,
});
