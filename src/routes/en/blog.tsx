import { Outlet, createFileRoute, useChildMatches } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Link } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { generateHreflangTags, SITE } from "@/lib/seo";

export const Route = createFileRoute("/en/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Enorpa Energy" },
      { name: "description", content: "Enorpa Energy blog articles. Industrial heating, steam boilers, greenhouse systems, and energy efficiency." },
      { property: "og:title", content: "Blog | Enorpa Energy" },
      { property: "og:description", content: "Enorpa Energy blog articles. Industrial heating and energy solutions." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:url", content: "https://enorpa.com/en/blog" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog | Enorpa Energy" },
      { name: "twitter:description", content: "Enorpa Energy blog articles." },
      { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [
      { rel: "canonical", href: "https://enorpa.com/en/blog" },
      ...generateHreflangTags("/en/blog"),
    ],
  }),
  component: EnBlogLayout,
  loader: async () => {
    const { data } = await (supabase as any)
      .from("blog_posts")
      .select("*")
      .eq("language", "en")
      .order("published_at", { ascending: false });
    return data || [];
  },
});

function EnBlogLayout() {
  const children = useChildMatches();
  return children.length > 0 ? <Outlet /> : <EnBlogIndexPage />;
}

function EnBlogIndexPage() {
  const posts = Route.useLoaderData() as any[];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Blog
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Blog
          </h1>
        </div>

        {posts.length === 0 ? (
          <div className="bg-steel border border-border p-8 md:p-12 max-w-2xl">
            <h2 className="font-display text-navy text-xl md:text-2xl font-bold uppercase mb-3">
              Articles coming soon
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Our English blog is being prepared. In the meantime, you can explore our product
              catalogue or contact our engineering team directly — we answer technical questions in
              English within one business day.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/en/products"
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-5 py-3 transition-colors"
              >
                View Products
              </a>
              <a
                href="/en/contact"
                className="inline-flex items-center gap-2 border border-navy text-navy hover:bg-navy hover:text-white font-display font-semibold uppercase tracking-wider text-sm px-5 py-3 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                to="/en/blog/$slug"
                params={{ slug: post.slug }}
                className="bg-white border border-border hover:border-orange transition-colors"
              >
                {post.featured_image_url && (
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    loading="eager"
                    decoding="async"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
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
