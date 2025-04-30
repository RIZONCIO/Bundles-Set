import API_ENDPOINTS from "../config/api";

export const fetchBundles = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_ENDPOINTS.BUNDLES}?page=${page}&limit=${limit}`);
  return response.json();
};

export const fetchAllBundles = async () => {
  const response = await fetch(API_ENDPOINTS.BUNDLES_ALL);
  return response.json();
};