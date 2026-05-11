"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { categories } from "@/lib/categories";

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

type MobileLinkProps = {
  href: string;
  label: string;
  onClick: () => void;
};

function MobileLink({ href, label, onClick }: MobileLinkProps) {
  return (
    <Link
      className="rounded-md border border-ink/10 bg-white px-4 py-3 text-base font-black text-ink shadow-line transition hover:border-coral/40 hover:text-coral"
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const menuOverlay =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[999] min-h-screen bg-white text-ink">
            <div className="flex items-center justify-between border-b border-ink/10 bg-paper px-5 py-4">
              <Link className="flex items-center gap-3" href="/" onClick={closeMenu}>
                <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-lg font-black text-white">
                  N
                </span>
                <span className="text-lg font-black text-ink">NomeClaro</span>
              </Link>
              <button
                aria-label="Fechar menu"
                className="grid h-10 w-10 place-items-center rounded-md border border-ink/10 bg-white text-ink shadow-line transition hover:border-coral/40 hover:text-coral"
                onClick={closeMenu}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="h-[calc(100vh-73px)] overflow-y-auto bg-white px-5 py-6">
              <div className="mx-auto grid max-w-xl gap-6">
                <nav aria-label="Menu mobile" className="grid gap-3">
                  <MobileLink href="/nomes" label="Nomes" onClick={closeMenu} />
                  <MobileLink href="/sobrenomes" label="Sobrenomes" onClick={closeMenu} />
                  <MobileLink href="/categorias" label="Categorias" onClick={closeMenu} />
                  {categories.slice(0, 2).map((category) => (
                    <MobileLink
                      href={`/categorias/${category.slug}`}
                      key={category.slug}
                      label={category.title}
                      onClick={closeMenu}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="md:hidden">
      <button
        aria-expanded={isOpen}
        aria-label="Abrir menu"
        className="grid h-10 w-10 place-items-center rounded-md border border-ink/10 bg-white text-ink shadow-line transition hover:border-coral/40 hover:text-coral"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <MenuIcon />
      </button>

      {menuOverlay}
    </div>
  );
}
