import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { absoluteUrl } from "@/lib/names";
import { getOpenGraphDefaults } from "@/lib/seo";

const title = "Termos de Uso";
const description =
  "Conheça as condições gerais de uso do NomeClaro, um site informativo sobre nomes e sobrenomes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/termos-de-uso")
  },
  openGraph: {
    ...getOpenGraphDefaults("/termos-de-uso"),
    title,
    description,
    type: "website"
  }
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      description={description}
      eyebrow="Termos"
      title={title}
      updatedAt="11 de maio de 2026"
    >
      <section className="space-y-4">
        <h2>1. Uso informativo</h2>
        <p>
          O NomeClaro oferece conteúdo informativo sobre significado, origem,
          história cultural, variações e curiosidades de nomes e sobrenomes. As
          informações são apresentadas para consulta geral, pesquisa e
          descoberta de conteúdo.
        </p>
      </section>

      <section className="space-y-4">
        <h2>2. Precisão das informações</h2>
        <p>
          Trabalhamos para manter as informações úteis e bem organizadas, mas não
          garantimos precisão absoluta, completude permanente ou ausência total
          de erros. Origem e significado de nomes podem variar conforme região,
          idioma, tradição familiar e fontes históricas.
        </p>
      </section>

      <section className="space-y-4">
        <h2>3. Uso indevido</h2>
        <p>
          O usuário não deve tentar comprometer a segurança do site, copiar
          conteúdo em massa, automatizar acessos abusivos, explorar falhas,
          prejudicar a experiência de outros usuários ou usar o conteúdo de forma
          ilegal.
        </p>
      </section>

      <section className="space-y-4">
        <h2>4. Direitos autorais</h2>
        <p>
          Textos, organização editorial, layout, identidade visual e estrutura do
          site pertencem ao NomeClaro ou aos seus respectivos titulares. O uso do
          site não concede licença para reprodução integral, redistribuição
          comercial ou cópia sistemática do conteúdo.
        </p>
      </section>

      <section className="space-y-4">
        <h2>5. Atualizações</h2>
        <p>
          O conteúdo, as páginas, as funcionalidades e estes termos podem ser
          atualizados ao longo do tempo para acompanhar melhorias editoriais,
          técnicas, legais ou comerciais.
        </p>
      </section>

      <section className="space-y-4">
        <h2>6. Contato</h2>
        <p>
          Para dúvidas sobre estes termos, use o contato placeholder:{" "}
          <strong>contato@nomeclaro.com.br</strong>. Substitua este endereço pelo
          canal oficial antes da publicação final.
        </p>
      </section>
    </LegalPageLayout>
  );
}
