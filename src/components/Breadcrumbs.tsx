import { Link } from "@tanstack/react-router";
import { generateBreadcrumbSchema, SITE } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { name: "Anasayfa", href: "/" },
    ...items,
  ];

  const schema = generateBreadcrumbSchema(
    allItems.map((item) => ({
      name: item.name,
      url: item.href ? `${SITE.url}${item.href}` : SITE.url,
    }))
  );

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-2 flex-wrap">
          {allItems.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {item.href ? (
                <Link to={item.href} className="hover:text-orange transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-navy font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
