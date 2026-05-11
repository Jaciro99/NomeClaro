"use client";

import { useSearchParams } from "next/navigation";
import { SearchBox } from "@/components/SearchBox";

export function NotFoundSearchBox() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return <SearchBox compact initialValue={query} key={query} />;
}
