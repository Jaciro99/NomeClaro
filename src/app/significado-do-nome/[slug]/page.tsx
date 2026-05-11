import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { NameCard } from "@/components/NameCard";
import { SearchBox } from "@/components/SearchBox";
import { getAllNames, getNameBySlug, getRelatedEntries, absoluteUrl } from "@/lib/names";

type NamePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllNames().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: NamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getNameBySlug(slug);

  if (!entry) {
    return {};
  }

  const url = absoluteUrl(`/significado-do-nome/${entry.slug}`);

  return {
    title: entry.metaTitle,
    description: entry.metaDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: entry.metaTitle,
      description: entry.metaDescription,
      url,
      type: "article",
      locale: "pt_BR"
    }
  };
}

export default async function NamePage({ params }: NamePageProps) {
  const { slug } = await params;
  const entry = getNameBySlug(slug);

  if (!entry) {
    notFound();
  }

  const relatedEntries = getRelatedEntries(entry, 6);
  const suggestions = getAllNames()
    .filter((item) => item.slug !== entry.slug && !relatedEntries.some((related) => related.slug === item.slug))
    .slice(0, 6);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.metaTitle,
          description: entry.metaDescription,
          mainEntityOfPage: absoluteUrl(`/significado-do-nome/${entry.slug}`),
          about: {
            "@type": "DefinedTerm",
            name: entry.name,
            description: entry.meaning,
            inDefinedTermSet: "Significado de nomes"
          }
        }}
      />
      <article className="mx-auto max-w-6xl px-5 py-10">
        <Breadcrumb items={[{ label: `Significado do nome ${entry.name}` }]} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <header className="rounded-md border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
                Significado do nome
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-6xl">
                {entry.name}
              </h1>
              <p className="mt-5 max-w-2xl text-2xl font-bold leading-snug text-sage">
                {entry.meaning}
              </p>
              <dl className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-md bg-mist p-4">
                  <dt className="text-xs font-black uppercase tracking-[0.16em] text-ink/45">Origem</dt>
                  <dd className="mt-2 font-bold text-ink">{entry.origin}</dd>
                </div>
                <div className="rounded-md bg-mist p-4">
                  <dt className="text-xs font-black uppercase tracking-[0.16em] text-ink/45">Gênero</dt>
                  <dd className="mt-2 font-bold capitalize text-ink">{entry.gender}</dd>
                </div>
                <div className="rounded-md bg-mist p-4">
                  <dt className="text-xs font-black uppercase tracking-[0.16em] text-ink/45">Categorias</dt>
                  <dd className="mt-2 font-bold text-ink">{entry.categories.length}</dd>
                </div>
              </dl>
            </header>

            <div className="mt-6">
              <AdPlaceholder position="top" />
            </div>

            <section className="mt-8 rounded-md border border-ink/10 bg-white p-6 shadow-line sm:p-8">
              <h2 className="text-3xl font-black text-ink">Origem e significado de {entry.name}</h2>
              <p className="mt-4 text-lg leading-8 text-ink/72">{entry.description}</p>
            </section>

            <section className="mt-6 rounded-md border border-ink/10 bg-white p-6 shadow-line sm:p-8">
              <h2 className="text-3xl font-black text-ink">Curiosidades sobre {entry.name}</h2>
              <ul className="mt-5 grid gap-3">
                {entry.curiosities.map((curiosity) => (
                  <li className="rounded-md bg-mist p-4 leading-7 text-ink/72" key={curiosity}>
                    {curiosity}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-6">
              <AdPlaceholder position="middle" />
            </div>

            <section className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-md border border-ink/10 bg-white p-6 shadow-line">
                <h2 className="text-2xl font-black text-ink">Variações do nome</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.variations.map((variation) => (
                    <span className="rounded-md bg-mist px-4 py-2 text-sm font-bold text-ink" key={variation}>
                      {variation}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-md border border-ink/10 bg-white p-6 shadow-line">
                <h2 className="text-2xl font-black text-ink">Categorias</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.categories.map((category) => (
                    <Link
                      className="rounded-md bg-mist px-4 py-2 text-sm font-bold capitalize text-ink transition hover:bg-coral hover:text-white"
                      href={`/categorias/${category}`}
                      key={category}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-3xl font-black text-ink">Nomes relacionados a {entry.name}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedEntries.map((related) => (
                  <NameCard entry={related} key={related.slug} />
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-3xl font-black text-ink">Sugestões de outros nomes</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((suggestion) => (
                  <NameCard entry={suggestion} key={suggestion.slug} />
                ))}
              </div>
            </section>

            <div className="mt-8">
              <AdPlaceholder position="bottom" />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <AdPlaceholder position="sidebar" />
            <div className="rounded-md border border-ink/10 bg-white p-5 shadow-line">
              <h2 className="text-xl font-black text-ink">Buscar outro nome</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Consulte outro nome da base.
              </p>
              <div className="mt-4">
                <SearchBox placeholder="Nome" variant="mini" />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
