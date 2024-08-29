// Import necessary modules
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    // Set the mode to development for easier debugging
    mode: "development",
    
    // Entry points for the application
    entry: {
      main: "./src/js/index.js",       // Main entry point
      install: "./src/js/install.js",  // Entry point for install functionality
      delete: "./src/js/delete.js",    // Entry point for delete functionality
    },
    
    // Output configuration
    output: {
      filename: "[name].bundle.js",    // Output file name with entry point name
      path: path.resolve(__dirname, "dist"), // Output directory
    },
    
    plugins: [
      // Generates an HTML file from a template and injects bundles
      new HtmlWebpackPlugin({
        template: "./index.html",   // Template HTML file
        title: "TEXA",              // Title for the HTML file
        favicon: "./favicon.ico",   // Path to the favicon
      }),
      
      // Injects the service worker into the build
      new InjectManifest({
        swSrc: "./src-sw.js",   // Source file for the service worker
        swDest: "src-sw.js",    // Output file for the service worker
      }),
      
      // Generates a manifest for the Progressive Web App (PWA)
      new WebpackPwaManifest({
        fingerprints: false,    // Disable fingerprinting of the manifest
        inject: true,           // Inject the manifest into the HTML
        name: "Text Editor X Application",   // Full name of the PWA
        short_name: "TEXA",               // Short name for the PWA
        description: "It's a Text Editor...", // Description of the PWA
        favicon: "./favicon.ico",    // Path to the favicon
        background_color: "#faf8f5", // Background color of the PWA
        theme_color: "#b29762",      // Theme color of the PWA
        start_url: "/",              // Start URL for the PWA
        publicPath: "/",             // Public path for the PWA
        icons: [
          {
            src: path.resolve("src/images/logoNew.png"), // Path to the icon image
            sizes: [96, 128, 192, 256, 384, 512],       // Different sizes for the icon
            destination: path.join("assets", "icons"),   // Destination directory for icons
          },
        ],
      }),
    ],
    
    module: {
      rules: [
        // Rule for processing CSS files
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"], // Loaders to handle CSS
        },
        
        // Rule for processing JavaScript files with Babel
        {
          test: /\.m?js$/,                     // Process JS files
          exclude: /node_modules/,            // Exclude node_modules
          use: {
            loader: "babel-loader",           // Use Babel loader
            options: {
              presets: ["@babel/preset-env"], // Babel preset for JavaScript
              plugins: [
                "@babel/plugin-proposal-object-rest-spread", // Plugin for object rest/spread
                "@babel/transform-runtime",                 // Plugin to optimize runtime
              ],
            },
          },
        },
      ],
    },
  };
};
