// Import the function to delete data from the database
import { deleteDb } from "./database";

// Define and export the setupDeleteButton function, which configures the delete button's behavior
export const setupDeleteButton = (editor) => {
  // Select the delete button element from the DOM
  const butDelete = document.getElementById("buttonDelete");

  // Add a click event listener to the delete button
  butDelete.addEventListener("click", async () => {
    try {
      // Log a message indicating that the delete button was clicked
      console.log("delete button clicked!");

      // Remove the content from localStorage
      localStorage.removeItem("content");

      // Call the deleteDb function to remove data from the database
      await deleteDb();

      // Update the editor's content with a message and ASCII art indicating that the notes have been cleared
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
      // Log an error message if something goes wrong during the delete operation
      console.error("Error deleting content:", error);
    }
  });
};
