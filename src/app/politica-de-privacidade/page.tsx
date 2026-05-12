import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { absoluteUrl } from "@/lib/names";
import { getOpenGraphDefaults } from "@/lib/seo";

const title = "Política de Privacidade";
const description =
  "Entenda como o NomeClaro utiliza cookies, dados técnicos, ferramentas de análise e possíveis anúncios futuros.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/politica-de-privacidade")
  },
  openGraph: {
    ...getOpenGraphDefaults("/politica-de-privacidade"),
    title,
    description,
    type: "website"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      description={description}
      eyebrow="Privacidade"
      title={title}
      updatedAt="11 de maio de 2026"
    >
      <section className="space-y-4">
        <h2>1. Visão geral</h2>
        <p>
          O NomeClaro é um site informativo sobre significados, origens,
          histórias e curiosidades de nomes e sobrenomes. Atualmente, o site não
          exige cadastro, não solicita login e não coleta dados pessoais
          diretamente por formulários de conta.
        </p>
      </section>

      <section className="space-y-4">
        <h2>2. Cookies e tecnologias semelhantes</h2>
        <p>
          Podemos usar cookies e tecnologias semelhantes para lembrar preferências
          simples, melhorar a experiência de navegação e entender como as páginas
          são utilizadas. O aviso de cookies do site salva apenas a informação de
          consentimento no navegador do usuário.
        </p>
      </section>

      <section className="space-y-4">
        <h2>3. Analytics e dados técnicos</h2>
        <p>
          No futuro, o site poderá usar ferramentas de análise para medir visitas,
          páginas acessadas, origem aproximada do tráfego, tipo de dispositivo,
          navegador e dados técnicos similares. Essas informações tendem a ser
          usadas de forma agregada para melhorar conteúdo, performance e
          navegação.
        </p>
      </section>

      <section className="space-y-4">
        <h2>4. Anúncios e ferramentas terceiras</h2>
        <p>
          O site possui áreas preparadas para anúncios futuros, como Google
          AdSense ou plataformas semelhantes. Quando essas ferramentas forem
          ativadas, terceiros poderão usar cookies ou identificadores para exibir
          anúncios, medir desempenho e prevenir fraudes, conforme suas próprias
          políticas.
        </p>
      </section>

      <section className="space-y-4">
        <h2>5. Compartilhamento de dados</h2>
        <p>
          Não vendemos dados pessoais fornecidos diretamente pelo usuário. Dados
          técnicos ou anônimos podem ser processados por ferramentas terceiras de
          analytics, hospedagem, segurança, anúncios e infraestrutura, sempre com
          a finalidade de operar e melhorar o site.
        </p>
      </section>

      <section className="space-y-4">
        <h2>6. Direitos do usuário</h2>
        <p>
          O usuário pode limpar cookies no próprio navegador, bloquear
          rastreadores por configurações do dispositivo e entrar em contato para
          dúvidas relacionadas à privacidade. Como o site não possui cadastro no
          momento, não mantemos uma área de conta com dados pessoais editáveis.
        </p>
      </section>

      <section className="space-y-4">
        <h2>7. Contato</h2>
        <p>
          Para dúvidas sobre privacidade, use o contato placeholder:{" "}
          <strong>privacidade@nomeclaro.com.br</strong>. Substitua este endereço
          pelo canal oficial antes da publicação final.
        </p>
      </section>
    </LegalPageLayout>
  );
}
