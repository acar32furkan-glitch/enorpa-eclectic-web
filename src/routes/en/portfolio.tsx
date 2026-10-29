import { Outlet, createFileRoute, useChildMatches } from "@tanstack/react-router";
import { ProjectsList } from "@/components/ProjectsList";
import { generateHreflangTags, SITE } from "@/lib/seo";

function EnPortfolioLayout() {
  const children = useChildMatches();
  return children.length > 0 ? <Outlet /> : <ProjectsList lang="EN" />;
}

export const Route = createFileRoute("/en/portfolio")({
  head: () => ({
    meta: [
      { title: "Projects | Enorpa Energy" },
      {
        name: "description",
        content:
          "Enorpa Energy projects. 138+ completed projects in 26 countries: greenhouse heating, steam boilers and industrial heating solutions.",
      },
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
  component: EnPortfolioLayout,
});
