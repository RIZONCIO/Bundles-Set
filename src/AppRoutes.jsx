import React from "react";
import { Routes, Route } from "react-router-dom";
import Sobre from "./pages/Sobre"; 
import App from "./App";
import TermosUso from "./pages/TermosUso"; 
import Doacao from "./pages/Doacao";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Gratis from "./pages/Gratis";
import Evento from "./pages/Evento"; 


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} /> {/* Página principal */}
      <Route path="/free" element={<Gratis />} /> {/* Página de jogos gratis*/}
      <Route path="/evento" element={<Evento />} /> {/* Página de Eventos da Steam*/}
      <Route path="/sobre" element={<Sobre />} /> {/* Página Sobre */}
      <Route path="/termos-uso" element={<TermosUso />} /> {/* Página Termos de Uso */}
      <Route path="/política-privacidade" element={<PoliticaPrivacidade />} /> {/* Politica de Privacidade */}
      <Route path="/doacao" element={<Doacao />} /> {/* Página Doação*/}
    </Routes>
  );
}