import type { Metadata } from "next";
import { CategoryPill } from "@/components/CategoryPill";
import { NameCard } from "@/components/NameCard";
import { SurnameCategoryPill } from "@/components/SurnameCategoryPill";
import { categories } from "@/lib/categories";
import { getPopularNames } from "@/lib/names";
import { surnameCategories } from "@/lib/surnames";

export const metadata: Metadata = {
  title: "Categorias de nomes",
  description:
    "Explore nomes masculinos, femininos, bíblicos, curtos, diferentes, clássicos e internacionais."
};

export default function CategoriesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">
          Categorias
        </p>
        <h1 className="mt-4 text-4xl font-black text-ink">Explore nomes por intenção</h1>
        <p className="mt-4 leading-7 text-ink/68">
          Páginas de categoria ajudam o usuário a navegar melhor e criam bons
          agrupamentos para tráfego orgânico.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryPill category={category} key={category.slug} />
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-3xl font-black text-ink">Categorias de sobrenomes</h2>
        <p className="mt-3 max-w-2xl leading-7 text-ink/68">
          Navegue por sobrenomes brasileiros, portugueses, italianos, japoneses e outras origens.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {surnameCategories.map((category) => (
            <SurnameCategoryPill category={category} key={category.slug} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-3xl font-black text-ink">Nomes populares</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getPopularNames(8).map((entry) => (
            <NameCard entry={entry} key={entry.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
