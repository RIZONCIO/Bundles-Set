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
          key={`${bundle.bundleid}-${index}`}
          className="card"
          href={`https://store.steampowered.com/bundle/${bundle.bundleid}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {bundle.header_image_url ? (
            <img src={bundle.header_image_url} alt={bundle.name || "Bundle"} />
          ) : bundle.main_capsule ? (
            <img src={bundle.main_capsule} alt={bundle.name || "Bundle"} />
          ) : (
            <p>Imagem não disponível</p>
          )}
          <div className="card-content">
            <h3>{bundle.name}</h3>
            <p>{bundle.description || ""}</p>
            <div className="preco-btn-container">
              <div className="precos">
                {bundle.discount_percent > 0 && (
                  <p className="preco-original">{bundle.formatted_orig_price}</p>
                )}
                <p className="preco">{bundle.formatted_final_price}</p>
                {bundle.discount_percent > 0 && (
                  <span className="desconto">-{bundle.discount_percent}%</span>
                )}
              </div>
              <span className="btn-steam-link">Ver na Steam</span>
            </div>
            {bundle.page_details && (
              <div className="bundle-details">
                {bundle.page_details.gênero && bundle.page_details.gênero.length > 0 && (
                  <div className="genres">
                    {bundle.page_details.gênero.slice(0, 3).map((genre, idx) => (
                      <span key={idx} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default DisplayBundles;