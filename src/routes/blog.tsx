import { Outlet, createFileRoute } from "@tanstack/react-router";
import { generateHreflangTags, SITE } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Enorpa Enerji" },
      {
        name: "description",
        content:
          "Enorpa Enerji blog yazıları. Endüstriyel ısıtma, buhar kazanları, sera sistemleri ve enerji verimliliği hakkında bilgiler.",
      },
      { property: "og:title", content: "Blog | Enorpa Enerji" },
      { property: "og:description", content: "Enorpa Enerji blog yazıları. Endüstriyel ısıtma ve enerji çözümleri." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/blog" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji blog yazıları." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/blog" },
      ...generateHreflangTags("/blog"),
    ],
  }),
  component: () => <Outlet />,
});
