import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, siteUrl } from "@/lib/names";
import {
  defaultOpenGraphImages,
  defaultTwitterMetadata,
  getRobotsMetadata,
  siteName
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NomeClaro: significado de nomes, origem e história",
    template: "%s | NomeClaro"
  },
  description:
    "Consulte significados de nomes, origem, gênero, história cultural, curiosidades, variações e nomes relacionados.",
  openGraph: {
    title: "NomeClaro: significado de nomes, origem e história",
    description:
      "Um guia rápido, bonito e confiável para descobrir o significado dos nomes.",
    url: absoluteUrl("/"),
    siteName,
    locale: "pt_BR",
    type: "website",
    images: defaultOpenGraphImages
  },
  twitter: defaultTwitterMetadata,
  alternates: {
    canonical: absoluteUrl("/")
  },
  robots: getRobotsMetadata()
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-scroll-behavior="smooth" lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
