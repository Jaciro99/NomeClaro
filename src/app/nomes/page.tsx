import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FilterButton } from "@/components/filters/FilterButton";
import { NameCard } from "@/components/NameCard";
import { Pagination } from "@/components/Pagination";
import {
  applyNameFilters,
  getFilterParams,
  getNameFilterGroups,
  getPaginationQueryParams,
  hasActiveFilters,
  type FilterSearchParams
} from "@/lib/filters";
import { absoluteUrl, getAllNames } from "@/lib/names";
import { buildPaginatedHref, NAMES_PER_PAGE, paginate, parsePage } from "@/lib/pagination";

type NamesPageProps = {
  searchParams?: Promise<FilterSearchParams>;
};

export async function generateMetadata({ searchParams }: NamesPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const currentPage = parsePage(resolvedSearchParams?.page);
  const hasFilters = hasActiveFilters(resolvedSearchParams);
  const title =
    currentPage > 1
      ? `Lista de nomes com significado - página ${currentPage}`
      : "Lista de nomes com significado";
  const description =
    "Explore a lista completa de nomes disponíveis com significado, origem, gênero, curiosidades e páginas individuais.";
  const canonical = absoluteUrl(hasFilters ? "/nomes" : buildPaginatedHref("/nomes", currentPage));
  const filteredNames = applyNameFilters(getAllNames(), resolvedSearchParams);
  const totalPages = paginate(filteredNames, currentPage, NAMES_PER_PAGE).totalPages;

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(!hasFilters && currentPage > 1
        ? { previous: absoluteUrl(buildPaginatedHref("/nomes", currentPage - 1)) }
        : {}),
      ...(!hasFilters && currentPage < totalPages
        ? { next: absoluteUrl(buildPaginatedHref("/nomes", currentPage + 1)) }
        : {})
    },
    robots: hasFilters || filteredNames.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website"
    }
  };
}

export default async function NamesPage({ searchParams }: NamesPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = parsePage(resolvedSearchParams?.page);
  const allNames = getAllNames();
  const filteredNames = applyNameFilters(allNames, resolvedSearchParams);
  const pagination = paginate(filteredNames, requestedPage, NAMES_PER_PAGE);
  const hasFilters = hasActiveFilters(resolvedSearchParams);

  if (requestedPage > pagination.totalPages) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumb items={[{ label: "Todos os nomes" }]} />
      <div className="mt-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
            Lista de nomes
          </p>
          <h1 className="mt-4 text-4xl font-black text-ink">
            Todos os nomes com significado e origem
          </h1>
          <p className="mt-4 leading-7 text-ink/68">
            Navegue por uma listagem indexável, paginada e preparada para crescer
            com uma base grande de nomes.
          </p>
          {hasFilters ? (
            <p className="mt-3 text-sm font-bold text-ink/60">
              {pagination.totalItems} resultado(s) encontrados com os filtros atuais.
            </p>
          ) : null}
        </div>
        <FilterButton
          basePath="/nomes"
          groups={getNameFilterGroups(allNames)}
          selectedFilters={getFilterParams(resolvedSearchParams)}
        />
      </div>

      {pagination.totalItems > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pagination.items.map((entry) => (
            <NameCard entry={entry} key={entry.slug} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-ink/10 bg-white p-6 shadow-line">
          <h2 className="text-2xl font-black text-ink">Nenhum nome encontrado</h2>
          <p className="mt-2 leading-7 text-ink/68">
            Ajuste os filtros ou limpe a seleção para voltar à lista completa.
          </p>
        </div>
      )}

      <Pagination
        basePath="/nomes"
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        queryParams={getPaginationQueryParams(resolvedSearchParams)}
        totalItems={pagination.totalItems}
        totalPages={pagination.totalPages}
      />
    </section>
  );
}
