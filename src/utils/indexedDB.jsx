export const saveToIndexedDB = (key, data) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BundlesDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("allBundles")) {
        db.createObjectStore("allBundles", { keyPath: "key" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("allBundles", "readwrite");
      const store = transaction.objectStore("allBundles");

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