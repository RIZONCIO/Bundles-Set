document.addEventListener("DOMContentLoaded", function () {
  const creditoContainer = document.getElementById("credito-container");

  creditoContainer.innerHTML = `
  <div class="terminal">
      <div class="terminal-header">
          <div class="icon">
              <i class="fa-solid fa-terminal"></i>
              Terminal
          </div>
          <div class="terminal-buttons">
              <i class="fas fa-window-minimize"></i>  
              <i class="fas fa-window-maximize"></i>  
              <i class="fas fa-times"></i>  
          </div>
      </div>
      <div class="terminal-body">
          <p id="cmd-texto"></p>
      </div>
  </div>
`;

  const texto = "C:\\Users\\Admin> start Credito.txt";
  let index = 0;

  function digitarTexto() {
    const cmdTexto = document.getElementById("cmd-texto");
    if (!cmdTexto) return; // Se não existir, sai da função

    if (index < texto.length) {
      cmdTexto.innerHTML += texto[index];
      index++;
      setTimeout(digitarTexto, 100);
    } else {
      setTimeout(mostrarCreditos, 1000);
    }
  }

  function mostrarCreditos() {
    creditoContainer.innerHTML += `
        <div id="creditos">
            <div class="card-pg2">
                <canvas class="matrix-effect"></canvas>
                <div class="card-content2">
                    <h3>Desenvolvedor Back-End</h3>
                    <p class="name_titulo">Matheus Coelho</p>
                    <p class="descricao">Desenvolveu o SteamBundleAPI para buscar todos os Bundles da steam.</p>
                    <a href="https://github.com/matheus-fsc" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <div class="card-pg2">
                <canvas class="matrix-effect"></canvas>
                <div class="card-content2">
                    <h3>Desenvolvedor Front-End e UI & UX Design</h3>
                    <p class="name_titulo">Ryan Vinicius</p>
                    <p class="descricao">Responsável por desenvolvera parte visual do site.</p>
                    <a href="https://github.com/RIZONCIO" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <div class="card-pg2">
                <canvas class="matrix-effect"></canvas>
                <div class="card-content2">
                    <h3>Desenvolvedor do estilo do Darkmode</h3>
                    <p class="name_titulo">Jaydip Prajapati</p>
                    <p class="descricao">Criador do UI do Darkmode. O modo escuro foi retirado do perfil dele no Uiverse.io!</p>
                    <a href="https://github.com/JaydipPrajapati1910" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    const cards = document.querySelectorAll(".matrix-effect");

    cards.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const fontSize = 12;
      const columns = canvas.width / fontSize;
      const drops = Array(Math.floor(columns)).fill(1);

      function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "lime";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      setInterval(drawMatrix, 50);
    });
  }

  setTimeout(digitarTexto, 500);
});
