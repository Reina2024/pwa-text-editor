// Import necessary modules from Workbox libraries
const { warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache and route assets based on the generated manifest
precacheAndRoute(self.__WB_MANIFEST);

// Define a cache strategy for HTML pages using CacheFirst strategy
const pageCache = new CacheFirst({
  cacheName: "page-cache",  // Name of the cache for HTML pages
  plugins: [
    // Plugin to cache responses with specific statuses (e.g., 200 OK)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Plugin to control the maximum age of cached items
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,  // Cache items for 30 days
    }),
  ],
});

// Pre-warm the cache with specific URLs for better performance
warmStrategyCache({
  urls: ["/index.html", "/"],  // URLs to pre-cache
  strategy: pageCache,        // Use the pageCache strategy for these URLs
});

// Register a route for navigation requests (HTML pages)
registerRoute(
  ({ request }) => request.mode === "navigate",  // Match navigation requests
  pageCache  // Use the pageCache strategy for these requests
);

// Register a route for caching assets such as styles, scripts, and workers
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination), // Match requests for styles, scripts, and workers
  new StaleWhileRevalidate({
    cacheName: "asset-cache",  // Name of the cache for assets
    plugins: [
      // Plugin to cache responses with specific statuses (e.g., 200 OK)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
``
