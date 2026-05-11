import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { NotFoundSearchBox } from "@/components/NotFoundSearchBox";
import { getRobotsMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description:
    "A página solicitada não foi encontrada. Pesquise um nome ou sobrenome no NomeClaro.",
  robots: getRobotsMetadata(true)
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 text-center">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
        Página não encontrada
      </p>
      <h1 className="mt-4 text-4xl font-black text-ink">Esse caminho ainda não existe.</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-ink/68">
        Tente buscar um nome na base inicial ou volte para as categorias.
      </p>
      <div className="mt-8 flex justify-center">
        <Suspense fallback={null}>
          <NotFoundSearchBox />
        </Suspense>
      </div>
      <Link className="mt-8 inline-flex font-bold text-coral" href="/">
        Voltar para a página inicial
      </Link>
    </section>
  );
}
