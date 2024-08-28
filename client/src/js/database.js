import { openDB } from "idb";

const initdb = async () =>
 
  openDB("TEXA", 1, {
   
    upgrade(db) {
      if (db.objectStoreNames.contains("TEXA")) {
        console.log("Database for TEXA already exists");
        return;
      }
     
      db.createObjectStore("TEXA", { keyPath: "id", autoIncrement: true });
      console.log("Database for TEXA has been created");
    },
  });


export const putDb = async (content) => {
  console.log("Put to the database");

  
  const TEXADb = await openDB("TEXA", 1);
  const tx = TEXADb.transaction("TEXA", "readwrite");
  const store = tx.objectStore("TEXA");
  const request = store.put({ id: 1, value: content });
const result = await request;

  if (result !== undefined) {
    console.log("Data saved to the database, ID:", result);

  
    const savedData = await store.get(result);
    console.log("Saved data:", savedData.value);
    return savedData.value;
  } else {
    console.log(
      "TEXA saved  your note to the database!"
    );
    return null;
  }
};


export const getDb = async () => {
  console.log("Get all notes from the database");

  
  const kittiesDb = await openDB("TEXA", 1);
  const tx = kittiesDb.transaction("TEXA", "readonly");

  const store = tx.objectStore("TEXA");

  const request = store.get(1);

  const result = await request;
  result
    ? console.log("Notes retrieved from database:", result.value)
    : console.log("TEXA did not find any notes in the database");
  return result?.value;
};

export const deleteDb = async () => {
  console.log("TEXA can not find your notes!");
  const kittiesDb = await openDB("TEXA", 1);
  const tx = kittiesDb.transaction("TEXA", "readwrite");
  const store = tx.objectStore("TEXA");
  const request = store.delete(1);
  await request;

  console.log("Note has been removed from the database");
  return true;
};

// Starts database
initdb();
