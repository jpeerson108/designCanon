import { defineConfig } from "astro/config"

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
})
