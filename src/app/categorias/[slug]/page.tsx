import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FilterButton } from "@/components/filters/FilterButton";
import { NameCard } from "@/components/NameCard";
import { Pagination } from "@/components/Pagination";
import { categories } from "@/lib/categories";
import {
  applyNameFilters,
  getFilterParams,
  getNameFilterGroups,
  getPaginationQueryParams,
  hasActiveFilters,
  type FilterSearchParams
} from "@/lib/filters";
import { absoluteUrl, getCategoryBySlug, getNamesByCategory } from "@/lib/names";
import { buildPaginatedHref, NAMES_PER_PAGE, paginate, parsePage } from "@/lib/pagination";
import { getOpenGraphDefaults } from "@/lib/seo";
import type { NameCategory } from "@/types/name";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<FilterSearchParams>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
  searchParams
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = parsePage(resolvedSearchParams?.page);
  const hasFilters = hasActiveFilters(resolvedSearchParams);
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  const categoryPath = `/categorias/${category.slug}`;
  const categoryNames = applyNameFilters(
    getNamesByCategory(category.slug as NameCategory),
    resolvedSearchParams
  );
  const totalPages = paginate(categoryNames, currentPage, NAMES_PER_PAGE).totalPages;
  const title =
    currentPage > 1
      ? `${category.title}: significados, origens e ideias - página ${currentPage}`
      : `${category.title}: significados, origens e ideias`;
  const canonical = absoluteUrl(hasFilters ? categoryPath : buildPaginatedHref(categoryPath, currentPage));

  return {
    title,
    description: category.description,
    alternates: {
      canonical,
      ...(!hasFilters && currentPage > 1
        ? { previous: absoluteUrl(buildPaginatedHref(categoryPath, currentPage - 1)) }
        : {}),
      ...(!hasFilters && currentPage < totalPages
        ? { next: absoluteUrl(buildPaginatedHref(categoryPath, currentPage + 1)) }
        : {})
    },
    robots: hasFilters || categoryNames.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      ...getOpenGraphDefaults(hasFilters ? categoryPath : buildPaginatedHref(categoryPath, currentPage)),
      title,
      description: category.description,
      url: canonical,
      type: "website"
    }
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const requestedPage = parsePage(resolvedSearchParams?.page);
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryNames = getNamesByCategory(category.slug as NameCategory);
  const filteredNames = applyNameFilters(categoryNames, resolvedSearchParams);
  const pagination = paginate(filteredNames, requestedPage, NAMES_PER_PAGE);
  const hasFilters = hasActiveFilters(resolvedSearchParams);

  if (requestedPage > pagination.totalPages) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumb items={[{ href: "/categorias", label: "Categorias" }, { label: category.title }]} />
      <div className="mt-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
            {category.title}
          </p>
          <h1 className="mt-4 text-4xl font-black text-ink">
            {category.title} com significado e origem
          </h1>
          <p className="mt-4 leading-7 text-ink/68">{category.description}</p>
          {hasFilters ? (
            <p className="mt-3 text-sm font-bold text-ink/60">
              {pagination.totalItems} resultado(s) encontrados com os filtros atuais.
            </p>
          ) : null}
        </div>
        <FilterButton
          basePath={`/categorias/${category.slug}`}
          groups={getNameFilterGroups(categoryNames)}
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
            Ajuste os filtros ou limpe a seleção para voltar à categoria.
          </p>
        </div>
      )}
      <Pagination
        basePath={`/categorias/${category.slug}`}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        queryParams={getPaginationQueryParams(resolvedSearchParams)}
        totalItems={pagination.totalItems}
        totalPages={pagination.totalPages}
      />
    </section>
  );
}
