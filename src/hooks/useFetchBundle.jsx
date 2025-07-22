import useBundleState from "./useBundleState";
import { fetchBundles, fetchAllBundles } from "./useBundleApi";
import { saveToIndexedDB, loadFromIndexedDB, getBundlesFromIndexedDB, isDataFresh } from "../utils/indexedDB";

export default function useFetchBundles() {
  const {
    bundles,
    setBundles,
    metadata,
    setMetadata,
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
      const bundlesPerPage = getBundlesPerPage();
      const data = await fetchBundles(page, bundlesPerPage);
      
      // Adaptar para nova estrutura
      if (data.bundles && Array.isArray(data.bundles)) {
        // Se for a primeira página, substitua; caso contrário, adicione evitando duplicatas
        if (page === 1) {
          setBundles(data.bundles);
        } else {
          // Evitar duplicatas baseado no bundleid
          setBundles((prev) => {
            const existingIds = new Set(prev.map(bundle => bundle.bundleid));
            const newBundles = data.bundles.filter(bundle => !existingIds.has(bundle.bundleid));
            return [...prev, ...newBundles];
          });
        }
        setHasMore(data.hasMore || data.bundles.length === bundlesPerPage);
        
        // Atualizar metadados se disponível
        if (data.last_update) {
          setMetadata({
            last_update: data.last_update,
            totalBundles: data.totalBundles || data.bundles.length,
            isTestMode: data.isTestMode || false,
            processedCount: data.processedCount || 0,
            processingTimeSeconds: data.processingTimeSeconds || 0,
            bundlesPerSecond: data.bundlesPerSecond || 0,
            savedAt: new Date().toISOString()
          });
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllBundles = async () => {
    setIsLoading(true);
    try {
      // Verificar se os dados estão frescos antes de fazer nova requisição
      const dataIsFresh = await isDataFresh("allBundles", 30);
      
      if (dataIsFresh) {
        // Carregar dados do IndexedDB se estão frescos
        const storedData = await loadFromIndexedDB("allBundles");
        const bundlesPerPage = getBundlesPerPage();
        
        setBundles(storedData.bundles.slice(0, bundlesPerPage));
        setCurrentIndex(bundlesPerPage);
        setHasMore(storedData.bundles.length > bundlesPerPage);
        setMetadata({
          last_update: storedData.last_update,
          totalBundles: storedData.totalBundles,
          isTestMode: storedData.isTestMode,
          processedCount: storedData.processedCount,
          processingTimeSeconds: storedData.processingTimeSeconds,
          bundlesPerSecond: storedData.bundlesPerSecond,
          savedAt: storedData.savedAt
        });
        return;
      }

      // Buscar dados frescos da API
      const bundlesPerPage = getBundlesPerPage();
      const data = await fetchAllBundles();
      
      if (data && data.bundles && Array.isArray(data.bundles)) {
        // Salvar dados completos no IndexedDB
        await saveToIndexedDB("allBundles", data);
        
        // Configurar estado inicial
        setBundles(data.bundles.slice(0, bundlesPerPage));
        setCurrentIndex(bundlesPerPage);
        setHasMore(data.bundles.length > bundlesPerPage);
        
        // Atualizar metadados
        setMetadata({
          last_update: data.last_update,
          totalBundles: data.totalBundles,
          isTestMode: data.isTestMode,
          processedCount: data.processedCount,
          processingTimeSeconds: data.processingTimeSeconds,
          bundlesPerSecond: data.bundlesPerSecond,
          savedAt: new Date().toISOString()
        });
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
      const bundlesPerPage = getBundlesPerPage();
      const storedBundles = await getBundlesFromIndexedDB("allBundles");
      const nextBundles = storedBundles.slice(currentIndex, currentIndex + bundlesPerPage);

      if (nextBundles.length > 0) {
        // Evitar duplicatas baseado no bundleid
        setBundles((prev) => {
          const existingIds = new Set(prev.map(bundle => bundle.bundleid));
          const newBundles = nextBundles.filter(bundle => !existingIds.has(bundle.bundleid));
          return [...prev, ...newBundles];
        });
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
    metadata,
    loadBundles,
    loadAllBundles,
    loadMoreFromLocalStorage,
    isLoading,
    error,
    hasMore,
  };
}