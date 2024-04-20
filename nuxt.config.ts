export default defineNuxtConfig({
	extends: '@nuxt-themes/docus',
	modules: ['@nuxtjs/tailwindcss', '@nuxtjs/plausible'],
	css: ['@fortawesome/fontawesome-svg-core/styles.css'],
	runtimeConfig: {
		public: {
		  plausible: {
			domain: 'kftray.app',
		  },
		},
	},
	vue: {
		compilerOptions: {
		  isCustomElement: tag => tag === 'image',
		},
	},
  })
