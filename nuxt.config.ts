export default defineNuxtConfig({
	            site: {  url: 'https://kftray.app',  name: 'kftray'  },
				extends: "@nuxt-themes/docus",
				modules: ["@nuxtjs/tailwindcss", "@nuxtjs/plausible", "@nuxt/content", '@nuxtjs/robots', 'nuxt-og-image'],
				css: ["@fortawesome/fontawesome-svg-core/styles.css", "~/assets/css/global.css"],

				app: {
						head: {
								htmlAttrs: {
										class: 'loading'
								}
						}
				},

				vite: {
						css: {
								devSourcemap: true
						},
						optimizeDeps: {
								include: ['@nuxt-themes/docus'],
								exclude: ['fsevents', 'globby', 'unicorn-magic']
						},
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
						},
						ssr: {
								noExternal: [
										'fsevents',
										'globby',
										'unicorn-magic',
										'@nuxt/content',
										'@nuxt-themes/docus',
										'nuxt',
										'#imports',
										'#internal/nitro',
										'#internal/nuxt'
								]
						}
				},
				components: {
								dirs: [
										{
												path: '~/components/content',
												global: true,
												pathPrefix: false
										},
										{
												path: '~/components/common',
												global: true,
												pathPrefix: false
										},
										'~/components'
								]
						},


				nitro: {
						externals: {
								inline: [
										'fsevents',
										'globby',
										'unicorn-magic',
										'@nuxt/content',
										'@nuxt-themes/docus'
								]
						},
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
						renderJsonPayloads: true
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
