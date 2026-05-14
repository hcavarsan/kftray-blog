import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DownloadMarkdown } from '@/components/common/download-markdown'
import { site } from '@/lib/site'
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
	const slugPath = (params.slug ?? ['index']).join('/')

	return (
		<DocsPage
			toc={page.data.toc}
			tableOfContent={{ enabled: false }}
			footer={{ className: 'mt-12' }}
		>
			<div className="flex items-center justify-between">
				<DocsTitle>{page.data.title}</DocsTitle>
				<DownloadMarkdown
					contentPath={`docs/${slugPath}`}
					filename={params.slug ? params.slug[params.slug.length - 1] : 'index'}
				/>
			</div>
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
			url: `${site.url}/docs/${(params.slug ?? []).join('/')}`,
			type: 'article',
			images: [{ url: `${site.url}${site.ogImage}` }],
		},
		alternates: {
			canonical: `${site.url}/docs/${(params.slug ?? []).join('/')}`,
		},
	}
}
