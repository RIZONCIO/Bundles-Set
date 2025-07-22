// API para opções de filtro
const API_URL = "https://steambundleapi.onrender.com";

export const fetchFilterOptions = async () => {
  try {
    const response = await fetch(`${API_URL}/api/filter-options`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      headers: {
        dataSource: response.headers.get('X-Data-Source'),
        totalBundles: response.headers.get('X-Total-Bundles'),
        cacheStatus: response.headers.get('X-Cache-Status')
      }
    };
  } catch (error) {
    console.error('Erro ao buscar opções de filtro:', error);
    return {
      success: false,
      error: error.message,
      fallback: {
        genres: [],
        categories: [],
        platforms: ['Windows', 'Mac', 'Linux'],
        priceRange: { min: 0, max: 500 },
        discountRange: { min: 0, max: 100 }
      }
    };
  }
};
