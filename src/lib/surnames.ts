import surnamesData from "@/data/surnames.json";
import { normalizeText } from "@/lib/names";
import { surnameCategories } from "@/lib/surname-categories";
import type { SurnameCategory, SurnameEntry } from "@/types/surname";

const rawSurnames = surnamesData as SurnameEntry[];

function getUniqueSurnamesBySlug(entries: SurnameEntry[]) {
  const seenSlugs = new Set<string>();

  return entries.filter((entry) => {
    const normalizedSlug = normalizeText(entry.slug || entry.surname);

    if (!normalizedSlug || seenSlugs.has(normalizedSlug)) {
      return false;
    }

    seenSlugs.add(normalizedSlug);

    return true;
  });
}

export { surnameCategories };
const surnames = getUniqueSurnamesBySlug(rawSurnames);

export function getAllSurnames() {
  return surnames;
}

export function getPopularSurnames(limit = 12) {
  return surnames.slice(0, limit);
}

export function getSurnameBySlug(slug: string) {
  const normalizedSlug = normalizeText(slug);

  return surnames.find((entry) => normalizeText(entry.slug) === normalizedSlug);
}

export function findSurnameByQuery(query: string) {
  const normalized = normalizeText(query);

  return surnames.find(
    (entry) =>
      normalizeText(entry.slug) === normalized ||
      normalizeText(entry.surname) === normalized ||
      entry.variations.some((variation) => normalizeText(variation) === normalized)
  );
}

export function searchSurnames(query: string) {
  const normalized = normalizeText(query);

  if (!normalized) {
    return [];
  }

  return surnames.filter((entry) => {
    const searchableValues = [
      entry.surname,
      entry.slug,
      entry.origin,
      entry.meaning,
      ...entry.variations,
      ...entry.relatedSurnames,
      ...entry.categories
    ].map(normalizeText);

    return searchableValues.some((value) => value.includes(normalized));
  });
}

export function getSurnamesByCategory(category: SurnameCategory | string) {
  const normalizedCategory = normalizeText(category);

  return surnames.filter((entry) =>
    entry.categories.some((item) => normalizeText(item) === normalizedCategory)
  );
}

export function getSurnameCategoryBySlug(slug: string) {
  const normalizedSlug = normalizeText(slug);

  return surnameCategories.find((category) => normalizeText(category.slug) === normalizedSlug);
}

export function getSurnameCategoryGroups() {
  return surnameCategories.map((category) => ({
    ...category,
    surnames: getSurnamesByCategory(category.slug)
  }));
}

export function getRelatedSurnameEntries(entry: SurnameEntry, limit = 6) {
  const relatedSlugs = new Set(entry.relatedSurnames.map(normalizeText));
  const direct = surnames.filter(
    (item) => item.slug !== entry.slug && relatedSlugs.has(normalizeText(item.slug))
  );
  const byCategory = surnames.filter(
    (item) =>
      item.slug !== entry.slug &&
      !direct.some((directItem) => directItem.slug === item.slug) &&
      item.categories.some((category) => entry.categories.includes(category))
  );

  return [...direct, ...byCategory].slice(0, limit);
}
