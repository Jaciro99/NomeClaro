import Link from "next/link";
import { HeaderSearchBox } from "@/components/HeaderSearchBox";
import { MobileMenu } from "@/components/MobileMenu";
import { categories } from "@/lib/categories";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link className="flex items-center gap-3" href="/" aria-label="NomeClaro">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-lg font-black text-white">
            N
          </span>
          <span className="text-lg font-black text-ink">NomeClaro</span>
        </Link>
        <MobileMenu />
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 md:flex">
          <nav aria-label="Navegação principal" className="flex items-center gap-5">
            <Link className="text-sm font-semibold text-ink/70 hover:text-coral" href="/nomes">
              Nomes
            </Link>
            <Link className="text-sm font-semibold text-ink/70 hover:text-coral" href="/sobrenomes">
              Sobrenomes
            </Link>
            <Link className="text-sm font-semibold text-ink/70 hover:text-coral" href="/categorias">
              Categorias
            </Link>
            {categories.slice(0, 2).map((category) => (
              <Link
                className="text-sm capitalize font-semibold text-ink/70 hover:text-coral"
                href={`/categorias/${category.slug}`}
                key={category.slug}
              >
                {category.title.replace("Nomes ", "")}
              </Link>
            ))}
          </nav>
          <HeaderSearchBox />
        </div>
      </div>
      <div className="border-t border-ink/10 px-5 py-2 md:hidden">
        <div className="mx-auto max-w-6xl">
          <HeaderSearchBox mobile />
        </div>
      </div>
    </header>
  );
}
