import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description: 'How the kftray.app website and the kftray YouTube publishing client handle data.',
	alternates: {
		canonical: `${site.url}/privacy`,
	},
}

export default function PrivacyPage() {
	return (
		<>
			<h1>Privacy Policy</h1>
			<p>Last updated: October 3, 2026</p>
			<p>This policy covers the kftray.app website and the kftray YouTube publishing client.</p>

			<h2>Website</h2>
			<p>
				The site counts page views and clicks (for example, download buttons) with{' '}
				<a href="https://umami.is">Umami</a>, a self-hosted analytics tool at umami.cavarsa.app.
				Umami doesn't use cookies, and the site doesn't send URL query strings or fragments to it.
			</p>
			<p>
				Blog comments use <a href="https://giscus.app">Giscus</a>, which stores comments in GitHub
				Discussions on the{' '}
				<a href="https://github.com/hcavarsan/kftray-blog">hcavarsan/kftray-blog</a> repository.
				Posting a comment requires a GitHub account and follows the{' '}
				<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
					GitHub Privacy Statement
				</a>
				.
			</p>
			<p>
				Some pages embed YouTube videos from youtube-nocookie.com. The video loads only after you
				click it, and playback follows the{' '}
				<a href="http://www.google.com/policies/privacy">Google Privacy Policy</a>.
			</p>
			<p>The site doesn't show ads and doesn't sell or share visitor data.</p>

			<h2>YouTube publishing client</h2>
			<p>
				The kftray maintainer uses an internal tool to upload kftray demo videos to the kftray
				YouTube channel. The tool uses YouTube API Services and isn't offered to other users.
			</p>
			<p>
				The tool asks for the <code>youtube.upload</code> scope only. It uses that access to upload
				videos and set their title, description and language. It doesn't read channel data,
				comments, analytics or any other account data.
			</p>
			<p>
				The OAuth token stays with the maintainer, outside the source code, and isn't shared with
				anyone. Deleting the token stops all access.
			</p>
			<p>
				You can revoke the tool's access at any time on the{' '}
				<a href="https://security.google.com/settings/security/permissions">
					Google security settings page
				</a>
				. Google's handling of your data follows the{' '}
				<a href="http://www.google.com/policies/privacy">Google Privacy Policy</a>.
			</p>

			<h2>Contact</h2>
			<p>
				Questions about this policy go to{' '}
				<a href="mailto:hencavarsan@gmail.com">hencavarsan@gmail.com</a>.
			</p>
		</>
	)
}
