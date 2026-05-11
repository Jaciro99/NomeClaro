"use client";

import { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";

type SearchBoxProps = {
  clearOnSubmit?: boolean;
  compact?: boolean;
  initialValue?: string;
  placeholder?: string;
  variant?: "default" | "compact" | "mini" | "header";
};

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.3"
      viewBox="0 0 24 24"
    >
      <path d="m21 21-4.3-4.3" />
      <circle cx="11" cy="11" r="7" />
    </svg>
  );
}

export function SearchBox({
  clearOnSubmit = false,
  compact = false,
  initialValue = "",
  placeholder,
  variant
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();
  const inputId = useId();
  const mode = variant ?? (compact ? "compact" : "default");
  const isSmall = mode === "mini" || mode === "header";
  const shouldUseIconButton = isSmall;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    router.push(`/busca?q=${encodeURIComponent(trimmed)}`);

    if (clearOnSubmit) {
      setQuery("");
    }
  }

  return (
    <form
      className={[
        "flex w-full rounded-md border border-ink/10 bg-white",
        mode === "default" ? "max-w-3xl flex-col gap-3 p-3 shadow-soft sm:flex-row" : "",
        mode === "compact" ? "max-w-2xl flex-col gap-3 p-3 shadow-soft sm:flex-row" : "",
        mode === "mini" ? "max-w-full flex-row gap-2 p-2 shadow-line" : "",
        mode === "header" ? "max-w-[260px] flex-row gap-2 p-1.5 shadow-line" : ""
      ].join(" ")}
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="sr-only" htmlFor={inputId}>
        Buscar significado de um nome
      </label>
      <input
        className={[
          "min-w-0 flex-1 rounded-md border border-transparent bg-mist font-medium text-ink outline-none transition placeholder:text-ink/45 focus:border-sage focus:bg-white",
          isSmall ? "min-h-10 px-3 text-sm" : "min-h-[52px] px-4 text-base"
        ].join(" ")}
        id={inputId}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder ?? (isSmall ? "Nome" : "Digite um nome, ex: Miguel")}
        type="search"
        value={query}
      />
      <button
        aria-label={shouldUseIconButton ? "Buscar nome" : undefined}
        className={[
          "grid shrink-0 place-items-center rounded-md bg-ink text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-coral",
          isSmall ? "h-10 w-10" : "min-h-[52px] px-6"
        ].join(" ")}
        type="submit"
      >
        {shouldUseIconButton ? <SearchIcon /> : "Buscar"}
      </button>
    </form>
  );
}
