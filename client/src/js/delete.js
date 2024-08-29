import { deleteDb } from "./database";

export const setupDeleteButton = (editor) => {
  const butDelete = document.getElementById("buttonDelete");

  butDelete.addEventListener("click", async () => {
    try {
      console.log("delete button clicked!");

      // Remove content from local storage
      localStorage.removeItem("content");

      // Call the function to delete data from the database
      await deleteDb();

      // Update the editor with a message and ASCII art
      editor.setValue(`
     ██████████████████████████████████████████████
██                                                  ██
██  ████████████████████  ████████████████████  ██
██  ███              ███  ███              ███  ██
██  ███  ███████████████  ███████████████████  ██
██  ███              ███  ███              ███  ██
██  ███  ███████████████  ███████████████████  ██
██  ███              ███  ███              ███  ██
██  ████████████████████  ████████████████████  ██
██                                                  ██
██████████████████████████████████████████████

Your TEXA notes have been cleared!
All data has been removed! 📓💨
     `);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  });
};

