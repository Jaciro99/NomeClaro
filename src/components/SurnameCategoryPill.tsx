import Link from "next/link";
import type { SurnameCategoryInfo } from "@/types/surname";

export function SurnameCategoryPill({ category }: { category: SurnameCategoryInfo }) {
  return (
    <Link
      className="group rounded-md border border-ink/10 bg-white p-5 shadow-line transition hover:-translate-y-0.5 hover:border-coral/40 hover:shadow-soft"
      href={`/categorias/sobrenomes/${category.slug}`}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-coral">
        Sobrenomes
      </span>
      <h3 className="mt-3 text-xl font-bold text-ink">{category.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/68">{category.description}</p>
    </Link>
  );
}
