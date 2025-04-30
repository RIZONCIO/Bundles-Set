import React from "react";

export default function LoadMoreButton({ onClick, isLoading }) {
  return (
    <button
      id="loadMore"
      className="btn-steam-link"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Carregando..." : "Carregar mais"}
    </button>
  );
}