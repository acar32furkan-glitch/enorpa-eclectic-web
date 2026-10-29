import { Outlet, createFileRoute } from "@tanstack/react-router";
import { generateHreflangTags, SITE } from "@/lib/seo";

export const Route = createFileRoute("/urunler")({
  head: () => ({
    meta: [
      { title: "Ürünlerimiz | Enorpa Enerji" },
      {
        name: "description",
        content:
          "Enorpa Enerji ürün kataloğu: sıcak su, buhar, sıcak hava ve kızgın su kazanları, brülör, baca, ekonomizer ve yedek parça çözümleri.",
      },
      { property: "og:title", content: "Ürünlerimiz | Enorpa Enerji" },
      {
        property: "og:description",
        content: "Enorpa Enerji ürün kataloğu. Endüstriyel ısıtma çözümleri ve teknik föyler.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/urunler" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ürünlerimiz | Enorpa Enerji" },
      { name: "twitter:description", content: "Enorpa Enerji ürün kataloğu. 24+ ürün." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/urunler" },
      ...generateHreflangTags("/urunler"),
    ],
  }),
  component: () => <Outlet />,
});
