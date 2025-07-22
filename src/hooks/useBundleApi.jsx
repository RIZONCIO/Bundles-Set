import API_ENDPOINTS from "../config/api";

const retryFetch = async (fetchFunction, maxRetries = 6, delay = 5000) => {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await fetchFunction();
      // Adaptar para nova estrutura - verificar se tem bundles no array
      if (response && response.bundles && Array.isArray(response.bundles)) {
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
  const data = await response.json();
  
  // Adaptar para nova estrutura - simular paginação se necessário
  if (data.bundles && Array.isArray(data.bundles)) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBundles = data.bundles.slice(startIndex, endIndex);
    
    return {
      ...data,
      bundles: paginatedBundles,
      currentPage: page,
      totalPages: Math.ceil(data.bundles.length / limit),
      hasMore: endIndex < data.bundles.length
    };
  }
  
  return data;
};

export const fetchAllBundles = async () => {
  return retryFetch(async () => {
    const response = await fetch(API_ENDPOINTS.BUNDLES_ALL);
    return response.json();
  });
};