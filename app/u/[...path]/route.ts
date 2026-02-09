const UMAMI_HOST = 'https://umami.cavarsa.app'

const FORWARDED_HEADERS = [
	'cf-connecting-ip',
	'x-forwarded-for',
	'x-real-ip',
	'cf-ipcountry',
	'cf-regioncode',
	'cf-ipcity',
	'user-agent',
	'referer',
]

async function proxy(request: Request, context: { params: Promise<{ path: string[] }> }) {
	const { path } = await context.params
	const target = `${UMAMI_HOST}/${path.join('/')}`

	const headers = new Headers()
	for (const key of FORWARDED_HEADERS) {
		const value = request.headers.get(key)
		if (value) headers.set(key, value)
	}

	const init: RequestInit = { method: request.method, headers }

	if (request.method === 'POST') {
		init.body = await request.arrayBuffer()
		headers.set('content-type', request.headers.get('content-type') ?? 'application/json')
	}

	const upstream = await fetch(target, init)

	const responseHeaders = new Headers(upstream.headers)
	responseHeaders.delete('set-cookie')

	return new Response(upstream.body, {
		status: upstream.status,
		headers: responseHeaders,
	})
}

export const GET = proxy
export const POST = proxy
