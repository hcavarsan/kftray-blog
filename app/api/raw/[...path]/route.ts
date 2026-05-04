import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { notFound } from 'next/navigation'

interface RouteProps {
	params: Promise<{ path: string[] }>
}

export async function GET(_req: Request, { params }: RouteProps) {
	const { path } = await params
	const segment = path.join('/')

	const allowed = ['blog', 'docs']
	if (!allowed.some((prefix) => segment.startsWith(prefix))) {
		notFound()
	}

	if (segment.includes('..')) notFound()

	const filePath = join(process.cwd(), 'content', `${segment}.mdx`)

	try {
		const content = await readFile(filePath, 'utf-8')
		const filename = `${path[path.length - 1]}.md`

		return new Response(content, {
			headers: {
				'Content-Type': 'text/markdown; charset=utf-8',
				'Content-Disposition': `attachment; filename="${filename}"`,
			},
		})
	} catch {
		notFound()
	}
}
