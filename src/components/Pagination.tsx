import Link from "next/link";
import { buildPaginatedHref } from "@/lib/pagination";

type PaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  queryParams?: Record<string, string | string[] | undefined>;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export function Pagination({
  basePath,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  queryParams = {}
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Paginação"
      className="mt-10 rounded-md border border-ink/10 bg-white p-4 shadow-line"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-ink/65">
          Mostrando {start}-{end} de {totalItems} nomes
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {currentPage > 1 ? (
            <Link
              className="rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
              href={buildPaginatedHref(basePath, currentPage - 1, queryParams)}
              rel="prev"
            >
              Anterior
            </Link>
          ) : null}

          {visiblePages.map((page, index) => {
            const previousPage = visiblePages[index - 1];
            const shouldShowGap = previousPage && page - previousPage > 1;

            return (
              <span className="flex items-center gap-2" key={page}>
                {shouldShowGap ? (
                  <span className="px-1 text-sm font-bold text-ink/35">...</span>
                ) : null}
                <Link
                  aria-current={page === currentPage ? "page" : undefined}
                  className={[
                    "grid h-10 min-w-10 place-items-center rounded-md px-3 text-sm font-black transition",
                    page === currentPage
                      ? "bg-ink text-white"
                      : "border border-ink/10 text-ink hover:border-coral hover:text-coral"
                  ].join(" ")}
                  href={buildPaginatedHref(basePath, page, queryParams)}
                >
                  {page}
                </Link>
              </span>
            );
          })}

          {currentPage < totalPages ? (
            <Link
              className="rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
              href={buildPaginatedHref(basePath, currentPage + 1, queryParams)}
              rel="next"
            >
              Próxima
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
