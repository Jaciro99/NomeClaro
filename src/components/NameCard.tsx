import Link from "next/link";
import type { NameEntry } from "@/types/name";

export function NameCard({ entry }: { entry: NameEntry }) {
  return (
    <Link
      className="group rounded-md border border-ink/10 bg-white p-5 shadow-line transition hover:-translate-y-0.5 hover:border-coral/40 hover:shadow-soft"
      href={`/significado-do-nome/${entry.slug}`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,auto)] items-start gap-4">
        <div className="min-w-0">
          <h3 className="pt-6 text-2xl font-black text-ink">{entry.name}</h3>
          <p className="mt-1 text-sm font-semibold capitalize text-sage">{entry.gender}</p>
        </div>
        <span className="max-w-[11rem] rounded-md bg-mist px-3 py-1 text-center text-xs font-bold uppercase tracking-[0.14em] text-ink/60 [overflow-wrap:anywhere]">
          {entry.origin}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink/68">{entry.meaning}</p>
      <span className="mt-5 inline-flex text-sm font-bold text-coral group-hover:text-ink">
        Ver significado
      </span>
    </Link>
  );
}
