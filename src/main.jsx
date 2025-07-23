import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AppRoutes from './AppRoutes';
import { initializeIndexedDB } from './utils/indexedDB'; 

initializeIndexedDB()
  .then(() => {
    console.log('IndexedDB inicializado com sucesso.');
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <AppRoutes />
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error('Erro ao inicializar IndexedDB:', error);
  });