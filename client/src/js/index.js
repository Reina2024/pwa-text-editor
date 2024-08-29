// Import the Workbox library for managing service workers
import { Workbox } from "workbox-window";
// Import the Editor class for initializing the text editor
import { Editor } from "./editor";
// Import the setupDeleteButton function for setting up the delete button
import { setupDeleteButton } from "./delete";
// Import database setup to ensure database functionality is initialized
import "./database";
// Import CSS stylesheet for styling the application
import "../css/style.css";

// Select the main content area of the page
const main = document.querySelector("#main");
// Clear any existing content in the main area
main.innerHTML = "";

// Function to display a loading spinner
const loadSpinner = () => {
  // Create a new div element for the spinner
  const spinner = document.createElement("div");
  // Add the 'spinner' class to the div for styling
  spinner.classList.add("spinner");
  // Set the inner HTML of the spinner div to include loading spinner elements
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  `;
  // Append the spinner to the main content area
  main.appendChild(spinner);
};

// Create an instance of the Editor class and initialize the editor
const editor = new Editor().editor;

// Set up the delete button functionality with the editor instance
setupDeleteButton(editor);

// Check if the editor is undefined, which might indicate an issue initializing it
if (typeof editor === "undefined") {
  // If the editor is not defined, display the loading spinner
  loadSpinner();
}

// Check if the browser supports service workers
if ("serviceWorker" in navigator) {
  // Create a new Workbox instance with the service worker file
  const workboxSW = new Workbox("/src-sw.js");
  // Register the service worker
  workboxSW.register();
} else {
  // Log an error if service workers are not supported in the browser
  console.error("Service workers are not supported in this browser.");
}
