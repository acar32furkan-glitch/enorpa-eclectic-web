import { generateHeadTags, generateHreflangTags, SITE } from "@/lib/seo";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
  structuredData?: object[];
}

export function SeoHead(props: SeoHeadProps) {
  const config = {
    ...props,
    ogLocale: "tr_TR",
  };

  const { meta, links, scripts } = generateHeadTags(config);
  const hreflangLinks = generateHreflangTags(props.canonical.replace(SITE.url, ''));

  return (
    <>
      {meta.map((tag, i) => (
        <meta key={`meta-${i}`} {...tag} />
      ))}
      {[...links, ...hreflangLinks].map((link, i) => (
        <link key={`link-${i}`} {...link} />
      ))}
      {scripts.map((script, i) => (
        <script key={`script-${i}`} type={script.type}>
          {script.children}
        </script>
      ))}
    </>
  );
}
