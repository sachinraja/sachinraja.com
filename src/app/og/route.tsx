// stolen from charliemeyer.com
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

async function loadGoogleFont(font: string, text: string) {
	const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
	const css = await (await fetch(url)).text()
	const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

	if (resource) {
		const response = await fetch(resource[1])
		if (response.status == 200) {
			return await response.arrayBuffer()
		}
	}

	throw new Error('failed to load font data')
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const title = searchParams.get('title') || 'Sachin Raja'
		const description = searchParams.get('description')

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
						gap: '32px',
						maxWidth: '960px',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<div
							style={{
								fontSize: '64px',
								fontWeight: 500,
								color: 'white',
								lineHeight: 1.2,
								letterSpacing: '-0.025em',
								textAlign: 'left',
							}}
						>
							{title}
						</div>
						{description && (
							<div
								style={{
									fontSize: '32px',
									fontWeight: 400,
									color: 'white',
									lineHeight: 1.2,
									textAlign: 'left',
								}}
							>
								{description}
							</div>
						)}
					</div>
					<div
						style={{
							fontSize: '32px',
							fontWeight: 400,
							color: 'lightgray',
							lineHeight: 1.2,
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
				fonts: [
					{
						name: 'Geist',
						data: await loadGoogleFont('Geist', title),
						style: 'normal',
					},
				],
			},
		)
	} catch (e) {
		console.log(`${e instanceof Error ? e.message : 'Unknown error'}`)
		return new Response(`Failed to generate the image`, {
			status: 500,
		})
	}
}
