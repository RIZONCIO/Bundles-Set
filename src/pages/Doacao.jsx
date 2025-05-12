import React, { useEffect, useState } from "react";
import "../styles/style.css";
import Header_ from "../components/Header_";
import Footer from "../components/Footer";

const comidas = [
  { nome: "um café", icone: "fas fa-coffee" },
  { nome: "um hambúrguer", icone: "fas fa-hamburger" },
  { nome: "uma pizza", icone: "fas fa-pizza-slice" },
  { nome: "um sushi", icone: "fas fa-fish" },
  { nome: "um sorvete", icone: "fas fa-ice-cream" },
  { nome: "uma maçã", icone: "fa fa-apple-whole" },
  { nome: "um hot-dog", icone: "fas fa-hotdog" },
  { nome: "um waffle", icone: "fa fa-stroopwafel" },
];

export default function Doacao() {
  const [comida, setComida] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const comidaAleatoria = comidas[Math.floor(Math.random() * comidas.length)];
    setComida(comidaAleatoria);

    const linkMercadoPago = "http://link.mercadopago.com.br/steambundlesetdoacao";
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(linkMercadoPago)}`;
    setQrCodeUrl(qrUrl);
  }, []);

  const copiarIdBinance = () => {
    const idBinance = "1025750319";
    navigator.clipboard.writeText(idBinance)
      .then(() => alert("ID da Binance copiado!"))
      .catch((err) => console.error("Erro ao copiar:", err));
  };

  const BannerFoods = () => (
    <div className="banner-foods">
      <i className={comida?.icone}></i>
      <p>Me pague {comida?.nome}</p>
    </div>
  );

  return (
    <>
    <Header_ />
    <section id="doacao-container">
      <div className="banner-principal"></div>

      <div className="banner-doacao">
        <h1>Sua doação mantém o projeto vivo!</h1>
        <p>Não é obrigatório doar, mas cada contribuição — seja de tempo, conhecimento ou recursos — faz toda a diferença.</p>

        <h2>Como ajudar?</h2>
        <ul className="lista-doacao">
          <li>Se você programa, colabore com código! Precisamos de mentes criativas para evoluir a plataforma.</li>
          <li>Se prefere doar, qualquer valor ajuda a pagar servidores, melhorar o site e criar novos projetos.</li>
        </ul>

        <h2>Para onde vai seu dinheiro?</h2>
        <ul className="lista-doacao">
          <li>Atualizações técnicas e segurança.</li>
          <li>Novas funcionalidades para todos.</li>
          <li>Manutenção mensal.</li>
        </ul>

        <h2>Nem R$1,00 é pouco.</h2>
        <p>Até um cafezinho pode sustentar o projeto por mais um dia.</p>
        <p>Obrigado por acreditar na gente!🫡</p>
      </div>

      <div className="doacao-container">
        <div className="doacao-card">
          <BannerFoods />
          <h3>Doe via Mercado Pago</h3>
          <p>Escaneie o QR Code para ser redirecionado.</p>
          <img id="qr-mercado-pago" src={qrCodeUrl} alt="QR Code Mercado Pago" />
          <a href="http://link.mercadopago.com.br/steambundlesetdoacao" target="_blank" className="btn-card-doacao-pago" rel="noopener noreferrer">
            Ir para o Mercado Pago
          </a>
        </div>

        <div className="doacao-card">
          <BannerFoods />
          <h3>Doe via Criptomoedas Na Binance</h3>
          <p>Escaneie o QR Code ou copie o ID.</p>
          <img src="../img/Cripto.png" alt="QR Code Binance" />
          <button className="btn-card-doacao" onClick={copiarIdBinance}>Copiar ID</button>
        </div>
      </div>
    </section>
    <Footer /> 
    </>
  );
}
