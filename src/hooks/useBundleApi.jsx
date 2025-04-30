import API_ENDPOINTS from "../config/api";

const retryFetch = async (fetchFunction, maxRetries = 6, delay = 5000) => {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await fetchFunction();
      if (response && response.bundles) {
        return response; // Retorna a resposta se for válida
      }
    } catch (error) {
      console.error(`Tentativa ${attempts + 1} falhou:`, error);
    }

    attempts++;
    if (attempts < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, delay)); // Aguarda antes de tentar novamente
    }
  }

  throw new Error("Falha ao obter resposta da API após várias tentativas.");
};

export const fetchBundles = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_ENDPOINTS.BUNDLES}?page=${page}&limit=${limit}`);
  return response.json();
};

export const fetchAllBundles = async () => {
  return retryFetch(async () => {
    const response = await fetch(API_ENDPOINTS.BUNDLES_ALL);
    return response.json();
  });
};