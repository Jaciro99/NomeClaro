import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/names";

export const siteName = "NomeClaro";

export const defaultOpenGraphImages = [
  {
    url: "/icon.png",
    width: 540,
    height: 540,
    alt: "NomeClaro"
  }
];

export const defaultTwitterMetadata: Metadata["twitter"] = {
  card: "summary",
  title: "NomeClaro: significado de nomes, origem e história",
  description:
    "Consulte significados de nomes e sobrenomes com origem, história cultural e curiosidades.",
  images: ["/icon.png"]
};

export function isIndexableEnvironment() {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }

  return process.env.NODE_ENV === "production";
}

export function getRobotsMetadata(noIndex = false): Metadata["robots"] {
  if (noIndex || !isIndexableEnvironment()) {
    return {
      index: false,
      follow: true
    };
  }

  return {
    index: true,
    follow: true
  };
}

export function getOpenGraphDefaults(path = "/") {
  return {
    siteName,
    locale: "pt_BR",
    url: absoluteUrl(path),
    images: defaultOpenGraphImages
  };
}
