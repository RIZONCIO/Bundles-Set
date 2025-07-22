export const saveToIndexedDB = (key, data) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BundlesDB", 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Remove object store antigo se existir
      if (db.objectStoreNames.contains("allBundles")) {
        db.deleteObjectStore("allBundles");
      }
      
      // Criar novo object store com estrutura atualizada
      if (!db.objectStoreNames.contains("allBundles")) {
        db.createObjectStore("allBundles", { keyPath: "key" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("allBundles", "readwrite");
      const store = transaction.objectStore("allBundles");

      // Salvar dados com a nova estrutura
      const dataToSave = {
        key,
        data: {
          metadata: {
            last_update: data.last_update,
            totalBundles: data.totalBundles,
            isTestMode: data.isTestMode,
            processedCount: data.processedCount,
            processingTimeSeconds: data.processingTimeSeconds,
            bundlesPerSecond: data.bundlesPerSecond
          },
          bundles: data.bundles || []
        },
        savedAt: new Date().toISOString()
      };

      store.put(dataToSave);

      transaction.oncomplete = () => resolve();
      transaction.onerror = (err) => reject(err);
    };

    request.onerror = (err) => reject(err);
  });
};

export const loadFromIndexedDB = (key) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BundlesDB", 2);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("allBundles", "readonly");
      const store = transaction.objectStore("allBundles");

      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        const result = getRequest.result;
        if (result && result.data) {
          // Retornar a estrutura completa com metadados e bundles
          resolve({
            ...result.data.metadata,
            bundles: result.data.bundles || [],
            savedAt: result.savedAt
          });
        } else {
          // Retornar estrutura vazia compatível com o novo formato
          resolve({
            last_update: null,
            totalBundles: 0,
            isTestMode: false,
            processedCount: 0,
            processingTimeSeconds: 0,
            bundlesPerSecond: 0,
            bundles: [],
            savedAt: null
          });
        }
      };
      getRequest.onerror = (err) => reject(err);
    };

    request.onerror = (err) => reject(err);
  });
};

export const initializeIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BundlesDB", 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Remove object store antigo se existir
      if (db.objectStoreNames.contains("allBundles")) {
        db.deleteObjectStore("allBundles");
      }
      
      // Criar novo object store com estrutura atualizada
      if (!db.objectStoreNames.contains("allBundles")) {
        db.createObjectStore("allBundles", { keyPath: "key" });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Função auxiliar para obter apenas os bundles
export const getBundlesFromIndexedDB = async (key) => {
  try {
    const data = await loadFromIndexedDB(key);
    return data.bundles || [];
  } catch (error) {
    console.error('Erro ao carregar bundles do IndexedDB:', error);
    return [];
  }
};

// Função auxiliar para obter metadados
export const getMetadataFromIndexedDB = async (key) => {
  try {
    const data = await loadFromIndexedDB(key);
    return {
      last_update: data.last_update,
      totalBundles: data.totalBundles,
      isTestMode: data.isTestMode,
      processedCount: data.processedCount,
      processingTimeSeconds: data.processingTimeSeconds,
      bundlesPerSecond: data.bundlesPerSecond,
      savedAt: data.savedAt
    };
  } catch (error) {
    console.error('Erro ao carregar metadados do IndexedDB:', error);
    return null;
  }
};

// Função para verificar se os dados estão atualizados
export const isDataFresh = async (key, maxAgeMinutes = 30) => {
  try {
    const metadata = await getMetadataFromIndexedDB(key);
    if (!metadata || !metadata.savedAt) return false;
    
    const savedTime = new Date(metadata.savedAt);
    const now = new Date();
    const diffMinutes = (now - savedTime) / (1000 * 60);
    
    return diffMinutes < maxAgeMinutes;
  } catch (error) {
    console.error('Erro ao verificar frescor dos dados:', error);
    return false;
  }
};