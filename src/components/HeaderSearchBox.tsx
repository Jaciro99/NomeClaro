"use client";

import { usePathname } from "next/navigation";
import { SearchBox } from "@/components/SearchBox";

type HeaderSearchBoxProps = {
  mobile?: boolean;
};

export function HeaderSearchBox({ mobile = false }: HeaderSearchBoxProps) {
  const pathname = usePathname();

  return (
    <SearchBox
      clearOnSubmit
      key={`${mobile ? "mobile" : "desktop"}-${pathname}`}
      placeholder="Buscar nome"
      variant={mobile ? "mini" : "header"}
    />
  );
}
