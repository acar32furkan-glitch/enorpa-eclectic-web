import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { generateArticleSchema, generateHreflangTags, SITE } from "@/lib/seo";

export const Route = createFileRoute("/ru/portfolio/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} | Enorpa Energy` },
      { name: "description", content: "Детали проекта - Enorpa Energy." },
      { property: "og:title", content: `${params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} | Enorpa Energy` },
      { property: "og:description", content: "Детали проекта." },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: `https://enorpa.com/ru/portfolio/${params.slug}` },
      { property: "og:locale", content: "ru_RU" },
    ],
    links: [{ rel: "canonical", href: `https://enorpa.com/ru/portfolio/${params.slug}` },
      ...generateHreflangTags(`/ru/portfolio/${params.slug}`),
    ],
  }),
  component: RuPortfolioDetailPage,
  loader: async ({ params }) => {
    const { data } = await supabase.from("projects").select("*").eq("slug", params.slug).eq("language", "ru").single();
    return data;
  },
});

function RuPortfolioDetailPage() {
  const project = Route.useLoaderData() as any | null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-bold text-navy mb-4">Проект не найден</h1>
            <Link to="/ru/projects" className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-5 py-2.5">Назад к проектам</Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleSchema({
        title: project.title,
        description: project.description || "Проект Enorpa Energy",
        image: project.featured_image_url,
        slug: `ru/portfolio/${params.slug}`,
      })) }} />
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Link to="/ru/projects" className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-navy-dark hover:text-orange mb-6">
          <ArrowLeft className="h-4 w-4" /> Проекты
        </Link>
        <h1 className="font-display text-navy text-3xl md:text-4xl font-bold uppercase mb-4">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{project.year}</div>
        </div>
        {project.description && <div className="prose prose-lg max-w-none"><p className="text-muted-foreground leading-relaxed">{project.description}</p></div>}
      </div>
      <SiteFooter />
    </div>
  );
}
