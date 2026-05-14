export const site = {
	url: 'https://kftray.app',
	name: 'kftray',
	title: 'kftray - kubectl port-forward on steroids',
	description:
		'Manage and share multiple kubectl port-forward configurations with ease. A cross-platform system tray app and CLI for Kubernetes port forwarding.',
	ogImage: '/img/kftray-head.png',
	author: 'Henrique Cavarsan',
	ogImageUrl(slugs: string[]): string {
		return `https://kftray.app/og/${slugs.join('/')}/image.png`
	},
}
