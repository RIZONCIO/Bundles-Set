export const saveToIndexedDB = (key, data) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BundlesDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log("onupgradeneeded: Inicializando IndexedDB...");
      if (!db.objectStoreNames.contains("allBundles")) {
        db.createObjectStore("allBundles", { keyPath: "key" });
        console.log("Object store 'allBundles' criado com sucesso.");
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log("onsuccess: IndexedDB aberto com sucesso.");
      const transaction = db.transaction("allBundles", "readwrite");
      const store = transaction.objectStore("allBundles");

      store.put({ key, data });

      transaction.oncomplete = () => {
        console.log("Dados salvos com sucesso no IndexedDB.");
        resolve();
      };
      transaction.onerror = (err) => reject(err);
    };

    request.onerror = (err) => {
      console.error("Erro ao abrir IndexedDB:", err);
      reject(err);
    };
  });
};

export const loadFromIndexedDB = (key) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BundlesDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("allBundles", "readonly");
      const store = transaction.objectStore("allBundles");

      const getRequest = store.get(key);

      getRequest.onsuccess = () => resolve(getRequest.result?.data || []);
      getRequest.onerror = (err) => reject(err);
    };

    request.onerror = (err) => reject(err);
  });
};

export const initializeIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BundlesDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log("Inicializando IndexedDB...");
      if (!db.objectStoreNames.contains("allBundles")) {
        db.createObjectStore("allBundles", { keyPath: "key" });
        console.log("Object store 'allBundles' criado.");
      }
    };

    request.onsuccess = (event) => {
      console.log("IndexedDB inicializado com sucesso.");
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error("Erro ao inicializar IndexedDB:", event.target.error);
      reject(event.target.error);
    };
  });
};