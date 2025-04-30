export const saveToIndexedDB = (key, data) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("BundlesDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("bundles")) {
          db.createObjectStore("bundles", { keyPath: "key" });
        }
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("bundles", "readwrite");
        const store = transaction.objectStore("bundles");
  
        store.put({ key, data });
  
        transaction.oncomplete = () => resolve();
        transaction.onerror = (err) => reject(err);
      };
  
      request.onerror = (err) => reject(err);
    });
  };
  
  export const loadFromIndexedDB = (key) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("BundlesDB", 1);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("bundles", "readonly");
        const store = transaction.objectStore("bundles");
  
        const getRequest = store.get(key);
  
        getRequest.onsuccess = () => resolve(getRequest.result?.data || []);
        getRequest.onerror = (err) => reject(err);
      };
  
      request.onerror = (err) => reject(err);
    });
  };