import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: "@nuxt-themes/docus",
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/plausible"],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],

  mdc: {
    highlight: {
      langs: ["powershell", "json", "yaml", "bash", "toml", "hcl", "terraform"]
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

  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['json', 'js', 'ts', 'bash', 'hcl', 'terraform'],
      langs: [
        {
          name: 'tree',
          scopeName: 'source.tree',
          aliases: ['filesystem'],
          patterns: [
            {
              match: '(├──|└──|│)',
              name: 'punctuation.definition.tree'
            },
            {
              match: '([\\w-]+/)(?=[^/])',
              name: 'string.other.directory'
            },
            {
              match: '(\\.\\w+|package\\.json|README\\.md)',
              name: 'string.other.special-file'
            },
            {
              match: '\\.[\\w-]+',
              name: 'string.other.file'
            },
            {
              match: '\\(.*?\\)',
              name: 'constant.numeric.size'
            },
            {
              match: '#.*$',
              name: 'comment.line'
            }
          ],
          repository: {
            $self: {
              patterns: [
                { include: '#tree_structure' },
                { include: '#directory' },
                { include: '#file' },
                { include: '#comment' }
              ]
            },
            $base: {},
            tree_structure: {
              match: '(├──|└──|│)',
              name: 'punctuation.definition.tree'
            },
            directory: {
              match: '([\\w-]+/)(?=[^/])',
              name: 'string.other.directory'
            },
            file: {
              patterns: [
                {
                  match: '(\\.\\w+|package\\.json|README\\.md)',
                  name: 'string.other.special-file'
                },
                {
                  match: '\\.[\\w-]+',
                  name: 'string.other.file'
                }
              ]
            },
            comment: {
              match: '#.*$',
              name: 'comment.line'
            }
          }
        }
      ]
    }
  }
});
