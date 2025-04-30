import React from "react";
import "../styles/Card.css";

const DisplayBundles = ({ data }) => {
  if (!data || !data.bundles || data.bundles.length === 0) {
    return <p>Nenhum bundle disponível no momento.</p>;
  }

  return (
    <div className="cards-container">
      {data.bundles.map((bundle, index) => (
        <a
          key={index}
          className="card"
          href={bundle.Link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {bundle.header_image ? (
            <img src={bundle.header_image} alt={bundle.name || "Bundle"} />
          ) : (
            <p>Imagem não disponível</p>
          )}
          <div className="card-content">
            <h3>{bundle.name}</h3>
            <p>{bundle.description}</p>
            <div className="preco-btn-container">
              <p className="preco">{bundle.formatted_final_price}</p>
              <span className="btn-steam-link">Ver na Steam</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default DisplayBundles;