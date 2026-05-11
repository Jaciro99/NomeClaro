import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CategoryPill } from "@/components/CategoryPill";
import { JsonLd } from "@/components/JsonLd";
import { NameCard } from "@/components/NameCard";
import { SearchBox } from "@/components/SearchBox";
import { SurnameCard } from "@/components/SurnameCard";
import { SurnameCategoryPill } from "@/components/SurnameCategoryPill";
import { categories } from "@/lib/categories";
import { absoluteUrl, getCategoryGroups, getPopularNames } from "@/lib/names";
import { getPopularSurnames, surnameCategories } from "@/lib/surnames";

export default function HomePage() {
  const popularNames = getPopularNames(8);
  const popularSurnames = getPopularSurnames(4);
  const categoryGroups = getCategoryGroups().slice(0, 5);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "NomeClaro",
          url: absoluteUrl("/"),
          potentialAction: {
            "@type": "SearchAction",
            target: `${absoluteUrl("/busca")}?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
              Significado de nomes
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-ink sm:text-5xl md:text-6xl">
              Descubra a origem, a história e o significado de nomes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
              Explore milhares de nomes e sobrenomes para se inspirar e encontrar combinações únicas.
            </p>
            <div className="mt-8">
              <SearchBox />
            </div>
          </div>
          <div className="rounded-md border border-ink/10 bg-white p-5 shadow-soft">
            <div className="rounded-md bg-mist p-6">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-sage">
                Nomes em destaque
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {popularNames.slice(0, 6).map((entry) => (
                  <Link
                    className="rounded-md bg-white px-4 py-3 font-bold text-ink shadow-line transition hover:text-coral"
                    href={`/significado-do-nome/${entry.slug}`}
                    key={entry.slug}
                  >
                    {entry.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <AdPlaceholder position="top" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-black text-ink">Nomes populares</h2>
            <p className="mt-3 max-w-2xl leading-7 text-ink/68">
              Comece pelos nomes mais buscados.
            </p>
          </div>
          <Link className="text-sm font-black uppercase tracking-[0.14em] text-coral" href="/nomes">
            Ver todos
          </Link>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularNames.map((entry) => (
            <NameCard entry={entry} key={entry.slug} />
          ))}
        </div>
      </section>

      <section className="bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black text-ink">Sobrenomes populares</h2>
              <p className="mt-3 max-w-2xl leading-7 text-ink/68">
                Consulte origem, significado, história familiar e variações de sobrenomes.
              </p>
            </div>
            <Link className="text-sm font-black uppercase tracking-[0.14em] text-coral" href="/sobrenomes">
              Ver sobrenomes
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularSurnames.map((entry) => (
              <SurnameCard entry={entry} key={entry.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="text-3xl font-black text-ink">Categorias de nomes</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ink/68">
            Explore categorias com nomes clássicos, modernos, bíblicos, diferentes e muito mais.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 5).map((category) => (
              <CategoryPill category={category} key={category.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-3xl font-black text-ink">Categorias de sobrenomes</h2>
        <p className="mt-3 max-w-2xl leading-7 text-ink/68">
          Explore sobrenomes por origem cultural, frequência e tradição familiar.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {surnameCategories.slice(0, 6).map((category) => (
            <SurnameCategoryPill category={category} key={category.slug} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-5">
            {categoryGroups.map((category) => (
              <div className="rounded-md border border-ink/10 bg-white p-5 shadow-line" key={category.slug}>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-black text-ink">{category.title}</h2>
                    <p className="mt-1 text-sm text-ink/65">{category.description}</p>
                  </div>
                  <Link className="text-sm font-bold text-coral" href={`/categorias/${category.slug}`}>
                    Ver todos
                  </Link>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.names.slice(0, 7).map((entry) => (
                    <Link
                      className="rounded-md bg-mist px-4 py-2 text-sm font-bold text-ink transition hover:bg-coral hover:text-white"
                      href={`/significado-do-nome/${entry.slug}`}
                      key={entry.slug}
                    >
                      {entry.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AdPlaceholder position="sidebar" />
          </div>
        </div>
      </section>
    </>
  );
}
