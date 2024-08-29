// Reference to the "Install" button element
const butInstall = document.getElementById('buttonInstall');

// Event listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the event for later use to show the install prompt
  window.deferredPrompt = event;
  
  // Make the "Install" button visible when the prompt is available
  butInstall.classList.toggle('hidden', false);
});

// Event listener for the "Install" button click
butInstall.addEventListener('click', async () => {
  // Retrieve the deferred prompt event
  const promptEvent = window.deferredPrompt;

  // If there's no deferred prompt, exit the function
  if (!promptEvent) {
    return;
  }

  // Show the install prompt to the user
  promptEvent.prompt();
  
  // Reset the deferredPrompt variable as the prompt has been shown
  window.deferredPrompt = null;
  
  // Hide the "Install" button after showing the prompt
  butInstall.classList.toggle('hidden', true);
});

// Event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferred prompt variable as the app has been installed
  window.deferredPrompt = null;
});
