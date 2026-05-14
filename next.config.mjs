import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createMDX } from 'fumadocs-mdx/next'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	output: 'standalone',
	turbopack: {
		root: __dirname,
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com',
			},
			{
				protocol: 'https',
				hostname: 'dev-to-uploads.s3.amazonaws.com',
			},
		],
	},

	async redirects() {
		return [
			{
				source: '/blog/posts/3-kubernetes-debugging-handling',
				destination: '/blog/kubernetes-debugging-handling',
				permanent: true,
			},
			{
				source: '/blog/posts/7-kftui-port-forward',
				destination: '/blog/kftui-port-forward',
				permanent: true,
			},
			{
				source: '/blog/posts/8-kubectl-port-forward-auto-import',
				destination: '/blog/kubectl-port-forward-auto-import',
				permanent: true,
			},
			{
				source: '/blog/posts/12-kftray-http-logs-vscode',
				destination: '/blog/kftray-http-logs-vscode',
				permanent: true,
			},
		]
	},

	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
					{ key: 'X-DNS-Prefetch-Control', value: 'on' },
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
					},
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://umami.cavarsa.app https://static.cloudflareinsights.com https://giscus.app",
							"style-src 'self' 'unsafe-inline' https://giscus.app",
							"img-src 'self' data: blob: https://avatars.githubusercontent.com https://raw.githubusercontent.com https://img.youtube.com https://cdn.hashnode.com https://dev-to-uploads.s3.amazonaws.com https://github.com",
							"font-src 'self'",
							"connect-src 'self' https://umami.cavarsa.app https://api.github.com https://giscus.app",
							'frame-src https://www.youtube-nocookie.com https://giscus.app',
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
						].join('; '),
					},
				],
			},
		]
	},
}

export default withMDX(config)
