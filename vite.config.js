import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    coverage: {
      reporter: ["text", "lcov"],
      exclude: [
        "postcss.config.js",
        "tailwind.config.js",
        "eslint.config.js",
        "vite.config.js",
        "src/main.jsx",
        "dist",
      ],
    },
  },
});
