import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About'; 
import App from './App'; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />            {/* Página principal */}
      <Route path="/about" element={<About />} />     {/* Página About */}
    </Routes>
  );
}