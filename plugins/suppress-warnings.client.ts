/**
 * Suppresses known harmless Vue warnings in development.
 *
 * - Suspense experimental warning: Nuxt 3 uses Vue's <Suspense> internally
 *   for async data fetching. The warning cannot be avoided and is harmless.
 *   See: https://github.com/nuxt/nuxt/discussions/25973
 *
 * - Pinceau hydration class mismatches: Pinceau generates random variant
 *   class names (pv-*) via nanoid that differ between SSR and client.
 *   Vue confirms these are "check-only" and won't affect production.
 */
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.config.warnHandler = (msg, _instance, trace) => {
		if (msg.includes('Suspense') && msg.includes('experimental')) {
			return
		}

		if (msg.includes('Hydration') && msg.includes('mismatch') && msg.includes('pv-')) {
			return
		}

		// biome-ignore lint/suspicious/noConsole: passthrough for non-suppressed Vue warnings
		console.warn(`[Vue warn]: ${msg}`, trace)
	}
})
