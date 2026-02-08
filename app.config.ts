// https://github.com/nuxt-themes/docus/blob/main/nuxt.schema.ts
export default defineAppConfig({
	docus: {
		title: 'kftray',
		description: 'Manage and share multiple kubectl port-forward in the menu bar',
		github: {
			dir: '.starters/default/content',
			branch: 'main',
			repo: 'kftray',
			owner: 'hcavarsan',
			edit: true,
		},
		aside: {
			level: 1,
			exclude: [],
		},
		main: {
			padded: true,
			fluid: true,
		},
		header: {
			logo: true,
			showLinkIcon: true,
			exclude: [],
			fluid: true,
		},
		icons: {
			size: '18px',
		},
	},
})
