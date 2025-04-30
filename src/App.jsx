import React, { useState } from "react";
import SearchContainer from "./components/SearchContainer";
import BannerOferta from "./components/BannerOferta";
import FiltroContainer from "./components/FiltroContainer";
import CardsContainer from "./components/CardsContainer";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import "./styles/reset.css";
import "./styles/style.css";
import Header_ from "./components/Header_";
import DisplayBundles from "./components/DisplayBundles";
import useFetchBundles from "./hooks/useFetchBundle";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

export default function App() {
  const { bundles, fetchBundles, isLoading, error, currentPage, totalPages } =
    useFetchBundles();

  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false); // Estado para controlar o scroll infinito

  const hasMore = currentPage < totalPages;


  useInfiniteScroll(
    () => {
      if (infiniteScrollEnabled) {
        fetchBundles(currentPage + 1);
      }
    },
    isLoading,
    hasMore
  );

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
        <button
          id="loadMore"
          className="btn-steam-link"
          onClick={() => {
            fetchBundles(currentPage + 1); // Carrega mais bundles
            setInfiniteScrollEnabled(true); // Ativa o scroll infinito
          }}
        >
          Carregar mais
        </button>
      </main>
      <Footer />
    </div>
  );
}