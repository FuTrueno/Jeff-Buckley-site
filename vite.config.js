import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// `base: "./"` keeps every built asset URL relative, so the same `dist/`
// works on GitHub Pages project sites (user.github.io/repo/) without changes.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: false },
  build: {
    // The site is small; keep all styles in one file for Pages.
    cssCodeSplit: false,
    // Framer Motion + React Router put the main chunk just over 500 kB.
    chunkSizeWarningLimit: 650,
  },
});
