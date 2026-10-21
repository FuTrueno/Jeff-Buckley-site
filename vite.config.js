import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// `base: "./"` keeps every built asset URL relative, so the same `dist/`
// works on GitHub Pages project sites (user.github.io/repo/) without changes.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Magic UI and React Bits source uses the shadcn "@" alias.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Both libraries import `motion/react`; reuse the Framer Motion runtime
      // that is already installed instead of shipping a duplicate.
      "motion/react": "framer-motion",
    },
  },
  server: { port: 5173, open: false },
  build: {
    // The site is small; keep all styles in one file for Pages.
    cssCodeSplit: false,
    // Framer Motion + React Router put the main chunk just over 500 kB.
    chunkSizeWarningLimit: 650,
  },
});
