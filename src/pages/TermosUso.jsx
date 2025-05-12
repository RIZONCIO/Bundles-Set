import React from "react";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";
import Header_ from "../components/Header_";
import Footer from "../components/Footer";
export default function TermosUso() {

    const navigate = useNavigate();

    return (
        <>
        <Header_ />
        <section className="termos">
            <h1>Termos de Uso do Steam Bundle Set</h1>
            <p>
                Bem-vindo ao Steam Bundle Set! Ao acessar e utilizar este site, você
                concorda com os seguintes Termos de Uso. Leia-os atentamente antes de
                prosseguir. Se você não concordar com estes termos, por favor, não
                utilize o site.
            </p>

            <h2>1. Sobre o Site</h2>
            <p>
                O Steam Bundle Set é uma plataforma que reúne informações sobre{" "}
                <strong>bundles</strong> (pacotes de jogos ou produtos) disponíveis na
                plataforma Steam. Nosso objetivo é facilitar o acesso dos usuários a
                esses pacotes, direcionando-os para a compra diretamente na Steam.
            </p>
            <p>
                <strong>Importante:</strong> O Steam Bundle Set <strong>não vende</strong>{" "}
                nenhum produto ou serviço. Somos apenas um agregador de informações, e
                todas as compras são realizadas exclusivamente na plataforma Steam.
            </p>

            <h2>2. Uso das Imagens</h2>
            <p>
                <strong>Imagens Criadas pelo Site:</strong> Algumas das imagens
                utilizadas no Steam Bundle Set são de autoria própria e estão protegidas
                por direitos autorais, conforme a <strong>Lei nº 9.610/1998</strong>{" "}
                (Lei de Direitos Autorais). O uso dessas imagens fora do site é proibido
                sem autorização prévia.
            </p>
            <p>
                <strong>Imagens dos Pacotes da Steam:</strong> As imagens dos bundles,
                jogos e produtos são retiradas diretamente da plataforma Steam. Essas
                imagens são de propriedade da Steam e/ou dos respectivos desenvolvedores
                e publishers. O Steam Bundle Set não reivindica nenhum direito sobre
                essas imagens e as utiliza apenas para fins informativos, de acordo com
                as políticas de uso da Steam.
            </p>

            <h2>3. Responsabilidades do Usuário</h2>
            <p>Ao utilizar o Steam Bundle Set, você concorda em:</p>
            <ul>
                <li>Utilizar o site apenas para fins legais e de acordo com estes Termos de Uso.</li>
                <li>Não reproduzir, distribuir ou modificar o conteúdo do site sem autorização prévia.</li>
                <li>Não utilizar o site para qualquer atividade que possa prejudicar a plataforma Steam, seus desenvolvedores ou outros usuários.</li>
            </ul>

            <h2>4. Isenção de Responsabilidade</h2>
            <p>
                O Steam Bundle Set não é responsável por qualquer transação realizada na
                plataforma Steam. Todas as compras são de responsabilidade exclusiva do
                usuário e estão sujeitas aos Termos de Uso da Steam.
            </p>
            <p>
                Embora nos esforcemos para manter as informações atualizadas, não
                garantimos a precisão ou completude dos dados exibidos no site.
                Recomendamos que os usuários verifiquem as informações diretamente na
                Steam antes de realizar qualquer compra.
            </p>
            <p>
                O Steam Bundle Set <strong>não se responsabiliza</strong> por eventuais
                danos ou prejuízos decorrentes do uso ou incapacidade de uso do site.
            </p>
            <ul>
                <li>Conteúdo adulto acessado por menores de idade através da Steam;</li>
                <li>Falhas na verificação de idade realizada pela Steam;</li>
                <li>Danos decorrentes do acesso a informações ou produtos inadequados.</li>
            </ul>

            <h2>5. Propriedade Intelectual</h2>
            <p>
                Todo o conteúdo original do Steam Bundle Set, incluindo textos,
                gráficos, logotipos e imagens criadas pelo site, são de propriedade
                exclusiva do Steam Bundle Set e estão protegidos por leis de direitos
                autorais, incluindo a <strong>Lei nº 9.610/1998</strong>. O uso não
                autorizado desse conteúdo é estritamente proibido.
            </p>

            <h2>6. Conteúdo Adulto e Verificação de Idade</h2>
            <p>
                Alguns bundles ou jogos listados no Steam Bundle Set podem conter
                conteúdo classificado como adulto (ex.: violência, linguagem inadequada
                ou temas sensíveis). É importante destacar:
            </p>

            <h2>7. Responsabilidade da Steam</h2>
            <p>
                Todas as informações sobre classificação etária, restrições de idade e
                conteúdo dos bundles são disponibilizadas{" "}
                <strong>diretamente pela Steam</strong>.
            </p>
            <p>
                A Steam é responsável por verificar a idade dos usuários e garantir a
                conformidade com suas políticas de venda, incluindo a restrição de
                acesso a conteúdo adulto por menores de idade.
            </p>

            <h2>8. Aviso a Responsáveis</h2>
            <ul>
                <li>Monitorar o acesso à Steam e ao Steam Bundle Set.</li>
                <li>
                    Utilizar ferramentas de controle parental oferecidas pela Steam para
                    restringir conteúdo inadequado.
                </li>
            </ul>

            <h2>9. Alterações nos Termos de Uso</h2>
            <p>
                O Steam Bundle Set reserva-se o direito de modificar estes Termos de
                Uso a qualquer momento. As alterações entrarão em vigor imediatamente
                após sua publicação no site. Recomendamos que você revise periodicamente
                os Termos de Uso para se manter informado sobre eventuais mudanças.
            </p>

            <h2>10. Variações de Preços</h2>
            <p>
                Os preços exibidos nos cards dos bundles podem não refletir o valor exato no momento do acesso. Isso ocorre porque:
            </p>
                <ul>
                    <li>Os valores podem variar conforme a conta do usuário Steam, especialmente se ele já possuir um ou mais jogos do pacote (o que pode reduzir o preço final).</li>
                    <li>Nosso sistema não realiza atualização de preços em tempo real, devido a limitações de servidor e recursos. Os dados são coletados em intervalos e podem ficar desatualizados por algumas horas.</li>
                </ul>
            <p>
                Recomendamos que o usuário sempre verifique o preço final diretamente na página do bundle na Steam antes de efetuar qualquer compra.
            </p>

            <h2>11. Lei Aplicável</h2>
            <p>
                Estes Termos de Uso são regidos pelas leis do <strong>Brasil</strong> e
                quaisquer disputas relacionadas ao uso do site serão resolvidas nos
                tribunais competentes dessa localidade.
            </p>

            <h2>12. Contato</h2>
            <p>
                Se você tiver dúvidas ou preocupações sobre estes Termos de Uso, entre
                em contato conosco através das nossas redes sociais no footer.
            </p>

            <p>Data de entrada em vigor: 13/03/2025</p>

        </section>
        <Footer />
        </>
    );

}

