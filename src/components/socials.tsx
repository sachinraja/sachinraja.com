import Link from 'next/link'
import { FaXTwitter } from 'react-icons/fa6'
import { LuArrowLeft, LuGithub } from 'react-icons/lu'

export function Socials() {
	return (
		<>
			<Link href="https://x.com/s4chinraja" target="_blank">
				<FaXTwitter size={20} />
			</Link>
			<Link href="https://github.com/sachinraja" target="_blank">
				<LuGithub size={20} />
			</Link>
		</>
	)
}

export function SocialsFooter() {
	return (
		<div className="flex flex-row gap-4">
			<Link href="https://x.com/s4chinraja" target="_blank">
				<FaXTwitter size={20} />
			</Link>
			<Link href="https://github.com/sachinraja" target="_blank">
				<LuGithub size={20} />
			</Link>
		</div>
	)
}

export function Footer() {
	return (
		<div className="flex flex-row gap-4">
			<Link href="/">
				<LuArrowLeft size={20} />
			</Link>
			<Socials />
		</div>
	)
}
