import Link from "next/link";

const footerLinks = [
  { href: "/nomes", label: "Todos os nomes" },
  { href: "/sobrenomes", label: "Sobrenomes" },
  { href: "/busca", label: "Buscar" },
  { href: "/categorias", label: "Categorias" },
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" }
];

export function FooterLinks() {
  return (
    <>
      {footerLinks.map((link) => (
        <Link
          className="text-sm font-medium text-ink/70 transition hover:text-coral"
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
