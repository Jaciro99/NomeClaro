"use client";

import Link from "next/link";
import { useState } from "react";
import { FilterGroup } from "@/components/filters/FilterGroup";
import type { FilterGroupItem } from "@/lib/filters";

type SelectedFilters = Record<string, string[]>;

type FilterDrawerProps = {
  basePath: string;
  clearHref?: string;
  groups: FilterGroupItem[];
  hiddenParams?: Record<string, string | undefined>;
  selectedFilters: SelectedFilters;
};

function FilterIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.3"
      viewBox="0 0 24 24"
    >
      <path d="M4 5h16" />
      <path d="M7 12h10" />
      <path d="M10 19h4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.3"
      viewBox="0 0 24 24"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function FilterDrawer({
  basePath,
  clearHref,
  groups,
  hiddenParams = {},
  selectedFilters
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = Object.values(selectedFilters).reduce(
    (total, values) => total + values.length,
    0
  );

  return (
    <>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/10 bg-white px-4 py-3 text-sm font-black text-ink shadow-line transition hover:border-coral/40 hover:text-coral"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <FilterIcon />
        Filtrar resultados
        {activeCount > 0 ? (
          <span className="rounded-md bg-coral px-2 py-0.5 text-xs text-white">{activeCount}</span>
        ) : null}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[998] cursor-pointer bg-ink/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="ml-auto flex h-full w-full cursor-default flex-col bg-paper shadow-soft sm:max-w-md"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
                  Filtros
                </p>
                <h2 className="text-2xl font-black text-ink">Refinar resultados</h2>
              </div>
              <button
                aria-label="Fechar filtros"
                className="grid h-10 w-10 place-items-center rounded-md border border-ink/10 bg-white text-ink shadow-line"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <form action={basePath} className="flex min-h-0 flex-1 flex-col">
              {Object.entries(hiddenParams).map(([name, value]) =>
                value ? <input key={name} name={name} type="hidden" value={value} /> : null
              )}
              <div className="grid flex-1 gap-4 overflow-y-auto px-5 py-5">
                {groups.map((group) => (
                  <FilterGroup
                    group={group}
                    key={group.name}
                    selectedValues={selectedFilters[group.name] ?? []}
                  />
                ))}
              </div>

              <div className="grid gap-3 border-t border-ink/10 bg-white px-5 py-4 sm:grid-cols-2">
                <Link
                  className="grid min-h-12 place-items-center rounded-md border border-ink/10 px-4 text-sm font-black uppercase tracking-[0.14em] text-ink transition hover:border-coral/40 hover:text-coral"
                  href={clearHref ?? basePath}
                  onClick={() => setIsOpen(false)}
                >
                  Limpar filtros
                </Link>
                <button
                  className="min-h-12 rounded-md bg-ink px-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-coral"
                  type="submit"
                >
                  Aplicar filtros
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
