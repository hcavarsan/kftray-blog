export default defineNuxtPlugin(() => {
	const cleanText = (text: string) => {
		if (!text) return text
		return text
			.replace(/[\u201C\u201D]/g, '"')
			.replace(/[\u2018\u2019]/g, "'")
			.replace(/\u2026/g, '...')
			.replace(/\u2013/g, '-')
			.replace(/\u2014/g, '--')
	}

	return {
		provide: {
			cleanText,
		},
	}
})
