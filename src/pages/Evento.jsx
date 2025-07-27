import React, { useRef, useEffect, useState } from "react";
import "../styles/style.css";
import Header_ from "../components/Header_";
import Footer from "../components/Footer";

const eventosOriginais = [
  { data: "10 a 17 de fevereiro", tema: "Festival do Cooperativo Local" },
  { data: "24 de fevereiro a 3 de março", tema: "Steam Vem Aí, edição de fevereiro de 2025" },
  { data: "3 a 10 de março", tema: "Festival de Romances Visuais" },
  { data: "13 a 20 de março", tema: "Promoção de Outono do Steam de 2025" },
  { data: "24 a 31 de março", tema: "Festival de Construção de Cidades e Simuladores de Colônia" },
  { data: "21 a 28 de abril", tema: "Festival de Sokoban" },
  { data: "28 de abril a 5 de maio", tema: "Festival de Jogos de Guerra" },
  { data: "12 a 19 de maio", tema: "Festival de Coleção de Criaturas" },
  { data: "26 de maio a 2 de junho", tema: "Festival de Zumbis X Vampiros" },
  { data: "9 a 16 de junho", tema: "Steam Vem Aí, edição de junho de 2025" },
  { data: "16 a 23 de junho", tema: "Festival de Pesca" },
  { data: "26 de junho a 10 de julho", tema: "Promoção de Férias do Steam de 2025" },
  { data: "14 a 21 de julho", tema: "Festival da Automação" },
  { data: "28 de julho a 4 de agosto", tema: "Festival de Corrida" },
  { data: "11 a 18 de agosto", tema: "Festival dos 4X" },
  { data: "25 de agosto a 1º de setembro", tema: "Festival de Tiro em Terceira Pessoa" },
  { data: "8 a 15 de setembro", tema: "Festival da Simulação Política" },
  { data: "29 de setembro a 6 de outubro", tema: "Promoção de Primavera do Steam de 2025" },
  { data: "13 a 20 de outubro", tema: "Steam Vem Aí, edição de outubro de 2025" },
  { data: "27 de outubro a 3 de novembro", tema: "Festival Susteam 4" },
  { data: "10 a 17 de novembro", tema: "Festival Animal" },
  { data: "8 a 15 de dezembro", tema: "Festival Esportivo" },
  { data: "18 de dezembro de 2025 a 5 de janeiro e 2026", tema: "Promoção de Fim de Ano do Steam de 2025" },
];

const obterNumeroMes = (mes) => {
  const meses = {
    'janeiro': 1, 'fevereiro': 2, 'março': 3, 'abril': 4,
    'maio': 5, 'junho': 6, 'julho': 7, 'agosto': 8,
    'setembro': 9, 'outubro': 10, 'novembro': 11, 'dezembro': 12
  };
  return meses[mes.toLowerCase()] || 1;
};

const parseEventDate = (dataString) => {
  try {
    const normalized = dataString.toLowerCase().trim();

    if (normalized.includes('2025 a') && normalized.includes('2026')) {
      return {
        inicio: new Date(2025, 11, 18),
        fim: new Date(2026, 0, 5)
      };
    }

    let match = normalized.match(/(\d+)(?:º)?\s+de\s+([a-záêç]+)\s+a\s+(\d+)(?:º)?\s+de\s+([a-záêç]+)/);
    if (match) {
      const [, diaInicio, mesInicio, diaFim, mesFim] = match;
      return {
        inicio: new Date(2025, obterNumeroMes(mesInicio) - 1, parseInt(diaInicio)),
        fim: new Date(2025, obterNumeroMes(mesFim) - 1, parseInt(diaFim))
      };
    }

    match = normalized.match(/(\d+)\s+a\s+(\d+)\s+de\s+([a-záêç]+)/);
    if (match) {
      const [, diaInicio, diaFim, mes] = match;
      const numeroMes = obterNumeroMes(mes);
      return {
        inicio: new Date(2025, numeroMes - 1, parseInt(diaInicio)),
        fim: new Date(2025, numeroMes - 1, parseInt(diaFim))
      };
    }

    return { inicio: new Date(2025, 0, 1), fim: new Date(2025, 0, 1) };
  } catch {
    return { inicio: new Date(2025, 0, 1), fim: new Date(2025, 0, 1) };
  }
};

const calcularStatus = (dataEvento) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const { inicio, fim } = parseEventDate(dataEvento);
  inicio.setHours(0, 0, 0, 0);
  fim.setHours(0, 0, 0, 0);

  const hojeTime = hoje.getTime();
  const inicioTime = inicio.getTime();
  const fimTime = fim.getTime();

  if (hojeTime < inicioTime) return "Em breve";
  if (hojeTime >= inicioTime && hojeTime <= fimTime) return "Ativo";
  return "Finalizado";
};

export default function Evento() {
  const [eventos, setEventos] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [isMostrandoMensagens, setIsMostrandoMensagens] = useState(false);
  const [showEasterEggs, setShowEasterEggs] = useState(false);

  const audioRef = useRef(null);
  const notiAudioRef = useRef(null);

  const atualizarEventos = () => {
    const eventosAtualizados = eventosOriginais.map(evento => ({
      ...evento,
      status: calcularStatus(evento.data)
    }));
    setEventos(eventosAtualizados);
  };

  useEffect(() => {
    atualizarEventos();
    const interval = setInterval(() => atualizarEventos(), 60000);
    return () => clearInterval(interval);
  }, []);

  const tocarMusica = () => {
    if (audioRef.current) audioRef.current.play();
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
                  <span className={`status ${
                    evento.status === "Ativo"
                      ? "ativo"
                      : evento.status === "Finalizado"
                      ? "finalizado"
                      : "embreve"
                  }`}>
                    {evento.status}
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
          </div>
        ))}
        <audio ref={notiAudioRef} src="/audio/steam_notification.mp3" preload="auto" />
      </div>
      <Footer />
    </>
  );
}
