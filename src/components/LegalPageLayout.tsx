import type { ReactNode } from "react";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  children: ReactNode;
};

export function LegalPageLayout({
  eyebrow,
  title,
  description,
  updatedAt,
  children
}: LegalPageLayoutProps) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <header className="border-b border-ink/10 pb-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/68">{description}</p>
        <p className="mt-5 text-sm font-bold text-ink/45">Última atualização: {updatedAt}</p>
      </header>
      <div className="legal-content mt-10 space-y-9 text-ink/72">{children}</div>
    </section>
  );
}
