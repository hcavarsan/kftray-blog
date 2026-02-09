import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

interface PageProps {
	params: Promise<{ slug?: string[] }>
}

export default async function Page(props: PageProps) {
	const params = await props.params
	const page = source.getPage(params.slug)
	if (!page) notFound()

	const Mdx = page.data.body

	return (
		<DocsPage
			toc={page.data.toc}
			tableOfContent={{ enabled: false }}
			footer={{ className: 'mt-12' }}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<Mdx components={getMDXComponents()} />
			</DocsBody>
		</DocsPage>
	)
}

export async function generateStaticParams() {
	return source.generateParams()
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const params = await props.params
	const page = source.getPage(params.slug)
	if (!page) notFound()

	return {
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			title: page.data.title,
			description: page.data.description,
			url: `/docs/${(params.slug ?? []).join('/')}`,
			type: 'article',
			images: [{ url: `/api/og?title=${encodeURIComponent(page.data.title)}` }],
		},
	}
}
