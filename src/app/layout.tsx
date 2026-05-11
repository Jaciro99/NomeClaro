import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, siteUrl } from "@/lib/names";

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
    siteName: "NomeClaro",
    locale: "pt_BR",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
