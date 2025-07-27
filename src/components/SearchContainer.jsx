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
      const newHistory = [term, ...searchHistory.slice(0, 4)]; 
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
      event.preventDefault(); // Previne comportamento padrão
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

    // Limpar timeout anterior
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Definir novo timeout para busca automática
    setTypingTimeout(
      setTimeout(() => {
        handleSearch(); 
      }, 800) // Reduzido de 1000ms para 800ms para resposta mais rápida
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onClearSearch?.();
    
    // Limpar timeout se existir
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }
  };

  // Cleanup do timeout quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <section className="search-container">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Busque por bundles, gêneros, desenvolvedores..."
          value={searchTerm}
          onFocus={loadBundles} 
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} 
          aria-label="Campo de busca de bundles"
        />
        <div className="search-controls">
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={handleClearSearch}
              aria-label="Limpar busca"
              title="Limpar busca"
            >
              ✕
            </button>
          )}
          <div 
            className="search-icon" 
            onClick={handleSearch}
            role="button"
            aria-label="Executar busca"
            title="Buscar"
          >
            {isLoading ? (
              <div className="loading-spinner" aria-label="Carregando..."></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}