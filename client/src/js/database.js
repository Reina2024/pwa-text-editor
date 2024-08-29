// Import the openDB function from the idb library to work with IndexedDB
import { openDB } from "idb";

// Initialize the database by creating or opening an IndexedDB instance
const initdb = async () =>
  openDB("TEXA", 1, {
    // Define the upgrade function to handle database creation and schema updates
    upgrade(db) {
      // Check if the object store "TEXA" already exists
      if (db.objectStoreNames.contains("TEXA")) {
        console.log("Database for TEXA already exists");
        return; // Exit the function if the object store is already present
      }
     
      // Create a new object store named "TEXA" with "id" as the keyPath and autoIncrement set to true
      db.createObjectStore("TEXA", { keyPath: "id", autoIncrement: true });
      console.log("Database for TEXA has been created");
    },
  });

// Export a function to save content to the database
export const putDb = async (content) => {
  console.log("Put to the database");

  // Open a connection to the "TEXA" database
  const TEXADb = await openDB("TEXA", 1);
  
  // Start a readwrite transaction on the "TEXA" object store
  const tx = TEXADb.transaction("TEXA", "readwrite");
  const store = tx.objectStore("TEXA");
  
  // Put the content into the object store with a fixed id of 1
  const request = store.put({ id: 1, value: content });
  const result = await request;

  if (result !== undefined) {
    // Log the ID of the saved data and retrieve the saved data for confirmation
    console.log("Data saved to the database, ID:", result);
    const savedData = await store.get(result);
    console.log("Saved data:", savedData.value);
    return savedData.value;
  } else {
    // Log a message if the save operation did not return a result
    console.log("TEXA saved your note to the database!");
    return null;
  }
};

// Export a function to retrieve content from the database
export const getDb = async () => {
  console.log("Get all notes from the database");

  // Open a connection to the "TEXA" database
  const kittiesDb = await openDB("TEXA", 1);
  
  // Start a readonly transaction on the "TEXA" object store
  const tx = kittiesDb.transaction("TEXA", "readonly");
  const store = tx.objectStore("TEXA");
  
  // Get the content with id 1 from the object store
  const request = store.get(1);
  const result = await request;

  // Log the result and return the content
  result
    ? console.log("Notes retrieved from database:", result.value)
    : console.log("TEXA did not find any notes in the database");
  return result?.value;
};

// Export a function to delete content from the database
export const deleteDb = async () => {
  console.log("TEXA can not find your notes!");

  // Open a connection to the "TEXA" database
  const kittiesDb = await openDB("TEXA", 1);
  
  // Start a readwrite transaction on the "TEXA" object store
  const tx = kittiesDb.transaction("TEXA", "readwrite");
  const store = tx.objectStore("TEXA");
  
  // Delete the content with id 1 from the object store
  const request = store.delete(1);
  await request;

  console.log("Note has been removed from the database");
  return true;
};

// Initialize the database when the script runs
initdb();
