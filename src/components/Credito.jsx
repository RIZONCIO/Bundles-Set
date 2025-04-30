import React, { useEffect, useRef, useState } from "react";
import "../styles/stylesPage/Credito.css";

export default function Credito() {
  const [mostrarTexto, setMostrarTexto] = useState("");
  const [mostrarCreditos, setMostrarCreditos] = useState(false);
  const texto = "C:\\Users\\Admin> start Credito.txt";
  const indexRef = useRef(0);
  const textoRef = useRef("");
  const canvasRefs = useRef([]);


  useEffect(() => {
    const digitarTexto = () => {
      if (indexRef.current < texto.length) {
        textoRef.current += texto[indexRef.current];
        setMostrarTexto(textoRef.current); // apenas renderiza o que acumulou
        indexRef.current++;
        setTimeout(digitarTexto, 100);
      } else {
        setTimeout(() => setMostrarCreditos(true), 1000);
      }
    };
    

    setTimeout(digitarTexto, 500);
  }, []);

  useEffect(() => {
    if (mostrarCreditos) {
      canvasRefs.current.forEach((canvas) => {
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        const fontSize = 12;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const drawMatrix = () => {
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
        };

        setInterval(drawMatrix, 50);
      });
    }
  }, [mostrarCreditos]);

  return (
    <section className="credito-container">
      <div className="terminal">
        <div className="terminal-header">
          <div className="icon">
            <i className="fa-solid fa-terminal"></i>
            Terminal
          </div>
          <div className="terminal-buttons">
            <i className="fas fa-window-minimize"></i>
            <i className="fas fa-window-maximize"></i>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="terminal-body">
          <p>{mostrarTexto}</p>
        </div>
      </div>

      {mostrarCreditos && (
        <div id="creditos">
          {[
            {
              titulo: "Desenvolvedor Back-End",
              nome: "Matheus Coelho",
              descricao:
                "Criou a API que busca os bundles da Steam e ajudou a migrar todo o projeto para React, deixando o código mais organizado e eficiente",
              github: "https://github.com/matheus-fsc",
            },
            {
              titulo: "Desenvolvedor Front-End e UI & UX Design",
              nome: "Ryan Vinicius",
              descricao:
                "Desenhou o layout do site e codou a parte visual, cuidando para que tudo fosse intuitivo e agradável de usar",
              github: "https://github.com/RIZONCIO",
            },
            {
              titulo: "Desenvolvedor do estilo do Darkmode",
              nome: "Jaydip Prajapati",
              descricao:
                "Criador do UI do Darkmode. O modo escuro foi retirado do perfil dele no Uiverse.io!",
              github: "https://github.com/JaydipPrajapati1910",
            },
          ].map((dev, index) => (
            <div className="card-pg2" key={index}>
              <canvas
                className="matrix-effect"
                ref={(el) => (canvasRefs.current[index] = el)}
              ></canvas>
              <div className="card-content2">
                <h3>{dev.titulo}</h3>
                <p className="name_titulo">{dev.nome}</p>
                <p className="descricao">{dev.descricao}</p>
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
