import { defineNuxtConfig } from 'nuxt/config'
import remarkGfm from 'remark-gfm'
import remarkCleanChars from './utils/remark/clean-chars'


export default defineNuxtConfig({
  extends: "@nuxt-themes/docus",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/plausible", "@nuxt/content"],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],


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
    compatibilityDate: '2024-04-03'
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },
  mdc: {
    headings: {
      anchorLinks: {
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false
      }
    }
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-dark',
      preload: [
        'bash',
        'json',
        'yaml',
        'powershell',
        'toml',
        'hcl',
        'terraform',
      ]
    },
    markdown: {
      toc: {
        depth: 4,
        searchDepth: 4
      },
      remarkPlugins: {
        'remark-gfm': {
          singleTilde: false
        }
      }
    }
  },
})
