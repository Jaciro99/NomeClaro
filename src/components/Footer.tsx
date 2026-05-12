import Link from "next/link";
import { FooterLinks } from "@/components/FooterLinks";
import { categories } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-[1.2fr_2fr]">
        <div>
          <Link className="text-lg font-black text-ink" href="/">
            NomeClaro
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-ink/65">
            Significados, origens e histórias de nomes em uma experiência rápida,
            limpa e feita para consulta.
          </p>
        </div>
        <nav aria-label="Links do rodapé" className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <FooterLinks />
          {categories.slice(0, 4).map((category) => (
            <Link
              className="text-sm font-medium text-ink/70 transition hover:text-coral"
              href={`/categorias/${category.slug}`}
              key={category.slug}
            >
              {category.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
