// stolen from charliemeyer.com
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const title = searchParams.get('title') || 'Sachin Raja'

		return new ImageResponse(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundColor: 'black',
					padding: '80px 120px',
					position: 'relative',
					fontFamily: 'Geist',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
						maxWidth: '960px',
					}}
				>
					<div
						style={{
							fontSize: '64px',
							fontWeight: 500,
							color: 'white',
							lineHeight: 1.2,
							letterSpacing: '-0.025em',
							fontFamily: 'Geist',
							textAlign: 'left',
						}}
					>
						{title}
					</div>
					<div
						style={{
							fontSize: '32px',
							fontWeight: 400,
							color: 'lightgray',
							lineHeight: 1.2,
							fontFamily: 'Geist',
							textAlign: 'left',
						}}
					>
						Sachin Raja
					</div>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
			},
		)
	} catch (e) {
		console.log(`${e instanceof Error ? e.message : 'Unknown error'}`)
		return new Response(`Failed to generate the image`, {
			status: 500,
		})
	}
}
