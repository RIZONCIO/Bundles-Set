import React from "react";
import "../styles/Card.css";

const DisplayBundles = ({ data }) => {
  if (!data || !data.bundles || data.bundles.length === 0) {
    return <p>Nenhum bundle disponível no momento.</p>;
  }

  return (
    <div className="cards-container">
      {data.bundles.map((bundle, index) => (
        <div
          key={`${bundle.bundleid}-${index}`}
          className="card"
        >
          {bundle.discount_percent > 0 && (
            <div className="faixa-promocao">-{bundle.discount_percent}%</div>
          )}
          {bundle.library_image ? (
            <img 
              src={bundle.library_image} 
              alt={bundle.name || "Bundle"}
              onError={(e) => {
                console.log('Erro ao carregar library_image:', bundle.library_image);
                // Tentar header_image como fallback
                if (bundle.header_image && e.target.src !== bundle.header_image) {
                  e.target.src = bundle.header_image;
                }
                // Se header também falhar, tentar capsule
                else if (bundle.capsule_image && e.target.src !== bundle.capsule_image) {
                  e.target.src = bundle.capsule_image;
                }
                // Se tudo falhar, mostrar placeholder
                else {
                  e.target.src = 'https://via.placeholder.com/600x900?text=No+Image';
                }
              }}
            />
          ) : bundle.header_image ? (
            <img src={bundle.header_image} alt={bundle.name || "Bundle"} />
          ) : bundle.capsule_image ? (
            <img src={bundle.capsule_image} alt={bundle.name || "Bundle"} />
          ) : bundle.header_image_url ? (
            <img src={bundle.header_image_url} alt={bundle.name || "Bundle"} />
          ) : bundle.main_capsule ? (
            <img src={bundle.main_capsule} alt={bundle.name || "Bundle"} />
          ) : (
            <div style={{width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#333'}}>
              <p>Imagem não disponível</p>
            </div>
          )}
          <div className="card-content">
            <h3>{bundle.name}</h3>
            <p>{bundle.description || ""}</p>
            
            {/* Container do preço separado */}
            <div className="preco-container">
              <div className="precos">
                {bundle.discount_percent > 0 && (
                  <p className="preco-original">{bundle.formatted_orig_price}</p>
                )}
                <p className="preco">{bundle.formatted_final_price}</p>
              </div>
            </div>

            {/* Container do botão separado */}
            <div className="btn-container">
              <a
                href={`https://store.steampowered.com/bundle/${bundle.bundleid}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver na Steam
              </a>
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
        </div>
      ))}
    </div>
  );
};

export default DisplayBundles;