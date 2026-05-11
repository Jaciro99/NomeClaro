import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { absoluteUrl, getAllNames, getNamesByCategory } from "@/lib/names";
import { buildPaginatedHref, NAMES_PER_PAGE, paginate } from "@/lib/pagination";
import {
  getAllSurnames,
  getSurnamesByCategory,
  surnameCategories
} from "@/lib/surnames";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["", "/busca", "/categorias", "/nomes", "/sobrenomes"].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7
  }));

  const nameRoutes = getAllNames().map((entry) => ({
    url: absoluteUrl(`/significado-do-nome/${entry.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9
  }));

  const categoryRoutes = categories.map((category) => ({
    url: absoluteUrl(`/categorias/${category.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const surnameRoutes = getAllSurnames().map((entry) => ({
    url: absoluteUrl(`/sobrenomes/${entry.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9
  }));

  const surnameCategoryRoutes = surnameCategories.map((category) => ({
    url: absoluteUrl(`/categorias/sobrenomes/${category.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const namesPagination = paginate(getAllNames(), 1, NAMES_PER_PAGE);
  const namesPaginationRoutes = Array.from(
    { length: Math.max(0, namesPagination.totalPages - 1) },
    (_, index) => ({
      url: absoluteUrl(buildPaginatedHref("/nomes", index + 2)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6
    })
  );

  const categoryPaginationRoutes = categories.flatMap((category) => {
    const pagination = paginate(getNamesByCategory(category.slug), 1, NAMES_PER_PAGE);

    return Array.from({ length: Math.max(0, pagination.totalPages - 1) }, (_, index) => ({
      url: absoluteUrl(buildPaginatedHref(`/categorias/${category.slug}`, index + 2)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6
    }));
  });

  const surnamesPagination = paginate(getAllSurnames(), 1, NAMES_PER_PAGE);
  const surnamesPaginationRoutes = Array.from(
    { length: Math.max(0, surnamesPagination.totalPages - 1) },
    (_, index) => ({
      url: absoluteUrl(buildPaginatedHref("/sobrenomes", index + 2)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6
    })
  );

  const surnameCategoryPaginationRoutes = surnameCategories.flatMap((category) => {
    const pagination = paginate(getSurnamesByCategory(category.slug), 1, NAMES_PER_PAGE);

    return Array.from({ length: Math.max(0, pagination.totalPages - 1) }, (_, index) => ({
      url: absoluteUrl(buildPaginatedHref(`/categorias/sobrenomes/${category.slug}`, index + 2)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6
    }));
  });

  return [
    ...staticRoutes,
    ...nameRoutes,
    ...surnameRoutes,
    ...categoryRoutes,
    ...surnameCategoryRoutes,
    ...namesPaginationRoutes,
    ...categoryPaginationRoutes,
    ...surnamesPaginationRoutes,
    ...surnameCategoryPaginationRoutes
  ];
}
