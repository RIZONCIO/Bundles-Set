import React from 'react';
import '../styles/ApiStats.css';

export default function ApiStats({ metadata }) {
  if (!metadata || metadata.totalBundles === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="api-stats-compact">
      <div className="stats-info">
        <span className="total-bundles">{metadata.totalBundles.toLocaleString('pt-BR')} bundles</span>
        <span className="last-update">Atualizado em {formatDate(metadata.last_update)}</span>
        {metadata.isTestMode && (
          <span className="test-mode">⚠️ Teste</span>
        )}
      </div>
    </div>
  );
}
