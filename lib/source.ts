import type { InferPageType } from 'fumadocs-core/source'
import { loader } from 'fumadocs-core/source'
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server'
import { blog, docs } from '@/.source/server'

export const source = loader({
	baseUrl: '/docs',
	source: docs.toFumadocsSource(),
})

export const blogSource = loader({
	baseUrl: '/blog',
	source: toFumadocsSource(blog, []),
})

export type BlogPageType = InferPageType<typeof blogSource>
