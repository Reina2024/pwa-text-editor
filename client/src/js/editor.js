// Import functions to interact with the database and a header string for display
import { getDb, putDb } from "./database";
import { header } from "./header";

// Define the Editor class to handle the text editor functionality
export class Editor {
  constructor() {
    // Retrieve content from localStorage, if available
    const localData = localStorage.getItem("content");

    // Check if CodeMirror library is loaded; if not, throw an error
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    // Initialize a new CodeMirror editor instance
    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "", // Initial value of the editor
      mode: "javascript", // Syntax highlighting mode for JavaScript
      theme: "solarized", // Theme for CodeMirror
      lineNumbers: true, // Show line numbers in the editor
      lineWrapping: true, // Enable line wrapping
      autofocus: true, // Automatically focus the editor when loaded
      indentUnit: 2, // Number of spaces for indentation
      tabSize: 2, // Number of spaces per tab
    });

    // Load data from IndexedDB and set it as the editor's content
    // If no data is found in IndexedDB, use localStorage content or default to header
    getDb().then((data) => {
      console.info("Loaded data from IndexedDB, injecting into editor");
      this.editor.setValue(data || localData || header);
    });

    // Save editor content to localStorage whenever changes occur
    this.editor.on("change", () => {
      localStorage.setItem("content", this.editor.getValue());
    });

    // Handle editor blur event (when the editor loses focus)
    // Save the editor's content to IndexedDB
    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      putDb(localStorage.getItem("content"));
    });
  }
}
