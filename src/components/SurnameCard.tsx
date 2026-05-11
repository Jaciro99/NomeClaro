import Link from "next/link";
import type { SurnameEntry } from "@/types/surname";

export function SurnameCard({ entry }: { entry: SurnameEntry }) {
  return (
    <Link
      className="group rounded-md border border-ink/10 bg-white p-5 shadow-line transition hover:-translate-y-0.5 hover:border-coral/40 hover:shadow-soft"
      href={`/sobrenomes/${entry.slug}`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h3 className="pt-6 text-2xl font-black text-ink">{entry.surname}</h3>
          <p className="mt-1 text-sm font-semibold text-sage">{entry.origin}</p>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-md bg-mist px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink/60">
          Sobrenome
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink/68">{entry.meaning}</p>
      <span className="mt-5 inline-flex text-sm font-bold text-coral group-hover:text-ink">
        Ver origem
      </span>
    </Link>
  );
}
