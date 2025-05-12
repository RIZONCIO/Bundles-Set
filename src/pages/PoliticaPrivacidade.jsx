import React from "react";
import "../styles/style.css";
import Header_ from "../components/Header_";
import Footer from "../components/Footer";

export default function PoliticaPrivacidade() {
    return (
        <>
          <Header_ />
          <section className="termos">
            <h1>Política de Privacidade</h1>
    
            <p >Última atualização: 05/05/2025</p>
    
            <p >
              A sua privacidade é importante para nós. Esta Política de Privacidade explica de forma clara e objetiva como o Steam Bundle Set trata os dados dos usuários.
            </p>
    

              <h2>1. Nenhuma Coleta de Dados Pessoais</h2>
              <p>
                O Steam Bundle Set <strong>não coleta, armazena ou solicita</strong> nenhum tipo de dado pessoal dos usuários. Não pedimos e-mail, nome, senha, CPF, endereço ou qualquer outra informação sensível.
              </p>
    
              <h2 >2. Navegação Livre</h2>
              <p>
                O uso do site é totalmente gratuito. Você pode acessar todos os conteúdos disponíveis sem precisar realizar qualquer tipo de cadastro ou login.
              </p>
    
              <h2 >3. Redirecionamento para Sites Terceiros</h2>
              <p>
                Nosso site apenas <strong>agrega e organiza informações</strong> sobre bundles, jogos gratuitos e promoções disponíveis na plataforma Steam.
                Ao clicar em links, você será redirecionado para o site oficial da Steam. <strong>Não nos responsabilizamos</strong> pelas práticas de privacidade adotadas por esses sites terceiros.
                Recomendamos que você leia as políticas de privacidade deles ao acessá-los.
              </p>
    
              <h2 >4. Cookies e Tecnologias de Rastreamento</h2>
              <p>
                Atualmente, o Steam Bundle Set <strong>não utiliza cookies, pixels, trackers ou serviços de analytics</strong> que identifiquem ou monitorem o comportamento dos usuários.
                Se futuramente isso mudar, esta política será atualizada com total transparência.
              </p>
    
              <h2>5. Conteúdo Externo e Responsabilidade</h2>
              <p>
                O Steam Bundle Set não possui controle sobre o conteúdo, promoções ou práticas da plataforma Steam. Caso haja jogos com classificação indicativa para maiores de idade,
                <strong> a responsabilidade pela verificação e controle é da Steam e dos pais ou responsáveis</strong>.
              </p>
    
              <h2 >6. Segurança</h2>
              <p>
                Como o site não coleta dados, não há banco de dados a ser protegido. Ainda assim, adotamos boas práticas para garantir a segurança do conteúdo exibido.
              </p>

              <h2 >7. Direitos dos Usuários</h2>
              <p>
                Mesmo sem coleta de dados, nos comprometemos com os princípios da transparência. Se em algum momento passarmos a utilizar cookies, formulários ou dados,
                garantiremos os direitos dos usuários conforme a LGPD (Lei nº 13.709/2018).
              </p>
    
              <h2 >8. Alterações na Política</h2>
              <p>
                Esta política pode ser atualizada a qualquer momento, caso o funcionamento do site mude. Todas as mudanças serão divulgadas nesta página, com a nova data de vigência.
              </p>

            <h2>9. Doações</h2>
                <p>
                O Steam Bundle Set oferece uma página de doações totalmente opcional e anônima, que permite aos usuários contribuírem com o projeto. Não coletamos, armazenamos ou processamos dados pessoais como nome, CPF, e-mail ou informações bancárias durante o processo de doação.
            </p>
                <p>
                Todas as transações são realizadas por plataformas externas (ex.: Pix, criptomoedas) que podem ter suas próprias políticas de privacidade. Recomendamos que os usuários consultem essas políticas diretamente nas respectivas plataformas antes de realizar qualquer doação.
                </p>
            
              <h2>10. Contato</h2>
              <p>
                Caso tenha dúvidas, sugestões ou precise entrar em contato conosco, utilize os canais listados no rodapé (footer) do site.
              </p>
          </section>
          <Footer />
        </>
      );
}
