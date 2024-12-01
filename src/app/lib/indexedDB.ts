import { IFCChatAction, IFCChatParameters, IFCMessage } from "@/types/message";
import { IDBPDatabase, openDB } from "idb";

const dbName = "ai-chatbot";
const dbVersion = 1;

const objectStoreNames: string[] = ["messages", "config"];

const openDatabase = async (): Promise<IDBPDatabase<unknown>> => {
  try {
    return await openDB(dbName, dbVersion, {
      upgrade(db) {
        objectStoreNames.forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            if (storeName === "messages") {
              db.createObjectStore(storeName, {
                keyPath: "id",
                autoIncrement: true,
              });
            } else if (storeName === "config") {
              db.createObjectStore(storeName, {
                keyPath: "id", // Ensure there's a keyPath for 'config' as well
              });
            } else {
              db.createObjectStore(storeName);
            }
          }
        });
      },
    });
  } catch (error) {
    console.error("Error opening database:", error);
    throw error;
  }
};

const saveData = async <T>(storeName: string, data: T): Promise<void> => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.put(data);
    await tx.done;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
};

const getData = async <T>(
  storeName: string,
  key: string | number
): Promise<T | undefined> => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return await store.get(key);
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const getAllData = async <T>(storeName: string): Promise<T[]> => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return await store.getAll();
  } catch (error) {
    console.error("Error getting all data:", error);
    throw error;
  }
};

const updateData = async <T>(
  storeName: string,
  key: string | number,
  newData: T
): Promise<void> => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.put({ ...newData, id: key });
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

const deleteData = async (
  storeName: string,
  key: string | number
): Promise<void> => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.delete(key);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

// Specific functions for messages and config

const saveMessage = async (message: IFCMessage): Promise<void> => {
  await saveData("messages", message);
};

const getMessages = async (): Promise<IFCMessage[]> => {
  return await getAllData<IFCMessage>("messages");
};

const saveConfig = async (config: IFCChatParameters): Promise<void> => {
  // Add a unique key if not already present
  const configWithKey = { ...config, id: "parameters" }; // or any unique key you prefer
  await saveData("config", configWithKey);
};

const loadConfig = async (): Promise<IFCChatParameters | undefined> => {
  return await getData<IFCChatParameters>("config", "parameters");
};

export {
  openDatabase,
  saveData,
  getData,
  getAllData,
  updateData,
  deleteData,
  saveMessage,
  getMessages,
  saveConfig,
  loadConfig,
};
