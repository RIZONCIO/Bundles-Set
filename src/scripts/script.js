import { displayBundles } from "./displayBundles.js";

const endpoint = "http://localhost:5005/api/bundles-detailed";
let currentPage = 1;
const limit = 20;
let isLoading = false;
let totalPages = 1;

async function fetchBundles(page = 1) {
  if (isLoading) return;
  isLoading = true;
  try {
    const response = await fetch(`${endpoint}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayBundles(data);
    currentPage = data.page;
    totalPages = data.totalPages;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  } finally {
    isLoading = false;
  }
}

export { fetchBundles, currentPage, totalPages, isLoading };
