import { createFileRoute } from "@tanstack/react-router";
import { generateHreflangTags, SITE } from "@/lib/seo";

export const Route = createFileRoute("/en/portfolio")({
  head: () => ({
    meta: [
      { title: "Projects | Enorpa Energy" },
      { name: "description", content: "Enorpa Energy projects. Greenhouse heating, steam boilers, and industrial heating solutions." },
      { property: "og:title", content: "Projects | Enorpa Energy" },
      { property: "og:description", content: "Enorpa Energy projects portfolio." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/en/portfolio" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Projects | Enorpa Energy" },
      { name: "twitter:description", content: "Enorpa Energy projects." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/en/portfolio" },
      ...generateHreflangTags("/en/portfolio"),
    ],
  }),
  component: () => null,
});
