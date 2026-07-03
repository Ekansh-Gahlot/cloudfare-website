/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/cloudfare-website/",
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    passWithNoTests: true,
  },
});
