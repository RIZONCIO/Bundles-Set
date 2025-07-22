import React, { useState, useEffect } from "react";
import "../styles/Buscador.css";
import { fetchAllBundles } from "../hooks/useBundleApi";
import { getBundlesFromIndexedDB, isDataFresh } from "../utils/indexedDB";
import { cleanBundlesArray } from "../utils/bundleUtils";

export default function SearchContainer({ onSearchResults, onClearSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Carregar histórico de busca do localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const loadBundles = async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      // Verificar se há dados frescos no IndexedDB primeiro
      const dataIsFresh = await isDataFresh("allBundles", 30);
      
      if (dataIsFresh) {
        const storedBundles = await getBundlesFromIndexedDB("allBundles");
        if (storedBundles.length > 0) {
          setBundles(storedBundles);
          setHasFetched(true);
          setIsLoading(false);
          return;
        }
      }

      // Se não há dados frescos, buscar da API
      const data = await fetchAllBundles();
      if (data && data.bundles && Array.isArray(data.bundles)) {
        setBundles(data.bundles);
        setHasFetched(true);
      } else {
        console.error("Dados inválidos retornados pela API.");
      }
    } catch (error) {
      console.error("Erro ao carregar bundles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSearchTerm = (term) => {
    if (term.trim() && !searchHistory.includes(term)) {
      const newHistory = [term, ...searchHistory.slice(0, 4)]; // Manter apenas 5 itens
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      onClearSearch?.();
      return;
    }

    if (bundles.length === 0) {
      console.warn("Nenhum bundle carregado para pesquisar.");
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filteredBundles = bundles.filter((bundle) => {
      // Buscar por nome
      const nameMatch = bundle.name && 
        bundle.name.toLowerCase().includes(searchLower);
      
      // Buscar por gêneros se disponível
      const genreMatch = bundle.page_details?.gênero &&
        bundle.page_details.gênero.some(genre => 
          genre.toLowerCase().includes(searchLower)
        );
      
      // Buscar por desenvolvedor se disponível
      const devMatch = bundle.page_details?.desenvolvedor &&
        bundle.page_details.desenvolvedor.some(dev => 
          dev.toLowerCase().includes(searchLower)
        );
      
      // Buscar por distribuidora se disponível
      const pubMatch = bundle.page_details?.distribuidora &&
        bundle.page_details.distribuidora.some(pub => 
          pub.toLowerCase().includes(searchLower)
        );

      // Buscar por idiomas se disponível
      const langMatch = bundle.page_details?.idiomas &&
        bundle.page_details.idiomas.some(lang => 
          lang.toLowerCase().includes(searchLower)
        );

      return nameMatch || genreMatch || devMatch || pubMatch || langMatch;
    });
    
    saveSearchTerm(searchTerm);
    onSearchResults(cleanBundlesArray(filteredBundles));
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
      onClearSearch?.();
      return;
    }

    // Limpa o timeout anterior e define um novo
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        handleSearch(); // Executa a busca após 1 segundo de inatividade
      }, 1000)
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onClearSearch?.();
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    // Trigger search after setting the term
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <section className="search-container">
      <h1 className="catalog-title">Catálogo de Bundles</h1>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Busque por bundles, gêneros, desenvolvedores..."
          value={searchTerm}
          onFocus={loadBundles} // Carrega os bundles ao focar no campo
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} 
        />
        <div className="search-controls">
          {searchTerm && (
            <button className="clear-search" onClick={handleClearSearch}>
              ✕
            </button>
          )}
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
      </div>
      
      {/* Histórico de busca */}
      {searchHistory.length > 0 && !searchTerm && (
        <div className="search-history">
          <span className="history-label">Buscas recentes:</span>
          <div className="history-items">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                className="history-item"
                onClick={() => handleHistoryClick(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}