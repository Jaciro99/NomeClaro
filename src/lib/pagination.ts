export const NAMES_PER_PAGE = 24;

export type PaginatedResult<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export function parsePage(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number(rawValue ?? "1");

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export function paginate<T>(
  items: T[],
  currentPage: number,
  pageSize = NAMES_PER_PAGE
): PaginatedResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    currentPage: safePage,
    totalPages,
    totalItems,
    pageSize,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages
  };
}

export function buildPaginatedHref(
  pathname: string,
  page: number,
  params: Record<string, string | string[] | undefined> = {}
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item) {
          searchParams.append(key, item);
        }
      });
    } else if (value) {
      searchParams.set(key, value);
    }
  });

  const safePage = Math.max(1, page);

  if (safePage > 1) {
    searchParams.set("page", String(safePage));
  }

  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}
