import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const title = searchParams.get('title') ?? 'kftray'

	return new ImageResponse(
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
				background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2d 50%, #1a1a1a 100%)',
				padding: '60px',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginBottom: '40px',
				}}
			>
				<span
					style={{
						fontSize: '48px',
						fontWeight: 700,
						color: '#4a8af5',
						letterSpacing: '-0.02em',
					}}
				>
					kftray
				</span>
			</div>
			<div
				style={{
					fontSize: '64px',
					fontWeight: 700,
					color: '#ffffff',
					textAlign: 'center',
					lineHeight: 1.2,
					maxWidth: '900px',
				}}
			>
				{title}
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginTop: '40px',
					gap: '8px',
				}}
			>
				<div
					style={{
						width: '12px',
						height: '12px',
						borderRadius: '50%',
						background: '#4a8af5',
					}}
				/>
				<span
					style={{
						fontSize: '24px',
						color: '#999999',
					}}
				>
					kftray.app
				</span>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	)
}
