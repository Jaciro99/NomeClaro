import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { NotFoundSearchBox } from "@/components/NotFoundSearchBox";
import { categories } from "@/lib/categories";
import { getPopularNames } from "@/lib/names";
import { getRobotsMetadata } from "@/lib/seo";
import { getPopularSurnames } from "@/lib/surnames";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description:
    "A página solicitada não foi encontrada. Pesquise um nome ou sobrenome no NomeClaro.",
  robots: getRobotsMetadata(true)
};

export default function NotFound() {
  const popularNames = getPopularNames(4);
  const popularSurnames = getPopularSurnames(4);
  const usefulCategories = categories.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
          Página não encontrada
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-5xl">
          Esse caminho ainda não existe.
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-ink/68">
          O endereço pode ter mudado ou o conteúdo ainda não está disponível.
          Busque um nome ou continue por uma das áreas principais.
        </p>
        <div className="mt-8 flex justify-center">
          <Suspense fallback={null}>
            <NotFoundSearchBox />
          </Suspense>
        </div>
        <Link
          className="mt-8 inline-flex rounded-md bg-ink px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-coral"
          href="/"
        >
          Voltar para a página inicial
        </Link>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <section className="rounded-md border border-ink/10 bg-white p-5 shadow-line">
          <h2 className="text-xl font-black text-ink">Nomes populares</h2>
          <div className="mt-4 grid gap-2">
            {popularNames.map((entry) => (
              <Link
                className="rounded-md bg-mist px-4 py-3 text-sm font-bold text-ink transition hover:bg-coral hover:text-white"
                href={`/significado-do-nome/${entry.slug}`}
                key={entry.slug}
              >
                {entry.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-ink/10 bg-white p-5 shadow-line">
          <h2 className="text-xl font-black text-ink">Categorias</h2>
          <div className="mt-4 grid gap-2">
            {usefulCategories.map((category) => (
              <Link
                className="rounded-md bg-mist px-4 py-3 text-sm font-bold text-ink transition hover:bg-coral hover:text-white"
                href={`/categorias/${category.slug}`}
                key={category.slug}
              >
                {category.title}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-ink/10 bg-white p-5 shadow-line">
          <h2 className="text-xl font-black text-ink">Sobrenomes</h2>
          <div className="mt-4 grid gap-2">
            {popularSurnames.map((entry) => (
              <Link
                className="rounded-md bg-mist px-4 py-3 text-sm font-bold text-ink transition hover:bg-coral hover:text-white"
                href={`/sobrenomes/${entry.slug}`}
                key={entry.slug}
              >
                {entry.surname}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
