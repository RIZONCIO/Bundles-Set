import React from "react";
import "../styles/stylesPage/Sobre.css";
import "../styles/stylesPage/Credito.css";
import { useNavigate } from "react-router-dom";
import Header_ from "../components/Header_";
import Footer from "../components/Footer";
import Credito from "../components/Credito";

export default function Sobre() {
  const navigate = useNavigate(); 

  return (
    <>
    <Header_ />
    <div className="sobre-wrapper">
      <div className="sobre-banner">
        <div className="sobre-texto">
          <i className="fa-brands fa-steam-symbol"></i>
          <h2>Você está na Steam Bundle Set</h2>
          <p>
            O lugar ideal para descobrir os melhores bundles da Steam! Aqui, você encontra ofertas exclusivas e pacotes completos para turbinar sua biblioteca de jogos.
          </p>
        </div>
      </div>
      <div className="sobre-info">
        <div className="info-item">
          <i className="fa-solid fa-layer-group"></i> 
          <h3>Grande catálogo</h3>
          <p>
            Explore uma coleção imensa de bundles, desde lançamentos até clássicos. Jogos incríveis, DLCs e edições especiais esperando por você!
          </p>
        </div>
        <div className="info-item">
          <i className="fa-solid fa-globe"></i> 
          <h3>Objetivo</h3>
          <p>
            Facilitamos sua vida reunindo os melhores bundles da Steam em um só lugar. Encontre os melhores preços e economize sem esforço!
          </p>
        </div>
        <div className="info-item">
          <i className="fa-solid fa-cart-shopping"></i> 
          <h3>Por que Comprar Bundle</h3>
          <p>
            Mais jogos por menos dinheiro! Os bundles são a forma mais inteligente de economizar e garantir experiências completas com pacotes exclusivos.
          </p>
        </div>
      </div>
    </div>
    <Credito />
    <Footer />
    </>
  );
}