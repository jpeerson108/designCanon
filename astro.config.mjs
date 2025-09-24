import { defineConfig } from "astro/config"

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": "/src", // ✅ now you can use @/ to point to src/
      },
    },
  },
})
