import type { LinkItemType } from 'fumadocs-ui/layouts/shared'
import Image from 'next/image'
import { GithubStars } from '@/components/common/github-stars'
import { SbomLink } from '@/components/common/sbom-link'

export const navTitle = (
	<Image src="/img/logo.png" alt="kftray" width={28} height={28} className="rounded-md" />
)

const navExtras: LinkItemType[] = [
	{
		type: 'custom',
		secondary: true,
		children: <SbomLink />,
	},
	{
		type: 'custom',
		secondary: true,
		children: <GithubStars />,
	},
]

export const siteNavLinks: LinkItemType[] = [
	{ text: 'Docs', url: '/docs' },
	{ text: 'Blog', url: '/blog' },
	{ text: 'Downloads', url: '/downloads' },
	...navExtras,
]
