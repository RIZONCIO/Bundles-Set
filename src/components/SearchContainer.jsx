import React, { useState } from "react";
import "../styles/Buscador.css";
import { fetchAllBundles } from "../hooks/useBundleApi";

export default function SearchContainer({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(""); // Estado para exibir avisos

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    if (searchTerm.length === 1) {
      setWarning("Buscas com uma única letra podem retornar muitos resultados.");
    } else {
      setWarning(""); // Limpa o aviso se a busca for válida
    }

    setIsLoading(true);
    try {
      const data = await fetchAllBundles();
      const filteredBundles = data.bundles.filter((bundle) =>
        bundle.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Limita o número de resultados exibidos inicialmente
      const limitedResults = filteredBundles.slice(0, 50); // Exibe até 50 resultados
      onSearchResults(limitedResults);
    } catch (error) {
      console.error("Erro ao buscar bundles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      window.location.reload();
    }
  };

  return (
    <section className="search-container">
      <h1 className="catalog-title">Catálogo de Bundles</h1>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Busque por bundles..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="search-icon" onClick={handleSearch}>
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          )}
        </div>
      </div>
      {warning && <p className="warning">{warning}</p>} {/* Exibe o aviso */}
    </section>
  );
}