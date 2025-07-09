import React, { useRef,useEffect,useState } from "react";
import "../styles/style.css";
import Header_ from "../components/Header_";
import Footer from "../components/Footer";

const eventos = [
  { data: "10 a 17 de fevereiro", tema: "Festival do Cooperativo Local", status: "Finalizado" },
  { data: "24 de fevereiro a 3 de março", tema: "Steam Vem Aí, edição de fevereiro de 2025", status: "Finalizado" },
  { data: "3 a 10 de março", tema: "Festival de Romances Visuais", status: "Finalizado" },
  { data: "13 a 20 de março", tema: "Promoção de Outono do Steam de 2025", status: "Finalizado" },
  { data: "24 a 31 de março", tema: "Festival de Construção de Cidades e Simuladores de Colônia", status: "Finalizado" },
  { data: "21 a 28 de abril", tema: "Festival de Sokoban", status: "Finalizado" },
  { data: "28 de abril a 5 de maio", tema: "Festival de Jogos de Guerra", status: "Finalizado" },
  { data: "12 a 19 de maio", tema: "Festival de Coleção de Criaturas", status: "Finalizado" },
  { data: "26 de maio a 2 de junho", tema: "Festival de Zumbis X Vampiros", status: "Finalizado" },
  { data: "9 a 16 de junho", tema: "Steam Vem Aí, edição de junho de 2025", status: "Finalizado" },
  { data: "16 a 23 de junho", tema: "Festival de Pesca", status: "Ativo" },
  { data: "26 de junho a 10 de julho", tema: "Promoção de Férias do Steam de 2025", status: "Em breve" },
  { data: "14 a 21 de julho", tema: "Festival da Automação", status: "Em breve" },
  { data: "28 de julho a 4 de agosto", tema: "Festival de Corrida", status: "Em breve" },
  { data: "11 a 18 de agosto", tema: "Festival dos 4X", status: "Em breve" },
  { data: "25 de agosto a 1º de setembro", tema: "Festival de Tiro em Terceira Pessoa", status: "Em breve" },
  { data: "8 a 15 de setembro", tema: "Festival da Simulação Política", status: "Em breve" },
  { data: "29 de setembro a 6 de outubro", tema: "Promoção de Primavera do Steam de 2025", status: "Em breve" },
  { data: "13 a 20 de outubro", tema: "Steam Vem Aí, edição de outubro de 2025", status: "Em breve" },
  { data: "27 de outubro a 3 de novembro", tema: "Festival Susteam 4", status: "Em breve" },
  { data: "10 a 17 de novembro", tema: "Festival Animal", status: "Em breve" },
  { data: "8 a 15 de dezembro", tema: "Festival Esportivo", status: "Em breve" },
  { data: "18 de dezembro de 2025 a 5 de janeiro e 2026", tema: "Promoção de Fim de Ano do Steam de 2025", status: "Em breve" },
];

export default function Evento() {
  const [showEasterEggs, setShowEasterEggs] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  const [isMostrandoMensagens, setIsMostrandoMensagens] = useState(false);

  const audioRef = useRef(null);
  const notiAudioRef = useRef(null); 

  const tocarMusica = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const mostrarMensagens = () => {
    if (isMostrandoMensagens) return;
    setIsMostrandoMensagens(true);

const criadores = [
  { nome: "Gabe Newell", verificado: true },
  { nome: "Mike Harrington", verificado: true }
];


    let delay = 0;
    criadores.forEach((criador) => {
      setTimeout(() => {
        setMensagens((prev) => [...prev, criador]);
        if (notiAudioRef.current) {
          notiAudioRef.current.currentTime = 0;
          notiAudioRef.current.play();
        }
      }, delay);
      delay += 2000;
    });

    setTimeout(() => {
      setMensagens([]);
      setIsMostrandoMensagens(false);
    }, delay + 2000);
  };

useEffect(() => {
  let typed = "";

  const handleKeydown = (e) => {
    const char = e.key.length === 1 ? e.key.toLowerCase() : "";

    if (char) {
      typed += char;
      if (typed.length > 20) typed = typed.slice(-20);
    }

    if (typed.includes("steam")) {
      setShowEasterEggs(true);
      typed = ""; 
    }
  };

  window.addEventListener("keydown", handleKeydown);
  return () => window.removeEventListener("keydown", handleKeydown);
}, []);


  return (
    <>
      <Header_ />
      <div className="EventosTabela">
        <h2 className="titulo-eventos">Tabela de Eventos</h2>
        <table className="tabela-eventos">
          <thead>
            <tr>
              <th>Datas do evento</th>
              <th>Tema</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento, index) => (
              <tr key={index}>
                <td>{evento.data}</td>
                <td>{evento.tema}</td>
                <td>
                   <span
                        className={`status ${
                         evento.status === "Ativo" ? "ativo" : evento.status === "Finalizado"? "finalizado": "embreve"}`
                        }>{evento.status}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<div className={`Easter_Eggs ${showEasterEggs ? "visible" : ""}`}>
  <button className="btn-egg" onClick={tocarMusica}></button>
  <button className="btn-egg-popup" onClick={mostrarMensagens}></button>
  <audio ref={audioRef} src="/audio/valve-intro.mp3" preload="auto" />
</div>

<div className="mensagens-popup">
  {mensagens.map((m, index) => (
    <div className="popup-msg" key={index}>
<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
  <strong>{m.nome}</strong>
  {m.verificado && (
    <img
      src="/img/valve_comment.png"
      alt="Verificado"
      width="59"
      height="16"
      style={{ objectFit: "contain" }}
    />
  )}
</div>
<p>{m.msg}</p>
    </div>
  ))}
  <audio ref={notiAudioRef} src="/audio/steam_notification.mp3" preload="auto" />
</div>
      <Footer />
    </>
  );
}
