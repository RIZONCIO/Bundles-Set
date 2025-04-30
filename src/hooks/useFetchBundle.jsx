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

  const loadBundles = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBundles();
      setBundles(data.bundles);
      setHasMore(data.bundles.length > 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllBundles = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllBundles(); 
      if (Array.isArray(data.bundles)) {
        await saveToIndexedDB("allBundles", data.bundles);
        setBundles(data.bundles.slice(0, 10));
        setCurrentIndex(10);
        setHasMore(data.bundles.length > 10);
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
      const storedBundles = await loadFromIndexedDB("allBundles");
      const nextBundles = storedBundles.slice(currentIndex, currentIndex + 10);

      if (nextBundles.length > 0) {
        setBundles((prev) => [...prev, ...nextBundles]);
        setCurrentIndex((prev) => prev + 10);
        setHasMore(currentIndex + 10 < storedBundles.length);
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