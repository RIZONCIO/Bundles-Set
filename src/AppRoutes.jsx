import React from "react";
import { Routes, Route } from "react-router-dom";
import Sobre from "./pages/Sobre"; 
import App from "./App";
import TermosUso from "./pages/TermosUso"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} /> {/* Página principal */}
      <Route path="/sobre" element={<Sobre />} /> {/* Página about */}
      <Route path="/termos-uso" element={<TermosUso />} /> {/* Página Termos de Uso */}
    </Routes>
  );
}