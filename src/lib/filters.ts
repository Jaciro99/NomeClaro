import { categories } from "@/lib/categories";
import { normalizeText } from "@/lib/names";
import { surnameCategories } from "@/lib/surname-categories";
import type { NameEntry } from "@/types/name";
import type { SurnameEntry } from "@/types/surname";

export type FilterSearchParams = {
  page?: string | string[];
  letter?: string | string[];
  gender?: string | string[];
  origin?: string | string[];
  category?: string | string[];
};

export type FilterOptionItem = {
  label: string;
  value: string;
};

export type FilterGroupItem = {
  name: "letter" | "gender" | "origin" | "category";
  title: string;
  options: FilterOptionItem[];
};

export const letterOptions: FilterOptionItem[] = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map((letter) => ({ label: letter.toUpperCase(), value: letter }));

export function getParamValues(value: string | string[] | undefined) {
  if (!value) {
    return [];
  }

  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

export function getFilterParams(searchParams: FilterSearchParams = {}) {
  return {
    letter: getParamValues(searchParams.letter).map(normalizeText),
    gender: getParamValues(searchParams.gender).map(normalizeText),
    origin: getParamValues(searchParams.origin).map(normalizeText),
    category: getParamValues(searchParams.category).map(normalizeText)
  };
}

export function hasActiveFilters(searchParams: FilterSearchParams = {}) {
  const filters = getFilterParams(searchParams);

  return Object.values(filters).some((values) => values.length > 0);
}

export function getPaginationQueryParams(searchParams: FilterSearchParams = {}) {
  return {
    letter: getParamValues(searchParams.letter),
    gender: getParamValues(searchParams.gender),
    origin: getParamValues(searchParams.origin),
    category: getParamValues(searchParams.category)
  };
}

function getFirstLetter(value: string) {
  return normalizeText(value).charAt(0);
}

export function applyNameFilters(entries: NameEntry[], searchParams: FilterSearchParams = {}) {
  const filters = getFilterParams(searchParams);

  return entries.filter((entry) => {
    const entryOrigin = normalizeText(entry.origin);
    const entryCategories = entry.categories.map(normalizeText);

    return (
      (filters.letter.length === 0 || filters.letter.includes(getFirstLetter(entry.name))) &&
      (filters.gender.length === 0 || filters.gender.includes(normalizeText(entry.gender))) &&
      (filters.origin.length === 0 ||
        filters.origin.some((origin) => entryOrigin.includes(origin))) &&
      (filters.category.length === 0 ||
        filters.category.every((category) => entryCategories.includes(category)))
    );
  });
}

export function applySurnameFilters(
  entries: SurnameEntry[],
  searchParams: FilterSearchParams = {}
) {
  const filters = getFilterParams(searchParams);

  return entries.filter((entry) => {
    const entryOrigin = normalizeText(entry.origin);
    const entryCategories = entry.categories.map(normalizeText);

    return (
      (filters.letter.length === 0 || filters.letter.includes(getFirstLetter(entry.surname))) &&
      (filters.origin.length === 0 ||
        filters.origin.some((origin) => entryOrigin.includes(origin))) &&
      (filters.category.length === 0 ||
        filters.category.every((category) => entryCategories.includes(category)))
    );
  });
}

export function getNameFilterGroups(entries: NameEntry[]): FilterGroupItem[] {
  const origins = Array.from(new Set(entries.map((entry) => entry.origin)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .slice(0, 60);

  return [
    { name: "letter", title: "Letra inicial", options: letterOptions },
    {
      name: "gender",
      title: "Gênero",
      options: [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },
        { label: "Unissex", value: "unissex" }
      ]
    },
    {
      name: "origin",
      title: "Origem",
      options: origins.map((origin) => ({ label: origin, value: normalizeText(origin) }))
    },
    {
      name: "category",
      title: "Categorias",
      options: categories
        .filter((category) => !["masculinos", "femininos"].includes(category.slug))
        .map((category) => ({ label: category.title.replace("Nomes ", ""), value: category.slug }))
    }
  ];
}

export function getSurnameFilterGroups(entries: SurnameEntry[]): FilterGroupItem[] {
  const origins = Array.from(new Set(entries.map((entry) => entry.origin)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .slice(0, 60);

  return [
    { name: "letter", title: "Letra inicial", options: letterOptions },
    {
      name: "origin",
      title: "Origem/país",
      options: origins.map((origin) => ({ label: origin, value: normalizeText(origin) }))
    },
    {
      name: "category",
      title: "Categorias",
      options: surnameCategories.map((category) => ({
        label: category.title.replace("Sobrenomes ", ""),
        value: category.slug
      }))
    }
  ];
}

export function getSearchFilterGroups(
  nameEntries: NameEntry[],
  surnameEntries: SurnameEntry[]
): FilterGroupItem[] {
  const origins = Array.from(
    new Set([...nameEntries.map((entry) => entry.origin), ...surnameEntries.map((entry) => entry.origin)])
  )
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .slice(0, 80);

  return [
    { name: "letter", title: "Letra inicial", options: letterOptions },
    {
      name: "gender",
      title: "Gênero de nomes",
      options: [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },
        { label: "Unissex", value: "unissex" }
      ]
    },
    {
      name: "origin",
      title: "Origem",
      options: origins.map((origin) => ({ label: origin, value: normalizeText(origin) }))
    },
    {
      name: "category",
      title: "Categorias",
      options: [
        ...categories.map((category) => ({
          label: category.title,
          value: category.slug
        })),
        ...surnameCategories.map((category) => ({
          label: category.title,
          value: category.slug
        }))
      ]
    }
  ];
}
