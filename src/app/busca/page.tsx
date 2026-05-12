import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { FilterButton } from "@/components/filters/FilterButton";
import { NameCard } from "@/components/NameCard";
import { Pagination } from "@/components/Pagination";
import { SearchBox } from "@/components/SearchBox";
import { SurnameCard } from "@/components/SurnameCard";
import {
  applyNameFilters,
  applySurnameFilters,
  getFilterParams,
  getParamValues,
  getPaginationQueryParams,
  getSearchFilterGroups,
  hasActiveFilters,
  type FilterSearchParams
} from "@/lib/filters";
import { absoluteUrl, findNameByQuery, getAllNames, searchNames } from "@/lib/names";
import { NAMES_PER_PAGE, paginate, parsePage } from "@/lib/pagination";
import { findSurnameByQuery, getAllSurnames, searchSurnames } from "@/lib/surnames";
import { getOpenGraphDefaults, getRobotsMetadata } from "@/lib/seo";
import type { NameEntry } from "@/types/name";
import type { SurnameEntry } from "@/types/surname";

type SearchPageProps = {
  searchParams?: Promise<FilterSearchParams & { q?: string | string[] }>;
};

type SearchResult =
  | {
      type: "name";
      entry: NameEntry;
    }
  | {
      type: "surname";
      entry: SurnameEntry;
    };

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const hasFilters = hasActiveFilters(resolvedSearchParams);
  const hasDynamicQuery = Object.keys(resolvedSearchParams ?? {}).length > 0;

  return {
    title: "Buscar significado de nomes e sobrenomes",
    description:
      "Busque nomes e sobrenomes disponíveis na base e acesse páginas completas com significado, origem e curiosidades.",
    alternates: {
      canonical: absoluteUrl("/busca")
    },
    robots: hasFilters || hasDynamicQuery ? getRobotsMetadata(true) : undefined,
    openGraph: {
      ...getOpenGraphDefaults("/busca"),
      title: "Buscar significado de nomes e sobrenomes",
      description:
        "Busque nomes e sobrenomes disponíveis na base e acesse páginas completas com significado, origem e curiosidades.",
      type: "website"
    }
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const hasSearchQueryParam = Object.prototype.hasOwnProperty.call(
    resolvedSearchParams ?? {},
    "q"
  );
  const queryValue = Array.isArray(resolvedSearchParams?.q)
    ? resolvedSearchParams?.q[0]
    : resolvedSearchParams?.q;
  const query = queryValue?.trim() ?? "";
  const hasEmptySearch = hasSearchQueryParam && !query;
  const requestedPage = parsePage(resolvedSearchParams?.page);
  const hasFilters = hasActiveFilters(resolvedSearchParams);
  const match = query ? findNameByQuery(query) : undefined;
  const surnameMatch = query ? findSurnameByQuery(query) : undefined;
  const nameMatches = hasEmptySearch ? [] : query ? searchNames(query) : getAllNames();
  const surnameMatches = hasEmptySearch ? [] : query ? searchSurnames(query) : getAllSurnames();
  const filteredNameMatches = applyNameFilters(nameMatches, resolvedSearchParams);
  const filteredSurnameMatches =
    getParamValues(resolvedSearchParams?.gender).length > 0
      ? []
      : applySurnameFilters(surnameMatches, resolvedSearchParams);
  const results: SearchResult[] = query
    ? [
        ...filteredNameMatches.map((entry) => ({ type: "name" as const, entry })),
        ...filteredSurnameMatches.map((entry) => ({ type: "surname" as const, entry }))
      ]
    : [
        ...filteredNameMatches.map((entry) => ({ type: "name" as const, entry })),
        ...filteredSurnameMatches.map((entry) => ({ type: "surname" as const, entry }))
      ];
  const pagination = paginate(results, requestedPage, NAMES_PER_PAGE);

  if (match) {
    redirect(`/significado-do-nome/${match.slug}`);
  }

  if (surnameMatch) {
    redirect(`/sobrenomes/${surnameMatch.slug}`);
  }

  if (requestedPage > pagination.totalPages) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
          Busca
        </p>
        <h1 className="mt-4 text-4xl font-black text-ink">Encontre o significado de um nome ou sobrenome</h1>
        <p className="mt-4 leading-7 text-ink/68">
          Digite um nome ou sobrenome para consultar a base. A estrutura já está
          pronta para, no futuro, buscar novos conteúdos em um backend.
        </p>
      </div>
      <div className="mt-8">
        <SearchBox compact initialValue={query} key={query} />
      </div>

      <div className="mt-6 flex justify-end">
        <FilterButton
          basePath="/busca"
          clearHref={query ? `/busca?q=${encodeURIComponent(query)}` : "/busca"}
          groups={getSearchFilterGroups(nameMatches, surnameMatches)}
          hiddenParams={{ q: query || undefined }}
          selectedFilters={getFilterParams(resolvedSearchParams)}
        />
      </div>

      {hasEmptySearch || (query && pagination.totalItems === 0) ? (
        <div className="mt-10 rounded-md border border-ink/10 bg-white p-6 shadow-line">
          <h2 className="text-2xl font-black text-ink">
            {hasEmptySearch ? "Digite um nome ou sobrenome" : "Termo ainda não cadastrado"}
          </h2>
          <p className="mt-3 leading-7 text-ink/68">
            {hasEmptySearch ? (
              "Use o campo de busca para consultar a base de nomes e sobrenomes."
            ) : (
              <>
                <strong>{query}</strong> ainda não está nas bases atuais. Mas fique
                tranquilo, recebemos sua busca e em alguns dias o significado desse
                nome estará aqui =)
              </>
            )}
          </p>
        </div>
      ) : null}

      <div className="mt-12 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-ink">
            {query ? "Resultados encontrados" : "Nomes e sobrenomes"}
          </h2>
          <p className="mt-2 text-ink/68">
            {query
              ? `${pagination.totalItems} resultado(s) relacionado(s) a "${query}".`
              : "Lista paginada dos nomes e sobrenomes disponíveis nas bases."}
            {hasFilters ? " Os filtros atuais foram aplicados." : ""}
          </p>
        </div>
        <Link className="hidden text-sm font-black uppercase tracking-[0.14em] text-coral sm:inline-flex" href="/nomes">
          Ver nomes
        </Link>
      </div>
      {pagination.totalItems > 0 ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pagination.items.map((entry) => (
              entry.type === "name" ? (
                <NameCard entry={entry.entry} key={`name-${entry.entry.slug}`} />
              ) : (
                <SurnameCard entry={entry.entry} key={`surname-${entry.entry.slug}`} />
              )
            ))}
          </div>
          <Pagination
            basePath="/busca"
            currentPage={pagination.currentPage}
            pageSize={pagination.pageSize}
            queryParams={{ q: query || undefined, ...getPaginationQueryParams(resolvedSearchParams) }}
            totalItems={pagination.totalItems}
            totalPages={pagination.totalPages}
          />
        </>
      ) : null}
    </section>
  );
}
