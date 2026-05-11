import namesData from "@/data/names.json";
import { categories } from "@/lib/categories";
import type { NameCategory, NameEntry } from "@/types/name";

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;

  return withProtocol.replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "https://significadodenomes.example.com"
);

const rawNames = namesData as NameEntry[];

function getUniqueNamesBySlug(entries: NameEntry[]) {
  const seenSlugs = new Set<string>();

  return entries.filter((entry) => {
    const normalizedSlug = normalizeText(entry.slug || entry.name);

    if (!normalizedSlug || seenSlugs.has(normalizedSlug)) {
      return false;
    }

    seenSlugs.add(normalizedSlug);

    return true;
  });
}

const names = getUniqueNamesBySlug(rawNames);

export function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getAllNames() {
  return names;
}

export function getPopularNames(limit = 10) {
  return names.slice(0, limit);
}

export function getNameBySlug(slug: string) {
  return names.find((entry) => entry.slug === normalizeText(slug));
}

export function findNameByQuery(query: string) {
  const normalized = normalizeText(query);

  return names.find(
    (entry) =>
      entry.slug === normalized ||
      normalizeText(entry.name) === normalized ||
      entry.variations.some((variation) => normalizeText(variation) === normalized)
  );
}

export function searchNames(query: string) {
  const normalized = normalizeText(query);

  if (!normalized) {
    return [];
  }

  return names.filter((entry) => {
    const searchableValues = [
      entry.name,
      entry.slug,
      entry.origin,
      entry.meaning,
      ...entry.variations,
      ...entry.relatedNames,
      ...entry.categories
    ].map(normalizeText);

    return searchableValues.some((value) => value.includes(normalized));
  });
}

export function getRelatedEntries(entry: NameEntry, limit = 6) {
  const relatedSlugs = new Set(entry.relatedNames.map(normalizeText));
  const direct = names.filter((item) => item.slug !== entry.slug && relatedSlugs.has(item.slug));
  const byCategory = names.filter(
    (item) =>
      item.slug !== entry.slug &&
      !direct.some((directItem) => directItem.slug === item.slug) &&
      item.categories.some((category) => entry.categories.includes(category))
  );

  return [...direct, ...byCategory].slice(0, limit);
}

export function getNamesByCategory(category: NameCategory) {
  return names.filter((entry) => entry.categories.includes(category));
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === normalizeText(slug));
}

export function getCategoryGroups() {
  return categories.map((category) => ({
    ...category,
    names: getNamesByCategory(category.slug)
  }));
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
