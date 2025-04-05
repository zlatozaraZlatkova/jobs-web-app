import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
    // More restrictive CORS policy for dev server
    cors: false,
  },
  fs: {
    deny: [
      ".env",
      ".env.*",
      "*.{pem,crt,key}",
      "node_modules/.vite",
      ".git/**",
    ],
  },
});
