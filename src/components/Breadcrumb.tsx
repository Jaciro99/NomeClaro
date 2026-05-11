import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/names";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbItems = [{ href: "/", label: "Início" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="transition hover:text-coral" href="/">
              Início
            </Link>
          </li>
          {items.map((item) => (
            <li className="flex items-center gap-2" key={item.label}>
              <span aria-hidden="true" className="text-ink/30">
                /
              </span>
              {item.href ? (
                <Link className="transition hover:text-coral" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-ink">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: item.href ? absoluteUrl(item.href) : undefined
          }))
        }}
      />
    </>
  );
}
