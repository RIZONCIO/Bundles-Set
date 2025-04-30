import React from "react";
import SearchContainer from "./components/SearchContainer";
import BannerOferta from "./components/BannerOferta";
import FiltroContainer from "./components/FiltroContainer";
import CardsContainer from "./components/CardsContainer";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Header_ from "./components/Header_";
import DisplayBundles from "./components/DisplayBundles";
import useFetchBundles from "./hooks/useFetchBundle";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import useAppHandlers from "./handlers/useAppHandlers";

import "./styles/reset.css";
import "./styles/style.css";

export default function App() {
  const {
    bundles,
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

  return (
    <div className="app">
      <Header_ />
      <main>
        <BannerOferta />
        <SearchContainer />
        <FiltroContainer />
        <CardsContainer />
        <Pagination />
        {error && <p style={{ color: "red" }}>Erro ao carregar bundles: {error}</p>}
        <DisplayBundles data={{ bundles, totalBundles: bundles.length }} />
        {isLoading && <p>Carregando...</p>}
        {!infiniteScrollEnabled && (
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