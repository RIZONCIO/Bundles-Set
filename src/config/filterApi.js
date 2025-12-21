import { supabase } from "./supabase";

/**
 * Busca opções de filtro do Supabase
 * @returns {Promise<Object>} - Opções de filtro disponíveis
 */
export const fetchFilterOptions = async () => {
  try {
    // Buscar estatísticas gerais dos bundles
    const { data, error } = await supabase
      .from('bundles')
      .select('final_price, discount, platform_windows, platform_mac, platform_linux');

    if (error) throw error;

    // Calcular ranges
    const precos = data
      .filter(b => b.final_price > 0)
      .map(b => b.final_price);

    const minPreco = Math.floor(Math.min(...precos));
    const maxPreco = Math.ceil(Math.max(...precos));

    // Plataformas disponíveis
    const platforms = [];
    if (data.some(b => b.platform_windows)) platforms.push('Windows');
    if (data.some(b => b.platform_mac)) platforms.push('Mac');
    if (data.some(b => b.platform_linux)) platforms.push('Linux');

    return {
      success: true,
      data: {
        platforms,
        priceRange: { min: minPreco, max: maxPreco },
        discountRange: { min: 0, max: 100 },
        totalBundles: data.length
      },
      headers: {
        dataSource: 'Supabase',
        totalBundles: data.length,
        cacheStatus: 'live'
      }
    };
  } catch (error) {
    console.error('Erro ao buscar opções de filtro:', error);
    return {
      success: false,
      error: error.message,
      fallback: {
        platforms: ["Windows", "Mac", "Linux"],
        priceRange: { min: 0, max: 500 },
        discountRange: { min: 0, max: 100 },
      },
    };
  }
};

