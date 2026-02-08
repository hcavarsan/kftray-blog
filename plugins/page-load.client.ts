export default defineNuxtPlugin(() => {
	if (process.client) {
		window.addEventListener('load', () => {
			document.documentElement.classList.remove('loading')
		})
	}
})
