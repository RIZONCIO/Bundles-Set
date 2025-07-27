import React, { useState, useCallback } from "react";
import SearchContainer from "./components/SearchContainer";
import BannerOferta from "./components/BannerOferta";
import FiltroContainer from "./components/FiltroContainer";
import CardsContainer from "./components/CardsContainer";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Header_ from "./components/Header_";
import DisplayBundles from "./components/DisplayBundles";
import ApiStats from "./components/ApiStats";
import useFetchBundles from "./hooks/useFetchBundle";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import useAppHandlers from "./handlers/useAppHandlers";
import { cleanBundlesArray } from "./utils/bundleUtils";

import "./styles/reset.css";
import "./styles/style.css";

export default function App() {
  const {
    bundles,
    metadata,
    loadBundles,
    loadAllBundles,
    loadMoreFromLocalStorage,
    isLoading,
    error,
    hasMore,
  } = useFetchBundles();

  const {
    infiniteScrollEnabled,
    handleLoadMore,
    handleInfiniteScroll,
  } = useAppHandlers({
    loadBundles,
    loadAllBundles,
    loadMoreFromLocalStorage,
    hasMore,
    isLoading,
  });

  useInfiniteScroll(handleInfiniteScroll, isLoading, hasMore);

  const [filteredBundles, setFilteredBundles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
    setIsSearching(true);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  const handleFilterResults = useCallback((results) => {
    setFilteredBundles(cleanBundlesArray(results));
  }, []);

  // Determinar quais bundles mostrar com limpeza automática
  const bundlesToShow = cleanBundlesArray(
    isSearching ? searchResults : 
    filteredBundles.length > 0 ? filteredBundles : bundles
  );

  return (
    <div className="app">
      <Header_
        onSearchResults={handleSearchResults}
        onClearSearch={handleClearSearch}
      />
      <main>
        <BannerOferta />
        
        {/* Componente de estatísticas da API */}
        <ApiStats metadata={metadata} />
        

        <FiltroContainer 
          onFilterResults={handleFilterResults}
          bundles={isSearching ? searchResults : bundles}
        />
        <CardsContainer />
        <Pagination />
        {error && <p style={{ color: "red" }}>Erro ao carregar bundles: {error}</p>}
        <DisplayBundles
          data={{
            bundles: bundlesToShow,
            totalBundles: bundlesToShow.length,
            metadata: metadata
          }}
        />
        {isLoading && <p>Carregando...</p>}
        {!infiniteScrollEnabled && !isSearching && (
          <button
            id="loadMore"
            className="btn-steam-link"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            Carregar mais
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
}