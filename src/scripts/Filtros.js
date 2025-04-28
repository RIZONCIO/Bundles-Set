document.addEventListener("DOMContentLoaded", () => {
  const filtroContainer = document.querySelector(".filtro-container");

  const header = document.createElement("div");
  header.className = "filtro-header";
  header.innerHTML = `
        <span class="resultados">5784 resultados</span>
        <div class="listar-por">
            <span>Listar por:</span>
            <select>
                <option value="mais-procurados">MAIS PROCURADOS</option>
                <option value="ordem-alfabetica">ORDEM ALFABÉTICA</option>
                <option value="menor-preco">MENOR PREÇO</option>
                <option value="maior-preco">MAIOR PREÇO</option>
            </select>
        </div>
    `;
  filtroContainer.appendChild(header);

  const filtros = {
    Sistema: ["Windows", "Linux-SteamOS"],
    Tipo: ["Jogo Completo", "DLC", "Pacote de Moeda", "Jogos Adultos"],
    Gêneros: [
      "Ação",
      "RPG",
      "Aventura",
      "Battle Royale",
      "Esportes",
      "Simulação",
      "Estratégia",
      "Corrida",
      "Terror",
      "Quebra-cabeça",
      "Plataforma",
      "Luta e Artes Marciais",
      "Mundo Aberto",
      "Musical",
      "Ritmo",
      "Cartas",
      "Tabuleiro",
      "Casual",
      "Indie",
      "Tabuleiro e Cartas",
      "Realidade Virtual (VR)",
      "Hack and Slash",
      "MMO",
      "MOBA",
      "FPS",
      "RTS",
    ],
    Distribuidor: [
      "Ubisoft",
      "EA",
      "Rockstar",
      "Capcom",
      "Deep Silver",
      "Square Enix",
      "Bethesda",
      "Activision",
      "CD Projekt Red",
      "Konami",
      "Bandai Namco",
      "Sega",
      "Sony",
      "Microsoft",
      "Valve",
      "Telltale Games",
      "Nexon",
      "NCSOFT",
      "Outros",
    ],
    Preço: ["Até R$50", "R$50 - R$100", "R$100 - R$500", "Acima de R$500"],
  };

  const filtrosWrapper = document.createElement("div");
  filtrosWrapper.className = "filtros-wrapper";
  filtroContainer.appendChild(filtrosWrapper);

  Object.entries(filtros).forEach(([filtro, opcoes]) => {
    const filtroDiv = document.createElement("div");
    filtroDiv.className = "filtro-item";
    filtroDiv.innerHTML = `
            <button class="filtro-btn">${filtro} ▼</button>
            <ul class="filtro-dropdown">
                ${opcoes
                  .map(
                    (opcao) => `
                    <li>
                        <label>
                            <input type="checkbox" value="${opcao}">
                            ${opcao}
                        </label>
                    </li>`
                  )
                  .join("")}
            </ul>
        `;
    filtrosWrapper.appendChild(filtroDiv);
  });

  // Lógica para abrir e fechar menus corretamente
  document.querySelectorAll(".filtro-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const dropdown = btn.nextElementSibling;
      const allDropdowns = document.querySelectorAll(".filtro-dropdown");

      // Fechar todos os dropdowns antes de abrir o atual
      allDropdowns.forEach((menu) => {
        if (menu !== dropdown) menu.classList.remove("ativo");
      });

      // Alternar apenas o menu clicado
      dropdown.classList.toggle("ativo");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".filtro-dropdown").forEach((menu) => {
      menu.classList.remove("ativo");
    });
  });

  // Lógica do menu hambúrguer
  const botaoMenu = document.querySelector(".menu-hamburguer");

  botaoMenu.addEventListener("click", () => {
    filtrosWrapper.classList.toggle("ativo");
  });
});
