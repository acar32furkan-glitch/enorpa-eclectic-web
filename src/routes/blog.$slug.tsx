import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowLeft, Factory } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { generateBlogPostSchema, generateHreflangTags, SITE } from "@/lib/seo";
import { generateExcerpt } from "@/lib/cleanContent";

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

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const title = params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const description = `${title} - Enorpa Enerji blog yazısı. Endüstriyel ısıtma, buhar kazanları ve sera sistemleri hakkında bilgi.`;
    const schema = generateBlogPostSchema({
      title,
      excerpt: description,
      slug: params.slug,
      publishedAt: new Date().toISOString().split("T")[0],
    });

    return {
      meta: [
        { title: `${title} | Enorpa Blog` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | Enorpa Blog` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: SITE.defaultOgImage },
        { property: "og:url", content: `https://enorpa.com/blog/${params.slug}` },
        { property: "og:locale", content: "tr_TR" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${title} | Enorpa Blog` },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: SITE.defaultOgImage },
      ],
      links: [
        { rel: "canonical", href: `https://enorpa.com/blog/${params.slug}` },
        ...generateHreflangTags(`/blog/${params.slug}`),
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
  component: BlogDetailPage,
  loader: async ({ params }) => {
    const { slug } = params;
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();
    return data;
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

function BlogDetailPage() {
  const post = Route.useLoaderData() as BlogPost | null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-bold text-navy mb-4">Yazı Bulunamadı</h1>
            <p className="text-muted-foreground mb-6">Aradığınız blog yazısı sistemde kayıtlı değil.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-5 py-2.5 hover:bg-orange-dark transition-colors"
            >
              Blog listesine dön
              <ArrowLeft className="h-4 w-4" />
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
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-navy-dark hover:text-orange mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Blog Listesi
        </Link>

        <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-h2:text-navy prose-h3:text-navy">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Blog
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {post.featured_image_url ? (
            <figure className="mb-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                fetchpriority="high"
                className="w-full rounded-lg"
              />
            </figure>
          ) : (
            <figure className="mb-8">
              <div className="w-full h-64 bg-navy-dark rounded-lg flex items-center justify-center">
                <Factory className="h-16 w-16 text-orange/30" />
              </div>
            </figure>
          )}

          <div dangerouslySetInnerHTML={{ __html: cleanContent(post.content_html) }} />
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}