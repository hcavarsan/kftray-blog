import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Terms of Service',
	description: 'Terms for the kftray.app website and the kftray YouTube publishing client.',
	alternates: {
		canonical: `${site.url}/terms`,
	},
}

export default function TermsPage() {
	return (
		<>
			<h1>Terms of Service</h1>
			<p>Last updated: October 3, 2026</p>
			<p>These terms cover the kftray.app website and the kftray YouTube publishing client.</p>

			<h2>Website and software</h2>
			<p>
				The website and its content are provided as is, without warranty. kftray and kftui are open
				source, and their license is in the{' '}
				<a href="https://github.com/hcavarsan/kftray">GitHub repository</a>.
			</p>

			<h2>YouTube publishing client</h2>
			<p>
				The kftray YouTube publishing client uses YouTube API Services. By using it, you agree to be
				bound by the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a>.
			</p>

			<h2>Changes</h2>
			<p>These terms can change. The date at the top shows the last update.</p>

			<h2>Contact</h2>
			<p>
				Questions about these terms go to{' '}
				<a href="mailto:hencavarsan@gmail.com">hencavarsan@gmail.com</a>.
			</p>
		</>
	)
}
