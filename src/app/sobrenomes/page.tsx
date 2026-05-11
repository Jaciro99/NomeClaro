import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FilterButton } from "@/components/filters/FilterButton";
import { Pagination } from "@/components/Pagination";
import { SurnameCard } from "@/components/SurnameCard";
import {
  applySurnameFilters,
  getFilterParams,
  getPaginationQueryParams,
  getSurnameFilterGroups,
  hasActiveFilters,
  type FilterSearchParams
} from "@/lib/filters";
import { absoluteUrl } from "@/lib/names";
import { buildPaginatedHref, NAMES_PER_PAGE, paginate, parsePage } from "@/lib/pagination";
import { getAllSurnames } from "@/lib/surnames";

type SurnamesPageProps = {
  searchParams?: Promise<FilterSearchParams>;
};

export async function generateMetadata({ searchParams }: SurnamesPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const currentPage = parsePage(resolvedSearchParams?.page);
  const hasFilters = hasActiveFilters(resolvedSearchParams);
  const title =
    currentPage > 1
      ? `Lista de sobrenomes com origem - página ${currentPage}`
      : "Lista de sobrenomes com origem e significado";
  const description =
    "Explore sobrenomes com significado, origem, história familiar, variações e curiosidades culturais.";
  const canonical = absoluteUrl(
    hasFilters ? "/sobrenomes" : buildPaginatedHref("/sobrenomes", currentPage)
  );
  const filteredSurnames = applySurnameFilters(getAllSurnames(), resolvedSearchParams);
  const totalPages = paginate(filteredSurnames, currentPage, NAMES_PER_PAGE).totalPages;

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(!hasFilters && currentPage > 1
        ? { previous: absoluteUrl(buildPaginatedHref("/sobrenomes", currentPage - 1)) }
        : {}),
      ...(!hasFilters && currentPage < totalPages
        ? { next: absoluteUrl(buildPaginatedHref("/sobrenomes", currentPage + 1)) }
        : {})
    },
    robots:
      hasFilters || filteredSurnames.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website"
    }
  };
}

export default async function SurnamesPage({ searchParams }: SurnamesPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = parsePage(resolvedSearchParams?.page);
  const allSurnames = getAllSurnames();
  const filteredSurnames = applySurnameFilters(allSurnames, resolvedSearchParams);
  const pagination = paginate(filteredSurnames, requestedPage, NAMES_PER_PAGE);
  const hasFilters = hasActiveFilters(resolvedSearchParams);

  if (requestedPage > pagination.totalPages) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumb items={[{ label: "Sobrenomes" }]} />
      <div className="mt-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
            Sobrenomes
          </p>
          <h1 className="mt-4 text-4xl font-black text-ink">
            Significado e origem de sobrenomes
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-ink/68">
            Pesquise histórias familiares, origens culturais, variações e usos de
            sobrenomes no Brasil e no mundo.
          </p>
          {hasFilters ? (
            <p className="mt-3 text-sm font-bold text-ink/60">
              {pagination.totalItems} resultado(s) encontrados com os filtros atuais.
            </p>
          ) : null}
        </div>
        <FilterButton
          basePath="/sobrenomes"
          groups={getSurnameFilterGroups(allSurnames)}
          selectedFilters={getFilterParams(resolvedSearchParams)}
        />
      </div>

      {pagination.totalItems > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pagination.items.map((entry) => (
            <SurnameCard entry={entry} key={entry.slug} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-ink/10 bg-white p-6 shadow-line">
          <h2 className="text-2xl font-black text-ink">Nenhum sobrenome encontrado</h2>
          <p className="mt-2 leading-7 text-ink/68">
            Ajuste os filtros ou limpe a seleção para voltar à lista completa.
          </p>
        </div>
      )}

      <Pagination
        basePath="/sobrenomes"
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        queryParams={getPaginationQueryParams(resolvedSearchParams)}
        totalItems={pagination.totalItems}
        totalPages={pagination.totalPages}
      />
    </section>
  );
}
