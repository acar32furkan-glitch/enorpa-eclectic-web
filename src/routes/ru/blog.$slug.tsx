import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowLeft, Factory } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { generateBlogPostSchema, SITE } from "@/lib/seo";
import { cleanContent } from "@/lib/cleanContent";

export const Route = createFileRoute("/ru/blog/$slug")({
  head: ({ params }) => {
    const title = params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const schema = generateBlogPostSchema({ title, excerpt: "Блог", slug: params.slug, publishedAt: new Date().toISOString().split("T")[0] });
    return {
      meta: [
        { title: `${title} | Enorpa Blog` },
        { name: "description", content: "Блог" },
        { property: "og:title", content: `${title} | Enorpa Blog` },
        { property: "og:description", content: "Блог" },
        { property: "og:type", content: "article" },
        { property: "og:image", content: SITE.defaultOgImage },
        { property: "og:url", content: `https://enorpa.com/ru/blog/${params.slug}` },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${title} | Enorpa Blog` },
        { name: "twitter:description", content: "Блог" },
        { name: "twitter:image", content: SITE.defaultOgImage },
      ],
      links: [{ rel: "canonical", href: `https://enorpa.com/ru/blog/${params.slug}` }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
  component: RuBlogDetailPage,
  loader: async ({ params }) => {
    const { data } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).eq("language", "ru").single();
    return data;
  },
});

function RuBlogDetailPage() {
  const post = Route.useLoaderData() as any | null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-bold text-navy mb-4">Запись не найдена</h1>
            <Link to="/ru/blog" className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-5 py-2.5 hover:bg-orange-dark transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Назад к блогу
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Link to="/ru/blog" className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-navy-dark hover:text-orange mb-6">
          <ArrowLeft className="h-4 w-4" />
          Блог
        </Link>
        <article className="prose prose-lg max-w-none">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">Блог</div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}</time>
          </div>
          {post.featured_image_url && <img src={post.featured_image_url} alt={post.title} className="w-full rounded-lg mb-8" />}
          <div dangerouslySetInnerHTML={{ __html: cleanContent(post.content_html) }} />
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
