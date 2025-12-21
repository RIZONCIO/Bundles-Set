import { supabase } from "../config/supabase";

/**
 * Busca bundles do Supabase com paginação
 * @param {number} page - Número da página (1-indexed)
 * @param {number} limit - Quantidade de bundles por página
 * @returns {Promise<Object>} - Dados dos bundles com metadados
 */
export const fetchBundles = async (page = 1, limit = 10) => {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Query com paginação e ordenação por desconto
    const { data, error, count } = await supabase
      .from('bundles')
      .select('*', { count: 'exact' })
      .gte('discount', 0)
      .order('discount', { ascending: false })
      .order('last_updated', { ascending: false })
      .range(from, to);

    if (error) throw error;

    const totalPages = Math.ceil(count / limit);
    const hasMore = page < totalPages;

    return {
      bundles: data.map(bundle => ({
        bundleid: bundle.id,
        name: bundle.name,
        url: bundle.url,
        final_price: bundle.final_price,
        original_price: bundle.original_price,
        discount: bundle.discount,
        discount_percent: bundle.discount,
        formatted_final_price: bundle.formatted_final_price,
        formatted_original_price: bundle.formatted_original_price,
        formatted_orig_price: bundle.formatted_original_price,
        currency: bundle.currency,
        header_image: bundle.header_image,
        capsule_image: bundle.capsule_image,
        library_image: bundle.library_image,
        games_count: bundle.games_count,
        platform_windows: bundle.platform_windows,
        platform_mac: bundle.platform_mac,
        platform_linux: bundle.platform_linux,
        is_nsfw: bundle.is_nsfw,
        last_updated: bundle.last_updated
      })),
      currentPage: page,
      totalPages,
      totalBundles: count,
      hasMore,
      last_update: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro ao buscar bundles:', error);
    throw error;
  }
};

/**
 * Busca todos os bundles (com limite de 1000 para performance)
 * @returns {Promise<Object>} - Todos os bundles disponíveis
 */
export const fetchAllBundles = async () => {
  try {
    const { data, error, count } = await supabase
      .from('bundles')
      .select('*', { count: 'exact' })
      .gte('discount', 0)
      .order('discount', { ascending: false })
      .limit(1000);

    if (error) throw error;

    return {
      bundles: data.map(bundle => ({
        bundleid: bundle.id,
        name: bundle.name,
        url: bundle.url,
        final_price: bundle.final_price,
        original_price: bundle.original_price,
        discount: bundle.discount,
        discount_percent: bundle.discount,
        formatted_final_price: bundle.formatted_final_price,
        formatted_original_price: bundle.formatted_original_price,
        formatted_orig_price: bundle.formatted_original_price,
        currency: bundle.currency,
        header_image: bundle.header_image,
        capsule_image: bundle.capsule_image,
        library_image: bundle.library_image,
        games_count: bundle.games_count,
        platform_windows: bundle.platform_windows,
        platform_mac: bundle.platform_mac,
        platform_linux: bundle.platform_linux,
        is_nsfw: bundle.is_nsfw,
        last_updated: bundle.last_updated
      })),
      totalBundles: count,
      last_update: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro ao buscar todos os bundles:', error);
    throw error;
  }
};

/**
 * Busca bundles com filtros
 * @param {Object} filters - Filtros (discount, price_min, price_max, platform, search)
 * @param {number} page - Número da página
 * @param {number} limit - Quantidade por página
 * @returns {Promise<Object>} - Bundles filtrados
 */
export const fetchBundlesWithFilters = async (filters = {}, page = 1, limit = 10) => {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('bundles')
      .select('*', { count: 'exact' });

    // Filtro de desconto mínimo
    if (filters.discount) {
      query = query.gte('discount', filters.discount);
    }

    // Filtro de preço
    if (filters.price_min !== undefined) {
      query = query.gte('final_price', filters.price_min);
    }
    if (filters.price_max !== undefined) {
      query = query.lte('final_price', filters.price_max);
    }

    // Filtro de plataforma
    if (filters.platform === 'windows') {
      query = query.eq('platform_windows', true);
    } else if (filters.platform === 'mac') {
      query = query.eq('platform_mac', true);
    } else if (filters.platform === 'linux') {
      query = query.eq('platform_linux', true);
    }

    // Filtro de busca por nome
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    // Ordenação e paginação
    const { data, error, count } = await query
      .order('discount', { ascending: false })
      .order('last_updated', { ascending: false })
      .range(from, to);

    if (error) throw error;

    const totalPages = Math.ceil(count / limit);
    const hasMore = page < totalPages;

    return {
      bundles: data.map(bundle => ({
        bundleid: bundle.id,
        name: bundle.name,
        url: bundle.url,
        final_price: bundle.final_price,
        original_price: bundle.original_price,
        discount: bundle.discount,
        discount_percent: bundle.discount,
        formatted_final_price: bundle.formatted_final_price,
        formatted_original_price: bundle.formatted_original_price,
        formatted_orig_price: bundle.formatted_original_price,
        currency: bundle.currency,
        header_image: bundle.header_image,
        capsule_image: bundle.capsule_image,
        library_image: bundle.library_image,
        games_count: bundle.games_count,
        platform_windows: bundle.platform_windows,
        platform_mac: bundle.platform_mac,
        platform_linux: bundle.platform_linux,
        is_nsfw: bundle.is_nsfw,
        last_updated: bundle.last_updated
      })),
      currentPage: page,
      totalPages,
      totalBundles: count,
      hasMore,
      last_update: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro ao buscar bundles filtrados:', error);
    throw error;
  }
};

