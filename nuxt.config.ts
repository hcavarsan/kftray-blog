export default defineNuxtConfig({
  extends: "@nuxt-themes/docus",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/plausible"],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],

  mdc: {
    highlight: {
      langs: ["powershell", "json", "yaml", "bash", "toml", "hcl"],
    },
  },

  runtimeConfig: {
    public: {
      plausible: {
        domain: "kftray.app",
      },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag === "image",
    },
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: false,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (process.server) return undefined;

            if (id.includes("@fortawesome")) {
              return "vendor-fortawesome";
            }
            if (id.includes("vue")) {
              return "vendor-vue";
            }
            if (
              ["vue-demi", "defu", "cookie-es"].some((pkg) => id.includes(pkg))
            ) {
              return "vendor-core";
            }
          },
        },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
    routeRules: {
      "/**": { prerender: true },
    },
    minify: true,
    experimental: {
      asyncContext: true,
    },
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },
});
