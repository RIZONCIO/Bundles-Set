import React from "react";
import useFetchBundles from "../hooks/useFetchBundles";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import DisplayBundles from "./DisplayBundles";
import ErrorBoundary from "./common/ErrorBoundary";

const InfiniteScroll = () => {
  const { bundles, fetchBundles, currentPage, totalPages, isLoading, error } =
    useFetchBundles();

  const hasMore = currentPage < totalPages;

  useInfiniteScroll(() => fetchBundles(currentPage + 1), isLoading, hasMore);

  return (
    <div>
      <h1>Bundles Disponíveis</h1>
      {error && <p style={{ color: "red" }}>Erro: {error}</p>}
      <ErrorBoundary>
        <DisplayBundles data={{ bundles, totalBundles: bundles.length }} />
      </ErrorBoundary>
      {isLoading && <p>Carregando...</p>}
    </div>
  );
};

export default InfiniteScroll;