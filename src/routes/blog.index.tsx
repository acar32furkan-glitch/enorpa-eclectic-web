import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

const stripShortcodes = (html: string) => {
  return html.replace(/\[vc_[^\]]+\]|\[\/vc_[^\]]+\]|\[\w+-[^\]]+\]/g, "").replace(/\s+/g, " ").trim();
};

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Enorpa" },
      { name: "description", content: "Enorpa'dan en güncel haberler ve blog yazıları" },
    ],
    links: [{ rel: "canonical", href: "https://enorpa.com/blog" }],
  }),
  component: BlogListPage,
  loader: async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });
    return (data || []).map((post) => ({
      ...post,
      slug: decodeURIComponent(post.slug),
    }));
  },
});

interface BlogPost {
  slug: string;
  title: string;
  content_html: string;
  excerpt: string;
  published_at: string;
  featured_image_url?: string;
}

function BlogListPage() {
  const posts = Route.useLoaderData() as BlogPost[];

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-bold text-navy mb-4">Blog Yazıları</h1>
            <p className="text-muted-foreground">Henüz blog yazısı yayınlanmadı.</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-12">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Blog
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            Enorpa Blog
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {post.featured_image_url ? (
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="p-6">
                <h2 className="font-display text-xl font-bold text-navy mb-3 uppercase group-hover:text-orange transition-colors">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="line-clamp-2">
                    {post.title}
                  </Link>
                </h2>
{post.excerpt && (
                   <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                     {stripShortcodes(post.excerpt)}
                   </p>
                 )}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center gap-1 text-orange font-display uppercase tracking-wider text-xs font-semibold hover:gap-2 transition-all"
                  >
                    Devam
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}