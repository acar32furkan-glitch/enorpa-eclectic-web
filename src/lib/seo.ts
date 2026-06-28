import { supabase } from "@/integrations/supabase/client";
import type { SupportedLang } from "./i18n";
import { SUPPORTED_LANGS } from "./i18n";

export const SITE = {
  name: "Enorpa Enerji",
  url: "https://enorpa.com",
  logo: "https://enorpa.com/favicon.ico",
  phone: "+908504712100",
  email: "turuncu@enorpa.com",
  instagram: "https://instagram.com/enorpaenerji",
  defaultOgImage: "https://hmhkrrbvkafwcbyyvezl.supabase.co/storage/v1/object/public/product-images/brand/logo.png",
  defaultLang: "tr" as SupportedLang,
};

export interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  ogLocale?: string;
  twitterCard?: string;
  noIndex?: boolean;
  structuredData?: object[];
}

export function generateHeadTags(config: SeoConfig) {
  const meta: any[] = [
    { title: config.title },
    { name: "description", content: config.description },
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "og:type", content: config.ogType || "website" },
    { property: "og:image", content: config.ogImage || SITE.defaultOgImage },
    { property: "og:url", content: config.canonical },
    { property: "og:locale", content: config.ogLocale || "tr_TR" },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: config.twitterCard || "summary_large_image" },
    { name: "twitter:title", content: config.title },
    { name: "twitter:description", content: config.description },
    { name: "twitter:image", content: config.ogImage || SITE.defaultOgImage },
    { name: "twitter:site", content: "@enorpaenerji" },
  ];

  if (config.noIndex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  const links = [{ rel: "canonical", href: config.canonical }];

  const scripts = config.structuredData?.map((data) => ({
    type: "application/ld+json",
    children: JSON.stringify(data),
  })) || [];

  return { meta, links, scripts };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${SITE.url}/urunler/${product.slug}`,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@type": "Organization", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/urunler/${product.slug}`,
    },
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sanayi Mah. 3231 Sk. No:12",
      addressLocality: "Isparta",
      addressCountry: "TR",
    },
    openingHours: "Mo-Fr 08:00-18:00",
    sameAs: [SITE.instagram],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    telephone: SITE.phone,
    email: SITE.email,
    sameAs: [SITE.instagram],
    location: [
      {
        "@type": "Place",
        name: "Merkez Ofis",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sanayi Mah. 3231 Sk. No:12",
          addressLocality: "Isparta",
          addressCountry: "TR",
        },
      },
      {
        "@type": "Place",
        name: "Fabrika 2 Isparta OSB",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Vatan OSB Mah. 304. Cad. No:12",
          addressLocality: "Isparta",
          addressCountry: "TR",
        },
      },
      {
        "@type": "Place",
        name: "Fabrika 3 Karaman OSB",
        address: {
          "@type": "PostalAddress",
          streetAddress: "OSB Mah. 17. Cad. No:49",
          addressLocality: "Karaman",
          addressCountry: "TR",
        },
      },
    ],
  };
}

export function generateHreflangTags(path: string) {
  const links: { rel: string; hrefLang: string; href: string }[] = SUPPORTED_LANGS.map((lang) => ({
    rel: "alternate",
    hrefLang: lang,
    href: `${SITE.url}${lang === "tr" ? "" : "/" + lang}${path}`,
  }));
  links.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: `${SITE.url}${path}`,
  });
  return links;
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export async function fetchBlogPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data;
}

export async function fetchAllBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return data;
}
