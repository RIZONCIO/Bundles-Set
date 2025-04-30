import React, { useState } from "react";
import "../styles/Buscador.css";
import { fetchAllBundles } from "../hooks/useBundleApi";

export default function SearchContainer({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Para evitar múltiplos fetches

  const loadBundles = async () => {
    if (hasFetched) return; // Evita múltiplas requisições
    setIsLoading(true);
    try {
      const data = await fetchAllBundles();
      setBundles(data.bundles);
      setHasFetched(true); // Marca que os dados já foram carregados
    } catch (error) {
      console.error("Erro ao carregar bundles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return; // Evita buscas vazias

    const filteredBundles = bundles.filter((bundle) =>
      bundle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearchResults(filteredBundles);
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
      window.location.reload(); // Recarrega a página se o campo for limpo
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
          onFocus={loadBundles} // Carrega os bundles ao focar no campo
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
    </section>
  );
}