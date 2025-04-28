document.addEventListener("DOMContentLoaded", function () {
  const sobreContainer = document.getElementById("sobre-container");

  sobreContainer.innerHTML = `
          <div class="sobre-wrapper">
              <div class="sobre-banner">
                  <div class="sobre-texto">
                    <i class="fa-brands fa-steam-symbol"></i>
                      <h2>Você está na Steam Bundle Set</h2>
                      <p>O lugar ideal para descobrir os melhores bundles da Steam! Aqui, você encontra ofertas exclusivas e pacotes completos para turbinar sua biblioteca de jogos.</p>
                  </div>
              </div>
              <div class="sobre-info">
                  <div class="info-item">
                      <i class="fa-solid fa-layer-group"></i> <!-- Ícone para catálogo -->
                      <h3>Grande catálogo</h3>
                      <p>Explore uma coleção imensa de bundles, desde lançamentos até clássicos. Jogos incríveis, DLCs e edições especiais esperando por você!</p>
                  </div>
                  <div class="info-item">
                      <i class="fa-solid fa-globe"></i> <!-- Ícone global -->
                      <h3>Objetivo</h3>
                      <p>Facilitamos sua vida reunindo os melhores bundles da Steam em um só lugar. Encontre os melhores preços e economize sem esforço!</p>
                  </div>
                  <div class="info-item">
                      <i class="fa-solid fa-cart-shopping"></i> <!-- Ícone de compra -->
                      <h3>Por que Comprar Bundle</h3>
                      <p>Mais jogos por menos dinheiro! Os bundles são a forma mais inteligente de economizar e garantir experiências completas com pacotes exclusivos.</p>
                  </div>
              </div>
          </div>
      `;
});
