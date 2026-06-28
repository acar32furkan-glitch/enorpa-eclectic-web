import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowRight, Factory } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

function cleanContent(html: string): string {
  let result = html;
  result = result
    .replace(/\[vc_[^\]]*\]?/g, '')
    .replace(/\[\/vc_[^\]]*\]?/g, '')
    .replace(/\[[^\]]*\]?/g, '');
  return result
    .replace(/&#8221;|&#8220;/g, '"')
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8230;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#[0-9]+;/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/\s*data-\w+="[^"]*"/g, '')
    .replace(/\s*data-\w+='[^']*'/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<h[1-6]>\s*<\/h[1-6]>/g, '')
    .replace(/Lorem ipsum[\s\S]*?(?=<|$)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function getExcerpt(post: BlogPost): string {
  const cleaned = cleanContent(post.excerpt || '');
  if (cleaned && cleaned.length > 10) return cleaned;
  const contentText = stripHtml(cleanContent(post.content_html));
  return contentText.slice(0, 150) + (contentText.length > 150 ? '...' : '');
}

const trOnlySlugs = [
  'kondenser-nedir-calisma-prensibi-verim-ve-uygulamalar-2',
  'has-serisi-sicak-hava-kazanlari',
  'turmalin-serisi-buhar-kazani-endustriyel-isitmanin-yeni-yuzu',
  'neden-enorpa',
  'domat-expo-antalya-2019',
  'greenhouse-almatin-kazakistan',
  'growtech-antalya-23',
  'agroworld-ozbekistan'
];

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
      .in('slug', trOnlySlugs)
      .order("published_at", { ascending: false });
    return data || [];
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
                <div className="w-full h-48 bg-navy-dark flex items-center justify-center">
                  <Factory className="h-12 w-12 text-orange/50" />
                </div>
              )}
              <div className="p-6">
                <h2 className="font-display text-xl font-bold text-navy mb-3 uppercase group-hover:text-orange transition-colors">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="line-clamp-2">
                    {post.title}
                  </Link>
                </h2>
<p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {getExcerpt(post)}
                    </p>
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