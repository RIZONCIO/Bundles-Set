import useBundleState from "./useBundleState";
import { fetchBundles, fetchAllBundles } from "./useBundleApi";
import { saveToIndexedDB, loadFromIndexedDB } from "../utils/indexedDB";

export default function useFetchBundles() {
  const {
    bundles,
    setBundles,
    isLoading,
    setIsLoading,
    error,
    setError,
    hasMore,
    setHasMore,
    currentIndex,
    setCurrentIndex,
  } = useBundleState();

  // Define o número de bundles por página com base no tamanho da tela
  const getBundlesPerPage = () => {
    if (window.innerWidth <= 768) return 5; // Telas pequenas
    if (window.innerWidth <= 1200) return 10; // Telas médias
    return 20; // Telas grandes
  };

  const loadBundles = async (page = 1) => {
    setIsLoading(true);
    try {
      const bundlesPerPage = getBundlesPerPage(); // Determina o número de bundles por página
      const data = await fetchBundles(page, bundlesPerPage); // Passa o número de bundles por página
      setBundles((prev) => [...prev, ...data.bundles]); // Adiciona os novos bundles aos existentes
      setHasMore(data.bundles.length === bundlesPerPage); // Verifica se há mais bundles para carregar
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllBundles = async () => {
    setIsLoading(true);
    try {
      const bundlesPerPage = getBundlesPerPage(); // Determina o número de bundles por página
      const data = await fetchAllBundles();
      if (Array.isArray(data.bundles)) {
        await saveToIndexedDB("allBundles", data.bundles);
        setBundles(data.bundles.slice(0, bundlesPerPage)); // Carrega apenas os bundles iniciais
        setCurrentIndex(bundlesPerPage);
        setHasMore(data.bundles.length > bundlesPerPage);
      } else {
        setError("Erro ao processar os dados da API.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreFromLocalStorage = async () => {
    try {
      const bundlesPerPage = getBundlesPerPage(); // Determina o número de bundles por página
      const storedBundles = await loadFromIndexedDB("allBundles");
      const nextBundles = storedBundles.slice(currentIndex, currentIndex + bundlesPerPage);

      if (nextBundles.length > 0) {
        setBundles((prev) => [...prev, ...nextBundles]);
        setCurrentIndex((prev) => prev + bundlesPerPage);
        setHasMore(currentIndex + bundlesPerPage < storedBundles.length);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError("Erro ao carregar mais dados.");
    }
  };

  return {
    bundles,
    loadBundles,
    loadAllBundles,
    loadMoreFromLocalStorage,
    isLoading,
    error,
    hasMore,
  };
}