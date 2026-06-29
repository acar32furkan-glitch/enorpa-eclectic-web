import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Link } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { generateHreflangTags, SITE } from "@/lib/seo";

export const Route = createFileRoute("/ru/blog")({
  head: () => ({
    meta: [
      { title: "Блог | Enorpa Energy" },
      { name: "description", content: "Блог Enorpa Energy. Промышленное отопление, паровые котлы, системы отопления теплиц." },
      { property: "og:title", content: "Блог | Enorpa Energy" },
      { property: "og:description", content: "Блог Enorpa Energy. Промышленное отопление и энергоэффективность." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/ru/blog" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Блог | Enorpa Energy" },
      { name: "twitter:description", content: "Блог Enorpa Energy." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/ru/blog" },
      ...generateHreflangTags("/ru/blog"),
    ],
  }),
  component: RuBlogIndexPage,
  loader: async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("language", "ru")
      .order("published_at", { ascending: false });
    return data || [];
  },
});

function RuBlogIndexPage() {
  const posts = Route.useLoaderData() as any[];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Блог
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Блог
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">Записей пока нет.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                to="/ru/blog/$slug"
                params={{ slug: post.slug }}
                className="bg-white border border-border hover:border-orange transition-colors"
              >
                {post.featured_image_url && (
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.published_at).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}
                  </div>
                  <h2 className="font-display text-navy font-bold uppercase text-sm mb-2">{post.title}</h2>
                  {post.excerpt && <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
