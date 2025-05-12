import React from 'react';
import "../styles/style.css";
import Header_ from '../components/Header_';
import Footer from '../components/Footer';
import jogosGratis from '../data/jogosGratis.json';


function App() {
  return (
    <>
      <Header_ />
      
      <div className="pagina-jogos">
        <section className="secao-jogos-gratis">
          
          <h2 className="titulo-principal">🎉 Jogos Grátis na Steam Esta Semana! 🎉</h2>
          
          <div className="container-cards">
              {jogosGratis.slice(0, 8).map((jogo) => (
                  <div className="card-jogo" key={jogo.id}>
                    <img className="imagem-jogo" src={jogo.imagem} alt={jogo.nome} />
                  <div className="info-jogo">
          <div className="badge-gratis">
              <i className="fab fa-steam"></i> Free
          </div>
          <h3 className="titulo-jogo">{jogo.nome}</h3>
            <p className="resumo-jogo">{jogo.resumo}</p>
            <a
             href={jogo.link}
               target="_blank"
             rel="noopener noreferrer"
             className="botao-steam"
            >
             Ver na Steam
            </a>
         </div>
         </div>
              ))}
           </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
