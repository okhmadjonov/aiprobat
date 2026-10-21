import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: false,
      },
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  server: {
    port:5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});