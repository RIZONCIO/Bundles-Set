import React, { useState, useEffect, useRef } from 'react';
import '../styles/Filtros.css';

export default function FiltroContainer() {
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const filtrosWrapperRef = useRef(null);

  const filtros = {
    Sistema: ["Windows", "Linux-SteamOS"],
    Tipo: ["Jogo Completo", "DLC", "Pacote de Moeda", "Jogos Adultos"],
    Gêneros: [
      "Ação", "RPG", "Aventura", "Battle Royale", "Esportes",
      "Simulação", "Estratégia", "Corrida", "Terror",
      "Quebra-cabeça", "Plataforma", "Luta e Artes Marciais",
      "Mundo Aberto", "Musical", "Ritmo", "Cartas", "Tabuleiro",
      "Casual", "Indie", "Tabuleiro e Cartas", "Realidade Virtual (VR)",
      "Hack and Slash", "MMO", "MOBA", "FPS", "RTS",
    ],
    Distribuidor: [
      "Ubisoft", "EA", "Rockstar", "Capcom", "Deep Silver",
      "Square Enix", "Bethesda", "Activision", "CD Projekt Red",
      "Konami", "Bandai Namco", "Sega", "Sony", "Microsoft",
      "Valve", "Telltale Games", "Nexon", "NCSOFT", "Outros",
    ],
    Preço: ["Até R$50", "R$50 - R$100", "R$100 - R$500", "Acima de R$500"],
  };

  useEffect(() => {
    function handleClickFora(event) {
      if (!filtrosWrapperRef.current?.contains(event.target)) {
        setDropdownAberto(null);
      }
    }

    document.addEventListener("click", handleClickFora);
    return () => document.removeEventListener("click", handleClickFora);
  }, []);

  return (
    <section className="filtro-container">
      <div className="filtro-header">
        <div className="listar-por">
          <span>Listar por:</span>
          <select>
            <option value="mais-procurados">MAIS PROCURADOS</option>
            <option value="ordem-alfabetica">ORDEM ALFABÉTICA</option>
            <option value="menor-preco">MENOR PREÇO</option>
            <option value="maior-preco">MAIOR PREÇO</option>
          </select>
        </div>
      </div>

      <div
        className={`filtros-wrapper ${menuAberto ? 'ativo' : ''}`}
        ref={filtrosWrapperRef}
      >
        {Object.entries(filtros).map(([titulo, opcoes]) => (
          <div className="filtro-item" key={titulo}>
            <button
              className="filtro-btn"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownAberto(dropdownAberto === titulo ? null : titulo);
              }}
            >
              {titulo} ▼
            </button>
            <ul className={`filtro-dropdown ${dropdownAberto === titulo ? 'ativo' : ''}`}>
              {opcoes.map((opcao) => (
                <li key={opcao}>
                  <label>
                    <input type="checkbox" value={opcao} />
                    {opcao}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        className="menu-hamburguer"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        ☰
      </button>
    </section>
  );
}