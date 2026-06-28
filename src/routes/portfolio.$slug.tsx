import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/portfolio/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} | Enorpa Enerji` },
      { name: "description", content: `${params.slug.replace(/-/g, " ")} projesi - Enorpa Enerji sera ısıtma, buhar kazanı ve kurutma projeleri.` },
      { property: "og:title", content: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} | Enorpa Enerji` },
      { property: "og:description", content: `${params.slug.replace(/-/g, " ")} projesi - Enorpa Enerji.` },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/logo.png" },
      { property: "og:url", content: `https://enorpa.com/portfolio/${params.slug}` },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Enorpa Enerji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} | Enorpa Enerji` },
      { name: "twitter:description", content: `${params.slug.replace(/-/g, " ")} projesi.` },
      { name: "twitter:image", content: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/logo.png" },
    ],
    links: [
      { rel: "canonical", href: `https://enorpa.com/portfolio/${params.slug}` },
    ],
  }),
  component: ProjectDetailPage,
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", params.slug)
      .single();
    return data;
  },
});

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  customer: string;
  description: string;
  project_type: string;
  location: string;
  year: string;
  featured_image_url?: string;
}

function ProjectDetailPage() {
  const project = Route.useLoaderData() as Project | null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-bold text-navy mb-4">Proje Bulunamadı</h1>
            <p className="text-muted-foreground mb-6">Aradığınız proje sistemde kayıtlı değil.</p>
            <Link
              to="/projeler"
              className="inline-flex items-center gap-2 bg-orange text-white font-display uppercase tracking-wider text-sm px-5 py-2.5 hover:bg-orange-dark transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Projelere Dön
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
        <Breadcrumbs items={[
          { name: "Projeler", href: "/projeler" },
          { name: project.title },
        ]} />

        <Link
          to="/projeler"
          className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-navy-dark hover:text-orange mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Projeler
        </Link>

        <article>
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            Proje
          </div>
          <h1 className="font-display text-navy text-3xl md:text-4xl font-bold uppercase mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {project.year}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {project.location}
            </div>
          </div>

          <div className="bg-white border border-border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Proje</span>
                <p className="text-navy font-medium mt-1">{project.project_type}</p>
              </div>
              {project.customer && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Müşteri</span>
                  <p className="text-navy font-medium mt-1">{project.customer}</p>
                </div>
              )}
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Konum</span>
                <p className="text-navy font-medium mt-1">{project.location}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Yıl</span>
                <p className="text-navy font-medium mt-1">{project.year}</p>
              </div>
            </div>
          </div>

          {project.featured_image_url && (
            <figure className="mb-8">
              <img
                src={project.featured_image_url}
                alt={project.title}
                className="w-full rounded-lg"
              />
            </figure>
          )}

          <div className="prose prose-lg max-w-none">
            <h2 className="font-display text-navy text-xl font-bold uppercase mb-4">Neler Yapıldı?</h2>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          <div className="mt-12 bg-navy-dark text-white p-6 text-center">
            <h3 className="font-display text-lg font-bold uppercase mb-2">Benzer Bir Proje mi Planlıyorsunuz?</h3>
            <p className="text-white/80 text-sm mb-4">Uzman ekibimiz sizin için en uygun çözümü tasarlasın.</p>
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-5 py-2.5 transition-colors"
            >
              Teklif Alın
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
