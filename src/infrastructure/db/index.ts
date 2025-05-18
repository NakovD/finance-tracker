import { dbConstants } from "./constants/constants";
import type { DbResult } from "./models/dbResult";

export const expenseTrackerDB = {
  getAll: <T>() => {
    const openRequest = indexedDB.open(
      dbConstants.dbName,
      dbConstants.dbVersion
    );

    return new Promise<DbResult<T>>((resolve, reject) => {
      openRequest.onerror = () => {
        reject({
          success: false,
          message: openRequest.error?.message || "Error opening database",
        });
      };

      openRequest.onsuccess = () => {
        const transaction = openRequest.result.transaction(
          [dbConstants.objectStoreName],
          "readonly"
        );
        const resultRequest = transaction
          .objectStore(dbConstants.objectStoreName)
          .getAll();

        resultRequest.onerror = () =>
          reject({
            success: false,
            message: resultRequest.error?.message || "Error reading data",
          });
        resultRequest.onsuccess = () => {
          resolve({
            success: true,
            message: "Data read successfully",
            data: resultRequest.result as T,
          });
          transaction.oncomplete = () => openRequest.result.close();
        };
      };
    });
  },
  getSingleById: <T>(id: string) => {
    const openRequest = indexedDB.open(
      dbConstants.dbName,
      dbConstants.dbVersion
    );

    return new Promise<DbResult<T>>((resolve, reject) => {
      openRequest.onerror = () => {
        reject({
          success: false,
          message: openRequest.error?.message || "Error opening database",
        });
      };

      openRequest.onsuccess = () => {
        const transaction = openRequest.result.transaction(
          dbConstants.objectStoreName,
          "readonly"
        );

        const resultRequest = transaction
          .objectStore(dbConstants.objectStoreName)
          .get(id);

        resultRequest.onerror = () =>
          reject({
            success: false,
            message: resultRequest.error?.message || "Error reading data",
          });

        resultRequest.onsuccess = () => {
          resolve({
            success: true,
            message: "Data read successfully",
            data: resultRequest.result as T,
          });
        };

        transaction.oncomplete = () => openRequest.result.close();
      };
    });
  },
  addSingle: <T>(data: T) => {
    const openRequest = indexedDB.open(
      dbConstants.dbName,
      dbConstants.dbVersion
    );

    return new Promise<DbResult<T>>((resolve, reject) => {
      openRequest.onerror = () => {
        reject({
          success: false,
          message: openRequest.error?.message || "Error opening database",
        });
      };

      openRequest.onsuccess = () => {
        const transaction = openRequest.result.transaction(
          dbConstants.objectStoreName,
          "readwrite"
        );

        const resultRequest = transaction
          .objectStore(dbConstants.objectStoreName)
          .add(data);

        resultRequest.onerror = () =>
          reject({
            success: false,
            message: resultRequest.error?.message || "Error adding data",
          });

        resultRequest.onsuccess = () =>
          resolve({ success: true, message: "Data added successfully", data });

        transaction.oncomplete = () => openRequest.result.close();
      };
    });
  },
  editSingle: <T>(data: T) => {
    const openRequest = indexedDB.open(
      dbConstants.dbName,
      dbConstants.dbVersion
    );

    return new Promise<DbResult<T>>((resolve, reject) => {
      openRequest.onerror = () => {
        reject({
          success: false,
          message: openRequest.error?.message || "Error opening database",
        });
      };

      openRequest.onsuccess = () => {
        const transaction = openRequest.result.transaction(
          dbConstants.objectStoreName,
          "readwrite"
        );

        const resultRequest = transaction
          .objectStore(dbConstants.objectStoreName)
          .put(data);

        resultRequest.onerror = () =>
          reject({
            success: false,
            message: resultRequest.error?.message || "Error editing data",
          });

        resultRequest.onsuccess = () =>
          resolve({ success: true, message: "Data edited successfully", data });

        transaction.oncomplete = () => openRequest.result.close();
      };
    });
  }
} as const;

const initDb = () => {
  const request = indexedDB.open(dbConstants.dbName, dbConstants.dbVersion);

  request.onerror = () => {
    console.error("Error opening database:", request.error?.message);
  };

  request.onupgradeneeded = () => {
    const db = request.result;

    if (db.objectStoreNames.contains(dbConstants.objectStoreName)) return;

    const objectStore = db.createObjectStore(dbConstants.objectStoreName, {
      keyPath: "id",
    });
  };
};

initDb();
